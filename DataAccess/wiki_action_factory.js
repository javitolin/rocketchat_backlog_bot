const config = require('config');

// const SearchWiki = require(`./${config.get("general.platform")}/wiki_api`)
const SearchWiki = require("./ado/wiki_api")
console.log("SearchWiki", SearchWiki)
module.exports = { SearchWiki: SearchWiki.SearchWiki };