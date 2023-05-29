var contentBody: HTMLElement | null;

enum State {
    'loading',
    'done'
};

var state: State;

const params = new URLSearchParams(window.location.search);




async function process() {

    contentBody!.innerHTML += params.get('playername');
    let jason: any = await fetchMatchHistory(params!.get('playername')); //json is returned
    //python code already handles null input for player search ^ null typing might be unessecary
    
    console.log(jason);
    for(let i = 0; i < jason.matches.length; i++){
        contentBody!.innerHTML += `<h1> ${jason.matches[i]}</h1>`;
    }
    
}


function fetchMatchHistory(name: string | null): any { //python code already handles null input for player search
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




document.addEventListener("DOMContentLoaded", () => {
    contentBody = document!.getElementById("data");
    contentBody!.innerHTML += 'loading';
    state = State.loading;
    process();

    document.getElementById('button')?.addEventListener("click", (e) => {
        console.log('click');
        fetchMatchHistory('hello');
    });
});