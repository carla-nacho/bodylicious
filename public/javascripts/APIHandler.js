class APIHandler {
	constructor(baseUrl) {
		this.foods = axios.create({ baseURL: baseUrl })
	}

	getFullList() {
		this.foods
			.get(`/V2/reports?ndbno=01009&type=f&format=json&api_key=${process.env.APP_KEY}`)
			.then(food => console.log(food))
			.catch(err => console.log(err))
	}
}
