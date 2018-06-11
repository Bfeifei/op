import Vuex from 'vuex'
import Vue from 'vue'
import * as types from './types'
Vue.use(Vuex);
export default new Vuex.Store({
state: {
	token: '',
	task: '',
	logout: '',
	id: {},
	list: {},
	message: '',
	operation: '',
	remove: '',
	listquery: {},
	listeditor: {}
},
mutations: {
[types.TOKEN]: (state, data) => {          
state.token = data;
},
[types.TASK]: (state, data) => {
state.task = data;
},
[types.LOGOUT]: (state) => {
state.token = undefined
},
[types.ID]: (state, data) => {
state.id = data;
},
[types.LIST]: (state, data) => {
state.list = data;
},
[types.MESSAGE]: (state, data) => {
state.message = data;
},
[types.OPERATION]: (state, data) => {
state.operation = data;
},
[types.REMOVE]: (state, data) => {
state.remove = data;
},
[types.LISTQUERY]: (state, data) => {
state.listquery = data;
},
[types.LISTEDITOR]: (state, data) => {
state.listeditor = data;
}

}
})