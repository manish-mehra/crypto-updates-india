import React,{useState, useEffect} from 'react';

import {format} from 'date-fns'
import {GoTriangleUp} from 'react-icons/go'
import {VscTriangleDown} from 'react-icons/vsc'

import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'




export default function PriceTracker() {

    const [coinData, setCoinData] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [cryptoCount, setCryptoCount] = useState(5)

    const API_URL = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr&order=market_cap_desc&per_page=${cryptoCount}&page=1&sparkline=false`

    const fetchData = async()=>{
        setLoading(true)
        try {
            const res = await fetch(API_URL)
            const data = await res.json()
            setCoinData(data)
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setError('Something Went Wrong')        
        }
    }
    useEffect(()=>{
        fetchData()
    }, [cryptoCount])

  return(
      <div className="price-tracker">
        {error && <div className='price-tracker--error'></div>}
        <h1 className='price-tracker--title'>Top Coins</h1>
       {
         coinData? 
         (
            <div className="price-tracker--main">

            <span className='price-tracker--heading coinName'>Name</span>
            <span className='price-tracker--heading'>Price</span>
            <span className='price-tracker--heading'>Market Cap</span>
            <span className='price-tracker--heading'>Volume</span>
            <span className='price-tracker--heading'>24h%</span>
            <span className='price-tracker--heading'>Circulating Supply</span>
            <span className='price-tracker--heading'>last updated</span>

            {
                coinData.map((eachCoinData)=>{
                    return (
                            <React.Fragment key = {eachCoinData.id}>   
                            <div className='price-tracker--coinNames'>
                                <span className='price-tracker--imageWrapper'>
                                    <img 
                                    src={eachCoinData.image} 
                                    alt={eachCoinData.image}
                                    width='30px'
                                    />
                                </span>
                                <span className='price-tracker--coinName'>{eachCoinData.name}</span>
                                <span className='price-tracker--coinSymbol'>{eachCoinData.symbol.toUpperCase()}</span>
                            </div>

                            <span>₹ {eachCoinData.current_price}</span>
                            <span>₹ {eachCoinData.market_cap}</span>
                            <span>₹ {eachCoinData.total_volume}</span>
                            <span 
                            className={eachCoinData.price_change_percentage_24h > 0? 'gain': 'loss'}>{eachCoinData.price_change_percentage_24h  > 0?<GoTriangleUp /> :<VscTriangleDown/>}
                            { eachCoinData.price_change_percentage_24h}%</span>
                            <span>{eachCoinData.circulating_supply}</span>
                            <span>
                                {format(new Date(eachCoinData.last_updated), 'dd LLL yyy, E h:m b')}</span>
                    </React.Fragment>)     
                })          
            }
            <p 
            onClick={()=> setCryptoCount((prev)=> prev + 5)}
            disabled = {loading}
            className={`price-tracker--showMoreBtn ${loading? 'loading': ''}`}
            >Show More</p>
        </div>
         ):
         <Skeleton count= {5} height='50px'/>
       }
       

      </div>
  )
}



/*
{
    "id": "bitcoin",
    "symbol": "btc",
    "name": "Bitcoin",
    "image": "https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579",
    "current_price": 2679317,
    "market_cap": 50655491307769,
    "total_volume": 2635477870324,
    "price_change_percentage_24h": -7.36699,
    "circulating_supply": 18936625,
    "last_updated": "2022-01-22T07:11:22.705Z"

    "market_cap_rank": 1,
    "fully_diluted_valuation": 56175021550205,
    "high_24h": 2940863,
    "low_24h": 2654081,
    "market_cap_change_24h": -4018518327936.5625,
    "market_cap_change_percentage_24h": -7.34996,   
    "total_supply": 21000000,
    "max_supply": 21000000,
    "ath": 5128383,
    "ath_change_percentage": -47.94773,
    "ath_date": "2021-11-10T14:24:11.849Z",
    "atl": 3993.42,
    "atl_change_percentage": 66745.96765,
    "atl_date": "2013-07-05T00:00:00.000Z",
    "roi": null,

   
  }
*/