<template>
	<div class="control">
		<div class="">
			<div v-for="(option, index) in options" :key="index" class="radio">
				<div class="is-flex is-flex-direction-column pl-4 pr-0">
					<input type="radio" :checked="value?.value == option.value" @click="value = option" />
					<p class="pt-2 has-text-centered">{{ option.label }}</p>
				</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { computed } from "vue";

export type LikertOption = {
	value: number;
	label: string;
};

export interface Props {
	modelValue?: LikertOption | null;
	options: LikertOption[];
}

const props = withDefaults(defineProps<Props>(), {
	modelValue: null,
});

const emit = defineEmits<{
	(e: "update:modelValue", value: LikertOption | null): void;
}>();

/**
 * Create the v-model used to two-way bind the value of this component.
 */
const value = computed({
	get() {
		return props.modelValue;
	},
	set(value: LikertOption | null) {
		emit("update:modelValue", value);
	},
});
</script>
