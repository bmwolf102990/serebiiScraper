const puppeteer = require('puppeteer');
const fs = require('fs');

const sleepDex = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
    '19',
    '20',
    '23',
    '24',
    '25',
    '26',
    '35',
    '36',
    '37',
    '38',
    '39',
    '40',
    '50',
    '51',
    '52',
    '53',
    '54',
    '55',
    '56',
    '57',
    '58',
    '59',
    '69',
    '70',
    '71',
    '74',
    '75',
    '76',
    '79',
    '80',
    '81',
    '82',
    '84',
    '85',
    '92',
    '93',
    '94',
    '95',
    '104',
    '105',
    '115',
    '122',
    '127',
    '132',
    '133',
    '134',
    '135',
    '136',
    '147',
    '148',
    '149',
    '152',
    '153',
    '154',
    '155',
    '156',
    '157',
    '158',
    '159',
    '160',
    '172',
    '173',
    '174',
    '175',
    '176',
    '179',
    '180',
    '181',
    '185',
    '196',
    '197',
    '199',
    '202',
    '208',
    '214',
    '225',
    '228',
    '229',
    '243',
    '244',
    '246',
    '247',
    '248',
    '280',
    '281',
    '282',
    '287',
    '288',
    '289',
    '302',
    '316',
    '317',
    '333',
    '334',
    '353',
    '354',
    '359',
    '360',
    '363',
    '364',
    '365',
    '438',
    '439',
    '447',
    '448',
    '453',
    '454',
    '459',
    '460',
    '462',
    '468',
    '470',
    '471',
    '475',
    '700',
    '702',
    '759',
    '760',
    '764',
    '845'
];

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
        page.setDefaultNavigationTimeout(0);

  for (let i = 0; i < sleepDex.length; i++) {
    try {
      
      await fs.promises.stat(`../sprites/normal/${sleepDex[i]}.png`);
      continue;
    
    } catch(err) {
    
      // place error log here if needed
    
    };

    let viewSource = await page.goto(`https://serebii.net/pokemonsleep/pokemon/${sleepDex[i]}.png`);

    try {
    
      await fs.promises.writeFile(`../sprites/normal/${sleepDex[i]}.png`, await viewSource.buffer());
    
    } catch(err) {
    
      console.log(`Something went wrong on image: ${sleepDex[i]}`);
      console.log(err);
    
    }
  }

  await browser.close();
})();

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
          page.setDefaultNavigationTimeout(0);
  
    for (let i = 0; i < sleepDex.length; i++) {
      
      try {
    
        await fs.promises.stat(`../sprites/shiny/${sleepDex[i]}.png`);
        continue;
    
      } catch(err) {
      
        // place error log here if needed
    
      }

      let viewSource = await page.goto(`https://serebii.net/pokemonsleep/pokemon/shiny/${sleepDex[i]}.png`);
  
      try {
      
        await fs.promises.writeFile(`../sprites/shiny/${sleepDex[i]}.png`, await viewSource.buffer());
      
      } catch(err) {
      
        console.log(`Something went wrong on image: ${sleepDex[i]}`);
        console.log(err);
      
      }
    }
  
    await browser.close();
})();
