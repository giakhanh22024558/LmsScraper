const scraper = require('./scraper');
const readline = require('readline');

const scrapeController =  async (browserInstance) => {
    try {
        const browser = await browserInstance;

        const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        rl.question('Please enter the url: ', async(url) => {
            const response = await scraper.scraper(browser, url);
            console.log(response);
            rl.close();
        });

    }
    catch(err) {
        console.log("Could not resolve the browser instance => ", err);
    }
}

module.exports = scrapeController;