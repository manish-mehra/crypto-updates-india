const cheerio = require('cheerio')
const axios = require('axios')

const url = 'https://www.business-standard.com/topic/cryptocurrency'

const businessStandard = async(req, res)=>{
    try {
        const {data} = await axios.get(url)
        // Load HTML we fetched in the previous line
        const $ = cheerio.load(data)
        const headlineBlock = $('ul li')
        const headlines = []

        headlineBlock.each((idx, el)=>{
            const headline = {
                heading: '',
                link: '',
                image: '',
                time: '',
                content: '',
                source: 'Business Standard'
            }
        
        headline.heading = $(el).children(".listing-txt")
                                .children('h2')
                                .text()

        if(!headline.heading) return //remove ads

        headline.link = 'https://www.business-standard.com/'+ $(el).children('.listing-txt')
                            .children('h2')
                            .children('a')
                            .attr('href')
                                                             
        headline.image = $(el).children('.listing-img')
                              .children('a')
                              .children('img')
                              .attr('src')

        headline.time = $(el).children('.listing-txt')
                            .children('p')
                            .first()
                            .text()

        headline.content = $(el).children('.listing-txt')
                                .children('p')
                                .last()
                                .text()
        
        headlines.push(headline)
        })

        res.status(200).json(headlines)
    } catch (error) {
        res.send('something went wrong')
    }
}

module.exports = businessStandard