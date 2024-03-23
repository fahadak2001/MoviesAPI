import React, { useEffect } from "react";

const FetchsearchURL = async ({searchparam}) => {
    const url = `https://api.themoviedb.org/3/search/movie?include_adult=false&language=en-US&page=1&query=${encodeURIComponent(searchparam)}`;
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyNGEzNWQ2ZWRjYWZjM2VhODk5YTFkYWRjMTE2NTkzZiIsInN1YiI6IjY1ZmM3ZmQ2YmU2ZDg4MDE3ZGIxMGVlMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.M3NSgiO3KWHJnVe7aMQaDAWLswao2uNXeKZE8T8Keng'
        }
    };
    try 
    {
        const response = await fetch(url, options);
        const data = await response.json();
        return data;
    } 
    catch (error) 
    {
        console.error('error:', error);
    }
}

export default FetchsearchURL;
