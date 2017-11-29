class Epargnator {
	constructor(period, projects, accounts) {
		this._period = period;
		this._projects = projects;
		this._accounts = accounts;
		this._amounts = {};
	}

	getAllAmounts() {
		let reportNextMonth = 0;
		for (let dayIndex in this.getDays()) {
			let day = this.getDay(dayIndex);

			let balance = day.getAvailableMoney();
			this._accounts.addAmountToCurrent(balance);

			let projectsAmount = this.handleProjectsInDay(day.getOrder());
			this._accounts.pay(projectsAmount);

			let monthlyAmount = 0;
			if (day.getLabel().getDate() === 1) {
				monthlyAmount  = this.getMonthlyAmount(day.getOrder());
				reportNextMonth = this.handleSaving(monthlyAmount, reportNextMonth);
			}

			this._amounts[day.getOrder()] = {
				day: day.getLabel(),
				epargne: monthlyAmount,
				balance: balance,
				projets: projectsAmount, 
				current: this._accounts.getCurrentAmount(),
				saving: this._accounts.getSavingAmount()
			};
		}
		return this._amounts;
	}

	handleSaving(monthlyAmount, reportNextMonth) {
		if (monthlyAmount + reportNextMonth > this._accounts.getCurrentAmount()) {
			this._accounts.transferCurrentToSaving(this._accounts.getCurrentAmount());
			return reportNextMonth + monthlyAmount - this._accounts.getCurrentAmount();
		} else {
			this._accounts.transferCurrentToSaving(monthlyAmount + reportNextMonth);
			return 0;
		}
	}

	handleNegative(day, dailyAmount, reportNextDay, projectsAmount) {
		this._accounts.transferCurrentToSaving(dailyAmount + reportNextDay);
		this._accounts.pay(projectsAmount);

		day.setEstimatedSaving(dailyAmount + reportNextDay);
	}

	getDay(index) {
		return this.getDays()[index];
	}

	getMonthlyAmount(order) {
		if (this.isDayInPeriod(order)) {
			let monthlyAmount = 0;
			for (let projectIndex in this._projects) {
				let project = this._projects[projectIndex];
				if (order <= project.getOrder()) {
					monthlyAmount += project.getAmount() / (project.getDate().getUTCMonth() - this.getLowestOrder());
				}
			}
			return monthlyAmount;
		}
		return 0;
	}

	isDayInPeriod(order) {
		for (let dayIndex in this.getDays()) {
			let day = this.getDay(dayIndex);
			if (day.getOrder() === order) {
				return true;
			}
		}
		return false;
	}

	getDays() {
		if (this._period !== undefined) {
			return this._period.getDays();
		}
		return [];
	}

	getLowestOrder() {
		let lowest = Infinity;
		for (let dayIndex in this.getDays()) {
			let day = this.getDays()[dayIndex];
			if (day.getOrder() < lowest) {
				lowest = day.getOrder();
			}
		}
		return lowest;
	}

	getProjectsByDay(order) {
		var projects = [];
		for (let projectIndex in this._projects) {
			let project = this._projects[projectIndex];
			if (project.getOrder() === order) {
				projects.push(project);
			}
		}
		return projects;
	}

	handleProjectsInDay(order) {
		let amountToWithdraw = 0;
		let projects = this.getProjectsByDay(order);
		for (let projectIndex in projects) {
			let project = projects[projectIndex];
			amountToWithdraw += project.getAmount();
		}
		return amountToWithdraw;
	}
}

module.exports = Epargnator;