import axios from 'axios';
const BASEURL = 'https://randomuser.me/api/?results=12&nat=us';

export default {
	search: function () {
		return axios.get(BASEURL);
	},
};
