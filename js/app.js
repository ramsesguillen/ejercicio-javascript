
const formulario = document.querySelector('#formulario');
const inputSearch = document.querySelector('#search');
const tBodyResult = document.querySelector('#tBodyResult');


const API_KEY = '18604097-d314034e3a4bab3b9373cd1bb';
const  URL = "https://pixabay.com/api/?key="+API_KEY+"&q="+encodeURIComponent('red roses');



const buscarImagen = async ( e ) => {
    e.preventDefault();
    if ( inputSearch.value === '' ) {
        alertaError('Escrbe algo, por favor...')
        return;
    }
    agregarSpinner();
    const imagenes = await consultarAPI( inputSearch.value );
    limpiarHTML();
    mostrarHTML( imagenes );
}
  
const mostrarHTML = ( imagenes ) => {
    if ( document.querySelector('.spinner') ) {
        document.querySelector('.spinner').remove();
    }
    imagenes.forEach( (imagen, index) => {
        const tr = document.createElement('tr');
        const { id, user, previewURL } = imagen;

        tr.innerHTML = `
            <td>${ index }</td>
            <td>${ id }</td>
            <td>${ user }</td>
            <td><img src="${ previewURL }" alt="${id}"></td>
        `;

        tBodyResult.appendChild( tr );
    });
}

const agregarSpinner = () => {
    const spinner = document.createElement('div');
    spinner.classList.add('spinner')
    spinner.innerHTML = `
        <div class="sk-chase">
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        <div class="sk-chase-dot"></div>
        </div>
    `;
    formulario.appendChild( spinner );
}

const consultarAPI = async ( search ) => {
    const url = `https://pixabay.com/api/?key=${API_KEY}&q=${encodeURIComponent( search )}`
    try {
        const resp = await fetch( url );
        const { hits } = await resp.json();
        return hits;
    } catch (error) {
        console.log(error);
    }
}

const alertaError = mensaje => {
    if ( document.querySelector('.alerta-error-num_contro') ) {
        document.querySelector('.alerta-error-num_contro').remove();
    }
    const alertaError = document.createElement('div');
    alertaError.classList.add('alert', 'alert-danger', 'my-3', 'alerta-error-num_contro');
    alertaError.textContent = mensaje;
    formulario.appendChild( alertaError );

    setTimeout(() => {
        alertaError.remove();
    }, 2000);
}

const limpiarHTML = () => {
    while ( tBodyResult.firstChild) {
        tBodyResult.removeChild(tBodyResult.firstChild);
    }
}

// Boton
const botonModal = () => {
    const boton = document.createElement('button');
    boton.textContent = 'Modal';
    boton.classList.add('btn', 'btn-primary');
    boton.setAttribute('type', 'button');
    boton.setAttribute('data-toggle', 'modal');
    boton.setAttribute('data-target', '#exampleModal');
    console.log( boton );
    return boton;
}

// Modal
const modal = () => {
    // Pimer  div
    const modal = document.createElement('div');
    modal.classList.add('modal', 'fade');
    modal.id = 'exampleModal';
    modal.setAttribute('tabindex', '-1');
    modal.setAttribute('role', 'document');
    modal.setAttribute('aria-hidden', 'true');

    // Segundo div
    const modalDialog = document.createElement('div');
    modalDialog.classList.add('modal-dialog');
    modalDialog.setAttribute('role', 'dialog');
    // Tercer div
    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');

    // Header del modal
    const modalHeader = document.createElement('div');
    modalHeader.classList.add('modal-header');

    const tituloModal = document.createElement('h5');
    tituloModal.classList.add('modal-title');
    tituloModal.textContent = 'Constancia';
    modalHeader.appendChild( tituloModal );
    const botonCerrar = document.createElement('button');
    botonCerrar.classList.add('close');
    botonCerrar.setAttribute('type', 'button');
    botonCerrar.setAttribute('data-dismiss', 'modal');
    botonCerrar.setAttribute('aria-label', 'Close');
    botonCerrar.innerHTML = `<span aria-hidden="true">&times;</span>`;
    modalHeader.appendChild( botonCerrar );

    modalContent.appendChild( modalHeader );

    // BOdy del modal
    const modalBody = document.createElement('div');
    modalBody.classList.add('modal-body');
    modalBody.appendChild( form() );

    modalContent.appendChild( modalBody );
    // Footer del modal
    const modalFooter = document.createElement('div');
    modalFooter.classList.add('modal-footer');
    const botonCancelar = document.createElement('button');
    botonCancelar.textContent = 'Cancelar';
    botonCancelar.classList.add('btn', 'btn-secondary');
    botonCancelar.setAttribute('type', 'button');
    botonCancelar.setAttribute('data-dismiss', 'modal');
    modalFooter.appendChild( botonCancelar );

    const botonAceptar = document.createElement('button');
    botonAceptar.textContent = 'Generar PDF';
    botonAceptar.classList.add('btn', 'btn-primary');
    botonAceptar.setAttribute('type', 'button');
    modalFooter.appendChild( botonAceptar );


    modalContent.appendChild( modalFooter );
    modalDialog.appendChild( modalContent)
    modal.appendChild( modalDialog );

    console.log( modal )
    return modal;
}

const form = () => {
    const formulario = document.createElement('form');

    const divControl = document.createElement('div');
    divControl.classList.add('form-group');
    const labelControl = label('* N° control', 'control');
    const inputControl = input('control', 'control', true, '');
    divControl.appendChild( labelControl );
    divControl.appendChild( inputControl );
    formulario.appendChild( divControl );

    const divFolio = document.createElement('div');
    divFolio.classList.add('form-group');
    const labelFolio = label('* Agrega el folio', 'folio');
    const inputFolio = input('folio', 'folio', false, 'FOLIO AQUI..');
    divFolio.appendChild( labelFolio );
    divFolio.appendChild( inputFolio );
    formulario.appendChild( divFolio );

    return formulario;
}

const label = (texto, f ) => {
    const label = document.createElement('label');
    label.setAttribute('for', f );
    label.textContent = texto;
    return label;
}
const input = (id, name, status, placeholder) => {
    const input = document.createElement('input');
    input.classList.add('form-control');
    input.id = id;
    input.setAttribute('type', 'text' );
    input.setAttribute('name', name );
    (status) &&  input.setAttribute('disabled', status );
    input.setAttribute('placeholder',placeholder);
    return input;
}


formulario.addEventListener('submit', buscarImagen );
formulario.appendChild( botonModal() );

// botonModal();
const modal1 = modal();
document.querySelector('body').appendChild( modal1 );