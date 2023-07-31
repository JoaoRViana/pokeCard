import React, { Component } from 'react'
import { getCards, getDecks, removeCard, removeDeck, saveDeck } from '../utils'
import RenderCard from '../Components/RenderCard';
import Header from '../Components/Header';
import RenderDeck from '../Components/RenderDeck';

export default class Deck extends Component {
    state={
        cards:[],
        onCreation:false,
        deckSelected:[],
        deckIndex:0,
        onBoard:{},
        deck:[],
        cardsFiltred:[],
        deckName:'',
        edit:false,
        disabled:true,
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
            deckName: target.value,
        },()=>{
            const {deckName}= this.state
            let disabled = true
            if(deckName.length>0){
                disabled = false
            }
            this.setState({
                disabled,
            })
        })
    }
    deleteCard = (card)=>{
        const cards = removeCard(card);
        this.setState({
            cards,
        },()=>{
            this.filtredCards();
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
    const {deck,onCreation,deckSelected,deckName,cardsFiltred,disabled} = this.state
    return (
        <div>
        <div>
            <Header />
            {!onCreation? <div className='flex justify-around flex-wrap'>
            {deck.map((e,i)=>(
                <div key={`${e.id}${i}`}>
                    <RenderDeck deck={e}/>
                    <div className='flex flex-wrap justify-around'>
                    <button value={i} onClick={this.creationDeck} className='text-sm styledText bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded'>Edit</button>
                    <button value={i} onClick={this.removeDeck} className='text-sm styledText bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded'>Remove</button>
                    </div>


                </div>
            ))}
            <div className='pokeCard text-center border-4 border-red-900 bg-slate-400 pokeCardsInDeck flex items-center justify-center m-5'>
                <button onClick={this.creationDeck}>Criar Deck</button>
            </div>
        </div>:''}
        {onCreation?  <div className='flex justify-around flex-wrap mt-10'>
            {deckSelected.length ===6?'':<h1 className='w-full ml-5 styledText'>Your Deck</h1>}
        <div className='min-w-[310px] flex justify-around flex-wrap w-2/6 bg-stone-200 ml-3 h-fit mt-5 rounded-xl py-2 min-h-[550px] border-teal-400 border-2'>
        {deckSelected.length===6?
        <div className='flex flex-wrap justify-center w-44 w-full h-40'>
            <div className='flex flex-wrap justify-center w-20 '>
            <input className='mx-auto h-10 text-center rounded styledText text-sm' onChange={this.deckName} value={deckName} placeholder='Nome do Deck'></input>
            <button className='mx-auto h-10 text-xl styledText bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded mx-auto disabled:opacity-50' onClick={this.addDeck} disabled={disabled}>Finalizar</button>
            </div>
            
        </div>:''}
            {deckSelected.map((e,i)=>(
                <div className='my-5' key={`${e.name}Deck`}>
                    <button value={i} onClick={this.removeCardOnDeck} className='absolute ml-5 mt-1 w-8 h-8 z-10 text-sm  bg-red-500 hover:text-stone-900 text-white font-bold py-1 px-1 border-s-4 border-red-800 rounded-tl-3xl rounded-br-3xl '>-</button>
                 <RenderCard pokemon={e}/>
                </div>
            ))}
        </div>
        {deckSelected.length ===6?'':<div className='w-3/5 flex justify-around flex-wrap h-fit'>
        <h1 className='w-full ml-20 text-xl styledText'>Your Cards</h1>

        {cardsFiltred.map((e,i)=>(
                <div key={`${e.name}${i}Cards`} className='m-10'>
                    <button  onClick={()=>{this.addCardOnDeck(e)}} className='absolute ml-5 mt-1 w-8 h-8 z-10 text-sm bg-blue-500 hover:text-emerald-400 text-white font-bold py-1 px-1 border-s-4 border-red-800 rounded-tl-3xl rounded-br-3xl '>+</button>
                    <button  onClick={()=>{this.deleteCard(e)}} className='absolute ml-[237px] mt-[314px] w-8 h-8 z-10 text-sm bg-red-500 hover:text-purple-700 text-white font-bold py-1 px-1 border-e-4 border-red-800 rounded-tl-3xl rounded-br-3xl '>-</button>
                    <RenderCard pokemon={e}/>

    </div>
                
        ))}
        </div>}
      </div>:''}
        </div>
        </div>
    )
  }
}
