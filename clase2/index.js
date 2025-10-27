console.log(document)
console.log(document.body)

let btn=document.getElementById("miBtton")
console.log(btn)
btn.style.color="blue";

let div= document.createElement("div")
console.log(div)
div.style.backgroundColor="red"
div.innerHTML="<p>hola</p>"
document.body.appendChild(div)

let i=0
function crear(){
    const btn=document.createElement("button")
    btn.value=i;
    i++
    return btn
}

//while(true){
//    document.body.appendChild(crear())
//}

div.addEventListener('hover', ()=>{
    document.body.appendChild(crear())
});