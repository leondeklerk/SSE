<template>
	<div class="panel is-primary">
		<div @click="toggle" class="panel-heading level is-mobile mb-0">
			<div class="level-left">
				<slot :collapsed="collapsed" name="header" />
			</div>
			<div class="level-right">
				<span class="icon">
					<i v-if="collapsed" class="fas fa-angle-right"></i>
					<i v-else class="fas fa-angle-down"></i>
				</span>
			</div>
		</div>
		<div class="p-5" v-show="!collapsed">
			<slot name="default" :collapsed="collapsed" />
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref } from "vue";

interface Props {
	collapseInitial?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	collapseInitial: true,
});

const collapsed = ref(props.collapseInitial);

function toggle() {
	collapsed.value = !collapsed.value;
}
</script>
