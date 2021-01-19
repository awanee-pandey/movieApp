const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=f3d4f4ca4536d171e6f9dc515f21707e';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=f3d4f4ca4536d171e6f9dc515f21707e&query="';

const form =document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');

/* Get initial movies */
getMovies(API_URL);
async function getMovies(url){
    const res = await fetch(url)
    const data = await res.json()
    const movieInfo = data.results;
    showMovies(movieInfo);
    const newMovieInfo = getDesiredMovieInfo(movieInfo);
    localStorage.setItem('desiredMovieInfo', JSON.stringify(newMovieInfo));
}

const getDesiredMovieInfo = function(movies){
    return movies.map((movie)=>({
        title: movie.original_title,
        rating: movie.vote_average,
    }))
}

function showMovies(movies){
    main.innerHTML = '';

    movies.forEach((movie)=>{
        const{title,poster_path,vote_average,overview} = movie
        const movieEL = document.createElement('div');
        movieEL.classList.add('movie')
        movieEL.innerHTML = `
        <img src="${IMG_PATH + poster_path}" alt = "${title}">
                <div class="movie-info">
                    <h3>${title}</h3>
                    <span class="${getClassByRate(vote_average)}">${vote_average}</span>
                </div>
                <div class="overview">
                    <h3>${overview}</h3>
                    <p></p>
                </div>
        `;
        movieEL.addEventListener('click',function(){
            location.href = 'seatBooking.html';
            localStorage.setItem('clickedMovied',JSON.stringify(movie));
        })


        main.appendChild(movieEL);
    })
}

function getClassByRate(vote){
    if(vote>=8) return 'green';
    else if(vote>=5) return 'orange';
    else return 'red';
}

form.addEventListener('submit',(e)=>{
    e.preventDefault() /* since it's a submit, we use preventdefault so that it isnt actually gonna submit the page*/
    const searchTerm = search.value;
    if(searchTerm && searchTerm!==''){
        getMovies(SEARCH_API + searchTerm)
        search.value = '';
    } else{
        window.location.reload()
    }
})

