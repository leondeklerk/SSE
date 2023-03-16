import RegisterView from "@/views/RegisterView.vue";
import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/LoginView.vue";
import ProjectView from "@/views/ProjectView.vue";
import NavBar from "@/components/NavBar.vue";
import IndexView from "@/views/IndexView.vue";

declare module "vue-router" {
	interface RouteMeta {}
}

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: "/",
			name: "index",
			components: {
				default: IndexView,
				NavBar: NavBar,
			},
		},
		{
			path: "/project/:id",
			name: "project",
			components: {
				default: ProjectView,
				NavBar: NavBar,
			},
		},
		{
			path: "/login",
			name: "login",
			component: LoginView,
		},
		{
			path: "/register",
			name: "register",
			component: RegisterView,
		},
	],
});

export default router;
