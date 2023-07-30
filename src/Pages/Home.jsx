import { useNavigate } from 'react-router-dom';


export default function Home(){
  const navigate = useNavigate();

  const redirectDeck = ()=>{
    navigate('/deck')
  }
    return (
      <div className='flex justify-center content-center h-screen'>
        <div className='my-60 inline flex flex-wrap  w-44 justify-center h-44'>
        <button onClick={()=>{navigate('/play')}} className=' my-10 text-2xl styledText bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded'>Play</button>
        <button onClick={redirectDeck} className='text-2xl styledText bg-green-500 hover:bg-green-400 text-white font-bold py-2 px-4 border-b-4 border-green-700 hover:border-green-500 rounded'>Decks</button>
        </div>
        </div>
    )
}
