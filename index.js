const PORT = 8000;
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();


const marketPlaces = [
  {
    name: 'LandWatch',
    url: 'https://www.landwatch.com/north-carolina-land-for-sale/piedmont-region/homesites/price-under-49999/acres-1-10/available',
    base: 'https://www.landwatch.com',
    searchCommand: 'div:contains("County")._61961 a'
  },
  {
    name: 'RedFin',
    url: 'https://www.redfin.com/county/494/FL/Sarasota-County/filter/sort=hi-lot-sqft,property-type=land,max-price=75k,min-lot-size=0.5-acre,viewport=35.58399:35.36087:-79.94314:-80.33899,no-outline',
    base: 'https://www.redfin.com',
    searchCommand: 'a:contains("NC")'
  }
];

let articles = [];

// home route
app.get('/', (req, res) => {
  res.json("Welcome to Land Scout! A place to find the land parcel of your *dreams*!");
});

// land route
app.get('/land', async (req, res) => {

  try {

    for(let i = 0; i < marketPlaces.length; i++) {

      await axios.get(marketPlaces[i].url)
      .then((response) => {

        const html = response.data;
        const $ = cheerio.load(html);
    
        //look for 'a' tags that contains keyword 'County' inside div elements with class '_61961'
        $(marketPlaces[i].searchCommand, html).each(function() {
          const title = $(this).text();
          const url = $(this).attr('href');
          
          articles.push({
            title,
            url: marketPlaces[i].base + url,
            name: marketPlaces[i].name
          });
        });
    
      });
    }
    
    res.json(articles);

    articles = [];

  } catch(err) {
    console.log(err);
  } 

});

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));