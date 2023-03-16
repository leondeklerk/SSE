export enum ModalResponseType {
	SUCCESS,
	CANCEL,
}

export interface ModalResponse<T> {
	success: boolean;
	type: ModalResponseType;
	data: T;
}
