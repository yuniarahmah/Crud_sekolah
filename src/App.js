import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthProvider } from "./Auth/AuthProvider";
import Home from "./Pages/home";
import Login from "./Auth/Login";
import Register from "./Auth/Register";
import Dashboard from "./Pages/Dashboard";
import Data_siswa from "./Pages/Data_siswa";
import Data_guru from "./Pages/Data_guru";
import Data_mapel from "./Pages/Data_mapel";
import Data_kelas from "./Pages/Data_kelas";
import UpdateItemForm from "./File Update/updateS";
import TambahSiswa from "./File Tambah/TambahS";
import TambahMapel from "./File Tambah/TambahM";
import TambahGuru from "./File Tambah/TambahG";
import UpdateGuru from "./File Update/UpdateG";
import UpdateMapel from "./File Update/UpdateM";
import TambahKelas from "./File Tambah/TambahK";
import UpdateKelas from "./File Update/UpdateK";
import ProtectedRoute from "./Auth/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login" component={Login} />
          <Route path="/daftar" component={Register} />
          {/* <Route path="/dashboard" component={Dashboard} /> */}
          <Route path="/siswa" component={Data_siswa}/>
          <Route path="/guru" component={Data_guru}/>
          <Route path="/kelas" component={Data_kelas}/>
          <Route path="/mapel" component={Data_mapel}/>
          <Route path="/data_siswa/:id" component={UpdateItemForm}/>
          <Route path="/update_mapel/:id" component={UpdateMapel}/>
          <Route path="/update_guru/:id" component={UpdateGuru}/>
          <Route path="/update_kelas/:id" component={UpdateKelas}/>
          <Route path="/tambah_siswa" component={TambahSiswa}/>
          <Route path="/tambah_mapel" component={TambahMapel}/>
          <Route path="/tambah_guru" component={TambahGuru}/>
          <Route path="/tambahkelas" component={TambahKelas}/>
        </Switch>
      </Router>
    </AuthProvider>
  );
}

export default App;
