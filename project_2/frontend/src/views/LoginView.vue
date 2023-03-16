<template>
	<div class="columns is-vcentered is-centered is-parent-height">
		<div class="column is-one-third">
			<card-component title="Login" :buttons="cardButtons" @button-click="onClick">
				<InputComponent v-model="email" :has-icon="true">
					<template #name> Email </template>
					<template #icon>
						<i class="fas fa-envelope"></i>
					</template>
				</InputComponent>
				<InputComponent type="password" v-model="password" :has-icon="true">
					<template #name>Password</template>
					<template #icon><i class="fas fa-lock"></i></template>
				</InputComponent>
			</card-component>
		</div>
	</div>
</template>

<script setup lang="ts">
import InputComponent from "../components/InputComponent.vue";
import CardComponent, { type CardButton } from "@/components/CardComponent.vue";
import { ref, type Ref } from "vue";
import { useRouter } from "vue-router";
import { post } from "@/helpers/ApiHandler";
import type { UserLoginResponse } from "@/types/ResponseTypes";
import { useAuthStore } from "@/stores/auth";

const email = ref("");
const password = ref("");
const router = useRouter();

const cardButtons: Ref<CardButton[]> = ref([
	{
		parentWidth: true,
		type: "primary",
		outlined: true,
		text: "Register",
		name: "register",
	},
	{
		parentWidth: true,
		type: "primary",
		text: "Login",
		name: "login",
	},
]);

function onClick(buttonName: string) {
	switch (buttonName) {
		case "register":
			register();
			break;

		case "login":
			login();
			break;
		default:
			break;
	}
}

function register() {
	router.push({ name: "register" });
}

async function login() {
	const body = {
		email: email.value,
		password: password.value,
	};

	const { success, result } = await post<UserLoginResponse>("/auth/login", JSON.stringify(body), false);
	//TODO: toast
	if (success && result) {
		useAuthStore().setToken(result.access_token);
		router.push("/");
	}
}
</script>
