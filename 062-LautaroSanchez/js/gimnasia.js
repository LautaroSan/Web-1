document.addEventListener("DOMContentLoaded",inicializar);
function inicializar() {
    "use strict";
document.querySelector("#botonCaptcha").addEventListener("click", generarCaptcha);
document.querySelector("#submit").addEventListener("click", enviarDatos);

let resultadoCorrecto;
generarCaptcha();

function generarCaptcha() {
    let captcha1 = Math.floor((Math.random()*150) + 1);
    let captcha2 = Math.floor((Math.random()*150) + 1);
    let captcha3 = Math.floor((Math.random()*150) + 1);
    let captcha4 = Math.floor((Math.random()*150) + 1);
    resultadoCorrecto = captcha1 + captcha2 - captcha3 - captcha4;
    document.querySelector("#captcha").innerHTML = captcha1 + " + " + captcha2 + " - " + captcha3 + " - " + captcha4;
    document.querySelector("#resultado").value ="";
    document.querySelector("#captchaIncorrecto").innerHTML ="";
   
}

function enviarDatos(event){
    let resultado = document.querySelector("#resultado").value;
    console.log("resultadocorrecto enviar datos"+resultadoCorrecto)
        if (resultado != resultadoCorrecto) {
            event.preventDefault();
            document.querySelector("#captchaIncorrecto").innerHTML ="Respuesta Incorrecta. Probá de nuevo o genera un nuevo Captcha";
        }
        else{
            event.preventDefault();
            document.querySelector("#captchaIncorrecto").innerHTML ="Correcto!! Tus datos fueron enviados";
            document.querySelector("#nombre").value="";
            document.querySelector("#apellido").value="";
            document.querySelector("#fecha-nacimiento").value="";
            document.querySelector("#dni").value="";
            document.querySelector("#mail").value="";
            document.querySelector("#resultado").value="";
            document.querySelector("#suelo").checked =false;
            document.querySelector("#anillas").checked =false;
            document.querySelector("#barra").checked =false;
            document.querySelector("#paralelas").checked =false;
        }
}
}
