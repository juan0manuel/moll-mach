const hole = document.querySelectorAll(".hole");
const timeleft = document.querySelector("#time");

let score = document.getElementById("score");
let color = document.getElementById("color");
let result = 0;
let currentTime = timeleft.textContent;
let molePosition = null;
let gameActive = true; // Para controlar si el juego está activo o no

function randomHole() {
    // Elimina el topo de cualquier casilla antes de asignar uno nuevo
    hole.forEach(className => {
        className.classList.remove("mole");
        className.style.backgroundColor = "rgb(61, 55, 55)"; // Resetea el color de fondo
        className.style.borderColor="brown";//Recetea el color de los bordes
    });

    if (gameActive) {
        // Selecciona una posición aleatoria para el topo
        let randomPosition = hole[Math.floor(Math.random() * hole.length)];
        randomPosition.classList.add("mole");
        molePosition = randomPosition; // Asigna la posición actual del topo
    }
}

hole.forEach(identifier => {
    identifier.addEventListener("click", () => {
        // Solo permitir clics si el juego sigue activo
        if (gameActive) {
            if (identifier === molePosition) {
                // Si la casilla donde se hizo clic es la del topo
                identifier.style.backgroundColor = "green"; // Cambia el color de fondo a verde
                identifier.style.borderColor="green";
                result++; // Aumenta el puntaje
                score.textContent = result; // Actualiza el puntaje en pantalla
                molePosition = null; // Resetea la posición del topo
            }else {
                identifier.style.backgroundColor = "red"; // Cambia el color de fondo a rojo
                identifier.style.borderColor = "red";
                result--; // Reduce el puntaje si el clic fue en la casilla incorrecta
                score.textContent = result; // Actualiza el puntaje en pantalla
            }
        }
    });
});

function moveMole() {
    timeMole = setInterval(randomHole, 1000); // Mueve el topo cada segundo
}

moveMole();

function countDown() {
    currentTime--;
    timeleft.textContent = currentTime;

    if (currentTime === 0) {
        // Termina el juego cuando el tiempo llega a 0
        color.textContent = "Reinicie para volver a jugar";
        clearInterval(timeMole);
        clearInterval(countDownTime);
        gameActive = false; // Desactiva el juego, evitando más clics
        removeMole(); // Elimina al topo de la pantalla
        alert("The game has finished, your score is: " + result + " points");
    }
}

let countDownTime = setInterval(countDown, 1000);

function removeMole() {
    // Elimina el topo de cualquier casilla
    hole.forEach(className => {
        className.classList.remove("mole");
        className.style.backgroundColor = "rgb(61, 55, 55)"; // Limpia cualquier color de fondo
        className.style.borderColor = "brown";
    });
}
