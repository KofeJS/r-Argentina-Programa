/*
TAREA 1: Empezar preguntando cuánta gente hay en el grupo familiar.
Crear tantos inputs+labels como gente haya para completar la edad de cada integrante.
Al hacer click en "calcular", mostrar en un elemento pre-existente la mayor edad, la menor edad y el promedio del grupo familiar.

Punto bonus: Crear un botón para "empezar de nuevo" que empiece el proceso nuevamente, borrando los inputs ya creados (investigar cómo en MDN).
*/

/*
TAREA 2:
Crear una interfaz que permita agregar ó quitar (botones agregar y quitar) inputs+labels para completar el salario anual de cada integrante 
de la familia que trabaje.
Al hacer click en "calcular", mostrar en un elemento pre-existente el mayor salario anual, menor salario anual, salario anual promedio y 
salario mensual promedio.

Punto bonus: si hay inputs vacíos, ignorarlos en el cálculo (no contarlos como 0).
*/


document.querySelector("#boton-continuar").onclick = function() {
    const numeroIntegrantes = Number(document.querySelector("#numero-integrantes").value);

    borrarIntegrantesAnteriores();
    mostrarMensajeCbox();
    crearIntegrantes(numeroIntegrantes);
    mostrarBotonCalculo();

    return false;
}

document.querySelector("#calcular").onclick = function() {
    const $edades = document.querySelectorAll(".edad-integrantes");
    let edades = [];
    for (let i = 0; i < $edades.length; i++) {
        if  ($edades[i].value > 0) {
            edades.push(Number($edades[i].value));
        }
    }

    const $salarios = document.querySelectorAll(".salario");
    let salarios = [];
    for (let i = 0; i < $salarios.length; i++) {
        if  ($salarios[i].value > 0) {
            salarios.push(Number($salarios[i].value)); 
        }
    }

    edades[0] !== null && edades[0] > 0 ? calculosEdades(edades) : ocultarResultadosEdades();
    salarios[0] !== null && salarios[0] > 0 ? calculosSalarios(salarios) : ocultarResultadosSalarios();
    
    return false;
}

document.querySelector("#resetear").onclick = function() {
    document.querySelector("#numero-integrantes").value = 0;
    
    mostrarBotonCalculo();
    mostrarMensajeCbox();
    borrarIntegrantesAnteriores();
    ocultarResultadosEdades();
    ocultarResultadosSalarios()
}



function crearIntegrantes(limiteIntegrantes) {
    for (let i = 1; i <= limiteIntegrantes; i++) {
        const $div = document.createElement("div");
        $div.className = "div-integrante";

        const $labels = document.createElement("label");
        $labels.textContent = `Edad del integrante ${i}:`;
        const $inputs = document.createElement("input");
        $inputs.className = "edad-integrantes";
        $inputs.type = "number";

        const $inputSalarioAnual = document.createElement("input");
        $inputSalarioAnual.placeholder = `Ingrese el salario anual`;
        $inputSalarioAnual.type = "number";
        $inputSalarioAnual.className = "oculto";

        const $cboxTrabajo = document.createElement("input");
        $cboxTrabajo.type = "checkbox";
        $cboxTrabajo.addEventListener("click", function(){mostrarInputSalario($cboxTrabajo, $inputSalarioAnual)});


        $div.appendChild($labels);
        $div.appendChild($inputs);
        $div.appendChild($cboxTrabajo);
        $div.appendChild($inputSalarioAnual);

        document.querySelector("#integrantes").appendChild($div);
    }
}

function borrarIntegrantesAnteriores() {
    const $integrantes = document.querySelectorAll(".div-integrante");
    for (let i = 0; i < $integrantes.length; i++) {
        $integrantes[i].remove();
    }
}



function calculosEdades(edades) {
    document.querySelector("#integrante-mayor").innerText = calcularNumeroMayor(edades);
    document.querySelector("#integrante-menor").innerText = calcularNumeroMenor(edades);
    document.querySelector("#promedio-edades").innerText = calcularPromedioNumeros(edades);
    mostrarResultadosEdades();
}

function calculosSalarios(salarios) {
    document.querySelector("#salario-mayor").innerText = calcularNumeroMayor(salarios);
    document.querySelector("#salario-menor").innerText = calcularNumeroMenor(salarios);
    document.querySelector("#salario-anual-promedio").innerText = calcularPromedioNumeros(salarios);
    document.querySelector("#salario-mensual-promedio").innerText = calcularSalarioMensualPromedio(salarios);
    mostrarResultadosSalarios()
}



function mostrarInputSalario($cbox, $input) {
    $cbox.checked ? $input.className = "salario" : $input.className = "oculto";
}

function mostrarBotonCalculo() {
    const numeroIntegrantes = Number(document.querySelector("#numero-integrantes").value);
    if (numeroIntegrantes === 0) {
        document.querySelector("#calcular").className = "oculto";
    } else {
        document.querySelector("#calcular").className = "";
    }
}

function mostrarMensajeCbox() {
    const numeroIntegrantes = Number(document.querySelector("#numero-integrantes").value);
    if (numeroIntegrantes === 0) {
        document.querySelector("#cbox-trabajo").className = "oculto";
    } else {
        document.querySelector("#cbox-trabajo").className = "parrafo";    
    }
}



function mostrarResultadosEdades() {
    document.querySelector("#resultados-edades").className = "";
}
function ocultarResultadosEdades() {
    document.querySelector("#resultados-edades").className = "oculto";
}

function mostrarResultadosSalarios() {
    document.querySelector("#resultados-salarios").className = "";
}
function ocultarResultadosSalarios() {
    document.querySelector("#resultados-salarios").className = "oculto";
}
