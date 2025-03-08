import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

function createData(nombre, apellido, edad) {
  return { nombre, apellido, edad };
}

const rows = [
  createData("Sergio", "Lopez", 19),
  createData("Paulina", "Zamora", 22),
  createData("Gabriel", "Alarcon", 26),
  createData("Jose", "Rodriguez", 20),
  createData("Maria", "Ayala", 19),
];

function App() {
  const [count, setCount] = useState(0);
  const [users, setUsers] = useState([]); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    if (count > 10) {
      alert("El contador no puede superar 10");
      setCount(10);
    }
  }, [count]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>count is {count}</button>
        <button onClick={() => setCount(0)}>Resetear</button>
      </div>

     
      <h2>Lista de Datos Estáticos</h2>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell align="right">Apellido</TableCell>
              <TableCell align="right">Edad</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.nombre} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row">{row.nombre}</TableCell>
                <TableCell align="right">{row.apellido}</TableCell>
                <TableCell align="right">{row.edad}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      
      <h2>Lista de Usuarios (API)</h2>

      {loading && <p>Cargando usuarios...</p>}
      {error && <p>Error: {error}</p>}

      {!loading && !error && (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell align="right">Usuario</TableCell>
                <TableCell align="right">Email</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell align="right">{user.username}</TableCell>
                  <TableCell align="right">{user.email}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      <p className="read-the-docs">Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;
