import React, { Component } from 'react';

import ReactTable from "react-table";
import "react-table/react-table.css";

const ItemDataGrid = ({gridHeight, listedItems, handleRowClick, cols}) => {
    return <ReactTable
                data={listedItems}
                columns={cols}
                defaultPageSize={30}
                className="-striped -highlight"
                minRows={0}
                style={{
                    height: gridHeight// This will force the table body to overflow and scroll, since there is not enough room
                }}
                getTdProps={(state, rowInfo, column, instance) => {
                    return {
                    onClick: (e, handleOriginal) => {
                        console.log("A Td Element was clicked!");
                        console.log("it produced this event:", e);
                        console.log("It was in this column:", column);
                        console.log("It was in this row:", rowInfo);
                        console.log("It was in this table instance:", instance);
                        let itemid = rowInfo.original.find(item => item.fieldname === "itemid");
                        handleRowClick(itemid);
                        // IMPORTANT! React-Table uses onClick internally to trigger
                        // events like expanding SubComponents and pivots.
                        // By default a custom 'onClick' handler will override this functionality.
                        // If you want to fire the original onClick handler, call the
                        // 'handleOriginal' function.
                        if (handleOriginal) {
                        handleOriginal();
                        }
                    }
                    };
                }}  
        />           
}


export default  ItemDataGrid;