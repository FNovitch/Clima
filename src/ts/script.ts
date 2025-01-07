const formElement = document.querySelector(".busca") as HTMLFormElement;
const searchInput = document.querySelector("#searchInput") as HTMLInputElement;
const resultadoElement = document.querySelector(".resultado") as HTMLElement;
const avisoElement = document.querySelector(".aviso") as HTMLElement;
const tituloElement = document.querySelector(".titulo") as HTMLElement;
const tempInfoElement = document.querySelector(".tempInfo") as HTMLElement;
const ventoInfoElement = document.querySelector(".ventoInfo") as HTMLElement;
const tempImageElement = document.querySelector(
  ".temp img"
) as HTMLImageElement;
const ventoPontoElement = document.querySelector(".ventoPonto") as HTMLElement;

formElement.addEventListener("submit", async (event) => {
  event.preventDefault();

  const input = searchInput.value.trim();
  if (!input) {
    mostrarAviso("Por favor, insira o nome de uma cidade.");
    return;
  }

  limparInfo();
  mostrarAviso("Carregando...");

  try {
    const apiKey = "ff2f2a7b72520b525b30b9827ca17ce6";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(
      input
    )}&appid=${apiKey}&units=metric&lang=pt_br`;
    const response = await fetch(url);

    if (!response.ok)
      throw new Error("Localização não encontrada, tente novamente!");

    const data = await response.json();
    mostrarInfo({
      name: data.name,
      country: data.sys.country,
      temp: Math.round(data.main.temp),
      tempIcon: data.weather[0].icon,
      windSpeed: data.wind.speed,
      windAngle: data.wind.deg,
    });
  } catch (error) {
    mostrarAviso((error as Error).message);
  }
});

function mostrarInfo(json: {
  name: string;
  country: string;
  temp: number;
  tempIcon: string;
  windSpeed: number;
  windAngle: number;
}) {
  mostrarAviso("");
  resultadoElement.style.display = "block";
  tituloElement.innerHTML = `${json.name}, ${json.country}`;
  tempInfoElement.innerHTML = `${json.temp} <sup>°C</sup>`;
  ventoInfoElement.innerHTML = `${json.windSpeed} <span>Km/h</span>`;
  tempImageElement.src = `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`;
  ventoPontoElement.style.transform = `rotate(${json.windAngle - 90}deg)`;
}

function mostrarAviso(mensagem: string) {
  avisoElement.textContent = mensagem;
}

function limparInfo() {
  mostrarAviso("");
  resultadoElement.style.display = "none";
}
