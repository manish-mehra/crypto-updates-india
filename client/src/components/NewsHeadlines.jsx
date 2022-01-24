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
                <Skeleton height="150px" count ={7}/>
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
