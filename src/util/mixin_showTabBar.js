const mixin_showTabBar ={
    created(){
        this.$store.commit('tabBarShow_false')
    },
    destroyed(){
        this.$store.commit('tabBarShow_true')
    }
}
export default mixin_showTabBar