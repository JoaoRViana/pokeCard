import { shuffle } from "./helpers"
import { TCard } from "../types"


export default class Cards {
    public allCards:[]
    public cardsOnHand:TCard[]
    public buy:boolean

    constructor(allCards:[]){
        this.allCards = allCards
        this.cardsOnHand = []
        this.buy = true
    }
    randomizeCards():void{
        const randomize = shuffle(this.allCards);
        this.allCards = randomize
    }
    buyCard():void{
        const cards = this.allCards
        if(cards.length>0){
            const card = [...cards][0]
            this.cardsOnHand.push(card)
            this.allCards.shift()
        }
    }
    initialGame():void{
        this.randomizeCards()
        this.buyCard();
        this.buyCard();
        this.buyCard();
    }
    summonCard(card:TCard):void{
        const newCards = this.cardsOnHand.filter((e)=>(e.name !== card.name))
        this.cardsOnHand = newCards
    }
}