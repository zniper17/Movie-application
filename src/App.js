import React, { useState, useEffect } from 'react'
import axios from 'axios'
import "./App.css"
import Nav from './components/Nav'
import Search from './components/Search'
import Results from './components/Results'
import Popup from './components/Popup'
import LoadingSpinner from "./components/LoadingSpinner"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  //To get the existing localStorage Data
	useEffect(() => {
		const movieFavourites = JSON.parse(
			localStorage.getItem('react-movie-app-favourites')
		);
    const userComment=JSON.parse(
      localStorage.getItem('react-movie-app-userinput')
    )
  
		if (movieFavourites) {
			setFavourites(movieFavourites);
      setMovieRating(userComment)
		}
	}, []);



  const [state, setState] = useState({
    s: "",
    results: [],
    selected: {}
  });
  const apiurl = "https://www.omdbapi.com/?apikey=dfe6d885";
  const [favourites, setFavourites] = useState([]);
  const [movieRating,setMovieRating]=useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  //Api Call
  const search = (e) => {

    setIsLoading(true);
  
    if (e.key === "Enter") {
      axios(apiurl + "&s=" + state.s).then(({ data }) => {
        setErrorMessage("")
       if(data.Response=="False"){
        setErrorMessage("Oops the movie not found!")
        
         setIsLoading(false)
         setState(prevState => {
           return {...prevState,results:[]}
         })
       }
       else{
        let results = data.Search;

        setState(prevState => {
          return { ...prevState, results: results }
        })
      }
      }).catch(() => {
        setErrorMessage("Oops the movie not found!")
      });
      setIsLoading(false)
    }
  }
  const clearResult =() => {
    setState(prevState => {
      return {...prevState,results:[]}
    })
  }
  //handling the search Change
  const handleInput = (e) => {
    let s = e.target.value;
  if(s==""){
    setIsLoading(false);
    setErrorMessage("")
  }
    setState(prevState => {
      return { ...prevState, s: s }
    });
  }

  const openPopup = id => {
    axios(apiurl + "&i=" + id).then(({ data }) => {
      let result = data;

      console.log(result);

      setState(prevState => {
        return { ...prevState, selected: result }
      });
    });
  }

  const closePopup = () => {
    setState(prevState => {
      return { ...prevState, selected: {} }
    });
  }

  //to add movie to Favourite
const addFavouriteMovie = (movie) =>{
  const newFavouriteList = [...favourites, movie];
  setFavourites(newFavouriteList);
  console.log(favourites);
  saveFavtoLocalStorage(newFavouriteList)
}
//TO remove
const removeFavourites = (movie) => {
  const newFavouriteList = favourites.filter(
    (favourite) => favourite.imdbID !== movie.imdbID
  );
  saveFavtoLocalStorage(newFavouriteList)

  setFavourites(newFavouriteList);
  var  newmovieRating=movieRating.filter(
    (rating) => rating.id !==movie.imdbID
  )
  setMovieRating(newmovieRating)
  saveRatingtoLocalStorage(newmovieRating)

}
//TO add Rating
function addMovieRating(movie,rating,comment) {
  var newmovieRating=[...movieRating,{
    id:movie,
    userRating:rating,
    userComment:comment
  }]
  const uniqueIds = [];
  newmovieRating=newmovieRating.filter(element => {
    const isDuplicate = uniqueIds.includes(element.id);
  
    if (!isDuplicate) {
      uniqueIds.push(element.id);
  
      return true;
    }
  
    return false;
  });
  
  setMovieRating(newmovieRating);
  saveRatingtoLocalStorage(newmovieRating)
  console.log(movieRating);
}
const saveFavtoLocalStorage =(items) =>{
	localStorage.setItem('react-movie-app-favourites', JSON.stringify(items));

}
const saveRatingtoLocalStorage = (items) => {
  localStorage.setItem('react-movie-app-userinput', JSON.stringify(items));

}


  return (
    <Router>   
     <div className="App">
      <Nav closePopup={closePopup} clearResult={clearResult} />
      {(typeof state.selected.Title != "undefined") ? <Popup selected={state.selected} closePopup={closePopup} addFavouriteMovie ={addFavouriteMovie} removeFavourites={removeFavourites} currentFavourites={favourites} addMovieRating={addMovieRating} currentMovieRating={movieRating} /> : false}
      <Routes>
      <Route path='/'   element={   <main>  <Search handleInput={handleInput} search={search} /> { isLoading? <LoadingSpinner /> : <Results results={state.results} openPopup={openPopup} />}   {errorMessage && <h2>{errorMessage}</h2>}  </main>}/>
     
     <Route path="/favorite" element={   <main className='favourite'> <h1>Here are your Favorites</h1>  <Results results={favourites} openPopup={openPopup}  isFav={true} /> </main> } />
     
      </Routes>
    </div>
    </Router>

  );
}

export default App