export interface Expenses {
	expenses: Array<Expense>;
}

export interface Expense {
	_id: string;
	cost: number;
	dayCharged: number;
	name: string;
}

export interface HomeProject {
	_id: string;
	name: string;
	priority: number;
	details: {
		cost?: number;
		savedTowardCost?: number;
	};
}

export interface User {
	username: string;
	password: string;
	name: string | (() => string);
}
