<template>
	<div class="control is-parent-width">
		<div class="buttons has-addons is-centered">
			<button
				v-for="(button, index) in options"
				@click="set(button.value)"
				class="button"
				:class="{ 'is-selected is-primary': modelValue === button.value }"
				:key="index"
			>
				{{ button.text }}
			</button>
		</div>
	</div>
</template>
<script lang="ts" setup>
import type { Option } from "@/types/InputTypes";
import { computed } from "vue";

export interface Props {
	options?: Option[];
	modelValue?: string | null;
}

const props = withDefaults(defineProps<Props>(), {
	options: () => [],
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

function set(newVal: string) {
	if (value.value === newVal) {
		value.value = null;
	} else {
		value.value = newVal;
	}
}
</script>
