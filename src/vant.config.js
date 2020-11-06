import { Tabbar, TabbarItem, Search, Swipe, SwipeItem, Toast, Slider, Form, Field, Button, ActionSheet, CellGroup } from 'vant'

const vants = [Tabbar, TabbarItem, Search, Swipe, SwipeItem, Toast, Slider, Form, Field, Button, ActionSheet, CellGroup]

export default {
    /**
     * Vue.use 方法会自动调用install函数
     * Install Vant Component plugin
     * @param Vue
     */
    install(Vue) {
        vants.forEach(Component => {
            Vue.use(Component)
        })
    }

}