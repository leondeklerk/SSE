<template>
	<page-component>
		<template #headerLeft>
			<h1 class="title">Project {{ route.params.id }}</h1>
		</template>
		<template #headerRight>
			<button-component :rounded="true" :light="true" type="primary">
				<span>edit project</span>
				<span class="icon">
					<i class="fas fa-edit fa-lg"></i>
				</span>
			</button-component>
		</template>
		<template #default>
			<question-view />
		</template>
	</page-component>
</template>

<script setup lang="ts">
import PageComponent from "@/components/PageComponent.vue";
import ButtonComponent from "@/components/ButtonComponent.vue";
import QuestionView from "./QuestionView.vue";

import { useRoute } from "vue-router";

const route = useRoute();
</script>
