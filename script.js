const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=f3d4f4ca4536d171e6f9dc515f21707e';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=f3d4f4ca4536d171e6f9dc515f21707e&query="';

const form =document.getElementById('form');
const search = document.getElementById('search')

/* Get initial movies */
getMovies(API_URL);
async function getMovies(url){
    const res = await fetch(url)
    const data = await res.json()
    console.log(data.results);
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

