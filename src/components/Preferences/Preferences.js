import React from 'react'
import './Preferences.css'

export default function Preferences({ possibleCategories, userCategories, updateCategories }) {
  if (userCategories.length === 0) {
    userCategories = JSON.parse(localStorage.getItem('triviology-info')).userCategories
  }
  
  const categoryList = possibleCategories.map((category, index) => {
    let defaultChecked
    if (userCategories.includes(category)) {
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
        id={category}
        onChange={event => {
          updateCategories(event.target.id, event.target.checked)
        }}
        />
      <label htmlFor={category}>
        {category}
      </label>
    </li>
  })

  return (
    <section>
      <h2>Possible Categories:</h2>
      <ul className='categories'>{categoryList}</ul>
      <h2>Favorite Beverage Recipes:</h2>
    </section>
  )
}
