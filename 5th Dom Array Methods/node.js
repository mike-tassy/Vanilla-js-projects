const main = document.getElementById('main')
const addUserBtn = document.getElementById('add-user')
const doubleBtn = document.getElementById('double')
const showMillie = document.getElementById('show-millionaires')
const sortBtn = document.getElementById('sort')
const calcWealthBtn = document.getElementById('calculate-wealth')


let data = []



getRandomUser();
getRandomUser();
getRandomUser();



//fet random user and add money
async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api')
    const data = await res.json()

    const user = data.results[0];

    const newUser = {
        name:  `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 3000000)
    }

    addData (newUser);
}



//double everyones money
function doubleMoney() {
    data = data.map(user => {
        return { ...user, money: user.money * 2}
    })

    updateDom()
}

//sort users by richest
function sortByRichest() {
    data.sort((a, b) => b.money - a.money)

    updateDom()
}

//filter only millionaiers
function showMillionaires() {
    data = data.filter(user => user.money > 1000000)

    updateDom();
}

//calculate wealth
function calculateWealth() {
    const wealth = data.reduce((acc, user) => (acc += user.money), 0)

        console.log(wealth);

    const wealthEl = document.createElement('div')
    wealthEl.innerHTML = `<h3>Total Wealth:<strong>${formatMoney(wealth)}</strong></h3>`
    main.appendChild(wealthEl)
}



//add new obj to data arr
function addData(obj) {
    data.push(obj);

    updateDom()
}

// update dom 
function updateDom(providedData = data) {
    // clear main div

    main.innerHTML = '<h2><strong>Person</strong>Weatlh</h2>';

    providedData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`
        main.appendChild(element)

    })
}

//format numer as money -- https://stackoverflow.com/questions/149055/how-to-format-numbers-as-currency-string
function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}


// Add event listeners 
addUserBtn.addEventListener('click', getRandomUser);
doubleBtn.addEventListener('click', doubleMoney)
sortBtn.addEventListener('click', sortByRichest)
showMillie.addEventListener('click', showMillionaires) 
calcWealthBtn.addEventListener('click', calculateWealth) 