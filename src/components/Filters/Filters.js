import React from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, KeyboardDatePicker} from '@material-ui/pickers';
import Button from '@material-ui/core/Button';

const filters = (props) => (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <Grid container justify="space-around">
            <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/DD/YYYY"
                margin="normal"
                id="date-picker-inline-start"
                label="Start date"
                value={props.startDate}
                onChange={props.onStartDateChanged}
                KeyboardButtonProps = {{
                    'aria-label': 'change start date',
                }} />

            <KeyboardDatePicker
                disableToolbar
                variant="inline"
                format="MM/DD/YYYY"
                margin="normal"
                id="date-picker-inline-end"
                label="End date"
                value={props.endDate}
                onChange={props.onEndDateChanged}
                KeyboardButtonProps = {{
                    'aria-label': 'change end date',
                }} />
            <Button variant="outlined" color="primary" onClick={props.onResetDates}>Reset dates</Button>
        </Grid>
    </MuiPickersUtilsProvider>
);

export default filters;