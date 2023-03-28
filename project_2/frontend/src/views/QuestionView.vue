<template>
	<component :is="inPage ? 'div' : PageComponent">
		<template v-if="!inPage" #headerLeft>
			<h1 class="title">Questionnaire</h1>
		</template>
		<template #default>
			<collapsable-container v-for="(category, index) of categories" :key="index" :collapse-initial="index !== 0">
				<template #header>
					{{ category.text }}
				</template>
				<template #default>
					<table class="table is-striped is-fullwidth">
						<thead class="is-two-fifths">
							<th>Question</th>
							<th class="has-text-centered">Answer</th>
						</thead>
						<tr v-for="(question, qIndex) of category.questions" :key="qIndex">
							<!-- <div class="columns is-vcentered is-centered has-text-centered-mobile"> -->
							<td>
								{{ question.text }}
							</td>
							<td>
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
							</td>
							<!-- </div> -->
						</tr>
					</table>
				</template>
			</collapsable-container>
			<button-component :type="'primary'" class="is-pulled-right" v-if="inPage" @click="submit">Submit</button-component>
		</template>

		<template #footer v-if="!inPage">
			<button-component :type="'primary'" class="is-pulled-right" @click="submit">Submit</button-component>
		</template>
	</component>
</template>

<script lang="ts" setup>
import LikertComponent from "@/components/LikertComponent.vue";
import YesNoSelector from "@/components/YesNoSelector.vue";
import CollapsableContainer from "@/components/CollapsableContainer.vue";
import SelectorComponent from "@/components/SelectorComponent.vue";
import InputComponent from "@/components/InputComponent.vue";
import DropdownComponent from "@/components/DropdownComponent.vue";
import ButtonComponent from "@/components/ButtonComponent.vue";
// Is used as a dynamic component
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import PageComponent from "@/components/PageComponent.vue";
import { ref, type Ref } from "vue";
import { get } from "@/helpers/ApiHandler";
import type { BooleanQuestion, DropdownQuestion, InputQuestion, LikertQuestion, Question, SelectorQuestion, Category } from "@/types/QuestionTypes";
import type { ApiResponse, QuestionResponse } from "@/types/ResponseTypes";
import type { Option } from "@/types/InputTypes";
import { useRouter } from "vue-router";
import { useResultStore } from "@/stores/results";
import type { CategoryResult, QuestionResult } from "@/types/ResultTypes";

interface Props {
	inPage?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	inPage: false,
});

const categories: Ref<Category[]> = ref([]);

const results = await get<QuestionResponse>("/questions", false);
const router = useRouter();

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

		const answerType = mapInputType(qData.answerType);

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

// Map back-end to front-end types (should be refactored)
function mapInputType(inType: string): "input" | "boolean" | "dropdown" | "selector" | "scale" {
	let answerType: "input" | "boolean" | "dropdown" | "selector" | "scale" = "input";
	switch (inType) {
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
	return answerType;
}

function submit() {
	const store = useResultStore();

	store.setResult({
		submitData: buildResultData(),
		inPage: props.inPage,
	});

	router.push({
		name: "result",
	});
}

function buildResultData() {
	let results: CategoryResult[] = [];
	categories.value.forEach((category) => {
		let questions: QuestionResult[] = [];
		category.questions.forEach((question) => {
			questions.push({
				question: question.text,
				answerText: getAnswerText(question),
				score: getScore(question),
			});
		});

		results.push({ name: category.text, questions: questions });
	});
	return results;
}

function getScore(question: Question): number {
	let score = 0;
	if (question.value) {
		score = question.scores[`${question.value}`];
	}
	return score;
}

function getAnswerText(question: Question): string {
	let answerText = "";
	switch (question.answerType) {
		case "boolean":
			if (question.value === false) {
				answerText = "No";
			} else if (question.value === true) {
				answerText = "Yes";
			}
			break;
		case "input":
			answerText = question.value?.toString() || "";
			break;
		default:
			answerText = question.options?.find((option) => option.value === question.value)?.text || "";
			break;
	}

	return answerText;
}
</script>
