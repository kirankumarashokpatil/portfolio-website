export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, subject, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Using Resend API (free tier allows 3000 emails/month)
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Portfolio Website <onboarding@resend.dev>',
        to: ['kirankumarashokpatil@gmail.com'],
        reply_to: email,
        subject: `💼 Portfolio Inquiry: ${subject || 'New Message'} - from ${name}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Portfolio Contact</title>
          </head>
          <body style="margin: 0; padding: 20px; background-color: #f5f5f5; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;">
            <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); overflow: hidden;">
              
              <!-- Header -->
              <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center;">
                <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 600;">💼 New Portfolio Contact</h1>
                <p style="color: rgba(255,255,255,0.9); margin: 8px 0 0 0; font-size: 16px;">Someone is interested in your work!</p>
              </div>
              
              <!-- Contact Information -->
              <div style="padding: 30px;">
                <div style="background: #f8fafc; border-left: 4px solid #3b82f6; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
                  <h2 style="color: #1e293b; margin: 0 0 15px 0; font-size: 18px;">📝 Contact Details</h2>
                  <table style="width: 100%; border-collapse: collapse;">
                    <tr>
                      <td style="padding: 8px 0; font-weight: 600; color: #374151; width: 80px;">👤 Name:</td>
                      <td style="padding: 8px 0; color: #111827;">${name}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; font-weight: 600; color: #374151;">📧 Email:</td>
                      <td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #3b82f6; text-decoration: none;">${email}</a></td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; font-weight: 600; color: #374151;">📋 Subject:</td>
                      <td style="padding: 8px 0; color: #111827;">${subject || 'General Inquiry'}</td>
                    </tr>
                    <tr>
                      <td style="padding: 8px 0; font-weight: 600; color: #374151;">🕒 Time:</td>
                      <td style="padding: 8px 0; color: #6b7280;">${new Date().toLocaleString('en-US', { 
                        timeZone: 'Asia/Kolkata',
                        year: 'numeric',
                        month: 'long', 
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                      })} IST</td>
                    </tr>
                  </table>
                </div>
                
                <!-- Message Content -->
                <div style="background: #ffffff; border: 2px solid #e5e7eb; border-radius: 8px; padding: 25px;">
                  <h3 style="color: #1e293b; margin: 0 0 15px 0; font-size: 16px; display: flex; align-items: center;">
                    💬 Message Content
                  </h3>
                  <div style="background: #f9fafb; padding: 20px; border-radius: 6px; border-left: 3px solid #10b981;">
                    <p style="margin: 0; line-height: 1.6; color: #374151; white-space: pre-wrap; font-size: 15px;">${message}</p>
                  </div>
                </div>
                
                <!-- Action Buttons -->
                <div style="text-align: center; margin: 30px 0 20px 0;">
                  <a href="mailto:${email}?subject=Re: ${subject || 'Portfolio Inquiry'}" 
                     style="display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 0 10px;">
                    📧 Reply to ${name.split(' ')[0]}
                  </a>
                  <a href="mailto:${email}" 
                     style="display: inline-block; background: #10b981; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: 600; margin: 0 10px;">
                    ✉️ Send New Email
                  </a>
                </div>
              </div>
              
              <!-- Footer -->
              <div style="background: #f8fafc; padding: 20px; text-align: center; border-top: 1px solid #e5e7eb;">
                <p style="margin: 0; color: #6b7280; font-size: 14px;">
                  🌐 This message was sent from your <strong>Portfolio Contact Form</strong><br>
                  <span style="color: #9ca3af;">Reply directly to respond to the sender</span>
                </p>
              </div>
            </div>
          </body>
          </html>
        `,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Resend API error:', errorText);
      throw new Error(`Resend API error: ${response.status}`);
    }

    const result = await response.json();
    console.log('Email sent successfully:', result);

    return res.status(200).json({ 
      success: true, 
      message: 'Email sent successfully',
      id: result.id 
    });

  } catch (error) {
    console.error('Email sending error:', error);
    return res.status(500).json({ 
      error: 'Failed to send email',
      details: error.message 
    });
  }
}