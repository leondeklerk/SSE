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
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";

export interface Props {
	modelValue: string | null;
	type?: string;
	placeholder?: string;
}

const props = withDefaults(defineProps<Props>(), {
	modelValue: null,
	type: "text",
});

const emit = defineEmits<{
	(e: "update:modelValue", value: string | null): void;
}>();

const value = computed({
	get() {
		return props.modelValue;
	},
	set(value: string | null) {
		emit("update:modelValue", value);
	},
});
</script>
