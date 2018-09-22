<template>
	<div id="app">
		<header>
			<a id="TB-logo" href="#"></a>
			<nav id="TB-nav">
				<ul>
					<li>Register</li>
					<li>Login</li>
				</ul>
			</nav>
		</header>
		<main>
			<router-view></router-view>
		</main>
	</div>
</template>

<script>
import ButtonWidget from '@/widgets/ButtonWidget.vue';

export default {
	name: 'app',

	components: {
		ButtonWidget,
	},
};
</script>

<style>
body {
	margin: 0;
	background: #010f23;
	min-width:320px;
}

#app {
	font-family: "Avenir", Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	color: #2c3e50;
}

::-webkit-scrollbar {
	width: 10px;
	height: 10px;
}

::-webkit-scrollbar-track-piece {
	background: transparent;
}
/*
::-webkit-scrollbar-track:hover {
	background: rgba(79,111,127,0.05);
}
*/
::-webkit-scrollbar-track:hover {
	background: rgba(79,111,127,0.1);
}

::-webkit-scrollbar-thumb {
	background-color: #b4c7d0;
	border: 3px solid transparent;
	background-clip: padding-box;
	border-radius: 5px;
}
/*
::-webkit-scrollbar-thumb:hover {
	background-color: #4f6f7f;
}
*/

::-webkit-scrollbar-thumb {
	background-color: #3a5169;
}

::-webkit-scrollbar-thumb:hover {
	background-color: #5b7f92;
}

.draggable-area {
    -webkit-app-region: drag;
}

header {
	height:40px;
	background:#000812;
	padding:10px;
}

#TB-nav {
	float:right;
}
#TB-nav ul {
	margin: 0px;
	padding:0px;
	display: flex;

}
#TB-nav li {
	list-style: none;
	background: #0f1f34;
	color: #aacffe;
	padding:8px 12px;
	cursor: pointer;
}
#TB-nav li:first-child {
	border-radius: 8px 0px 0px 8px;
	border-right:solid 1px #000812;
}
#TB-nav li:last-child {
	border-radius: 0px 8px 8px 0px;
	border-left:solid 1px #000812;
}

#TB-logo {
	background-image: url('assets/logo.svg');
	background-repeat: no-repeat;
	background-size: contain;
	width:300px;
	height:100px;
	display: block;
	position: absolute;
	top:10px;
	left:10px;
}
</style>
