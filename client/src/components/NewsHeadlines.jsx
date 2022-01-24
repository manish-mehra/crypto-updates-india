import {useState, useEffect} from 'react'

import Skeleton,{SkeletonTheme} from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

import NewsCard from './NewsCard'


const url = 'http://localhost:8080/api/v1/'
export default function NewsHeadlines() {

    const [newsData, setNewsData]= useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const newsChannels = [
        {channel: 'NDTV', route: 'ndtv'},
        {channel: 'Business Standard', route: 'business-standard'},
        {channel: 'Indian Express', route: 'indian-express'},
    ]
    const [activeChannel, setActiveChannel] = useState(newsChannels[0])
    

    const fetchNewsHandler = async(item)=>{
        setActiveChannel(item)
        setLoading(true)
        try {
            const res = await fetch(url + `${item.route}`)
            const data = await res.json()
            setNewsData(data)
            setLoading(false)
            console.log(data)
        } catch (error) {
            setError(error)
            setLoading(false)
        }
    }

    useEffect(()=>{
        fetchNewsHandler(activeChannel)
    }, [])

  return (
    <div className='news-headlines'>
        <h1>Latest Healines</h1>
        <section className='news-headlines--channels'>
            {newsChannels.map((item)=>{
                return (
                    <div 
                        key = {item.channel} 
                        className={`news-headlines--channel-btn ${activeChannel.channel === item.channel? 'active': ''}`}
                        onClick={()=>fetchNewsHandler(item)}
                    >
                        {item.channel}
                    </div>
                )
            })}
        </section>
        
        <section className='news-headlines--news-list'>
        
           {

            loading?
  
                    <SkeletonTheme color='#F5F5F5' highlightColor='#ffffff'>
                    <div className='news-card'>
                        <section className="news-card--content">
                        {/* <a className='news-card--heading' href={data.link}>{data.heading}</a> */}
                        <Skeleton height='25px'/>
                        {/* <span className='news-card--date'>{data.time}</span> */}
                        <Skeleton height='10px'/>
                        {/* <p className='news-card--desc'>{data.content}</p> */}
                        <Skeleton height='50px'/>
                        </section>
    
                        <section>
                        {/* <img src={data.image} alt={data.image} /> */}
                        <Skeleton height='60px'/>
                        </section>
                </div>
                </SkeletonTheme>
            :
            (
                newsData?.map((data)=>{
                    return <NewsCard data = {data}/>
                })
            )
           }
        </section>

    </div>
  )
}
