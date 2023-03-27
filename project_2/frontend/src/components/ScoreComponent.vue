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
			<div class="pr-1">{{ cat.score }}</div>
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
		<div class="pr-1">
			{{ totalScore }}
		</div>
	</div>
	<ModalComponent ref="modal" type="info">
		<template #header> <div class="title">Score explanation</div></template>
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
	totalExplanation?: string;
	categoryScores: CategoryResultScore[];
}

const props = withDefaults(defineProps<Props>(), {});

const modal: Ref<typeof ModalComponent | null> = ref(null);

const totalScore = computed(() => {
	return props.categoryScores.reduce((sum, current) => sum + current.score, 0);
});

const explanation = computed(() => {
	let ex = "<div class='block'>Start of explanation</div>";
	props.categoryScores.forEach((categoryScore) => {
		if (categoryScore.explanation) {
			ex += `<div class='block'>${categoryScore.name}: ${categoryScore.explanation}</div>`;
		}
	});
	if (props.totalExplanation) {
		ex += `<div class='block'>Total: ${props.totalExplanation}</div>`;
	}
	return ex;
});

function showInfo() {
	if (modal.value !== null) {
		modal.value.open();
	}
}
</script>
