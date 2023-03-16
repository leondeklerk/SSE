<template>
	<div class="columns is-vcentered is-centered is-parent-height">
		<div class="column is-one-third">
			<card-component title="Register" :buttons="cardButtons" @button-click="onClick">
				<InputComponent v-model="username">
					<template #name> Username </template>
					<template #icon>
						<i class="fas fa-envelope"></i>
					</template>
				</InputComponent>
				<InputComponent v-model="email">
					<template #name> Email </template>
					<template #icon>
						<i class="fas fa-envelope"></i>
					</template>
				</InputComponent>
				<InputComponent :valid="passwordsMatch" type="password" v-model="password">
					<template #name>Password</template>
					<template #icon><i class="fas fa-lock"></i></template>
				</InputComponent>
				<InputComponent :valid="passwordsMatch" :error-message="passwordError" type="password" v-model="passwordConfirm">
					<template #name>Confirm password</template>
					<template #icon><i class="fas fa-lock"></i></template>
				</InputComponent>
			</card-component>
		</div>
	</div>
</template>

<script setup lang="ts">
import InputComponent from "../components/InputComponent.vue";
import CardComponent, { type CardButton } from "@/components/CardComponent.vue";
import { computed, ref, type Ref } from "vue";
import { useRouter } from "vue-router";
import { post } from "@/helpers/ApiHandler";
import type { UserRegisterResponse } from "@/types/ResponseTypes";

const username = ref("");
const password = ref("");
const passwordConfirm = ref("");
const email = ref("");
const router = useRouter();

const cardButtons: Ref<CardButton[]> = ref([
	{
		parentWidth: true,
		type: "primary",
		outlined: true,
		text: "Login",
		name: "login",
	},
	{
		parentWidth: true,
		type: "primary",
		text: "Register",
		name: "register",
	},
]);

const passwordsMatch = computed(() => {
	return password.value === passwordConfirm.value;
});

const passwordError = "Passwords must match";

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

async function register() {
	const body = {
		name: username.value,
		email: email.value,
		password: password.value,
		passwordConfirm: passwordConfirm.value,
	};

	const { success } = await post<UserRegisterResponse>("auth/register/", JSON.stringify(body), false);
	// TODO: show toast based on result/error
	if (success) {
		router.push("/login");
	}
}

function login() {
	router.push("/login");
}
</script>
