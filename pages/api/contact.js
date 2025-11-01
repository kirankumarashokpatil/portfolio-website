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
        from: 'Kirankumar Patil Portfolio <onboarding@resend.dev>',
        to: ['kirankumarashokpatil@gmail.com'],
        reply_to: email,
        subject: `New Contact: ${subject || 'Portfolio Inquiry'} - ${name}`,
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Portfolio Contact</title>
          </head>
          <body style="margin: 0; padding: 0; background-color: #f8f9fa; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
            <div style="max-width: 600px; margin: 40px auto; background: white; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
              
              <!-- Professional Header -->
              <div style="background: #ffffff; padding: 40px 40px 30px 40px; border-bottom: 3px solid #2c3e50;">
                <h1 style="color: #2c3e50; margin: 0; font-size: 28px; font-weight: 300; letter-spacing: -0.5px;">Portfolio Contact</h1>
                <p style="color: #7f8c8d; margin: 8px 0 0 0; font-size: 16px; font-weight: 400;">New inquiry received</p>
              </div>
              
              <!-- Contact Information -->
              <div style="padding: 40px;">
                <div style="margin-bottom: 35px;">
                  <h2 style="color: #34495e; margin: 0 0 20px 0; font-size: 20px; font-weight: 500; border-bottom: 2px solid #ecf0f1; padding-bottom: 10px;">Contact Information</h2>
                  <table style="width: 100%; border-collapse: collapse; font-size: 15px;">
                    <tr>
                      <td style="padding: 12px 0; font-weight: 600; color: #7f8c8d; width: 120px;">Name</td>
                      <td style="padding: 12px 0; color: #2c3e50; font-weight: 500;">${name}</td>
                    </tr>
                    <tr style="border-top: 1px solid #ecf0f1;">
                      <td style="padding: 12px 0; font-weight: 600; color: #7f8c8d;">Email</td>
                      <td style="padding: 12px 0;"><a href="mailto:${email}" style="color: #3498db; text-decoration: none; font-weight: 500;">${email}</a></td>
                    </tr>
                    <tr style="border-top: 1px solid #ecf0f1;">
                      <td style="padding: 12px 0; font-weight: 600; color: #7f8c8d;">Subject</td>
                      <td style="padding: 12px 0; color: #2c3e50; font-weight: 500;">${subject || 'General Inquiry'}</td>
                    </tr>
                    <tr style="border-top: 1px solid #ecf0f1;">
                      <td style="padding: 12px 0; font-weight: 600; color: #7f8c8d;">Date</td>
                      <td style="padding: 12px 0; color: #7f8c8d; font-size: 14px;">${new Date().toLocaleString('en-US', { 
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
                <div style="margin-bottom: 35px;">
                  <h3 style="color: #34495e; margin: 0 0 15px 0; font-size: 18px; font-weight: 500; border-bottom: 2px solid #ecf0f1; padding-bottom: 10px;">Message</h3>
                  <div style="background: #f8f9fa; padding: 25px; border-left: 4px solid #3498db; margin: 15px 0;">
                    <p style="margin: 0; line-height: 1.7; color: #2c3e50; white-space: pre-wrap; font-size: 15px;">${message}</p>
                  </div>
                </div>
                
                <!-- Action Button -->
                <div style="text-align: center; margin: 40px 0 20px 0;">
                  <a href="mailto:${email}?subject=Re: ${subject || 'Portfolio Inquiry'}&body=Hi ${name.split(' ')[0]},%0D%0A%0D%0AThank you for reaching out through my portfolio. " 
                     style="display: inline-block; background: #3498db; color: white; padding: 15px 30px; text-decoration: none; border-radius: 4px; font-weight: 500; font-size: 15px; transition: background-color 0.3s;">
                    Reply to ${name.split(' ')[0]}
                  </a>
                </div>
              </div>
              
              <!-- Professional Footer -->
              <div style="background: #ecf0f1; padding: 25px 40px; text-align: center; border-top: 1px solid #bdc3c7;">
                <p style="margin: 0; color: #7f8c8d; font-size: 13px; line-height: 1.5;">
                  This message was sent through your portfolio contact form at<br>
                  <strong>portfolio-website-ashy-alpha-48.vercel.app</strong><br>
                  <span style="color: #95a5a6;">Click reply above to respond directly to the sender</span>
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