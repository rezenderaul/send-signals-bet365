const puppeteer = require('puppeteer');
const getData = require('./getData');

(async () => {

    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
        args: ["--start-maximized"],
        //devtools: true
    });

    const page = await browser.newPage();
    await page.goto('https://www.bet365.com/#/IP/B1');

    page.setDefaultTimeout(0);

    // close statistics popup and accept cookies
    try {
        await (
            await page.waitForSelector(".iip-IntroductoryPopup_Cross")
        ).click();

        await (
            await page.waitForSelector(".ccm-CookieConsentPopup_Accept")
        ).click();
    } catch (error) {
        console.log(`Error: ${error}`);
    }

    //class="me-MediaButtonLoader me-MediaButtonLoader_ML1 "
    //class="me-MediaButtonLoader me-MediaButtonLoader_MLVideo "

    // scrapper
    for (let i=0; i<1000; i++) {
        let fatherSelector = `.ovm-OverviewView_Classification > div.ovm-CompetitionList > div:nth-child(${i+2})`;
        let fatherDivExists = await page.$eval(fatherSelector, () => true).catch(() => false);

        let competitionSelector = `.ovm-CompetitionList > div:nth-child(${i+2}) > div.ovm-CompetitionHeader.ovm-CompetitionHeader-media > div > div.ovm-CompetitionHeader_Name.ovm-CompetitionHeader_Name-faves`
        let competitionDivExist = await page.$eval(competitionSelector, () => true).catch(() => false);

        if (!fatherDivExists || !competitionDivExist) {
            break;
        }

        let competitionName = await page.$eval(competitionSelector, result => result.innerText);

        if (competitionName.indexOf('E-soccer') != -1) {
            break;
        }

        for (let j = 0; j<1000; j++) {
            let childSelector = `${fatherSelector}  div.ovm-FixtureList.ovm-Competition_Fixtures > div:nth-child(${j+2}) > div.ovm-MediaIconContainer > div > div`;
            let childDivExists = await page.$eval(childSelector, () => true).catch(() => false);

            if (!childDivExists) {
                break;
            }
            
            await page.waitForSelector(childSelector);
            await page.click(childSelector);
            
            await page.waitForTimeout(250);

            let iconVideoSelector = '[class="lv-ButtonBar_MatchLiveIcon me-MediaButtonLoader me-MediaButtonLoader_ML1 "]';
            let iconVideoExists = await page.$eval(iconVideoSelector, () => true).catch(() => false);

            if(iconVideoExists) {
                await page.click(iconVideoSelector);
            }

            
            let timerSelector = ".ml1-MatchLiveSoccerModule_Constrainer.ml1-MatchLiveSwipeContainer_Child.ml1-MatchLiveSwipeContainer_X_ViewIndex-0.ml1-MatchLiveSwipeContainer_Y_ViewIndex-0 > div > div > div.ml1-SoccerClock > div > div > div > span.ml1-SoccerClock_Clock";
            await page.waitForSelector(timerSelector);
            let timer = await page.$eval(timerSelector, result => result.innerText);

            let teams = await page.$$eval('[class="lsb-ScoreBasedScoreboard_TeamName "]', result => result.map(team => team.innerText));

            let score = await page.$$eval('[class="lsb-ScoreBasedScoreboard_TeamScore "]', result => result.map(team => team.innerText));

            console.log(competitionName)
            console.log(`Timer: ${timer}`);
            console.log(`${teams[0]} x ${teams[1]}`);
            console.log(`${score[0]} x ${score[1]}`);
            console.log('\n \n');

        }

    }

    console.log("End...")

})();