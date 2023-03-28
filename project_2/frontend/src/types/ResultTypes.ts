export type CategoryResult = {
	name: string;
	questions: QuestionResult[];
};

export type QuestionResult = {
	question: string;
	explanation: string;
	answerText: string;
	score: number;
};

export type ResultData = {
	submitData: CategoryResult[];
	inPage: boolean;
};
