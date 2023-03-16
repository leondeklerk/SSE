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
