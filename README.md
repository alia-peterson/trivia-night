# Triviology

## Table of Contents
* [Introduction](#introduction)
* [Technologies](#technologies)
* [Deployment](#deployment)
* [Features](#features)
* [Future Improvements](#future-improvements)
* [Wins & Challenges](#wins-&-challenges)
* [Author](#author)

## Introduction
Have you been longing for a trivia night with your friends? In the remote reality we're currently living through, I know I was really missing out on the experience of getting together with friends, having a few drinks, and playing some trivia. Triviology solves this problem by providing one application to combine the two aspects of a trivia night: drinks and questions. Information has been provided by two public APIs: The [Open Trivia Database](https://opentdb.com/api_config.php) and [The Cocktail DB](https://www.thecocktaildb.com/api.php).

### Motivation
* To identify a niche audience to build an application for
* To gain experience writing [user personas](https://gist.github.com/alia-peterson/6cae7470909d9faca039cfffa686c631) to consider while building an application
* To build a final application for the FrontEnd Module 3 program at Turing School

## Technologies
React.js, React-Router, Cypress.io, Fetch, JSON, CSS, HTML

## Deployment
This website was deployed to Heroku through Heroku’s automated deploy pipeline.  
[Triviology Deployment Link]()

**To run locally:**
1. Clone this repository onto your machine
2. `cd` into repository
3. `npm install`
4. `npm start`

## Features
* [Home](#home)
* [Preferences](#preferences)
* [Recipe](#recipe)
* [Favoriting Recipes](#favoriting-recipes)
* [Trivia](#trivia)
* [Accessibility](#accessibility)

### Home
When you visit the website for the first time, you will see a form that can be filled out with a drink base (i.e. vodka, gin, etc.) and a trivia difficulty. Once each of these dropdowns has been populated, the corresponding links to each page will become available/enabled, allowing you to navigate between pages with ease.

Local Storage has been utilized to allow for a simple, usable experience. You can navigate between pages, refresh, or close the window and return at a later date and your recipe and trivia information will be maintained.

<img width="1440" alt="Triviology Home Page" src="https://user-images.githubusercontent.com/70297733/110402544-d1202200-8038-11eb-8fc5-cc2b4dca94d5.png">

### Preferences
As there are quite a few categories provided by the Trivia API, I decided the best way to allow for a user to customize this information was to provide a preferences page (rather than another dropdown on the home page). The default settings have all of the potential categories selected. Unchecking any of the category boxes will update the categories in the local storage, allowing the information to persist across multiple site visits.

<img width="1440" alt="Screen Shot 2021-03-08 at 6 21 31 PM" src="https://user-images.githubusercontent.com/70297733/110403881-1d6c6180-803b-11eb-9bbd-15a800d51923.png">

### Recipe
Once you have selected a drink base, you will be able to navigate to the recipe page. Notice in the image below that the header now includes a `Recipe` link and the `View Recipe` button in the form is now enabled.

<img width="1440" alt="Details page" src="https://user-images.githubusercontent.com/70297733/110402704-1ba19e80-8039-11eb-9756-ec76e537e26b.png"> <br/>

Select either the `Recipe` link in the header or the `View Recipe` button to be taken to a page that looks like this:

<img width="1440" alt="White Russian Recipe Example" src="https://user-images.githubusercontent.com/70297733/110404051-67edde00-803b-11eb-9a57-a813c0bd41cd.png"> <br/>

Select the `Generate New Beverage` button to view a new recipe with the same base that was selected on the home page.

### Favoriting Recipes
If you decide you'd like to save a recipe for later, simply click the yellow heart in the upper left of the recipe card. It will toggle to a filled heart, and this recipe will now be included on the preferences page:

<img width="1440" alt="Screen Shot 2021-03-08 at 6 32 29 PM" src="https://user-images.githubusercontent.com/70297733/110404753-a6d06380-803c-11eb-971d-e99177ab1daf.png"> <br/>

Click the yellow heart again and the recipe will be removed from your favorites.

### Trivia
Similar to selecting a drink base, you can select a trivia difficulty from the difficulty dropdown. Once you've done so, the corresponding link and button become available to navigate to the first trivia question.

<img width="1440" alt="Screen Shot 2021-03-08 at 6 33 37 PM" src="https://user-images.githubusercontent.com/70297733/110404815-cd8e9a00-803c-11eb-8c2c-11be47b7b11b.png"> <br/>

Select the `Trivia` link in the header, the `View Trivia` button on the home page, or the (now enabled) `Start Trivia` button on the recipe page to be taken to a page that looks like this:

<img width="1440" alt="Screen Shot 2021-03-08 at 6 35 22 PM" src="https://user-images.githubusercontent.com/70297733/110404953-0b8bbe00-803d-11eb-9127-96ed706fd16d.png"> <br/>

Once an answer is selected, visual feedback will be provided to indicate whether the question was answered correctly or not (buttons turn green and red). After all ten questions have been answered, you'll be able to see your score, `Play Again` with the same set of questions, or start a `New Game` with new questions based on your category preferences.

<img width="1440" alt="Screen Shot 2021-03-08 at 6 40 08 PM" src="https://user-images.githubusercontent.com/70297733/110405367-b69c7780-803d-11eb-95fb-69fbd85f9fd0.png">

### Accessibility
This app was built with all users in mind. Lighthouse and [WAVE](https://wave.webaim.org/) were utilized to work towards including as broad of an audience as possible. Please reach out if you have suggestions for improvements or to address any areas that I may have missed.

## Future Improvements
- Allow users to enter their own recipes to be stored locally in the website. This would not include a POST to the Cocktail API but would be stored locally with other information.

- Creating a backend. Similar to the above idea, it would be nice to have the ability for a user to sign in and save information under a username. This would allow information to be maintained across machines, allowing a user to create their own recipes without the risk of losing them when they switch to a different device.

## Wins & Challenges
- Learning to use the different APIs was a little difficult as there were properties that corresponded with each other that needed to be combined in some way.

- Using React Hooks for the first time was a little difficult and it took time for me to figure out which situations best utilized them.

- Getting to put all my learnings together into one large project was very satisfying and allowed me to work through new problems on my own, at my own pace.

- I created an app that I'm extremely proud of and hope to use for years to come.

## Author
[Alia Peterson](https://github.com/alia-peterson)  
<img src="https://avatars3.githubusercontent.com/u/70297733?s=400&u=f7e7c3682b498a90f005565b56b38a8ac985b053&v=4" alt="Ms. Peterson"
width="150" height="auto"/>
