import './Coin.scss'

import { useState, useEffect } from 'react'

const Coin = ({ crypto }) => {
    const [decimalPlaces, setDecimalPlaces] = useState({ min: 2, max: 2 })

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 300) {
                setDecimalPlaces({ min: 0, max: 1 }) 
            } else {
                setDecimalPlaces({ min: 2, max: 8}) // Mais casas decimais em telas maiores
            }
        }

        handleResize() 
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: decimalPlaces.min,
            maximumFractionDigits: decimalPlaces.max
        }).format(amount)
    }

    return (
        <>
            <ul>
                {crypto.map(coin => (
                    <li key={coin.id}>
                        <div>
                            <img src={coin.image} alt={coin.name} />
                            <p className='coin-name'> {coin.name}  </p>
                            <p className='coin-symbol'> {coin.symbol.toUpperCase()} </p>
                        </div>
                        <div>
                            <p className="coin-price"> {formatCurrency(coin.current_price)} </p>
                            <p className={`coin-change ${coin.price_change_percentage_24h < 0 ? 'negative' : 'positive'}`}>
                                {coin.price_change_percentage_24h !== null && coin.price_change_percentage_24h !== undefined
                                    ? coin.price_change_percentage_24h.toFixed(2)
                                    : 'N/A'}%
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default Coin
