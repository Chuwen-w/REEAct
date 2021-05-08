import React from "react";

import { AgGridColumn } from "ag-grid-react/lib/agGridColumn";
import { AgGridReact } from "ag-grid-react/lib/agGridReact";

export default function StockList({ priceHistory }) {
    const { symbol, historical } = priceHistory;

    return (
        <div
            className="ag-theme-balham"
            style={{
                height: "800px",
                width: "800px",
                padding: "10px",
            }}
        >
            <h1>{symbol} Price History</h1>
            <AgGridReact
                rowData={historical}
                pagination={true}
                paginationPageSize={50}
            >
                <AgGridColumn headerName="Open" field="open" />
                <AgGridColumn headerName="High" field="high" />
                <AgGridColumn headerName="Low" field="low" />
                <AgGridColumn headerName="Close" field="close" />
                <AgGridColumn headerName="Volume" field="volume" />
            </AgGridReact>
        </div>
    );
}

/* 


 <AgGridReact
                    // columnDefs={colums}
                    rowData={rowData}
                    pagination={true}
                    paginationPageSize={50}
                >
                    <AgGridColumn headerName="Symbol" field="symbol" />
                    <AgGridColumn headerName="Name" field="name" />
                    <AgGridColumn headerName="Sector" field="sector" />
                </AgGridReact>
*/
