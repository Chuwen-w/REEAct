import React, { useState, useEffect } from "react";
import { AgGridReact, AgGridColumn } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import "ag-grid-community/dist/styles/ag-grid.css";
import { useHistory } from "react-router";

//  function getStockRowData(){
//     const url ='https://financialmodelingprep.com/api/v3/stock-screener?marketCapMoreThan=1000000000&betaMoreThan=1&volumeMoreThan=10000&sector=Technology&exchange=NASDAQ&dividendMoreThan=0&limit=100&apikey=c24aa10fc85c410a37a66e3624a75557'
//     let res =await fetch(url);
//     let data= await res.json();
//     let stock=data.stock;
//     return data.map((stock)=>({
//         symbol: stock.symbol,
//         name: stock.companyName,
//         industry: stock.sector
//     }))
// }

// function SearchStock(){
//     const [searchTerm,setSearchTerm]=useState('')
//     return(
//     <div style={{padding:'5px', border:'5px'}}>
//            <input type='text' placeholder='Search stock...' onChange={(event) => {setSearchTerm(event.target.value)}}
//            />
//            {StockData.filter((val)=>{
//                if(searchTerm == ''){
//                    return val
//                } else if(val.name.toLowerCase().includes(searchTerm.toLowerCase())){
//                    return val
//                }
//            })}
//     </div>)
// }

function Table() {
    const [dataSource, setDataSource] = useState([]);
    const [rowData, setRowData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [search, setSearch] = useState({ name: "", sector: "" });

    const history = useHistory();

    useEffect(() => {
        setLoading(true);
        fetch(
            "https://financialmodelingprep.com/api/v3/nasdaq_constituent?apikey=c24aa10fc85c410a37a66e3624a75557"
        )
            .then((res) => res.json())
            .then((stocks) => setDataSource(stocks))
            .catch((err) => {
                setError(err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        let filteredResult = [];

        filteredResult =
            dataSource &&
            dataSource.filter((item) => {
                return item.name
                    .toUpperCase()
                    .includes(search.name.toUpperCase());
            });

        if (search.sector) {
            filteredResult = filteredResult.filter((item) => {
                return item.sector
                    .toUpperCase()
                    .includes(search.sector.toUpperCase());
            });
        }

        setRowData(filteredResult);
    }, [search, dataSource]);

    const searchChange = (ev, key) => {
        const newValue = ev.target && ev.target.value;
        search[key] = newValue;
        setSearch(Object.assign({}, search));
    };

    if (loading) {
        return <p>loading</p>;
    }

    return (
        <div className="stockTable">
            <div className="inline" style={{ padding: "10px" }}>
                <label>
                    Stock:
                    <input
                        value={search.name.toUpperCase()}
                        onChange={(ev) => searchChange(ev, "name")}
                    />
                </label>
                <label>
                    Sector:
                    <input
                        value={search.sector}
                        onChange={(ev) => searchChange(ev, "sector")}
                    />
                </label>
            </div>
            <div
                className="ag-theme-balham"
                style={{
                    height: "800px",
                    width: "620px",
                    padding: "10px",
                }}
            >
                <AgGridReact
                    // columnDefs={colums}
                    rowData={rowData}
                    pagination={true}
                    paginationPageSize={50}
                >
                    <AgGridColumn
                        headerName="Symbol"
                        field="symbol"
                        onCellClicked={(event) =>
                            history.push(`/PriceHistory/${event.value}`)
                        }
                    />
                    <AgGridColumn headerName="Name" field="name" />
                    <AgGridColumn headerName="Sector" field="sector" />
                </AgGridReact>
            </div>
        </div>
    );
}

function Stock() {
    return (
        <>
            <Table />
        </>
    );
}

export default Stock;
