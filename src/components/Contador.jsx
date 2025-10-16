
const Contador = ({contador, incrementar}) => {

  

  return (
<>
<h1>Contador: {contador}</h1>
<button onClick ={incrementar}>
  Incrementar gatito
</button>

</>
  );

}

export default Contador;