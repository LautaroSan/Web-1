document.addEventListener("DOMContentLoaded",iniciarPagina);


function iniciarPagina() {
    "use strict";
    
    const url = 'https://60c4d4fcec8ef800175e09cb.mockapi.io/api/campeones';
    let before = document.querySelector("#btn-before");
    let after = document.querySelector("#btn-after");
   
    before.addEventListener("click", function(e){
        page--;
        mostrarTabla(page);
        });

    after.addEventListener("click", function(e){
            page++;
            mostrarTabla(page);
            });

    let page = 1;
    mostrarTabla(page);
    CargarForm();
    
    

async function agregarNCampeones(n) {

    let campeon = {
        anio: document.querySelector("#año").value,
        suelo: document.querySelector("#suelo").value,
        arzones: document.querySelector("#arzones").value,
        anillas: document.querySelector("#anillas").value,
        salto: document.querySelector("#salto").value,
        paralelas: document.querySelector("#paralelas").value,
        barra: document.querySelector("#barra").value
    }
    let inputValido = validarInput(campeon.año,campeon.suelo,campeon.arzones,campeon.anillas,campeon.salto,campeon.paralelas,campeon.barra);
    try{
        if(inputValido){
            for (let i = 0; i < n; i++) {
                let response = await fetch(url,{
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    body: JSON.stringify(campeon)
                });
                if (response.status === 201){
                    console.log("creado");
                }
                else{
                    console.log("Failed Url");
                }   
            }
            mostrarTabla(page);
        }
        else{
            event.preventDefault();
        }
  }
  catch(error){
      console.log(error)
  }   
}


async function mostrarTabla(page) {
    if (page != 1){
        before.style.display = "";
    }else{
        before.style.display = "none";   
    }
    let contenidoTabla = document.querySelector("#tbody");
    try{
        let response = await fetch(`${url}?page=${page}&limit=5`);
        if (response.ok){
            contenidoTabla.innerHTML = "";
            let campeones = await response.json();
            for (let campeon of campeones) {
                let id = campeon.id;
                let clase ="";
                let campeonRepetido = dobleCampeonExiste(campeon.suelo,campeon.arzones,campeon.anillas,campeon.salto,campeon.paralelas,campeon.barra);
                if(campeonRepetido){
                    clase= `class="filadestacada"`;
                }
                contenidoTabla.innerHTML += `<tr ${clase} data-id="${id}">   
                                        <td>${campeon.anio}</td>
                                        <td>${campeon.suelo}</td>
                                        <td>${campeon.arzones}</td>
                                        <td>${campeon.anillas}</td>
                                        <td>${campeon.salto}</td>
                                        <td>${campeon.paralelas}</td>
                                        <td>${campeon.barra}</td>
                                        <td> <button class="eliminar-fila"> X </button> </td>
                                        <td> <button class="editar-fila"> <img src="images/editar.jpg" alt="editar"> </button> </td>
                                        </tr>`                            
            }
        eliminarFila();
        cargarFormEdit();         
       }
     else{
         contenidoTabla.innerHTML =`Failed Url `;
     }
     }
     catch(error){
         console.log(error)
         contenidoTabla.innerHTML = `Connection Error `;
     }
   }

function agregarCampeon() {
    agregarNCampeones(1);
}
function agregarTresCampeones() {
   agregarNCampeones(3);
}

function validarInput(año,suelo,arzones,anillas,salto,paralelas,barra) {
    if(( año == "") || (suelo=="")|| (arzones=="") || (anillas =="") || (salto=="") || (paralelas=="") || (barra=="") ){
        return false;
    }
    else{
        return true;
    }
}
function dobleCampeonExiste(suelo,arzones,anillas,salto,paralelas,barra) {
   let inputsChampions = [suelo,arzones,anillas,salto,paralelas,barra];
   for (let i = 0; i < inputsChampions.length; i++) {
      for (let j = i+1; j < inputsChampions.length; j++) {
          if(inputsChampions[i].toLowerCase()==inputsChampions[j].toLowerCase()){
              return true;
          }
          
      }
       
   }
   return false;
}

function eliminarFila() {
    let botones = document.querySelectorAll(".eliminar-fila");
    for (let i = 0; i < botones.length; i++) {
        botones[i].addEventListener("click", async function(e){
        let id = this.parentElement.parentElement.dataset.id;
        try{
            let response = await fetch(`${url}/${id}`,{
                method: 'DELETE'
            })
            if(response.status === 200){
                console.log("eliminado");
            }
            else{
                console.log("failed delete")
            }
        }
        catch(error){
            console.log(error);
        }
        mostrarTabla(page);
        });    
    } 
}
function cargarFormEdit() {
    let container = document.querySelector(".contenedor-formulario-de-carga");
    let btnEdit = document.querySelectorAll(".editar-fila");
    for (let i = 0; i < btnEdit.length; i++) {
        btnEdit[i].addEventListener("click", async function(e){
            let id = this.parentElement.parentElement.dataset.id;
            try{
                let response = await fetch ('http://localhost/web1/062-LautaroSanchez/formedicion.html');
                if(response.ok){
                    let t = await response.text();
                    container.innerHTML = t;
                    completarForm(id);
                    editarFila(id);
                }
                else{
                    container.innerHTML= " Falla al cargar formulario de edición";
                }
            }
            catch(error){
                container.innerHTML = " Falla del servidor";
            }
        });
        
    }
}
async function completarForm(id) {
    let anio = document.querySelector("#año");
    let suelo = document.querySelector("#suelo");
    let arzones = document.querySelector("#arzones");
    let anillas = document.querySelector("#anillas");
    let salto = document.querySelector("#salto");
    let paralelas = document.querySelector("#paralelas");
    let barra = document.querySelector("#barra");
    try{
        let response = await fetch (`${url}/${id}`);
        if(response.ok){
            let fila = await response.json();
            anio.value = fila.anio;
            suelo.value = fila.suelo;
            arzones.value = fila.arzones;
            anillas.value = fila.anillas;
            salto.value = fila.salto;
            paralelas.value = fila.paralelas;
            barra.value = fila.barra;
        }
        else{
            console.log("Failed url")
        }
    }
    catch(error){
        console.log(error);
    }
}
function editarFila(id) {
    let editBtn = document.querySelector("#editar");
    editBtn.addEventListener("click", function(e){
        editarTabla(id);
    });
}
 async function editarTabla(id) {
    let campeon = {
        anio: document.querySelector("#año").value,
        suelo: document.querySelector("#suelo").value,
        arzones: document.querySelector("#arzones").value,
        anillas: document.querySelector("#anillas").value,
        salto: document.querySelector("#salto").value,
        paralelas: document.querySelector("#paralelas").value,
        barra: document.querySelector("#barra").value
    }
    let inputValido = validarInput(campeon.anio,campeon.suelo,campeon.arzones,campeon.anillas,campeon.salto,campeon.paralelas,campeon.barra);
    if(inputValido){
        try{
            let response = await fetch (`${url}/${id}`,{
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(campeon)
            });
            if (response.status === 200){
                console.log("editado");
            }
            else{
                console.log("Failed Url");
            }
            mostrarTabla(page);
            CargarForm();
        }
        catch(error){
            console.log(error);
        }   
    }   
 }
async function CargarForm() {
    let container = document.querySelector(".contenedor-formulario-de-carga");
    try{
        let response = await fetch ('http://localhost/web1/062-LautaroSanchez/formCarga.html')
        if(response.ok){
            let t = await response.text();
            container.innerHTML=t;
        }
        else{
            container.innerHTML= "Falla al cargar formulario"
        }
    }
    catch(error){
        container.innerHTML= "Falla del servidor"
    }
    document.querySelector("#cargar-fila").addEventListener("click",agregarCampeon);
    document.querySelector("#cargar-tres-filas").addEventListener("click",agregarTresCampeones);
   
      
}

let filtro = document.querySelector("#filtro")
filtro.addEventListener("keyup", filtrar);

function filtrar(params) {
  let input = document.querySelector("#filtro");
  let filter = input.value.toUpperCase();
  let table = document.querySelector("#tabla");
  let tr = table.querySelectorAll("tr");

 for (let index = 2; index < tr.length; index++) {
    tr[index].style.display = "none";
    let td = tr[index].querySelectorAll("td");
        for (let j = 0; j < td.length; j++) {
            let cell = td[j];
            if (cell) {
            if (cell.innerText.toUpperCase().indexOf(filter) > -1) {
                tr[index].style.display = "";
            } 
            }
        }
 }
    
}



}






