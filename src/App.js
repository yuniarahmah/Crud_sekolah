import React from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import Home from "./Pages/home";
import register from "./Auth/Register";
import Login from "./Auth/Login";
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
import PrivateRoute from "./Component/private";
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/login" component={Login} />{" "}
        <Route path="/daftar" component={register} />
        {/* Corrected path for login */}
        <PrivateRoute path="/siswa" component={Data_siswa} />
        <PrivateRoute path="/guru" component={Data_guru} />
        <PrivateRoute path="/kelas" component={Data_kelas} />
        <PrivateRoute path="/mapel" component={Data_mapel} />
        <PrivateRoute path="/data_siswa/:id" component={UpdateItemForm} />
        <PrivateRoute path="/update_mapel/:id" component={UpdateMapel} />
        <PrivateRoute path="/update_guru/:id" component={UpdateGuru} />
        <PrivateRoute path="/update_kelas/:id" component={UpdateKelas} />
        <PrivateRoute path="/tambah_siswa" component={TambahSiswa} />
        <PrivateRoute path="/tambah_mapel" component={TambahMapel} />
        <PrivateRoute path="/tambah_guru" component={TambahGuru} />
        <PrivateRoute path="/tambahkelas" component={TambahKelas} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
