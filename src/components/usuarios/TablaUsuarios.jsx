import {Table, Spinner} from "react-bootstrap";

const TablaUsuarios = ({usuarios, cargando}) => {

  if (cargando){
    return (
        <>
          <Spinner animation = "border">
            <span className="visually-hidden">Cargando...</span>
          </Spinner>
        </>
    );
  }

  return (
    <>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Usuario</th>
          <th>Contraseña</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody>
       {usuarios.map((usuario) => {
        return (
          <tr key ={usuario.id_usuario}> 
            <td>{usuario.id_usuario}</td>
            <td>{usuario.usuario}</td>
            <td>{usuario.contraseña}</td>
            <td>Acción</td>
          </tr>
        );
       })}
      </tbody>
    </Table>
    </>
  );

}



export default TablaUsuarios;