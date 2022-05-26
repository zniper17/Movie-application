import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import Comments from './Comments';

function Popup({ selected, closePopup,addFavouriteMovie,currentFavourites,removeFavourites,addMovieRating,currentMovieRating }) {

const[fav,setFav]=useState(false);
const[trigger,settrigger]=useState(false)
useEffect(() => {
	currentFavourites.map((movie) => {
		if(selected.imdbID == movie.imdbID){
			setFav(true)
		}
	})
},)

function StarRating({count, value, 
    inactiveColor='#ddd',
    size=24,
    activeColor='#f00', onChange}) {

  // short trick 
  const stars = Array.from({length: count}, () => '🟊')

  // Internal handle change function
  const handleChange = (value) => {
    onChange(value + 1);
  }

  return (
    <div>
      {stars.map((s, index) => {
        let style = inactiveColor;
        if (index < value) {
          style=activeColor;
        }
        return (
          <span className={"star"}  
            key={index}
            style={{color: style, width:size, height:size, fontSize: size}}
            onClick={()=>handleChange(index)}>{s}</span>
        )
      })}
      
    </div>
  )
}


function checkFav(){
	if(!fav){
		return <button className="close" onClick={() => {addFavouriteMovie(selected); setFav(true) ;settrigger(true)}} >Add to Favorites </button>
	}
	else{
	return	( <><button className="close" onClick={() => {removeFavourites(selected); setFav(false)}} >Remove from Favorites </button>
	

	</>
	)
	}
}
	return (
		<section className="popup">
			<div className="content">
				<h2>{ selected.Title } </h2>
				<pre className="rating"> {selected.Year}   {selected.Rated}   {selected.Runtime}    </pre>
				<div className="plot">
					<img src={selected.Poster} />
					<p>{selected.Plot} <br></br><br></br><br></br>
					<span className='details' >Director:		<span className='detail'>{selected.Director	}</span> </span>
			
					<span className='details'>Cast <span className='detail'>{selected.Actors	}</span> </span>
					<span className='details'>Genre <span className='detail'>{selected.Genre	}</span> </span>
					<span className='details'>Languages <span className='detail'>{selected.Language	}</span> </span>
					<span className='details'>IMDB Ratings <span className='detail'>{selected.imdbRating	}</span> </span>
					</p>
				  
				</div>
				<button className="close" onClick={closePopup}>Close</button>
			{checkFav()}
			<Comments trigger={trigger} settrigger={settrigger} addRating={addMovieRating} selected={selected} >
				
			</Comments>
			{
				currentMovieRating.map((movie) => {
					if(movie.id ===selected.imdbID){
						return (
							<div className='user-Rating'>
							<p>
							
							<span className='rating-head'>  Your Ratings  <span className='star'>{<StarRating value={movie.userRating} count={5} />}  </span></span>
							
							<span className='rating-head'>  Your Review  <span className='review-para'>{movie.userComment} </span></span>
								</p>
							</div>
						)
					}
				})
			}
		
			</div>
		</section>
	)
}

export default Popup