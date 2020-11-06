import { Slider } from 'element-ui'

const element = [Slider]

export default {
    /**
     * Vue.use 方法会自动调用install函数
     * Install Vant Component plugin
     * @param Vue
     */
    install(Vue) {
        element.forEach(Component => {
            Vue.use(Component)
        })
    }

}