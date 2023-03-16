<template>
	<div>
		<div class="pt-4 pb-4">
			<input-component v-model="companyName">
				<template #name> Company name </template>
				<template #icon><i class="fa-solid fa-building"></i></template>
			</input-component>
		</div>
		<div class="field is-grouped is-pulled-right">
			<button-component @click="close<null>(false, ModalResponseType.CANCEL, null)"> cancel </button-component>
			<button-component @click="closeContainer" type="primary"> submit </button-component>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ModalResponseType } from "@/types/ModalTypes";
import type { CompanyAddData } from "@/types/ResponseTypes";
import { ref } from "vue";
import ButtonComponent from "./ButtonComponent.vue";
import InputComponent from "./InputComponent.vue";

interface Props {
	close: <T>(success: boolean, type: ModalResponseType, data: T) => void;
}

const props = withDefaults(defineProps<Props>(), {});
const companyName = ref("");

function closeContainer() {
	props.close<CompanyAddData>(true, ModalResponseType.SUCCESS, {
		id: 4,
		name: "Company D",
	});
}
</script>
