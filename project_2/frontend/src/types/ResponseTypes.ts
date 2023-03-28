export interface CompanyAddData {
	name: string;
	id: number;
}

export type ApiResponse<T> = {
	success: boolean;
	result: T | null;
	error: any | null;
};

export type User = {
	__v: number;
	_id: string;
	createdAt: string;
	email: string;
	name: string;
	role: string;
	updatedAt: string;
};

export type UserRegisterResponse = User;

export type UserLoginResponse = {
	access_token: string;
	status: string;
};

export type UserDataResponse = {
	data: {
		user: User;
	};
	status: string;
};

export type QuestionResponse = {
	status: string;
	result: number;
	data: {
		questions: QuestionData[];
	};
};

export type Option = {
	value: string | boolean;
	score: number;
};

export type QuestionData = {
	_id: string;
	text: string;
	answerType: "selector" | "boolean" | "dropdown" | "scale" | "input";
	explanation: string;
	category: string;
	standaloneQuestion: boolean | undefined;
	compareQuestion: boolean | undefined;
	options: Option[];
};

export type CategoryResponse = {
	data: {
		categories: CategoryData[];
	};
	result: number;
	status: string;
};

export type CategoryData = {
	_id: string;
	explanation: string;
	name: string;
};
