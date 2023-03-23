<template>
	<div class="control columns is-centered" @blur="open = false">
		<div class="dropdown is-active column is-narrow">
			<div class="dropdown-trigger">
				<button @click="open = !open" class="button is-centered">
					<span v-if="value === null">Select an option</span>
					<span v-else>{{ value }}</span>
					<span class="icon is-small">
						<i class="fas fa-angle-down" aria-hidden="true"></i>
					</span>
				</button>
			</div>
			<div class="dropdown-menu" id="dropdown-menu" role="menu">
				<div class="dropdown-content" style="max-height: 20em; overflow-y: scroll" v-show="open">
					<a
						@click="set(option.value)"
						class="dropdown-item"
						:class="{ 'is-active': option.value === value }"
						v-for="(option, index) in options"
						:key="index"
					>
						{{ option.text }}
					</a>
				</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts" setup>
import { computed, ref } from "vue";
import type { Option } from "@/types/InputTypes";

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

const open = ref(false);

function set(newVal: string) {
	open.value = false;
	if (value.value === newVal) {
		value.value = null;
	} else {
		value.value = newVal;
	}
}
</script>
