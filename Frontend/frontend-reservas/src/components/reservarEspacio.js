import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../estilos/reservarEspacio.css';
import { useUser } from '../context/userContext';
import { useNavigate } from 'react-router-dom';

const ReservarEspacio = () => {
    const { userId } = useUser();
    const [espacios, setEspacios] = useState([]);
    const [espacioId, setEspacioId] = useState('');
    const [fecha, setFecha] = useState('');
    const [horaInicio, setHoraInicio] = useState('');
    const [horaFin, setHoraFin] = useState('');
    const [mensaje, setMensaje] = useState('');
    const [reservasOcupadas, setReservasOcupadas] = useState([]);
    const [reservasCreadas, setReservasCreadas] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        obtenerEspacios();
        obtenerReservasCreadas();
    }, []);

    useEffect(() => {
        if (espacioId && fecha) {
            obtenerReservasOcupadas();
        }
    }, [espacioId, fecha]);

    const obtenerEspacios = async () => {
        setLoading(true);
        try {
            const respuesta = await axios.get('http://localhost:8080/api/espacios/disponibles');
            if (Array.isArray(respuesta.data)) {
                setEspacios(respuesta.data);
            } else {
                setMensaje("Error al obtener los espacios.");
            }
        } catch (error) {
            setMensaje("Error al obtener los espacios.");
        } finally {
            setLoading(false);
        }
    };

    const obtenerReservasOcupadas = async () => {
        try {
            const respuesta = await axios.get(`http://localhost:8080/api/reservas/ocupadas`, {
                params: { espacioId, fecha }
            });
            setReservasOcupadas(respuesta.data);
        } catch (error) {
            console.error("Error al obtener reservas ocupadas:", error);
            setMensaje("Error al obtener las reservas ocupadas.");
        }
    };

    const obtenerReservasCreadas = async () => {
        try {
            const respuesta = await axios.get('http://localhost:8080/api/reservas');
            setReservasCreadas(respuesta.data);
        } catch (error) {
            console.error("Error al obtener reservas creadas:", error);
            setMensaje("Error al obtener las reservas creadas.");
        }
    };

    const validarDisponibilidad = async () => {
        try {
            const respuesta = await axios.get(`http://localhost:8080/api/reservas/disponibilidad`, {
                params: { espacioId, fecha, horaInicio, horaFin }
            });
            return respuesta.data.disponible;
        } catch (error) {
            console.error("Error al validar disponibilidad:", error);
            setMensaje("Error al verificar la disponibilidad.");
            return false;
        }
    };

    const validateDateTime = () => {
        const now = new Date();
        const selectedDateTimeInicio = new Date(`${fecha}T${horaInicio}`);
        const selectedDateTimeFin = new Date(`${fecha}T${horaFin}`);

        if (selectedDateTimeInicio <= now) {
            setMensaje("La fecha y hora de inicio debe ser en el futuro.");
            return false;
        }
        if (selectedDateTimeFin <= selectedDateTimeInicio) {
            setMensaje("La hora de fin debe ser después de la hora de inicio.");
            return false;
        }
        return true;
    };

    const crearReserva = async () => {
        if (!userId || !espacioId || !fecha || !horaInicio || !horaFin) {
            setMensaje("Todos los campos son obligatorios.");
            return;
        }

        if (!validateDateTime()) return;

        const disponible = await validarDisponibilidad();
        if (!disponible) {
            setMensaje("El espacio no está disponible en ese horario.");
            return;
        }

        try {
            const reserva = await axios.post('http://localhost:8080/api/reservas', null, {
                params: {
                    usuarioId: userId,
                    espacioId,
                    fecha,
                    horaInicio,
                    horaFin,
                },
            });
            setMensaje("Reserva realizada con éxito.");
            setReservasCreadas(prev => [...prev, reserva.data]);
            resetForm();
        } catch (error) {
            console.error("Error al realizar la reserva:", error);
            setMensaje(error.response?.data?.message || "Error al realizar la reserva.");
        }
    };

    const resetForm = () => {
        setEspacioId('');
        setFecha('');
        setHoraInicio('');
        setHoraFin('');
        setReservasOcupadas([]);
    };

    const irAGestionEspacios = () => {
        navigate('/gestion-espacio');
    };

    return (
        <div className="reservar-espacio">
            <h1>Reservar Espacio</h1>

            <button className="boton-volver" onClick={irAGestionEspacios}>Gestionar Espacios</button>

            {mensaje && <p className="mensaje">{mensaje}</p>}

            <div className="formulario-reserva">
                <select value={espacioId} onChange={(e) => setEspacioId(e.target.value)}>
                    <option value="">Selecciona un espacio</option>
                    {espacios.map((espacio) => (
                        <option key={espacio.id} value={espacio.id}>{espacio.nombre}</option>
                    ))}
                </select>
                <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
                <input type="time" value={horaInicio} onChange={(e) => setHoraInicio(e.target.value)} />
                <input type="time" value={horaFin} onChange={(e) => setHoraFin(e.target.value)} />
                <button onClick={crearReserva} disabled={loading}>Reservar</button>
            </div>

            <div className="reservas-creadas">
                <h2>Reservas Creadas</h2>
                <ul>
                    {reservasCreadas.map((reserva) => (
                        <li key={reserva.id} className="reserva-item">
                            <span>{`Fecha: ${reserva.fecha}`}</span>
                            <span>{`Espacio: ${reserva.espacio.nombre}`}</span>
                            <span>{`Hora: ${reserva.horaInicio} - ${reserva.horaFin}`}</span>
                        </li>
                    ))}
                </ul>
            </div>

            {reservasOcupadas.length > 0 && (
                <div className="reservas-ocupadas">
                    <h2>Fechas y Horas Ocupadas</h2>
                    <ul>
                        {reservasOcupadas.map((reserva) => (
                            <li key={reserva.id} className="reserva-item-ocupada">
                                <span>{`Fecha: ${reserva.fecha}`}</span>
                                <span>{`Hora: ${reserva.horaInicio} - ${reserva.horaFin}`}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ReservarEspacio;
