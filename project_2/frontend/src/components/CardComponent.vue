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
				<button-component
					@click="$emit('buttonClick', button.name)"
					:class="{ 'is-parent-width': button.parentWidth || false }"
					:parent-width="button.parentWidth || false"
					:outlined="button.outlined || false"
					:type="button.type"
					>{{ button.text }}</button-component
				>
			</div>
		</footer>
	</div>
</template>

<script setup lang="ts">
import { withDefaults } from "vue";
import ButtonComponent from "./ButtonComponent.vue";

export type CardButton = {
	parentWidth?: boolean;
	outlined?: boolean;
	type?: string;
	name: string;
	text: string;
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
