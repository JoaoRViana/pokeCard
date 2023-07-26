import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import RandomPokemon from './Pages/RandomPokemon';
import Deck from './Pages/Deck';
import SetGame from './Pages/SetGame';
import SinglePlayer from './Pages/SinglePlayer';

function App() {
  return (
    <div >
            <Routes>
            <Route exact path='/' element= {<Home/>}/>
            <Route path='/random' element= {<RandomPokemon/>}/>
            <Route path ='/deck' element ={<Deck/>}/>
            <Route path ='/play' element={<SetGame/>}></Route>
            <Route path ='/singlePlayer' element={<SinglePlayer/>}></Route>
        </Routes>
    </div>
  );
}

export default App;
