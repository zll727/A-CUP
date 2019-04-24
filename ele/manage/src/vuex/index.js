import Vue from "vue";
import Vuex from "vuex";
import admin from "./admin";

Vue.use(Vuex);
//建立一个数据仓库
export default new Vuex.Store({
	modules:{
		admin
//		admin:{
//			state:{
//				
//			},
//			mutations:{
//				
//			},
//			actions:{
//				
//			},
//			getters:{
//				
//			}
//		}
	}
})
