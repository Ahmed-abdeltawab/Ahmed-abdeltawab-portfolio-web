# 🚀 Quick Start - Contact Form with Resend

## ⚡ 3 Steps to Get Started

### 1️⃣ Get API Key (2 minutes)

```bash
1. Visit https://resend.com
2. Sign up (free)
3. Go to "API Keys"
4. Create new key
5. Copy the key (starts with "re_")
```

### 2️⃣ Add to Environment (30 seconds)

```bash
# Open .env.local and add:
RESEND_API_KEY=re_paste_your_key_here
```

### 3️⃣ Test It! (1 minute)

```bash
npm run dev
# Go to http://localhost:3000/contact
# Submit a test message
# Check your email: aa5178@fayoum.edu.eg
```

---

## 📋 What You Get

✅ Professional HTML email template  
✅ Rate limiting (5 emails per 15 min)  
✅ Input validation  
✅ Error handling  
✅ Loading states  
✅ Success animations  
✅ Mobile-responsive emails

---

## 🔧 Files Modified

```
✅ /app/api/contact/route.ts       (New API endpoint)
✅ /components/contact/contact-form.tsx  (Real API integration)
✅ .env.local                       (Your API key)
✅ .env.example                     (Template)
```

---

## 📧 Email Preview

**From:** Portfolio Contact <onboarding@resend.dev>  
**To:** aa5178@fayoum.edu.eg  
**Subject:** New message from [Name]

**Content:** Beautiful gradient-styled HTML email with:

- Sender info (name, email, subject)
- Message content
- One-click reply button
- Timestamp

---

## 🆘 Troubleshooting

| Problem            | Solution                             |
| ------------------ | ------------------------------------ |
| No API key error   | Add `RESEND_API_KEY` to `.env.local` |
| Email not received | Check spam folder                    |
| Rate limit hit     | Wait 15 minutes                      |
| Invalid key        | Get new key from resend.com          |

---

## 📖 Full Documentation

- **Setup Guide:** `RESEND_SETUP_GUIDE.md`
- **Migration Info:** `MIGRATION_NODEMAILER_TO_RESEND.md`

---

## 🎯 Production Deployment

**Vercel/Netlify/Railway:**

1. Add `RESEND_API_KEY` to environment variables
2. Deploy
3. Done! ✅

---

**Need Help?** Read the full setup guide or visit [resend.com/docs](https://resend.com/docs)
