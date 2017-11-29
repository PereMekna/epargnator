class Period {
	constructor(days) {
		this._days = days;
	}

	getDays() {
		return this._days;
	}

	getDay(order) {
		return this.getDays()[order - 1];
	}

	push(day) {
		this._days.push(day);
	}
}

module.exports = Period;