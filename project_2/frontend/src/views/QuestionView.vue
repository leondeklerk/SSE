<template>
	<div>
		<collapsable-container v-for="(category, index) of categories" :key="index">
			<template #header>
				{{ category.text }}
			</template>
			<template #default>
				<div v-for="(question, qIndex) of category.questions" :key="qIndex" class="level">
					<div class="level-left">{{ question.text }}</div>
					<div class="level-right">
						<checkbox-component v-if="question.answerType === 'boolean'" v-model="(question as BooleanQuestion).value" />
						<likert-component v-else v-model="(question as LikertQuestion).value" :options="(question as LikertQuestion).options" />
					</div>
				</div>
			</template>
		</collapsable-container>
	</div>
</template>

<script lang="ts" setup>
import LikertComponent, { type LikertOption } from "@/components/LikertComponent.vue";
import CheckboxComponent from "@/components/CheckboxComponent.vue";
import CollapsableContainer from "@/components/CollapsableContainer.vue";
import { reactive, ref, type Ref } from "vue";

export interface Question {
	id: number;
	text: string;
	answerType: "boolean" | "scale";
}

export interface BooleanQuestion extends Question {
	answerType: "boolean";
	value: boolean;
}

export interface LikertQuestion extends Question {
	options: LikertOption[];
	value: LikertOption | null;
	answerType: "scale";
}

export type Category = {
	id: number;
	text: string;
	questions: Question[];
};

const likertOptions = reactive([
	{
		value: 1,
		label: "One",
	},
	{
		value: 2,
		label: "Two",
	},
	{
		value: 3,
		label: "Three",
	},
	{
		value: 4,
		label: "Four",
	},
	{
		value: 5,
		label: "Five",
	},
]);

const categories: Category[] = reactive([
	{
		id: 0,
		text: "Category A",
		questions: [
			{
				id: 0,
				text: "Question A - 1",
				answerType: "boolean",
				value: false,
			},
			{
				id: 1,
				text: "Question A - 2",
				answerType: "scale",
				value: null,
				options: likertOptions,
			},
			{
				id: 2,
				text: "Question A - 3",
				answerType: "boolean",
				value: false,
			},
			{
				id: 3,
				text: "Question A - 4",
				answerType: "scale",
				value: null,
				options: likertOptions,
			},
			{
				id: 4,
				text: "Question A - 5",
				answerType: "boolean",
				value: false,
			},
		],
	},
	{
		id: 1,
		text: "Category B",
		questions: [
			{
				id: 0,
				text: "Question B - 1",
				answerType: "boolean",
				value: false,
			},
			{
				id: 1,
				text: "Question B - 2",
				answerType: "scale",
				value: null,
				options: likertOptions,
			},
			{
				id: 2,
				text: "Question B - 3",
				answerType: "scale",
				value: null,
				options: likertOptions,
			},
			{
				id: 3,
				text: "Question B - 4",
				answerType: "scale",
				value: null,
				options: likertOptions,
			},
			{
				id: 4,
				text: "Question B - 5",
				answerType: "scale",
				value: null,
				options: likertOptions,
			},
		],
	},
	{
		id: 2,
		text: "Category C",
		questions: [
			{
				id: 0,
				text: "Question C - 1",
				answerType: "scale",
				value: null,
				options: likertOptions,
			},
			{
				id: 1,
				text: "Question C - 2",
				answerType: "scale",
				value: null,
				options: likertOptions,
			},
			{
				id: 2,
				text: "Question C - 3",
				answerType: "scale",
				value: null,
				options: likertOptions,
			},
			{
				id: 3,
				text: "Question C - 4",
				answerType: "scale",
				value: null,
				options: likertOptions,
			},
			{
				id: 4,
				text: "Question C - 5",
				answerType: "scale",
				value: null,
				options: likertOptions,
			},
			{
				id: 5,
				text: "Question C - 6",
				answerType: "scale",
				value: null,
				options: likertOptions,
			},
			{
				id: 6,
				text: "Question C - 7",
				answerType: "boolean",
				value: false,
			},
		],
	},
]);
</script>
