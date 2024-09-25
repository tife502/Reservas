import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../estilos/login.css'
import { useUser } from '../context/userContext';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { setUserId } = useUser();
    const navigate = useNavigate();

    const loginUsuario = () => {
        axios.post('http://localhost:8080/api/usuarios/login', {
            email: email,
            password: password
        })
            .then(response => {
                setUserId(response.data.userId);
                navigate('/reserva-espacio');
            })
            .catch(error => {
                if (error.response && error.response.status === 401) {
                    alert("Contraseña incorrecta");
                } else if (error.response && error.response.status === 404) {
                    alert("Usuario no encontrado");
                }
            });
    };

    const irARegistro = () => {
        navigate('/registro');
    };

    return (
        <div className="Login">
            <h1>Login</h1>
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
            <button onClick={loginUsuario}>Iniciar sesión</button>
            <button onClick={irARegistro}>Crear cuenta</button>
        </div>
    );
}

export default Login;
