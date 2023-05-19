const searchField = document.querySelector("#searchField");
const submitBtn = document.querySelector("#submitBtn");

//declare errors
const setError = (error) => {
  console.log(error);
  return error;
};

//fetch data
const fetchData = (url) => {
  document.querySelector("#preloader").classList.add("flex");

  fetch(url)
    .then((response) => {
      response.ok
        ? (
            setTimeout(() => document.querySelector("#preloader").classList.remove("flex"), 4000),
            displayResults(response.json())
          )
        : (
            setTimeout(() => document.querySelector("#preloader").classList.remove("flex"), 6000),
            setError('Error occured while fetching results')
          ) 
    })
    .catch((error) => {
      setTimeout(() => document.querySelector("#preloader").classList.remove("flex"),
        6000
      );
      //outputs error functions
      setError('Unable to fetch meaning of', searchField.value)
    });
};


const setSynonym = () => {
  const relatedWord = document.querySelector('#related').innerText;
  searchField.value = relatedWord;
  //api endpoint
  const api =
    "https://api.dictionaryapi.dev/api/v2/entries/en/" + searchField.value;

  //regex expression
  const inputRegex = /[A-z]$/;

  
  inputRegex.test(searchField.value)
    ? (setError(''),
      //fecthes data
      fetchData(api))
    : setError("invalid characters");
}

document.querySelector('#related').addEventListener('click', setSynonym);



// Display results to console.
const displayResults = (results) => { 
  console.log(results)
}

submitBtn.addEventListener("click", () => {
  //api endpoint
  const api =
    "https://api.dictionaryapi.dev/api/v2/entries/en/" + searchField.value;

  //regex expression
  const inputRegex = /[A-z]$/;

  
  inputRegex.test(searchField.value)
    ? (setError(''),
      //fecthes data
      fetchData(api))
    : setError("invalid characters");
});
