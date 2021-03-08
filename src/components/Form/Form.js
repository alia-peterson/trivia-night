import { Link } from 'react-router-dom'
import './Form.css'

export default function Form({ possibleBases, populateRecipe, populateTrivia, recipeEnabled, triviaEnabled }) {
  const recipeBases = possibleBases.map((base, index) => {
    return <option key={index} value={base}>{base}</option>
  })

  return (
    <article className='form-container'>
      <form className='form'>
        <label htmlFor='dropdown-drinks'>Drink Base:</label>
        <select
          onChange={(event) => populateRecipe(event.target.value)}
          className='dropdown'
          id='dropdown-drinks'
          name='dropdown-cocktail'
          defaultValue="Choose drink base..."
          >
          <option disabled value="Choose drink base...">Choose drink base...</option>
          {recipeBases}
        </select>
        <label htmlFor='dropdown-trivia'>Trivia Difficulty:</label>
        <select
          onChange={(event) => populateTrivia(event.target.value)}
          className='dropdown'
          id='dropdown-trivia'
          name='dropdown-trivia'
          defaultValue='Choose trivia difficulty...'
          >
          <option disabled value='Choose trivia difficulty...'>Choose trivia difficulty...</option>
          <option value='easy'>Easy</option>
          <option value='medium'>Medium</option>
          <option value='hard'>Hard</option>
        </select>
        <div className='button-form-container'>
          <Link to='/recipe'>
            <button
              className='button'
              name='recipe-button'
              disabled={recipeEnabled}
              >
              View Recipe
            </button>
          </Link>
          <Link to='/trivia'>
            <button
              className='button'
              name='trivia-button'
              disabled={triviaEnabled}
              >
              View Trivia
            </button>
          </Link>
        </div>
      </form>
    </article>
  )
}
