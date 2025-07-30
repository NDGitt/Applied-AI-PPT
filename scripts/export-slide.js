const puppeteer = require('puppeteer');
const path = require('path');

// Get slide number from command line argument
const slideNumber = process.argv[2];

if (!slideNumber) {
    console.error('❌ Please provide a slide number as an argument');
    console.log('Usage: node export-slide.js <slideNumber>');
    console.log('Example: node export-slide.js 5');
    process.exit(1);
}

(async () => {
    try {
        console.log(`🚀 Starting export of slide ${slideNumber}...`);
        
        // Determine the correct filename
        let filename;
        if (slideNumber === '11') {
            filename = 'Page11.html';
        } else {
            filename = `Page ${slideNumber}.html`;
        }

        const filePath = path.join(__dirname, '..', filename);
        
        console.log(`📄 Looking for file: ${filename}`);
        
        const browser = await puppeteer.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        
        const page = await browser.newPage();
        
        await page.goto(`file://${filePath}`, { waitUntil: 'networkidle0' });

        // Measure the height of the main slide container
        const contentHeight = await page.evaluate(() => {
            const el = document.querySelector('body > div');
            return el ? el.offsetHeight : document.body.scrollHeight;
        });

        const outputPath = path.join(__dirname, '..', 'Exported slides', `Page ${slideNumber}-fit-content.pdf`);
        
        console.log(`📊 Generating PDF with height: ${contentHeight}px`);
        
        await page.pdf({
            path: outputPath,
            width: '1280px',
            height: `${contentHeight}px`,
            printBackground: true,
            margin: { top: 0, right: 0, bottom: 0, left: 0 }
        });

        await browser.close();

        console.log(`✅ Slide ${slideNumber} exported successfully to: ${outputPath}`);

    } catch (error) {
        console.error('💥 Export error:', error.message);
        process.exit(1);
    }
})(); 