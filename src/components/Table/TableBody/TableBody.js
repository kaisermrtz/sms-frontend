import React from 'react';

import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    } 
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

const tableBody = (props) => {
    const tableCell = (dataPoint) => {
        return props.cells.map(cell => (
            <TableCell
                key={cell.id}
                align={cell.numeric ? 'right': 'left'}>
                    {dataPoint[cell.id]}
            </TableCell>
        ));
    } 

    const tableBody = stableSort(props.data, getSorting(props.order, props.orderBy)).map(dataPoint=> (
        <TableRow key={dataPoint._id}>
            {tableCell(dataPoint)}
        </TableRow>
    ));

    return (
        <TableBody>
            {tableBody}
        </TableBody>
    );
};

export default tableBody;