<template>
	<RouterView name="NavBar" />
	<RouterView v-slot="{ Component }">
		<Transition name="fade">
			<component :is="Component" />
		</Transition>
	</RouterView>
</template>
