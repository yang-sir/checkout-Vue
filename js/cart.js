new Vue({
    el:"#app",
    data:{
        title:"bai",
        productList:[],
        selectAllFrag:false,
        totalMoeny:0,
        delFrag:false,
        curproduct:""
    },
    filters:{
        fromatMoney:function(value){
            return "Y"+value.toFixed(2)

    }},
    created:function(){
        this.cartView()
    },
    methods:{
        cartView : function () {
            var _this = this;
            this.$http.get("data/cart.json",{"id":123}).then(function(res){
                _this.productList = res.body.result.productList
            })
        },
        changeQuantity: function(item,fro){
            if(fro>0){
                item.productQuentity++;
            }else{
                item.productQuentity--;
                if(item.productQuentity<1){
                    item.productQuentity = 1
                }
            }
            this.calcTotalMoney()
        },
        selectChecked:function(item){
            if(typeof item.checked == "undefined"){
                Vue.set(item,"checked",true)
            }else{
                item.checked = !item.checked
            }
            this.calcTotalMoney();
        },
        selectAll: function(frag){
            this.selectAllFrag = frag;
            var _this = this;
            this.productList.forEach(function(item,index){
                if(typeof item.checked == "undefined"){
                    Vue.set(item,"checked",_this.selectAllFrag)
                }else{
                    item.checked = _this.selectAllFrag
                }
            })
            this.calcTotalMoney()
        },
        calcTotalMoney: function(){
            var _this = this;
            this.totalMoeny = 0;
            this.productList.forEach(function(item,index){
                if(item.checked){
                    _this.totalMoeny += item.productPrice*item.productQuentity
                }
            })
        },
        delConfirm:function(item){
            this.delFrag = true;
            this.curproduct = item;
        },
        delproduct: function(){
            var index = this.productList.indexOf(this.curproduct);
            this.productList.splice(index,1)
            this.delFrag = false
        }
    }

});