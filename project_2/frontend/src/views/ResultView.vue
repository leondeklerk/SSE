<template>
	<component :is="inPageComp ? 'div' : PageComponent">
		<template v-if="!inPageComp" #headerLeft>
			<h1 class="title">Results</h1>
		</template>
		<template #default>
			<collapsable-container v-for="(category, index) of categoryResults" :key="index">
				<template #header>
					{{ category.name }}
				</template>
				<template #default>
					<div class="container is-italic">
						<span class="icon has-text-info">
							<i class="fas fa-info-circle"></i>
						</span>
						{{ categoryExplanations[category.name] }}
					</div>
					<hr />
					<table class="table is-striped is-fullwidth">
						<thead>
							<th>Question</th>
							<th>Answer</th>
							<th>Score</th>
						</thead>
						<tr v-for="(question, qIndex) of category.questions" :key="qIndex">
							<td class="">
								{{ question.question }}
								<div class="container is-italic is-size-6">
									{{ questionExplanations[question.question] }}
								</div>
							</td>
							<td class="">
								{{ question.answerText }}
							</td>
							<td class="">
								{{ question.score }}
							</td>
						</tr>
					</table>
				</template>
			</collapsable-container>
			<score-component v-if="inPageComp" :total-explanation="totalExplanation" :category-scores="categoryScores" />
		</template>
		<template #footer v-if="!inPageComp">
			<score-component :total-explanation="totalExplanation" :category-scores="categoryScores" />
		</template>
	</component>
</template>
<script lang="ts" setup>
// Is used as a dynamic component
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import PageComponent from "@/components/PageComponent.vue";
import ScoreComponent from "@/components/ScoreComponent.vue";
import { computed, ref, type ComputedRef } from "vue";
import type { CategoryResult, ResultData } from "@/types/ResultTypes";
import { useResultStore } from "@/stores/results";
import CollapsableContainer from "@/components/CollapsableContainer.vue";
import type { CategoryResultScore } from "@/types/ScoreTypes";

interface Props {
	submitData?: CategoryResult[];
	inPage?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	inPage: false,
});

const store = useResultStore();

const storeData: ResultData | null = store.data;

const inPageComp = computed(() => {
	if (props.inPage) {
		return props.inPage;
	}
	return storeData.inPage;
});

const categoryScores: ComputedRef<CategoryResultScore[]> = computed(() => {
	return categoryResults.value.map((categoryResult) => {
		return {
			name: categoryResult.name,
			// Replace by fetch
			explanation: "This is the category score explanation",
			score: categoryResult.questions.reduce((sum, current) => sum + current.score, 0),
		};
	});
});

const categoryResults: ComputedRef<CategoryResult[]> = computed(() => {
	if (props.submitData) {
		return props.submitData;
	}

	return storeData.submitData;
});

const categoryExplanations = computed(() => {
	const result: Record<string, string> = {};
	categoryResults.value.forEach((categoryResult) => {
		// Replace by fetch
		result[categoryResult.name] = "This is the category explanation";
	});
	return result;
});

const questionExplanations = computed(() => {
	const result: Record<string, string> = {};
	categoryResults.value.forEach((categoryResult) => {
		categoryResult.questions.forEach((questionResult) => {
			// Replace by fetch
			result[questionResult.question] = "This is a question explanation";
		});
	});
	return result;
});

const totalExplanation = ref("This is an explanation of the total");
</script>
