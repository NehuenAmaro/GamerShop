'use strict'
let items = document.querySelector('#items')
let botonVaciar = document.querySelector('#boton-vaciar');
let botonComprar = document.querySelector('#boton-comprar')
let listaProductos = document.querySelector('#listitems')
let navProductos = document.querySelector('#productosNav')
let total1 = document.querySelector('#total');
let carrito = []
let total = 0;

let catalogo = [
    {
        ID: 0,
        Nombre: 'GABINETE CORSAIR CARBIDE SPEC DELTA RGB',
        Imagen: './imagenes/gabinete.jpg',
        Descripcion: 'Gabinete MID Tower',
        Precio: 14.290,
    },
    {
        ID: 1,
        Nombre: 'MOUSE LOGITECH G203',
        Imagen: './imagenes/mouselg.jpg',
        Descripcion: 'Mouse RGB 6800DPI',
        Precio: 3.922,
    },
    {
        ID: 2,
        Nombre: 'VIDEO GEFORCE GTX 1650 4GB MSI VENTUS XS OC',
        Imagen: './imagenes/placavideo.jpg',
        Descripcion: 'Tarjeta Grafica MSI',
        Precio: 22.059,
    },
    {
        ID: 3,
        Nombre: 'TECLADO GX GENIUS SCORPION K8',
        Imagen: './imagenes/teclado.jpg',
        Descripcion: 'Teclado GX de Membrana',
        Precio: 2.341,
    },
    {
        ID: 4,
        Nombre: 'DISCO HDD 1TB SATA3 SEAGATE BARRACUDA',
        Imagen: './imagenes/disco.jpg',
        Descripcion: 'Disco Rigido de 1TB',
        Precio: 4.593,
    },
    {
        ID: 5,
        Nombre: 'TECLADO HYPERX ALLOY FPS PRO CHERRY RED',
        Imagen: './imagenes/teclado2.jpg',
        Descripcion: 'Teclado Mecanico Hyperex',
        Precio: 7.599,
    },
    {
        ID: 6,
        Nombre: 'AURICULAR LOGITECH PRO GAMING C',
        Imagen: './imagenes/auricular.jpg',
        Descripcion: 'Auriculares Wireless Logitech',
        Precio: 14.441,
    },
    {
        ID: 7,
        Nombre: 'WEBCAM LOGITECH C922 PRO STREAM HD + TRIPODE',
        Imagen: './imagenes/webcam.jpg',
        Descripcion: 'Webcam Full HD Logitech',
        Precio: 11.889,
    },
    {
        ID: 8,
        Nombre: 'MICROFONO TRUST EXXO STREAMING GXT256',
        Imagen: './imagenes/microfono.jpg',
        Descripcion: 'Microfono de Mesa Trust',
        Precio: 19.731,
    },
    {
        ID: 9,
        Nombre: 'MONITOR 24" MSI OPTIX G24C4 CURVO 144Hz',
        Imagen: './imagenes/monitor.jpg',
        Descripcion: 'Monitor 24" 144Hz',
        Precio: 54.917,
    },
]
catalogo.forEach(producto=>draw(producto))

function draw(info) {
    let card = document.createElement('div')
    card.setAttribute('id', info['ID'])
    card.classList.add('card','col-sm-2')

    let productos = document.createElement('div')
    productos.classList.add('card-body', 'align-items-center', 'd-flex', 'row')

    let titulo = document.createElement('h2')
    titulo.classList.add('card-title','h5')
    titulo.textContent = info['Nombre']

    let imagen = document.createElement('img')
    imagen.classList.add('img-fluid','pb-5')
    imagen.setAttribute('src', info['Imagen'])

    let precio = document.createElement('p')
    precio.classList.add('card-text')
    precio.textContent = info['Precio'] + '$'

    let btnSuma = document.createElement('button')
    btnSuma.classList.add('btn','btn-dark','btn-block')
    btnSuma.textContent = '+'
    btnSuma.setAttribute('marcador', info['ID'])
    btnSuma.addEventListener('click', AgregarCarrito)

    let btnVerMas = document.createElement('button')
    btnVerMas.classList.add('btn','btn-outline-dark','btn-block')
    btnVerMas.textContent = 'Ver Más'
    btnVerMas.setAttribute('marcador', info['ID'])
    btnVerMas.addEventListener('click', Ampliar)

    productos.appendChild(titulo)
    productos.appendChild(imagen)
    productos.appendChild(precio)
    productos.appendChild(btnSuma)
    productos.appendChild(btnVerMas)
    card.appendChild(productos)
    items.appendChild(card)
}

