<template>
	<div class="columns is-vcentered is-centered is-parent-height">
		<div class="column is-one-third">
			<card-component title="Login" :buttons="cardButtons" @button-click="onClick">
				<InputComponent v-model="username">
					<template #name> Username </template>
					<template #icon>
						<i class="fas fa-envelope"></i>
					</template>
				</InputComponent>
				<InputComponent type="password" v-model="password">
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

const username = ref("");
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

function login() {
	router.push("/");
}
</script>
