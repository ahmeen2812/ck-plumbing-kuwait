"use client";

import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { SITE_CONFIG } from "@/config/site";
import { Review, ReviewSubmissionPayload } from "./reviews.types";
import { ReviewStars } from "./ReviewStars";
import { animateModalOpen, animateModalClose } from "./reviews.animations";
import { X, AlertCircle, CheckCircle2 } from "lucide-react";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReviewCreated: (newReview: Review) => void;
}

export function ReviewModal({ isOpen, onClose, onReviewCreated }: ReviewModalProps) {
  const { locale, content } = useLanguage();
  const t = content.reviewsSection.modal;

  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const [customerName, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [serviceId, setServiceId] = useState(SITE_CONFIG.services[0]?.id || "plumbing-repairs");
  const [customerRole, setCustomerRole] = useState("");
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");
  const [showEmailPublicly, setShowEmailPublicly] = useState(false);

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [statusMsg, setStatusMsg] = useState("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      animateModalOpen(overlayRef.current, modalRef.current);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleClose = () => {
    animateModalClose(overlayRef.current, modalRef.current, () => {
      onClose();
      setStatus("idle");
      setStatusMsg("");
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!customerName.trim() || !email.trim() || !city.trim()) {
      setStatus("error");
      setStatusMsg(t.errRequired);
      return;
    }

    setStatus("submitting");

    const payload: ReviewSubmissionPayload = {
      customerName,
      email,
      city,
      serviceId,
      customerRole: customerRole.trim() || undefined,
      rating,
      message: message.trim() || undefined,
      showEmailPublicly,
    };

    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setStatusMsg(t.successMsg);
        onReviewCreated(data.review);
        setTimeout(() => {
          handleClose();
        }, 1200);
      } else {
        setStatus("error");
        setStatusMsg(data.message || t.errGeneric);
      }
    } catch {
      setStatus("error");
      setStatusMsg(t.errGeneric);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="review-modal-title"
      className="fixed inset-0 z-50 bg-[#132E3C]/60 flex items-center justify-center p-4 overflow-y-auto"
      onClick={handleClose}
    >
      <div
        ref={modalRef}
        className="w-full max-w-xl bg-[#FFFFFF] border border-[#D8DDDD] p-6 sm:p-8 my-8 shadow-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-[#D8DDDD]">
          <h3 id="review-modal-title" className="text-xl font-bold text-[#132E3C]">
            {t.title}
          </h3>
          <button
            type="button"
            onClick={handleClose}
            className="p-1.5 text-[#536270] hover:text-[#132E3C] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B45C31]"
            aria-label="Close review dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {/* Interactive Star Rating Selector */}
          <div>
            <label className="form-label">{t.ratingLabel}</label>
            <div className="pt-1">
              <ReviewStars rating={rating} size="lg" interactive onRatingChange={setRating} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="rev-name" className="form-label">
                {t.fullName} <span className="text-[#B45C31]">*</span>
              </label>
              <input
                id="rev-name"
                type="text"
                required
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder={t.fullNamePlaceholder}
                className="form-input"
              />
            </div>

            <div>
              <label htmlFor="rev-email" className="form-label">
                {t.email} <span className="text-[#B45C31]">*</span>
              </label>
              <input
                id="rev-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t.emailPlaceholder}
                className="form-input"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="rev-city" className="form-label">
                {t.city} <span className="text-[#B45C31]">*</span>
              </label>
              <input
                id="rev-city"
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder={t.cityPlaceholder}
                className="form-input"
              />
            </div>

            <div>
              <label htmlFor="rev-service" className="form-label">
                {t.service} <span className="text-[#B45C31]">*</span>
              </label>
              <select
                id="rev-service"
                value={serviceId}
                onChange={(e) => setServiceId(e.target.value)}
                className="form-input bg-white"
              >
                {SITE_CONFIG.services.map((svc) => (
                  <option key={svc.id} value={svc.id}>
                    {locale === "ar" ? svc.titleAr : svc.titleEn}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="rev-role" className="form-label">
              {t.role}
            </label>
            <input
              id="rev-role"
              type="text"
              value={customerRole}
              onChange={(e) => setCustomerRole(e.target.value)}
              placeholder={t.rolePlaceholder}
              className="form-input"
            />
          </div>

          <div>
            <label htmlFor="rev-message" className="form-label">
              {t.message}
            </label>
            <textarea
              id="rev-message"
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t.messagePlaceholder}
              className="form-input resize-y"
            />
          </div>

          <div className="flex items-start gap-2.5 pt-1">
            <input
              id="rev-consent"
              type="checkbox"
              checked={showEmailPublicly}
              onChange={(e) => setShowEmailPublicly(e.target.checked)}
              className="mt-1 h-4 w-4 border-[#D8DDDD] text-[#132E3C] focus:ring-[#B45C31]"
            />
            <label htmlFor="rev-consent" className="text-xs text-[#536270] leading-normal select-none">
              {t.consentCheckbox}
            </label>
          </div>

          {status === "error" && (
            <div className="p-3 bg-[#FAEEEE] border border-[#962828]/30 text-[#962828] text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{statusMsg}</span>
            </div>
          )}

          {status === "success" && (
            <div className="p-3 bg-[#EAF4EE] border border-[#1E6648]/30 text-[#1E6648] text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" />
              <span>{statusMsg}</span>
            </div>
          )}

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={handleClose}
              className="btn-secondary text-xs px-4 py-2.5"
            >
              {t.cancelBtn}
            </button>
            <button
              type="submit"
              disabled={status === "submitting"}
              className="btn-primary text-xs px-5 py-2.5"
            >
              {status === "submitting" ? t.submittingBtn : t.submitBtn}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}