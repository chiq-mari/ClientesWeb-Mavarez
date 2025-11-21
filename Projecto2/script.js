class inicioInput {
            constructor(descripcion, inputType ) {
                this.descripcion = descripcion;
                this.inputType = inputType;
            }

            render() {
                const inputSection = document.createElement("div");
                const descripcion= document.createElement("p");
                const input= document.createElement("input");
                input.type=this.inputType;

                inputSection.appendChild(descripcion);
                inputSection.appendChild(input);

                return input;
            }
        }

        const it1= new inicioInput("Nombre del jugador", "text")
        document.body.appendChild()