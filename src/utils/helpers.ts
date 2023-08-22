import { TCard, TDeck, TPokemon, Types } from "../types";
import {weakness,resitances} from "../utils/Weakness";

export async function getPokemon (id:number){
    const api = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await api.json();
    return data;
};

export async function genPokemon(pokemon:any){
    const randomIvHp = Math.round(Math.random()*(100 - 80)+80)
    let hp = Math.round(pokemon.stats[0].base_stat*((pokemon.stats[1].base_stat > pokemon.stats[3].base_stat?pokemon.stats[1].base_stat:pokemon.stats[3].base_stat)/20))
    hp = Math.round(hp* (randomIvHp/100));
    const randomIvAttack = Math.round(Math.random()*(100 - 80)+80)
    let attack = Math.round(pokemon.stats[1].base_stat > pokemon.stats[3].base_stat?pokemon.stats[1].base_stat:pokemon.stats[3].base_stat)
    attack = Math.round(attack *(randomIvAttack/100));
    let spriteCard = pokemon.sprites.other['official-artwork']['front_default'];
    let spriteOnBoard = pokemon.sprites.versions['generation-v']['black-white']['front_default'];
    const shiny =( Math.floor(Math.random()*50)=== 1)
    if(shiny){
        spriteCard = pokemon.sprites.front_shiny;
        spriteOnBoard =  pokemon.sprites.versions['generation-v']['black-white']['front_shiny'];
    }
    return {attack,hp,spriteCard,spriteOnBoard,name:pokemon.name,types:pokemon.types, }
}

export const saveCard = (pokemon:TPokemon)=>{
    const storedData = localStorage.getItem('cardPokemon');
    const oldPokemons: TPokemon[] = storedData ? JSON.parse(storedData) : []; 
    const newPokemons = [...oldPokemons,pokemon]
    localStorage.setItem('cardPokemon',JSON.stringify(newPokemons))
}

export const getCards = ()=>{
    const storedData = localStorage.getItem('cardPokemon');
    const cards: TCard[] = storedData ? JSON.parse(storedData) : [];
    return cards
}

export const saveDeck = (deck:TDeck)=>{
    const storedData = localStorage.getItem('deckPokemon');
    const oldDecks: TDeck[] = storedData ? JSON.parse(storedData) : []; 
    const filter = oldDecks.filter((e:TDeck)=>(e.id !== deck.id))
    const newDecks = [...filter,deck]
    localStorage.setItem('deckPokemon',JSON.stringify(newDecks))
}

export const removeDeck = (deck:TDeck)=>{
    const storedData = localStorage.getItem('deckPokemon');
    const oldDecks: TDeck[] = storedData ? JSON.parse(storedData) : []; 
    const filter = oldDecks.filter((e:TDeck)=>(e.id !== deck.id))
    const newDecks = [...filter]
    localStorage.setItem('deckPokemon',JSON.stringify(newDecks))
}

export const removeCard = (card:TCard)=>{
    const storedData = localStorage.getItem('cardPokemon');
    const oldDecks: TCard[] = storedData ? JSON.parse(storedData) : []; 
    const filter = oldDecks.filter((e:TCard)=>(e.name !== card.name && e.attack !== card.attack && e.hp !== card.hp))
    const newCards = [...filter]
    localStorage.setItem('cardPokemon',JSON.stringify(newCards))
    return newCards
}

export const getDecks = ()=>{
    const storedData = localStorage.getItem('deckPokemon');
    const cards: TPokemon[] = storedData ? JSON.parse(storedData) : []; 
    return cards;
}

export const setDeckForPLay = (deck:TDeck)=>{
    localStorage.setItem('deckForPlay',JSON.stringify(deck))
}

export const getSetDeckForPlay = ()=>{
    return JSON.parse(localStorage.getItem('deckForPlay')||'')||[];
}

export const getWeakness =(advPokemon:Types[],mainPokemonType:string,arrayTypes:any)=>{
    const weak = advPokemon.map((e:Types)=>{
        if(arrayTypes[e.type.name].includes(mainPokemonType)){
            return 1
        } return false
    }).filter((e)=>(e!==false))
    return weak
}

export const enemyDamage = (enemy:TPokemon,playerPokemons:[])=>{
    const playerPokemonsFiltred = playerPokemons.filter((e)=>(e!==false))
        const damages = enemy.types.map((enemyType)=>{
            return playerPokemonsFiltred.map((playerPokemon:TPokemon)=>{
                const playerTypes = playerPokemon.types;
                const type = enemyType.type.name
                const weak = getWeakness(playerTypes,type,weakness)
                const resis =getWeakness(playerTypes,type,resitances)
                return {playerPokemon:playerPokemon.name,pokemon:`playerPokemon${playerPokemon.pokeNum}`,attack:Math.floor((enemy.attack)*(((weak.length >0?(weak.length)*2:1))/(resis.length >0?(resis.length)*2:1))),type:enemyType}
            })
    })
    let bestDamage = {attack:1}
    damages.forEach((e)=>{
        e.forEach((e)=>{
            if(+e.attack > +bestDamage.attack){
                bestDamage = e
            }
        })
    })
    return bestDamage
}
export const shuffle = (array:[]) => {
  let currentIndex = array.length,  randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}
