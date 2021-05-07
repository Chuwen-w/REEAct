import React, { useState, useEffect } from 'react';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'ag-grid-community/dist/styles/ag-grid.css'
import SearchBar from './SearchBar';
import Stocks from './Stocks';
import StockList from './StockList';







function PriceHistory({filteredStocks}) {
    return (
        <>
           <SearchBar/>
           <StockList filteredStocks={filteredStocks}/>
        </>
    )
}

export const getStockHistory =async()=>{
    const res = await fetch('https://financialmodelingprep.com/api/v3/historical-price-full/AAPL?apikey=c24aa10fc85c410a37a66e3624a75557')
     const filteredStocks = await res.json();
     return{
         props:{
             filteredStocks
         }
     }
}

export default PriceHistory;