<template>
	<div>
		<InputField
			v-model="form.publicKey.val"
			placeholder="Public Key *"
			name="publicKey"
			maxlength="64"
			:showLabel="form.publicKey.displayLabel"
			:flag="form.publicKey.flag"
			@keyup="keyWatch('publicKey', $event)" />
		<InputField
			v-model="form.account.val"
			placeholder="Account *"
			name="account"
			maxlength="64"
			:showLabel="form.account.displayLabel"
			:flag="form.account.flag"
			@keyup="keyWatch('account', $event)" />

		<ButtonWidget buttonTxt="Register"/>
	</div>
</template>

<script>
import Eos from 'eosjs';

import Loader from '@/widgets/Loader.vue';
import InputField from '@/widgets/inputField.vue';
import ButtonWidget from '@/widgets/ButtonWidget.vue';

export default {
	name: 'Register',

	components: {
		Loader,
		InputField,
		ButtonWidget,
	},
	
	data() {
		return {
			form: {
				required: ['publicKey', 'account'],
				publicKey: {
					val: '',
					displayLabel: false,
					flag: false,
				},
				account: {
					val: '',
					displayLabel: false,
					flag: false,
				},
				error: {
					msg: '',
					display: false,
				},
			},
		};
	},
	mounted() {
		const self = this;
		self.updateResults();
	},
	methods: {
		keyWatch(input, e) {
			const self = this;
			//if text remove placeholder and show above input
			if (this.form[input].val.length > 0) {
				this.form[input].flag = false;
				this.form[input].displayLabel = true;
			} else {
				this.form[input].displayLabel = false;
				this.form[input].flag = false;
			}
		},
		updateResults() {
			const self = this;
			//require keyProvider,account
			const httpEndpoint = '';
			const config = {
				//chainId: null, // 32 byte (64 char) hex string
				keyProvider: [
					'5K7mtrinTFrVTduSxizUc5hjXJEtTjVTsqSHeBHes1Viep86FP5'
				], // WIF string or array of keys..
				httpEndpoint: 'http://10.20.9.232:8888',
				expireInSeconds: 60,
				//broadcast: true,
				//verbose: false, // API activity
				//sign: true,
			};

			//connect to dev server
			const eos = Eos(config);
/*
			const options = {
				authorization: 'eosio@active',
				broadcast: true,
				sign: true,
			}

			eos.transaction(tr => {
				tr.newaccount({
					creator: 'eosio',
					name: 'jrsim',
					owner: 'EOS54wBFDDTNUGDDg392FCNBwa9zYCj9xZ7n4WXr3Jvn9WffpHDxs',
					active: 'EOS54wBFDDTNUGDDg392FCNBwa9zYCj9xZ7n4WXr3Jvn9WffpHDxs',
				});
			}, options);
*/
/*
			//payload
			let payload = {
				account: 'jrsim',
				actionName: 'create',
			};
			
			payload.actionData = {
				owner: payload.account,
				identiconCode: 'test note',
			};
			
			//add data
			eos.transaction({
				actions: [{
					account: 'identicons',
					name: payload.actionName,
					authorization: [{
						actor: payload.account,
						permission: 'active',
					}],
					data: payload.actionData,
				}],
			}).then(() => {
				//return results
				eos.getTableRows({
					json: true,
					code: 'identicons',   // contract who owns the table
					scope: 'identicons',  // scope of the table
					table: 'records',    // name of the table as specified by the contract abi
					limit: 100,
				}).then(result => {
					console.log('result', result);
				});
			});
			*/
			eos.getTableRows({
				json: true,
				code: 'identicons',   // contract who owns the table
				scope: 'identicons',  // scope of the table
				table: 'records',    // name of the table as specified by the contract abi
				limit: 100,
			}).then(result => {
				console.log('result', result);
			});
		}
	},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
