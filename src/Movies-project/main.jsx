import React, { useEffect, useState } from "react"
import "./movies.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import FetchsearchURL from "./fetchsearch";
import { Button } from "react-bootstrap";
import Loadingcomponent from "./loading";

function Main0(){
    const [moviesdata, setmoviesdata] = useState(['']);
    const [search, setsearch] = useState(['']);
    const [displaymovie, setdisplaymovie] = useState(false);
    const [clickedMovie, setClickedMovie] = useState(null);
    const [loading, setloading] = useState(false);

    const FetchURL = async () => {
        const url = 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
        const options = {
            method: 'GET',
            headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNGEzNWQ2ZWRjYWZjM2VhODk5YTFkYWRjMTE2NTkzZiIsInN1YiI6IjY1ZmM3ZmQ2YmU2ZDg4MDE3ZGIxMGVlMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.M3NSgiO3KWHJnVe7aMQaDAWLswao2uNXeKZE8T8Keng'
            }
        };
        setloading(true);
        try 
        {   
            const response = await fetch(url, options);
            const data = await response.json();
            //setloading(false);
            console.log(data);
            setmoviesdata(data.results);
        } 
        catch (error) 
        {
            console.error('error:', error);
        }
        finally{
            setloading(false);
        }
    }
    
    useEffect(()=> FetchURL, []);
    
    async function searchfunc(){
        setloading(false);
        setdisplaymovie(false);
        const data2 =  await FetchsearchURL({searchparam : search});
        console.log(data2)
        setmoviesdata(data2.results)
    }

    function handleclick({data}){
        setdisplaymovie(true);
        setClickedMovie(data);
    }

    function defaultload(){
        setloading(false);
        setdisplaymovie(false);
        FetchURL();
    }

    if(loading){
        return( 
        <div>
        <nav class="navbar navbar-dark bg-dark justify-content-between">
            <a href="#" onClick={defaultload} class="navbar-brand">New Movies API</a>
            <form class="form-inline">
                <input onChange = {(e) => setsearch(e.target.value)} class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                <button onClick= {searchfunc} class="btn btn-outline-success my-2 my-sm-0" type="button">Search</button>
            </form>
        </nav>
            <Loadingcomponent/>
        </div>
        )
    }

    if(displaymovie){
        return(
            <div>
            <nav class="navbar navbar-dark bg-dark justify-content-between">
                <a href="#" onClick={FetchURL} class="navbar-brand">New Movies API</a>
                <form class="form-inline">
                    <input onChange = {(e) => setsearch(e.target.value)} class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                    <button onClick= {searchfunc} class="btn btn-outline-success my-2 my-sm-0" type="button">Search</button>
                </form>
            </nav>
            <div className="displaymovie">
                <img src={`https://image.tmdb.org/t/p/w500/${clickedMovie.poster_path}`} alt="Movies Image" />
                <div className="movieinfo">
                    <h2>{clickedMovie.original_title}</h2>
                    <a>description: {clickedMovie.overview}</a>
                    <h4 style={{lineHeight:3}}>rating: {clickedMovie.vote_average}</h4>
                    <Button variant="outline-light" className="see-through-button" onClick={defaultload}>home page</Button>
                </div>
            </div>
            </div>
        )
    }

    return (
        <div>
            <nav class="navbar navbar-dark bg-dark justify-content-between">
                <a href="#" onClick={defaultload} class="navbar-brand">New Movies API</a>
                <form class="form-inline">
                    <input onChange = {(e) => setsearch(e.target.value)} class="form-control mr-sm-2" type="search" placeholder="Search Any Movie" aria-label="Search" />
                    <button onClick= {searchfunc} class="btn btn-outline-success my-2 my-sm-0" type="button">Search</button>
                </form>
            </nav>

            <div className="movies">
            {moviesdata.map(mymovies =>(
                <div onClick={() => handleclick({data : mymovies})} key={mymovies.id}>
                    <img src={`https://image.tmdb.org/t/p/w500/${mymovies.poster_path}`} alt="Movies Image" />
                    <h4>{mymovies.original_title}</h4>
                <div/>
                </div>
            ))}
            </div>
        </div>
    )

}

export default Main0;