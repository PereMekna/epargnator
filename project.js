class Project {
	constructor(date, amount, label) {
		this._date = new Date(date);
		this._amount = amount;
		this._label = label;
	}

	getOrder() {
		let oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
		let firstDate = new Date(Date.UTC(2017, 0, 1));		
		return 1 + Math.round(Math.abs((firstDate.getTime() - this._date.getTime())/(oneDay)));
	}

	getAmount() {
		return this._amount;
	}

	getDate() {
		return this._date;
	}
}

module.exports = Project;