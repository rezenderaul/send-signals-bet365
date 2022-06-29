const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const getData = require('./getData');

puppeteer.use(StealthPlugin());

(async () => {

    const browser = await puppeteer.launch({
        headless: true,
        args: [
            "--start-maximized", 
            "--window-size=1920,1080",
            "--disable-gpu",
            "--disable-extensions",
            "--proxy-server='direct://'",
            "--proxy-bypass-list=*",
            "--headless",
            "--no-sandbox",
            "--disable-setuid-sandbox"
        ],
    });

    const page = await browser.newPage();
    
    await page.setUserAgent(
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/103.0.0.0 Safari/537.36'
    );

    await page.goto('https://www.bet365.com/#/IP/B1');

    console.log('Executing...');

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
        console.log(error);
    }

    let addToAlreadySent = [];
    let signalToBeSent = [];
    let countMatches = 0;

    console.log('Initializing the loops...');

    // scrapper
    setInterval(async () => {
        countMatches = 0;

        for (let i = 0; i < 1000; i++) {
            let fatherSelector = `.ovm-OverviewView_Classification > div.ovm-CompetitionList > div:nth-child(${i + 2})`;
            let fatherDivExists = await page.$eval(fatherSelector, () => true).catch(() => false);

            let competitionSelector = `.ovm-CompetitionList > div:nth-child(${i + 2}) > div.ovm-CompetitionHeader.ovm-CompetitionHeader-media > div > div.ovm-CompetitionHeader_Name.ovm-CompetitionHeader_Name-faves`
            let competitionDivExist = await page.$eval(competitionSelector, () => true).catch(() => false);

            if (!fatherDivExists || !competitionDivExist) {
                break;
            }

            let competitionName = await page.$eval(competitionSelector, result => result.innerText);

            if (competitionName.indexOf('E-soccer') != -1) {
                break;
            }

            for (let j = 0; j < 1000; j++) {
                let childSelector = `${fatherSelector}  div.ovm-FixtureList.ovm-Competition_Fixtures > div:nth-child(${j + 2}) > div.ovm-MediaIconContainer > div > div`;
                let childDivExists = await page.$eval(childSelector, () => true).catch(() => false);

                if (!childDivExists) {
                    break;
                }

                let idSelector = `.ovm-OverviewView_Classification > div.ovm-CompetitionList > div:nth-child(${i + 2}) > div.ovm-FixtureList.ovm-Competition_Fixtures > div:nth-child(${j + 2})`;

                let idOfMatch = await page.$$eval(idSelector, result => result[0].wrapper.stem.data.C2).catch(() => false);

                let linkOfMatch = `https://www.bet365.com/#/IP/EV15${idOfMatch}2C1`;

                await page.waitForSelector(childSelector);

                try {
                    await page.click(childSelector).catch(() => false);
                } catch (error) {
                    continue;
                }


                let iconVideoSelector = '[class="lv-ButtonBar_MatchLiveIcon me-MediaButtonLoader me-MediaButtonLoader_ML1 "]';
                let iconVideoExists = await page.$eval(iconVideoSelector, () => true).catch(() => false);

                if (iconVideoExists) {
                    try {
                        await page.click(iconVideoSelector).catch(() => false);
                    } catch (error) {
                        continue
                    }
                }

                await page.waitForTimeout(300);

                let timerSelector = ".ml1-MatchLiveSoccerModule_Constrainer.ml1-MatchLiveSwipeContainer_Child.ml1-MatchLiveSwipeContainer_X_ViewIndex-0.ml1-MatchLiveSwipeContainer_Y_ViewIndex-0 > div > div > div.ml1-SoccerClock > div > div > div > span.ml1-SoccerClock_Clock";

                let timer = await page.$eval(timerSelector, result => result.innerText).catch(() => false);

                countMatches++;

                if (!timer) {
                    continue;
                }

                let teams = await page.$$eval('[class="lsb-ScoreBasedScoreboard_TeamName "]', result => result.map(team => team.innerText).map(x => x.trim()));

                let score = await page.$$eval('[class="lsb-ScoreBasedScoreboard_TeamScore "]', result => result.map(team => team.innerText).map(x => x.trim()));

                let attacksAndPossession = await page.$$eval('[class="ml-WheelChart_Container "]', result => result.map(info => info.innerText).map(x => x.trim()));

                let cardsAndCorners = await page.$$eval('[class="ml1-StatsColumn_MiniValue "]', result => result.map(info => info.innerText).map(x => x.trim()));

                let kicks = await page.$$eval('[class^="ml-ProgressBar_MiniBarValue ml-ProgressBar_MiniBarValue"]', result => result.map(kick => kick.innerText).map(x => x.trim()));

                await Promise.all(
                    timer,
                    teams,
                    score,
                    attacksAndPossession,
                    cardsAndCorners,
                    kicks,
                    linkOfMatch);

                signalToBeSent.push({
                    competitionName,
                    timer,
                    teams,
                    score,
                    attacksAndPossession,
                    cardsAndCorners,
                    kicks,
                    linkOfMatch
                });
            }
        }

        getData(signalToBeSent, addToAlreadySent);

        console.log(`Total de jogos sendo analizados: ${countMatches}`);
        console.log(`Quantidades de jogos na memória do servidor: ${addToAlreadySent.length}`);

        while (signalToBeSent.length) {
            signalToBeSent.pop();
        }

    }, 1000 * 60);

})();