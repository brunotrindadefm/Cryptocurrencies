import './GetCrypto.scss'
import { useState, useEffect } from 'react'
import axios from 'axios'
import Coin from '../Coin/Coin'

const GetCrypto = () => {
    const [allCoins, setAllCoins] = useState([])
    const [filteredCoins, setFilteredCoins] = useState([])
    const [loading, setLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')

    const getAllCoins = async () => {
        setLoading(true)
        try {
            
            const responses = await Promise.all([
                axios.get('https://api.coingecko.com/api/v3/coins/markets', {
                    params: { vs_currency: 'usd', order: 'market_cap_desc', per_page: 250, page: 1 }
                }),
                axios.get('https://api.coingecko.com/api/v3/coins/markets', {
                    params: { vs_currency: 'usd', order: 'market_cap_desc', per_page: 250, page: 2 }
                }),
                axios.get('https://api.coingecko.com/api/v3/coins/markets', {
                    params: { vs_currency: 'usd', order: 'market_cap_desc', per_page: 250, page: 3 }
                }),
                axios.get('https://api.coingecko.com/api/v3/coins/markets', {
                    params: { vs_currency: 'usd', order: 'market_cap_desc', per_page: 250, page: 4 }
                })
            ]);
    
            const combinedData = responses.flatMap(response => response.data);
            setAllCoins(combinedData);
            setFilteredCoins(combinedData.slice(0, 100));
        } catch (err) {
            console.log(err)
        } finally {
            setLoading(false)
        }
    }

    console.log(allCoins)

    useEffect(() => {
        getAllCoins();
    }, [])

    useEffect(() => {
        if (searchTerm) {
            const filtered = allCoins.filter(coin =>
                coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                coin.symbol.toLowerCase().includes(searchTerm.toLowerCase())
            )
            setFilteredCoins(filtered.slice(0, 100))
        } else {
            setFilteredCoins(allCoins.slice(0, 100)) 
        }
    }, [searchTerm, allCoins])

    return (
        <div className='coin-container'>
            <h1>Cryptos</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <input
                        type="text"
                        placeholder="Search for a coin..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <div className='titles'>
                        <p>Market Cap</p>
                        <p className='price'><span>Price</span> 24h %</p>
                    </div>
                    <Coin crypto={filteredCoins} />
                </>
            )}
        </div>
    )
}

export default GetCrypto
