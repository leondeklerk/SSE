<template>
	<div>
		<div class="title">Category scores</div>
		<div v-for="(cat, index) of categoryScores" :key="index" class="level">
			<div>{{ cat.text }}</div>
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
</template>

<script setup lang="ts">
import type { CategoryScore } from "@/views/QuestionView.vue";

interface Props {
	totalScore: number;
	categoryScores: CategoryScore[];
}

const props = withDefaults(defineProps<Props>(), {});
</script>
