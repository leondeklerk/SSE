import RegisterView from "@/views/RegisterView.vue";
import { createRouter, createWebHistory } from "vue-router";
import LoginView from "@/views/LoginView.vue";
import ProjectView from "@/views/ProjectView.vue";
import NavBar from "@/components/NavBar.vue";
import IndexView from "@/views/IndexView.vue";
import ProjectCreate from "@/views/ProjectCreate.vue";
import { useAuthStore } from "@/stores/auth";

declare module "vue-router" {
	interface RouteMeta {
		requiresAuth: boolean;
	}
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
			meta: {
				requiresAuth: true,
			},
		},
		{
			path: "/project/:id",
			name: "project",
			components: {
				default: ProjectView,
				NavBar: NavBar,
			},
			meta: {
				requiresAuth: true,
			},
		},
		{
			path: "/project/create",
			name: "projectCreate",
			components: {
				default: ProjectCreate,
				NavBar: NavBar,
			},
			meta: {
				requiresAuth: true,
			},
		},
		{
			path: "/login",
			name: "login",
			component: LoginView,
			meta: {
				requiresAuth: false,
			},
		},
		{
			path: "/register",
			name: "register",
			component: RegisterView,
			meta: {
				requiresAuth: false,
			},
		},
	],
});

router.beforeEach((to) => {
	if (to.meta.requiresAuth) {
		const store = useAuthStore();
		if (store.accessToken) {
			return true;
		} else {
			return { name: "login" };
		}
	}
});

export default router;
