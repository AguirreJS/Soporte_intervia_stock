import React, { useState, useEffect } from 'react';
import './css/App.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
let ubicacionActual = "http://localhost:4000";



function obtenerDominioActual() {
  const dominioCompleto = window.location.hostname;
  const partes = dominioCompleto.split('.');
  
  if (partes.length >= 3) {
    return partes.slice(1).join('.');
  } else {
    return dominioCompleto;
  }
}

const dominio = obtenerDominioActual();




function App() {
  



   var textoNuevo = "null" ;
  const bucador=e=>{

let textoABuscar = e.target.value;
textoNuevo = e.target.value;
let listabus = lista;

buscarCoincidencias(listabus, textoABuscar);
}



function buscarCoincidencias(arrObjetos, textoABuscar) {
  if (textoABuscar === "") {
    actualizarDOOM();
    return; // Agrega un return para evitar que el código siga ejecutándose
  }

  console.log(lista)
  // Convertir el texto de búsqueda a minúsculas (o mayúsculas) para hacer la búsqueda insensible a mayúsculas y minúsculas
  const textoABuscarLowerCase = textoABuscar.toLowerCase();

  // Filtrar los objetos que coinciden con el texto de búsqueda
  const objetosCoincidentes = arrObjetos.filter((objeto) => {
    for (const key in objeto) {
      if (objeto[key]) {
        // Convertir el valor de la propiedad a minúsculas (o mayúsculas) antes de compararlo
        const valorPropiedadLowerCase = objeto[key].toString().toLowerCase();
        
        if (valorPropiedadLowerCase.includes(textoABuscarLowerCase)) {
          return true; // Coincidencia encontrada
        }
      }
    }
    return false; // No se encontró coincidencia en este objeto
  });

  // Convertir los objetos coincidentes en una cadena JSON
  const resultado = JSON.stringify(objetosCoincidentes, null, 2);
  const objeto = JSON.parse(resultado);

  setLista(objeto);
}




///////////////////////////////////////




  const [lista, setLista] = useState([]);

  useEffect(() => {
    solicitudLista()
      .then(json => {

       let reversa = json.reverse()

        setLista(reorganizarObjeto(reversa));
      });
  }, []);




  

  function solicitudLista() {
    return fetch(ubicacionActual + "/solicitudstock", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
    })
    .then(res => res.json())
    .catch(error => {
      console.error('Error al obtener los datos:', error);
      return [];
    });
  }


  function eliminar(i,a) {

    if ( a == "NO") {

    eliminar = {
 
      "stock" : i,
     
      }
      
      
      fetch(ubicacionActual + "/deletstock", {
         method:"POST",
         headers: {"Content-type":"application/json"},
         body: JSON.stringify(eliminar),})
         .then(res => res.json())
         .then(json =>  { 

          if (json = true ) {

            actualizarDOOM ()
         

          }

          
      
    })
    .catch(error => {
      console.error('Error al obtener los datos:', error);
    });
  } else {  let contraseña = prompt("No puede eliminar de stock un articulo que ya fue asignado, porfavor ingrese la contraseña del desarrollador")

if (contraseña == "loquendo"){

  eliminar = {
 
    "stock" : i,
   
    }
    
    
    fetch(ubicacionActual + "/deletstock", {
       method:"POST",
       headers: {"Content-type":"application/json"},
       body: JSON.stringify(eliminar),})
       .then(res => res.json())
       .then(json =>  { 

        if (json = true ) {

          actualizarDOOM ()
       

        }

        
    
  })
  .catch(error => {
    console.error('Error al obtener los datos:', error);
  });



} else { alert("Contraseña incorrecta")}


}


}



 

