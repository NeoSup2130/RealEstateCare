export default {
    methods: 
    {
        sendToPage(routeName)
        {
            this.$router.push({name : routeName});
        }
    }
}