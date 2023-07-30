import React, { Component } from 'react'
import RenderDeck from '../Components/RenderDeck';
import { getDecks,setDeckForPLay,genPokemon,getPokemon,getStarterDeck } from '../utils'
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
        let decks = getDecks();
        const starterDeck = decks.filter((e)=>(e.name === 'Starter Deck'));
        if(starterDeck.length===0){
          const starter = getStarterDeck(decks.length)
          decks = [...decks,starter]
        }
        this.setState({
            decks,
        })
    }
    setTrainer = async(trainer)=>{
      if(trainer.name ==='Random'){
        const cards = []
        for(let i = 0;i <7;i++){
          let randomNumber  = Math.round((Math.random()*(251- 1)+1))
          const pokemon = await genPokemon(await getPokemon(randomNumber))
          cards.push(pokemon)
        }
        trainer.cards = cards
        console.log(cards)
      }
        this.setState({trainer,trainerSelected:true})
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
        <button onClick={()=>{this.setState({startGame:true})}} className='text-2xl styledText bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded'>startGame</button>
        </div>:''}
        </div>
            </div>
            </div>
            
            <div className='flex flex-wrap justify-around'>
              <h2 className='text-2xl styledText text-center w-full'>Decks:</h2>
            {decks.map((e,i)=>(
              <div key={i} className='flex flex-wrap justify-center'>
                <div className='flex justify-center w-full'>
                <RenderDeck deck={e}/>
                </div>
                  <button onClick={()=>{setDeckForPLay(e)
                  this.setState({
                      deckSeted:e
                  })}}
                  className='text-2xl styledText bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded '>Choose</button>
              </div>
          ))}
            </div>
            
          </div>:<div className='w-screen'>
            {trainers.map((e)=>(
           <button onClick={()=>{this.setTrainer(e)}} className={`flex flex-wrap justify-between w-1/5 h-40 ml-10 mt-5 ${e.image} bg-contain bg-no-repeat bg-center `} key={`${e.name}DuelBttn`}>
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
