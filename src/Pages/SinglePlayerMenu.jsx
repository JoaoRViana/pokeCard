import React, { Component } from 'react'
import RenderDeck from '../Components/RenderDeck';
import { getDecks,setDeckForPLay } from '../utils'
import {trainers} from '../utils/trainers'
import SinglePlayer from '../Components/SinglePlayer';
import Header from '../Components/Header';

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
      <div >
        {!startGame?<Header/>:''}
        {trainerSelected && !startGame?
                    <button className='text-2xl styledText ml-10 mt-5' onClick={()=>{this.setState({trainerSelected:false})}}>Back</button>
                  :''}
        {startGame?<SinglePlayer trainer={trainer}/>:
        <div className=' flex flex-wrap justify-between w-screen '>
        <div>
          {trainerSelected?
          <div className='flex flex-wrap justify-around w-screen '>
            <div className={`flex flex-wrap justify-between w-1/5 h-40 ml-10 mt-5 ${trainer.image} bg-contain bg-no-repeat bg-center `}>
            <h3 className='text-2xl styledText mt-2 h-35 w-full text-start h-full'>{trainer.name}</h3>
            <div>
            <div>
        {deckSeted?<div className='flex justify-center flex-wrap'><h2 className='text-2xl styledText'>Choosed Deck:</h2>
        <div>
          <RenderDeck deck={deckSeted}/>
        </div>
        <button onClick={()=>{this.setState({startGame:true})}} className='text-2xl styledText bg-gradient-to-br from-pink-500 to-orange-400 p-2 rounded-lg '>startGame</button>
        </div>:''}
        </div>
            </div>
            </div>
            
            <div className='flex flex-wrap justify-between'>
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
            
          </div>:<div className='w-screen'>
            {trainers.map((e)=>(
           <button onClick={()=>{this.setState({trainer:e,trainerSelected:true})}} className={`flex flex-wrap justify-between w-1/5 h-40 ml-10 mt-5 ${e.image} bg-contain bg-no-repeat bg-center `}>
            <h3 className='text-2xl styledText mt-2 h-35 w-full text-start'>{e.name}</h3>
            <h3 className='text-2xl styledText mt-12 w-full text-end'>Duel</h3>
            </button>
        ))}</div>}
        </div>
      
       </div>}
        
      </div>
    )
  }
}
