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
					<div class="container is-italic has-text-grey-dark">
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
								<div class="container is-italic is-size-6 pt-1 has-text-grey-dark">
									{{ question.explanation }}
								</div>
							</td>
							<td class="">
								{{ question.answerText || "-" }}
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
import { computed, ref, type ComputedRef, type Ref } from "vue";
import type { CategoryResult, ResultData } from "@/types/ResultTypes";
import { useResultStore } from "@/stores/results";
import CollapsableContainer from "@/components/CollapsableContainer.vue";
import type { CategoryResultScore } from "@/types/ScoreTypes";
import { get } from "@/helpers/ApiHandler";
import type { CategoryResponse } from "@/types/ResponseTypes";
import { useRouter } from "vue-router";

interface Props {
	submitData?: CategoryResult[];
	/**
	 * Indicates if the current component is its own page or loaded within a page.
	 */
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
			explanation: categoryExplanations.value[categoryResult.name],
			score: categoryResult.questions.reduce((sum, current) => sum + current.score, 0),
			maxScore: categoryResult.questions.length,
		};
	});
});

const categoryResults: ComputedRef<CategoryResult[]> = computed(() => {
	if (props.submitData) {
		return props.submitData;
	}

	return storeData.submitData;
});

if (!inPageComp.value && categoryResults.value.length === 0) {
	const router = useRouter();
	router.push({ name: "questions" });
}

get<CategoryResponse>("/categories/", false).then((res) => {
	if (res.success) {
		res.result?.data.categories.forEach((result) => {
			categoryExplanations.value[result.name] = result.explanation;
		});
	}
});

const categoryExplanations: Ref<Record<string, string>> = ref({});

const totalExplanation = ref("This is an explanation of the total");
</script>
