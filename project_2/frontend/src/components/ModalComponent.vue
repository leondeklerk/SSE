<template>
	<teleport to="body">
		<div v-if="opened" class="modal is-active">
			<div class="modal-background"></div>
			<div class="modal-content box is-flex is-flex-direction-column">
				<div class="is-flex-grow-0 is-flex-shrink-1 is-flex is-flex-direction-row">
					<div class="is-flex-grow-1 is-flex-shrink-1">
						<slot name="header"> </slot>
					</div>
					<div class="is-flex-grow-0 is-flex-shrink-1 m-auto">
						<div class="is-pulled-right">
							<button class="delete" @click="close<null>(true, ModalResponseType.CANCEL, null)"></button>
						</div>
					</div>
				</div>
				<hr class="m-2" />
				<div class="is-flex-grow-1 is-flex-shrink-1">
					<slot name="default" :close="close"> </slot>
				</div>
				<div class="is-flex-grow-0 is-flex-shrink-1" v-if="enableFooter">
					<slot name="footer">
						<div class="field is-grouped is-pulled-right">
							<button-component @click="close<null>(false, ModalResponseType.CANCEL, null)"> cancel </button-component>
							<button-component @click="close<null>(true, ModalResponseType.SUCCESS, null)" type="primary"> submit </button-component>
						</div>
					</slot>
				</div>
			</div>
		</div>
	</teleport>
</template>

<script setup lang="ts">
import { ModalResponseType, type ModalResponse } from "@/types/ModalTypes";
import { ref } from "vue";
import ButtonComponent from "./ButtonComponent.vue";

interface Props {
	onClose?: (response: ModalResponse<any>) => void;
	enableFooter?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	enableFooter: true,
});

const opened = ref(false);

function open() {
	opened.value = true;
}

function close<T>(success: boolean, type: ModalResponseType, data: T): void {
	opened.value = false;

	const response = {
		success: success,
		type: type,
		data: data,
	};

	if (props.onClose) {
		props.onClose(response);
	}
}

defineExpose({
	open,
	close,
});
</script>
