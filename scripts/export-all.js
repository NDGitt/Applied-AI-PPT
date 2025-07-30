const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');

(async () => {
    try {
        console.log('🚀 Starting export of all slides...');
        
        const files = await fs.readdir(path.join(__dirname, '..'));
        const slideFiles = files.filter(file => 
            file.match(/^Page \d+\.html$/) || file.match(/^Page\d+\.html$/)
        ).sort((a, b) => {
            const numA = parseInt(a.match(/\d+/)[0]);
            const numB = parseInt(b.match(/\d+/)[0]);
            return numA - numB;
        });

        console.log(`📄 Found ${slideFiles.length} slides to export:`, slideFiles);

        const browser = await puppeteer.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        const results = [];

        for (const file of slideFiles) {
            try {
                const slideNumber = file.match(/\d+/)[0];
                console.log(`📊 Exporting slide ${slideNumber}...`);
                
                const page = await browser.newPage();
                
                await page.goto(`file://${path.join(__dirname, '..', file)}`, { waitUntil: 'networkidle0' });

                const contentHeight = await page.evaluate(() => {
                    const el = document.querySelector('body > div');
                    return el ? el.offsetHeight : document.body.scrollHeight;
                });

                const outputPath = path.join(__dirname, '..', 'Exported slides', `Page ${slideNumber}-fit-content.pdf`);
                
                await page.pdf({
                    path: outputPath,
                    width: '1280px',
                    height: `${contentHeight}px`,
                    printBackground: true,
                    margin: { top: 0, right: 0, bottom: 0, left: 0 }
                });

                await page.close();
                console.log(`✅ Slide ${slideNumber} exported successfully`);
                results.push({ slide: slideNumber, status: 'success' });
                
            } catch (error) {
                console.error(`❌ Error exporting ${file}:`, error.message);
                results.push({ slide: file, status: 'error', error: error.message });
            }
        }

        await browser.close();

        console.log('\n📋 Export Summary:');
        results.forEach(result => {
            if (result.status === 'success') {
                console.log(`✅ Slide ${result.slide}: Success`);
            } else {
                console.log(`❌ ${result.slide}: ${result.error}`);
            }
        });

        console.log('\n🎉 Export process completed!');

    } catch (error) {
        console.error('💥 Fatal error:', error);
        process.exit(1);
    }
})(); 