import React, { Component } from 'react'
import RedirectButton from '../Components/RedirectButton'

export default class LooseBattle extends Component {
  render() {
    return (
      <div className=''>
        <h1 className='w-full text-2xl styledText text-center p-5'>You Loose</h1>
        <div className='mx-auto w-60 text-center mt-5 text-2xl styledText bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded'>
        <RedirectButton path='' text='back to home'/>
        </div>
      </div>
    )
  }
}
