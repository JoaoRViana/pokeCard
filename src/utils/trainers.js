
const trainers =[{
    name:'Red',
    image:'bg-[url(./assets/redImg.jpg)]',
    cards:[{
    attack: 93,
    hp: 383,
    name: "charizard",
    spriteCard: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png",
    spriteOnBoard: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/6.png",
    types:[{type:{name:'fire'}},{type:{name:'flying'}}]
},{
    attack: 82,
    hp: 372,
    spriteCard: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png",
    spriteOnBoard: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/3.png",
    name: "venusaur",
    types: [{type: {name: "grass",}},{type: {name: "poison",}}]
},
{
    attack: 78,
    hp: 292,
    spriteCard: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/9.png",
    spriteOnBoard: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/9.png",
    name: "blastoise",
    types: [
        {
            type: {
                name: "water",

            }
        }
    ]
},
{
    attack: 46,
    hp: 93,
    spriteCard: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png",
    spriteOnBoard: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/25.png",
    name: "pikachu",
    types: [
        {
            type: {
                name: "electric",
            }
        }
    ]
},{
    attack: 39,
    hp: 592,
    spriteCard: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/143.png",
    spriteOnBoard: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/143.png",
    name: "snorlax",
    types: [
        {
            type: {
                name: "normal",
                url: "https://pokeapi.co/api/v2/type/1/"
            }
        }
    ]
}
],
min:1,
max:151,
},{
    name:'Random',
    image:'bg-[url(./assets/randomTrainer.jpg)]',
    min:1,
    max:649,
}]


export {
    trainers,
}