import './Coin.scss'

const Coin = ({ crypto }) => {

    console.log(crypto)


    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
            maximumFractionDigits: 7
        }).format(amount);
    }

    return (
        <>
            <ul>
                {crypto.map(coin => (
                    <li key={coin.id}>
                        <div>
                            <img src={coin.image} alt={coin.name} />
                            <p className='coin-name'> {coin.name} <span> {coin.symbol.toUpperCase()} </span> </p>
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
