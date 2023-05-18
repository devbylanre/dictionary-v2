const searchField = document.querySelector('#searchField');
const submitBtn = document.querySelector('#submitBtn');


//declare errors
const setError = (error) => {
	return error;
	console.log(error)
}

//fetch data
const fetchData = (url) => {
	document.querySelector('#preloader').classList.add('flex')

	fetch(url)
	.then(response => {
		response.ok 
		? (
			document.querySelector('#preloader').classList.remove('flex'), 
			console.log(response.json())
		)
		: (
			console.log('error fetching', searchField.value), 
			document.querySelector('#preloader').classList.remove('flex') 
		)
	})
	.catch(err => {
		//outputs error functions
		console.log(searchField.value, err)
		setTimeout(() => document.querySelector('#preloader').classList.remove('flex'), 4000) 
	})

}


submitBtn.addEventListener('click', () => {
	//api endpoint
	const api = 
	'https://api.dictionaryapi.dev/api/v2/entries/en/' + searchField.value;

	//regex expression
	const inputRegex = /[A-z]$/;

	(inputRegex.test(searchField.value)) 
	? (
		console.log(searchField.value),
		//fecthes data
		fetchData(api)
	)
	: console.log(setError('invalid characters'))
	
})