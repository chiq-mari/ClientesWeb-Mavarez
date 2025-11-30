function alertDimensionesIncompletas(){
    window.alert("Por favor ingrese las dimensiones de ambas matrices antes de operar con ellas");
}

function alertDimensionesDistintas(){
    window.alert("Ambas matrices deben tener las mismas dimensiones");
}

function createMatriz(c, r, nombreMatriz){
    //crea Grid
    let matrixGrid = document.createElement('div');
    matrixGrid.classList.add('matriz-grid');
    matrixGrid.style.display = 'grid';
    matrixGrid.id= `${nombreMatriz}`;

    matrixGrid.style.gridTemplateColumns = `repeat(${c}, 1fr)`;
    matrixGrid.style.gridTemplateRows = `repeat(${r}, 1fr)`;
    matrixGrid.style.gap = '5px';  // Espacio entre celdas
    
    // Crea elementos usando índices de fila y columna
    for(let i = 1; i <=r; i++){
        for(let j = 1; j <=c; j++){
            let matrixCell = document.createElement('input');
            matrixCell.type = 'number';
            matrixCell.classList.add('matriz-cells');
            matrixCell.id = `${nombreMatriz}_${i}_${j}`; // ID más descriptivo
            matrixCell.style.textAlign = 'center';
            //agrego
            matrixGrid.appendChild(matrixCell);
        }
    }
    return matrixGrid;
}
/*
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
    seccionSuma.style.height = "auto";

    const contenidoSuma= document.getElementById("contenidoSuma");
    contenidoSuma.hidden=false;
    seccionSuma.style.borderRadius= "20px";
    let matrixA =createMatriz(a, a, 'matriz-suma-A');
    let matrixB=createMatriz(b, b, 'matriz-suma-B');
    //containers
    let seccionMatrizA=document.getElementById("seccionSumaMatrizA");
    let seccionMatrizB=document.getElementById("seccionSumaMatrizB")
    //plus
    let plusSymbol=document.createElement('p');
    plusSymbol.textContent="+";
    //equal
    let equalSymbol=document.createElement('p');
    equalSymbol.textContent="=";
    seccionMatrizA.appendChild(matrixA);
    seccionMatrizB.appendChild(matrixB);

})
*/
const handleCrearSuma=()=>{
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
    seccionSuma.style.height = "auto";

    const contenidoSuma= document.getElementById("contenidoSuma");

    if(contenidoSuma.hidden){
        contenidoSuma.hidden=false;
        seccionSuma.style.borderRadius= "20px";
        let matrixA =createMatriz(a, a, 'matriz-suma-A');
        let matrixB=createMatriz(b, b, 'matriz-suma-B');
        //containers
        let seccionMatrizA=document.getElementById("seccionSumaMatrizA");
        let seccionMatrizB=document.getElementById("seccionSumaMatrizB")
        //plus
        let plusSymbol=document.createElement('p');
        plusSymbol.textContent="+";
        //equal
        let equalSymbol=document.createElement('p');
        equalSymbol.textContent="=";
        seccionMatrizA.appendChild(matrixA);
        seccionMatrizB.appendChild(matrixB);
        return;
    }
    else{
        let seccionMatrizA=document.getElementById("seccionSumaMatrizA");
        let seccionMatrizB=document.getElementById("seccionSumaMatrizB");

        let matrixA=document.getElementById('matriz-suma-A');
        let matrixB=document.getElementById('matriz-suma-B');

        seccionMatrizA.removeChild(matrixA);
        seccionMatrizB.removeChild(matrixB);

        contenidoSuma.hidden=true;
        handleCrearSuma();
        return;
    }

};



const btCrearSuma=document.getElementById("crearSuma");
btCrearSuma.addEventListener("click", handleCrearSuma);
    