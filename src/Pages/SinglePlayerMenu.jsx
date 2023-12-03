import React, { Component } from 'react'
import RenderDeck from '../Components/RenderDeck';
import { getDecks,setDeckForPLay,genPokemon,getPokemon} from '../utils/helpers.ts'
import { getStarterDeck } from '../utils/starterDeck';
import {trainers} from '../utils/trainers'
import SinglePlayer from '../Components/SinglePlayer';
import Header from '../Components/Header';

export default class SinglePlayerMenu extends Component {
    state = {
        decks:[],
        deckSeted:false,
        startGame:false,
        trainerSelected:false,
        trainer:'',
        loading:false,
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
        this.setState({
          loading:true
        },async()=>{
          const cards = []
          for(let i = 0;i <6;i++){
            let randomNumber  = Math.round((Math.random()*(649- 1)+1))
            const pokemon = await genPokemon(await getPokemon(randomNumber))
            cards.push(pokemon)
          }
          trainer.cards = cards
          this.setState({
            loading:false
          })
        })
        
      }
        this.setState({trainer,trainerSelected:true})
    }
  render() {
    const {decks,deckSeted,startGame,trainerSelected,trainer,loading} = this.state;
    return (
      <div>
        {loading?<h1 className='styledText text-2xl text-center w-full'>Generating Cards...</h1>:<div>
        {trainerSelected && !startGame?
                    <button className='text-2xl styledText ml-10 mt-5' onClick={()=>{this.setState({trainerSelected:false})}}>Back</button>
                  :''}
        {startGame?<div className='min-w-[800px] min-h-[1000px]'>
          <SinglePlayer trainer={trainer}/>
          </div>:
        <div className=' flex flex-wrap justify-around w-screen  '>
        <div>
          {trainerSelected?
          <div className='flex flex-wrap justify-around mt-2'>
            {deckSeted?
            <button onClick={()=>{this.setState({startGame:true})}} className='text-2xl styledText bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded'>
              Start Game</button>
:''}
            <div className='flex justify-center flex-wrap w-full' >
            <h3 className='text-2xl styledText mt-2 w-full text-center h-10'>{trainer.name}</h3>
            <div className={`w-full 1/5 min-w-[150px] min-h-[150px] h-40 mt-5 ${trainer.image} bg-contain bg-no-repeat bg-center p-10 `}>
            </div>
            </div>
            <div className='flex flex-wrap justify-around mx-auto'>
              <h2 className='text-2xl styledText text-center mx-2 my-1'>Decks:</h2>
              <select className='p-2 my-2 h-8 text-xs'
               onChange={(e) => {
                const selectedDeck = decks.find(deck => deck.name === e.target.value);
                console.log(e)
                setDeckForPLay(selectedDeck);
                this.setState({
                  deckSeted: selectedDeck
                });
              }}  value={deckSeted ? deckSeted.name : ''} 
              >
              <option value="" >
              Choose one deck
        </option>
      {decks.map((deck, index) => (
        <option key={index} value={deck.name}>
          {deck.name}
        </option>
      ))}
    </select>
            </div>
          </div>:<div className='w-full flex justify-center flex-wrap'>
            {trainers.map((e)=>(
           <button onClick={()=>{this.setTrainer(e)}} className={`flex flex-wrap justify-center w-2/5 h-60 p-10 mx-auto mt-5 `} key={`${e.name}DuelBttn`}>
            <div className={`h-full w-full min-w-[150px] min-h-[150px] ${e.image} bg-contain bg-no-repeat bg-center`}></div>
            <h3 className='text-2xl styledText mt-2 h-35 w-full '>{e.name}</h3>
            </button>
        ))}</div>}
        </div>
      
       </div>}
       </div>}
       
        
      </div>
    )
  }
}
