import React, { Component } from 'react'

export default class RenderDeck extends Component {
  render() {
    const {deck} = this.props
    return (
      <div className='pokeCard text-center border-4 border-red-900 bg-slate-400 pokeCardsInDeck flex items-center justify-center  m-5'>
        <h1>{deck.name}</h1>
      </div>
    )
  }
}
