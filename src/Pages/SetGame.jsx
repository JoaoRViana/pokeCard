import React, { Component } from 'react'
import Header from '../Components/Header';
import RedirectButton from '../Components/RedirectButton';

export default class SetGame extends Component {

  render() {
    return (
      <div>
        <Header />
        <RedirectButton path='singlePlayer' text='singlePlayer'/>
      </div>
    )
  }
}
