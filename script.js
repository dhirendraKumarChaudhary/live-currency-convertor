
//creating Variable to take control over html element through javascript

const baseCurrency = document.getElementById('baseCurr');

const enteredAmount = document.getElementById('amount');

const desiredCurrency = document.getElementById('desiredCurr');

const submitButton = document.getElementById('submitBtn');

const userUnitCurrCode = document.getElementById('code1');

const userUnitAmount = document.getElementById('Amount1');

const apiUnitCurrCode = document.getElementById('code2');

const apiUnitAmount = document.getElementById('Amount2');



function fetchData() {
    fetch('http://openexchangerates.org/api/currencies.json?app_id=[YOUR API KEY]')
        .then(response => response.json())
        .then(data => populateSelect(data))
        .catch(error => console.error('Error fetching data:', error));
}

function populateSelect(data) {
    baseCurrency.innerHTML = "";

    //add a default option 
    const defaultOption = document.createElement('option');
    defaultOption.text = "Select Base Currency";

    baseCurrency.appendChild(defaultOption);


    //loop through the data and create option 
    Object.keys(data).forEach(key => {
        const option = document.createElement('option');
        option.value = key;
        option.text = key + " : " + data[key];
        baseCurrency.appendChild(option);


    });
}

window.addEventListener('load', fetchData);


//for desired Currency select options

function fetchData2() {
    fetch('http://openexchangerates.org/api/currencies.json?app_id=[YOUR API KEY]')
        .then(response => response.json())
        .then(data2 => populateSelect2(data2))
        .catch(error => console.error('Error fetching data:', error));
}

function populateSelect2(data2) {
    desiredCurrency.innerHTML = "";

    //add a default option 
    const defaultOption = document.createElement('option');
    defaultOption.text = "Select Desired Currency";

    desiredCurrency.appendChild(defaultOption);


    //loop through the data and create option 
    Object.keys(data2).forEach(key => {
        const option = document.createElement('option');
        option.value = key;
        option.text = key + " : " + data2[key];
        desiredCurrency.appendChild(option);


    });
}
window.addEventListener('load', fetchData2);


//output card spans

function updateAmount() {
    userUnitAmount.innerHTML = "";
    userUnitAmount.innerText = enteredAmount.value;
}

function updateUserCurr() {
    userUnitCurrCode.innerHTML = "";
    userUnitCurrCode.innerText = baseCurrency.value;
}

function updateApiCurr() {
    apiUnitCurrCode.innerHTML = "";
    apiUnitCurrCode.innerText = desiredCurrency.value;
}

function fetchExchangeRate() {
    fetch('https://openexchangerates.org/api/latest.json?app_id=[YOUR API KEY]')
        .then(response => response.json())
        .then(rate => convertAmount(rate))
        .catch(error => console.error('Error fetching data:', error));

}
function convertAmount(rate) {


    const userAmount = parseInt(enteredAmount.value);

    const selectedBaseOptionCode = baseCurrency.value;


    const selectedDesiredOptionCode = desiredCurrency.value;

    const convertedAmount = (userAmount / rate.rates[selectedBaseOptionCode]) * rate.rates[selectedDesiredOptionCode];
    apiUnitAmount.innerHTML = "";
    apiUnitAmount.innerHTML = convertedAmount.toFixed(2);
    document.getElementById('output').style.display = "Block";
    document.getElementById('Container2').style.display = "Block";



    const otherCurrency1 = document.getElementById('other1')
    const otherCurrency2 = document.getElementById('other2')
    const otherCurrency3 = document.getElementById('other3')
    const otherCurrency4 = document.getElementById('other4')
    const otherCurrency5 = document.getElementById('other5')


    const amount1 = (userAmount / rate.rates[selectedBaseOptionCode]) * rate.rates.USD;
    const amount2 = (userAmount / rate.rates[selectedBaseOptionCode]) * rate.rates.EUR;
    const amount3 = (userAmount / rate.rates[selectedBaseOptionCode]) * rate.rates.JPY;
    const amount4 = (userAmount / rate.rates[selectedBaseOptionCode]) * rate.rates.GBP;
    const amount5 = (userAmount / rate.rates[selectedBaseOptionCode]) * rate.rates.AUD;


    otherCurrency1.innerHTML = "";
    otherCurrency1.innerHTML = `${userAmount} ${selectedBaseOptionCode} = ${amount1} USD (US Dollar)`;

    otherCurrency2.innerHTML = "";
    otherCurrency2.innerHTML = `${userAmount} ${selectedBaseOptionCode} = ${amount2} EUR (Euro)`;

    otherCurrency3.innerHTML = "";
    otherCurrency3.innerHTML = `${userAmount} ${selectedBaseOptionCode} = ${amount3} JPY (Japanese Yen)`;

    otherCurrency4.innerHTML = "";
    otherCurrency4.innerHTML = `${userAmount} ${selectedBaseOptionCode} = ${amount4} GBP (British Pound S)`;

    otherCurrency5.innerHTML = "";
    otherCurrency5.innerHTML = `${userAmount} ${selectedBaseOptionCode} = ${amount5} AUD (Australian Dollar)`;


}

// right div-history 

function getHistoricalData() {


    function formatDate(inputDate) {
        // Get individual components from the input date
        const year = inputDate.getFullYear();
        const month = (inputDate.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 to month as it is zero-based
        const day = inputDate.getDate().toString().padStart(2, '0');

        // Create the YYYY-MM-DD formatted date
        const formattedDate = `${year}-${month}-${day}`;

        return formattedDate;
    }

    const pickedDate = document.getElementById('datepicker').value;

    const formattedPickedDate = formatDate(new Date(pickedDate));


    const apiLink = `https://openexchangerates.org/api/historical/${formattedPickedDate}.json?app_id=[YOUR API KEY]`;

    fetch(apiLink)
        .then(response => response.json())
        .then(historicalExchangeRate => displayHistoricalData(historicalExchangeRate))
        .catch(error => console.error('Error fetching data:', error));


}


function displayHistoricalData(historicalExchangeRate) {

    const historicalDataElement = document.getElementById('historyDataSpace');

    const userAmount = parseInt(enteredAmount.value);
    const selectedBaseOptionCode = baseCurrency.value;
    const selectedDesiredOptionCode = desiredCurrency.value;

    const historicalConvertedAmount = (userAmount / historicalExchangeRate.rates[selectedBaseOptionCode]) * historicalExchangeRate.rates[selectedDesiredOptionCode];

    historicalDataElement.innerHTML = `<h2>Historical Converted Amount: ${historicalConvertedAmount} <h2>`;
    
}
