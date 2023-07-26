import React, { Component } from 'react'
import { getSetDeckForPlay } from '../utils'
import RenderCard from '../Components/RenderCard'
import RenderPokemon from '../Components/RenderPokemon'

export default class SinglePlayer extends Component {
    state = {
        deck:{cards:[]},
        allCards:[],
        cardsOnHand:[],
        selectedCardOnHand:'',
        playerPokemon1:false,
        playerPokemon2:false,
    }
    componentDidMount(){
        this.getPlayerDeck();
    }
    getPlayerDeck = ()=>{
        const deck  = getSetDeckForPlay();
        this.setState({
            deck,
        },()=>{
          this.setRandomCards();
        })
    }
    setRandomCards = ()=>{
      const {deck:{cards}}= this.state;
      const allCards = this.shuffle(cards)
      const cardsOnHand = [allCards[0],allCards[1],allCards[2],allCards[3]]
      cardsOnHand.forEach((_e)=>(allCards.shift()))
      this.setState({
        allCards,
        cardsOnHand,
      })
    }

    shuffle = (array) => {
      let currentIndex = array.length,  randomIndex;
      while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex], array[currentIndex]];
      }
      return array;
    }
    buyCard = ()=>{
      const {allCards,cardsOnHand} = this.state
      if(allCards.length >0){
        this.setState({
          cardsOnHand:[...cardsOnHand,allCards[0]]
        },()=>{
          allCards.shift()
        })
      }
      else{
        alert('no have more cards')
      }
    }
    summonPokemon = (number) =>{
      const {selectedCardOnHand,cardsOnHand} = this.state;
      const selecteds = cardsOnHand.filter((e)=>(e.name !==selectedCardOnHand.name))
      console.log('a')
      this.setState({
        [`playerPokemon${number}`] :selectedCardOnHand,
        cardsOnHand:selecteds,
        selectedCardOnHand:false,
      })
    }
  render() {
    const {cardsOnHand,playerPokemon1,playerPokemon2}= this.state
    return (
      <div>
        <div className='flex-wrap flex'>
        {cardsOnHand.map((e,i)=>(
            <div key={`${e.name}${i}`} id={`${e.name}${i}`}>
              <button onClick={()=>{
                      const {cardsOnHand,selectedCardOnHand} = this.state;
                      this.setState({
                        selectedCardOnHand:cardsOnHand[i]
                      })
                      if(selectedCardOnHand){
                        const index = cardsOnHand.map((e,i)=>{
                          if(e.name === selectedCardOnHand.name){
                            return i
                          }
                          return false
                        }).filter((e)=>(e !== false))
                        const oldElement = document.querySelector(`#${selectedCardOnHand.name}${index[0]}`)
                        oldElement.style.filter = '';
                      }
                      const element = document.querySelector(`#${e.name}${i}`)
                      element.style.filter = 'drop-shadow(0 30px 20px rgb(114, 226, 230))'
              }} ><RenderCard pokemon={e}/></button>
            </div>
        ))}
        </div>
        <button onClick={this.buyCard}>Buy</button>
        {playerPokemon1?<button><RenderPokemon pokemon={playerPokemon1}/></button>:<button onClick={()=>{this.summonPokemon(1)}}>[   ]</button>}
        {playerPokemon2?<button><RenderPokemon pokemon={playerPokemon2}/></button>:<button onClick={()=>{this.summonPokemon(2)}}>[   ]</button>}
      </div>
    )
  }
}
