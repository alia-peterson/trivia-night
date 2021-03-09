const fetchAPI = {
  getInformation(url) {
    return fetch(url)
      .then(response => response.json())
      .catch(error => console.log(error))
  }
}

export default fetchAPI
