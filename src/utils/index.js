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
    return JSON.parse(localStorage.getItem('deckPokemon')) ||[];;
}