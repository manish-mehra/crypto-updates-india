const cheerio = require('cheerio')
const axios = require('axios')

const url = 'https://indianexpress.com/about/cryptocurrency/'

const indianExpress = async(req, res)=>{
    try {
        const {data} = await axios.get(url)
        // Load HTML we fetched in the previous line
        const $ = cheerio.load(data)
        const headlineBlock = $('.details')
        const headlines = []

        headlineBlock.each((idx, el)=>{
            const headline = {
                heading: '',
                link: '',
                image: '',
                time: '',
                content: '',
                source: 'Indian Express'
            }
        
        headline.heading = $(el).children("h3")
                                .text()

        if(!headline.heading) return //remove ads

        headline.link = $(el).children('h3')
                            .children('a')
                            .attr('href')
                   
        // let imgSrc = $(el).children('.news_Itm-img')
        //                     .children('a')
        //                     .children('img')
        //                     .attr('src')
        // let imgData = JSON.parse(imgSrc)
        headline.image = $(el).children('.news_Itm-img')
        .children('a')
        .children('img')
        .attr('srcset')
                            
        headline.time = $(el).children('h3')
                            .next('p')
                            .text()

        headline.content = $(el).children('h3')
                                .next('p')
                                .next('p')
                                .text()
        
        headlines.push(headline)
        })

        res.status(200).json(headlines)
    } catch (error) {
        res.send('something went wrong')
    }
}

module.exports = indianExpress