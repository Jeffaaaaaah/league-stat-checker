"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchMatchHistory = void 0;
class requestBody {
    constructor(name) {
        this.playername = name;
    }
}
function fetchMatchHistory(url, requestbody) {
    //python code already handles null input for player search. null typing might be redundant
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestbody) //creates post body to be sent off
    })
        .then(response => {
        if (!response.ok) {
            throw new Error("response not ok"); //currently errors not really handled
        }
        return response.json(); //.json() returns a promise after it is finished parsing
    })
        .then(json => {
        console.log(json);
        return json;
    })
        .catch(e => console.log(e));
} //fetchMatchHistory
exports.fetchMatchHistory = fetchMatchHistory;
