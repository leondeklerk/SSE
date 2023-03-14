<template>
	<div class="field">
		<div class="control has-icons-left has-icons-right">
			<label class="label">
				<slot name="name"></slot>
			</label>
			<div class="control">
				<input class="input" :type="type" v-model="value" :placeholder="placeholder" />
				<span class="icon is-small is-left">
					<slot name="icon"></slot>
				</span>
				<span v-if="!valid" class="icon is-small is-right">
					<i class="fas fa-exclamation-triangle"></i>
				</span>
			</div>
		</div>
		<p v-if="errorMessage && !valid" class="help is-danger">{{ computedError }}</p>
		<p v-else class="help is-danger" v-html="'&nbsp;'"></p>
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";

export interface Props {
	modelValue: string;
	type?: string;
	placeholder?: string;
	valid?: boolean;
	errorMessage?: string;
}

const props = withDefaults(defineProps<Props>(), {
	modelValue: "",
	type: "text",
	valid: true,
	errorMessage: "",
});

const emit = defineEmits<{
	(e: "update:modelValue", value: string): void;
}>();

/**
 * Create the v-model used to two-way bind the value of this component.
 */
const value = computed({
	get() {
		return props.modelValue;
	},
	set(value: string) {
		emit("update:modelValue", value);
	},
});

/**
 * Creates an error message.
 * Either contains the error message if defined
 * or an empty character to make sure space is reserved for any message in the layout.
 */
const computedError = computed(() => {
	if (props.valid) {
		return "&nbsp;";
	} else {
		if (props.errorMessage === "") {
			return "&nbsp;";
		} else {
			return props.errorMessage;
		}
	}
});
</script>
