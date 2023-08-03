import React, { Component } from 'react'
import { enemyDamage, getSetDeckForPlay,shuffle } from '../utils/helpers.ts'
import RandomPokemon from '../Pages/RewardsPokemon'
import Pokemon from '../utils/Pokemon.ts'
import Cards from '../utils/Cards.ts'
import Battle from './Battle.jsx'
import CardsOnHand from './CardsOnHand.jsx'


export default class SinglePlayer extends Component {
    state = {
        deck:{cards:[]},
        cards:{allCards:[],cardsOnHand:[]},
        selectedCardOnHand:'',
        playerPokemon1:{},
        playerPokemon2:{},
        enemyPokemon1:'',
        enemyPokemon2:'',
        attackMode:false,
        attackType:'',
        pokemonAttacker:{},
        pokemonNumber:'',
        enemyCards:0,
        enemyDeck:[],
        win:false,
        buy:false,
        loose:false,
    }
    componentDidMount(){
        this.getPlayerDeck();

    }
    getPlayerDeck = ()=>{
      const {trainer} = this.props
        const deck  = getSetDeckForPlay();
        this.setState({
            deck,
            enemyDeck:trainer.cards,
        },()=>{
          this.setRandomCards();
        })
    }
    setRandomCards = ()=>{
      const {deck:{cards},enemyDeck}= this.state;
      const newCards = new Cards(cards)
      newCards.initialGame();
      const enemyCards = shuffle(enemyDeck)
      this.setState({
        cards:newCards,
        enemyDeck:enemyCards
      },async ()=>{
        await this.getEnemyPokemon('enemyPokemon1')
        await this.getEnemyPokemon('enemyPokemon2')
      })
    }
    buyCard = ()=>{
      const {cards} = this.state
      cards.buyCard()
      this.setState({
        buy:true,
      })
    }
    summonPokemon = (pokemon) =>{
      const {selectedCardOnHand,cards} = this.state;
      cards.summonCard(selectedCardOnHand)
      const number = pokemon[13]
      selectedCardOnHand.pokeNum = number
      const poke = new Pokemon(selectedCardOnHand)
      this.setState({
        [pokemon] :poke,
        selectedCardOnHand:false,
      })
    }
    attack = (pokemon)=>{
      const {pokemonAttacker} =this.state
      if(pokemonAttacker.name !== undefined && pokemonAttacker.hp >0 ){
        try {
          const old = document.querySelector(`#playerPokemon${pokemonAttacker.name}`)
          old.style.filter = ''
        } catch (error) {
          
        }
      }
      if(!this.state[pokemon].attacked){
        this.setState({
          pokemonAttacker:this.state[pokemon],
          pokemonNumber:pokemon,
          attackType:'',
          attackMode:true,
        },()=>{
          const {pokemonAttacker} =this.state
          const element = document.querySelector(`#playerPokemon${pokemonAttacker.name}`)
          element.style.filter = 'contrast(1.5)'
        })
      }
    }

