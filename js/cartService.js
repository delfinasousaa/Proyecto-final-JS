const cuentaCarritoElement = document.getElementById("cuenta-carrito");

function getNuevoProductoParaMemoria(producto) {
    const nuevoProducto = {...producto};
    nuevoProducto.cantidad = 1;
    return nuevoProducto;
}

function actualizarNumeroDelCarrito() {
    const memoria = JSON.parse(localStorage.getItem("palos")) || [];
    if (memoria.length > 0) {
        const cuenta = memoria.reduce((acu, current) => acu + current.cantidad, 0);
        cuentaCarritoElement.innerText = cuenta;
    } else {
        cuentaCarritoElement.innerText = 0;
    }
}

function agregarAlCarrito(producto) {
    const memoria = JSON.parse(localStorage.getItem("palos")) || [];
    let cuenta = 0;

    const indiceProducto = memoria.findIndex(palo => palo.id === producto.id);

    if (indiceProducto === -1) {
        const nuevoProducto = getNuevoProductoParaMemoria(producto);
        memoria.push(nuevoProducto);
        cuenta = 1;
    } else {
        memoria[indiceProducto].cantidad++;
        cuenta = memoria[indiceProducto].cantidad;
    }

    localStorage.setItem("palos", JSON.stringify(memoria));
    actualizarNumeroDelCarrito();

    Toastify({
        text: `Haz agregado un producto`,
        duration: 1500,
        gravity: "top", 
        position: "left", 
        backgroundColor: "#02d42c",
        stopOnFocus: true, 
    }).showToast();

    return cuenta;
}

function restarAlCarrito(producto) {
    const memoria = JSON.parse(localStorage.getItem("palos")) || [];
    const indiceProducto = memoria.findIndex(palo => palo.id === producto.id);
    
    if (indiceProducto !== -1) {
        if (memoria[indiceProducto].cantidad === 1) {
            memoria.splice(indiceProducto, 1);
        } else {
            memoria[indiceProducto].cantidad--;
        }
        localStorage.setItem("palos", JSON.stringify(memoria));
        actualizarNumeroDelCarrito();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    actualizarNumeroDelCarrito();
});
