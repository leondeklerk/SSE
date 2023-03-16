<template>
	<page-component>
		<template #headerLeft> <h1 class="title">Create new project</h1> </template>
		<template #default> Create form </template>
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
import { useRouter } from "vue-router";

const router = useRouter();

function cancel() {
	router.push("/");
}

function create() {
	router.push("/");
}
</script>
