const Project = require("./project");
const day = require("./day");
const Period = require("./period");
const Epargnator = require("./epargnator");
const Accounts = require("./accounts");

class Main {
	constructor() {
		this.INCOME = 1500;
		this.SPENDING = Math.random() * 430;
		this.LOYER = Math.random() * 500 + 300;

		let date = new Date(Date.UTC(2017, 0, 1));
		let index = 1;
		const year = new Period();
		while (date < new Date(Date.UTC(2018, 0, 1))) {
			let income = 0;
			let spending = this.spendingRnd();
			if (date.getDate() === 1) {
				income = this.INCOME;
			}
			if (date.getDate() === 7) {
				spending = this.LOYER;
			}

			year.push(new day(index, date, income, spending));
			let ms = date.getTime() + 86400000;
			date = new Date(ms);
			index++;
		}

		// Projet du 01/06/2017
		const vacances = new Project(new Date(Date.UTC(2017, 5, 1)), 400, "Vacances");

		// Projet du 01/09/2017
		const vacances2 = new Project(new Date(Date.UTC(2017, 8, 1)), 800, "Vacances 2");

		// Projet du 01/12/2017
		const noel = new Project(new Date(Date.UTC(2017, 11, 1)), 1000, "Noël");


		const projects = [vacances, vacances2, noel];

		// Accounts(montant compte courant, montant compte épargne)
		const accounts = new Accounts(0, 0);

		const epargnator = new Epargnator(year, projects, accounts);

		this._amounts = epargnator.getAllAmounts();	
	}

	getAmounts() {
		return this._amounts;
	}

	spendingRnd() {
		const random = Math.random() * 800 + this.SPENDING;
		return random/30;
	}
	/*
	const january = new day(1, "January", INCOME, spendingRnd());
	const february = new day(2, "February", INCOME, spendingRnd());
	const march = new day(3, "March", INCOME, spendingRnd());
	const april = new day(4, "April", INCOME, spendingRnd());
	const may = new day(5, "May", INCOME, spendingRnd());
	const june = new day(6, "June", INCOME, spendingRnd());
	const july = new day(7, "July", INCOME, spendingRnd());
	const august = new day(8, "August", INCOME, spendingRnd());
	const september = new day(9, "September", INCOME, spendingRnd());
	const october = new day(10, "October", INCOME, spendingRnd());
	const november = new day(11, "November", INCOME, spendingRnd());
	const december = new day(12, "December", INCOME, spendingRnd());


	const year = new Period([january, february, march, april, may, june, july, august, september, october, november, december]);
	*/
}

module.exports = Main;