<template>
	<div @click="showInfo">
		<div class="level">
			<div class="title">Category scores</div>
			<span class="icon has-text-info">
				<i class="fas fa-info-circle"></i>
			</span>
		</div>

		<div v-for="(cat, index) of categoryScores" :key="index" class="level">
			<div>{{ cat.name }}</div>
			<div class="pr-1">{{ categoryScorePercentages[cat.name] }}</div>
		</div>
	</div>
	<div class="columns pr-0 m-0 mt-4 mb-2 is-vcentered is-centered">
		<hr class="column p-0 m-0 is-four-fifth" />
		<span class="column is-one-fifth icon p-0 pl-6">
			<i class="fas fa-plus fa-lg is-pulled-right"></i>
		</span>
	</div>
	<div class="level">
		<div class="">Total</div>
		<div class="pr-1">{{ totalPercentage }}%</div>
	</div>
	<ModalComponent ref="modal" type="info">
		<template #header> <div class="title">Score clarification</div></template>
		<template #default>
			<div v-html="explanation"></div>
		</template>
	</ModalComponent>
</template>

<script setup lang="ts">
import type { CategoryResultScore } from "@/types/ScoreTypes";
import { computed, ref, type Ref } from "vue";
import ModalComponent from "./ModalComponent.vue";

interface Props {
	totalExplanation?: string[];
	categoryScores: CategoryResultScore[];
}

const props = withDefaults(defineProps<Props>(), {});

const modal: Ref<typeof ModalComponent | null> = ref(null);

const totalPercentage = computed(() => {
	let totalScore = props.categoryScores.reduce((sum, current) => sum + current.score, 0);
	let totalScoreMax = props.categoryScores.reduce((sum, current) => sum + current.maxScore, 0);
	return Math.floor((totalScore / totalScoreMax) * 100);
});

const categoryScorePercentages = computed(() => {
	const result: Record<string, string> = {};
	props.categoryScores.forEach((categoryScore) => {
		result[categoryScore.name] = `${Math.floor((categoryScore.score / categoryScore.maxScore) * 100)}%`;
	});
	return result;
});

const explanation = computed(() => {
	let ex = `
        <div class='block'>
            The result of the questionnaire is an indication of the sustainability of the company and their software. 
            The result is composed from all questions that are either answered or unanswered, excluding the questions answered with 'not applicable'.
        </div>
        <div class='block'>
            Each question is worth one point at most. Answers are either worth full points (zero or one) or a fraction between 0 and 1.
            For each category a total number of points is displayed indicating the performance in regards to the specific aspects of that category.
            The total score is an aggregation of the different categories and indicates the overall performance.
        </div>
        <div class='block'>
            As all projects are different, these results should not be taken as a single source of truth.
            They are designed to assess various aspects, but should be put into context.
            The results can be used as a comparable metric, as well as an guideline to improve the processes of a company and or project.
            
        </div>`;
	props.categoryScores.forEach((categoryScore) => {
		if (categoryScore.explanation) {
			ex += `<div class='block'><b>${categoryScore.name} (${categoryScorePercentages.value[categoryScore.name]})</b></div>`;
			categoryScore.explanation.forEach((expl) => (ex += `<div class='block'>${expl}</div>`));
		}
	});
	if (props.totalExplanation) {
		ex += `<div class='block'><b>Total (${totalPercentage.value}%)</b><br/></div>`;
		props.totalExplanation.forEach((expl) => {
			ex += `<div class='block'>${expl}</div>`;
		});
	}
	return ex;
});

function showInfo() {
	if (modal.value !== null) {
		modal.value.open();
	}
}
</script>
