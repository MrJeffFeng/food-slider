import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      counter: 0,
      pref: []
    };
  }

  // Calls API to SQL

  componentDidMount() {
    this.callApi('getfood')
      .then(res => this.setState({ items: this.addNewData(res.express) }))
      .catch(err => console.log(err));
  }

  async callApi(value) {
    var response = await fetch('/api/'+value);
    const body = await response.json();

    if (response.status !== 200) throw Error(body.message);

    return body;
  };

  render() {
    return (
      <div>
        <h1>{this.state.items[this.state.counter]}</h1>
        <button onClick={() => this.clicked(1)}>Yes</button>
        <button onClick={() => this.clicked(0)}>No</button>
        <h1>{this.state.pref}</h1>
        <button onClick={() => this.refresh('getfood')}>Refresh</button>
      </div>
    );
  }

  clicked(r) {
    if (this.state.counter < this.state.items.length) {
      if (r == 1) {
        this.setState({ pref: this.state.pref + this.state.items[this.state.counter] + ', '});
      }
      this.setState({ counter: this.state.counter + 1})
    }
  }

  async refresh(item) {
    this.callApi(item)
      .then(res => this.setState({ items: this.addNewData(res.express) }))
      .catch(err => console.log(err));
  }


  addNewData(newData) {
    var newList = this.state.items.slice();
    for (var i=0; i<newData.length; i++) {
      newList.push(newData[i]['food_name']);
    }
  return newList
  }
}

export default App;
