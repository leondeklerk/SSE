<template>
	<div class="is-flex is-flex-direction-column is-parent-height">
		<div class="is-flex-grow-0 is-flex-shrink-1">
			<RouterView name="NavBar" />
		</div>
		<div class="is-flex-grow-1 is-flex-shrink-1">
			<RouterView v-slot="{ Component }">
				<!-- <Transition name="fade"> -->
				<Suspense>
					<template #default>
						<div class="is-parent-height">
							<component :is="Component" />
						</div>
					</template>
					<template #fallback> Loading... </template>
				</Suspense>
				<!-- </Transition> -->
			</RouterView>
		</div>
	</div>
</template>

<script setup lang="ts"></script>
