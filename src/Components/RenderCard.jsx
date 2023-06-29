import React, { Component } from 'react'

export default class RenderCard extends Component {
  render() {
    const {pokemon} = this.props;
    return (
      <div className=''>
        <div className={`pokeCard text-center border-4 border-red-900 bg-slate-400 pokeCardsInDeck`}>
            <h1 className='my-5 text-2xl styledText'>{pokemon.name}</h1>
            <img src={pokemon.spriteCard} alt={pokemon.name} className='w-28 h-28  mx-auto'/>
            <div className='mt-8 flex justify-around'>
                {pokemon.types.map((e)=>(
                    <h3 className={`styledText  text${e.type.name}`} key={`${e.type.name}${pokemon.name}`}>{e.type.name}</h3>
                ))}
            </div>
            <div className='mt-10  styledText flex justify-around'>
                <h3 className=''>Attack: {pokemon.attack}</h3>
                <h4 className=''>Hp: {pokemon.hp}</h4>
            </div>
       </div>
      </div>
    )
  }
}
