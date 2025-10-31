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

    if (sizeMatrizASuma < 2 || sizeMatrizBSuma < 2 || sizeMatrizASuma > 10 || sizeMatrizBSuma > 10) {
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
    return Math.floor(Math.random()*(21)-10);
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

const ResetSuma= ()=>{

    const matrices = [
        'matriz-suma-A',
        'matriz-suma-B',
    ];

    // Recorre cada matriz y limpia los valores
    matrices.forEach(id => {
        const matriz = document.getElementById(id);
        if (matriz) {
            const celdas = matriz.querySelectorAll("input");
            celdas.forEach(celda => celda.value = ""); // vacía cada input
        }
    });

    const seccionSumaResultado = document.getElementById("seccionSumaResultado");
    const matrixSumaResultado=document.getElementById('matriz-suma-resultado');

    if (matrixSumaResultado  && seccionSumaResultado.contains(matrixSumaResultado)) 
    {
        seccionSumaResultado.removeChild(matrixSumaResultado);
    };
    
};


const btCrearSuma=document.getElementById("crearSuma");
btCrearSuma.addEventListener("click", handleCrearSuma);

const btResultadoSuma=document.getElementById("btResultadoSuma");
btResultadoSuma.addEventListener("click", handleResultadoSuma);

const  btLimpiarSuma= document.getElementById("btLimpiarSuma");
btLimpiarSuma.addEventListener("click", ResetSuma);

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

    if (sizeMatrizAResta < 2 || sizeMatrizBResta < 2 || sizeMatrizAResta > 10 || sizeMatrizBResta > 10) {
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
        seccionRestaResultado1.innerHTML="Matriz A-B"
        seccionRestaResultado2.innerHTML="Matriz B-A"
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

const ResetResta= ()=>{

    const matrices = [
        'matriz-resta-A',
        'matriz-resta-B',
    ];

    // Recorre cada matriz y limpia los valores
    matrices.forEach(id => {
        const matriz = document.getElementById(id);
        if (matriz) {
            const celdas = matriz.querySelectorAll("input");
            celdas.forEach(celda => celda.value = ""); // vacía cada input
        }
    });

    const seccionRestaResultado1 = document.getElementById("seccionRestaResultado1");
    const seccionRestaResultado2 = document.getElementById("seccionRestaResultado2");
    const matrixRestaResultado1=document.getElementById('matriz-resta-resultado-1');
    const matrixRestaResultado2=document.getElementById('matriz-resta-resultado-2');

    if (matrixRestaResultado1  && seccionRestaResultado1.contains(matrixRestaResultado1)) 
    {
        seccionRestaResultado1.removeChild(matrixRestaResultado1);
        seccionRestaResultado2.removeChild(matrixRestaResultado2);
    };
    
};


const btCrearResta=document.getElementById("crearResta");
btCrearResta.addEventListener("click", handleCrearResta);

const btResultadoResta=document.getElementById("btResultadoResta");
btResultadoResta.addEventListener("click", handleResultadoResta);

const  btLimpiarResta= document.getElementById("btLimpiarResta");
btLimpiarResta.addEventListener("click", ResetResta);

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

/////////////////////////Multiplicacion Matricial////////////////////////////////////

const handleCrearMultiplicacionMatricial=()=>{
    let sizeMatrizAMultiplicacionMatricialRow = document.getElementById("sizeMatrizAMultiplicacionMatricialRow").value;
    let sizeMatrizAMultiplicacionMatricialColumn = document.getElementById("sizeMatrizAMultiplicacionMatricialColumn").value;
    document.getElementById("valorKMultiplicacionEscalar").readOnly=true;

    let sizeMatrizBMultiplicacionMatricialRow = document.getElementById("sizeMatrizBMultiplicacionMatricialRow").value;
    let sizeMatrizBMultiplicacionMatricialColumn = document.getElementById("sizeMatrizBMultiplicacionMatricialColumn").value;

    if(!Boolean(sizeMatrizAMultiplicacionMatricialRow) || !Boolean(sizeMatrizAMultiplicacionMatricialColumn) ||  !Boolean(sizeMatrizBMultiplicacionMatricialRow) || !Boolean(sizeMatrizAMultiplicacionMatricialColumn) ||  !Boolean(sizeMatrizBMultiplicacionMatricialColumn)){
        alertDimensionesIncompletas();
        return;
    }

    if (sizeMatrizAMultiplicacionMatricialRow< 2 || sizeMatrizAMultiplicacionMatricialColumn<2 || sizeMatrizBMultiplicacionMatricialRow< 2 ||  sizeMatrizBMultiplicacionMatricialColumn<2 || sizeMatrizAMultiplicacionMatricialRow>10 || sizeMatrizAMultiplicacionMatricialColumn>10 || sizeMatrizBMultiplicacionMatricialRow>10 ||  sizeMatrizBMultiplicacionMatricialColumn>10) {
        alertMinMaxDimensiones();
        return;
    }

    //ambas dimensiones estan
    let rowA=parseInt(sizeMatrizAMultiplicacionMatricialRow );
    let colA=parseInt(sizeMatrizAMultiplicacionMatricialColumn);
    let rowB=parseInt(sizeMatrizBMultiplicacionMatricialRow);
    let colB=parseInt(sizeMatrizBMultiplicacionMatricialColumn);

    if(colA!=rowB){
       window.alert("El numero de columnas de A debe ser igual al nro de filas de B")
        return;
    }

    //se puede operar

    // Ajusta la altura de la sección
    let seccionMultiplicacionMatricial = document.getElementById("multiplicacionMatricial");
    seccionMultiplicacionMatricial.style.height = "auto";

    const contenidoMultiplicacionMatricial= document.getElementById("contenidoMultiplicacionMatricial");

    if(contenidoMultiplicacionMatricial.hidden){
        contenidoMultiplicacionMatricial.hidden=false;
        seccionMultiplicacionMatricial.style.borderRadius= "20px";


        let matrixMultiplicacionMatricialA =createMatriz(rowA, colA, 'matriz-multiplicacion-matricial-A');
        let matrixMultiplicacionMatricialB =createMatriz(rowB, colB, 'matriz-multiplicacion-matricial-B');
        //containers
        let seccionMultiplicacionMatricialMatrizA=document.getElementById("seccionMultiplicacionMatricialMatrizA");
        let seccionMultiplicacionMatricialMatrizB=document.getElementById("seccionMultiplicacionMatricialMatrizB");
        let seccionMultiplicacionMatricialResultado = document.getElementById("seccionMultiplicacionMatricialResultado");
        //plus
        //let plusSymbol=document.createElement('p');
        //plusSymbol.textContent="+";
        //equal
        //let equalSymbol=document.createElement('p');
        //equalSymbol.textContent="=";
        //clear any existing matrices( prevent duplicates)
        seccionMultiplicacionMatricialMatrizA.innerHTML="Matriz A"
        seccionMultiplicacionMatricialMatrizB.innerHTML="Matriz B"
        seccionMultiplicacionMatricialResultado="A x B"
        //
        seccionMultiplicacionMatricialMatrizA.appendChild(matrixMultiplicacionMatricialA);
        seccionMultiplicacionMatricialMatrizB.appendChild(matrixMultiplicacionMatricialB);
        return;
    }
    else{
        clearMultiplicacionMatricial();
        return;
    }

};

const handleResultadoMultiplicacionMatricial=()=>{
    const contenidoMultiplicacionMatricial= document.getElementById("contenidoMultiplicacionMatricial");
    
    if(!matrizCompleta('matriz-multiplicacion-matricial-A') || !matrizCompleta('matriz-multiplicacion-matricial-B')){
        alertResultado();
        return;
    }
    //si estan las matrices completas, crea la otra matriz y resuelve

    let matrixMultiplicacionMatricialA=document.getElementById('matriz-multiplicacion-matricial-A');
    let matrixMultiplicacionMatricialB=document.getElementById('matriz-multiplicacion-matricial-B');

    //sizes
    let sizeMatrizAMultiplicacionMatricialRow = document.getElementById("sizeMatrizAMultiplicacionMatricialRow").value;
    let sizeMatrizAMultiplicacionMatricialColumn = document.getElementById("sizeMatrizAMultiplicacionMatricialColumn").value;

    let sizeMatrizBMultiplicacionMatricialRow = document.getElementById("sizeMatrizBMultiplicacionMatricialRow").value;
    let sizeMatrizBMultiplicacionMatricialColumn = document.getElementById("sizeMatrizBMultiplicacionMatricialColumn").value;

    const seccionMultiplicacionMatricialResultado = document.getElementById("seccionMultiplicacionMatricialResultado");
    //remove any previous thing
    const existingResult = document.getElementById("matriz-multiplicacion-matricial-resultado");
    if (existingResult) {existingResult.remove();}

    //ready to create
    const matrixMultiplicacionMatricialResultado= createMatriz(sizeMatrizAMultiplicacionMatricialRow, sizeMatrizBMultiplicacionMatricialColumn, "matriz-multiplicacion-matricial-resultado");
    //adjunta
    seccionMultiplicacionMatricialResultado.appendChild(matrixMultiplicacionMatricialResultado);
    seccionMultiplicacionMatricialResultado.hidden=false;
    //llena
    for (let i = 1; i <= sizeMatrizAMultiplicacionMatricialRow; i++) {
        for (let j = 1; j <= sizeMatrizBMultiplicacionMatricialColumn; j++) {
            let suma = 0;
            for (let k = 1; k <= sizeMatrizAMultiplicacionMatricialColumn; k++) {
                const aVal = Number(document.getElementById(`matriz-multiplicacion-matricial-A_${i}_${k}`).value);
                const bVal = Number(document.getElementById(`matriz-multiplicacion-matricial-B_${k}_${j}`).value);
                suma += aVal * bVal;
            }
            const matrixCellR = document.getElementById(`matriz-multiplicacion-matricial-resultado_${i}_${j}`);
            matrixCellR.value = Number(suma.toFixed(1)); // redondea a 1 decimal
        }
    }
};

const clearMultiplicacionMatricial = ()=>{
    //secciones
    const seccionMultiplicacionMatricialResultado = document.getElementById("seccionMultiplicacionMatricialResultado");
    const seccionMultiplicacionMatricialMatrizA=document.getElementById("seccionMultiplicacionMatricialMatrizA");
    const seccionMultiplicacionMatricialMatrizB=document.getElementById("seccionMultiplicacionMatricialMatrizB");
    //matrices
    const matrixMultiplicacionMatricialA=document.getElementById('matriz-multiplicacion-matricial-A');
    const matrixMultiplicacionMatricialB=document.getElementById('matriz-multiplicacion-matricial-B');
    const matrixMultiplicacionMatricialResultado=document.getElementById('matriz-multiplicacion-matricial-resultado');

    //remove
    if (seccionMultiplicacionMatricialMatrizA.contains(matrixMultiplicacionMatricialA)) {seccionMultiplicacionMatricialMatrizA.removeChild(matrixMultiplicacionMatricialA)};
    if (seccionMultiplicacionMatricialMatrizB.contains(matrixMultiplicacionMatricialB)) {seccionMultiplicacionMatricialMatrizB.removeChild(matrixMultiplicacionMatricialB)};
    if (seccionMultiplicacionMatricialResultado.contains(matrixMultiplicacionMatricialResultado)) {seccionMultiplicacionMatricialResultado.removeChild(matrixMultiplicacionMatricialResultado)};
    //ocultar
    const contenidoMultiplicacionMatricial= document.getElementById("contenidoMultiplicacionMatricial");
    seccionMultiplicacionMatricialResultado.hidden=true;
    contenidoMultiplicacionMatricial.hidden=true;

    //reset fields
    document.getElementById("sizeMatrizAMultiplicacionMatricialRow").value = "";
    document.getElementById("sizeMatrizAMultiplicacionMatricialColumn").value = "";
    document.getElementById("sizeMatrizBMultiplicacionMatricialRow").value = "";
    document.getElementById("sizeMatrizBMultiplicacionMatricialColumn").value = "";
};

const ResetMultiplicacionMatricial= ()=>{

    const matrices = [
        'matriz-multiplicacion-matricial-A',
        'matriz-multiplicacion-matricial-B',
    ];

    // Recorre cada matriz y limpia los valores
    matrices.forEach(id => {
        const matriz = document.getElementById(id);
        if (matriz) {
            const celdas = matriz.querySelectorAll("input");
            celdas.forEach(celda => celda.value = ""); // vacía cada input
        }
    });

    const seccionMultiplicacionMatricialResultado = document.getElementById("seccionMultiplicacionMatricialResultado");
    const matrixMultiplicacionMatricialResultado=document.getElementById('matriz-multiplicacion-matricial-resultado');
    if (matrixMultiplicacionMatricialResultado && seccionMultiplicacionMatricialResultado.contains(matrixMultiplicacionMatricialResultado)) {seccionMultiplicacionMatricialResultado.removeChild(matrixMultiplicacionMatricialResultado)};
    
}


const btCrearMultiplicacionMatricial=document.getElementById("crearMultiplicacionMatricial");
btCrearMultiplicacionMatricial.addEventListener("click", handleCrearMultiplicacionMatricial);

const btResultadoMultiplicacionMatricial=document.getElementById("btResultadoMultiplicacionMatricial");
btResultadoMultiplicacionMatricial.addEventListener("click", handleResultadoMultiplicacionMatricial);

const  btLimpiarMultiplicacionMatricial= document.getElementById("btLimpiarMultiplicacionMatricial");
btLimpiarMultiplicacionMatricial.addEventListener("click", ResetMultiplicacionMatricial);

const  btGenerarMultiplicacionMatricial= document.getElementById("btGenerarValoresMultiplicacionMatricial");
btGenerarMultiplicacionMatricial.addEventListener("click", ()=>{

    if(!matrizEmpty('matriz-multiplicacion-matricial-A') || !matrizEmpty('matriz-multiplicacion-matricial-B')  ){
        alertaVaciar();
        return;
    }
    let sizeMatrizAMultiplicacionMatricialRow = document.getElementById("sizeMatrizAMultiplicacionMatricialRow").value;
    let sizeMatrizAMultiplicacionMatricialColumn = document.getElementById("sizeMatrizAMultiplicacionMatricialColumn").value;

    let sizeMatrizBMultiplicacionMatricialRow = document.getElementById("sizeMatrizBMultiplicacionMatricialRow").value;
    let sizeMatrizBMultiplicacionMatricialColumn = document.getElementById("sizeMatrizBMultiplicacionMatricialColumn").value;

    handleGenerarValores(sizeMatrizAMultiplicacionMatricialRow, sizeMatrizAMultiplicacionMatricialColumn, 'matriz-multiplicacion-matricial-A');
    handleGenerarValores(sizeMatrizBMultiplicacionMatricialRow, sizeMatrizBMultiplicacionMatricialColumn, 'matriz-multiplicacion-matricial-B');
} );

////////////////////////////////multiplicacion por escalar////////////////////////////////////////////////////////////////////////

const handleCrearMultiplicacionEscalar=()=>{
    let sizeMatrizAMultiplicacionEscalar = document.getElementById("sizeMatrizAMultiplicacionEscalar").value;
    let valorKMultiplicacionEscalar = document.getElementById("valorKMultiplicacionEscalar").value;

    if(!Boolean(sizeMatrizAMultiplicacionEscalar) ||  !Boolean(valorKMultiplicacionEscalar)){
        alertDimensionesIncompletas();
        return;
    }

    if (sizeMatrizAMultiplicacionEscalar < 2 || sizeMatrizAMultiplicacionEscalar>10 ) {
        alertMinMaxDimensiones();
        return;
    }

    //ambas dimensiones estan
    let a=parseInt(sizeMatrizAMultiplicacionEscalar);
    let b=parseFloat(valorKMultiplicacionEscalar);

    // Ajusta la altura de la sección
    let seccionMultiplicacionEscalar = document.getElementById("multiplicacionEscalar");
    seccionMultiplicacionEscalar.style.height = "auto";

    const contenidoMultiplicacionEscalar= document.getElementById("contenidoMultiplicacionEscalar");

    if(contenidoMultiplicacionEscalar.hidden){
        contenidoMultiplicacionEscalar.hidden=false;
        seccionMultiplicacionEscalar.style.borderRadius= "20px";


        let matrixMultiplicacionEscalarA =createMatriz(a, a, 'matriz-multiplicacion-escalar-A');
        ///
        let inputMultiplicacionEscalarK = document.createElement('input');
        inputMultiplicacionEscalarK.type = "number";
        inputMultiplicacionEscalarK.step = "any";
        inputMultiplicacionEscalarK.id = "input-multiplicacion-escalar-k";
        inputMultiplicacionEscalarK.value = b;
        inputMultiplicacionEscalarK.style.width = "60px"; // opcional: ajuste visual

        //actualizacion
        inputMultiplicacionEscalarK.addEventListener("input", () => {
            document.getElementById("valorKMultiplicacionEscalar").value = inputMultiplicacionEscalarK.value;
        });

        document.getElementById("valorKMultiplicacionEscalar").addEventListener("input", () => {
            inputMultiplicacionEscalarK.value = document.getElementById("valorKMultiplicacionEscalar").value;
        });

        //containers
        let seccionMultiplicacionEscalarMatrizA   =document.getElementById("seccionMultiplicacionEscalarMatrizA");
        let seccionMultiplicacionEscalarK  =document.getElementById("seccionMultiplicacionEscalarK");
        let seccionMultiplicacionEscalarResultado= document.getElementById("seccionMultiplicacionEscalarResultado");
        

        seccionMultiplicacionEscalarMatrizA.innerHTML="Matriz A"
        seccionMultiplicacionEscalarK.innerHTML="Valor K"
        seccionMultiplicacionEscalarResultado.innerHTML="Matriz A x k"
        //
        seccionMultiplicacionEscalarMatrizA.appendChild(matrixMultiplicacionEscalarA);
        seccionMultiplicacionEscalarK.appendChild(inputMultiplicacionEscalarK);
        return;
    }
    else{
        clearMultiplicacionEscalar();
        return;
    }
};


const clearMultiplicacionEscalar = ()=>{
    //secciones
    const seccionMultiplicacionEscalarResultado= document.getElementById("seccionMultiplicacionEscalarResultado");
    const seccionMultiplicacionEscalarMatrizA=document.getElementById("seccionMultiplicacionEscalarMatrizA");
    const seccionMultiplicacionEscalarK=document.getElementById("seccionMultiplicacionEscalarK");
    //matrices
    const matrixMultiplicacionEscalarA=document.getElementById('matriz-multiplicacion-escalar-A');
    const inputMultiplicacionEscalarK=document.getElementById("input-multiplicacion-escalar-k");
    const matrixMultiplicacionEscalarResultado =document.getElementById('matriz-multiplicacion-escalar-resultado');

    //remove
    if (seccionMultiplicacionEscalarMatrizA.contains(matrixMultiplicacionEscalarA)) {seccionMultiplicacionEscalarMatrizA.removeChild(matrixMultiplicacionEscalarA)};
    if (seccionMultiplicacionEscalarK.contains(inputMultiplicacionEscalarK)) {seccionMultiplicacionEscalarK.removeChild(inputMultiplicacionEscalarK)};
    if (matrixMultiplicacionEscalarResultado && seccionMultiplicacionEscalarResultado.contains(matrixMultiplicacionEscalarResultado)) {seccionMultiplicacionEscalarResultado.removeChild(matrixMultiplicacionEscalarResultado)};
    //ocultar
    const contenidoMultiplicacionEscalar= document.getElementById("contenidoMultiplicacionEscalar");
    contenidoMultiplicacionEscalar.hidden=true;

    //reset fields
    document.getElementById("sizeMatrizAMultiplicacionEscalar").value = "";
    document.getElementById("valorKMultiplicacionEscalar").value = "";
    document.getElementById("valorKMultiplicacionEscalar").readOnly=false;
};

const handleResultadoMultiplicacionEscalar=()=>{
    const contenidoMultiplicacionEscalar= document.getElementById("contenidoMultiplicacionEscalar");
    //get elementos
    let matrixMultiplicacionEscalarA =document.getElementById('matriz-multiplicacion-escalar-A');
    let inputMultiplicacionEscalarK= document.getElementById("input-multiplicacion-escalar-k")
    
    if(!matrizCompleta('matriz-multiplicacion-escalar-A') && inputMultiplicacionEscalarK && document.getElementById("valorKMultiplicacionEscalar").value != ""){
        alertResultado();
        return;
    }
    //si estan las matrices completas, resuelve

    //size
    let sizeMatrizResultado= parseInt(document.getElementById("sizeMatrizAMultiplicacionEscalar").value);
    let k = parseFloat(document.getElementById("input-multiplicacion-escalar-k").value);

    //remove any previous thing
    const existingResult = document.getElementById("matriz-multiplicacion-escalar-resultado");
    if (existingResult) {existingResult.remove();}

    //ready to create
    const matrixMultiplicacionEscalarResultado=createMatriz(sizeMatrizResultado, sizeMatrizResultado,'matriz-multiplicacion-escalar-resultado');
    const seccionMultiplicacionEscalarResultado= document.getElementById("seccionMultiplicacionEscalarResultado");


    //adjunta
    seccionMultiplicacionEscalarResultado.appendChild(matrixMultiplicacionEscalarResultado);
    //llena 1
    for(let i = 1; i <=sizeMatrizResultado; i++){
        for(let j = 1; j <=sizeMatrizResultado; j++){
            let matrixCellR= document.getElementById(`matriz-multiplicacion-escalar-resultado_${i}_${j}`); 
            let matrixCellA= document.getElementById(`matriz-multiplicacion-escalar-A_${i}_${j}`);
            matrixCellR.value= Number((Number(matrixCellA.value)*k).toFixed(1));
        }
    }
};

const ResetMultiplicacionEscalar= ()=>{

    const matrices = [
        'matriz-multiplicacion-escalar-A',
    ];

    // Recorre cada matriz y limpia los valores
    matrices.forEach(id => {
        const matriz = document.getElementById(id);
        if (matriz) {
            const celdas = matriz.querySelectorAll("input");
            celdas.forEach(celda => celda.value = ""); // vacía cada input
        }
    });

    const seccionMultiplicacionEscalarResultado = document.getElementById("seccionMultiplicacionEscalarResultado");
    const matrixMultiplicacionEscalarResultado=document.getElementById('matriz-multiplicacion-escalar-resultado');

    const inputMultiplicacionEscalarK=document.getElementById("input-multiplicacion-escalar-k")

    if (seccionMultiplicacionEscalarResultado && seccionMultiplicacionEscalarResultado.contains(matrixMultiplicacionEscalarResultado)) 
    {
        seccionMultiplicacionEscalarResultado.removeChild(matrixMultiplicacionEscalarResultado);
        seccionRestaResultado2.removeChild(matrixRestaResultado2);
    };
    inputMultiplicacionEscalarK.value="";
    
};

const btCrearMultiplicacionEscalar=document.getElementById("crearMultiplicacionEscalar");
btCrearMultiplicacionEscalar.addEventListener("click", handleCrearMultiplicacionEscalar);

const btResultadoMultiplicacionEscalar=document.getElementById("btResultadoMultiplicacionEscalar");
btResultadoMultiplicacionEscalar.addEventListener("click", handleResultadoMultiplicacionEscalar);

const  btLimpiarMultiplicacionEscalar= document.getElementById("btLimpiarMultiplicacionEscalar");
btLimpiarMultiplicacionEscalar.addEventListener("click", ResetMultiplicacionEscalar);

const  btGenerarMultiplicacionEscalar= document.getElementById("btGenerarValoresMultiplicacionEscalar");
btGenerarMultiplicacionEscalar.addEventListener("click", ()=>{
    const inputK = document.getElementById("input-multiplicacion-escalar-k");

    if(!matrizEmpty('matriz-multiplicacion-escalar-A') || (inputK && inputK.value != "")){
        alertaVaciar();
        return;
    }

    let sizeMatrizAMultiplicacionEscalar = document.getElementById("sizeMatrizAMultiplicacionEscalar").value;
    handleGenerarValores(sizeMatrizAMultiplicacionEscalar, sizeMatrizAMultiplicacionEscalar, 'matriz-multiplicacion-escalar-A');

    if(inputK){
        inputK.value = randomNumberForCell();
        document.getElementById("valorKMultiplicacionEscalar").value = inputK.value;
    }
});

//////////////////////////////////////////matriz Transpuesta////////////////////////////////////////////


const handleCrearTranspuesta=()=>{
    let sizeMatrizATranspuesta = document.getElementById("sizeMatrizATranspuesta").value;

    if(!Boolean(sizeMatrizATranspuesta)){
        alertDimensionesIncompletas();
        return;
    }

    if (sizeMatrizATranspuesta < 2 || sizeMatrizATranspuesta > 10) {
        alertMinMaxDimensiones();
        return;
    }

    //ambas dimensiones estan
    let a=parseInt(sizeMatrizATranspuesta);

    // Ajusta la altura de la sección
    let seccionTranspuesta= document.getElementById("Transpuesta");
    seccionTranspuesta.style.height = "auto";

    const contenidoTranspuesta= document.getElementById("contenidoTranspuesta");

    if(contenidoTranspuesta.hidden){
        contenidoTranspuesta.hidden=false;
        seccionTranspuesta.style.borderRadius= "20px";


        let matrixTranspuestaA =createMatriz(a, a, 'matriz-transpuesta-A');
        //containers
        let seccionSumaMatrizA=document.getElementById("seccionTranspuestaMatrizA");
        let seccionTranspuestaResultado = document.getElementById("seccionTranspuestaResultado");
    
        //clear any existing matrices( prevent duplicates)
        seccionTranspuestaMatrizA.innerHTML="Matriz A"
        seccionTranspuestaResultado.innerHTML="<p>A<sup>t</sup></p>";
        //
        seccionTranspuestaMatrizA.appendChild(matrixTranspuestaA);
        return;
    }
    else{
        clearTranspuesta();
        return;
    }

};


const handleResultadoTranspuesta=()=>{
    const contenidoTranspuesta= document.getElementById("contenidoTranspuesta");
    
    if(!matrizCompleta('matriz-transpuesta-A')){
        alertResultado();
        return;
    }
    //si esta la matriz completa, resuelve

    let matrixTranspuestaA=document.getElementById('matriz-transpuesta-A');

    //size
    let sizeMatrizResultado= parseInt(document.getElementById("sizeMatrizATranspuesta").value);
    const seccionTranspuestaResultado = document.getElementById("seccionTranspuestaResultado");
    //remove any previous thing
    const existingResult = document.getElementById("matriz-transpuesta-resultado");
    if (existingResult) {existingResult.remove();}

    //ready to create
    const matrixTranspuestaResultado= createMatriz(sizeMatrizResultado, sizeMatrizResultado, 'matriz-transpuesta-resultado');
    //adjunta
    seccionTranspuestaResultado.appendChild(matrixTranspuestaResultado);
    seccionTranspuestaResultado.hidden=false;
    //llena
    for(let i = 1; i <=sizeMatrizResultado; i++){
        for(let j = 1; j <=sizeMatrizResultado; j++){
            let matrixCellR= document.getElementById(`matriz-transpuesta-resultado_${i}_${j}`); 
            let matrixCellA= document.getElementById(`matriz-transpuesta-A_${j}_${i}`);
            matrixCellR.value= Number(matrixCellA.value);
        }
    }
};

const clearTranspuesta = ()=>{
    //secciones
    const seccionTranspuestaResultado = document.getElementById("seccionTranspuestaResultado");
    const seccionTranspuestaMatrizA=document.getElementById("seccionTranspuestaMatrizA");
    //matrices
    const matrixTranspuestaA=document.getElementById('matriz-transpuesta-A');
    const matrixTranspuestaResultado=document.getElementById('matriz-transpuesta-resultado');

    //remove
    if (seccionTranspuestaMatrizA.contains(matrixTranspuestaA)) {seccionTranspuestaMatrizA.removeChild(matrixTranspuestaA)};
    if (seccionTranspuestaResultado && seccionTranspuestaResultado.contains(matrixTranspuestaResultado)) {seccionTranspuestaResultado.removeChild(matrixTranspuestaResultado)};
    //ocultar
    const contenidoTranspuesta= document.getElementById("contenidoTranspuesta");
    contenidoTranspuesta.hidden=true;

    //reset fields
    document.getElementById("sizeMatrizATranspuesta").value = "";
};


const ResetTranspuesta= ()=>{

    const matrices = [
        'matriz-transpuesta-A'
    ];

    // Recorre cada matriz y limpia los valores
    matrices.forEach(id => {
        const matriz = document.getElementById(id);
        if (matriz) {
            const celdas = matriz.querySelectorAll("input");
            celdas.forEach(celda => celda.value = ""); // vacía cada input
        }
    });

    const seccionTranspuestaResultado = document.getElementById("seccionTranspuestaResultado");
    const matrixTranspuestaResultado=document.getElementById('matriz-transpuesta-resultado');

    if (matrixTranspuestaResultado && seccionTranspuestaResultado.contains(matrixTranspuestaResultado)) 
    {
        seccionTranspuestaResultado.removeChild(matrixTranspuestaResultado);
    };
    
};

const btCrearTranspuesta=document.getElementById("crearTranspuesta");
btCrearTranspuesta.addEventListener("click", handleCrearTranspuesta);

const btResultadoTranspuesta=document.getElementById("btResultadoTranspuesta");
btResultadoTranspuesta.addEventListener("click", handleResultadoTranspuesta);

const  btLimpiarTranspuesta= document.getElementById("btLimpiarTranspuesta");
btLimpiarTranspuesta.addEventListener("click", ResetTranspuesta);

const  btGenerarTranspuesta= document.getElementById("btGenerarValoresTranspuesta");
btGenerarTranspuesta.addEventListener("click", ()=>{

    if(!matrizEmpty('matriz-transpuesta-A') ){
        alertaVaciar();
        return;
    }
    let sizeMatrizATranspuesta= parseInt(document.getElementById("sizeMatrizATranspuesta").value);

    handleGenerarValores(sizeMatrizATranspuesta, sizeMatrizATranspuesta, 'matriz-transpuesta-A');
} );

/////////////////////////////////////////////////matriz Inversa///////////////////////////////////////////


const handleCrearMatrizID=()=>{
    let sizeMatrizID = document.getElementById("sizeMatrizID").value;

    if(!Boolean(sizeMatrizID)){
        alertDimensionesIncompletas();
        return;
    }

    if (sizeMatrizID < 2 ||  sizeMatrizID > 10) {
        alertMinMaxDimensiones();
        return;
    }

    //las dimensiones estan
    let a=parseInt(sizeMatrizID);


    // Ajusta la altura de la sección
    let seccionMatrizID = document.getElementById("matrizID");
    seccionMatrizID.style.height = "auto";

    const contenidoMatrizID= document.getElementById("contenidoMatrizID");

    if(contenidoMatrizID.hidden){
        contenidoMatrizID.hidden=false;
        seccionMatrizID.style.borderRadius= "20px";


        let matrizID =createMatriz(a, a, 'matriz-ID');
        //containers
        let seccionMatrizIDResultado = document.getElementById("seccionMatrizIDResultado");
    
        //clear any existing matrices( prevent duplicates)
        seccionMatrizIDResultado.innerHTML="";
        //
        seccionMatrizIDResultado.appendChild(matrizID);

        for(let i = 1; i <=a; i++){
            for(let j = 1; j <=a; j++){
                let matrixCellR= document.getElementById(`matriz-ID_${i}_${j}`);
                if (i==j){
                    matrixCellR.value=1;
                }
                else{
                    matrixCellR.value=0;
                }
                matrixCellR.readOnly=true;
            }
        }
        return;
    }
    else{
        clearMatrizID();
        return;
    }
};


const clearMatrizID = ()=>{
    //secciones
    let contenidoMatrizID= document.getElementById("contenidoMatrizID");
    let seccionMatrizIDResultado = document.getElementById("seccionMatrizIDResultado");
    //matrices
    const matrizID=document.getElementById('matriz-ID');

    //remove
    if (seccionMatrizIDResultado.contains(matrizID)) {seccionMatrizIDResultado.removeChild(matrizID)};
    //ocultar
    contenidoMatrizID.hidden=true;

    //reset fields
    document.getElementById("sizeMatrizID").value="";
};

const btCrearMatrizID=document.getElementById("crearMatrizID");
btCrearMatrizID.addEventListener("click", handleCrearMatrizID);


const  btLimpiarMatrizID= document.getElementById("btLimpiarMatrizID");
btLimpiarMatrizID.addEventListener("click", clearMatrizID);

//////////////////////////////////////Determinante/////////////////////////////

