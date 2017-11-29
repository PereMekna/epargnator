class Day {
	constructor(order, label, plannedIncome, plannedSpending) {
		this._order = order;
		this._label = label;
		this._plannedIncome = plannedIncome;
		this._plannedSpending = plannedSpending;
		this._estimatedSaving = 0;
	}

	getOrder() {
		return this._order;
	}

	getAvailableMoney() {
		return this._plannedIncome - this._plannedSpending;
	}

	setEstimatedSaving(amount) {
		this._estimatedSaving = amount;
	}

	getLabel() {
		return this._label;
	}
}

module.exports = Day;