const scraper = async (browser, url) => new Promise(async( resolve, reject) => {
    try {
        const pages = await browser.pages();
        const page = pages[pages.length - 1];
        let html = await page.$$eval('div.question-item', divs => {
            return divs.map(div => {
                const question = div.querySelector('p') ? div.querySelector('p').innerHTML : '';
                const answers = Array.from(div.querySelectorAll('span'), span => span.innerHTML);
                return { question, answers };
            });
        });
        console.log('>> Lay noi dung trang web');

        html = html.map(item => {
            item.question = item.question.replace(/<!--[\s\S]*?-->/g, '')
                                         .replace(/<input[^>]*>/g, '')
                                         .replace(' \n        Đánh dấu', '');
            item.answers = item.answers.map(answer => answer.replace(/<!--[\s\S]*?-->/g, '')
                                                            .replace(/<input[^>]*>/g, '')
                                                            .replace(' \n        Đánh dấu', ''));
            return item;
        });

        // html = html.map(str => str.replace(/<!--[\s\S]*?-->/g, '')
        //                             .replace(/<input[^>]*>/g, '')
        //                             .replace(' \n        Đánh dấu', ''));

        resolve(html);

        return html;
    }
    catch(err) {
        console.log("Could not resolve the browser instance => ", err);
        reject(err);
    }
});

module.exports = {
    scraper
}