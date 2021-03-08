context('Triviology Website', () => {
  const baseUrl = 'http://localhost:3000/'

  beforeEach(() => {
    cy.visit(baseUrl)
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
      .get('article h3').should('have.text', 'Margarita')
      .get('article img.fav-icon').click()
      .get('article').should('not.exist')
  })

})
