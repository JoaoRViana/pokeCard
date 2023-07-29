import React, { Component } from 'react'
import RedirectButton from '../Components/RedirectButton'

export default class LooseBattle extends Component {
  render() {
    return (
      <div className='block mx-auto w-1/3'>
        <h1 className='w-full text-2xl styledText text-center  mt-5'>You Loose</h1>
        <div className='w-1/2 mx-auto text-center mt-5 text-2xl styledText bg-slate-400 rounded-md p-2'>
        <RedirectButton path='' text='back to home'/>
        </div>
      </div>
    )
  }
}
