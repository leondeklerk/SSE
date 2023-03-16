<template>
	<page-component>
		<template #headerLeft> <h1 class="title">Create new project</h1> </template>
		<template #default>
			<div class="columns is-centered">
				<div class="column is-half">
					<input-component v-model="projectName" :has-icon="false">
						<template #name> Project name </template>
					</input-component>
					<multiselect-component :on-entry-add="onEntryAdd" v-model="selectedCompanies" :list="companyOptions">
						<template #name> Companies </template>
						<template #modalHeader><p class="title is-uppercase has-text-weight-normal is-size-4">Add company</p></template>
						<template #modalContent="slotProps">
							<add-company :close="slotProps.close"></add-company>
						</template>
					</multiselect-component>
				</div>
			</div>
		</template>
		<template #footer>
			<div class="field is-grouped is-pulled-right">
				<button-component @click="cancel"> cancel </button-component>
				<button-component @click="create" type="primary"> create </button-component>
			</div>
		</template>
	</page-component>
</template>

<script setup lang="ts">
import PageComponent from "@/components/PageComponent.vue";
import ButtonComponent from "@/components/ButtonComponent.vue";
import InputComponent from "@/components/InputComponent.vue";
import MultiselectComponent, { type ListItem } from "@/components/MultiselectComponent.vue";
import { useRouter } from "vue-router";
import { ref, type Ref } from "vue";
import { ModalResponseType, type ModalResponse } from "@/types/ModalTypes";
import type { CompanyAddData } from "@/types/ResponseTypes";
import AddCompany from "@/components/AddCompany.vue";

const router = useRouter();
const projectName = ref("");

const selectedCompanies: Ref<Set<number>> = ref(new Set());
const companyOptions: Ref<ListItem[]> = ref([]);

companyOptions.value.push(
	{
		id: 0,
		text: "Company A",
	},
	{
		id: 1,
		text: "Company B",
	},
	{
		id: 2,
		text: "Company C",
	},
);

function onEntryAdd(response: ModalResponse<CompanyAddData | null>): void {
	if (response.success && response.type === ModalResponseType.SUCCESS) {
		if (response.data) {
			companyOptions.value.push({
				id: response.data.id,
				text: response.data.name,
			});
		}
	}
}

function cancel() {
	router.push("/");
}

function create() {
	router.push("/");
}
</script>
