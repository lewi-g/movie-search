import React, {useState} from 'react'

import MoreInfo from './moreInfo'

const DEFAULT_PLACEHOLDER_IMAGE =
"https://lascrucesfilmfest.com/wp-content/uploads/2018/01/no-poster-available-737x1024.jpg"

function Movie ({movie}){
  const [isHovering, setIsHovering] = useState(false)

  const handleMouseHover = ()=> {
    setIsHovering(!isHovering)
  }

  const poster = movie.Poster=== "N/A"? DEFAULT_PLACEHOLDER_IMAGE : movie.Poster
  return (
    <div 
    className="movie"
    onMouseEnter={handleMouseHover}
    onMouseLeave ={handleMouseHover}
    >
      <h2>{movie.Title}</h2>
      <div>
        <img
          width="200"
          alt={`The movie titled: ${movie.Title}`}
          src={poster}
        />
      </div>
      <p>{movie.Year}</p>
      <MoreInfo isHovering={isHovering} movie={movie}/>
    </div>
  )
}

export default Movie