'use strict'
const container = document.querySelector('.container')

const movies = document.getElementById('movie')
const seats = document.querySelectorAll('.row .seat:not(.occupied)');

const count = document.getElementById('count');
const total = document.getElementById('total');

populateUI();

let ticketPrice = + movies.value;
// console.log(typeof ticketPrice);

/* Save selected movie index and price */
function setMovieData(movieIndex,moviePrice){
    localStorage.setItem('selectedMovieIndex',movieIndex);
    localStorage.setItem('selectedMoviePrice',moviePrice);
}

function updateSelectedCount(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    
    /*to save the seats in local storage---
    Copy selected seats into arr
    Map through array
    return a new array of indexes */

    const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

    /* Local Storage */
    localStorage.setItem('selectedSeats',JSON.stringify(seatsIndex))

    const selectedSeatCount = selectedSeats.length;
    count.innerText=selectedSeatCount;
    total.innerText = selectedSeatCount * ticketPrice;
}

/* Get data from local storage and populate UI */
function populateUI(){
    const selectedSeats =JSON.parse(localStorage.getItem('selectedSeats'));
    console.log(selectedSeats);

    if(selectedSeats!==null && selectedSeats.length > 0){
        seats.forEach((seat,index)=>{
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add('selected');
            }
        })
    }
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex')
    console.log('-------------------')
    console.log(selectedMovieIndex);
    if(selectedMovieIndex !== null){
        movies.selectedIndex = selectedMovieIndex;
    }
}

/* Movie Select */
movies.addEventListener('change',(e)=>{
    ticketPrice = +e.target.value; 
    setMovieData(e.target.selectedIndex,+e.target.value);
    updateSelectedCount();
})

container.addEventListener('click', e=>{
    if(e.target.classList.contains('seat')&&
    !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
})

/* Initial count and total set  */
updateSelectedCount();