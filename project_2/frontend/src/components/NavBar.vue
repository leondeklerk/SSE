<template>
	<nav class="navbar is-primary">
		<div class="navbar-brand">
			<div class="navbar-item">
				<h1 class="title">SSE</h1>
				<!-- <img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" /> -->
			</div>
		</div>
		<!-- Only for debug remove later -->
		<div class="navbar-menu">
			<div class="navbar-start">
				<RouterLink class="navbar-item" to="/">Overview</RouterLink>
			</div>
		</div>
		<div class="navbar-end has-left-border pl-4 pr-4">
			<div class="navbar-item mr-2 is-size-5 is-capitalized">{{ userName }}</div>
			<div class="navbar-item">
				<button-component @click="logout" :outlined="true" :light="true" type="primary">Log out</button-component>
			</div>
		</div>
	</nav>
</template>

<script setup lang="ts">
import ButtonComponent from "@/components/ButtonComponent.vue";
import { get } from "@/helpers/ApiHandler";
import { useAuthStore } from "@/stores/auth";
import type { UserDataResponse } from "@/types/ResponseTypes";
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const store = useAuthStore();
const userName = ref("");

get<UserDataResponse>("/users/me").then((res) => {
	if (!res.success || !res.result) {
		// TODO: toast
		router.push("/login");
	} else {
		userName.value = res.result.data.user.name;
	}
});

function logout() {
	store.deleteToken();
	router.push("/login");
}
</script>
