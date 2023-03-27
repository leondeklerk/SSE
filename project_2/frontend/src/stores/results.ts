import type { ResultData } from "./../types/ResultTypes";
import { ref, type Ref } from "vue";
import { defineStore } from "pinia";

export const useResultStore = defineStore("result", () => {
	const data: Ref<ResultData> = ref({
		submitData: [],
		inPage: false,
	});

	function setResult(newData: ResultData) {
		data.value = newData;
	}

	function clearResult() {
		data.value = {
			submitData: [],
			inPage: false,
		};
	}

	return { data, setResult, clearResult };
});
