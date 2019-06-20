const puppeteer = require('puppeteer')
const pti = require('puppeteer-to-istanbul')

const TARGET = 'http://www.photocreate.co.jp/company/overview/'

async function main() {
  const browser = await puppeteer.launch()
  const page = await browser.newPage()

  await page.coverage.startCSSCoverage({ resetOnNavigation: false })
  // await page.coverage.startJSCoverage()
  await page.goto(TARGET)

  const cssCoverage = await page.coverage.stopCSSCoverage()
  // const jsCoverage = await page.coverage.stopJSCoverage()
  const data = cssCoverage.map(coverage => {
    coverage.url = coverage.url.replace('?', 'symbol')
    return coverage
  })
  // const jsData = jsCoverage.map(coverage => {
  //   coverage.url = coverage.url.replace('?', 'symbol')
  //   return coverage
  // })
  pti.write(data)
  // pti.write(jsData)

  browser.close()
}

main()
