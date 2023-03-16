<template>
	<nav class="navbar is-warning">
		<div class="navbar-brand">
			<div class="navbar-item">
				<img src="https://bulma.io/images/bulma-logo.png" width="112" height="28" />
			</div>
		</div>
		<!-- Only for debug remove later -->
		<div class="navbar-menu">
			<div class="navbar-start">
				<RouterLink class="navbar-item" to="/">Overview</RouterLink>
				<RouterLink class="navbar-item" to="/project">Project</RouterLink>
			</div>
		</div>
		<div class="navbar-end has-left-border pl-4 pr-4">
			<div class="navbar-item mr-2">Username</div>
			<div class="navbar-item">
				<RouterLink to="/login" class="button is-primary"> Log out </RouterLink>
			</div>
		</div>
	</nav>
</template>

<script setup lang="ts"></script>
