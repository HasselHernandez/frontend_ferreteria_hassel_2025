import { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import TablaClientes from '../components/clientes/TablaClientes';
import CuadroBusquedas from '../components/busquedas/CuadroBusquedas';
import ModalRegistroCliente from '../components/clientes/ModalRegistroCliente';

const Cliente = () => {

  const [clientes, setClientes] = useState([]);
  const [cargando, setCargando] = useState(true);

  const [clientesFiltradas, setClientesFiltradas] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");

  const [mostrarModal, setMostrarModal] = useState(false);
  const [nuevoCliente, setNuevoCliente] = useState({
      primer_nombre: '',
      segundo_nombre: '',
      primer_apellido:'',
      segundo_apellido: '',
      celular:'',
      Direccion:'',
      Cedula:''
    });

    const manejarCambioInput = (e) => {
  const { name, value } = e.target;
  setNuevoCliente(prev => ({ ...prev, [name]: value }));
};

const agregarCliente = async () => {
  if (!nuevoCliente.primer_nombre.trim()) return;

  try {
    const respuesta = await fetch('http://localhost:3000/api/registrarcliente', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(nuevoCliente)
    });

    if (!respuesta.ok) throw new Error('Error al guardar');

    // Limpiar y cerrar el modal
    setNuevoCliente({primer_nombre: '', segundo_nombre: '', primer_apellido:'',
      segundo_apellido: '', celular:'', Direccion:'', Cedula:'' });
    setMostrarModal(false);

    await obtenerClientes(); // Refresca la lista
  } catch (error) {
    console.error("Error al agregar Cliente:", error);
    alert("No se pudo guardar el cliente. Revisa la consola.");
  }
};


  const obtenerClientes = async () => {
    try {
      const respuesta = await fetch('http://localhost:3000/api/clientes') // Devuelve todas los clientes
      if (!respuesta.ok) {
        throw new Error('Error al obtener los clientes');
      }

      const datos = await respuesta.json();
      setClientes(datos);
      setClientesFiltradas(datos);
      setCargando(false);
      
    } catch (error) {
      console.log(error.message);
      setCargando(false);
    }
  };

  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);

    const filtradas = clientes.filter(
      (cliente) =>
        cliente.primer_nombre.toLowerCase().includes(texto) ||
        cliente.segundo_nombre.toLowerCase().includes(texto) ||
        cliente.primer_apellido.toLowerCase().includes(texto) ||
        cliente.segundo_apellido.toLowerCase().includes(texto) ||
        cliente.direccion.toLowerCase().includes(texto) ||
        cliente.cedula.toLowerCase().includes(texto) ||
        cliente.celular.toLowerCase().includes(texto)
    );
    setClientesFiltradas(filtradas);
  };


  useEffect(() => {
    obtenerClientes();
  }, []);


  return (
    <>
      <Container className="mt-4">
        <h4>Clientes</h4>

        <Row>
          <Col lg={5} md={8} sm={8} xs={7}>
            <CuadroBusquedas
              textoBusqueda={textoBusqueda}
              manejarCambioBusqueda={manejarCambioBusqueda}
            />
          </Col>
        </Row>

<Col className="text-end">
  <Button
    className='color-boton-registro'
    onClick={() => setMostrarModal(true)}
  >
    + Nuevo Cliente
  </Button>
</Col>

        <TablaClientes
          clientes={clientesFiltradas}
          cargando={cargando}
        />

        <ModalRegistroCliente
          mostrarModal={mostrarModal}
          setMostrarModal={setMostrarModal}
          nuevoCliente={nuevoCliente}
          manejarCambioInput={manejarCambioInput}
          agregarCliente={agregarCliente}
        />

      </Container>
    </>
  );
}
export default Cliente;