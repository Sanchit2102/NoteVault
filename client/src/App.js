import './App.css';
import Header from './components/Header';
import {Routes,Route} from "react-router-dom"
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import {Toaster} from "react-hot-toast"

function App() {
  return (
   <>  <Header/>
   <Toaster
    autoClose={3000}
   />
   <Routes>
   <Route  exact path="/" element={<Home/>}
        />   
     <Route exact path="/login" element={<Login/>}/>
     <Route exact path="/signup" element={<Signup/>}/>
   </Routes>
   
   </>
  );
}

export default App;
