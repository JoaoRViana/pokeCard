import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import RandomPokemon from './Pages/RandomPokemon';
import Deck from './Pages/Deck';

function App() {
  return (
    <div >
            <Routes>
            <Route exact path='/' element= {<Home/>}/>
            <Route path='/random' element= {<RandomPokemon/>}/>
            <Route path ='/deck' element ={<Deck/>}/>
        </Routes>
    </div>
  );
}

export default App;
