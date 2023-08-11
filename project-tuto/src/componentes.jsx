import {useState} from 'react'

function MyButton(){
    const [estado, actualizarEstado] = useState(0) //con esta funcion vamos a controlar los estados
    function clicado(){
      actualizarEstado(estado + 1)
    } //aquí vamos a hacer uso de esta función para manejar eventos
    return (
      <div>
        <button onClick={clicado} className='boton'>Soy un boton</button>
        <p>{estado}</p>
      </div>
    );
  }
  
  function MyListOfProductuts(){ //renderizado de listas
     const products = [ //declaramos la lista
      { title: 'Repollo', isFruit: false, id: 1 },
      { title: 'Ajo', isFruit: false, id: 2 },
      { title: 'Manzana', isFruit: true, id: 3 },
    ];
      const listItems = products.map(product => //hacemos uso de la funcion map para mapear cada elemento
      <li
        key={product.id}
        style={{
          color: product.isFruit ? 'magenta' : 'darkgreen'
        }}
      >
        {product.title}
      </li>
    );
    return(
      <ul>{listItems}</ul>//devolvemos la lista de elementos
    )
  }

  export default function MyApp(){ 
    return(
        <div> 
            <h1>Bienvenido a mi aplicacion 
            </h1>
            <MyButton/>
            <MyListOfProductuts/>
        </div>
    );
  }