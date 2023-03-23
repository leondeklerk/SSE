import type { Option } from "./InputTypes";

export interface Question {
	id: number;
	text: string;
	answerType: "boolean" | "scale" | "boolean" | "selector" | "input" | "dropdown";
	value: boolean | string | number | null;
	options: Option[] | null;
	scores: Record<string, number>;
}

export interface BooleanQuestion extends Question {
	answerType: "boolean";
	value: boolean | null;
}

export interface InputQuestion extends Question {
	answerType: "input";
	value: string | number | null;
}

export interface SelectorQuestion extends Question {
	answerType: "selector";
	value: string | null;
	options: Option[];
}

export interface DropdownQuestion extends Question {
	answerType: "dropdown";
	value: string | null;
	options: Option[];
}

export interface LikertQuestion extends Question {
	options: Option[];
	value: number | null;
	answerType: "scale";
}