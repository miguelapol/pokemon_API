const busqueda=document.querySelector('#busquedapokemon');
const mostrar=document.querySelector('#picture');

busqueda.addEventListener('click',searchPokemon);
function searchPokemon(e) {
        e.preventDefault();
        let pokemon=document.querySelector('#buscador').value;
        pokemon=pokemon.toLowerCase();
        if(pokemon===""){
                mostrarError('Error sus campos estan vacios');
                return;
        }
        consultarAPI(pokemon);

}

function mostrarError(mensaje) {
    
        const txt=document.getElementById('stats');
        const imagen=document.createElement('img');
        imagen.classList.add('imgpokemon');
        imagen.src='./images/error.png';
        mostrar.appendChild(imagen);
        txt.innerHTML=`${mensaje}`;      
}
function consultarAPI(pokemon) {
        spinner();
        const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
        fetch(url)
         .then((respuesta)=>{
                 if(respuesta.status!='200') {
                         mostrarError('No encontrado');
                 }else{
                         return respuesta.json();
                 }
         })
         .then(dato=>mostrarDatos(dato));

}

function mostrarDatos(dato) {
        const{forms:[{name}],sprites:{front_default},moves:[{move}],types:[{type}],weight,stats}=dato;
        const informacion=document.getElementById('stats');
        const imagen=document.createElement('img');
        imagen.classList.add('imgpokemon');
        imagen.src=front_default;
        mostrar.appendChild(imagen);
        // console.log(typeof(stats[0].base_stat));
        let HP=parseInt(stats[0].base_stat);
        let Ataque=parseInt(stats[1].base_stat);
        let Defensa=parseInt(stats[2].base_stat);
        let Velocidad=parseInt(stats[5].base_stat);
        informacion.innerHTML=`
        Nombre: ${name}
        <br>
        Moviento: ${move.name}
        <br>
        Tipo: ${type.name}
        <br>
        Peso: ${weight}
        <br>
        <label for="grafica-pokemon">HP:${HP}</label>
        <progress class="grafica" value="${HP}" max="200"></progress>
        <label for="grafica-pokemon">Ataque:${Ataque}</label>
        <progress class="grafica" value="${Ataque}" max="200"></progress>
        <br>
        <label for="grafica-pokemon">Defensa:${Defensa}</label>
        <progress class="grafica" value="${Defensa}" max="200"></progress>
        <label for="grafica-pokemon">Velocidad:${Velocidad}</label>
        <progress class="grafica" value="${Velocidad}" max="200"></progress>
         `;
}


function limpiarHTML() {
        while ((mostrar.firstChild)) {
                mostrar.removeChild(mostrar.firstChild);
        }
}
function spinner() {
        limpiarHTML();
        const divSpinner=document.createElement('div');
        divSpinner.id= 'loader';
        mostrar.appendChild(divSpinner);
}