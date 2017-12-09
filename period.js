class Period {
	constructor(days) {
		if (days !== undefined) {
			this._days = days;
		} else {
			this._days = [];
		}
	}

	getDays() {
		return this._days;
	}

	getDay(order) {
		return this.getDays()[order - 1];
	}

	push(day) {
		if (this._days.length === 0) {
			this._days[0] = day;
		} else {
			this._days.push(day);
		}
	}
}

module.exports = Period;