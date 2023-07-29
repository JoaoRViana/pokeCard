import React, { Component } from 'react'
import RenderDeck from '../Components/RenderDeck';
import { getDecks,setDeckForPLay } from '../utils'
import {trainers} from '../utils/trainers'
import SinglePlayer from '../Components/SinglePlayer';

export default class SinglePlayerMenu extends Component {
    state = {
        decks:[],
        deckSeted:false,
        startGame:false,
        trainerSelected:false,
        trainer:''
    }
    componentDidMount(){
        this.getAllDecks();
    }
    getAllDecks =  ()=>{
        const decks = getDecks();
        this.setState({
            decks,
        })
    }
  render() {
    const {decks,deckSeted,startGame,trainerSelected,trainer} = this.state;
    return (
      <div>
        {startGame?<SinglePlayer trainer={trainer}/>:
        <div>
          <div>
        {deckSeted?<div><h2>Choosed:{deckSeted.name}</h2>
        <button onClick={()=>{this.setState({startGame:true})}}>startGame</button>
        </div>:''}
        </div>
        {trainers.map((e)=>(
          <div>
            <h3>{e.name}</h3>
            <img src={e.image}alt={e.name}/>
            <button onClick={()=>{this.setState({trainer:e,trainerSelected:true})}}>Duel</button>
          </div>
        ))}
        <div>
          {trainerSelected?
          <div>
            {decks.map((e,i)=>(
              <div key={i}>
                  <RenderDeck deck={e}/>
                  <button onClick={()=>{setDeckForPLay(e)
                  this.setState({
                      deckSeted:e
                  })}}>Choose</button>
              </div>
          ))}
          </div>:''}
        </div>
       </div>}
        
      </div>
    )
  }
}
