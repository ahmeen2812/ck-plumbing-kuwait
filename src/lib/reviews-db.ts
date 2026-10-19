import fs from "fs/promises";
import path from "path";
import { Review, ReviewStats, ReviewSubmissionPayload } from "@/components/sections/reviews/reviews.types";

const DATA_DIR = path.join(process.cwd(), "data");
const REVIEWS_FILE = path.join(DATA_DIR, "reviews.json");

const SEED_REVIEWS: Review[] = [
  {
    id: "rev-kw-001",
    customerName: "Eng. Tareq Al-Hajri",
    email: "tareq.hajri@example.com",
    maskedEmail: "t***i@example.com",
    showEmailPublicly: true,
    city: "Kuwait City (Al-Asimah)",
    serviceId: "water-leak-detection",
    customerRole: "Property Owner",
    rating: 5,
    message:
      "Rapid non-destructive detection of a concealed riser pipe fracture in our villa. Work was carried out cleanly with exact pressure testing before closure.",
    source: "website",
    status: "published",
    createdAt: "2026-03-14T09:30:00.000Z",
  },
  {
    id: "rev-kw-002",
    customerName: "Bader Al-Mutawa",
    email: "bader.mutawa@example.com",
    maskedEmail: "b***a@example.com",
    showEmailPublicly: true,
    city: "Hawalli (Salmiya)",
    serviceId: "plumbing-repairs",
    customerRole: "Villa Resident",
    rating: 5,
    message:
      "Complete replacement of leaking PPR bathroom manifolds and fixture unions. Direct pricing without undisclosed extra charges.",
    source: "website",
    status: "published",
    createdAt: "2026-03-22T14:15:00.000Z",
  },
  {
    id: "rev-kw-003",
    customerName: "Dr. Khaled Al-Sabah",
    email: "khaled.sabah@example.com",
    maskedEmail: "k***h@example.com",
    showEmailPublicly: true,
    city: "Farwaniya (Khaitan)",
    serviceId: "water-heaters-pumps",
    customerRole: "Building Supervisor",
    rating: 5,
    message:
      "Central water heater thermostat and pressure safety valve overhaul. Steady hot water circulation restored immediately.",
    source: "website",
    status: "published",
    createdAt: "2026-04-02T11:00:00.000Z",
  },
  {
    id: "rev-kw-004",
    customerName: "Mona Al-Enezi",
    email: "mona.enezi@example.com",
    maskedEmail: "m***i@example.com",
    showEmailPublicly: false,
    city: "Mubarak Al-Kabeer",
    serviceId: "drain-cleaning",
    customerRole: "Homeowner",
    rating: 4,
    message:
      "Mechanical clearing of kitchen drain line blockage. Prompt dispatch and professional cleanup after finishing.",
    source: "website",
    status: "published",
    createdAt: "2026-04-18T16:45:00.000Z",
  },
];

export function maskEmail(email: string): string {
  const [user, domain] = email.split("@");
  if (!user || !domain) return "";
  if (user.length <= 2) return `${user[0]}*@${domain}`;
  return `${user[0]}***${user[user.length - 1]}@${domain}`;
}

async function ensureDataFile(): Promise<void> {
  try {
    await fs.access(REVIEWS_FILE);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.writeFile(REVIEWS_FILE, JSON.stringify(SEED_REVIEWS, null, 2), "utf8");
  }
}

export async function getPublishedReviews(): Promise<{ reviews: Review[]; stats: ReviewStats }> {
  await ensureDataFile();
  const raw = await fs.readFile(REVIEWS_FILE, "utf8");
  const allReviews: Review[] = JSON.parse(raw);

  const published = allReviews
    .filter((r) => r.status === "published")
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  const totalReviews = published.length;
  const ratingSum = published.reduce((acc, r) => acc + r.rating, 0);
  const averageRating = totalReviews > 0 ? Number((ratingSum / totalReviews).toFixed(1)) : 0;

  const distribution = [5, 4, 3, 2, 1].map((star) => {
    const count = published.filter((r) => r.rating === star).length;
    const percentage = totalReviews > 0 ? Math.round((count / totalReviews) * 100) : 0;
    return { star, count, percentage };
  });

  return {
    reviews: published,
    stats: {
      averageRating,
      totalReviews,
      distribution,
    },
  };
}

export async function createReview(payload: ReviewSubmissionPayload): Promise<Review> {
  await ensureDataFile();
  const raw = await fs.readFile(REVIEWS_FILE, "utf8");
  const allReviews: Review[] = JSON.parse(raw);

  const autoApprove = process.env.AUTO_APPROVE_REVIEWS !== "false";

  const newReview: Review = {
    id: `rev-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    customerName: payload.customerName.trim(),
    email: payload.email.trim().toLowerCase(),
    maskedEmail: payload.showEmailPublicly ? maskEmail(payload.email.trim()) : undefined,
    showEmailPublicly: payload.showEmailPublicly,
    city: payload.city.trim(),
    serviceId: payload.serviceId,
    customerRole: payload.customerRole ? payload.customerRole.trim() : undefined,
    rating: Math.min(5, Math.max(1, Math.round(payload.rating))),
    message: payload.message ? payload.message.trim() : undefined,
    source: "website",
    status: autoApprove ? "published" : "pending",
    createdAt: new Date().toISOString(),
  };

  allReviews.push(newReview);
  await fs.writeFile(REVIEWS_FILE, JSON.stringify(allReviews, null, 2), "utf8");

  return newReview;
}