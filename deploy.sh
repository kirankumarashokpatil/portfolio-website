#!/bin/bash
# Fresh Deployment Setup Script

echo "🚀 PORTFOLIO FRESH DEPLOYMENT SETUP"
echo "=================================="
echo ""

echo "📊 Build Status Check..."
npm run build

if [ $? -eq 0 ]; then
    echo "✅ Build successful! Ready for deployment."
    echo ""
    echo "🔗 Next Steps:"
    echo "1. Go to: https://vercel.com/new"
    echo "2. Import: kirankumarashokpatil/portfolio-website"
    echo "3. Deploy with default settings"
    echo ""
    echo "📁 Repository URL:"
    echo "https://github.com/kirankumarashokpatil/portfolio-website"
    echo ""
    echo "🎯 Your portfolio features:"
    echo "• Custom homepage with BESS/AI expertise"
    echo "• Interactive technology stack (35+ technologies)"
    echo "• Professional testimonials carousel"
    echo "• Direct contact form integration"
    echo "• GitHub-integrated project showcase"
    echo "• Responsive design for all devices"
    echo ""
    echo "🚀 Ready for professional deployment!"
else
    echo "❌ Build failed. Please check the logs above."
    exit 1
fi