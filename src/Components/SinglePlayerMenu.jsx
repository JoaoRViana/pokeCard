import React, { Component } from 'react'
import RenderDeck from './RenderDeck';
import { getSetDeckForPlay,getDecks,setDeckForPLay } from '../utils'
import RedirectButton from './RedirectButton';

export default class SinglePlayerMenu extends Component {
    state = {
        decks:[],
        deckSeted:false,
    }
    componentDidMount(){
        this.getAllDecks();
    }
    getAllDecks =  ()=>{
        const decks = getDecks();
        const deckSeted = getSetDeckForPlay();
        this.setState({
            decks,
            deckSeted,
        })
    }
  render() {
    const {decks,deckSeted} = this.state;
    return (
      <div>
        <div>
        {deckSeted?<div><h2>Choosed:{deckSeted.name}</h2>
        {<RedirectButton text={'StartGame'} path={'singlePlayer'}/>}
        </div>:''}
        </div>
        {decks.map((e,i)=>(
            <div key={i}>
                <RenderDeck deck={e}/>
                <button onClick={()=>{setDeckForPLay(e)
                this.setState({
                    deckSeted:e
                })}}>Choose</button>
            </div>
        ))}
      </div>
    )
  }
}
