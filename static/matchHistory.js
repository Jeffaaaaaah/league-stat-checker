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
Object.defineProperty(exports, "__esModule", { value: true });
const fetch_1 = require("./fetch");
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
        let jason = yield (0, fetch_1.fetchMatchHistory)(params.get('playername')); //json is returned
        //python code already handles null input for player search ^ null typing might be unessecary
        console.log(jason);
        for (let i = 0; i < jason.matches.length; i++) {
            contentBody.innerHTML += `<h1> ${jason.matches[i]}</h1>`;
        }
    });
}
document.addEventListener("DOMContentLoaded", () => {
    var _a;
    contentBody = document.getElementById("data");
    contentBody.innerHTML += 'loading';
    state = State.loading;
    process();
    (_a = document.getElementById('button')) === null || _a === void 0 ? void 0 : _a.addEventListener("click", (e) => {
        console.log('click');
        (0, fetch_1.fetchMatchHistory)('hello');
    });
});
