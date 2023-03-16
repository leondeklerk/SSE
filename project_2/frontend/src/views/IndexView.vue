<template>
	<page-component>
		<template #headerLeft>
			<h1 class="title">Projects</h1>
		</template>
		<template #headerRight>
			<button class="button is-medium is-rounded is-light is-primary">
				<span>new project</span>
				<span class="icon">
					<i class="fas fa-plus fa-lg"></i>
				</span>
			</button>
		</template>
		<template #default>
			<div class="columns is-multiline">
				<div class="column is-12-mobile is-6-tablet is-4-desktop is-3-fullhd" v-for="(project, index) of projects" :key="index">
					<card-component :title="project.name" @click="goto(project.id)">
						{{ project.description }}
					</card-component>
				</div>
			</div>
		</template>
	</page-component>
</template>

<script setup lang="ts">
import { ref, type Ref } from "vue";
import PageComponent from "../components/PageComponent.vue";
import CardComponent from "@/components/CardComponent.vue";
import { useRouter } from "vue-router";

interface Project {
	name: string;
	id: string;
	description: string;
}

const projects: Ref<Project[]> = ref([]);
const router = useRouter();

projects.value.push({
	name: "Project A",
	id: "a",
	description: "Project a, the amazing A project",
});

projects.value.push({
	name: "Project B",
	id: "b",
	description: "Project b, the amazing B project",
});

projects.value.push({
	name: "Project C",
	id: "c",
	description: "Project c, the amazing C project",
});

projects.value.push({
	name: "Project D",
	id: "d",
	description: "Project d, the amazing D project",
});

projects.value.push({
	name: "Project E",
	id: "e",
	description: "Project e, the amazing E project",
});

function goto(id: string) {
	router.push({ name: "project", params: { id } });
}
</script>
