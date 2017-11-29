class Accounts {
	constructor(current, saving) {
		this._current = current;
		this._saving = saving;
	}

	getCurrentAmount() {
		return this._current;
	}

	getSavingAmount() {
		return this._saving;
	}

	transferCurrentToSaving(amount) {
		this._current -= amount;
		this._saving += amount;
	}

	addAmountToCurrent(amount) {
		this._current += amount;
	}

	pay(price) {
		this._current -= price;
		if (this._current < 0) {
			this._saving += this._current;
			this._current += -this._current;
		}
		/*
		if (this._current - price < 0) {
			this._saving -= price - this._current;
			this._current = 0;
		} else if (this._saving - price < 0) {
			this._current -= price - this._saving;
			this._saving = 0;
		} else {
			this._current -= price;
		}
		*/
	}
}

module.exports = Accounts;