import React, { Component } from 'react'
import RenderPokemon from './RenderPokemon'

export default class Battle extends Component {
  render() {
    const {battle:{enemyPokemon1,enemyPokemon2,playerPokemon1,playerPokemon2,attackMode,attackType,pokemonAttacker,hitEnemy,summonPokemon,attack,setAttackType}} = this.props
    return (
      <div>
        <div className='flex justify-around w-full mx-auto h-96 '>
        {enemyPokemon1.hp>0?<button onClick={()=>{
          if(attackMode && attackType){ hitEnemy('enemyPokemon1')
        }
        }} id={`enemyPokemon${enemyPokemon1.name}`}><RenderPokemon pokemon={enemyPokemon1}/></button>:
        <div  className='pokeCard emptyCard'/>}
        {enemyPokemon2.hp>0?<button onClick={()=>{
          if(attackMode && attackType){ hitEnemy('enemyPokemon2')
        }
        }} id={`enemyPokemon${enemyPokemon2.name}`}><RenderPokemon pokemon={enemyPokemon2}/></button>:<div  className='pokeCard emptyCard'/>}
        </div>
        <div className='flex justify-around  w-full mx-auto h-96 '>
        {attackMode && pokemonAttacker.name === playerPokemon1.name?<div className='absolute'>{pokemonAttacker.types.map((e)=>(<div key={`${e.type.name}button`} className='flex justify-around'><button onClick={()=>{
          setAttackType(e.type.name)
        }} className={`text${e.type.name}  w-28 hover:contrast-200 z-20 ${attackType === e.type.name?'':'opacity-50'}`}>{e.type.name}</button></div>))}</div>:''}
        {playerPokemon1.hp>0 && playerPokemon1.hp !== undefined?<button id={`playerPokemon${playerPokemon1.name}`}
          onClick={()=>{attack('playerPokemon1')}}
        className={`${playerPokemon1.attacked?'opacity-50':''}`}><RenderPokemon pokemon={playerPokemon1}/></button>:<button onClick={()=>{summonPokemon('playerPokemon1')}}><div  className='pokeCard emptyCard'/></button>}
                {attackMode && pokemonAttacker.name === playerPokemon2.name?<div className='absolute'>{pokemonAttacker.types.map((e)=>(<div key={`${e.type.name}button`} className='flex justify-around '><button onClick={()=>{
          setAttackType(e.type.name)
        }} className={`text${e.type.name} w-28 hover:contrast-200 z-20 ${attackType === e.type.name?'':'opacity-50'}`}>{e.type.name}</button></div>))}</div>:''}
        {playerPokemon2.hp>0 && playerPokemon2.hp !== undefined?<button id={`playerPokemon${playerPokemon2.name}`}
            onClick={()=>{attack('playerPokemon2')}}
            className={`${playerPokemon2.attacked?'opacity-50':''}`}><RenderPokemon pokemon={playerPokemon2}/></button>:<button onClick={()=>{summonPokemon('playerPokemon2')}}><div  className='pokeCard emptyCard'/></button>}
        </div>
      </div>
    )
  }
}
