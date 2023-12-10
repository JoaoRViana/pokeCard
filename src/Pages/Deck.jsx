import React, { Component, createElement } from 'react'
import { getCards, getDecks, removeCard, removeDeck, saveDeck } from '../utils/helpers.ts'
import Header from '../Components/Header';
import RenderAllDecks from '../Components/RenderAllDecks.jsx';
import CreationDeck from '../Components/CreationDeck.jsx';

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
        index:0
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
        if(newCards.length<6){
            this.renderEffect()
        }
        this.setState({
            deckSelected: newCards,
            index:deckSelected.length 
        },()=>{
            this.filtredCards()
        })
    }
    removeCardOnDeck = ({target}) =>{
        const{deckSelected} =this.state
        this.renderEffect();
        const newCards = deckSelected.filter((_e,i)=>(i !== +target.value))
        this.setState({
            deckSelected: newCards,
            index:newCards.length-1
        },()=>{
            this.filtredCards();
        })
    }
    changeDeckName = ({target})=>{
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
        let filtred = deckSelected
        if(deckSelected.length >0){
            filtred = cards.filter((e)=>{
                return !(filtred.some((j)=>(e.name === j.name && e.attack === j.attack && e.hp === j.hp)))
            })
        }
        this.setState({
            cardsFiltred:filtred
        })
    }
    nextOrPreviousCard= ({target})=>{
        const{deckSelected,index} = this.state
        this.renderEffect();
        const nextCard = (index+(+target.value))
        const max = nextCard > deckSelected.length-1?true:false
        const min = nextCard < 0?true:false
        const newIndex = max?0:min?deckSelected.length-1:nextCard;
        this.setState({
            index:newIndex
        })
       
    }
    renderEffect= ()=>{
        const yourCards= document.getElementById('yourCards');
        const effect = document.createElement('div');
        effect.id='effect'
        effect.className='renderEffect'
        yourCards.appendChild(effect)
        setTimeout(()=>{
            yourCards.removeChild(effect)
        },2000)
    }
  render() {
    const {deck,onCreation,deckSelected,deckName,cardsFiltred,disabled,index} = this.state
    return (
        <div>
            <Header />
            {!onCreation? <RenderAllDecks deck={deck} creationDeck={this.creationDeck} removeDeck={this.removeDeck}/>:''}
        {onCreation?  <CreationDeck deckName={deckName} changeDeckName={this.changeDeckName} removeCardOnDeck={this.removeCardOnDeck} deckSelected={deckSelected} 
        cardsFiltred={cardsFiltred} addCardOnDeck={this.addCardOnDeck} deleteCard={this.deleteCard} 
        addDeck={this.addDeck} disabled={disabled} index={index} nextOrPreviousCard={this.nextOrPreviousCard}/>:''}
        </div>
    )
  }
}
