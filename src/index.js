/*
=============================================================
this is a scraper tool for pulling resources from serebii.net
=============================================================
*/

const puppeteer = require('puppeteer');
const fs = require('fs');

// array of Pokédex numbers
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
    '845',
    '25-nightcap'
];
// array of Pokémon types
const pokemonTypes = [
    'bug',
    'dark',
    'dragon',
    'electric',
    'fairy',
    'fighting',
    'fire',
    'flying',
    'ghost',
    'grass',
    'ground',
    'ice',
    'normal',
    'poison',
    'psychic',
    'rock',
    'steel',
    'water'
];
// array of in-game berries
const berries = [
  'belueberry',
  'blukberry',
  'cheriberry',
  'chestoberry',
  'durinberry',
  'grepaberry',
  'leppaberry',
  'lumberry',
  'magoberry',
  'oranberry',
  'pamtreberry',
  'pechaberry',
  'persimberry',
  'rawstberry',
  'sitrusberry',
  'wikiberry',
  'yacheberry'
];
// array of in-game items
const items = [
  'bonusbiscuit',
  'dawnstone',
  'dreamclusterl',
  'dreamclusterm',
  'dreamclusters',
  'energypillow',
  'e-zzztravelticket',
  'firecandy',
  'firestone',
  'focusincense',
  'friendincense',
  'goodcampticket',
  'greatbiscuit',
  'growthincense',
  'handycandyl',
  'handycandym',
  'handycandys',
  'helperwhistle',
  'icestone',
  'ingredientticketl',
  'ingredientticketm',
  'ingredienttickets',
  'king\'srock',
  'leafstone',
  'linkingcord',
  'luckincense',
  'mainskillseed',
  'masterbiscuit',
  'metalcoat',
  'moonstone',
  'ovalstone',
  'pokebiscuit',
  'premiumbonusbiscuit',
  'recoveryincense',
  'shinystone',
  'subskillseed',
  'thunderstone',
  'waterstone',
  'bugincense',
  'darkincense',
  'dragonincense',
  'electricincense',
  'fairyincense',
  'fightingincense',
  'fireincense',
  'flyingincense',
  'ghostincense',
  'grassincense',
  'groundincense',
  'iceincense',
  'normalincense',
  'poisonincense',
  'psychicincense',
  'rockincense',
  'steelincense',
  'waterincense'
];
// array of in-game ingredients
const ingredients =[
  'beansausage',
  'fancyapple',
  'fancyegg',
  'fieryherb',
  'greengrasscorn',
  'greengrasssoybeans',
  'honey',
  'largeleek',
  'moomoomilk',
  'pureoil',
  'slowpoketail',
  'snoozytomato',
  'softpotato',
  'soothingcacao',
  'tastymushroom',
  'warmingginger'
];
// array of in-game dishes
const dishes = {
  curry: [
    'mixedcurry',
    'fancyapplecurry',
    'grilledtailcurry',
    'solarpowertomatocurry',
    'dreameaterbuttercurry',
    'spicyleekcurry',
    'sporemushroomcurry',
    'eggbombcurry',
    'heartycheeseburgercurry',
    'softpotatochowder',
    'simplechowder',
    'beanburgercurry',
    'mildhoneycurry',
    'ninjacurry',
    'droughtkatsucurry',
    'meltyomelettecurry',
    'bulkupbeancurry',
    'limbercornstew',
    'infernocornkeemacurry'
  ],
  dessert: [
    'mixedjuice',
    'fluffysweetpotatoes',
    'steadfastgingercookies',
    'fancyapplejuice',
    'craftsodapop',
    'embergingertea',
    'jigglypuff\'sfruityflan',
    'lovelykisssmoothie',
    'luckchantapplepie',
    'neroli\'srestorativetea',
    'sweetscentchocolatecake',
    'warmmoomoomilk',
    'cloudninesoycake',
    'hustleproteinsmoothie',
    'stalwartvegetablejuice',
    'bigmalasada',
    'hugepowersoydonuts',
    'explosionpopcorn',
    'teatimecornscones',
    'petaldancechocolatetart',
    'flowergiftmacarons'
  ],
  salad: [
    'mixedsalad',
    'slowpoketailpeppersalad',
    'sporemushroomsalad',
    'snowcloakcaesarsalad',
    'gluttonypotatosalad',
    'waterveiltofusalad',
    'superpowerextremesalad',
    'beanhamsalad',
    'snoozytomatosalad',
    'moomoocapresesalad',
    'contrarychocolatemeatsalad',
    'overheatgingersalad',
    'fancyapplesalad',
    'immunityleeksalad',
    'dazzlingapplecheesesalad',
    'ninjasalad',
    'heatwavetofusalad',
    'greengrasssalad',
    'calmmindfruitsalad',
    'furyattackcornsalad'
  ],
};
// scraper function
const serebiiScraper = async (data, filepath, source) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
        page.setDefaultNavigationTimeout(0);

  for (let i = 0; i < sleepDex.length; i++) {
    try {
      
      await fs.promises.stat(`${filepath}${data[i]}.png`);
      continue;
    
    } catch(err) {
    
      // place error log here if needed
    
    };

    let viewSource = await page.goto(`${source}${data[i]}.png`);

    try {
    
      await fs.promises.writeFile(`${filepath}${data[i]}.png`, await viewSource.buffer());
    
    } catch(err) {
    
      console.log(`Something went wrong on image: ${data[i]}`);
      console.log(err);
    
    }
  }

  await browser.close();
}
// scrapes normal sprite images
serebiiScraper(sleepDex, '../assets/sprites/normal/', 'https://serebii.net/pokemonsleep/pokemon/');
// scrapes shiny sprite images
serebiiScraper(sleepDex, '../assets/sprites/shiny/', 'https://serebii.net/pokemonsleep/pokemon/shiny/');
// scrapes type images
serebiiScraper(pokemonTypes, '../assets/types/', 'https://serebii.net/pokemonsleep/pokemon/type/');
// scrapes berry images
serebiiScraper(berries, '../assets/berries/', 'https://serebii.net/pokemonsleep/berries/');
// scrapes item images
serebiiScraper(items, '../assets/items/', 'https://serebii.net/pokemonsleep/items/');
// scrapes ingredient images
serebiiScraper(ingredients, '../assets/ingredients/', 'https://serebii.net/pokemonsleep/ingredients/');
// scrapes curry dish images
serebiiScraper(dishes.curry, '../assets/dishes/curries/', 'https://serebii.net/pokemonsleep/meals/');
// scrapes dessert dish images
serebiiScraper(dishes.dessert, '../assets/dishes/desserts/', 'https://serebii.net/pokemonsleep/meals/');
// scrapes salad dish images
serebiiScraper(dishes.salad, '../assets/dishes/salads/', 'https://serebii.net/pokemonsleep/meals/');
