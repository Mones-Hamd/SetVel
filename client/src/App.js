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
import AddContact from './Pages/AddContact';
import { ContactsProvider } from './context/Contactcontext';

const App = () => {
  return (
    <>
      <AuthContextProvider>
        <ContactsProvider>
          <Router>
            <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/home" element={<Home />} />
              <Route path='/home/contact/:id' element={<AddContact />} />
              <Route path="/add" element={<AddContact />} />
            </Routes>
          </Router>
        </ContactsProvider>
      </AuthContextProvider>
    </>
  );
};

export default App;
