import {useState, useEffect} from 'react'

export default function NewsCard({data}) {


  return (
          <div className='news-card'>
            <section className="news-card--content">
              <a className='news-card--heading' href={data.link}>{data.heading}</a>
              <span className='news-card--date'>{data.time}</span>
              <p className='news-card--desc'>{data.content}</p>
            </section>

            <section>
              <img src={data?.image} alt={data.image} />
            </section>
        </div>
  )
}
