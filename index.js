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
    base: '',
    searchCommand: ''
  }
]
const articles = [];

// home route
app.get('/', (req, res) => {
  res.json("Welcome to Land Scout! A place to find the land parcel of your *dreams*!");
});

// land route
app.get('/land', (req, res) => {
  axios.get('https://www.landwatch.com/north-carolina-land-for-sale/piedmont-region/homesites/price-under-49999/acres-1-10/available')
  .then((response) => {
    const html = response.data;
    //console.log(html);
    const $ = cheerio.load(html);

    //look for 'a' tags that contains keyword 'County' inside div elements with class '_61961'
    $('div:contains("County")._61961 a', html).each(function() {
      const title = $(this).text();
      const url = $(this).attr('href');
      articles.push({
        title,
        url: "https://www.landwatch.com" + url
      });
    });

    res.json(articles);
  }).catch((err) => console.log(err));
});




app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));