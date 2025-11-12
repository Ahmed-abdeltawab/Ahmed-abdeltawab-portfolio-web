import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

// Initialize Resend with API key from environment variables
const resend = new Resend(process.env.RESEND_API_KEY);

// Rate limiting (simple in-memory store - for production, use Redis or similar)
const rateLimit = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimit.get(ip);

  if (!limit || now > limit.resetTime) {
    // Reset or create new limit (5 requests per 15 minutes)
    rateLimit.set(ip, { count: 1, resetTime: now + 15 * 60 * 1000 });
    return true;
  }

  if (limit.count >= 5) {
    return false;
  }

  limit.count++;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // Get client IP for rate limiting
    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";

    // Check rate limit
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        {
          success: false,
          error: "Too many requests. Please try again later.",
        },
        { status: 429 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { name, email, subject, message } = body;

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        {
          success: false,
          error:
            "Missing required fields: name, email, and message are required.",
        },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid email format.",
        },
        { status: 400 }
      );
    }

    // Validate lengths
    if (name.length < 2 || name.length > 100) {
      return NextResponse.json(
        {
          success: false,
          error: "Name must be between 2 and 100 characters.",
        },
        { status: 400 }
      );
    }

    if (message.length < 10 || message.length > 5000) {
      return NextResponse.json(
        {
          success: false,
          error: "Message must be between 10 and 5000 characters.",
        },
        { status: 400 }
      );
    }

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      return NextResponse.json(
        {
          success: false,
          error:
            "Email service is not configured. Please contact the administrator.",
        },
        { status: 500 }
      );
    }

    // Check if recipient email is configured
    const recipientEmail =
      process.env.RECIPIENT_EMAIL || "aa5178@fayoum.edu.eg";

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: [recipientEmail],
      subject: subject || `New message from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>New Contact Form Submission</title>
          </head>
          <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 20px;">
              <tr>
                <td align="center">
                  <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 12px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); overflow: hidden;">
                    <!-- Header -->
                    <tr>
                      <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 30px; text-align: center;">
                        <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: 700;">
                          📬 New Contact Message
                        </h1>
                        <p style="margin: 10px 0 0 0; color: rgba(255,255,255,0.9); font-size: 16px;">
                          Someone reached out through your portfolio
                        </p>
                      </td>
                    </tr>
                    
                    <!-- Content -->
                    <tr>
                      <td style="padding: 40px 30px;">
                        <!-- Sender Info -->
                        <div style="background-color: #f8f9fa; border-left: 4px solid #667eea; padding: 20px; margin-bottom: 30px; border-radius: 8px;">
                          <h2 style="margin: 0 0 15px 0; color: #333; font-size: 18px; font-weight: 600;">
                            👤 Sender Information
                          </h2>
                          <p style="margin: 8px 0; color: #555; font-size: 15px; line-height: 1.6;">
                            <strong style="color: #333;">Name:</strong> ${name}
                          </p>
                          <p style="margin: 8px 0; color: #555; font-size: 15px; line-height: 1.6;">
                            <strong style="color: #333;">Email:</strong> 
                            <a href="mailto:${email}" style="color: #667eea; text-decoration: none;">${email}</a>
                          </p>
                          ${
                            subject
                              ? `<p style="margin: 8px 0; color: #555; font-size: 15px; line-height: 1.6;">
                            <strong style="color: #333;">Subject:</strong> ${subject}
                          </p>`
                              : ""
                          }
                        </div>
                        
                        <!-- Message -->
                        <div style="margin-bottom: 30px;">
                          <h2 style="margin: 0 0 15px 0; color: #333; font-size: 18px; font-weight: 600;">
                            💬 Message
                          </h2>
                          <div style="background-color: #ffffff; border: 1px solid #e0e0e0; padding: 20px; border-radius: 8px; white-space: pre-wrap; color: #555; font-size: 15px; line-height: 1.8;">
${message}
                          </div>
                        </div>
                        
                        <!-- Quick Reply Button -->
                        <div style="text-align: center; margin-top: 30px;">
                          <a href="mailto:${email}?subject=Re: ${encodeURIComponent(
        subject || `Message from ${name}`
      )}" 
                             style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; padding: 14px 32px; border-radius: 8px; font-weight: 600; font-size: 16px; box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);">
                            ↩️ Reply to ${name}
                          </a>
                        </div>
                      </td>
                    </tr>
                    
                    <!-- Footer -->
                    <tr>
                      <td style="background-color: #f8f9fa; padding: 20px 30px; text-align: center; border-top: 1px solid #e0e0e0;">
                        <p style="margin: 0; color: #999; font-size: 13px;">
                          This email was sent from your portfolio contact form
                        </p>
                        <p style="margin: 8px 0 0 0; color: #999; font-size: 12px;">
                          Sent on ${new Date().toLocaleString("en-US", {
                            weekday: "long",
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
      // Plain text fallback
      text: `
New Contact Form Submission

From: ${name}
Email: ${email}
${subject ? `Subject: ${subject}` : ""}

Message:
${message}

---
Sent on ${new Date().toLocaleString()}
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        {
          success: false,
          error: "Failed to send email. Please try again later.",
        },
        { status: 500 }
      );
    }

    console.log("Email sent successfully:", data?.id);

    return NextResponse.json(
      {
        success: true,
        message: "Your message has been sent successfully!",
        id: data?.id,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "An unexpected error occurred. Please try again later.",
      },
      { status: 500 }
    );
  }
}

// Handle unsupported methods
export async function GET() {
  return NextResponse.json(
    { success: false, error: "Method not allowed" },
    { status: 405 }
  );
}
