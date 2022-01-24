const cheerio = require('cheerio')
const axios = require('axios')

const url = 'https://www.ndtv.com/business/cryptocurrency/news'

const ndtv = async(req, res)=>{
    try {
        const {data} = await axios.get(url)
        // Load HTML we fetched in the previous line
        const $ = cheerio.load(data)
        const headlineBlock = $('.news_Itm')
        const headlines = []

        headlineBlock.each((idx, el)=>{
            const headline = {
                heading: '',
                link: '',
                image: '',
                time: '',
                content: '',
                source: 'NDTV'
            }
        
        headline.heading = $(el).children(".news_Itm-cont")
                                .children('.newsHdng')
                                .text()

        if(!headline.heading) return //remove ads

        headline.link = $(el).children('.news_Itm-cont')
                            .children('.newsHdng')
                            .children('a')
                            .attr('href')
                                                             
        headline.image = $(el).children('.news_Itm-img')
                              .children('a')
                              .children('img')
                              .attr('src')
        // format time
        let time = $(el).children('.news_Itm-cont')
                        .children('.posted-by')
                        .text()
        let formattedTime = time.split("|").pop().trim()
        headline.time = formattedTime

        headline.content = $(el).children('.news_Itm-cont')
                                .children('.newsCont')
                                .text()
        
        headlines.push(headline)
        })

        res.status(200).json(headlines)
    } catch (error) {
        res.send('something went wrong')
    }
}

module.exports = ndtv