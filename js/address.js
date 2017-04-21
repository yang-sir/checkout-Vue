new Vue({
    el:".container",
    data:{
        addressList:[],
        limitNum:3
    },
    created:function(){
        this.getAddressList();
        console.log(this.addressList)
    },
    filter:{

    },
    computed:{
        filterAddress:function(){
           return this.addressList.slice(0,this.limitNum)
        }
    },
    methods:{
        getAddressList:function(){
            var _this = this;
            this.$http.get("data/address.json").then(function(response){
                //_this.addressList = res.body.result;
                 _this.addressList = response.body.result;
            })
        }
    }
})