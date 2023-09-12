import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import RandomPokemon from './Pages/RewardsPokemon';
import Deck from './Pages/Deck';
import SetGame from './Pages/SetGame';
import SinglePlayerMenu from './Pages/SinglePlayerMenu';
import LooseBattle from './Pages/LooseBattle';
import MultiPlayerMenu from './Pages/MultiPlayerMenu';

function App() {
  return (
    <div className='bg-stone-300 min-h-screen h-full'>
          <Routes>
            <Route exact path='/' element= {<Home/>}/>
            <Route path='/random' element= {<RandomPokemon/>}/>
            <Route path ='/deck' element ={<Deck/>}/>
            <Route path ='/play' element={<SetGame/>}></Route>
            <Route path ='/singlePlayer' element={<SinglePlayerMenu/>}></Route>
            <Route path='multiPlayer' element={<MultiPlayerMenu/>}></Route>
            <Route path ='/loose' element={<LooseBattle/>}></Route>
        </Routes>
    </div>
  );
}

export default App;
