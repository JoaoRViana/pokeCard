export type TPokemon ={
    name:string,
    hp:number,
    attack:number,
    spriteOnBoard:string,
    spriteCard:string,
    pokeNum:number,
    types:Types[]
}
export type TCard = {
    name:string,
    hp:number,
    attack:number,
    spriteOnBoard:string,
    spriteCard:string,
    types:Types[]
}
export type TDeck ={
    id:number,
    cards:TCard[],
    name:string,
}
export type Types = {
    type:{name:string}
}