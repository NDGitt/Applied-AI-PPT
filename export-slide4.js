const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('file://' + __dirname + '/Page 4.html', {waitUntil: 'networkidle0'});
  await page.pdf({
    path: 'Slide4-16x9.pdf',
    width: '1280px',
    height: '720px',
    printBackground: true,
    margin: {top: 0, right: 0, bottom: 0, left: 0}
  });
  await browser.close();
})(); 