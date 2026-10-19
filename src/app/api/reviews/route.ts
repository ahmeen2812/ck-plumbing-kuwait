import { NextResponse } from "next/server";
import { getPublishedReviews, createReview } from "@/lib/reviews-db";
import { ReviewSubmissionPayload } from "@/components/sections/reviews/reviews.types";

export async function GET() {
  try {
    const data = await getPublishedReviews();
    return NextResponse.json({ success: true, ...data });
  } catch (error) {
    console.error("GET /api/reviews error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to retrieve published reviews." },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body: ReviewSubmissionPayload = await req.json();

    if (!body.customerName || !body.email || !body.city || !body.serviceId || !body.rating) {
      return NextResponse.json(
        { success: false, message: "Required review fields are missing." },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { success: false, message: "Invalid email address format." },
        { status: 400 }
      );
    }

    const review = await createReview(body);
    const updatedData = await getPublishedReviews();

    return NextResponse.json({
      success: true,
      review,
      stats: updatedData.stats,
    });
  } catch (error) {
    console.error("POST /api/reviews error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to register review submission." },
      { status: 500 }
    );
  }
}