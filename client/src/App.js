
import './App.css';
import SignIn from './Pages/Signin';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import SignUp from './Pages/Signup';
import { AuthContextProvider } from './context/AuthContext';
import Home from './Pages/Home';

const App=()=> {
  return (
   <>
   <AuthContextProvider >
   <Router>
    
    <Routes>
    <Route path="/signin" element={<SignIn />} />
    <Route path="/signup" element={<SignUp />} />
    <Route path="/home" element={<Home />} />
   </Routes>
   </Router>
   </AuthContextProvider>
   </>
  );
}

export default App;
