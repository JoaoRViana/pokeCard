import React, { Component } from 'react'
import Header from '../Components/Header';
import RedirectButton from '../Components/RedirectButton';

export default class SetGame extends Component {

  render() {
    return (
      <div className='flex flex-wrap  justify-center'>
        <div className='w-full h-10  '>
        <Header />
        </div>
        <div className='flex w-60 flex-wrap h-32 self-start my-60'>
        <div className='mx-auto mb-5 text-2xl styledText bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded h-14'>
        <RedirectButton path='singlePlayer' text='singlePlayer'/>
        </div>
        <div className='mx-auto  text-2xl styledText bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded h-14'>
        <RedirectButton path='multiPlayer' text='multiPlayer'/>
        </div>
        </div>
      </div>
    )
  }
}
