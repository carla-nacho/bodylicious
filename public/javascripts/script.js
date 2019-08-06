document.addEventListener(
	'DOMContentLoaded',
	() => {
		if (document.getElementById('start-btn')) {
			document.getElementsByClassName('navbar')[0].classList.add('display-none')
			document.getElementsByClassName('navbar')[1].classList.add('display-none')
		}

		console.log('IronGenerator JS imported successfully!')
	},
	false
)
