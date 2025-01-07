document.querySelector(".busca")?.addEventListener("submit", async (enviar) => {
  enviar.preventDefault();

  let input = (document.querySelector("#searchInput") as HTMLInputElement)?.value || "";
  if (input !== "") {
    limparInfo();
    mostrarAviso("Carregando..");

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(
      input
    )}&appid=ff2f2a7b72520b525b30b9827ca17ce6&units=metric&lang=pt_br`;
    let req = await fetch(url);
    let json = await req.json();
    if (json.cod === 200) {
      mostrarInfo({
        name: json.name,
        country: json.sys.country,
        temp: Math.round(json.main.temp),
        tempIcon: json.weather[0].icon,
        windSpeed: json.wind.speed,
        windAngle: json.wind.deg,
      });
    } else {
      limparInfo();
      mostrarAviso("Localização não encontrada!!");
    }
  } else {
    limparInfo();
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

  (document.querySelector(".resultado") as HTMLElement).style.display = "block";
  (document.querySelector(".titulo") as HTMLElement).innerHTML = `${json.name} ,${json.country}`;
  (document.querySelector(".tempInfo") as HTMLElement).innerHTML = `${json.temp} <sup>°C</sup>`;

  (document.querySelector(".ventoInfo") as HTMLElement).innerHTML = `${json.windSpeed} <span>Km/H</span>`;

  (document.querySelector(".temp img") as HTMLElement).setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`
  );

  (document.querySelector(".ventoPonto") as HTMLElement).style.transform = `rotate(${json.windAngle - 90}deg)`;
}

function mostrarAviso(mensagem: string) {
  (document.querySelector(".aviso") as HTMLElement).innerHTML = mensagem;
}

function limparInfo() {
  mostrarAviso("");
  (document.querySelector(".resultado") as HTMLElement).style.display = "none";
}
