<template>
	<div class="">
		<div class="">
			<label class="label">
				<slot name="name"></slot>
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
				<button-component @click="openModal" :parent-width="true" :control-padding="false"> Add new company </button-component>
			</div>
		</div>
	</div>
	<ModalComponent :enable-footer="enableAddFooter" :on-close="onEntryAdd" ref="modal">
		<template #header>
			<slot name="modalHeader" />
		</template>
		<template #default="slotProps">
			<slot name="modalContent" :close="slotProps.close"></slot>
		</template>
		<template #footer>
			<slot name="modalFooter" />
		</template>
	</ModalComponent>
</template>

<script setup lang="ts">
import type { ModalResponse } from "@/types/ModalTypes";
import { computed, ref, type Ref } from "vue";
import ButtonComponent from "./ButtonComponent.vue";
import ModalComponent from "./ModalComponent.vue";

export type ListItem = {
	id: number;
	text: string;
};

export interface Props {
	modelValue: Set<number>;
	list?: ListItem[];
	placeholder?: string;
	enableAddFooter?: boolean;
	onEntryAdd?: (response: ModalResponse<any>) => void;
}

const props = withDefaults(defineProps<Props>(), {
	modelValue: () => new Set<number>(),
	list: () => [],
	enableAddFooter: false,
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

const modal: Ref<typeof ModalComponent | null> = ref(null);

function openModal() {
	modal.value?.open();
}

function onSelect(id: number) {
	if (value.value.has(id)) {
		value.value.delete(id);
	} else {
		value.value.add(id);
	}
}
</script>
