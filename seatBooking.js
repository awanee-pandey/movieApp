'use strict'
const container = document.querySelector('.container')

const movies = document.getElementById('movie')
console.log(movies)
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
console.log(seats);

const count = document.getElementById('count');
const total = document.getElementById('total');

let ticketPrice = + movies.value;
// console.log(typeof ticketPrice);

function updateSelectedCount(){
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    // let sum = 0;
    const selectedSeatCount = selectedSeats.length;
    count.innerText=selectedSeatCount;
/*     for(i=0;i<selectedSeats.length;i++){
        sum += ticketPrice;
    }
    total.innerText = sum; */

    total.innerText = selectedSeatCount * ticketPrice;
}

/* Movie Select */
movies.addEventListener('change',(e)=>{
    ticketPrice = +e.target.value; 
})

container.addEventListener('click', e=>{
    if(e.target.classList.contains('seat')&&
    !e.target.classList.contains('occupied')){
        e.target.classList.toggle('selected');
        updateSelectedCount();

    }
})