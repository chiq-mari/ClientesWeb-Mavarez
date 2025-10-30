const btCrearSuma = document.getElementById("crearSuma");

btCrearSuma.addEventListener("click", () => {
    let sizeMatrizA = document.getElementById("sizeMatrizA").value;
    let sizeMatrizB = document.getElementById("sizeMatrizB").value;

    if(!Boolean(sizeMatrizA) ||  !Boolean(sizeMatrizB)){
        alertDimensionesIncompletas();
        return;
    }

    //ambas dimensiones estan
    let a=parseInt(sizeMatrizA);
    let b=parseInt(sizeMatrizB);
    if(a!=b){
        alertDimensionesDistintas();
        return;
    }

    // Ajusta la altura de la sección
    let seccionSuma = document.getElementById("suma");
    seccionSuma.style.height = "360px";  // Añadida la unidad px

    const contenidoSuma= document.getElementById("contenidoSuma");
    contenidoSuma.hidden=false;
    let matrixA;
    let matrixB;
    
})

function alertDimensionesIncompletas(){
    window.alert("Por favor ingrese las dimensiones de ambas matrices antes de operar con ellas");
}

function alertDimensionesDistintas(){
    window.alert("Ambas matrices deben tener las mismas dimensiones");
}