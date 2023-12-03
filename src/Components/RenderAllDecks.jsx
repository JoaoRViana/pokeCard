import React, { Component } from 'react'
import RenderDeck from './RenderDeck'

export default class RenderAllDecks extends Component {
    render(){
        const {deck,creationDeck,removeDeck} = this.props
        return(
            <div className='flex justify-around flex-wrap'>
            {deck.map((e,i)=>(
                <div key={`${e.id}${i}`}>
                    <RenderDeck deck={e}/>
                    <div className='flex flex-wrap justify-around'>
                    <button value={i} onClick={creationDeck} className='text-sm styledText bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded'>Edit</button>
                    <button value={i} onClick={removeDeck} className='text-sm styledText bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded'>Remove</button>
                    </div>


                </div>
            ))}
            <div className='pokeCard text-center border-4 border-red-900 bg-slate-400 pokeCardsInDeck flex items-center justify-center m-5'>
                <button onClick={creationDeck}>Create Deck</button>
            </div>
        </div>
        )
    }
}