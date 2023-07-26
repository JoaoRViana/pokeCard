import React, { Component } from 'react'
import SinglePlayerMenu from '../Components/SinglePlayerMenu';
import Header from '../Components/Header';

export default class SetGame extends Component {
  state = {
    singlePlayer:''
  }
  render() {
    const {singlePlayer} =this.state;
    return (
      <div>
        <Header />
        {singlePlayer?<SinglePlayerMenu/>:  <div>
        <button onClick={()=>{
          this.setState({
            singlePlayer:true,
          })
        }}>SinglePLayer</button>
        <br />
        <button>MultyPLayer</button>
        </div>}
      
        
      </div>
    )
  }
}
