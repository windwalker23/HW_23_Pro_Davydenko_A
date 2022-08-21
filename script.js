let userData = {
    'USD': 1000,
    'EUR': 900,
    'UAH': 15000,
    'BIF': 20000,
    'AOA': 100
},
bankData = {
    'USD': {
        max: 3000,
        min: 100,
        img: '💵'
    },
    'EUR': {
        max: 1000,
        min: 50,
        img: '💶'
    },
    'UAH': {
        max: 0,
        min: 0,
        img: '💴'
    },
    'GBP': {
        max: 10000,
        min: 100,
        img: '💷'
    }
},
currency;

let getMoney = (userData, bankData) => { 
        return new Promise(function(resolve, reject) {
            confirm(`Посмотреть баланс на карте?`) ? resolve(userData) : reject([bankData, userData]);
    })
}

function getCurrencyList(data) {
    let userCurrencyList = [];
    for(let key in data) {
        userCurrencyList.push(key);
    }
    return userCurrencyList;
}

function setCurrencyList(user, bank) {
    let userCurrencyList = getCurrencyList(user);
    let bankCurrencyList = [];
    let currencyList = [];

    for(let key in bank) {
        if(bank[key].max) {
            bankCurrencyList.push(key);
        }
    }

    userCurrencyList.filter(
        function (item) {
            for(key in bankCurrencyList) {
                if(item == bankCurrencyList[key]) currencyList.push(item)
            }
        }
    )

    return currencyList = currencyList.join(", ")
}

function checkCurrency(data) {
    let currencyList = getCurrencyList(data);

    do {
        currency = prompt(`Введите название валюты в формате: ${currencyList.join(", ")}`).toUpperCase();
    } while (!data[currency]);
    
    console.log(`${data[currency]} ${currency}`);
}

function getBills(user, bank) {
    let currencyList = setCurrencyList(user, bank);
    let value;

    do {
        currency = prompt(`Введите название валюты в формате: ${currencyList}`).toUpperCase();
    } while (!bank[currency] || !user[currency]);

    do {
        value = +prompt(`Введите сумму ${currency} которую желаете снять`)
    } while (!value)

    value < bank[currency].min ? console.log( `Введенная сумма меньше допустимой. Минимальная сумма снятия: ${bank[currency].min} ${currency}`) :
    value > bank[currency].max ? console.log( `Введенная сумма больше допустимой. Максимальная сумма снятия :${bank[currency].max} ${currency}`) :
    console.log(`Вот ваши ${value} ${currency}`)

}




getMoney(userData, bankData)
    .then(
        function(data) {
            checkCurrency(data);
        },
        function(data) {
            getBills(data[1], data[0]);

        }
    )
    .finally(() => console.log('Спасибо, хорошего дня 😊'))