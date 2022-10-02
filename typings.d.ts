export interface Expenses {
	_id: string;
	_rev: string;
	_type: string;
	_updatedAt: string;
	expenses: Array<Expense>;
}

export interface Expense {
	_key: string;
	cost: number;
	dayCharged: number;
	payableTo: string;
}

export interface HomeProject {
	_id: string;
	_rev: string;
	_type: string;
	name: string;
	priority: number;
}