    getEnemyPokemon = async(enemy)=>{
      const {enemyCards,enemyDeck} = this.state
      const pokemon = enemyDeck[enemyCards]
      pokemon.pokeNum = 0
      const poke = new Pokemon(pokemon)
      this.setState({
        [enemy]:poke,
        enemyCards: enemyCards + 1,
      })
    }
    hitEffect=(enemy)=>{
      const element = document.querySelector(`#${enemy}`)
      element.style.filter = 'opacity(0.7) drop-shadow(0 0 0 red) drop-shadow(0 0 0 red)'
      element.style.animation ='tilt 0.5s ease-in-out infinite'
      setTimeout(()=>{
        try {
           element.style.filter = ''
          element.style.animation = ''
        } catch (error) {
        }
      },300)
    }
    hitEnemy = (enemy)=>{
      const {attackType,pokemonAttacker,pokemonNumber} =this.state
      const choosedEnemy = this.state[enemy];
      const choosedPokemon = this.state[pokemonNumber]
      choosedPokemon.turnAttacked(true)
      const element = document.querySelector(`#playerPokemon${pokemonAttacker.name}`)
      element.style.filter = ''
      choosedEnemy.receiveDamage((choosedPokemon.attack*choosedEnemy.damageMultiplier(attackType)))
      this.hitEffect(`enemyPokemon${choosedEnemy.name}`);
      setTimeout(() => {
        this.setState({
          attackMode:false,
          attackType:'',
        },()=>{
          const {enemyCards,enemyPokemon1,enemyPokemon2,enemyDeck} = this.state
          const enemyhp = this.state[enemy].hp;
          if(enemyhp <1 && enemyDeck.length > enemyCards){
            this.getEnemyPokemon(enemy)
          }if((enemyPokemon1.hp < 1 || enemyPokemon1.hp === undefined) && (enemyPokemon2.hp < 1 || enemyPokemon1.hp === undefined) && enemyDeck.length <enemyCards+1){
            this.setState({
              win:true
            })
          }
        })
      }, 100);
    }
    enemyTurn = ()=>{
      const {enemyPokemon1,enemyPokemon2,playerPokemon1,playerPokemon2} = this.state;
      const pokemons = [playerPokemon1,playerPokemon2];
      const enemies = [enemyPokemon1,enemyPokemon2];
      pokemons.forEach((e)=>{
        if(e.name !== undefined){
          e.turnAttacked(false)
        }
      })
      this.setState({
        buy:false,
      })
      enemies.forEach((e,i)=>{
        setTimeout(() => {
          if(e.hp >0){
            this.hitPlayer(e)
          }
        }, (200*(i*2)));
      })
    }
    hitPlayer = (enemy)=>{
      const {playerPokemon1,playerPokemon2} = this.state;
      if(playerPokemon1.hp>0 || playerPokemon2.hp>0){
        const damage = enemyDamage(enemy,[playerPokemon1.hp>1?playerPokemon1:false,playerPokemon2.hp>1?playerPokemon2:false]);
        const playerPokemon = damage.pokemon
        const element = document.querySelector(`#playerPokemon${damage.playerPokemon}`)
        element.style.filter = ''
        const poke = this.state[playerPokemon]
        poke.receiveDamage(damage.attack)
        this.hitEffect(`playerPokemon${damage.playerPokemon}`)
        if(poke.hp <1){
          this.setState({
            [playerPokemon]:'',
          })
        }
        this.setState({
          [playerPokemon]:poke
        })
      }      
    }
    passTurn = async()=>{
      const {playerPokemon1,playerPokemon2,cards}=this.state;
      if((playerPokemon1.hp === undefined || playerPokemon1.hp <0)  && (playerPokemon2.hp === undefined || playerPokemon2.hp <0) && cards.cardsOnHand.length <1){
        console.log('b')
        this.setState({
          loose:true,
        })
      }
      else if((playerPokemon1.hp === undefined || playerPokemon1.hp <0)  && (playerPokemon2.hp === undefined || playerPokemon2.hp <0) && cards.cardsOnHand.length >0){
        const firstPokemon = cards.cardsOnHand[0]
          this.setState({
            selectedCardOnHand:firstPokemon,
          },()=>{
            this.summonPokemon('playerPokemon1')
            this.enemyTurn()
          })
        }
        else {
          this.enemyTurn();
        }
    }
    looseBattle = ()=>{
      window.location.replace('/loose')
    }
    setAttackType = (attackType)=>{
      this.setState({
        attackType,
      })
    }
    cardOnhandEffect=(card,index)=>{
      const {cards,selectedCardOnHand} = this.state;
      this.setState({
        selectedCardOnHand:cards.cardsOnHand[index]
      })
      if(selectedCardOnHand){
        let index = 0
        cards.cardsOnHand.forEach((e,i)=>{
          if(e.name === selectedCardOnHand.name){
            index =  i
          }})
        const oldElement = document.querySelector(`#${selectedCardOnHand.name}${index}`)
        oldElement.style.filter = '';
      }
      const element = document.querySelector(`#${card.name}${index}`)
      element.style.filter = 'drop-shadow(0 -30px 20px rgb(230, 30, 20))'
      if(selectedCardOnHand.name === card.name){
        element.style.filter = ''
        this.setState({
          selectedCardOnHand:''
        })
      }
    }
  render() {
    const {playerPokemon1,playerPokemon2,enemyPokemon1,enemyPokemon2,attackMode,pokemonAttacker,win,attackType,buy,cards,loose}= this.state
    const battle = {playerPokemon1,playerPokemon2,enemyPokemon1,enemyPokemon2,attackMode,pokemonAttacker,attackType,
      summonPokemon:this.summonPokemon,
      hitEnemy:this.hitEnemy,
      attack:this.attack,
      setAttackType:this.setAttackType,
    }
    const {trainer} =this.props
    return (
      <div className='bg-zinc-300 py-5'>
        <div>
        {loose?this.looseBattle():''}
        </div>
        {win?<RandomPokemon min={trainer.min} max={trainer.max}/>:
        <div>
          <div className='bg-slate-100 w-1/2 mx-auto shadow-md'>
            <Battle battle={battle}/>
          </div>
          <div className=' flex justify-center float-right w-20 flex-wrap buttonsContainer'>
          <button onClick={this.buyCard} disabled={buy || cards.allCards.length<1} className='mr-3 w-20 z-40 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded disabled:opacity-50 disabled:cursor-not-allowed'>Buy</button>
          <button onClick={this.passTurn} className='mr-3 w-20 mt-2 z-40 bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-2 px-4 border-b-4 border-yellow-700 hover:border-yellow-500 rounded'>Pass</button>
        </div>
       <CardsOnHand cards={cards} effect={this.cardOnhandEffect}/>
</div>}
      </div>
    )
  }
}