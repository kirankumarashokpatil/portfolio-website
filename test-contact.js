// Test script for contact form API
// Run this locally with: node test-contact.js

const testContactForm = async () => {
  const testData = {
    name: "Test User",
    email: "kiranmipqrs@gmail.com", 
    subject: "Testing Email Feature",
    message: "This is a test of the contact form email functionality. If you receive this, the email system is working correctly!"
  };

  try {
    console.log('🧪 Testing contact form...');
    console.log('Test data:', testData);
    
    // Test locally (if running npm run dev)
    const response = await fetch('http://localhost:3000/api/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });

    const result = await response.json();
    
    if (response.ok) {
      console.log('✅ Success!', result);
      console.log('📧 Email should be sent to: kirankumarashokpatil@gmail.com');
    } else {
      console.log('❌ Error:', result);
      if (result.error?.includes('RESEND_API_KEY')) {
        console.log('💡 Fix: Add RESEND_API_KEY to your .env.local file');
      }
    }
  } catch (error) {
    console.error('🚨 Network error:', error.message);
    console.log('💡 Make sure you have npm run dev running');
  }
};

// For Node.js environments that don't have fetch
if (typeof fetch === 'undefined') {
  console.log('❌ This script needs to run in a browser or with node-fetch');
  console.log('💡 Instead, test directly through your portfolio contact form');
  console.log('🌐 Go to: https://portfolio-website-ashy-alpha-48.vercel.app');
} else {
  testContactForm();
}