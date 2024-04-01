import { BrowserRouter, Route, Switch } from 'react-router-dom/cjs/react-router-dom.min';
import './App.css';
import Navbarcom from './Component/Navbar';
import Home from './Pages/home';
import Dashboard from './Pages/Dashboard';
import Data_siswa from './Pages/Data_siswa';
import Data_guru from './Pages/Data_guru';
import Data_mapel from './Pages/Data_mapel';
import Data_kelas from './Pages/Data_kelas';
// import Route from './Component/private';
import Register from './Auth/Register';
import Login from './Auth/Login';
import UpdateItemForm from './File Update/updateS';
import TambahSiswa from './File Tambah/TambahS';
import TambahMapel from './File Tambah/TambahM';
import TambahGuru from './File Tambah/TambahG';
import UpdateGuru from './File Update/UpdateG';
import UpdateMapel from './File Update/UpdateM';
import TambahKelas from './File Tambah/TambahK';
import UpdateKelas from './File Update/UpdateK';

function App() {
  return (
    <>
    {/* <Up/> */}
    
      <BrowserRouter>
      <main>
        <Switch>
          <Route path='/' component={Home} exact/>
          <Route path='/daftar' component={Register} exact/>
          <Route path='/login' component={Login} exact/>
          <Route path='/dashboard' component={Dashboard} exact/>
          <Route path='/siswa' component={Data_siswa} exact/>
          <Route path='/guru' component={Data_guru} exact/>
          <Route path='/kelas' component={Data_kelas} exact/>
          <Route path='/mapel' component={Data_mapel} exact/>
          <Route path='/data_siswa/:id' component={UpdateItemForm} exact/>
          <Route path='/update_mapel/:id' component={UpdateMapel} exact/>
          <Route path='/update_guru/:id' component={UpdateGuru} exact/>
          <Route path='/update_kelas/:id' component={UpdateKelas} exact/>
          <Route path='/tambah_siswa' component={TambahSiswa} exact/>
          <Route path='/tambah_mapel' component={TambahMapel} exact/>
          <Route path='/tambah_guru' component={TambahGuru} exact/>
          <Route path='/tambahkelas' component={TambahKelas} exact/>
        </Switch>
      </main>
      </BrowserRouter>
    </>
  );
}

export default App;
