import { fetchMatchHistory } from "./fetch";

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