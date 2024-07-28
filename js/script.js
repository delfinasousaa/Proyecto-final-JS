document.addEventListener('DOMContentLoaded', () => {
    fetch('../productos.json')
        .then(response => response.json())
        .then(data => {
            crearTarjetasProductosInicio(data.palos);
        })
        .catch(error => {
            console.error('Error al cargar los productos:', error);
        });
    
    actualizarCuentaCarrito();
});

const contenedorTarjetas = document.getElementById("palos-container");

function crearTarjetasProductosInicio(palos) {
    palos.forEach(palo => {
        const nuevoPalo = document.createElement('div');
        
        nuevoPalo.classList.add("tarjeta-palos");
        
        if (palo.id >= 21 && palo.id <= 32) {
            nuevoPalo.classList.add('card-zapatillas');
        }
        
        nuevoPalo.innerHTML = `
            <div class="card">
                <div class="image">
                    <img src="${palo.img}" alt="palo ${palo.nombre}">
                </div>
                <div class="content">
                    <h2 class="title">${palo.nombre}</h2>
                    <p class="desc">€${palo.precio} EUR</p>
                    <button>Agregar al carrito</button>
                </div>
            </div>
        `;
        contenedorTarjetas.appendChild(nuevoPalo);
        nuevoPalo.getElementsByTagName("button")[0].addEventListener("click", () => {
            agregarAlCarrito(palo);
        });
    });
}

function actualizarCuentaCarrito() {
    const carrito = obtenerCarrito();
    const cuentaCarrito = document.getElementById('cuenta-carrito');
    cuentaCarrito.textContent = carrito.length;
}
