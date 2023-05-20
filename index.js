const searchField = document.querySelector("#searchField");
const submitBtn = document.querySelector("#submitBtn");

//declare errors
const setError = (error) => {
  console.log(error);
}

//displays response data
const displayData = (results) => {
  document.querySelector("#resultElement").innerHTML = 
  results.map((result, key) => {
      console.log(result);
      const {meanings, word, phonetics} = result;
      //condition
      if (key === 0) {
        return (
          `
            <div class='result'>
              <div class="tab">
                <h1 class="tab__item tab__item--active">Definitions</h1>
                <h1 class="tab__item">Synonyms</h1>
                <h1 class="tab__item">Antonyms</h1>
              </div>
              <div class="result__definitions">
						    <div class="result__definitions__texts">
							    <h1>${word}</h1>
							    <p>${phonetics[0].text}</p>
						    </div>
                <div class="result__definitions__audio">
                  <!-- Uploaded to: SVG Repo, www.svgrepo.com, Generator: SVG Repo Mixer Tools -->
                  <svg width="24px" height="24px" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
                    <path d="m 8 0 c -1.660156 0 -3 1.339844 -3 3 v 5 c 0 1.660156 1.339844 3 3 3 s 3 -1.339844 3 -3 v -5 c 0 -1.660156 -1.339844 -3 -3 -3 z m -6 6 v 2.011719 c 0 2.964843 2.164062 5.429687 5 5.90625 v 2.082031 h 2 v -2.082031 c 2.835938 -0.476563 5 -2.941407 5 -5.90625 v -2.011719 h -1.5 v 2.011719 c 0 2.5 -1.992188 4.488281 -4.5 4.488281 s -4.5 -1.988281 -4.5 -4.488281 v -2.011719 z m 0 0" fill="#2e3436"/>
                  </svg>
                </div>
					    </div>
              ${meanings.map((mapMeaning) => {
                const {definitions, partOfSpeech, synonyms, antonyms} = mapMeaning
                return `
                  <div class="result__meanings">
						        <h6>${partOfSpeech}</h6>
						        <div class="result__meanings__example">
							        <p>
								        ${meanings[0].definitions.map((mapDefinition, key) => {
                          return `<p>${key}. ${mapDefinition.definition}</p>`
                        }).join('')}
							        </p>
						        </div>
					        </div>
                `
              })}
            </div>
          `
        )
      }
    }).join('')
}

//get meaning of words
const getMeanings = async (keyword) => {
  const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${searchField.value}`);
  const data = await response.json();
  return data;
}

//fetch data
const fetchData = () => {
  document.querySelector("#preloader").classList.add("flex");

  getMeanings()
    .then(data => {
      (data)
      ? (
        document.querySelector("#preloader").classList.remove("flex"),
        displayData(data)
      )
      : (
        document.querySelector("#preloader").classList.remove("flex"),
        setError('failed to fetch data')
      )
    })
    .catch(error => setError(error))
 };

submitBtn.addEventListener("click", () => {
  //regex expression
  const inputRegex = /[A-z]$/;
  
  inputRegex.test(searchField.value)
  ? (
      //fecthes data
      fetchData()
    )
  : setError('invalid characters');
});
