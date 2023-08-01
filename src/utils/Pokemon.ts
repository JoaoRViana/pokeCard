import { getWeakness } from ".";
import { weakness } from "./Weakness";
import { resitances } from "./Weakness";

export default class Pokemon {
    public name:string;
    public hp:number;
    public attack:number;
    public types:{};
    public spriteCard:string;
    public spriteOnBoard:string;
    public attacked:boolean;
    public pokeNum:number;
    constructor(name:string,hp:number,attack:number,types:{},spriteCard:string,spriteOnBoard:string,pokeNum:number){
        this.attack =attack;
        this.hp = hp;
        this.name = name;
        this.spriteCard = spriteCard;
        this.spriteOnBoard = spriteOnBoard;
        this.types = types;
        this.attacked = true;
        this.pokeNum = pokeNum
    }
    receiveDamage(attack:number):void{
        this.hp = Math.floor(this.hp-attack)
    }
    turnAttacked(bool:boolean):void{
        this.attacked = bool;
    }
    damageMultiplier(attackType:string):number{
        const weak = getWeakness(this.types,attackType,weakness)
        const resis = getWeakness(this.types,attackType,resitances)
        return ((weak.length >0?(weak.length)*2:1))/(resis.length >0?(resis.length)*2:1)
    }
}