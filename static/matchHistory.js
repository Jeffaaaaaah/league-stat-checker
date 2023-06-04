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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
function fetchMatchHistory(name) {
    //python code already handles null input for player search. null typing might be redundant
    return fetch('/api/match_history_by_name', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'playername': name }) //creates post body to be sent off
    })
        .then(function (response) {
        if (!response.ok) {
            throw new Error("response not ok");
        }
        return response.json(); //.json() returns a promise after it is finished parsing
    })
        .then(function (json) {
        console.log(json);
        return json;
    })
        .catch(function (e) { return console.log(e); });
} //fetchMatchHistory
var contentBody;
var State;
(function (State) {
    State[State["loading"] = 0] = "loading";
    State[State["done"] = 1] = "done";
})(State || (State = {}));
;
var state;
var params = new URLSearchParams(window.location.search);
function loadMatchHistory() {
    return __awaiter(this, void 0, void 0, function () {
        var jason, i;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    contentBody.innerHTML += params.get('playername');
                    return [4 /*yield*/, fetchMatchHistory(params.get('playername'))];
                case 1:
                    jason = _a.sent();
                    //python code already handles null input for player search ^ null typing might be unessecary
                    console.log(jason);
                    for (i = 0; i < jason.matches.length; i++) {
                        contentBody.innerHTML += "<h1> ".concat(jason.matches[i], "</h1>");
                    }
                    return [2 /*return*/];
            }
        });
    });
}
document.addEventListener("DOMContentLoaded", function () {
    var _a;
    contentBody = document.getElementById("data");
    contentBody.innerHTML += 'loading';
    state = State.loading;
    loadMatchHistory();
    (_a = document.getElementById('button')) === null || _a === void 0 ? void 0 : _a.addEventListener("click", function (e) {
        console.log('click');
        fetchMatchHistory('hello');
    });
});
