// Test endpoint to check if environment variables are set
export default function handler(req, res) {
  const hasApiKey = !!process.env.RESEND_API_KEY;
  const keyPreview = process.env.RESEND_API_KEY ? 
    `${process.env.RESEND_API_KEY.slice(0, 8)}...` : 
    'Not found';
  
  return res.status(200).json({
    hasApiKey,
    keyPreview,
    environment: process.env.NODE_ENV,
    timestamp: new Date().toISOString()
  });
}