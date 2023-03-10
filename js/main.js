import searchComponent from './components/search-page.js'
import repoComponent from './components/repo/repo-page.js'
const rootElem = document.querySelector('#root')
const userContainer = document.createElement('div')
const methods = () => {
	document.display = display
	document.searchUser = searchUser
}
const fetchData = async (user) => {
	userContainer.innerHTML = `<div class="loader"></div>`;
	const data = await fetch(`https://api.github.com/users/${user}`)
		.then(data => data.json())
		.catch(err => console.log(err))
	return data
}

const refinedFetchedData = async (user) => {
	let data = await fetchData(user)
	for (let props in data) {
		data[props] === '' || data[props] === null ? data[props] = 'Not Available' : undefined
	}
	return data
}

const toggleSearchBtn = () => {
	const newInputField = document.querySelector('#input__field')
	const searchBtn = document.querySelector('#search__btn')
	if (newInputField.value == '') {
		searchBtn.disabled = true

		if (screen.availWidth >= 600) {
			searchBtn.style.backgroundColor = 'rgba(0, 0, 0, 0.3)'
		} else {
			searchBtn.style.color = 'rgba(0, 0, 0, 0.3)'
		}

	} else {
		searchBtn.disabled = false
		searchBtn.style.backgroundColor = ''
		searchBtn.style.color = ''
	}
	newInputField.addEventListener('input', toggleSearchBtn)
}

const responsive = () => {
	const searchBtn = document.querySelector('#search__btn')
	if (screen.availWidth >= 600) {
		searchBtn.innerText = 'Search'
	}
}

let inputValue = 'ex'

const searchUser = () => {
	const inputData = document.querySelector('#input__field')
	display(inputData.value)
	inputValue = inputData.value
	inputData.value = ''
}


const showAlert = () => {
	userContainer.innerHTML = `
	  <div id="alert-box">
	  	<p>Try again</p>
	  	<i class="fa fa-exclamation-circle" aria-hidden="true"></i>
		<p id="alert-message">User Not Found</p>
		<p>Enter valid username<p>
		<button id="close-btn">Close</button>
	  </div>
	`;
	
	rootElem.appendChild(userContainer);
	
	const alertBox = document.getElementById("alert-box");
	const closeBtn = document.getElementById("close-btn");
  
	closeBtn.addEventListener("click", () => {
	  alertBox.style.display = "none";
	});
  };

const display = async (user = inputValue) => {
	const userData = await refinedFetchedData(user)
	rootElem.innerHTML = `<div id="search__page"> 
	<div id="search__section">
		<div id="search__container">
			<i class="fas fa-search"></i>
			<input id="input__field" type="text" placeholder="Enter username">
			<button onclick="searchUser()" id="search__btn"><p class="fas fa-search"></p></button>
		</div>
	</div></div>`
	userContainer.innerHTML = `<div class="loader"></div>`;
	rootElem.append(userContainer);
	toggleSearchBtn()
	responsive()
	const dispUser = () => {
		userData.message !== 'Not Found' ? rootElem.innerHTML = searchComponent(userData, display) : showAlert();
		toggleSearchBtn()
		responsive()
		repoComponent(userData)
	}
	setTimeout(dispUser, 1000);
}

display()

methods()

document.addEventListener('keyup', e => event.key == "Enter" ? searchUser() : undefined, false);
