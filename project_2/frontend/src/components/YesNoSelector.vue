<template>
	<button-list-selector v-model="value" :options="options"> </button-list-selector>
</template>
<script lang="ts" setup>
import ButtonListSelector from "./SelectorComponent.vue";
import { computed, ref } from "vue";

export interface Props {
	modelValue?: boolean | null;
}

const props = withDefaults(defineProps<Props>(), {
	modelValue: null,
});

const emit = defineEmits<{
	(e: "update:modelValue", value: boolean | null): void;
}>();

const options = ref([
	{
		text: "No",
		value: "no",
	},
	{
		text: "Yes",
		value: "yes",
	},
]);

/**
 * Create the v-model used to two-way bind the value of this component.
 */
const value = computed({
	get() {
		if (props.modelValue === true) {
			return "yes";
		} else if (props.modelValue === false) {
			return "no";
		}
		return null;
	},
	set(value: string | null) {
		if (value === "no") {
			emit("update:modelValue", false);
		} else if (value === "yes") {
			emit("update:modelValue", true);
		} else {
			emit("update:modelValue", null);
		}
	},
});
</script>
