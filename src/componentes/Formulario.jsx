import React, { useState, useEffect } from 'react';
import './estilo/Styles.css';
import doctor1 from '../imagenes/doctor1.jpg';
import doctor2 from '../imagenes/doctor2.jpg';
import doctor3 from '../imagenes/doctor3.jpg';

function Formulario() {
  const [nombre, setNombre] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [genero, setGenero] = useState('');
  const [contacto, setContacto] = useState('');
  const [tipoCita, setTipoCita] = useState('');
  const [doctor, setDoctor] = useState('');
  const [fechaHora, setFechaHora] = useState('');
  const [citaSolicitada, setCitaSolicitada] = useState(false);

  useEffect(() => {
    // Obtener los datos de la cita médica desde localStorage
    const citaGuardada = localStorage.getItem('citaMedica');

    if (citaGuardada) {
      const {
        nombreGuardado,
        fechaNacimientoGuardada,
        generoGuardado,
        contactoGuardado,
        tipoCitaGuardada,
        doctorGuardado,
        fechaHoraGuardada
      } = JSON.parse(citaGuardada);

      // Restaurar los valores de los campos
      setNombre(nombreGuardado);
      setFechaNacimiento(fechaNacimientoGuardada);
      setGenero(generoGuardado);
      setContacto(contactoGuardado);
      setTipoCita(tipoCitaGuardada);
      setDoctor(doctorGuardado);
      setFechaHora(fechaHoraGuardada);
    }
  }, []);

  useEffect(() => {
    // Guardar los datos de la cita médica en localStorage
    const citaMedica = {
      nombreGuardado: nombre,
      fechaNacimientoGuardada: fechaNacimiento,
      generoGuardado: genero,
      contactoGuardado: contacto,
      tipoCitaGuardada: tipoCita,
      doctorGuardado: doctor,
      fechaHoraGuardada: fechaHora
    };

    localStorage.setItem('citaMedica', JSON.stringify(citaMedica));
  }, [nombre, fechaNacimiento, genero, contacto, tipoCita, doctor, fechaHora]);

  const handleSubmit = (event) => {
    event.preventDefault();
    

    // Validación de campos
    const erroresValidacion = {};
    if (!nombre) {
      erroresValidacion.nombre = 'Ingrese su nombre';
    }
    if (!fechaNacimiento) {
      erroresValidacion.fechaNacimiento = 'Ingrese su fecha de nacimiento';
    }
    if (!genero) {
      erroresValidacion.genero = 'Seleccione su género';
    }
    if (!contacto) {
      erroresValidacion.contacto = 'Ingrese sus detalles de contacto';
    }
    if (!tipoCita) {
      erroresValidacion.tipoCita = 'Seleccione el tipo de cita';
    }
    if (!doctor) {
      erroresValidacion.doctor = 'Seleccione el médico o especialista';
    }
    if (!fechaHora) {
      erroresValidacion.fechaHora = 'Seleccione la fecha y hora';
    }

    if (Object.keys(erroresValidacion).length > 0) {
      // Mostrar ventana emergente con el mensaje de error
      let mensajeError = '';
      Object.values(erroresValidacion).forEach((error) => {
        mensajeError += error + '\n';
      });
      window.alert(mensajeError);
      return;
    }

    // Lógica para mostrar la vista previa de la cita en una ventana emergente
    const vistaPrevia = `
      <h2>Vista Previa de la Cita</h2>
      <p><strong>Nombre:</strong> ${nombre}</p>
      <p><strong>Fecha de Nacimiento:</strong> ${fechaNacimiento}</p>
      <p><strong>Género:</strong> ${genero}</p>
      <p><strong>Contacto:</strong> ${contacto}</p>
      <p><strong>Tipo de Cita:</strong> ${tipoCita}</p>
      <p><strong>Doctor o Especialista:</strong> ${doctor}</p>
      <p><strong>Fecha y Hora:</strong> ${fechaHora}</p>
      <button onclick="enviarCita()">Confirmar Cita</button>
    `;
    const ventanaEmergente = window.open('', '_blank', 'width=300,height=600');
    ventanaEmergente.document.write(vistaPrevia);
    ventanaEmergente.enviarCita = () => {
      // Lógica para enviar la solicitud de cita médica
      // Aquí puedes realizar una solicitud a la API, enviar un correo electrónico, etc.

      // Mostrar mensaje de éxito
      setCitaSolicitada(true);
      ventanaEmergente.close();
    };
  };

  return (
    <div>
      <h1>Solicitud de Citas Médicas en Línea</h1>
      <form className="form-container" onSubmit={handleSubmit}>
        <div className="form-field">
          <label htmlFor="nombre">Nombre:</label>
          <input
            type="text"
            id="nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            disabled={citaSolicitada}
          />
        </div>
        <div className="form-field">
          <label htmlFor="fechaNacimiento">Fecha de Nacimiento:</label>
          <input
            type="date"
            id="fechaNacimiento"
            value={fechaNacimiento}
            onChange={(e) => setFechaNacimiento(e.target.value)}
            disabled={citaSolicitada}
          />
        </div>
        <div className="form-field">
          <label htmlFor="genero">Género:</label>
          <select
            id="genero"
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
            disabled={citaSolicitada}
          >
            <option value="">Seleccione...</option>
            <option value="masculino">Masculino</option>
            <option value="femenino">Femenino</option>
            <option value="otro">Otro</option>
          </select>
        </div>
        <div className="form-field">
          <label htmlFor="contacto">Contacto:</label>
          <input
            type="text"
            id="contacto"
            value={contacto}
            onChange={(e) => setContacto(e.target.value)}
            disabled={citaSolicitada}
          />
        </div>
        <div className="form-field">
          <label htmlFor="tipoCita">Tipo de Cita:</label>
          <select
            id="tipoCita"
            value={tipoCita}
            onChange={(e) => setTipoCita(e.target.value)}
            disabled={citaSolicitada}
          >
            <option value="">Seleccione...</option>
            <option value="Medicina General">Medicina General</option>
            <option value="Especialista">Especialista</option>
          </select>
        </div>
        <div className="form-field">
          <label htmlFor="doctor">Doctor o Especialista:</label>
          <select
            id="doctor"
            value={doctor}
            onChange={(e) => setDoctor(e.target.value)}
            disabled={citaSolicitada}
          >
            <option value="">Seleccione...</option>
            <option value="Tony Tony Chopper">Tony Tony Chopper</option>
            <option value="Miguel Valdes">Miguel Valdes</option>
            <option value="Williams Gutierrez">Williams Gutierrez</option>
          </select>
        </div>
        <div className="form-field">
          <label htmlFor="fechaHora">Fecha y Hora:</label>
          <input
            type="datetime-local"
            id="fechaHora"
            value={fechaHora}
            onChange={(e) => setFechaHora(e.target.value)}
            disabled={citaSolicitada}
          />
        </div>
        <button type="submit" disabled={citaSolicitada}>
          {citaSolicitada ? 'Solicitud Enviada' : 'Enviar Solicitud'}  {/* al enviar la solicitud cambia el mensaje de enviar solicitud a solicitud enviada */}
        </button  >
      </form>
      <div className="doctores-container">
        <div className="doctor-card">
          <img className="doctor-image" src={doctor1} alt="Doctor 1" />
          <div className="doctor-description">
            <h3>Tony Tony Chopper</h3>
            <p>Informacion</p>
            <p><h5>Medico General</h5></p>
            <p><h5>Experiencia: 10 años</h5></p>
          </div>
        </div>
        <div className="doctor-card">
          <img className="doctor-image" src={doctor2} alt="Doctor 2" />
          <div className="doctor-description">
            <h3>Miguel Valdes</h3>
            <p>Informacion</p>
            <p><h5>Medico Especialista: Ginecologo</h5></p>
            <p><h5>Experiencia: 5 años</h5></p>
          </div>
        </div>
        <div className="doctor-card">
          <img className="doctor-image" src={doctor3} alt="Doctor 3" />
          <div className="doctor-description">
            <h3>Williams Gutierrez</h3>
            <p>Informacion</p>
            <p><h5>Medico Especialista: Cardiologo</h5></p>
            <p><h5>Experiencia: 7 años</h5></p>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Formulario;
