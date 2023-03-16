<template>
	<div class="is-flex is-flex-direction-column is-parent-height">
		<div class="is-flex-grow-0 is-flex-shrink-1">
			<RouterView name="NavBar" />
		</div>
		<div class="is-flex-grow-1 is-flex-shrink-1">
			<RouterView v-slot="{ Component }">
				<!-- <Transition name="fade"> -->
				<component :is="Component" />
				<!-- </Transition> -->
			</RouterView>
		</div>
	</div>
</template>
