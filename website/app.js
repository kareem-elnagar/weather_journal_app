/* Global Variables */
const apiKey = "&APPID=b50ea252ee2a6768e9a5686b38789dce&units=imperial";
const button = document.querySelector("button");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();



// the function to intiate the eventwhen button is clicked
function start() {
    // the functions to make sure zip code is added properly
    if (!zip.value) {
        alert(` Please enter a zip Code!`);
    } else if (zip.value <= 9999 || zip.value >= 99999) {
        alert(`zip code is invalid!`);
    } else if (zip.value.isNAN) {
        alert('zipcode is a series of 5 numbers');
    } else {
        const zipCode = document.querySelector("input").value;
        const feels = document.querySelector('textarea').value;
        const baseUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}${apiKey}`;

        // calling the data from the Api
        const getIt = async(baseUrl) => {


            try {
                const res = await fetch(baseUrl);
                const data = await res.json();
                const saver = data.main.temp

                savingData('/step1', { date: newDate, temp: saver, feelings: feels });
                return data;
            } catch (error) {
                console.log("error", error);
                alert('invalid zipcode')
            }



        };

        getIt(baseUrl);



    }
}
const savingData = async(url = '', data = {}) => {
    const request = await fetch(url, {
        method: "post",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json;charset=UTF-8"
        },
        body: JSON.stringify(data)
    })
    try {
        const newData = await request.json
        retrieveData()
        return newData
    } catch (error) {
        console.log("error", error);
    }
};


const retrieveData = async() => {
    const request = await fetch("/step2");
    try {
        // Transform into JSON
        const allData = await request.json();

        // Write updated data to DOM elements
        document.querySelector("#temp").innerHTML =
            Math.round(allData.temp) + "deg";
        document.querySelector("#content").innerHTML = allData.feelings;
        document.querySelector("#date ").innerHTML = allData.date;
    } catch (error) {
        console.log(" error ", error);
        // appropriately handle the error
    }
};

button.addEventListener("click", start); //Event listner to start the app