import Contador from "../components/Contador";
import React, { useState } from 'react';


const Inicio = () => {

  const [contador, setContador] = useState(0);

  const incrementar = () => {
    setContador(contador + 1)
  }


  return (
    <>
    <Contador contador = {contador} incrementar = {incrementar}/>

    </>
  );
}

export default Inicio;

