<template>
	<div id="TB-splashWrapper" class="draggable-area">
		<Loader />
		<div class="logo"></div>
		<div>
			<h2>
				Team Blue
				<span>EOS HACKATHON 2018</span>
			</h2>
		</div>
	</div>
</template>

<script>
import Loader from '@/widgets/Loader.vue';

export default {
  name: 'hello',
	components: {
		Loader,
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
#TB-splashWrapper {
	display: flex;
	flex-direction:column;
	justify-content:center;
    position:  absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
	
	background-image: url('../assets/tmp.png');
	background-repeat: no-repeat;
	background-size: contain;
	background-position: bottom center;
	max-width:890px;
	min-width: 300px;
	margin:0px auto;
}
#TB-splashWrapper h2 {
	font-size:2em;
	text-align:center;
	color:#64a4f4;
	margin-bottom:230px;
}
#TB-splashWrapper h2 span {
	display: block;
	text-align:center;
	font-weight: normal;
	font-size:0.6em;
	color: #345d8f;
}

.logo {
	background-image: url('../assets/logo.png');
	background-repeat: no-repeat;
	background-size: contain;
	background-position: center;
	width:200px;
	height:200px;
	margin:0px auto;
}
</style>
