import React from 'react';

import TableHead from './TableHead/TableHead';
import TableBody from './TableBody/TableBody';

import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';

const table = (props) => {
    return (
        <TableContainer component={Paper}>
            <Table aria-label="data table">
                <TableHead orderBy={props.orderBy} order={props.order} onRequestSort={props.onRequestSort} headCells={props.cells}/>
                <TableBody orderBy={props.orderBy} order={props.order} data={props.data} cells={props.cells}/>
            </Table>
        </TableContainer>
    );
};

export default table;