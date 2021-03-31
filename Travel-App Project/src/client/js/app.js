//post request
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        return await response.json();
    }
    catch (error) {
        console.log('Error', error);
    }
}

//function to calculate the duration of a trip
function getDiffDay(date1, date2){
    const diffTime = Math.abs(new Date(date2) - new Date(date1));
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

//function to handle data from server side then update the UI
export const handleSubmit = async () => {
    const city = document.getElementById('city').value;
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    try {
        const data = await postData('http://localhost:8081/all', {city: city })
        //console.log(data)
        document.getElementById('city-duration').innerHTML = `You will travel to ${data.countryName}/${data.name} and you will spend ${getDiffDay(endDate, startDate)} days!`
        document.getElementById('temp').innerHTML = `Temperature is ${data.temperature} &#x2103, expected weather forecast: ${data.weatherForecast}`
        document.getElementById('time').innerHTML = data.timezone;
        document.getElementById('picture').setAttribute('src', data.image);
        document.getElementById('end').innerHTML = `Nice choice! wish you a safe trip`
    }
    catch (error) {
        console.log('error', error);
    }

};
