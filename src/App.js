import {Route, Routes} from 'react-router-dom'
import './App.css';
import SingUp from "./singUp"
import Chat from "./chat"
import {SignIn} from "./singIn"
import {UserProvider} from "./authContext"


export default function App() {
  return (
      <UserProvider>
        <Routes>
        <Route path='/' element={<SignIn />}/>
          <Route path='/singin' element={<SignIn />}/>
          <Route path='/singup' element={<SingUp />}/>
          <Route path='/chat' element={<Chat />}/>
        </Routes>
      </UserProvider>
  );
}

