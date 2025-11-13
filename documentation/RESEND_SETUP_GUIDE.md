# 📧 Resend Email Setup Guide

## ✅ What's Been Implemented

Your contact form now uses **Resend** for sending emails. Here's what has been set up:

### 📁 Files Created/Modified:

1. **`/app/api/contact/route.ts`** - Next.js API route handling email sending
2. **`/components/contact/contact-form.tsx`** - Updated to send real requests to API
3. **`.env.example`** - Template for environment variables
4. **`.env.local`** - Your local environment variables (not committed to git)

---

## 🚀 Quick Start (3 Steps)

### Step 1: Get Your Resend API Key

1. Go to [https://resend.com](https://resend.com)
2. Sign up for a free account
3. Navigate to **API Keys** section
4. Click **"Create API Key"**
5. Copy your API key (starts with `re_`)

### Step 2: Add API Key to `.env.local`

Open `.env.local` and add your API key:

```env
RESEND_API_KEY=re_your_actual_api_key_here
RECIPIENT_EMAIL=aa5178@fayoum.edu.eg
```

### Step 3: Test the Contact Form

1. Start your dev server: `npm run dev`
2. Go to `http://localhost:3000/contact`
3. Fill out and submit the form
4. Check your email inbox! 📬

---

## ✨ Features Included

### 🔒 Security Features:

- ✅ **Rate Limiting** - Max 5 emails per 15 minutes per IP
- ✅ **Input Validation** - Server-side validation for all fields
- ✅ **Email Format Validation** - Validates email addresses
- ✅ **Length Limits** - Prevents spam and injection attacks
- ✅ **Error Handling** - Graceful error messages

### 📧 Email Features:

- ✅ **Beautiful HTML Email Template** - Professional gradient design
- ✅ **Plain Text Fallback** - For email clients without HTML support
- ✅ **Quick Reply Button** - One-click to reply to sender
- ✅ **Sender Information** - Name, email, subject clearly displayed
- ✅ **Timestamp** - Shows when the message was sent

### 🎨 Frontend Features:

- ✅ **Real API Integration** - No more simulated delays
- ✅ **Loading States** - Shows spinner while sending
- ✅ **Success Animation** - Checkmark animation on success
- ✅ **Error Handling** - User-friendly error messages
- ✅ **Form Reset** - Automatically clears after success

---

## 📋 API Endpoint Details

### **POST** `/api/contact`

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "subject": "Project Inquiry",
  "message": "I'd like to discuss a project..."
}
```

**Success Response (200):**

```json
{
  "success": true,
  "message": "Your message has been sent successfully!",
  "id": "email_id_from_resend"
}
```

**Error Response (400/429/500):**

```json
{
  "success": false,
  "error": "Error message here"
}
```

---

## 🔧 Environment Variables

| Variable               | Required    | Default                 | Description                          |
| ---------------------- | ----------- | ----------------------- | ------------------------------------ |
| `RESEND_API_KEY`       | ✅ Yes      | -                       | Your Resend API key from resend.com  |
| `RECIPIENT_EMAIL`      | ⚠️ Optional | `aa5178@fayoum.edu.eg`  | Email that receives form submissions |
| `NEXT_PUBLIC_SITE_URL` | ⚠️ Optional | `http://localhost:3000` | Your site URL                        |

---

## 🎯 Validation Rules

| Field   | Min Length   | Max Length | Required    |
| ------- | ------------ | ---------- | ----------- |
| Name    | 2 chars      | 100 chars  | ✅ Yes      |
| Email   | Valid format | -          | ✅ Yes      |
| Subject | -            | -          | ⚠️ Optional |
| Message | 10 chars     | 5000 chars | ✅ Yes      |

---

## 🧪 Testing Checklist

- [ ] Create Resend account and get API key
- [ ] Add API key to `.env.local`
- [ ] Start development server (`npm run dev`)
- [ ] Submit test message from contact form
- [ ] Check email inbox for received message
- [ ] Verify email formatting looks good
- [ ] Test "Reply" button in email
- [ ] Try submitting 6+ times to test rate limiting
- [ ] Submit invalid email format (should show error)
- [ ] Submit with empty fields (should show validation errors)

---

## 🚨 Troubleshooting

### Email not sending?

**Check:**

1. ✅ API key is correct in `.env.local`
2. ✅ API key starts with `re_`
3. ✅ Restart dev server after adding `.env.local`
4. ✅ Check browser console for errors
5. ✅ Check terminal/server logs for error messages

### Common Errors:

| Error                             | Solution                                |
| --------------------------------- | --------------------------------------- |
| "Email service is not configured" | Add `RESEND_API_KEY` to `.env.local`    |
| "Invalid API key"                 | Get a new API key from resend.com       |
| "Too many requests"               | Wait 15 minutes or use different IP     |
| "Failed to send email"            | Check Resend dashboard for quota/limits |

---

## 🌐 Production Deployment

### For Vercel:

1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Add:
   - `RESEND_API_KEY` = your API key
   - `RECIPIENT_EMAIL` = your email
4. Redeploy your site

### For Other Platforms:

Add environment variables in your platform's dashboard:

- **Netlify**: Site Settings → Environment Variables
- **Railway**: Settings → Variables
- **Render**: Environment → Environment Variables

---

## 📊 Resend Free Tier Limits

- ✅ **100 emails/day** for free
- ✅ **3,000 emails/month** for free
- ✅ Perfect for portfolio contact forms!

Need more? Upgrade to a paid plan on [resend.com/pricing](https://resend.com/pricing)

---

## 🎨 Email Template Preview

The emails sent will look like this:

```
┌─────────────────────────────────────┐
│   📬 New Contact Message            │
│   Someone reached out through       │
│   your portfolio                    │
├─────────────────────────────────────┤
│                                     │
│ 👤 Sender Information               │
│ Name: John Doe                      │
│ Email: john@example.com             │
│ Subject: Project Inquiry            │
│                                     │
│ 💬 Message                          │
│ I'd like to discuss a project...    │
│                                     │
│     [ ↩️ Reply to John Doe ]        │
│                                     │
├─────────────────────────────────────┤
│ This email was sent from your       │
│ portfolio contact form              │
└─────────────────────────────────────┘
```

---

## 🔐 Security Best Practices

✅ **Never commit `.env.local`** - Already in `.gitignore`  
✅ **Use environment variables** - API keys never in code  
✅ **Rate limiting enabled** - Prevents spam attacks  
✅ **Input validation** - Server-side protection  
✅ **HTTPS only in production** - Secure data transmission

---

## 📚 Additional Resources

- [Resend Documentation](https://resend.com/docs)
- [Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)
- [Resend Dashboard](https://resend.com/emails)

---

## ✅ What Changed from Nodemailer?

| Aspect              | Before (Nodemailer)       | After (Resend)      |
| ------------------- | ------------------------- | ------------------- |
| **Setup**           | Complex SMTP config       | Simple API key      |
| **Reliability**     | Depends on email provider | 99.9% uptime SLA    |
| **Deliverability**  | Can hit spam folders      | Optimized for inbox |
| **Email Templates** | Manual HTML               | Pre-built + custom  |
| **Tracking**        | None                      | Open/click tracking |
| **API**             | SMTP protocol             | Modern REST API     |
| **Free Tier**       | Limited by provider       | 100/day, 3000/month |

---

**Status:** ✅ Ready to use! Just add your Resend API key and start receiving messages.

**Need Help?** Check the troubleshooting section above or visit [resend.com/docs](https://resend.com/docs)
