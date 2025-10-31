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

function alertMinMaxDimensiones(){
    window.alert("Las dimensiones deben estar en el rango [2, 10]")
}

function createMatriz(r, c, nombreMatriz){
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


////////////////////////////Suma/////////////////////////////////////

const handleCrearSuma=()=>{
    let sizeMatrizASuma = document.getElementById("sizeMatrizASuma").value;
    let sizeMatrizBSuma = document.getElementById("sizeMatrizBSuma").value;

    if(!Boolean(sizeMatrizASuma) ||  !Boolean(sizeMatrizBSuma)){
        alertDimensionesIncompletas();
        return;
    }

    if (sizeMatrizASuma < 2 || sizeMatrizBSuma < 2) {
        alertMinMaxDimensiones();
        return;
    }

    //ambas dimensiones estan
    let a=parseInt(sizeMatrizASuma);
    let b=parseInt(sizeMatrizBSuma);
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


        let matrixSumaA =createMatriz(a, a, 'matriz-suma-A');
        let matrixSumaB=createMatriz(b, b, 'matriz-suma-B');
        //containers
        let seccionSumaMatrizA=document.getElementById("seccionSumaMatrizA");
        let seccionSumaMatrizB=document.getElementById("seccionSumaMatrizB");
        let seccionSumaResultado = document.getElementById("seccionSumaResultado");
        //plus
        //let plusSymbol=document.createElement('p');
        //plusSymbol.textContent="+";
        //equal
        //let equalSymbol=document.createElement('p');
        //equalSymbol.textContent="=";
        //clear any existing matrices( prevent duplicates)
        seccionSumaMatrizA.innerHTML="Matriz A"
        seccionSumaMatrizB.innerHTML="Matriz B"
        seccionSumaResultado="A+B"
        //
        seccionSumaMatrizA.appendChild(matrixSumaA);
        seccionSumaMatrizB.appendChild(matrixSumaB);
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

    let matrixSumaA=document.getElementById('matriz-suma-A');
    let matrixSumaB=document.getElementById('matriz-suma-B');

    //size
    let sizeMatrizResultado= parseInt(document.getElementById("sizeMatrizASuma").value);
    const seccionSumaResultado = document.getElementById("seccionSumaResultado");
    //remove any previous thing
    const existingResult = document.getElementById("matriz-suma-resultado");
    if (existingResult) {existingResult.remove();}

    //ready to create
    const matrixSumaResultado= createMatriz(sizeMatrizResultado, sizeMatrizResultado, 'matriz-suma-resultado');
    //adjunta
    seccionSumaResultado.appendChild(matrixSumaResultado);
    seccionSumaResultado.hidden=false;
    //llena
    for(let i = 1; i <=sizeMatrizResultado; i++){
        for(let j = 1; j <=sizeMatrizResultado; j++){
            let matrixCellR= document.getElementById(`matriz-suma-resultado_${i}_${j}`); 
            let matrixCellA= document.getElementById(`matriz-suma-A_${i}_${j}`);
            let matrixCellB= document.getElementById(`matriz-suma-B_${i}_${j}`);
            matrixCellR.value= Number((Number(matrixCellA.value)+Number(matrixCellB.value)).toFixed(1));
        }
    }
};

const clearSum = ()=>{
    //secciones
    const seccionSumaResultado = document.getElementById("seccionSumaResultado");
    const seccionSumaMatrizA=document.getElementById("seccionSumaMatrizA");
    const seccionSumaMatrizB=document.getElementById("seccionSumaMatrizB");
    //matrices
    const matrixSumaA=document.getElementById('matriz-suma-A');
    const matrixSumaB=document.getElementById('matriz-suma-B');
    const matrixSumaResultado=document.getElementById('matriz-suma-resultado');

    //remove
    if (seccionSumaMatrizA.contains(matrixSumaA)) {seccionSumaMatrizA.removeChild(matrixSumaA)};
    if (seccionSumaMatrizB.contains(matrixSumaB)) {seccionSumaMatrizB.removeChild(matrixSumaB)};
    if (seccionSumaResultado.contains(matrixSumaResultado)) {seccionSumaResultado.removeChild(matrixSumaResultado)};
    //ocultar
    const contenidoSuma= document.getElementById("contenidoSuma");
    seccionSumaResultado.hidden=true;
    contenidoSuma.hidden=true;

    //reset fields
    document.getElementById("sizeMatrizASuma").value = "";
    document.getElementById("sizeMatrizBSuma").value = "";
};

function randomNumberForCell(){ //IN RANGE[-10, 10]
    return Number((Math.random()*(20)-10).toFixed(1));
}

const handleGenerarValores=(r, c, matrixID)=>{

    const matrixToFill= document.getElementById(matrixID);
    
    //si esta la matriz vacia

    for(let i = 1; i <=r; i++){
        for(let j = 1; j <=c; j++){
            let matrixCell= document.getElementById(`${matrixID}_${i}_${j}`);

            matrixCell.value= randomNumberForCell();  
        }
    }
};


const btCrearSuma=document.getElementById("crearSuma");
btCrearSuma.addEventListener("click", handleCrearSuma);

const btResultadoSuma=document.getElementById("btResultadoSuma");
btResultadoSuma.addEventListener("click", handleResultadoSuma);

const  btLimpiarSuma= document.getElementById("btLimpiarSuma");
btLimpiarSuma.addEventListener("click", clearSum);

const  btGenerarSuma= document.getElementById("btGenerarValoresSuma");
btGenerarSuma.addEventListener("click", ()=>{

    if(!matrizEmpty('matriz-suma-A') || !matrizEmpty('matriz-suma-B')  ){
        alertaVaciar();
        return;
    }
    let sizeMatrizASuma= parseInt(document.getElementById("sizeMatrizASuma").value);
    let sizeMatrizBSuma= parseInt(document.getElementById("sizeMatrizBSuma").value);

    handleGenerarValores(sizeMatrizASuma, sizeMatrizASuma, 'matriz-suma-A');
    handleGenerarValores(sizeMatrizBSuma, sizeMatrizBSuma, 'matriz-suma-B');


} )


////////////////////////////Resta/////////////////////////////////////
const handleCrearResta=()=>{
    let sizeMatrizAResta = document.getElementById("sizeMatrizAResta").value;
    let sizeMatrizBResta = document.getElementById("sizeMatrizBResta").value;

    if(!Boolean(sizeMatrizAResta) ||  !Boolean(sizeMatrizBResta)){
        alertDimensionesIncompletas();
        return;
    }

    if (sizeMatrizAResta < 2 || sizeMatrizBResta < 2) {
        alertMinMaxDimensiones();
        return;
    }

    //ambas dimensiones estan
    let a=parseInt(sizeMatrizAResta);
    let b=parseInt(sizeMatrizBResta);
    if(a!=b){
        alertDimensionesDistintas();
        return;
    }

    // Ajusta la altura de la sección
    let seccionResta = document.getElementById("resta");
    seccionResta.style.height = "auto";

    const contenidoResta= document.getElementById("contenidoResta");

    if(contenidoResta.hidden){
        contenidoResta.hidden=false;
        seccionResta.style.borderRadius= "20px";


        let matrixRestaA =createMatriz(a, a, 'matriz-resta-A');
        let matrixRestaB =createMatriz(b, b, 'matriz-resta-B');
        //containers
        let seccionRestaMatrizA   =document.getElementById("seccionRestaMatrizA");
        let seccionRestaMatrizB   =document.getElementById("seccionRestaMatrizB");
        let seccionRestaResultado1=document.getElementById("seccionRestaResultado1");
        let seccionRestaResultado2=document.getElementById("seccionRestaResultado2");
        //plus
        //let plusSymbol=document.createElement('p');
        //plusSymbol.textContent="+";
        //equal
        //let equalSymbol=document.createElement('p');
        //equalSymbol.textContent="=";
        //clear any existing matrices( prevent duplicates)
        seccionRestaMatrizA.innerHTML="Matriz A"
        seccionRestaMatrizB.innerHTML="Matriz B"
        seccionRestaResultado1="A-B"
        seccionRestaResultado2="B-A"
        //
        seccionRestaMatrizA.appendChild(matrixRestaA);
        seccionRestaMatrizB.appendChild(matrixRestaB);
        return;
    }
    else{
        clearResta();
        return;
    }
};

const clearResta = ()=>{
    //secciones
    const seccionRestaResultado1= document.getElementById("seccionRestaResultado1");
    const seccionRestaResultado2= document.getElementById("seccionRestaResultado2");
    const seccionRestaMatrizA=document.getElementById("seccionRestaMatrizA");
    const seccionRestaMatrizB=document.getElementById("seccionRestaMatrizB");
    //matrices
    const matrixRestaA=document.getElementById('matriz-resta-A');
    const matrixRestaB=document.getElementById('matriz-resta-B');
    const matrixRestaResultado1=document.getElementById('matriz-resta-resultado-1');
    const matrixRestaResultado2=document.getElementById('matriz-resta-resultado-2');

    //remove
    if (seccionRestaMatrizA.contains(matrixRestaA)) {seccionRestaMatrizA.removeChild(matrixRestaA)};
    if (seccionRestaMatrizB.contains(matrixRestaB)) {seccionRestaMatrizB.removeChild(matrixRestaB)};
    if (seccionRestaResultado1.contains(matrixRestaResultado1)) {seccionRestaResultado1.removeChild(matrixRestaResultado1)};
    if (seccionRestaResultado2.contains(matrixRestaResultado2)) {seccionRestaResultado2.removeChild(matrixRestaResultado2)};
    //ocultar
    const contenidoResta= document.getElementById("contenidoResta");
    //seccionRestaResultado1.hidden=true;
    //seccionRestaResultado2.hidden=true;
    contenidoResta.hidden=true;

    //reset fields
    document.getElementById("sizeMatrizAResta").value = "";
    document.getElementById("sizeMatrizBResta").value = "";
};

const handleResultadoResta=()=>{
    const contenidoResta= document.getElementById("contenidoResta");
    
    if(!matrizCompleta('matriz-resta-A') || !matrizCompleta('matriz-resta-B')){
        alertResultado();
        return;
    }
    //si estan las matrices completas, crea la otra matriz y resuelve

    let matrixRestaA=document.getElementById('matriz-resta-A');
    let matrixRestaB=document.getElementById('matriz-resta-B');

    //size
    let sizeMatrizResultado= parseInt(document.getElementById("sizeMatrizAResta").value);
    //const seccionSumaResultado = document.getElementById("seccionSumaResultado");
    //remove any previous thing
    const existingResult1 = document.getElementById("matriz-resta-resultado-1");
    const existingResult2 = document.getElementById("matriz-resta-resultado-2");
    if (existingResult1) {existingResult1.remove();}
    if (existingResult2) {existingResult2.remove();}

    //ready to create
    const matrixRestaResultado1= createMatriz(sizeMatrizResultado, sizeMatrizResultado, 'matriz-resta-resultado-1');
    const matrixRestaResultado2= createMatriz(sizeMatrizResultado, sizeMatrizResultado, 'matriz-resta-resultado-2');

    //adjunta
    seccionRestaResultado1.appendChild(matrixRestaResultado1);
    seccionRestaResultado2.appendChild(matrixRestaResultado2);
    //seccionSumaResultado.hidden=false;
    //llena 1
    for(let i = 1; i <=sizeMatrizResultado; i++){
        for(let j = 1; j <=sizeMatrizResultado; j++){
            let matrixCellR= document.getElementById(`matriz-resta-resultado-1_${i}_${j}`); 
            let matrixCellA= document.getElementById(`matriz-resta-A_${i}_${j}`);
            let matrixCellB= document.getElementById(`matriz-resta-B_${i}_${j}`);
            matrixCellR.value= Number((Number(matrixCellA.value)-Number(matrixCellB.value)).toFixed(1));
        }
    }
    //llena 2
    for(let i = 1; i <=sizeMatrizResultado; i++){
        for(let j = 1; j <=sizeMatrizResultado; j++){
            let matrixCellR= document.getElementById(`matriz-resta-resultado-2_${i}_${j}`); 
            let matrixCellA= document.getElementById(`matriz-resta-A_${i}_${j}`);
            let matrixCellB= document.getElementById(`matriz-resta-B_${i}_${j}`);
            matrixCellR.value= Number((Number(matrixCellB.value)-Number(matrixCellA.value)).toFixed(1));
        }
    }

};


const btCrearResta=document.getElementById("crearResta");
btCrearResta.addEventListener("click", handleCrearResta);

const btResultadoResta=document.getElementById("btResultadoResta");
btResultadoResta.addEventListener("click", handleResultadoResta);

const  btLimpiarResta= document.getElementById("btLimpiarResta");
btLimpiarResta.addEventListener("click", clearResta);

const  btGenerarResta= document.getElementById("btGenerarValoresResta");
btGenerarResta.addEventListener("click", ()=>{

    if(!matrizEmpty('matriz-resta-A') || !matrizEmpty('matriz-resta-B')  ){
        alertaVaciar();
        return;
    }
    let sizeMatrizAResta= parseInt(document.getElementById("sizeMatrizAResta").value);
    let sizeMatrizBResta= parseInt(document.getElementById("sizeMatrizBResta").value);

    handleGenerarValores(sizeMatrizAResta, sizeMatrizAResta, 'matriz-resta-A');
    handleGenerarValores(sizeMatrizBResta, sizeMatrizBResta, 'matriz-resta-B');
} )

