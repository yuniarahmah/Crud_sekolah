import { BrowserRouter, Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import './App.css';
import Navbarcom from './Component/Navbar';
import Login from './Login';
import Home from './Pages/home';
import Register from './Register';
import Dashboard from './Pages/Dashboard';
import Data_siswa from './Pages/Data_siswa';
import Data_guru from './Pages/Data_guru';
import Data_mapel from './Pages/Data_mapel';
import Data_kelas from './Pages/Data_kelas';
import PrivateRoute from './Component/private';

function App() {
  return (
    <>
    {/* <Home/> */}
      <Navbarcom />
      <BrowserRouter>
      <main>
        <Switch>
          <Route path='/' component={Home} exact/>
          <Route path='/daftar' component={Register} exact/>
          <Route path='/login' component={Login} exact/>
          <PrivateRoute path='/dashboard' component={Dashboard} exact/>
          <PrivateRoute path='/siswa' component={Data_siswa} exact/>
          <PrivateRoute path='/guru' component={Data_guru} exact/>
          <PrivateRoute path='/kelas' component={Data_kelas} exact/>
          <PrivateRoute path='/mapel' component={Data_mapel} exact/>
        </Switch>
      </main>
      </BrowserRouter>
    </>
  );
}

export default App;
