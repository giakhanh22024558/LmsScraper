const puppeteer = require('puppeteer');
const startBrowser = async () => {
    try {
        const browser = await puppeteer.launch({ headless: false,
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
            ignoreHTTPSErrors: true,
        });

        const page = await browser.newPage(); 
        await page.goto('https://idp.vnu.edu.vn/auth/realms/vnu/protocol/openid-connect/auth?scope=openid&response_type=code&Kc_locale=vi&client_id=elearn&kc_locale=vi&redirect_uri=https://lms.vnu.edu.vn/signin');

        await page.type('#username', '22024558');
        await page.type('#password', 'bindeptrai123');

        await Promise.all([
            page.click('#kc-login'),
            page.waitForNavigation(),
        ]);
        
        return browser;
    }
    catch (err) {
        console.log("Could not create a browser instance => : ", err);
    }
};

module.exports = startBrowser;