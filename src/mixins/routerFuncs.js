export default {
    methods: 
    {
        sendToPage(routeName, useName = true)
        {
            console.log("Sending to page: "+routeName);
            if(useName)
                this.$router.push({name : routeName});
            else 
            this.$router.push(routeName);
        }
    }
}