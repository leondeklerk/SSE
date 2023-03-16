<template>
	<page-component>
		<template #headerLeft>
			<h1 class="title">Project {{ route.params.id }}</h1>
		</template>
		<template #headerRight>
			<button class="button is-medium is-rounded is-light is-primary">
				<span>edit project</span>
				<span class="icon">
					<i class="fas fa-edit fa-lg"></i>
				</span>
			</button>
		</template>
		<template #default>Project content</template>
	</page-component>
</template>

<script setup lang="ts">
import PageComponent from "@/components/PageComponent.vue";
import { useRoute } from "vue-router";

const route = useRoute();
</script>
