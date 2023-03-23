<template>
	<component :is="inPage ? 'div' : PageComponent">
		<template v-if="!inPage" #headerLeft>
			<h1 class="title">Questionnaire</h1>
		</template>
		<template #default>
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
							<div class="column is-two-fifths">
								<likert-component
									v-if="question.answerType === 'scale'"
									v-model="(question as LikertQuestion).value"
									:options="(question as LikertQuestion).options"
								/>
								<yes-no-selector v-else-if="question.answerType === 'boolean'" v-model="(question as BooleanQuestion).value" />
								<selector-component
									v-else-if="question.answerType === 'selector'"
									v-model="(question as SelectorQuestion).value"
									:options="(question as SelectorQuestion).options"
								/>
								<dropdown-component
									v-else-if="question.answerType === 'dropdown'"
									v-model="(question as DropdownQuestion).value"
									:options="(question as DropdownQuestion).options"
								/>
								<input-component v-else v-model="(question as InputQuestion).value" />
							</div>
						</div>
					</template>
				</template>
			</collapsable-container>
			<score-component v-if="inPage" :total-score="totalScore" :category-scores="categoryScores" />
		</template>

		<template #footer v-if="!inPage">
			<score-component :total-score="totalScore" :category-scores="categoryScores" />
		</template>
	</component>
</template>

<script lang="ts" setup>
import LikertComponent from "@/components/LikertComponent.vue";
import YesNoSelector from "@/components/YesNoSelector.vue";
import CollapsableContainer from "@/components/CollapsableContainer.vue";
import SelectorComponent from "@/components/SelectorComponent.vue";
import InputComponent from "@/components/InputComponent.vue";
import ScoreComponent from "@/components/ScoreComponent.vue";
import DropdownComponent from "@/components/DropdownComponent.vue";
// Is used as a dynamic component
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import PageComponent from "@/components/PageComponent.vue";
import { reactive, computed, ref, type Ref } from "vue";
import { get } from "@/helpers/ApiHandler";
import type { BooleanQuestion, DropdownQuestion, InputQuestion, LikertQuestion, Question, SelectorQuestion } from "@/types/QuestionTypes";
import type { ApiResponse, QuestionResponse } from "@/types/ResponseTypes";
import type { Option } from "@/types/InputTypes";

export type Category = {
	id: number;
	text: string;
	questions: Question[];
};

export type CategoryScore = {
	text: string;
	score: number;
};

interface Props {
	inPage?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	inPage: false,
});

const categories: Ref<Category[]> = ref([]);

const results = await get<QuestionResponse>("/questions", false);

buildData(results);

function buildData(results: ApiResponse<QuestionResponse>) {
	const result: Category[] = [];
	if (!results.result) {
		return result;
	}
	const data = results.result.data.questions;

	const tempData: Record<string, Category> = {};
	data.forEach((qData, index) => {
		if (!tempData[qData.category]) {
			tempData[qData.category] = {
				id: index,
				text: qData.category,
				questions: [],
			};
		}

		const category = tempData[qData.category];

		let answerType: "input" | "boolean" | "dropdown" | "selector" | "scale" = "input";
		switch (qData.answerType) {
			case "Boolean":
				answerType = "boolean";
				break;
			case "Dropdown":
				answerType = "dropdown";
				break;
			case "Options":
				answerType = "selector";
				break;
			case "Scale":
				answerType = "scale";
				break;
		}

		let question: Question = {
			id: index,
			value: null,
			text: qData.text,
			answerType: answerType,
			options: null,
			scores: {},
		};

		let options: Option[] = [];
		let scores: Record<string, number> = {};
		for (let option of qData.options) {
			const key = Object.keys(option)[0];
			options.push({
				value: key,
				text: key,
			});
			scores[key] = option[key];
		}

		question.scores = scores;

		if (options.length > 0) {
			question.options = options;
		}

		category.questions.push(question);
	});

	for (let category in tempData) {
		result.push(tempData[category]);
	}

	categories.value = result;
}

const categoryScores = computed(() => {
	let scores: { text: string; score: number }[] = [];
	categories.value.forEach((category) => {
		let score = 0;
		category.questions.forEach((question) => {
			const value = question.value;
			if (value == null) {
				return;
			}

			const addScore = question.scores[`${value}`];
			if (addScore) {
				score += addScore;
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
