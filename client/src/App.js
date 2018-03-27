import React, { Component } from 'react';
import './App.css';
import plate from './images/plate.png'
import spoon from './images/spoon.png'
import no from './images/no.png'
import yes from './images/yes.png'
import bottom from './images/bottom.png'
import chopsticks from './images/chopsticks.svg'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      counter: 0,
      pref: [],
      user_id: '',
      user_name: '',
    };
    this.onSubmit = this.handleSubmit.bind(this);
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

  handleSubmit(e) {
    e.preventDefault();
    // On submit of the form, send a POST request with the data to the server.
    console.log(this.refs.email.value)
    fetch('/api/check_account', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
          "email": this.refs.email.value,
          "password": this.refs.password.value
        })
      })
      .then(function(response) {
        return response.json()
      }).then(res => this.setState({
        user_name: res.express[0]['acct_name'],
        user_id: res.express[0]['acct_id']
      }));
  }

  render() {
    return (
      <div>
        <h1 className="center">{this.state.items[this.state.counter]}</h1>
        <p className="center">Liked: {this.state.pref}</p>
        <button onClick={() => this.refresh('getfood')}>Refresh</button>
        <h3 className="center">Current User: {this.state.user_name}</h3>
        <form className="center" onSubmit={this.onSubmit}>
          <input type="text" placeholder="Email" ref="email"/>
          <input type="text" placeholder="Password" ref="password"/>
          <input type="submit" value="Login"/>
        </form>
        <img src={plate} alt="plate" className="plate" />
        <img src={spoon} alt="spoon" className="spoon" />
        <img src={yes} alt="yes" className="yes" onClick={() => this.clicked(1)}/>
        <img src={no} alt="no" className="no" onClick={() => this.clicked(0)}/>
        <img src={bottom} alt="bottom" className="bottom" />
        <img src={chopsticks} alt="chopsticks" className="chopsticks" />
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
    var newList = this.state.items.slice(); // Returns a copy of the current list
    for (var i=0; i<newData.length; i++) {
      if (newList.includes(newData[i]['food_name']) && this.state.pref.includes(newData[i]['food_name'])) {
        console.log(newData[i]['food_name'] + ' already exist!')
      } else {
        newList.push(newData[i]['food_name']);
      }
    }
  return newList
  }
}
export default App;
