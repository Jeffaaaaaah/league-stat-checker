export function fetchMatchHistory(name: string | null): any { 
    //python code already handles null input for player search. null typing might be redundant
    return fetch('/api/matchhistory',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 'playername': name }) //creates post body to be sent off
    })
    .then(response => { //checking for response error codes
        if(!response.ok) {
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