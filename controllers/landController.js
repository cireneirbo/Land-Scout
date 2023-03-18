const axios = require('axios');
const cheerio = require('cheerio');

const marketPlaces = [
  {
    name: 'LandWatch',
    url: 'https://www.landwatch.com/north-carolina-land-for-sale/piedmont-region/homesites/price-under-49999/acres-1-10/available',
    baseUrl: 'https://www.landwatch.com',
    searchCommand: 'div:contains("County")._61961 a'
  },
  {
    name: 'RedFin',
    url: 'https://www.redfin.com/county/494/FL/Sarasota-County/filter/sort=hi-lot-sqft,property-type=land,max-price=75k,min-lot-size=0.5-acre,viewport=35.58399:35.36087:-79.94314:-80.33899,no-outline',
    baseUrl: '',
    searchCommand: ''
  }
];

const articles = [];

// home route
// app.get('/', (req, res) => {
//   res.json("Welcome to Land Scout! A place to find the land parcel of your *dreams*!");
// });

// land route
exports.land_parcels = function (req, res ,next) {

    try {

      for(let i = 0; i < marketPlaces.length - 1; i++) {

        axios.get(url)
        .then((response) => {
          const html = response.data;
          const $ = cheerio.load(html);
      
          //look for 'a' tags that contains keyword
          $(searchCommand, html).each(function() {

            const title = $(this).text();
            const url = $(this).attr('href');
            
            articles.push({
              title,
              url: baseUrl + url
            });

          });
        })
      }
      
      res.json(articles);
  
    } catch (error) {
      
      console.error(error);
      res.send( { error: error } );

    }
}
