<template>
	<div>
		<collapsable-container v-for="(category, index) of categories" :key="index">
			<template #header>
				{{ category.text }}
			</template>
			<template #default>
				<template v-for="(question, qIndex) of category.questions" :key="qIndex">
					<div class="columns is-vcentered is-centered has-text-centered-mobile">
						<div class="column">
							{{ question.text }}
						</div>
						<div class="column is-one-third">
							<checkbox-component class="" v-if="question.answerType === 'boolean'" v-model="(question as BooleanQuestion).value" />
							<likert-component
								v-else-if="question.answerType === 'scale'"
								v-model="(question as LikertQuestion).value"
								:options="(question as LikertQuestion).options"
							/>
							<yes-no-selector
								v-else-if="question.answerType === 'booleanSelector'"
								v-model="(question as BooleanSelectorQuestion).value"
							/>
							<selector-component
								v-else-if="question.answerType === 'selector'"
								v-model="(question as SelectorQuestion).value"
								:options="(question as SelectorQuestion).options"
							/>
							<input-component v-else v-model="(question as InputQuestion).value" />
						</div>
					</div>
				</template>
			</template>
		</collapsable-container>
		<div>
			<div class="title">Category scores</div>
			<div v-for="(cat, index) of categoryScores" :key="index" class="level">
				<div>{{ cat.text }}</div>
				<div class="pr-1">{{ cat.score }}</div>
			</div>
		</div>
		<div class="columns pr-0 m-0 mt-4 mb-2 is-vcentered is-centered">
			<hr class="column p-0 m-0" />
			<span class="column is-narrow icon p-0 pl-6">
				<i class="fas fa-plus fa-lg"></i>
			</span>
		</div>
		<div class="level">
			<div class="">Total</div>
			<div class="pr-1">
				{{ totalScore }}
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import LikertComponent, { type LikertOption } from "@/components/LikertComponent.vue";
import CheckboxComponent from "@/components/CheckboxComponent.vue";
import YesNoSelector from "@/components/YesNoSelector.vue";
import CollapsableContainer from "@/components/CollapsableContainer.vue";
import SelectorComponent from "@/components/SelectorComponent.vue";
import InputComponent from "@/components/InputComponent.vue";
import { reactive, ref, type Ref, computed } from "vue";
import type { SelectorOption } from "@/components/SelectorComponent.vue";

export interface Question {
	id: number;
	text: string;
	answerType: "boolean" | "scale" | "booleanSelector" | "selector" | "input";
	value: boolean | string | number | null;
}

export interface BooleanQuestion extends Question {
	answerType: "boolean";
	value: boolean;
}

export interface InputQuestion extends Question {
	answerType: "input";
	value: string | number | null;
}

export interface BooleanSelectorQuestion extends Question {
	answerType: "booleanSelector";
	value: boolean | null;
}

export interface SelectorQuestion extends Question {
	answerType: "selector";
	value: string | null;
	options: SelectorOption[];
}

export interface LikertQuestion extends Question {
	options: LikertOption[];
	value: number | null;
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
				answerType: "booleanSelector",
				value: null,
			},
			{
				id: 2,
				text: "Question A - 3",
				answerType: "selector",
				options: [
					{
						value: "mit",
						text: "MIT",
					},
					{
						value: "gpl",
						text: "GPL",
					},
					{
						value: "apache",
						text: "APACHE",
					},
				],
				value: null,
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
				answerType: "input",
				value: null,
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

const categoryScores = computed(() => {
	let scores: { text: string; score: number }[] = [];
	categories.forEach((category) => {
		let score = 0;
		category.questions.forEach((question) => {
			const value = question.value;
			if (typeof value === "boolean") {
				if (value) {
					score += 1;
				}
			} else if (typeof value === "number") {
				if (value > 0) {
					score += value;
				}
			} else if (typeof value === "string") {
				if (value !== "") {
					score += 1;
				}
			}
		});
		scores.push({ text: category.text, score: score });
	});
	return scores;
});

const totalScore = computed(() => {
	let total = 0;
	for (let cat of categoryScores.value) {
		total += cat.score;
	}
	return total;
});
</script>
