import React from 'react'

function MoreInfo(props) {
  const { isHovering, movie } = props
  
  return isHovering ? (
    <div className="more-info">
      <h3>{movie.Title}</h3>
      <p>{movie.Plot}</p>
      <br/>
      <p>Runtime: {movie.Runtime}</p>
      {movie.Ratings.map((rating, i) => <p key={`${i}-{}`}>{rating.Source}: {rating.Value}</p>)}
    </div>
  ) : null
}

export default MoreInfo
