context('Triviology Website', () => {
  const baseUrl = 'http://localhost:3000/'

  beforeEach(() => {
    cy.visit(baseUrl)
    localStorage.removeItem('triviology-info')
  })

  it('Should display a header, a form, and a footer', () => {
    cy.get('header')
      .get('h1').should('have.text', 'Triviology')
      .get('a[name=home]').should('have.text', 'Home')
      .get('a[name=preferences]').should('have.text', 'Preferences')
      .get('form').contains('Drink Base:')
      .get('form').contains('Trivia Difficulty:')
      .get('footer')
      .get('a[name=triviaAPI]').should('have.text', 'Trivia API')
      .get('a[name=cocktailAPI]').should('have.text', 'Cocktail API')
  })

  it('Should be able to visit the recipe page and view the drink recipe', () => {
    cy.intercept('GET', 'Tequila', { fixture: 'cocktail-list' }, {statusCode: 200, body: 'wow'})
      .intercept('GET', 'lookup', { fixture: 'beverage1' }, {statusCode: 200, body: 'wow'})
      .get('select[name=dropdown-cocktail]').select('Tequila')
      .get('select[name=dropdown-trivia]').select('Medium')
      .get('button[name=recipe-button]').click()
      .get('article h3').should('have.text', 'Margarita')
      .get('article img.recipe-image').should('have.attr', 'src').should('include', 'https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg')
      .get('article ul>li').eq(0).should('have.text', 'Tequila: 1 1/2 oz ')
  })

  it('Should be able to generate a new recipe', () => {
    cy.intercept('GET', 'Tequila', { fixture: 'cocktail-list' }, {statusCode: 200, body: 'wow'})
      .intercept('GET', 'lookup', { fixture: 'beverage1' }, {statusCode: 200, body: 'wow'})
      .get('select[name=dropdown-cocktail]').select('Tequila')
      .get('select[name=dropdown-trivia]').select('Medium')
      .get('button[name=recipe-button]').click()
      .get('button[name=button-new-recipe]').click()
  })

  it('Should be able to favorite a recipe', () => {
    cy.intercept('GET', 'Tequila', { fixture: 'cocktail-list' }, {statusCode: 200, body: 'wow'})
      .intercept('GET', 'lookup', { fixture: 'beverage1' }, {statusCode: 200, body: 'wow'})
      .get('select[name=dropdown-cocktail]').select('Tequila')
      .get('button[name=recipe-button]').click()
      .get('article img.fav-icon').click()
      .get('a[name=preferences]').click()
      .get('article h3').should('have.text', 'Margarita')
  })

  it('Should be able to unfavorite a recipe', () => {
    cy.intercept('GET', 'Tequila', { fixture: 'cocktail-list' }, {statusCode: 200, body: 'wow'})
      .intercept('GET', 'lookup', { fixture: 'beverage1' }, {statusCode: 200, body: 'wow'})
      .get('select[name=dropdown-cocktail]').select('Tequila')
      .get('button[name=recipe-button]').click()
      .get('article img.fav-icon').click()
      .get('a[name=preferences]').click()
      .get('.favorite-message').should('not.exist')
      .get('article h3').should('have.text', 'Margarita')
      .get('article img.fav-icon').click()
      .get('article').should('not.exist')
  })

  it('Should display a message indicating that there are no favorite recipes at this time', () => {
    cy.get('a[name=preferences]').click()
      .get('.favorite-message').should('have.text', 'You don\'t have any favorite recipes at this time, add some to see them here!')
  })

  it('Should be able to fill out the trivia form and view the trivia questions', () => {
    cy.intercept('GET', 'difficulty', { fixture: 'trivia-response' }, {statusCode: 200, body: 'wow'})
      .get('select[name=dropdown-trivia]').select('Medium')
      .get('button[name=trivia-button]').click()
      .get('h2').should('have.text', 'Category: Mythology')
      .get('article h3').should('have.text', 'Question 1 of 10:')
      .get('article p').should('have.text', 'Neptune\'s greek name was...')
  })

  it('Should be able to play a game of trivia, view results, and start a new game', () => {
    cy.intercept('GET', 'difficulty', { fixture: 'trivia-response' }, {statusCode: 200, body: 'wow'})
      .get('select[name=dropdown-trivia]').select('Medium')
      .get('button[name=trivia-button]').click()
      .get('h2').should('have.text', 'Category: Mythology')
      .get('article h3').should('have.text', 'Question 1 of 10:')
      .get('article p').should('have.text', 'Neptune\'s greek name was...')
      .get('article button.correct').click()
      .get('article p').should('have.text', 'A minotaur is half human half what?')
      .get('article button.correct').click()
      .get('article p').should('have.text', 'What is the name of the Greek god of blacksmiths?')
      .get('article button.correct').click()
      .get('article p').should('have.text', 'Which of the following is not one of the Greek Fates?')
      .get('article button.correct').click()
      .get('article p').should('have.text', 'In African mythology, Anansi is a trickster and storyteller who takes the shape of which animal?')
      .get('article button.correct').click()
      .get('article p').should('have.text', 'Who is the god of war in Polynesian mythology?')
      .get('article button.correct').click()
      .get('article p').should('have.text', 'The Norse god Odin has two pet crows named "Huginn" and "Muninn".  What do their names mean?')
      .get('article button.correct').click()
      .get('article p').should('have.text', 'What is the name of the first human being in Norse mythology?')
      .get('article button.correct').click()
      .get('article p').should('have.text', 'Hel was the daughter of which Norse Mythological figure?')
      .get('article button.correct').click()
      .get('article p').should('have.text', 'What animal did Queen Pasipahe sleep with before she gave birth to the Minotaur in Greek Mythology?')
      .get('article button.correct').click()
      .get('article p').should('have.text', 'You got 10 out of 10 correct!')
      .get('article button[name=button-newgame]').click()
      .get('article p').should('have.text', 'Neptune\'s greek name was...')
  })

  it('Should be able to add and remove possible trivia categories from preferences', () => {
    cy.get('a[name=preferences]').click()
      .get('[type="checkbox"]:first').uncheck()
      .get('[type="checkbox"]:first').check()
  })

  it('Should handle bad API responses from trivia API', () => {
    cy.intercept('GET', 'difficulty', {statusCode: 500, response: '{"error": "bad"}'})
      .get('select[name=dropdown-trivia]').select('Medium')
      .get('.error').should('have.text', 'Something went wrong. Please refresh the page and try again.')
  })

  it('Should handle bad API responses from cocktail API', () => {
    cy.intercept('GET', 'Tequila', {statusCode: 500, response: '{"error": "bad"}'})
      .intercept('GET', 'lookup', {statusCode: 500, response: '{"error": "bad"}'})
      .get('select[name=dropdown-cocktail]').select('Tequila')
      .get('.error').should('have.text', 'Something went wrong. Please refresh the page and try again.')
  })
})
