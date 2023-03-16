<template>
	<div class="">
		<div class="">
			<label class="label">
				<slot></slot>
			</label>
			<div class="has-outline has-max-height">
				<div
					class="p-1"
					:class="{ 'has-background-primary-light': value.has(item.id) }"
					@click="onSelect(item.id)"
					v-for="(item, index) of list"
					:key="index"
				>
					{{ item.text }}
				</div>
			</div>
			<div class="mt-3">
				<button-component @click="open" :parent-width="true" :padding="0"> Add new company </button-component>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useModal } from "vue-final-modal";
import ButtonComponent from "./ButtonComponent.vue";
import ModalComponent from "./ModalComponent.vue";
import AddCompany from "./AddCompany.vue";

export type ListItem = {
	id: number;
	text: string;
};

export interface Props {
	modelValue: Set<number>;
	list?: ListItem[];
	placeholder?: string;
}

const props = withDefaults(defineProps<Props>(), {
	modelValue: () => new Set<number>(),
	list: () => [],
});

const emit = defineEmits<{
	(e: "update:modelValue", value: Set<number>): void;
}>();

/**
 * Create the v-model used to two-way bind the value of this component.
 */
const value = computed({
	get() {
		return props.modelValue;
	},
	set(value: Set<number>) {
		emit("update:modelValue", value);
	},
});

const { open, close } = useModal({
	component: ModalComponent,
	attrs: {
		title: "Add company",
		onConfirm() {
			close();
		},
	},
	slots: {
		default: AddCompany,
	},
});

function onSelect(id: number) {
	if (value.value.has(id)) {
		value.value.delete(id);
	} else {
		value.value.add(id);
	}
}
</script>
