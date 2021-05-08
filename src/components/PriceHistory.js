import React, { useState, useEffect } from "react";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import "ag-grid-community/dist/styles/ag-grid.css";
import SearchBar from "./SearchBar";
import StockList from "./StockList";
import { useParams } from "react-router";

function PriceHistory({ filteredStocks }) {
    const [priceHistory, setPriceHistory] = useState([]);
    const { symbol } = useParams();

    useEffect(() => {
        if (!symbol) return;
        const getPriceHistory = async (symbol) => {
            const res = await fetch(
                `https://financialmodelingprep.com/api/v3/historical-price-full/${symbol}?apikey=c24aa10fc85c410a37a66e3624a75557`
            );
            const filteredStocks = await res.json();
            setPriceHistory(filteredStocks);
        };
        getPriceHistory(symbol);
    }, [symbol]);

    return (
        <>
            {/* <SearchBar /> */}
            <StockList priceHistory={priceHistory} />
        </>
    );
}

export default PriceHistory;
