<template>
	<div class="card">
		<header class="card-header">
			<h1 class="title card-header-title">
				{{ props.title }}
			</h1>
		</header>
		<div class="card-content">
			<div class="content">
				<slot></slot>
			</div>
		</div>
		<footer class="card-footer">
			<div class="card-footer-item" v-for="(button, index) in buttons" :key="index">
				<button @click="$emit('buttonClick', button.name)" class="button is-fluid container" :class="button.class">{{ button.text }}</button>
			</div>
		</footer>
	</div>
</template>

<script setup lang="ts">
import { withDefaults } from "vue";

export type CardButton = {
	name: string;
	text: string;
	class: string;
};

interface Props {
	title?: string;
	buttons?: CardButton[];
}

const props = withDefaults(defineProps<Props>(), {
	title: "",
	buttons: () => [],
});

defineEmits<{
	(e: "buttonClick", value: string): void;
}>();
</script>
