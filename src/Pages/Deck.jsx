import React, { Component } from 'react'
import { getCards, getDecks, removeDeck, saveDeck } from '../utils'
import RenderCard from '../Components/RenderCard';
import Header from '../Components/Header';
import RenderPokemon from '../Components/RenderPokemon';
import RenderDeck from '../Components/RenderDeck';

export default class Deck extends Component {
    state={
        cards:[],
        focus:false,
        onCreation:false,
        deckSelected:[],
        deckIndex:0,
        onBoard:{},
        deck:[],
        cardsFiltred:[],
        deckName:'',
        edit:false,
    }
    setCards = ()=>{
        const cards = getCards();
        const deck = getDecks();
        this.setState({
            cards,
            deck,
        },()=>{
            this.filtredCards();
        })
    }
    exitFocus= ()=>{
        this.setState({
            focus:false
        })
    }
    componentDidMount(){
        this.setCards()
    }
    cardOnBoard = (pokemon)=>{
        const { cards } =this.state
        const card = cards.find((e)=>e.name ===pokemon.name && e.attack === pokemon.attack && e.hp === pokemon.hp)
        window.scrollTo(0, 0);
        this.setState({
            focus:true,
            onBoard:card,
        })
    }
    creationDeck = ({target})=>{
        const {deck} =this.state
        let deckSelected = []
        let edit = false;
        let deckIndex = 0
        if(target.value){
            deckSelected = deck[target.value].cards
            edit = true
            deckIndex =target.value
        }
        this.setState({
            onCreation:true,
            deckSelected,
            edit,
            deckIndex,
        })
    }
    addCardOnDeck = (pokemon) =>{
        const{deckSelected,cards} =this.state;
        const card = cards.find((e)=>e.name ===pokemon.name && e.attack === pokemon.attack && e.hp === pokemon.hp)
        const newCards = [...deckSelected,card]
        this.setState({
            deckSelected: newCards,
        },()=>{
            this.filtredCards()
        })
    }
    removeCardOnDeck = ({target}) =>{
        const{deckSelected} =this.state
        const newCards = deckSelected.filter((_e,i)=>(i !== +target.value))
        this.setState({
            deckSelected: newCards,
        },()=>{
            this.filtredCards();
        })
    }
    deckName = ({target})=>{
        this.setState({
            deckName: target.value
        })
    }
    addDeck = ()=>{
        const {deckSelected,deckName,deck,edit,deckIndex} = this.state
        let lastid = 1
        try {
            lastid = deck[deck.length - 1].id + 1
        } catch (error) {
            lastid = 1
        }
        if(edit){
            lastid = deck[deckIndex].id
        }
        const fullDeck = {name:deckName,cards:deckSelected,id:lastid}
        saveDeck(fullDeck);
        const newDeck = getDecks();
        this.setState({
            onCreation:false,
            deckSelected:[],
            deckName:'',
            deck:newDeck
        })
    }
    removeDeck = ({target})=>{
        const {deck} =this.state
        const deckSelected = deck[target.value]
        removeDeck(deckSelected);
        const newDeck = getDecks();
        this.setState({
            deck:newDeck
        })
    }
    filtredCards = ()=>{
        const {cards,deckSelected} =this.state
        let filtred = cards
        if(deckSelected.length >0){
            filtred = cards.map((e)=>(deckSelected.includes(e)?false:e)).filter((e)=>e!==false)
        }
        this.setState({
            cardsFiltred:filtred
        })
    }
  render() {
    const {focus,onBoard,deck,onCreation,deckSelected,deckName,cardsFiltred} = this.state
    return (
        <div>
            {focus?<div className='w-full flex justify-end mt-3 absolute z-10'><button onClick={this.exitFocus} className='mr-10 '>X</button></div>
           :''}
            <div>
            {focus?<div className='poke3d min-w-full mx-auto min-h-screen flex justify-center items-center'><RenderPokemon pokemon={onBoard}/></div>
            :''}
            </div>
        <div className={`${focus?'blur-xl':''}`}>
            <Header />
            {!onCreation? <div className='flex justify-around flex-wrap'>
            {deck.map((e,i)=>(
                <div key={`${e.id}${i}`}>
                    <RenderDeck deck={e}/>
                    <button value={i} onClick={this.creationDeck} className='text-center w-48 ml-20 z-10 absolute '>Edit</button>
                    <button value={i} onClick={this.removeDeck} className='text-center w-48  z-10 absolute '>Remover</button>

                </div>
            ))}
            <div className='pokeCard text-center border-4 border-red-900 bg-slate-400 pokeCardsInDeck flex items-center justify-center m-5'>
                <button onClick={this.creationDeck}>Criar Deck</button>
            </div>
        </div>:''}
       
        {onCreation?    <div className='flex justify-between flex-wrap mt-10'>
        <div className=' flex justify-around flex-wrap w-1/3 border-4 border-sky-900 h-fit pokeDeckBoard mt-5'>
        {deckSelected.length===6?
        <div className='w-full'>
            <input className='w-full bg-sky-900 my-2' onChange={this.deckName} value={deckName} placeholder='Nome do Deck'></input>
            <button className='w-full bg-sky-900' onClick={this.addDeck}>Finalizar</button>
        </div>:''}
            {deckSelected.map((e,i)=>(
                <div className='my-5' key={`${e.name}Deck`}>
                 <RenderCard pokemon={e}/>
                 <button value={i} onClick={this.removeCardOnDeck} className='text-center w-48 ml-14 pokeAddCard z-10 absolute '>-</button>
                </div>
            ))}
        </div>
        {deckSelected.length ===6?'':<div className='w-2/3 flex justify-around flex-wrap h-fit'>
        {cardsFiltred.map((e,i)=>(
                <div key={`${e.name}${i}Cards`} className='m-14'><RenderCard pokemon={e}/>
                <button  onClick={()=>{this.addCardOnDeck(e)}} className='text-center w-48 ml-14 pokeAddCard z-10 absolute '>+</button>
                <button  onClick={()=>{this.cardOnBoard(e)}} className='text-center w-48 ml-14 pokeView z-10 absolute '>view</button></div>
                
        ))}
        </div>}
      </div>:''}
        </div>
        </div>
    )
  }
}
