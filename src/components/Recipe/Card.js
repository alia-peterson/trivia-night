import React from 'react'

export default function Card({ drinkName, drinkImage, favoriteIcon, iconAltText, toggleFavorite, ingredients, instructions }) {
  return (
    <div>
      <img
        className='fav-icon'
        src={favoriteIcon}
        alt={iconAltText}
        onClick={toggleFavorite}
        />
      <div className='recipe-inst-container'>
        <div>
          <h3 className='recipe-name'>{drinkName}</h3>
          <h4 className='recipe-heading'>Ingredients:</h4>
          <ul className='recipe-ingr'>{ingredients}</ul>
        </div>
        <img className='recipe-image' src={drinkImage} alt=''/>
      </div>
      <h4 className='recipe-heading'>Instructions:</h4>
      <p className='recipe-inst'>{instructions}</p>
    </div>
  )
}
