import './App.css';
import Opening from './components/Opening';
import './bootstrap.min.css';
import { Route, Routes } from 'react-router-dom';
import Mainpage from './components/Mainpage';
import Score from './components/Score';


function App() {
  return (
    <div>
      
      <Routes>
       <Route path='/' element={<Opening/>}></Route>
       <Route path='/quiz' element={<Mainpage/>}></Route>
       <Route path='/score' element={<Score/>}></Route>
      </Routes>
      
    </div>
  );
}

function ScoreLayout() {
  return (
    <div>
      <Route path='/' element={<Score />} />
    </div>
  );
}
export default App;
