import Stocks from './Stocks';

export default function StockList({filteredStocks}){
    return(
        <>
        { filteredStocks.map(stock =>{
            return<Stocks 
              key={stock.symbol}
              historical={stock.historical}
              date={stock.historical.date} 
            />
            
        })}
        </>
    )
}