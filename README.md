# [Land-Scout](https://land-scout.herokuapp.com/land)
## What It Does
Land Scout searches several web marketplaces that sell land and returns a json of multiple land parcels currently for sale in the Piedmont region of North Carolina.

It achieves this by web scraping each page and returning an array of objects containing the parcels.

## Getting Started
* Clone or fork this repo.
* Open in your IDE of choice and install dependents with `npm install` in the command line.
* Run the program in the command line with `npm run start`.
* Navigate to `http://localhost:9000/` in your browser.

## Dependencies
* Cheerio
* Express
* Axios 
* cookie-parser
* debug
* http-errors
* jade
* morgan
* nodemon

## End-Points
* `/` - home page
* `/land` - returns a json of land parcels currently for sale.
