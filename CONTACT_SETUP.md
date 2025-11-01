# Contact Form Setup Instructions

Your portfolio now has a working contact form that sends emails directly to your inbox!

## Quick Setup (5 minutes)

### 1. Get Free Resend API Key
1. Go to [resend.com](https://resend.com/)
2. Sign up for free (no credit card required)
3. Go to API Keys section in dashboard
4. Click "Create API Key"
5. Copy the generated key (starts with `re_`)

### 2. Add Environment Variable to Vercel
1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your portfolio project
3. Go to Settings → Environment Variables
4. Add new variable:
   - **Name**: `RESEND_API_KEY`
   - **Value**: Your copied Resend API key
   - **Environment**: Production, Preview, Development (select all)
5. Click "Save"

### 3. Redeploy
1. Go to Deployments tab in Vercel
2. Click "Redeploy" on latest deployment
3. Or just push a new commit to trigger auto-deployment

## How It Works

1. **User submits form** → Serverless function processes it
2. **Email sent via Resend** → Delivered to your Gmail
3. **Backup mailto** → Opens if API fails

## Email Format You'll Receive

```
Subject: Portfolio Contact: [User's Subject]
From: Portfolio Contact <onboarding@resend.dev>
Reply-To: [User's Email]

New Portfolio Contact
===================
Name: John Doe
Email: john@example.com
Subject: Collaboration Inquiry

Message:
Hi Kiran, I'd like to discuss a potential project...

---
This message was sent from your portfolio contact form.
Reply directly to this email to respond to John Doe.
```

## Free Limits
- **Resend Free Tier**: 3,000 emails/month, 100 emails/day
- **No credit card required**
- **Perfect for portfolio contact forms**

## Testing
1. Visit your portfolio
2. Fill out contact form
3. Submit message
4. Check your Gmail for the email!

## Troubleshooting
- If emails don't arrive, check Vercel logs for errors
- Verify environment variable is set correctly
- Check spam folder in Gmail
- Mailto fallback ensures messages never get lost

---

**That's it! Your contact form is now production-ready! 🚀**