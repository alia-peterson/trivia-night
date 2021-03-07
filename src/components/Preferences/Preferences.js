import React from 'react'
import './Preferences.css'

export default function Preferences({ possibleCategories, updateCategories }) {
  const categoryList = possibleCategories.map((category, index) => {
    return <li
      key={index}
      >
      <input
        type='checkbox'
        defaultChecked={true}
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
