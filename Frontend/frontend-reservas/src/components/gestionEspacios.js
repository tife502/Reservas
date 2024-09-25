import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../estilos/gestionEspacios.css';
import { useNavigate } from 'react-router-dom';

const GestionEspacios = () => {
    const [espacios, setEspacios] = useState([]);
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [capacidad, setCapacidad] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [editarId, setEditarId] = useState(null);
    
    const navigate = useNavigate();

    useEffect(() => {
        obtenerEspacios();
    }, []);

    const obtenerEspacios = async () => {
        try {
            const respuesta = await axios.get('http://localhost:8080/api/espacios');
            setEspacios(respuesta.data);
        } catch (error) {
            console.error("Error al obtener los espacios:", error);
            setMensaje("Error al obtener los espacios.");
        }
    };

    const crearEspacio = async () => {
        try {
            await axios.post('http://localhost:8080/api/espacios', { nombre, descripcion, capacidad });
            setMensaje("Espacio creado con éxito.");
            resetForm();
            obtenerEspacios();
        } catch (error) {
            console.error("Error al crear el espacio:", error);
            setMensaje("Error al crear el espacio.");
        }
    };

    const editarEspacio = async () => {
        try {
            await axios.put(`http://localhost:8080/api/espacios/${editarId}`, { nombre, descripcion, capacidad });
            setMensaje("Espacio editado con éxito.");
            resetForm();
            obtenerEspacios();
            setEditarId(null);
        } catch (error) {
            console.error("Error al editar el espacio:", error);
            setMensaje("Error al editar el espacio.");
        }
    };

    const eliminarEspacio = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/espacios/${id}`);
            setMensaje("Espacio eliminado con éxito.");
            obtenerEspacios();
        } catch (error) {
            console.error("Error al eliminar el espacio:", error);
            setMensaje("Error al eliminar el espacio.");
        }
    };

    const resetForm = () => {
        setNombre('');
        setDescripcion('');
        setCapacidad('');
    };

    const manejarEdicion = (espacio) => {
        setNombre(espacio.nombre);
        setDescripcion(espacio.descripcion);
        setCapacidad(espacio.capacidad);
        setEditarId(espacio.id);
    };

    const irareservar  = () => {
        navigate("/reserva-espacio")
    }

    return (
        <div className="gestion-espacios">
            <button className='boton-rojo' onClick={irareservar}>Atras</button>
            <h1>Gestión de Espacios</h1>
            {mensaje && <p className="mensaje">{mensaje}</p>}
            <input
                type="text"
                placeholder="Nombre del espacio"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
            />
            <input
                type="text"
                placeholder="Descripción"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                required
            />
            <input
                type="number"
                placeholder="Capacidad"
                value={capacidad}
                onChange={(e) => setCapacidad(e.target.value)}
                required
            />
            {editarId ? (
                <button className='boton-azul' onClick={editarEspacio}>Actualizar</button>
            ) : (
                <button className='boton-verde' onClick={crearEspacio}>Crear</button>
            )}
            <h2>Lista de Espacios</h2>
            <ul>
                {espacios.map((espacio) => (
                    <li key={espacio.id}>
                        <h3>{espacio.nombre}</h3>
                        <p>{espacio.descripcion}</p>
                        <p>Capacidad: {espacio.capacidad}</p>
                        <button className='boton-azul' onClick={() => manejarEdicion(espacio)}>Editar</button>
                        <button className='boton-rojo' onClick={() => eliminarEspacio(espacio.id)}>Eliminar</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default GestionEspacios;
