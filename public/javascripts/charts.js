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
					backgroundColor: ['rgba(79,202,184, 0.95)', 'rgba(243,102,117,0.95)', 'rgba(115,107,250,0.95)'],
					borderColor: ['rgba(79,202,184, 1)', 'rgba(243,102,117,1)', 'rgba(115,107,250,1)']
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
