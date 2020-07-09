let wynik = localStorage.getItem("result");
let wynikPress = localStorage.getItem("result-press");
console.log(wynik);

const click = document.getElementById("klick");
const press = document.getElementById("press");

click.innerHTML = `liczba klikniec ${wynik}`;
press.innerHTML = `liczba nacisniec przycisku W ${wynikPress}`;
