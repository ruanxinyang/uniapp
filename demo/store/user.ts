import { defineStore } from 'pinia';

export const useUsersStore = defineStore('user', {
	state: () => {
		return { token: '' };
	},
	actions: {
		getToken(token: string) {
			console.log(token);
			this.token = token;
		},
	},
});
