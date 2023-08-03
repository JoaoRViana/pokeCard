import React, { Component } from 'react'
import RenderCard from './RenderCard'

export default class CardsOnHand extends Component {   
  render() {
    const {cards,effect} = this.props
    return (
      <div> <div className='flex-wrap flex justify-center w-auto mx-auto'>
      {cards.cardsOnHand.map((e,i)=>(
          <div key={`${e.name}${i}`} id={`${e.name}${i}`}>
            <button onClick={()=>{
              effect(e,i)
            }} ><RenderCard pokemon={e}/></button>
          </div>
      ))}
      </div></div>
    )
  }
}
