import React from 'react'
import Card from '../Recipe/Card'
import './Preferences.css'

export default function Preferences({ possibleCategories, userCategories, updateCategories, favoriteRecipes, isFavorite, toggleFavorite }) {
  const storedUserCategories = localStorage.getItem('triviology-info')
  if (storedUserCategories) {
    const parsedUserCategories = JSON.parse(storedUserCategories).userCategories
    userCategories = parsedUserCategories

  } else if (userCategories.length === 0) {
    userCategories = possibleCategories
  }

  const categoryList = possibleCategories.map((category, index) => {
    const foundCategory = userCategories.find(each => each.type === category.type)
    let defaultChecked

    if (foundCategory) {
      defaultChecked = true
    } else {
      defaultChecked = false
    }

    return <li
      key={index}
      >
      <input
        type='checkbox'
        defaultChecked={defaultChecked}
        id={category.type}
        value={category.value}
        onChange={event => {
          updateCategories(event.target.id, event.target.checked)
        }}
        />
      <label htmlFor={category.type}>
        {category.type}
      </label>
    </li>
  })

  const favRecipes = favoriteRecipes.map((recipe, index) => {
    return (
      <article
        key={index}
        className='favorite-card'
        id={recipe.idDrink}
        >
        <Card
          recipe={recipe}
          isFavorite={isFavorite}
          toggleFavorite={toggleFavorite}
          />
      </article>
    )
  })

  return (
    <>
      <section>
        <h2>Trivia Categories:</h2>
        <p>Note: Please select at least one category. If all categories are unchecked, the list will be updated to include all categories on reload.</p>
        <ul className='categories'>{categoryList}</ul>
      </section>
      <section>
        <h2>Favorite Beverage Recipes:</h2>
        {favRecipes.length > 0 ?
          <div className='favorite-container'>{favRecipes}</div> :
          <p>You don't have any favorite recipes at this time, add some to see them here!</p>
        }
      </section>
    </>
  )
}
