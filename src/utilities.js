const utilities = {
  cleanRecipeData(recipeData) {
    const properties = Object.keys(recipeData)

    const cleanedData = properties.reduce((acc, curr) => {
      if (recipeData[curr] !== null) {
        acc[curr] = recipeData[curr]
      }
      return acc
    }, {})

    return cleanedData
  }
}

export default utilities
