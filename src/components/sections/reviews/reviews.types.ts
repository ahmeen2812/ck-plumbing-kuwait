export interface Review {
  id: string;
  customerName: string;
  email: string;
  maskedEmail?: string;
  showEmailPublicly: boolean;
  city: string;
  serviceId: string;
  customerRole?: string;
  rating: number;
  message?: string;
  source: "website" | "google";
  status: "published" | "pending";
  createdAt: string;
}

export interface RatingBarStat {
  star: number;
  count: number;
  percentage: number;
}

export interface ReviewStats {
  averageRating: number;
  totalReviews: number;
  distribution: RatingBarStat[];
}

export interface ReviewSubmissionPayload {
  customerName: string;
  email: string;
  city: string;
  serviceId: string;
  customerRole?: string;
  rating: number;
  message?: string;
  showEmailPublicly: boolean;
}