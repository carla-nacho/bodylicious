document.addEventListener(
	'DOMContentLoaded',
	() => {
		if (document.getElementById('start-btn')) {
			document.getElementsByClassName('navbar')[0].classList.add('display-none')
			document.getElementsByClassName('navbar')[1].classList.add('display-none')
		}

		document.getElementById('goals').addEventListener('change', () => {
			if (document.getElementById('goals').value === 'Lose fat') {
				document.getElementById('calories').value = 1500
				document.getElementById('proteins').value = 50
				document.getElementById('fats').value = 20
				document.getElementById('carbohydrates').value = 30
			} else if (document.getElementById('goals').value === 'Gain muscle') {
				document.getElementById('calories').value = 3000
				document.getElementById('proteins').value = 30
				document.getElementById('fats').value = 30
				document.getElementById('carbohydrates').value = 40
			} else if (document.getElementById('goals').value === 'Maintenance') {
				document.getElementById('calories').value = 2000
				document.getElementById('proteins').value = 25
				document.getElementById('fats').value = 25
				document.getElementById('carbohydrates').value = 50
			}
		})

		console.log('IronGenerator JS imported successfully!')
	},
	false
)
