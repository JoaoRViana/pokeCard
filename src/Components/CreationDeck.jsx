import { Component } from "react"
import RenderCard from "./RenderCard"
import RenderPokemon from "./RenderPokemon"

export default  class CreationDeck extends Component{
    render(){
        const {deckName,changeDeckName,removeCardOnDeck,deckSelected,cardsFiltred,addCardOnDeck,deleteCard,addDeck,disabled,nextOrPreviousCard,index} = this.props
        return(
            <div className='flex justify-around flex-wrap '>
            <div id="yourCards" className={`w-[340px] flex justify-around flex-wrap b py-2 py-2 mb-5 ${deckSelected.length===6?'h-[610px]':'h-[450px]'} `}>
            {deckSelected.length===6?
            <div className='flex flex-wrap justify-center w-44 w-full h-40'>
                <div className='flex flex-wrap justify-center w-20 '>
                <input className='mx-auto h-10 text-center rounded styledText text-sm' onChange={changeDeckName} value={deckName} placeholder='Nome do Deck'></input>
                <button className='mx-auto h-10 text-xl styledText bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded mx-auto disabled:opacity-50' onClick={addDeck} disabled={disabled}>Finalizar</button>
                </div>
            </div>:
            <div className="flex flex-wrap justify-between w-full px-2 my-2 ">
                <h1 className='styledText'>Your Deck</h1>
                <h1 className="styledText">Left Cards: {6- deckSelected.length}</h1>
                </div>}
            {deckSelected.length>0? <div className='flex flex-wrap justify-center'>
          
                        <div>
                        <button value={index} onClick={removeCardOnDeck} className='styledText bg-red-600 rounded w-8 hover:brightness-200'>X</button>
                     <RenderPokemon pokemon={deckSelected[index]}/>
                        </div> 
                        <div className="flex justify-between flex-wrap px-2 absolute mt-[385px] w-[308px] ">
                        <button className="styledText text-2xl hover:scale-110" onClick={nextOrPreviousCard} value={-1}>{'<='}</button>
                        <button className="styledText text-2xl hover:scale-110" onClick={nextOrPreviousCard} value={1}>{'=>'}</button>
                     </div>
                    </div>:''}
            </div>
            {deckSelected.length ===6?'':<div className='w-1/2 flex justify-around flex-wrap h-fit'>
            <h1 className='w-full  text-xl styledText text-center'>Your Cards</h1>

            {cardsFiltred.map((e,i)=>(
                    <div key={`${e.name}${i}Cards`} className='m-10'>
                        <button  onClick={()=>{addCardOnDeck(e)}} className='absolute  mt-1 w-8 h-8 z-10 text-sm bg-blue-500  hover:bg-blue-400 text-white font-bold py-1 px-1 border-s-4 border-red-800 rounded-tl-3xl rounded-br-3xl '>+</button>
                        <button  onClick={()=>{deleteCard(e)}} className='absolute ml-[218px] mt-[314px] w-8 h-8 z-10 text-sm bg-red-500  hover:bg-red-400 text-white font-bold py-1 px-1 border-e-4 border-red-800 rounded-tl-3xl rounded-br-3xl '>x</button>
                        <RenderCard pokemon={e}/>
        </div>
            ))}
            </div>}
          </div>
        )
    }
    
}