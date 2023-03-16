<template>
	<page-component>
		<template #headerLeft> <h1 class="title">Create new project</h1> </template>
		<template #default>
			<div class="columns is-centered">
				<div class="column is-half">
					<input-component v-model="projectName">
						<template #name> Project name </template>
					</input-component>
					{{ selectedCompanies }}
					<multiselect-component v-model="selectedCompanies" :list="companyOptions"> Companies </multiselect-component>
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

function cancel() {
	router.push("/");
}

function create() {
	router.push("/");
}
</script>
