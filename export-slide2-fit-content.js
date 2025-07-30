const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('file://' + __dirname + '/Page 2.html', {waitUntil: 'networkidle0'});

  // Measure the height of the main slide container
  const contentHeight = await page.evaluate(() => {
    const el = document.querySelector('body > div');
    return el ? el.offsetHeight : document.body.scrollHeight;
  });

  await page.pdf({
    path: 'Exported slides/Page 2-fit-content.pdf',
    width: '1280px',
    height: `${contentHeight}px`,
    printBackground: true,
    margin: {top: 0, right: 0, bottom: 0, left: 0}
  });

  await browser.close();
})(); 