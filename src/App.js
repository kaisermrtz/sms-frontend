import React, { Component } from 'react';
import './App.css';

import axios from './axios-data.js';

import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';

import Header from './components/Header/Header';
import Filters from './containers/Filters/Filters';
import Table from './containers/Table/Table';

class App extends Component {
  state = {
    data: null,
    error: false,
    loading: true
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

  render() {
    let content = (<CircularProgress />);

    if (!this.state.loading && !this.state.error) {
      content = (
        <React.Fragment>
          <Filters />
          <Table />
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
