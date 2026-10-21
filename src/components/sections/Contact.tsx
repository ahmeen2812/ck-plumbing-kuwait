"use client";

import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { SITE_CONFIG, type ServiceDefinition } from "@/config/site";
import { PhoneCall, Mail, MapPin, Clock, AlertCircle, CheckCircle2 } from "lucide-react";

export function Contact() {
  const { locale, content } = useLanguage();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [selectedService, setSelectedService] = useState("");
  const [message, setMessage] = useState("");

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [statusFeedback, setStatusFeedback] = useState("");

  const selectRef = useRef<HTMLSelectElement>(null);

  // Sync service from custom event or URL parameters
  useEffect(() => {
    const applyServiceFromUrl = () => {
      if (typeof window === "undefined") return;
      const url = new URL(window.location.href);
      const svcParam = url.searchParams.get("service");
      if (svcParam) {
        const found = SITE_CONFIG.services.find((s) => s.id === svcParam);
        if (found) {
          setSelectedService(found.id);
        }
      }
    };

    applyServiceFromUrl();

    const handleCustomSelect = (e: Event) => {
      const customEvt = e as CustomEvent<{ serviceId: string }>;
      if (customEvt.detail?.serviceId) {
        setSelectedService(customEvt.detail.serviceId);
        if (selectRef.current) {
          selectRef.current.focus();
        }
      }
    };

    window.addEventListener("ck:select-service", handleCustomSelect);
    window.addEventListener("popstate", applyServiceFromUrl);

    return () => {
      window.removeEventListener("ck:select-service", handleCustomSelect);
      window.removeEventListener("popstate", applyServiceFromUrl);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fullName.trim() || !phone.trim() || !selectedService || !message.trim()) {
      setStatus("error");
      setStatusFeedback(content.contactSection.form.errorMessage);
      return;
    }

    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          serviceId: selectedService,
          message,
          locale,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setStatus("success");
        setStatusFeedback(content.contactSection.form.successMessage);
        setFullName("");
        setEmail("");
        setPhone("");
        setMessage("");
      } else {
        setStatus("error");
        setStatusFeedback(data.message || content.contactSection.form.errorMessage);
      }
    } catch {
      setStatus("error");
      setStatusFeedback(content.contactSection.form.errorMessage);
    }
  };

  const formText = content.contactSection.form;

  return (
    <section
      id="contact"
      className="w-full bg-[#132E3C] text-white py-16 sm:py-20 lg:py-24 border-t border-[#D8DDDD] scroll-mt-24 sm:scroll-mt-28"
      aria-label={content.contactSection.title}
    >
      <div className="site-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Column 1: Context and Direct Contact Overview */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 text-[#FFFFFF] text-xs font-bold mb-4">
              <span className="w-2 h-2 bg-[#B45C31]"></span>
              <span>{content.contactSection.eyebrow}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4 text-white leading-tight">
              {content.contactSection.title}
            </h2>

            <p className="text-sm sm:text-base text-gray-300 mb-8 leading-relaxed">
              {content.contactSection.subtitle}
            </p>

            <div className="w-full space-y-4 pt-4 border-t border-white/15">
              <a
                href={SITE_CONFIG.contact.phoneTel}
                className="flex items-center gap-3.5 p-4 bg-white/5 border border-white/15 hover:bg-white/10 hover:border-[#B45C31] transition-colors"
              >
                <div className="w-10 h-10 flex items-center justify-center bg-[#B45C31] text-white shrink-0">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs text-gray-300 font-medium">
                    {locale === "ar" ? "الاتصال الهاتفي المباشر" : "Direct Phone Dispatch"}
                  </p>
                  <p className="text-base font-bold text-white tracking-wide">
                    {SITE_CONFIG.contact.phoneDisplay}
                  </p>
                </div>
              </a>

              <div className="p-4 bg-white/5 border border-white/15 space-y-3 text-xs text-gray-300">
                <div className="flex items-start gap-2.5">
                  <Clock className="w-4 h-4 text-[#B45C31] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block mb-0.5">
                      {content.common.workingHours}
                    </strong>
                    <p>{content.common.operatingSchedule}</p>
                    <p>{content.common.fridayHours}</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 pt-3 border-t border-white/10">
                  <MapPin className="w-4 h-4 text-[#B45C31] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white block mb-0.5">
                      {locale === "ar" ? "العنوان التجاري المعتمد" : "Registered Business Location"}
                    </strong>
                    <p className="leading-relaxed">
                      {SITE_CONFIG.contact.address.formatted}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Structured Service Enquiry Form */}
          <div className="lg:col-span-7 w-full bg-[#FFFFFF] text-[#1E2933] p-6 sm:p-8 lg:p-10 border border-[#D8DDDD]">
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="enquiry-name" className="form-label">
                    {formText.fullName} <span className="text-[#B45C31]">*</span>
                  </label>
                  <input
                    id="enquiry-name"
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={formText.fullNamePlaceholder}
                    className="form-input"
                  />
                </div>

                <div>
                  <label htmlFor="enquiry-phone" className="form-label">
                    {formText.phone} <span className="text-[#B45C31]">*</span>
                  </label>
                  <input
                    id="enquiry-phone"
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder={formText.phonePlaceholder}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="enquiry-email" className="form-label">
                    {formText.email}
                  </label>
                  <input
                    id="enquiry-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={formText.emailPlaceholder}
                    className="form-input"
                  />
                </div>

                <div>
                  <label htmlFor="enquiry-service" className="form-label">
                    {formText.service} <span className="text-[#B45C31]">*</span>
                  </label>
                  <select
                    id="enquiry-service"
                    ref={selectRef}
                    required
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="form-input bg-white"
                  >
                    <option value="">{formText.serviceDefaultOption}</option>
                    {SITE_CONFIG.services.map((svc: ServiceDefinition) => (
                      <option key={svc.id} value={svc.id}>
                        {locale === "ar" ? svc.titleAr : svc.titleEn}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="enquiry-message" className="form-label">
                  {formText.message} <span className="text-[#B45C31]">*</span>
                </label>
                <textarea
                  id="enquiry-message"
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={formText.messagePlaceholder}
                  className="form-input resize-y"
                />
              </div>

              {status === "error" && (
                <div className="p-3.5 bg-[#FAEEEE] border border-[#962828]/30 text-[#962828] text-xs flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{statusFeedback}</span>
                </div>
              )}

              {status === "success" && (
                <div className="p-3.5 bg-[#EAF4EE] border border-[#1E6648]/30 text-[#1E6648] text-xs flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{statusFeedback}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#132E3C] hover:bg-[#B45C31] text-white font-bold py-3.5 px-6 text-sm transition-colors border border-[#132E3C] hover:border-[#B45C31] disabled:opacity-60 cursor-pointer"
              >
                <Mail className="w-4 h-4" />
                <span>
                  {status === "submitting" ? formText.submitting : formText.submit}
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;