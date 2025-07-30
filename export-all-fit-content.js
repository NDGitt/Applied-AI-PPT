const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

(async () => {
  const browser = await puppeteer.launch();
  const slideFiles = [
    'Page 1.html',
    'Page 2.html',
    'Page 3.html',
    'Page 4.html',
    'Page 5.html',
    'Page 6.html',
    'Page 7.html',
    'Page 8.html',
    'Page 9.html',
    'Page 10.html'
  ];

  for (const file of slideFiles) {
    const page = await browser.newPage();
    await page.goto('file://' + path.join(__dirname, file), {waitUntil: 'networkidle0'});
    const contentHeight = await page.evaluate(() => {
      const el = document.querySelector('body > div');
      return el ? el.offsetHeight : document.body.scrollHeight;
    });
    const pdfName = file.replace('.html', '-fit-content.pdf');
    await page.pdf({
      path: pdfName,
      width: '1280px',
      height: `${contentHeight}px`,
      printBackground: true,
      margin: {top: 0, right: 0, bottom: 0, left: 0}
    });
    await page.close();
    console.log(`Exported ${pdfName}`);
  }

  await browser.close();
})(); 