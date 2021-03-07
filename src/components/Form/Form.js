import { Link } from 'react-router-dom'
import './Form.css'

export default function Form({ populateRecipe, populateTrivia }) {
  return (
    <article className='form-container'>
      <form className='form'>
        <label htmlFor='dropdown-drinks'>Drink Base:</label>
        <select
          onChange={(event) => populateRecipe(event.target.value)}
          className='dropdown'
          id='dropdown-drinks'
          >
          <option value='vodka'>Vodka</option>
          <option value='tequila'>Tequila</option>
          <option value='gin'>Gin</option>
        </select>
        <label htmlFor='dropdown-trivia'>Trivia Difficulty:</label>
        <select
          onChange={(event) => populateTrivia(event.target.value)}
          className='dropdown'
          id='dropdown-trivia'
          >
          <option value='easy'>Easy</option>
          <option value='medium'>Medium</option>
          <option value='hard'>Hard</option>
        </select>
        <div className='button-form-container'>
          <Link to='/recipe'>
            <button className='button'>
              View Recipe
            </button>
          </Link>
          <Link to='/trivia'>
            <button className='button'>
              View Trivia
            </button>
          </Link>
        </div>
      </form>
    </article>
  )
}
