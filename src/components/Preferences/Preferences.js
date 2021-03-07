import React from 'react'
import './Preferences.css'

export default function Preferences({ possibleCategories, userCategories, updateCategories }) {
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

  return (
    <section>
      <h2>Possible Categories:</h2>
      <ul className='categories'>{categoryList}</ul>
      <h2>Favorite Beverage Recipes:</h2>
    </section>
  )
}
