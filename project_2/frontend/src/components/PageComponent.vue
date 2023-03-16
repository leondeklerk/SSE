<template>
	<div class="container is-fluid is-flex is-parent-height is-flex-direction-column">
		<div class="is-flex-grow-0 pt-5">
			<div class="level">
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
		</div>
		<div class="is-flex-grow-1 m-0 pt-5">
			<slot />
		</div>
		<div class="section is-flex-grow-0 p-0 pt-5 pb-5">
			<hr />
			<slot name="footer" />
		</div>
	</div>
</template>

<script setup lang="ts"></script>
