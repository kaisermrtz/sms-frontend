import React from 'react';

import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';

const tableHead = (props) => {
    const createSortHandler = property => event => {
        props.onRequestSort(event, property);
    }

    return (
        <TableHead>
            <TableRow>
                {props.headCells.map(headCell => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right': 'left'}
                        sortDirection={props.orderBy === headCell.id ? props.order : false}>
                            <TableSortLabel
                                active={props.orderBy === headCell.id}
                                direction={props.orderBy === headCell.id ? props.order : 'asc'}
                                onClick={createSortHandler(headCell.id)}>
                                    {headCell.label}
                                </TableSortLabel>
                        </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
};

export default tableHead;