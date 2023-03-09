"use strict";
document.querySelector(".boton-navegacion").addEventListener("click",mostrarMenu);
function mostrarMenu() {
    document.querySelector("nav").classList.toggle("mostrar");
}