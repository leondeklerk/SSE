<template>
	<div class="control has-text-centered">
		<div class="columns">
			<div v-for="(option, index) in options" :key="index" class="radio column">
				<div class="" @click="value = option.text">
					<input type="radio" :checked="value === option.text" />
					<p class="pt-2 has-text-centered">{{ option.text }}</p>
				</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { computed } from "vue";
import type { Option } from "../types/InputTypes";

export interface Props {
	modelValue?: string | null;
	options: Option[];
}

const props = withDefaults(defineProps<Props>(), {
	modelValue: null,
});

const emit = defineEmits<{
	(e: "update:modelValue", value: string | null): void;
}>();

/**
 * Create the v-model used to two-way bind the value of this component.
 */
const value = computed({
	get() {
		return props.modelValue;
	},
	set(value: string | null) {
		emit("update:modelValue", value);
	},
});
</script>
