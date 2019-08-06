const printCharts = () => {
	doughnutChart('goals-chart', 200)
}

const doughnutChart = (id, height) => {
	height ? (document.getElementById(id).height = height) : null
	new Chart(id, {
		type: 'doughnut',
		data: {
			labels: ['Proteins', 'Fats', 'Carbohydrates'],
			datasets: [
				{
					label: 'Your macros',
					data: [
						document.getElementById('proteins').value,
						document.getElementById('fats').value,
						document.getElementById('carbohydrates').value
					],
					// borderColor: ['rgba(0, 50, 250, .7)', 'rgba(0, 250, 50, .7)', 'rgba(255, 255, 0, .7)'],
					backgroundColor: ['rgba(79,202,184, 1)', 'rgba(243,102,117,1)', 'rgba(115,107,250,1)']
				}
			]
		},
		options: {
			legend: {
				position: 'left'
			}
		}
	})
}

printCharts()
