import React, { Component } from 'react';
import './App.css';

import axios from './axios-data.js';
import moment from 'moment';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';

import Header from './components/Header/Header';
import Filters from './components/Filters/Filters';
import Table from './components/Table/Table';

class App extends Component {
  state = {
    data: null,
    filteredData: null,
    error: false,
    loading: true,
    orderBy: 'city',
    order: 'asc',
    startDate: moment(new Date('01/01/2000')),
    endDate: moment()
  }

  handleStartDateFilterChange = date => {
    if (this.state.endDate.isBefore(date)) {
      this.handleFilterChange(date, date)
    } else {
      this.handleFilterChange(date, this.state.endDate)
    }
  }

  handleEndDateFilterChange = date => {
      if (this.state.startDate.isAfter(date)) {
        this.handleFilterChange(date, date)
      } else {
        this.handleFilterChange(this.state.startDate, date)
      }
  }

  handleFilterChange = (start, end) => {
    const filteredData = this.state.data.filter(dataPoint => {
      return moment(dataPoint.start_date).isAfter(start) && moment(dataPoint.end_date).isBefore(end)
    });
    this.setState({filteredData, startDate: start, endDate: end});
  }

  handleResetDates = () => {
    const data = this.state.data
    this.setState({startDate: moment(new Date('01/01/2000')), endDate: moment(), filteredData: data});
  }

  componentDidMount() {
    axios.get('/')
      .then(response => {
        this.setState({data: response.data, filteredData: response.data, loading: false});
      })
      .catch(() => {
        this.setState({error: true, loading: false});
      })
  }

  handleRequestSort = (event, property) => {
      const isAsc = this.state.orderBy === property && this.state.order === 'asc';
      const order = isAsc ? 'desc' : 'asc'
      this.setState({order, orderBy: property});
  }

  cells = [
    { id: 'city', numeric: false, label: 'city' },
    { id: 'start_date', numeric: false, label: 'start date' },
    { id: 'end_date', numeric: false, label: 'end date' },
    { id: 'price', numeric: true, label: 'price' },
    { id: 'status', numeric: false, label: 'status' },
    { id: 'color', numeric: false, label: 'color' }
  ]

  render() {
    let content = (
      <CircularProgress 
        size={80}
        left={-40}
        style={{marginLeft: '50%', marginTop: 50}}/>);

    if (!this.state.loading && !this.state.error) {
      content = (
        <React.Fragment>
          <Box mb={2}>
            <Filters 
              onStartDateChanged={this.handleStartDateFilterChange}
              onEndDateChanged={this.handleEndDateFilterChange}
              startDate={this.state.startDate}
              endDate={this.state.endDate}
              onResetDates={this.handleResetDates}/>
          </Box>
          <Table 
            data={this.state.filteredData} 
            onRequestSort={this.handleRequestSort} 
            order={this.state.order} 
            orderBy={this.state.orderBy}
            cells={this.cells}/>
        </React.Fragment>
      );
    } else if (!this.state.loading && this.state.error) {
      content = (
        <div>Error while loading data.</div>
      )
    }

    return (
      <Container>
        <Header />
        {content}
      </Container>
    );
  }
}

export default App;
