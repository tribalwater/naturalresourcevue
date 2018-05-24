import React, { Component } from 'react';
import ReactTable from "react-table";


class DataGrid extends Component {
    render() {
        return (
            <ReactTable
            data={this.props.listedItems}
            columns={this.props.cols}
            defaultPageSize={10}
            className="-striped -highlight"
        />           
        );
    }
}

export default DataGrid;