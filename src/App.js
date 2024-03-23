import { BrowserRouter, Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import './App.css';
import Navbarcom from './Component/Navbar';
import Login from './Login';
import Home from './Pages/home';
import Register from './Register';

function App() {
  return (
    <>
      <Navbarcom />
      <Login/>
      <BrowserRouter>
      <main>
        <Switch>
          <Route path='/' component={Home} exact/>
          <Route path='daftar' component={Register} exact/>
          <Route path='masuk' component={Login} exact/>
          <Route path='/' component={Home} exact/>
          <Route path='/' component={Home} exact/>
          <Route path='/' component={Home} exact/>
        </Switch>
      </main>
      </BrowserRouter>
    </>
  );
}

export default App;
