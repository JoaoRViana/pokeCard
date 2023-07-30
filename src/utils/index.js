import { resitances, weakness } from "./Weakness";

export async function getPokemon (id){
    const api = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const data = await api.json();
    return data;
};

export async function genPokemon(pokemon){
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

export const saveCard = (pokemon)=>{
    const oldPokemons = JSON.parse(localStorage.getItem('cardPokemon'))||[];
    const newPokemons = [...oldPokemons,pokemon]
    localStorage.setItem('cardPokemon',JSON.stringify(newPokemons))
}

export const getCards = ()=>{
    return JSON.parse(localStorage.getItem('cardPokemon')) ||[];;
}

export const saveDeck = (deck)=>{
    const oldDecks = JSON.parse(localStorage.getItem('deckPokemon'))||[];
    const filter = oldDecks.filter((e)=>(e.id !== deck.id))
    const newDecks = [...filter,deck]
    localStorage.setItem('deckPokemon',JSON.stringify(newDecks))
}

export const removeDeck = (deck)=>{
    const oldDecks = JSON.parse(localStorage.getItem('deckPokemon'))||[];
    const filter = oldDecks.filter((e)=>(e.id !== deck.id))
    const newDecks = [...filter]
    localStorage.setItem('deckPokemon',JSON.stringify(newDecks))
}

export const getDecks = ()=>{
    return JSON.parse(localStorage.getItem('deckPokemon')) ||[];
}

export const setDeckForPLay = (deck)=>{
    localStorage.setItem('deckForPlay',JSON.stringify(deck))
}

export const getSetDeckForPlay = ()=>{
    return JSON.parse(localStorage.getItem('deckForPlay'))||[];
}

export const getWeakness =(advPokemon,mainPokemonType,arrayTypes)=>{
    const weak = advPokemon.map((e)=>{
        if(arrayTypes[e.type.name].includes(mainPokemonType.type.name)){
            return 1
        } return false
    }).filter((e)=>(e!==false))
    return weak
}

export const enemyDamage = (enemy,playerPokemons)=>{
    const playerPokemonsFiltred = playerPokemons.filter((e)=>(e!==false))
        const damages = enemy.types.map((enemyType)=>{
            return playerPokemonsFiltred.map((playerPokemon)=>{
                const playerTypes = playerPokemon.types;
                const weak = getWeakness(playerTypes,enemyType,weakness)
                const resis =getWeakness(playerTypes,enemyType,resitances)
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
export const shuffle = (array) => {
  let currentIndex = array.length,  randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}

export const getStarterDeck = (id)=>{
    return {
        name:'Starter Deck',
        id,
        cards:[{
            "attack": 99,
            "hp": 352,
            "spriteCard": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png",
            "spriteOnBoard": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/3.png",
            "name": "venusaur",
            "types": [
                {
                    "slot": 1,
                    "type": {
                        "name": "grass",
                        "url": "https://pokeapi.co/api/v2/type/12/"
                    }
                },
                {
                    "slot": 2,
                    "type": {
                        "name": "poison",
                        "url": "https://pokeapi.co/api/v2/type/4/"
                    }
                }
            ]
        },{
            "attack": 32,
            "hp": 301,
            "spriteCard": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/202.png",
            "spriteOnBoard": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/202.png",
            "name": "wobbuffet",
            "types": [
                {
                    "slot": 1,
                    "type": {
                        "name": "psychic",
                        "url": "https://pokeapi.co/api/v2/type/14/"
                    }
                }
            ]
        },{
            "attack": 103,
            "hp": 351,
            "spriteCard": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/135.png",
            "spriteOnBoard": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/135.png",
            "name": "jolteon",
            "types": [
                {
                    "slot": 1,
                    "type": {
                        "name": "electric",
                        "url": "https://pokeapi.co/api/v2/type/13/"
                    }
                }
            ]
        },{
            "attack": 34,
            "hp": 69,
            "spriteCard": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/175.png",
            "spriteOnBoard": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/175.png",
            "name": "togepi",
            "types": [
                {
                    "slot": 1,
                    "type": {
                        "name": "fairy",
                        "url": "https://pokeapi.co/api/v2/type/18/"
                    }
                }
            ]
        },{
            "attack": 96,
            "hp": 221,
            "spriteCard": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/107.png",
            "spriteOnBoard": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/107.png",
            "name": "hitmonchan",
            "types": [
                {
                    "slot": 1,
                    "type": {
                        "name": "fighting",
                        "url": "https://pokeapi.co/api/v2/type/2/"
                    }
                }
            ]
        },{
            "attack": 51,
            "hp": 163,
            "spriteCard": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/17.png",
            "spriteOnBoard": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/17.png",
            "name": "pidgeotto",
            "types": [
                {
                    "slot": 1,
                    "type": {
                        "name": "normal",
                        "url": "https://pokeapi.co/api/v2/type/1/"
                    }
                },
                {
                    "slot": 2,
                    "type": {
                        "name": "flying",
                        "url": "https://pokeapi.co/api/v2/type/3/"
                    }
                }
            ]
        },{
            "attack": 87,
            "hp": 289,
            "spriteCard": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/78.png",
            "spriteOnBoard": "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/78.png",
            "name": "rapidash",
            "types": [
                {
                    "slot": 1,
                    "type": {
                        "name": "fire",
                        "url": "https://pokeapi.co/api/v2/type/10/"
                    }
                }
            ]
        }]
    }
}