const express = require('express');
const path = require('path');
const puppeteer = require('puppeteer');
const cors = require('cors');
const fs = require('fs').promises;

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('.'));

// API Routes
app.get('/api/slides', async (req, res) => {
    try {
        const files = await fs.readdir('.');
        const slideFiles = files.filter(file => 
            file.match(/^Page \d+\.html$/) || file.match(/^Page\d+\.html$/)
        );
        
        // Custom order: Page 11 should come after Page 12 (Next Steps)
        const customOrder = [
            'Page 1.html',
            'Page 2.html', 
            'Page 3.html',
            'Page 4.html',
            'Page 5.html',
            'Page 6.html',
            'Page 7.html',
            'Page 8.html',
            'Page 9.html',
            'Page 10.html',
            'Page 12.html',  // Next Steps
            'Page11.html'     // Resources & Support (Appendix)
        ];
        
        // Sort files according to custom order
        const sortedFiles = customOrder.filter(file => slideFiles.includes(file));
        
        res.json({ slides: sortedFiles });
    } catch (error) {
        res.status(500).json({ error: 'Failed to get slides list' });
    }
});

app.post('/api/export-slide', async (req, res) => {
    try {
        const { slideNumber } = req.body;
        
        if (!slideNumber) {
            return res.status(400).json({ error: 'Slide number is required' });
        }

        // Determine the correct filename
        let filename;
        if (slideNumber === 11) {
            filename = 'Page11.html';
        } else {
            filename = `Page ${slideNumber}.html`;
        }

        const filePath = path.join(__dirname, filename);
        
        // Check if file exists
        try {
            await fs.access(filePath);
        } catch {
            return res.status(404).json({ error: `Slide ${slideNumber} not found` });
        }

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

        const outputPath = path.join(__dirname, 'Exported slides', `Page ${slideNumber}-fit-content.pdf`);
        
        await page.pdf({
            path: outputPath,
            width: '1280px',
            height: `${contentHeight}px`,
            printBackground: true,
            margin: { top: 0, right: 0, bottom: 0, left: 0 }
        });

        await browser.close();

        res.json({ 
            success: true, 
            message: `Slide ${slideNumber} exported successfully`,
            file: `Page ${slideNumber}-fit-content.pdf`
        });

    } catch (error) {
        console.error('Export error:', error);
        res.status(500).json({ error: 'Failed to export slide' });
    }
});

app.post('/api/export-all', async (req, res) => {
    try {
        const files = await fs.readdir('.');
        const slideFiles = files.filter(file => 
            file.match(/^Page \d+\.html$/) || file.match(/^Page\d+\.html$/)
        );
        
        // Custom order: Page 11 should come after Page 12 (Next Steps)
        const customOrder = [
            'Page 1.html',
            'Page 2.html', 
            'Page 3.html',
            'Page 4.html',
            'Page 5.html',
            'Page 6.html',
            'Page 7.html',
            'Page 8.html',
            'Page 9.html',
            'Page 10.html',
            'Page 12.html',  // Next Steps
            'Page11.html'     // Resources & Support (Appendix)
        ];
        
        // Sort files according to custom order
        const sortedFiles = customOrder.filter(file => slideFiles.includes(file));

        const browser = await puppeteer.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        const results = [];

        for (const file of sortedFiles) {
            try {
                const slideNumber = file.match(/\d+/)[0];
                const page = await browser.newPage();
                
                await page.goto(`file://${path.join(__dirname, file)}`, { waitUntil: 'networkidle0' });

                const contentHeight = await page.evaluate(() => {
                    const el = document.querySelector('body > div');
                    return el ? el.offsetHeight : document.body.scrollHeight;
                });

                const outputPath = path.join(__dirname, 'Exported slides', `Page ${slideNumber}-fit-content.pdf`);
                
                await page.pdf({
                    path: outputPath,
                    width: '1280px',
                    height: `${contentHeight}px`,
                    printBackground: true,
                    margin: { top: 0, right: 0, bottom: 0, left: 0 }
                });

                await page.close();
                results.push({ slide: slideNumber, status: 'success' });
                
            } catch (error) {
                results.push({ slide: file, status: 'error', error: error.message });
            }
        }

        await browser.close();

        res.json({ 
            success: true, 
            message: 'All slides exported',
            results 
        });

    } catch (error) {
        console.error('Export all error:', error);
        res.status(500).json({ error: 'Failed to export all slides' });
    }
});

// Save slides configuration
app.post('/api/save-slides', async (req, res) => {
    try {
        const { slides } = req.body;
        
        if (!slides || !Array.isArray(slides)) {
            return res.status(400).json({ error: 'Invalid slides data' });
        }

        // Save the slides configuration to a JSON file
        const configPath = path.join(__dirname, 'slides-config.json');
        await fs.writeFile(configPath, JSON.stringify({ slides }, null, 2));

        res.json({ 
            success: true, 
            message: 'Slides configuration saved successfully' 
        });

    } catch (error) {
        console.error('Save slides error:', error);
        res.status(500).json({ error: 'Failed to save slides configuration' });
    }
});

// Export combined PDF with custom order
app.post('/api/export-combined', async (req, res) => {
    try {
        const { slides } = req.body;
        
        if (!slides || !Array.isArray(slides)) {
            return res.status(400).json({ error: 'Invalid slides data' });
        }

        const browser = await puppeteer.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        const pdfPages = [];

        for (let i = 0; i < slides.length; i++) {
            const slide = slides[i];
            const page = await browser.newPage();
            
            // Load the slide content
            await page.goto(`file://${path.join(__dirname, slide.file)}`, { waitUntil: 'networkidle0' });

            // Measure the height of the main slide container
            const contentHeight = await page.evaluate(() => {
                const el = document.querySelector('body > div');
                return el ? el.offsetHeight : document.body.scrollHeight;
            });

            // Generate PDF buffer for this slide
            const pdfBuffer = await page.pdf({
                width: '1280px',
                height: `${contentHeight}px`,
                printBackground: true,
                margin: { top: 0, right: 0, bottom: 0, left: 0 }
            });

            pdfPages.push(pdfBuffer);
            await page.close();
        }

        await browser.close();

        // Combine PDFs using pdf-lib
        const { PDFDocument } = require('pdf-lib');
        const mergedPdf = await PDFDocument.create();

        for (const pdfBuffer of pdfPages) {
            const pdf = await PDFDocument.load(pdfBuffer);
            const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
            copiedPages.forEach((page) => mergedPdf.addPage(page));
        }

        const mergedPdfBytes = await mergedPdf.save();

        // Set response headers for PDF download
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename="applied-ai-presentation.pdf"');
        res.setHeader('Content-Length', mergedPdfBytes.length);

        res.send(Buffer.from(mergedPdfBytes));

    } catch (error) {
        console.error('Export combined error:', error);
        res.status(500).json({ error: 'Failed to export combined PDF' });
    }
});

// Serve the main presentation viewer
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'presentation-viewer.html'));
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
    console.log(`📊 API available at http://localhost:${PORT}/api`);
    console.log('Press Ctrl+C to stop the server');
}); 