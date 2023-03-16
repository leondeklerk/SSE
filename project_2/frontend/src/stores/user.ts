import { ref } from "vue";
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", () => {
	const accessToken = ref("");

	function setToken(token: string) {
		accessToken.value = token;
	}

	return { accessToken, setToken };
});
