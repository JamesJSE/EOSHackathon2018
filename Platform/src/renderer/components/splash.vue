<template>
	<div id="TB-splashWrapper" class="draggable-area">
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
import ScatterJS from 'scatter-js/dist/scatter.esm';
import Eos from 'eosjs';

import Loader from '@/widgets/Loader.vue';

export default {
  name: 'Splash',
	components: {
		Loader,
	},
	mounted() {
		const self = this;

		//redirect to home
		setTimeout(() => {
			self.$router.push('/register');
		}, 10000);
		/*
		ScatterJS.scatter.connect('TeamBlue').then(connected => {
			console.log('connected', connected);
			if(!connected) return false;
			const scatter = ScatterJS.scatter;
			// Now we need to get an identity from the user.
			// We're also going to require an account that is connected to the network we're using.
			const network = {
				blockchain:'eos',
				host:'10.20.9.232',
				port:8888,
				protocol:'http',
				chainId: 'cf057bbfb72640471fd910bcb67639c22df9f92470936cddc1ade0e2f2e7dc4f',
			};
			const requiredFields = { accounts:[network] };
			scatter.getIdentity(requiredFields).then(() => {
				// Always use the accounts you got back from Scatter. Never hardcode them even if you are prompting
				// the user for their account name beforehand. They could still give you a different account.
				const account = scatter.identity.accounts.find(x => x.blockchain === 'eos');

				// You can pass in any additional options you want into the eosjs reference.
				const eosOptions = { expireInSeconds:60 };

				// Get a proxy reference to eosjs which you can use to sign transactions with a user's Scatter.
				const eos = scatter.eos(network, Eos, eosOptions);

				// ----------------------------
				// Now that we have an identity,
				// an EOSIO account, and a reference
				// to an eosjs object we can send a transaction.
				// ----------------------------
				// Never assume the account's permission/authority. Always take it from the returned account.
				const transactionOptions = { authorization:[`${account.name}@${account.authority}`] };
				
				eos.transfer(account.name, 'helloworld', '1.0000 EOS', 'memo', transactionOptions).then(trx => {
					// That's it!
					console.log(`Transaction ID: ${trx.transaction_id}`);
				}).catch(error => {
					console.error(error);
				});
			}).catch(error => {
				// The user rejected this request, or doesn't have the appropriate requirements.
				console.error(error);
			});
			window.scatter = null;
		});*/
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
