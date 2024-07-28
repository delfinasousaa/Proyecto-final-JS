const contenedorTarjetas = document.getElementById("palos-container");
const unidadesElement = document.getElementById("unidades");
const precioElement = document.getElementById("precio");
const carritoVacioElement = document.getElementById("carrito-vacio");
const reiniciarCarritoElement = document.getElementById("reiniciar");
const seguirComprandoButton = document.getElementById("continuar");
const comprarButton = document.getElementById("comprar");

function crearTarjetasProductosInicio(palos) {
    contenedorTarjetas.innerHTML = ""; 

    palos.forEach(palo => {
        const nuevoPalo = crearTarjetaProducto(palo);
        contenedorTarjetas.appendChild(nuevoPalo);
    });

    actualizarTotales(); 
    actualizarEstadoCarrito(); 
}

function crearTarjetaProducto(palo) {
    const tarjetaProducto = document.createElement("div");
    tarjetaProducto.classList.add("tarjeta-producto");

    tarjetaProducto.innerHTML = `
        <div class="image">
            <img src="${palo.img}" alt="palo ${palo.nombre}">
        </div>
        <div class="content">
            <h2>${palo.nombre}</h2>
            <p>Precio: €${palo.precio} EUR</p>
            <div>
                <button class="restar" data-id="${palo.id}">-</button>
                <span class="cantidad">${palo.cantidad}</span>
                <button class="sumar" data-id="${palo.id}">+</button>
            </div>
        </div>
    `;

    tarjetaProducto.querySelector(".restar").addEventListener("click", () => {
        restarAlCarrito(palo);
    });

    tarjetaProducto.querySelector(".sumar").addEventListener("click", () => {
        agregarAlCarrito(palo);
    });

    return tarjetaProducto;
}

function actualizarTotales() {
    const productos = JSON.parse(localStorage.getItem("palos")) || [];
    let unidades = 0;
    let precio = 0;

    productos.forEach(palo => {
        unidades += palo.cantidad;
        precio += palo.precio * palo.cantidad;
    });

    unidadesElement.innerText = unidades;
    precioElement.innerText = `€${precio} EUR`;
}

function actualizarEstadoCarrito() {
    const productos = JSON.parse(localStorage.getItem("palos")) || [];

    if (productos.length === 0) {
        carritoVacioElement.style.display = 'block'; 
        seguirComprandoButton.style.display = 'none'; 
        reiniciarCarritoElement.style.display = 'none'; 
        comprarButton.style.display = 'none'; 
    } else {
        carritoVacioElement.style.display = 'none'; 
        seguirComprandoButton.style.display = 'block'; 
        reiniciarCarritoElement.style.display = 'block'; 
        comprarButton.style.display = 'block'; 
    }

    let unidades = 0;
    let precio = 0;

    productos.forEach(palo => {
        unidades += palo.cantidad;
        precio += palo.precio * palo.cantidad;
    });

    unidadesElement.innerText = unidades;
    precioElement.innerText = `€${precio} EUR`;
}

reiniciarCarritoElement.addEventListener("click", () => {
    Swal.fire({
        text: '¿Quieres eliminar todos los productos de tu carrito?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#09ff00',
        cancelButtonColor: '#ff0000',
        confirmButtonText: 'Sí',
        cancelButtonText: 'Cancelar',
        customClass: {
            content: 'custom-swal-text' 
        }
    }).then((result) => {
        if (result.isConfirmed) {
            localStorage.removeItem("palos");
            crearTarjetasProductosInicio([]);
            actualizarEstadoCarrito();
            Swal.fire({
                title: 'Los productos del carrito han sido eliminados... :(',
                customClass: {
                    title: 'custom-swal-text',
                },
                confirmButtonColor: '#000000',
            });
        }
    });
});

function agregarAlCarrito(palo) {
    const productos = JSON.parse(localStorage.getItem("palos")) || [];
    const index = productos.findIndex(item => item.id === palo.id);

    if (index !== -1) {
        productos[index].cantidad++;
    } else {
        palo.cantidad = 1;
        productos.push(palo); 
    }

    localStorage.setItem("palos", JSON.stringify(productos));
    crearTarjetasProductosInicio(productos);
    actualizarEstadoCarrito(); 
}

function restarAlCarrito(palo) {
    const productos = JSON.parse(localStorage.getItem("palos")) || [];
    const index = productos.findIndex(item => item.id === palo.id);

    if (index !== -1 && productos[index].cantidad > 0) {
        productos[index].cantidad--;

        if (productos[index].cantidad === 0) {
            productos.splice(index, 1); 
        }
    }

    localStorage.setItem("palos", JSON.stringify(productos));
    crearTarjetasProductosInicio(productos);
    actualizarEstadoCarrito(); 
}

document.addEventListener("DOMContentLoaded", () => {
    const productos = JSON.parse(localStorage.getItem("palos")) || [];
    crearTarjetasProductosInicio(productos);
});

document.getElementById('continuar').addEventListener('click', function() {
    window.location.href = 'productos.html';
});

document.getElementById('comprar').addEventListener('click', function() {
    Swal.fire({
        title: "¡Gracias por tu compra!",
        text: "Tu pedido ha sido aceptado y se encuentra en proceso de preparación.",
        icon: "success",
    }).then(() => {
        localStorage.removeItem("palos"); 
        crearTarjetasProductosInicio([]);
        actualizarEstadoCarrito();
    });
});

