import { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import TablaProductos from '../components/productos/TablaProductos';
import CuadroBusquedas from '../components/busquedas/CuadroBusquedas';


const Productos = () => {

  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [textoBusqueda, setTextoBusqueda] = useState("");

  const obtenerProductos = async () => {
    try {
      const respuesta = await fetch('http://localhost:3000/api/productos') // Devuelve todas las categorias
      if (!respuesta.ok) {
        throw new Error('Error al obtener los productos');
      }

      const datos = await respuesta.json();
      setProductos(datos);
      setProductosFiltrados(datos);
      setCargando(false);

    } catch (error) {
      console.log(error.message);
      setCargando(false);
    }
  };

  const manejarCambioBusqueda = (e) => {
    const texto = e.target.value.toLowerCase();
    setTextoBusqueda(texto);

    const filtrados = productos.filter(
      (producto) =>
        producto.nombre_producto.toLowerCase().includes(texto) ||
        producto.descripcion_producto.toLowerCase().includes(texto) ||
        producto.id_categoria == texto ||
        producto.precio_unitario == texto ||
        producto.stock == texto
    );
    setProductosFiltrados(filtrados);
  };


  useEffect(() => {
    obtenerProductos();
  }, []);

  return (
    <>
      <Container className="mt-4">
        <h4>Productos</h4>

        <Row>
          <Col lg={5} md={8} sm={8} xs={7}>
            <CuadroBusquedas
              textoBusqueda={textoBusqueda}
              manejarCambioBusqueda={manejarCambioBusqueda}
            />
          </Col>
        </Row>

        <TablaProductos
          productos={productosFiltrados}
          cargando={cargando}
        />
      </Container>
    </>
  );
}

export default Productos;