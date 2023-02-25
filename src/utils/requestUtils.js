import axios from "axios";

export let sendRequest = function(url,params={},method="post"){
    return new Promise((resolve,reject) => {
        let loading = this.$loading({
            text:"正在加载，请稍后...",
            spinner:"el-icon-loading",
            background:"rgba(0,0,0,0.2)"
        });  
        axios({
            method: method,
            url: url,
            data: params
        })
        .then(res => {
            if(res.status===200){
                resolve(this.Result.success("成功",res.data));
            }else{
                resolve(this.Result.fail(res.message,res.data));
            }
        })
        .catch(res => {
            resolve(this.Result.fail(res.message,res.data));
        })
        .finally(() => {
            setTimeout(() => {
                loading.close()
            },500)
        })
    });
    
    

}