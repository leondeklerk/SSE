<template>
	<div class="container is-fluid h-fill-parent">
		<div class="level m-0 pt-5 pb-3">
			<div class="level-left pt-2">
				<div class="level-item">
					<slot name="headerLeft" />
				</div>
			</div>
			<div class="level-right">
				<div class="level-item">
					<slot name="headerRight" />
				</div>
			</div>
		</div>
		<hr class="m-0" />
		<div class="m-0 pt-5">
			<slot />
		</div>
	</div>
</template>

<script setup lang="ts"></script>
