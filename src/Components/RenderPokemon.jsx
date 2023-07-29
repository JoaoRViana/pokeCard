import React, { Component } from 'react'

export default class RenderPokemon extends Component {
  render() {
    const {pokemon} = this.props
    return (
        <div>
            <div className='poke3d'>
            <div className='flex justify-evenly styledText absolute w-full  mt-6'>
                <h3 >Attack: {pokemon.attack}</h3>
                <h4 >Hp: {pokemon.hp}</h4>
            </div>
            <img src={pokemon.spriteOnBoard} alt={pokemon.name} className='w-48  mt-10 ml-16 pokeImg3d'/>
            </div>
        <div className={`pokeCard text-center border-4 border-red-900 bg-slate-400`}>
            <h1 className='my-5 text-2xl styledText'>{pokemon.name}</h1>
            <img src={pokemon.spriteCard} alt={pokemon.name} className='w-48 h-48 mt-10 mx-auto'/>
            <div className='mt-20 flex justify-around'>
                {pokemon.types.map((e)=>(
                    <h3 className={`styledText text-xl text${e.type.name}`} key={`${e.type.name}${pokemon.name}`}>{e.type.name}</h3>
                ))}
            </div>
            <div className='mt-10  styledText flex justify-around'>
                <h3 className='text-xl'>Attack: {pokemon.attack}</h3>
                <h4 className='text-xl'>Hp: {pokemon.hp}</h4>
            </div>
       </div>
        </div>
    )
  }
}