function ahora() {



  const descripcion = document.getElementById("descripcion")
  const descripvalue = descripcion.value.trim();

  const serial = document.getElementById("serial")
  const serialvalue = serial.value.trim();

  const factura= document.getElementById("factura")
  const facturavalue = factura.value.trim();
  
  if (descripvalue === "") {

    alert("Alguno de los campos no se rellenaron correctamente")
  
  } else if (serialvalue === "") {
    alert("Alguno de los campos no se rellenaron correctamente")
 
  } else if  (facturavalue === "") {

    alert("Alguno de los campos no se rellenaron correctamente")
  
  } else  {  Ahora()  }

}









  function Ahora() {





    const plantilla = document.getElementById("plantilla").value.toLowerCase(); // Convertir a minúscula
    const estado = document.getElementById("estado").value;
    const descripcion = document.getElementById("descripcion").value;
    const serial = document.getElementById("serial").value;
    const factura = document.getElementById("factura").value;
  
    // Crear un objeto con los valores recopilados
    const objetoDatos = {
      plantilla: plantilla,
      estado : estado,
      descripcion: descripcion,
      serial: serial,
      factura: factura
    };


    var cantidad = document.getElementById("cantidad").value;

    console.log(cantidad)

if (cantidad > 1) {    console.log("Cargar mas de un item")

setTimeout(actualizarDOOM, 2000);

for (var i = 0; i < cantidad; i++) {
  fetch(ubicacionActual +'/stock', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(objetoDatos)
  })
  .then(response => response.json())
  .then(data => { if (data == true) {

  }
  })


}
   } else {
  
  
    // Enviar el objeto al backend mediante una solicitud POST (suponiendo que utilizas fetch)
    fetch(ubicacionActual +'/stock', {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(objetoDatos)
    })
    .then(response => response.json())
    .then(data => { if (data == true) {

      console.log(data)
      actualizarDOOM()

      
    }
    })
    .catch(error => {
    }); }
  
    // Puedes también reiniciar los campos de entrada si lo deseas
  
  
  
    
    
    document.getElementById("descripcion").value = "";
    document.getElementById("serial").value = "";
    document.getElementById("factura").value = "";
    } 



    function actualizarDOOM () {



   
        
      fetch(ubicacionActual + "/solicitudstock", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
      })
      .then(res => res.json())
      .then(json =>{
        
       let reversa = json.reverse()
        
        setLista(reorganizarObjeto(reversa));
    
      })
    
      .catch(error => {
      
      });}

   
//////// Ordenar objeto 

function reorganizarObjeto(objeto) {


  const entregadoNo = [];
  const entregadoSi = [];
  objeto.forEach(item => {
    if (item.entregado === 'NO') {
      entregadoNo.push(item);
    } else {
      entregadoSi.push(item);
    }
  });

  // Concatenar los arrays para colocar los elementos entregados al final
  const nuevoOrden = entregadoNo.concat(entregadoSi);

  return nuevoOrden;
}


function edit(a,b) {

let NuevoValor = prompt("Cuan es el nuevo valor?")

   
  let editar = {
 
    codigo : a,
    sector : b,
    Valor : NuevoValor
   
    }
    
   
   if (NuevoValor == "" || NuevoValor == null) { alert("No se puede cambiar por un valor vacio") } else {
   
   fetch(ubicacionActual + "/editstock", {
       method:"POST",
       headers: {"Content-type":"application/json"},
       body: JSON.stringify(editar),})
       .then(res => res.json())
       .then(json =>  { 

        if (json = true ) {

          actualizarDOOM ()
       

        }

        
    
  })
  .catch(error => {
    console.error('Error al obtener los datos:', error);
  });




}}



