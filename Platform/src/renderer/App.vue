<template>
	<div id="app">
		<header></header>
		<main>
			<router-view></router-view>
		</main>
	</div>
</template>

<script>
export default {
	name: 'app',
};
</script>

<style>
body {
	margin: 0;
	background: #010f23;
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
</style>
