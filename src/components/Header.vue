<template>
	<div id="header-wrapper">
		<div id="header-text">
			<h1>Knowledge base doesn't have to be boring</h1>
			<h3>Everything you need to manage your messaging</h3>
		</div>

		<section class="container">
			<div class="input-group mb-5 mt-3">
				<input type="text" class="form-control" placeholder="Search for answers" aria-label="Search for answers" aria-describedby="Search for answers">
				<div class="input-group-append">
					<button class="btn btn-outline-secondary" type="button" id="button-addon2"><i class="fas fa-search"></i></button>
				</div>
			</div>
		</section>
	</div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
	@import '../scss/_variables.scss';

	#header-text{

		text-align: center;
		font-family: $font-family;
		color: $text-black;
		padding: 120px 20px 16px 20px;

		h1{
			font-style: normal;
			font-weight: bold;
			font-size: 34px;
			line-height: 41px;
		}

		h3{
			font-style: normal;
			font-weight: normal;
			font-size: 20px;
			line-height: 24px;
		}
	}
	.input-group {
		max-width: 720px;
		margin: 0 auto;
		input {
			padding: 24px;
			font-size: 14px;
			color: $text-gray;
		}

		button {
			padding-left: 24px;
			padding-right: 24px;
			background-color: $green;
			border-color: $green;
			&:active {
				border-color: $green;
			}
			i {
				color: white;
				font-size: 16px;
			}
		}
	}
</style>
