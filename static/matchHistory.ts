async function process() {
    let loading = true;

    let data = await new Promise((resolve, reject) => {
        console.log("hi");
        loading = false;

    });


}


document.addEventListener("DOMContentLoaded", () => {
    //var contentBody = document.getElementById("data").innerHTML;
    //contentBody = 'loading';
    process();
});