function Ampliar(){
    let info = catalogo[this.getAttribute('marcador')]

    let fademodal = document.createElement('div')
    fademodal.classList.add('fade-modal','fixed-top','justify-content-center','align-items-center','d-flex','container-fluid')
    document.querySelector('body').style.overflow = 'hidden'

    let modale = document.createElement('div')
    modale.classList.add('bg-light','row','p-3')

    let headerModal = document.createElement('div')
    headerModal.classList.add('h-25','mt-3','col-12','d-flex','justify-content-between')
    let title = document.createElement('h2')
    title.classList.add('h4','h-25')
    title.textContent = info['Nombre'] 

    let btnCerrar = document.createElement('button')
    btnCerrar.classList.add('btn','btn-danger','h-25')
    btnCerrar.textContent = 'Cerrar'
    btnCerrar.addEventListener('click', CerrarModal)

    let divImg = document.createElement('div')
    divImg.classList.add('text-center','col-5')

    let imgProducto = document.createElement('img')
    imgProducto.setAttribute('src', info['Imagen'])

    let divDesc = document.createElement('div')
    divDesc.classList.add('col-3','offset-1')

    let descripcion = document.createElement('p')
    descripcion.textContent = info['Descripcion']


    let btnMagregar = document.createElement('button')
    btnMagregar.classList.add('btn','btn-outline-dark','btn-block')
    btnMagregar.textContent = 'Agregar al Carrito'
    btnMagregar.setAttribute('marcador', info['ID'])
    btnMagregar.addEventListener('click', AgregarCarrito)

    modale.appendChild(headerModal)
    headerModal.appendChild(title)
    headerModal.appendChild(btnCerrar)

    divImg.appendChild(imgProducto)
    modale.appendChild(divImg)

    divDesc.appendChild(descripcion)
    divDesc.appendChild(btnMagregar)
    modale.appendChild(divDesc)

    fademodal.appendChild(modale)
    document.querySelector('body').appendChild(fademodal)
}

function AgregarCarrito() {
    carrito.push(this.getAttribute('marcador'))
    calcularTotal()
    CargarProductos()
}

function CargarProductos() {
    listaProductos.textContent = '';
    navProductos.textContent = '';

    let agruparProductos = [...new Set(carrito)]

    agruparProductos.forEach(function (item) {

        let miItem = catalogo.filter(function(itemcatalogo) {
            return itemcatalogo['ID'] == item;
        });

        let numeroUnidades = carrito.reduce(function (total, itemId) {
            return itemId === item ? total += 1 : total;
        }, 0)

        let itemsNav = document.createElement('p');
        itemsNav.classList.add('text-light');
        itemsNav.textContent = `${numeroUnidades}-`;

        let itemsList = document.createElement('li');
        itemsList.classList.add('list-group-item', 'text-right', 'mx-2');
        itemsList.textContent = `${numeroUnidades} x ${miItem[0]['Nombre']} - u/${miItem[0]['Precio']}$`;

        let miBoton = document.createElement('button');
        miBoton.classList.add('btn', 'btn-danger', 'mx-5');
        miBoton.textContent = 'X';
        miBoton.style.marginLeft = '1rem';
        miBoton.setAttribute('item', item);
        miBoton.addEventListener('click', borrarItemCarrito);

        navProductos.appendChild(itemsNav)
        itemsList.appendChild(miBoton);
        listaProductos.appendChild(itemsList)
    })
}

