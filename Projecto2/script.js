class inicioInput {
            constructor(descripcion, inputType ) {
                this.descripcion = descripcion;
                this.inputType = inputType;
            }

            render() {
                const inputSection = document.createElement("div");
                const descripcion= document.createElement("p");
                descripcion.textContent = this.descripcion;
                const input= document.createElement("input");
                input.type=this.inputType;

                inputSection.appendChild(descripcion);
                inputSection.appendChild(input);

                return inputSection;
            }
        }

class groverText{
    constructor(text, colorIn, colorOut, size){
        this.text=text;
        this.colorIn=colorIn;
        this.colorOut=colorOut;
        this.size=size;
    }

    render(){
        const text = document.createElement("p");
        text.textContent = this.text; // Set the text content
        // CSS styling
        text.style.margin = '0';
        text.style.fontFamily = 'Irish Grover';
        text.style.fontSize = `${this.size}px`;
        text.style.color = this.colorIn;
        text.style.textShadow = '2px 2px 4px rgba(0,0,0,0.3)'; /* sombra del texto */
        text.style.webkitTextStroke = `1px ${this.colorOut}`;

        return text; // Return the DOM element
    }
}

/////////////////adding///////////////////////

const gameName = document.getElementById("gameName");

const gameNameText = new groverText(
    "¡Bienvenidos a este Trivia game!",
    "rgb(255, 255, 255)",
    "rgb(249, 204, 59)",
   38
);

const renderedText = gameNameText.render();
gameName.appendChild(renderedText);