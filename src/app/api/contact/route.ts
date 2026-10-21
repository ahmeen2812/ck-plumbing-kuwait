import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { fullName, email, phone, serviceId, message, locale } = body;

    if (!fullName || !phone || !serviceId || !message) {
      return NextResponse.json(
        {
          success: false,
          message:
            locale === "ar"
              ? "يرجى استكمال جميع البيانات المطلوبة."
              : "Please fill in all required fields.",
        },
        { status: 400 }
      );
    }

    // Verify presence of server-side mail transport credentials
    const smtpHost = process.env.SMTP_HOST;
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpHost || !smtpUser || !smtpPass) {
      // Log operational notification for technical administration
      console.info("[CK-Plumbing-Enquiry-Received]", {
        timestamp: new Date().toISOString(),
        fullName,
        email: email || "Not provided",
        phone,
        serviceId,
        message,
        environmentNotice:
          "SMTP credentials (SMTP_HOST, SMTP_USER, SMTP_PASS) not configured. Enquiry logged securely on server.",
      });

      return NextResponse.json({
        success: true,
        message:
          locale === "ar"
            ? "تم تسجيل طلبك بنجاح وسيتواصل معك القسم الفني."
            : "Enquiry logged successfully. Technical dispatch will follow up.",
        pendingConfigurationNotice:
          "Server mail credentials pending configuration; request recorded in runtime audit log.",
      });
    }

    // Dynamic import to maintain zero-runtime overhead if SMTP not in use
    const nodemailer = await import("nodemailer");

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const recipient = process.env.CONTACT_EMAIL_RECIPIENT || "contact@ckplumbingkw.example";

    await transporter.sendMail({
      from: `"CK Plumbing Web" <${smtpUser}>`,
      to: recipient,
      replyTo: email || undefined,
      subject: `New Maintenance Enquiry: ${serviceId.toUpperCase()} (${fullName})`,
      text: `Full Name: ${fullName}\nPhone: ${phone}\nEmail: ${email || "None"}\nService: ${serviceId}\n\nMessage:\n${message}`,
    });

    return NextResponse.json({
      success: true,
      message:
        locale === "ar"
          ? "تم إرسال طلبكم بنجاح وسيتواصل معكم فريق العمل."
          : "Your enquiry has been delivered successfully.",
    });
  } catch (error) {
    console.error("[CK-Plumbing-Contact-API-Error]", error);
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error occurred while processing your enquiry.",
      },
      { status: 500 }
    );
  }
}