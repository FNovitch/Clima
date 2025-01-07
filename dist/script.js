"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var _a;
(_a = document.querySelector(".busca")) === null || _a === void 0 ? void 0 : _a.addEventListener("submit", (enviar) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    enviar.preventDefault();
    let input = ((_a = document.querySelector("#searchInput")) === null || _a === void 0 ? void 0 : _a.value) || "";
    if (input !== "") {
        limparInfo();
        mostrarAviso("Carregando..");
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=ff2f2a7b72520b525b30b9827ca17ce6&units=metric&lang=pt_br`;
        let req = yield fetch(url);
        let json = yield req.json();
        if (json.cod === 200) {
            mostrarInfo({
                name: json.name,
                country: json.sys.country,
                temp: Math.round(json.main.temp),
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg,
            });
        }
        else {
            limparInfo();
            mostrarAviso("Localização não encontrada!!");
        }
    }
    else {
        limparInfo();
    }
}));
function mostrarInfo(json) {
    mostrarAviso("");
    document.querySelector(".resultado").style.display = "block";
    document.querySelector(".titulo").innerHTML = `${json.name} ,${json.country}`;
    document.querySelector(".tempInfo").innerHTML = `${json.temp} <sup>°C</sup>`;
    document.querySelector(".ventoInfo").innerHTML = `${json.windSpeed} <span>Km/H</span>`;
    document.querySelector(".temp img").setAttribute("src", `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`);
    document.querySelector(".ventoPonto").style.transform = `rotate(${json.windAngle - 90}deg)`;
}
function mostrarAviso(mensagem) { document.querySelector(".aviso").innerHTML = mensagem; }
function limparInfo() {
    mostrarAviso("");
    document.querySelector(".resultado").style.display = "none";
}
