function alertDimensionesIncompletas(){
    window.alert("Por favor ingrese las dimensiones de ambas matrices antes de operar con ellas");
}

function alertDimensionesDistintas(){
    window.alert("Ambas matrices deben tener las mismas dimensiones");
}

function alertResultado(){
    window.alert("Por favor ingrese todos valores para todas las celdas");
}

function alertaVaciar(){
    window.alert("Las celdas deben estar vacias");
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

function matrizCompleta(idMatriz) {
    const matriz = document.getElementById(idMatriz);

    // Selecciona todos los inputs dentro del contenedor
    const celdas = matriz.querySelectorAll("input[type='number']");

    //una por una
    for (let celda of celdas) {
        if (celda.value.trim() == "") {
            return false; // hay al menos una vacía
        }
    }

    return true; // todas las celdas tienen valor
}

function matrizEmpty(idMatriz) {
    const matriz = document.getElementById(idMatriz);

    // Selecciona todos los inputs dentro del contenedor
    const celdas = matriz.querySelectorAll("input[type='number']");

    //una por una
    for (let celda of celdas) {
        if (celda.value.trim() != "") {
            return false; // hay al menos una celda con algo
        }
    }

    return true; // todas las celdas esta vacias
}

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
        clearSum();
        return;
    }

};


const handleResultadoSuma=()=>{
    const contenidoSuma= document.getElementById("contenidoSuma");
    
    if(!matrizCompleta('matriz-suma-A') || !matrizCompleta('matriz-suma-B')){
        alertResultado();
        return;
    }
    //si estan las matrices completas, crea la otra matriz y resuelve

    let matrixA=document.getElementById('matriz-suma-A');
    let matrixB=document.getElementById('matriz-suma-B');

    //size
    let sizeMatrizResultado= parseInt(document.getElementById("sizeMatrizA").value);
    const matrixResultado= createMatriz(sizeMatrizResultado, sizeMatrizResultado, 'matriz-suma-resultado');
    //adjunta
    const seccionSumaResultado = document.getElementById("seccionSumaResultado");
    seccionSumaResultado.appendChild(matrixResultado);
    seccionSumaResultado.hidden=false;
    //llena
    for(let i = 1; i <=sizeMatrizResultado; i++){
        for(let j = 1; j <=sizeMatrizResultado; j++){
            let matrixCellR= document.getElementById(`matriz-suma-resultado_${i}_${j}`); 
            let matrixCellA= document.getElementById(`matriz-suma-A_${i}_${j}`);
            let matrixCellB= document.getElementById(`matriz-suma-B_${i}_${j}`);
            matrixCellR.value= Number(matrixCellA.value)+Number(matrixCellB.value);
        }
    }
};

const clearSum = ()=>{
    //secciones
    const seccionSumaResultado = document.getElementById("seccionSumaResultado");
    const seccionMatrizA=document.getElementById("seccionSumaMatrizA");
    const seccionMatrizB=document.getElementById("seccionSumaMatrizB");
    //matrices
    const matrixA=document.getElementById('matriz-suma-A');
    const matrixB=document.getElementById('matriz-suma-B');
    const matrixResultado=document.getElementById('matriz-suma-resultado');

    //remove
    if (seccionMatrizA.contains(matrixA)) {seccionMatrizA.removeChild(matrixA)};
    if (seccionMatrizB.contains(matrixB)) {seccionMatrizB.removeChild(matrixB)};
    if (seccionSumaResultado.contains(matrixResultado)) {seccionSumaResultado.removeChild(matrixResultado)};
    //ocultar
    const contenidoSuma= document.getElementById("contenidoSuma");
    seccionSumaResultado.hidden=true;
    contenidoSuma.hidden=true;

};

function randomNumberForCell(){ //IN RANGE[-10, 10]
    return Number((Math.random()*(20)-10).toFixed(1));
}

const handleGenerarValores=(c, r, matrixID)=>{

    const matrixToFill= document.getElementById(matrixID);
    
    //si esta la matriz vacia

    for(let i = 1; i <=c; i++){
        for(let j = 1; j <=r; j++){
            let matrixCell= document.getElementById(`${matrixID}_${i}_${j}`);

            matrixCell.value= randomNumberForCell();  
        }
    }
};


const btCrearSuma=document.getElementById("crearSuma");
btCrearSuma.addEventListener("click", handleCrearSuma);

const btResultado=document.getElementById("btResultadoSuma");
btResultado.addEventListener("click", handleResultadoSuma);

const  btLimpiarSuma= document.getElementById("btLimpiarSuma");
btLimpiarSuma.addEventListener("click", clearSum);

const  btGenerarSuma= document.getElementById("btGenerarValores");
btGenerarSuma.addEventListener("click", ()=>{

    if(!matrizEmpty('matriz-suma-A') || !matrizEmpty('matriz-suma-B')  ){
        alertaVaciar();
        return;
    }
    let sizeMatrizA= parseInt(document.getElementById("sizeMatrizA").value);
    let sizeMatrizB= parseInt(document.getElementById("sizeMatrizB").value);

    handleGenerarValores(sizeMatrizA, sizeMatrizA, 'matriz-suma-A');
    handleGenerarValores(sizeMatrizB, sizeMatrizB, 'matriz-suma-B');


} )

