import React, { Component } from 'react'
import { genPokemon, getPokemon, saveCard } from '../utils'
import RenderPokemon from '../Components/RenderPokemon'
import Header from '../Components/Header'

export default class RandomPokemon extends Component {
    state = {
        pokemon:false,
        arrayPokemons:[],
    }
    getRandomPokemon = async ()=>{
        const randomNumber  = Math.round((Math.random()*251- 1)+1)
        const pokemon = await genPokemon(await getPokemon(randomNumber))
        saveCard(pokemon);
        return pokemon
    }
    manyPokemons = async (quantity)=>{
        let array = [];
        for (let index = 0; index < quantity; index++) {
            const pokemon = await this.getRandomPokemon();
            array.push(pokemon)
        }
        this.setState({
            pokemon:true,
            arrayPokemons:array,
        })
    }
    componentDidMount(){
        this.manyPokemons(3)
    }
  render() {
    const {pokemon,arrayPokemons} = this.state;
    return (
      <div>
        <Header />
        <div className='flex justify-around flex-wrap mt-10'>
        {pokemon? arrayPokemons.map((e,i)=>(
            <div key={`${e.name}${i}`}>
                <RenderPokemon pokemon={e}/>
            </div>
        )):'Carregando...'}
        </div>
      </div>
    )
  }
}
