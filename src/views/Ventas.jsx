import {useState, useEffect} from 'react';
import { Container } from 'react-bootstrap';
import TablaVentas from '../components/ventas/TablaVentas';



const Ventas = () => {

  const [ventas, setVentas] = useState([]);
  const [cargando, setCargando] = useState(true);

  const obtenerVentas = async () => {
    try {
        const respuesta = await fetch ('http://localhost:3000/api/ventas') // Devuelve todas las categorias
        if (!respuesta.ok) {
          throw new Error ('Error al obtener los ventas');
        }

        const datos = await respuesta.json();
        setVentas(datos);
        setCargando(false);
    } catch (error) {
      console.log(error.message);
      setCargando(false);
    }
  };

  
  useEffect (() => {
    obtenerVentas();
  }, []);

  return (
    <>
    <Container className = "mt-4">
      <h4>Ventas</h4>
      <TablaVentas
       ventas = {ventas}
       cargando = {cargando}
      />
    </Container>
    </>
  );
}

export default Ventas;