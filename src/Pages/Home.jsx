import { useNavigate } from 'react-router-dom';


export default function Home(){
  const navigate = useNavigate();

  const redirectDeck = ()=>{
    navigate('/deck')
  }
    return (
      <div className='flex justify-around '>
        <button onClick={()=>{navigate('/play')}}>Play</button>
        <button onClick={redirectDeck}>Decks</button>
      </div>
    )
}
