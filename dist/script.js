"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
const formElement = document.querySelector(".busca");
const searchInput = document.querySelector("#searchInput");
const resultadoElement = document.querySelector(".resultado");
const avisoElement = document.querySelector(".aviso");
const tituloElement = document.querySelector(".titulo");
const tempInfoElement = document.querySelector(".tempInfo");
const ventoInfoElement = document.querySelector(".ventoInfo");
const tempImageElement = document.querySelector(".temp img");
const ventoPontoElement = document.querySelector(".ventoPonto");
formElement.addEventListener("submit", (event) =>
  __awaiter(void 0, void 0, void 0, function* () {
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
      const response = yield fetch(url);
      if (!response.ok) throw new Error("Localização não encontrada!");
      const data = yield response.json();
      mostrarInfo({
        name: data.name,
        country: data.sys.country,
        temp: Math.round(data.main.temp),
        tempIcon: data.weather[0].icon,
        windSpeed: data.wind.speed,
        windAngle: data.wind.deg,
      });
    } catch (error) {
      mostrarAviso(error.message);
    }
  })
);
function mostrarInfo(json) {
  mostrarAviso("");
  resultadoElement.style.display = "block";
  tituloElement.innerHTML = `${json.name}, ${json.country}`;
  tempInfoElement.innerHTML = `${json.temp} <sup>°C</sup>`;
  ventoInfoElement.innerHTML = `${json.windSpeed} <span>Km/h</span>`;
  tempImageElement.src = `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`;
  ventoPontoElement.style.transform = `rotate(${json.windAngle - 90}deg)`;
}
function mostrarAviso(mensagem) {
  avisoElement.textContent = mensagem;
}
function limparInfo() {
  mostrarAviso("");
  resultadoElement.style.display = "none";
}
