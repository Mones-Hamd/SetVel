
import './App.css';
import Signin from './Pages/Signin';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import SignUp from './Pages/Signup';

const App=()=> {
  return (
   <>
   <Router>
    <Routes>
    <Route path="/signin" element={<Signin />} />
    <Route path="/signup" element={<SignUp />} />
   </Routes>
   </Router>
   </>
  );
}

export default App;