botonComprar.addEventListener('click', DatosCompra)
function DatosCompra(){

    let fademodal = document.createElement('div')
    fademodal.classList.add('fade-modal','fixed-top','justify-content-center','align-items-center','d-flex','container-fluid')
    document.querySelector('body').style.overflow = 'hidden'

    let modale = document.createElement('div')
    modale.classList.add('bg-light','p-3','modalpago','text-center')

    let datos = document.createElement('h2')
    datos.textContent = 'Datos de Compra'

    let asideForm = document.createElement('aside')
    asideForm.classList.add('contact','col-11','m-auto')

    let form = document.createElement('form')
    form.classList.add('m-auto','p-3')
    form.setAttribute('action','#')
    form.setAttribute('onsubmit', 'return Validacion()');

    let inpName = document.createElement('input')
    inpName.setAttribute('name','Nombre')
    inpName.setAttribute('type','text')
    inpName.setAttribute('placeholder','Nombre')
    inpName.setAttribute('id','nameV')

    let inpTel = document.createElement('input')
    inpTel.classList.add('my-4')
    inpTel.setAttribute('name','telefono')
    inpTel.setAttribute('type','tel')
    inpTel.setAttribute('placeholder','Telefono')

    let inpMail = document.createElement('input')
    inpMail.setAttribute('name','email')
    inpMail.setAttribute('type','email')
    inpMail.setAttribute('placeholder','Email')

    let inpDirec = document.createElement('input')
    inpDirec.classList.add('my-4')
    inpDirec.setAttribute('name','email')
    inpDirec.setAttribute('type','text')
    inpDirec.setAttribute('placeholder','Lugar de entrega')
    inpDirec.setAttribute('id','direcV')

    let inpCodigo = document.createElement('input')
    inpCodigo.setAttribute('name','codigoArea')
    inpCodigo.setAttribute('type','number')
    inpCodigo.setAttribute('placeholder','Codigo de Area')

    let inpTarjeta = document.createElement('input')
    inpTarjeta.classList.add('mt-4')
    inpTarjeta.setAttribute('name','tarjeta')
    inpTarjeta.setAttribute('type','number')
    inpTarjeta.setAttribute('placeholder','Ingrese el numero de Tarjeta')

    let label = document.createElement('label')
    label.classList.add('my-4','mr-3')
    label.textContent = 'Horario de Entrega:'
    label.setAttribute('for','horario')

    let select = document.createElement('select')
    select.setAttribute('name','horario')

    let opcion1 = document.createElement('option')
    opcion1.textContent = '07:00 - 12:00'
    opcion1.setAttribute('value','mañana')

    let opcion2 = document.createElement('option')
    opcion2.textContent = '12:00 - 17:00'
    opcion2.setAttribute('value','tarde')

    let opcion3 = document.createElement('option')
    opcion3.textContent = '17:00 - 21:00'
    opcion3.setAttribute('value','noche')

    let inpSend = document.createElement('input')
    inpSend.classList.add('btn','btn-primary')
    inpSend.setAttribute('value','Finalizar Compra')
    inpSend.setAttribute('type','submit')

    let divalert = document.createElement('div')
    divalert.setAttribute('id','divalert')


    let btnCerrar = document.createElement('button')
    btnCerrar.classList.add('btn','border','border-secondary','mt-4')
    btnCerrar.textContent = 'Cancelar Compra'
    btnCerrar.addEventListener('click', CerrarModal)

    let elementos = [inpName,inpTel,inpMail,inpDirec,inpCodigo,inpTarjeta,label,select,inpSend]
    elementos.forEach(elementos => form.appendChild(elementos))

    select.appendChild(opcion1)
    select.appendChild(opcion2)
    select.appendChild(opcion3)
    asideForm.appendChild(form)
    modale.appendChild(datos)
    modale.appendChild(asideForm)
    modale.appendChild(divalert)
    modale.appendChild(btnCerrar)
    fademodal.appendChild(modale)
    document.querySelector('body').appendChild(fademodal)
}

function Validacion() {
    let nombre = document.querySelector('#nameV')
    let textoAlert = document.getElementById('divalert')
    let direccion = document.querySelector('#direcV')
    console.log(nombre.value)
    if(nombre.value == ""){
        nombre.classList.add('border-danger')
        let alerta = document.createElement('p')
        alerta.classList.add('text-danger')
        alerta.textContent = 'Debe ingresar un nombre'
        textoAlert.appendChild(alerta)
    }else {
        return true
    }
    if(direccion.value == ""){
        direccion.classList.add('border-danger')
        let alerta = document.createElement('p')
        alerta.classList.add('text-danger')
        alerta.textContent = 'Debe ingresar una direccion valida'
        textoAlert.appendChild(alerta)
    }else {
        return true
    }
    return false
}

function CerrarModal() {
    document.querySelector('.fade-modal').remove()
    document.querySelector('body').style.overflow = ''
}

function borrarItemCarrito() {
    let id = this.getAttribute('item')
    carrito = carrito.filter(function (carritoId) {
        return carritoId !== id;
    })
    CargarProductos()
    calcularTotal()
}

botonVaciar.addEventListener('click', vaciarCarrito);
function vaciarCarrito() {
    carrito = []
    CargarProductos()
    calcularTotal()
}

function calcularTotal() {
    total = 0;

    for (let item of carrito) {

        let miItem = catalogo.filter(function(itemCatalogo) {
            return itemCatalogo['ID'] == item;
        });
        total = total + miItem[0]['Precio']
    }

    total1.textContent = total.toFixed(3)
}