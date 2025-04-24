const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.fade-up, .fade-left, .fade-right').forEach(el => {
    observer.observe(el);
});

// Confirmación del formulario (simulada)
document.querySelector("form").addEventListener("submit", function (e) {
    e.preventDefault(); // Evita que se recargue
    document.getElementById("mensaje-confirmacion").style.display = "block";
    this.reset(); // Limpia el formulario
});

// Cuenta regresiva
const eventoFecha = new Date("2025-04-26T21:00:00"); // Cambia a tu fecha real
const diasSpan = document.getElementById("dias");
const horasSpan = document.getElementById("horas");
const minutosSpan = document.getElementById("minutos");
const segundosSpan = document.getElementById("segundos");

function actualizarContador() {
    const ahora = new Date();
    const diferencia = eventoFecha - ahora;

    if (diferencia <= 0) return;

    const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((diferencia / (1000 * 60 * 60)) % 24);
    const minutos = Math.floor((diferencia / (1000 * 60)) % 60);
    const segundos = Math.floor((diferencia / 1000) % 60);

    diasSpan.textContent = dias.toString().padStart(2, "0");
    horasSpan.textContent = horas.toString().padStart(2, "0");
    minutosSpan.textContent = minutos.toString().padStart(2, "0");
    segundosSpan.textContent = segundos.toString().padStart(2, "0");
}

setInterval(actualizarContador, 1000);

// ACTIVACION MÚSICA
document.addEventListener("DOMContentLoaded", () => {
    const musica = document.getElementById("musica-fondo");
    const btnAudio = document.getElementById("btn-audio");
    const icono = btnAudio.querySelector("i");

    // Activar audio tras primer clic en pantalla (evita bloqueo automático)
    let iniciado = false;
    const iniciarMusica = () => {
        if (!iniciado) {
            musica.play().catch(err => console.log("Audio bloqueado:", err));
            iniciado = true;
        }
    };
    document.addEventListener("click", iniciarMusica, { once: true });

    // Funcionalidad botón play/pause
    btnAudio.addEventListener("click", () => {
        if (musica.paused) {
            musica.play();
            icono.classList.remove("fa-play");
            icono.classList.add("fa-pause");
        } else {
            musica.pause();
            icono.classList.remove("fa-pause");
            icono.classList.add("fa-play");
        }
    });
});


/*FUNCION COPIAR TEXTO*/
function copiarTexto(boton, id) {
    const texto = document.getElementById(id).textContent;
    navigator.clipboard.writeText(texto).then(() => {
        const mensaje = boton.nextElementSibling;
        mensaje.classList.add("mostrar-copiado");

        setTimeout(() => {
            mensaje.classList.remove("mostrar-copiado");
        }, 2000); // 2 segundos visible
    });
}
