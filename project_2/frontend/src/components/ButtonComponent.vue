<template>
	<div class="control pl-2 pr-2">
		<button @click="emit('click', $event)" class="button is-uppercase has-text-weight-normal" :class="classes">
			<slot />
		</button>
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";

interface Props {
	outlined?: boolean;
	type?: string;
	padding?: number;
	fontSize?: number;
	rounded?: boolean;
	light?: boolean;
	size?: string;
	parentWidth?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	padding: 5,
	fontSize: 6,
	rounded: false,
	light: false,
	size: "default",
	outlined: false,
	parentWidth: false,
});

const emit = defineEmits<{
	(e: "click", value: MouseEvent): void;
}>();

const classes = computed(() => {
	const classArray = [];
	if (props.type) {
		classArray.push(`is-${props.type}`);
	}

	if (props.rounded) {
		classArray.push("is-rounded");
	}

	if (props.light) {
		classArray.push("is-light");
	}

	if (props.outlined) {
		classArray.push("is-outlined");
	}

	if (props.parentWidth) {
		classArray.push("is-parent-width");
	}

	classArray.push(`pr-${props.padding}`);
	classArray.push(`pl-${props.padding}`);
	classArray.push(`is-size-${props.size}`);

	console.log(classArray.join(" "));

	return classArray.join(" ");
});
</script>
