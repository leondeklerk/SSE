<template>
	<div class="control">
		<label class="checkbox">
			<input v-model="value" type="checkbox" />
			<slot></slot>
		</label>
	</div>
</template>
<script lang="ts" setup>
import { computed } from "vue";

export interface Props {
	modelValue?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	modelValue: false,
});

const emit = defineEmits<{
	(e: "update:modelValue", value: boolean): void;
}>();

/**
 * Create the v-model used to two-way bind the value of this component.
 */
const value = computed({
	get() {
		return props.modelValue;
	},
	set(value: boolean) {
		emit("update:modelValue", value);
	},
});
</script>
