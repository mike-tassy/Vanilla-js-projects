const container = document.querySelector('.container')
const seats = document.querySelectorAll('.row .seat:not(.occupied)')
const count = document.getElementById('count')
const total = document.getElementById('total')
const movieSelect = document.getElementById('movie')

populateUI()

let ticketPrice = +movieSelect.value


//Save Selected movie index and price
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex)
    localStorage.setItem('selectedMoviePrice', moviePrice)
}

//Update total and count
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected')


    //copy selected seats into arr
    //map through array
    //return a new array indexes

    const seatsIndex = [...selectedSeats].map((seat) =>
       [...seats].indexOf(seat))

    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex))

    console.log(seatsIndex);
    const selectedSeatsCounts = selectedSeats.length

    count.innerText = selectedSeatsCounts;
    total.innerText = selectedSeatsCounts * ticketPrice
}

//Get data from local storage and populate UI
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'))

    if(selectedSeats !== null && selectedSeats.length > 0) {
        seats.forEach((seats, index) => {
            if(selectedSeats.indexOf(index) > -1) {
                seats.classList.add('selected')
            }
        })
    }

    const selectedMovieIndex =localStorage.getItem('selectedMovieIndex')

    if(selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

//Movie select event
movieSelect.addEventListener('change', e => {
    ticketPrice = +e.target.value
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount()
 
})

//Seat click event

container.addEventListener('click', (e) => {
     if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {

        e.target.classList.toggle('selected')


         updateSelectedCount();
     }

        
})

// update count and total set
updateSelectedCount()