////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// HTML ///////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////


  return (  
    <div>

<input
      className="inputC"
      type="text"
      id="buscador"
      placeholder="BUSCADOR"
      onChange={bucador}
      />

<div class="ingresar">


      <h1>CANTIDAD </h1>
<h1>CATEGORIA </h1> 
<h1>ESTADO </h1> 
<h1>DESCRIPCION</h1> 
 <h1>SERIAL</h1> 
  <h1>FACTURA </h1>


  <select id="cantidad" >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>

  <select id="plantilla" name="plantilla">
      <option value="memoria">Memoria ram</option>
      <option value="camara">Camara</option>
      <option value="teclado">Teclado</option>
      <option value="mouse">Mouse</option>
      <option value="complemento">Complemento</option>
      <option value="placared">Placa red</option>
      <option value="disco">Disco</option>
      <option value="mother">Mother</option>
      <option value="fuente">Fuente</option>
      <option value="cables">Cables</option>
      <option value="gabinete">Gabinete</option>
      <option value="red">Red</option>
      <option value="equipo">Equipo</option>
      <option value="procesador">Procesador</option>
      <option value="gpu">GPU</option>
      <option value="perifericos">Periféricos</option>
      <option value="baterias">Baterias</option>
      <option value="Pendrive">Pendrive</option>
      <option value="lectordehuellas">Lector de huella</option>
      <option value="tonercartucho">Toner/Cartucho</option>
      <option value="ups">UPS</option>
      <option value="Licencia">Licencia</option>
      <option value="monitor">Monitor</option>
      <option value="impresora">Impresora</option>
    
  </select>

  <select id="estado" name="estado">
    <option value="Nuevo">Nuevo</option>
    <option value="Reutilizado">Reutilizado</option>
    <option value="Usado">Usado</option>
  
  
</select>

      <input type="text" id="descripcion" name="descripcion" required />
      <input type="text" id="serial" name="serial" required />
      <div className="okstock">

      <input type="text" id="factura" name="factura" required />
      <img src="icon/finalizado.png" onClick={() => ahora()}  id="nuevoItem" alt="Finalizado" />
      </div>
      </div>
      <div>

      <div class="TotiloStock" >  
      <h1 class="TituloItemListo noborder" > Categoria</h1>
      <h1 class="TituloItemListo" > Serial</h1>
      <h1 class="TituloItemListo" > Descripcion  </h1>
      <h1 class="TituloItemListo" > Estado</h1>
      <h1 class="TituloItemListo" > Factura </h1>
      <h1 class="TituloItemListo" > Destino </h1>
      <h1 class="TituloItemListo" > Codigo </h1>
      <h1 class="TituloItemListo noborder" > Estregado </h1>
      <h1 class="TituloItemListo noborder" > FECHA </h1>
    
  
  
  </div> 
  
  
   </div>

      {lista.map((item, index) => (

        <div className="StockON" key={index}>
          <div className="eliminarGrid">
          <i className="bi bi-trash" src='./basura.png' onClick={() => eliminar(item.codigo , item.entregado)}/> 
          <p  onDoubleClick={() => edit(item.codigo ,"1" )} style={{ background: item.entregado !== 'NO' ? '#652525' : '#40376D' }}>{item.categoria}</p>
        </div>
          <p onDoubleClick={() => edit(item.codigo ,"2" )} style={{ background: item.entregado !== 'NO' ? '#652525' : '#40376D' }}>{item.sn}</p>
          <p onDoubleClick={() => edit(item.codigo ,"3" )} style={{ background: item.entregado !== 'NO' ? '#652525' : '#40376D' }}>{item.descripcion}</p>
          <p onDoubleClick={() => edit(item.codigo ,"4" )} style={{ background: item.entregado !== 'NO' ? '#652525' : '#40376D' }}>{item.estado}</p>
          <p onDoubleClick={() => edit(item.codigo ,"5" )} style={{ background: item.entregado !== 'NO' ? '#652525' : '#40376D' }}>{item.factura}</p>
          <p onDoubleClick={() => edit(item.codigo ,"6" )} style={{ background: item.entregado !== 'NO' ? '#652525' : '#40376D' }}>{item.destino}</p>
          <p onDoubleClick={() => edit(item.codigo ,"7" )} style={{ background: item.entregado !== 'NO' ? '#652525' : '#40376D' }}>{item.codigo}</p>
          <p onDoubleClick={() => edit(item.codigo ,"8" )} style={{ background: item.entregado !== 'NO' ? '#652525' : '#40376D' }}>{item.entregado}</p>
          <p onDoubleClick={() => edit(item.codigo ,"9" )} style={{ background: item.entregado !== 'NO' ? '#652525' : '#40376D' }}>{item.nota}</p>
     
          
        </div>
      ))}   
    </div>
  );
}






















export default App;


