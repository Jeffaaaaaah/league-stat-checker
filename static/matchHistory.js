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
var contentBody;
var State;
(function (State) {
    State[State["loading"] = 0] = "loading";
    State[State["done"] = 1] = "done";
})(State || (State = {}));
;
var state;
const params = new URLSearchParams(window.location.search);
function process() {
    return __awaiter(this, void 0, void 0, function* () {
        contentBody.innerHTML += params.get('playername');
        let jason = yield fetchMatchHistory(params.get('playername')); //json is returned
        console.log(jason);
        for (let i = 0; i < jason.matches.length; i++) {
            contentBody.innerHTML += `<h1> ${jason.matches[i]}</h1>`;
        }
    });
}
function fetchMatchHistory(name) {
    return fetch('/api/matchhistory', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'playername': name }) //creates post body to be sent off
    })
        .then(response => {
        if (!response.ok) {
            throw new Error("response not ok");
        }
        return response.json(); //.json() returns a promise after it is finished parsing
    })
        .then(json => {
        console.log(json);
        return json;
    })
        .catch(e => console.log(e));
} //fetchMatchHistory
document.addEventListener("DOMContentLoaded", () => {
    var _a;
    contentBody = document.getElementById("data");
    contentBody.innerHTML += 'loading';
    state = State.loading;
    process();
    (_a = document.getElementById('button')) === null || _a === void 0 ? void 0 : _a.addEventListener("click", (e) => {
        console.log('click');
        fetchMatchHistory('hello');
    });
});
