import axios from "axios";
import hmacsha1 from 'crypto-js/hmac-sha1';
export default{
    async upload(file,dir){
        if(!file) return;
        let fromData = new FormData();
        fromData.append("file",file);
        fromData.append("localFileDir",dir);
        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        let res = await axios.post('/upload', fromData, config);
        if(res.status ==200 && res.data.errorcode==0){
            return res.data.data.url;
        }
    },

    hmacsha1(content="",privateKey="123456"){
      return hmacsha1(content, privateKey).toString()
    }
    
}