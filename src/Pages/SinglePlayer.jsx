import React, { Component } from 'react'
import { enemyDamage, getSetDeckForPlay } from '../utils'
import RenderCard from '../Components/RenderCard'
import RenderPokemon from '../Components/RenderPokemon'
import RandomPokemon from '../Pages/RandomPokemon'
import { genPokemon,getPokemon } from '../utils'
import { weakness,resitances } from '../utils/Weakness'

export default class SinglePlayer extends Component {
    state = {
        deck:{cards:[]},
        allCards:[],
        cardsOnHand:[],
        selectedCardOnHand:'',
        playerPokemon1:{attacked:false,pokeNum:1},
        playerPokemon2:{attacked:false,pokeNum:2},
        enemyPokemon1:'',
        enemyPokemon2:'',
        attackMode:false,
        attackType:'',
        pokemonAttacker:{},
        pokemonNumber:'',
        enemyCards:0,
        win:false,
    }
    componentDidMount(){
        this.getPlayerDeck();
        this.getEnemyPokemon('enemyPokemon1')
        this.getEnemyPokemon('enemyPokemon2')
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
    summonPokemon = (pokemon) =>{
      const {selectedCardOnHand,cardsOnHand} = this.state;
      const selecteds = cardsOnHand.filter((e)=>(e.name !==selectedCardOnHand.name))
      this.setState({
        [pokemon] :{...selectedCardOnHand,...this.state[pokemon],attacked:false},
        cardsOnHand:selecteds,
        selectedCardOnHand:false,
      })
    }
    attack = (pokemon)=>{
      if(!this.state[pokemon].attacked){
        this.setState({
          pokemonAttacker:this.state[pokemon],
          pokemonNumber:pokemon,
          attackMode:true,
        })
      }
    }
    getEnemyPokemon = async(enemy)=>{
      const {enemyCards} = this.state
      let randomNumber  = Math.round((Math.random()*(251- 1)+1))
      const pokemon = await genPokemon(await getPokemon(randomNumber))
      this.setState({
        [enemy]:pokemon,
        enemyCards: enemyCards + 1,
      })
    }

    hitEnemy = (enemy)=>{
      const {attackType,pokemonAttacker,pokemonNumber} =this.state
      const enemyTypes = this.state[enemy].types;
      const weak = enemyTypes.map((e)=>{
        if(weakness[e.type.name].includes(attackType)){
          return 1
        }return false
      }).filter((e)=>(e !==false))
      const resis = enemyTypes.map((e)=>{
        if(resitances[e.type.name].includes(attackType)){
          return 1
        }return false
      }).filter((e)=>(e !==false))
      this.setState({
        [enemy]:{...this.state[enemy],hp: Math.floor(this.state[enemy].hp -(pokemonAttacker.attack)*(((weak.length >0?(weak.length)*2:1))/(resis.length >0?(resis.length)*2:1)) )},
        attackMode:false,
        attackType:'',
        [pokemonNumber]:{...this.state[pokemonNumber],attacked:true}
      },()=>{
        const {enemyCards,enemyPokemon1,enemyPokemon2} = this.state
        const enemyhp = this.state[enemy].hp;
        if(enemyhp <1 && enemyCards <3){
          this.getEnemyPokemon(enemy)
        }if((enemyPokemon1.hp < 1 || enemyPokemon1.hp === undefined) && (enemyPokemon2.hp < 1 || enemyPokemon1.hp === undefined) && enemyCards >2){
          this.setState({
            win:true
          })
        }
      })
    }
    hitPlayer = (enemy)=>{
      const {playerPokemon1,playerPokemon2} = this.state;
      const damage = enemyDamage(enemy,[playerPokemon1.hp>1?playerPokemon1:false,playerPokemon2.hp>1?playerPokemon2:false]);
      const playerPokemon = damage.pokemon
      if((this.state[playerPokemon].hp - damage.attack) <1){
        this.setState({
          [playerPokemon]:{attacked:false,pokeNum:damage.pokeNum}
        },()=>{
          this.setState({
            playerPokemon1:{...this.state.playerPokemon1,attacked:false},
            playerPokemon2:{...this.state.playerPokemon2,attacked:false},
          })
        })
      }else{
        this.setState({
          [playerPokemon]:{...this.state[playerPokemon],hp:(this.state[playerPokemon].hp - damage.attack)}
        },()=>{
          this.setState({
            playerPokemon1:{...this.state.playerPokemon1,attacked:false},
            playerPokemon2:{...this.state.playerPokemon2,attacked:false},
          })
        })
      }
      
    }
    passTurn = async()=>{
      const {enemyPokemon1,enemyPokemon2}=this.state;
      if(enemyPokemon1.hp >1){
        this.hitPlayer(enemyPokemon1)
      }if(enemyPokemon2.hp>1){
        this.hitPlayer(enemyPokemon2)
      }
    }
  render() {
    const {cardsOnHand,playerPokemon1,playerPokemon2,enemyPokemon1,enemyPokemon2,attackMode,pokemonAttacker,win}= this.state
    return (
      <div>
        {win?<RandomPokemon />:<div>{attackMode?<div>{pokemonAttacker.types.map((e)=>(<div key={`${e.type.name}button`}><button onClick={()=>{
          this.setState({
            attackType:e.type.name,
          })
        }}>{e.type.name}</button></div>))}</div>:''}
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
        <div>
        {playerPokemon1.hp>0 && playerPokemon1.hp !== undefined?<button id={'playerPokemon1'}
          onClick={()=>{this.attack('playerPokemon1')}}
        ><RenderPokemon pokemon={playerPokemon1}/></button>:<button onClick={()=>{this.summonPokemon('playerPokemon1')}}>[   ]</button>}
        {playerPokemon2.hp>0 && playerPokemon2.hp !== undefined?<button 
            onClick={()=>{this.attack('playerPokemon2')}}
         id={'playerPokemon2'}><RenderPokemon pokemon={playerPokemon2}/></button>:<button onClick={()=>{this.summonPokemon('playerPokemon2')}}>[   ]</button>}
        </div>
        <button onClick={this.passTurn}>Pass</button>
        <div>
          <h1>Enemies</h1>
        {enemyPokemon1.hp>0?<button onClick={()=>{
          if(attackMode){ this.hitEnemy('enemyPokemon1')
        }
        }} id={'enemyPokemon1'}><RenderPokemon pokemon={enemyPokemon1}/></button>:'[   ]'}
        {enemyPokemon2.hp>0?<button onClick={()=>{
          if(attackMode){ this.hitEnemy('enemyPokemon2')
        }
        }} id={'enemyPokemon1'}><RenderPokemon pokemon={enemyPokemon2}/></button>:'[   ]'}
        </div></div>}
      </div>
    )
  }
}
