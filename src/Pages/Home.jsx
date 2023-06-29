import { useNavigate } from 'react-router-dom';


export default function Home(){
  const navigate = useNavigate();

  const redirectRandomizer = ()=>{
    navigate('/random')
  }
  const redirectDeck = ()=>{
    navigate('/deck')
  }
    return (
      <div className='flex justify-around '>
        <button onClick={redirectRandomizer}>Gerar Carta</button>
        <button onClick={redirectDeck}>Decks</button>
      </div>
    )
}
