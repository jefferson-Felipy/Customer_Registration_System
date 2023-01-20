const btn_form_cad_open = document.querySelector('.btn_form_cad_open');
const cad_clientes = document.querySelector('.cad_clientes');
const btn_cad_closed = document.querySelector('.btn_cad_closed');


btn_form_cad_open.addEventListener('click',() => {
    cad_clientes.style.display = 'block';
});

btn_cad_closed.addEventListener('click',() => {
    cad_clientes.style.display = 'none';
});