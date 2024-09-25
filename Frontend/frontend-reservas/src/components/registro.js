import React, { useState } from 'react';
import axios from 'axios';
import '../estilos/registro.css'
import { useNavigate } from 'react-router-dom';

function Registro() {
    const [nombre, setNombre] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const registrarUsuario = () => {
        axios.post('http://localhost:8080/api/usuarios/registrar', {
            nombre: nombre,
            email: email,
            password: password
        })
            .then(response => {
                alert("Usuario registrado con éxito");
            })
            .catch(error => {
                console.error("Error al registrar el usuario:", error);
            });
    };

    const irALogin = () => {
        navigate('/login');
    };

    return (
        <div className="Registro">
            <h1>Registro</h1>
            <input
                type="text"
                placeholder="Nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
            />
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Contraseña"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button className="boton-verde" onClick={registrarUsuario}>Registrar</button>
            <button className="boton-azul" onClick={irALogin}>Volver</button>           
        </div>
    );
}

export default Registro;
