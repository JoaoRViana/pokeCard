import React, { Component } from 'react'
import { enemyDamage, getSetDeckForPlay, getWeakness } from '../utils'
import RenderCard from '../Components/RenderCard'
import RenderPokemon from '../Components/RenderPokemon'
import RandomPokemon from '../Pages/RandomPokemon'
import { genPokemon,getPokemon,shuffle } from '../utils'
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
        buy:false,
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
      const allCards = shuffle(cards)
      const cardsOnHand = [allCards[0],allCards[1],allCards[2],allCards[3]]
      cardsOnHand.forEach((_e)=>(allCards.shift()))
      this.setState({
        allCards,
        cardsOnHand,
      })
    }
    buyCard = ()=>{
      const {allCards,cardsOnHand} = this.state
        this.setState({
          cardsOnHand:[...cardsOnHand,allCards[0]],
          buy:true,
        },()=>{
          allCards.shift()
        })
    }
    summonPokemon = (pokemon) =>{
      const {selectedCardOnHand,cardsOnHand} = this.state;
      const selecteds = cardsOnHand.filter((e)=>(e.name !==selectedCardOnHand.name));
      const number = pokemon[13]
      this.setState({
        [pokemon] :{...selectedCardOnHand,...this.state[pokemon],attacked:false,pokeNum:number},
        cardsOnHand:selecteds,
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
          attackMode:true,
        },()=>{
          const {pokemonAttacker} =this.state
          const element = document.querySelector(`#playerPokemon${pokemonAttacker.name}`)
          element.style.filter = 'contrast(1.5)'
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
      const weak = getWeakness(choosedEnemy.types,{type:{name:attackType}},weakness)
      const resis = getWeakness(choosedEnemy.types,{type:{name:attackType}},resitances)
      const element = document.querySelector(`#playerPokemon${pokemonAttacker.name}`)
      element.style.filter = ''
      this.hitEffect(`enemyPokemon${choosedEnemy.name}`);
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
      if(playerPokemon1.hp !==undefined || playerPokemon2.hp !== undefined){
        const damage = enemyDamage(enemy,[playerPokemon1.hp>1?playerPokemon1:false,playerPokemon2.hp>1?playerPokemon2:false]);
        const playerPokemon = damage.pokemon
        const element = document.querySelector(`#playerPokemon${damage.playerPokemon}`)
        element.style.filter = ''
        if((this.state[playerPokemon].hp - damage.attack) <1){
          this.setState({
            [playerPokemon]:{attacked:false,pokeNum:damage.pokeNum}
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
        this.hitEffect(`playerPokemon${damage.playerPokemon}`)
      }      
    }
    passTurn = async()=>{
      const {enemyPokemon1,enemyPokemon2}=this.state;
      if(enemyPokemon1.hp >0){
        this.hitPlayer(enemyPokemon1)
      }
      setTimeout(() => {
        if(enemyPokemon2.hp>0){
          this.hitPlayer(enemyPokemon2)
        }
      }, 600);
      
      this.setState({
        buy:false,
      })
    }
  render() {
    const {cardsOnHand,playerPokemon1,playerPokemon2,enemyPokemon1,enemyPokemon2,attackMode,pokemonAttacker,win,attackType,buy,allCards}= this.state
    return (
      <div className='bg-zinc-300 py-5'>
        {win?<RandomPokemon />:
        <div>
          <div className='bg-slate-100 w-1/2 mx-auto shadow-md'>
          <div className='flex justify-around w-full mx-auto h-96 '>
        {enemyPokemon1.hp>0?<button onClick={()=>{
          if(attackMode && attackType){ this.hitEnemy('enemyPokemon1')
        }
        }} id={`enemyPokemon${enemyPokemon1.name}`}><RenderPokemon pokemon={enemyPokemon1}/></button>:<div  className='pokeCard'/>}
        {enemyPokemon2.hp>0?<button onClick={()=>{
          if(attackMode && attackType){ this.hitEnemy('enemyPokemon2')
        }
        }} id={`enemyPokemon${enemyPokemon2.name}`}><RenderPokemon pokemon={enemyPokemon2}/></button>:<div  className='pokeCard'/>}
        </div>
        <div className='flex justify-around  w-full mx-auto h-96 '>
        {attackMode && pokemonAttacker.name === playerPokemon1.name?<div className='absolute'>{pokemonAttacker.types.map((e)=>(<div key={`${e.type.name}button`} className='flex justify-around'><button onClick={()=>{
          this.setState({
            attackType:e.type.name,
          })
        }} className={`text${e.type.name}  w-28 hover:contrast-200 z-20`}>{e.type.name}</button></div>))}</div>:''}
        {playerPokemon1.hp>0 && playerPokemon1.hp !== undefined?<button id={`playerPokemon${playerPokemon1.name}`}
          onClick={()=>{this.attack('playerPokemon1')}}
        ><RenderPokemon pokemon={playerPokemon1}/></button>:<button onClick={()=>{this.summonPokemon('playerPokemon1')}}><div  className='pokeCard emptyCard'/></button>}
                {attackMode && pokemonAttacker.name === playerPokemon2.name?<div className='absolute'>{pokemonAttacker.types.map((e)=>(<div key={`${e.type.name}button`} className='flex justify-around'><button onClick={()=>{
          this.setState({
            attackType:e.type.name,
          })
        }} className={`text${e.type.name} w-28 hover:contrast-200 z-20`}>{e.type.name}</button></div>))}</div>:''}
        {playerPokemon2.hp>0 && playerPokemon2.hp !== undefined?<button id={`playerPokemon${playerPokemon2.name}`}
            onClick={()=>{this.attack('playerPokemon2')}}
        ><RenderPokemon pokemon={playerPokemon2}/></button>:<button onClick={()=>{this.summonPokemon('playerPokemon2')}}><div  className='pokeCard emptyCard'/></button>}
        </div>
          </div>
          <div className=' flex justify-center float-right w-20 flex-wrap buttonsContainer'>
          <button onClick={this.buyCard} disabled={buy || allCards.length<1} className='mr-3 w-20 z-40 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded disabled:opacity-50 disabled:cursor-not-allowed'>Buy</button>
          <button onClick={this.passTurn} className='mr-3 w-20 mt-2 z-40 bg-yellow-500 hover:bg-yellow-400 text-white font-bold py-2 px-4 border-b-4 border-yellow-700 hover:border-yellow-500 rounded'>Pass</button>
        </div>
        <div className='flex-wrap flex justify-center w-auto mx-auto'>
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
                      element.style.filter = 'drop-shadow(0 -30px 20px rgb(230, 30, 20))'
                      if(selectedCardOnHand.name === e.name){
                        element.style.filter = ''
                        this.setState({
                          selectedCardOnHand:''
                        })
                      }
              }} ><RenderCard pokemon={e}/></button>
            </div>
        ))}
        </div>
</div>}
      </div>
    )
  }
}
