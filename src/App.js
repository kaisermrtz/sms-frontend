import React, { Component } from 'react';
import './App.css';

import axios from './axios-data.js';

import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';

import Header from './components/Header/Header';
import Filters from './containers/Filters/Filters';
import Table from './components/Table/Table';

class App extends Component {
  state = {
    data: null,
    error: false,
    loading: true,
    orderBy: 'city',
    order: 'asc'
  }

  componentDidMount() {
    axios.get('/')
      .then(response => {
        this.setState({data: response.data, loading: false});
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
    let content = (<CircularProgress />);

    if (!this.state.loading && !this.state.error) {
      content = (
        <React.Fragment>
          <Filters />
          <Table 
            data={this.state.data} 
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
