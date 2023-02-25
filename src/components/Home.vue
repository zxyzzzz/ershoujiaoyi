<template>
  <div class="container">
    <Head></Head>
    <div>
      <ul>
        <li
          v-for="(item, index) in BannerList"
          :key="index"
          v-show="listIndex === index"
        >
          <a href="">
            <img :src="item.BannerUrl" width="100%" height="250px" alt="" />
          </a>
        </li>
      </ul>
    </div>
    <div class="header">
      <div id="SearchForm" style="margin-top: 30px">
        <form id="search_loc">
          <input type="submit" id="searchbtn" @click="search"  value="点击搜索" />
          <input type="text" v-model="input" placeholder="请输入搜索关键词" id="keyword" />
          <input
            type="submit"
            id="uploadbtn"
            value="发布商品"
            @click="upload"
          />
        </form>
      </div>
    </div>

    <el-container class="container2">
      
      <el-aside style="margin-left: 5%; width: 90%">
        <el-tabs @tab-click="tabClick" v-model="activeTab" :tab-position="tabPosition">
          <el-tab-pane 
            v-for="(item,index) in goodsTypes" 
            :label="item.label"
            :name="item.name"
            :key="index"
          >
            <ul>
              <li>
                <shangpin-card
                  v-for="item in allList"
                  :key="item.index"
                  :tableData="item"
                >
              </shangpin-card>
              </li>
            </ul>
          </el-tab-pane>
          <!-- <el-tab-pane label="全部商品" name="dfdfd">
            <ul>
              <li>
                <shangpin-card
                  v-for="item in allList"
                  :key="item.index"
                  :tableData="item"
                >
              </shangpin-card>
              </li>
            </ul>
          </el-tab-pane>
          <el-tab-pane label="手机电脑">
            <ul>
              <li>
                <shangpin-card
                 v-for="item in shoujiList"
                 :key="item.index"
                 :tableData="item"
                ></shangpin-card>
              </li>
            </ul>
          </el-tab-pane>
          <el-tab-pane label="运动健身">
            <ul>
              <li>
                <shangpin-card
                  v-for="item in sportsList"
                  :key="item.index"
                :tableData="item"
                ></shangpin-card>
              </li>
            </ul>
          </el-tab-pane>
          <el-tab-pane label="服饰鞋帽">
            <ul>
              <li>
                <shangpin-card
                  v-for="item in fushiList"
                  :key="item.index"
                :tableData="item"
                ></shangpin-card>
              </li>
            </ul>
          </el-tab-pane>
          <el-tab-pane label="生活娱乐">
            <ul>
              <li>
                <shangpin-card
                  v-for="item in yuleList"
                  :key="item.index"
                 :tableData="item"
                ></shangpin-card>
              </li>
            </ul>
          </el-tab-pane>
          <el-tab-pane label="个护美妆">
            <ul>
              <li>
                <shangpin-card
                  v-for="item in meizhuangList"
                  :key="item.index"
                :tableData="item"
                ></shangpin-card>
              </li>
            </ul>
          </el-tab-pane>
          <el-tab-pane label="图书教材">
            <ul>
              <li>
                <shangpin-card
                  v-for="item in bookList"
                  :key="item.index"
                :tableData="item"
                ></shangpin-card>
              </li>
            </ul>
          </el-tab-pane>
          <el-tab-pane label="交通出行">
            <ul>
              <li>
                <shangpin-card
                  v-for="item in trafficList"
                  :key="item.index"
                :tableData="item"
                ></shangpin-card>
              </li>
            </ul>
          </el-tab-pane> -->
          
        </el-tabs>
      </el-aside>
    </el-container>
   
  </div>
</template>

<script>
  import axios from "axios";
import Head from "./Head.vue";
import ShangpinCard from "./ShangpinCard.vue";
import Shoopcart from "./Shoopcart.vue";
import Shoplist from "./Shoplist.vue";
export default {
  components: { Head, Shoplist, Shoopcart, ShangpinCard },
  data() {
    return {
      goodsTypes:[
        {label:"全部商品",name:"0"},
        {label:"手机电脑",name:"1"},
        {label:"运动健身",name:"2"},
        {label:"服饰鞋帽",name:"3"},
        {label:"生活娱乐",name:"4"},
        {label:"个护美妆",name:"5"},
        {label:"图书教材",name:"6"},
        {label:"交通出行",name:"7"}
      ],
      input:"",
      tabPosition: "left",
      BannerList: [
        { BannerUrl: require("../img/img1.jpg"), id: 1 },
        { BannerUrl: require("../img/img2.jpg"), id: 2 },
      ],
      listIndex: 0,
      timer: null,
      allList: [
      // { img: require("../img/img9-1.jpg"),
      //    name: "亨利王子",
      //     price: "50" ,
      //     classify:"图书教材",
      //     details:"..."
      //   },
      //   {
      //     img: require("../img/meizhuang2.jpg"),
      //     name: "雅诗兰黛小棕瓶",
      //     price: "520",
      //     classify:'个护美妆',
      //     details:'雅诗兰黛小棕瓶100ML，全新未拆 购于免税店，两瓶套装。现在出一瓶。 100%正品'  
      //   },
      //   {
      //     img: require("../img/shouji1.jpg"),
      //     name: "iPhone12 128G",
      //     price: "2500",
      //     classify:'手机电脑',
      //     details:'iPhone12 128G 白色 国行双卡,全网通,二手原装,无拆修,99新外观很新,配件齐全,支持七天无理由退换,保修一年 '
      //   },
      //   {
      //     img: require("../img/traffic1.jpg"),
      //     name: "美利达领航300",
      //     price: "998 ",
      //     details: "美利达领航者300，全车原版，前叉减震，前后双碟刹，禧玛诺变速器，前后快拆轮毂。26圈，16寸车架，适合160cm到180cm人群骑行",
      //     classify: "交通出行",
      //   },
      //   {
      //     img: require("../img/sports2.jpg"),
      //     name: "羽毛球拍",
      //     price: "75",
      //     classify:'运动健身',
      //     details:'买来没用，给转卖了有喜欢的朋友请与我联系'  
      //   },
      //   { img: require("../img/traffic4.jpg"),
      //    name: "捷安特锂电池电动车",
      //     price: "1000" ,
      //     classify:"交通出行",
      //     details:"捷安特电动车，八成新，本买来自用，现处理掉。车子功能完好无损，充满电可跑30公里"
      //   },
      //   {
      //     img: require("../img/img8.jpg"),
      //     name: "微信小程序实战开发",
      //     price: "20",
      //     state: "已完成",
      //     details: "",
      //     classify: "图书教材",
      //   },
      //   {
      //     img: require("../img/sports1.jpg"),
      //     name: "未开封的篮球",
      //     price: "50",
      //     classify:'运动健身',
      //     details:'未开封的篮球适合于篮球初级学生'  
      //   },
      //   {
      //     img: require("../img/sports3.jpg"),
      //     name: "跑步机",
      //     price: "300",
      //     classify:'运动健身',
      //     details:'转让跑步机1台，该跑步机自买回至今使用不足100次，跑步机一切功能正常，可以插优盘，健身时可以听自己喜欢的音乐。'  
      //   },
      //   {
      //     img: require("../img/meizhuang1.jpg"),
      //     name: "娇兰",
      //     price: "300",
      //     classify:'个护美妆',
      //     details:'娇兰复原蜜精华50毫升 100%正品'  
      //   },
      
      //   {
      //     img: require("../img/meizhuang4.jpg"),
      //     name: "高露洁美牙仪",
      //     price: "500",
      //     classify:'个护美妆',
      //     details:'高露洁美牙仪,仅拆封未使用'  
      //   },
      //   {
      //     img: require("../img/yule4.jpg"),
      //     name: "家庭影院投影仪",
      //     price: "900",
      //     classify:'生活娱乐',
      //     details:'全新的轰天炮投影仪，适合家庭影院、室外旅游，足浴房使用,1080P画质'  
      //   },
      //   { img: require("../img/traffic2.jpg"),
      //    name: "捷安特自行车",
      //     price: "150" ,
      //     classify:"交通出行",
      //     details:"捷安特专卖店实体店购买，780买进150出了"
      //   },
      //   { img: require("../img/traffic5.jpg"),
      //    name: "小米平衡车",
      //     price: "1000" ,
      //     classify:"交通出行",
      //     details:"小米平衡车燃动版，9成新"
      //   },
      //   {
      //     img: require("../img/yule2.jpg"),
      //     name: "圆号",
      //     price: "788",
      //     classify:'生活娱乐',
      //     details:'九成新圆号一把，一折价处理'  
      //   },
      //   {
      //     img: require("../img/fushi3.jpg"),
      //     name: "羊羔毛外套",
      //     price: "100",
      //     classify:'服饰鞋帽',
      //     details:'9成新，保养好，上身好看，剪裁细节精致，色正柔和不挑肤色。'  
      //   },
      //   {
      //     img: require("../img/sports4.jpg"),
      //     name: "拳击沙袋",
      //     price: "100",
      //     classify:'运动健身',
      //     details:'成人拳击沙袋，高2米'  
      //   },
      //   {
      //     img: require("../img/sports5.jpg"),
      //     name: "蓝牙跳绳",
      //     price: "150",
      //     classify:'运动健身',
      //     details:'匹克智能蓝牙跳绳，全新开封，从未使用，低价出'  
      //   },
      //   { img: require("../img/traffic3.jpg"),
      //    name: "电瓶车",
      //     price: "1000" ,
      //     classify:"交通出行",
      //     details:"买来就没骑过，9成新"
      //   },
      //   { img: require("../img/book1.jpg"),
      //    name: "高三复习资料",
      //     price: "150" ,
      //     classify:"图书教材",
      //     details:"2022年购入高三理科复习资料，全新未拆封，娃娃高考完了，用不上。四川理科适用"
      //   },
       
      //   {
      //     img: require("../img/shouji2.jpg"),
      //     name: "曲屏华为P30",
      //     price: "900",
      //     classify:'手机电脑',
      //     details:'九新,市场新机售价为5488元的6.47寸华为p030pro曲面屏手机,市场新机售价为5999元的6.39寸华为Mate20pro曲屏手机  '
      //   },
      //   {
      //     img: require("../img/shouji3.jpg"),
      //     name: "iPhoneX 64G",
      //     price: "1000",
      //     classify:'手机电脑',
      //     details:'iPhoneX 64G 白色 本人在用，处理，喜欢的随时可以联系我看  '
      //   },
      //   {
      //     img: require("../img/fushi1.jpg"),
      //     name: "天梭手表",
      //     price: "1800",
      //     classify:'服饰鞋帽',
      //     details:'天梭80动力，个人一手，正常佩戴未开盖。'  
      //   },
      //   {
      //     img: require("../img/fushi2.jpg"),
      //     name: "coach女包",
      //     price: "1000",
      //     classify:'服饰鞋帽',
      //     details:'在奥特莱斯买的包包，没用过，全新的没有划痕。'  
      //   },
      //   { img: require("../img/book2.jpg"),
      //    name: "儿童读物",
      //     price: "10" ,
      //     classify:"图书教材",
      //     details:"儿童读物"
      //   },
      
      //   {
      //     img: require("../img/fushi4.jpg"),
      //     name: "大衣",
      //     price: "300",
      //     classify:'服饰鞋帽',
      //     details:'玖姿,全新，未穿'  
      //   },
      //   {
      //     img: require("../img/fushi5.jpg"),
      //     name: "Nike",
      //     price: "599",
      //     classify:'服饰鞋帽',
      //     details:'StrangeLove x Nike SB Dunk Low PRO 情人节限定 CT2552 800 36码'  
      //   },
      //   { img: require("../img/shouji4.jpg"), 
      //   name: "索尼微单", price: "4499",
      //   classify:'手机电脑',
      //   details:'没用几次,配件齐全,包装都在,保修期内'
      //  },
      //  {
      //     img: require("../img/meizhuang3.jpg"),
      //     name: "泡澡桶",
      //     price: "120",
      //     classify:'个护美妆',
      //     details:'9成新木桶，质量很好！因地方变动放不下，忍痛转让！需要的联系！'  
      //   },
      //   {
      //     img: require("../img/meizhuang5.jpg"),
      //     name: "Dior999",
      //     price: "199",
      //     classify:'个护美妆',
      //     details:'全新迪奥Dior烈焰蓝金口红999唇膏专柜同款自贸区直销手续齐全特惠价'  
      //   },
      //   { img: require("../img/book3.jpg"),
      //    name: "股票、期货投资经典读书",
      //     price: "300" ,
      //     classify:"图书教材",
      //     details:"证券从业、投资经典书籍，正版，八成新，32本，打包转让"
      //   },
      //  {
      //     img: require("../img/yule5.jpg"),
      //     name: "架子鼓",
      //     price: "4000",
      //     classify:'生活娱乐',
      //     details:'五鼓四擦，含谱架和脚垫。'  
      //   },
      //  {
      //     img: require("../img/yule3.jpg"),
      //     name: " 星黛露公仔",
      //     price: "40",
      //     classify:'生活娱乐',
      //     details:'星黛露公仔70厘米'  
      //   },
      //   {
      //     img: require("../img/shouji5.jpg"),
      //     name: "尼康较新款Z卡口800定焦镜头",
      //     price: "6500",
      //     classify:'手机电脑',
      //     details:'58000+专配77毫米UV5000，镜徕图（Leofoto） LS-365C+PG-1悬臂镂空云台三脚架套装碳纤维大炮支架 徕图 LS-365C+PG-1，5200 '
      //   },
      //   {
      //     img: require("../img/yule1.jpg"),
      //     name: "萨克斯",
      //     price: "999",
      //     classify:'生活娱乐',
      //     details:'全新NORTON萨克斯出售'  
      //   },
      ],
      meizhuangList:[
      {
          img: require("../img/meizhuang1.jpg"),
          name: "娇兰",
          price: "300",
          classify:'个护美妆',
          details:'娇兰复原蜜精华50毫升 100%正品'  
        },
        {
          img: require("../img/meizhuang2.jpg"),
          name: "雅诗兰黛小棕瓶",
          price: "520",
          classify:'个护美妆',
          details:'雅诗兰黛小棕瓶100ML，全新未拆 购于免税店，两瓶套装。现在出一瓶。 100%正品'  
        },
        {
          img: require("../img/meizhuang4.jpg"),
          name: "高露洁美牙仪",
          price: "500",
          classify:'个护美妆',
          details:'高露洁美牙仪,仅拆封未使用'  
        },
        {
          img: require("../img/meizhuang3.jpg"),
          name: "泡澡桶",
          price: "120",
          classify:'个护美妆',
          details:'9成新木桶，质量很好！因地方变动放不下，忍痛转让！需要的联系！'  
        },
        {
          img: require("../img/meizhuang5.jpg"),
          name: "Dior999",
          price: "199",
          classify:'个护美妆',
          details:'全新迪奥Dior烈焰蓝金口红999唇膏专柜同款自贸区直销手续齐全特惠价'  
        },
      ],
      fushiList:[
      {
          img: require("../img/fushi1.jpg"),
          name: "天梭手表",
          price: "1800",
          classify:'服饰鞋帽',
          details:'天梭80动力，个人一手，正常佩戴未开盖。'  
        },
        {
          img: require("../img/fushi2.jpg"),
          name: "coach女包",
          price: "1000",
          classify:'服饰鞋帽',
          details:'在奥特莱斯买的包包，没用过，全新的没有划痕。'  
        },
        {
          img: require("../img/fushi3.jpg"),
          name: "羊羔毛外套",
          price: "100",
          classify:'服饰鞋帽',
          details:'9成新，保养好，上身好看，剪裁细节精致，色正柔和不挑肤色。'  
        },
        {
          img: require("../img/fushi4.jpg"),
          name: "大衣",
          price: "300",
          classify:'服饰鞋帽',
          details:'玖姿,全新，未穿'  
        },
        {
          img: require("../img/fushi5.jpg"),
          name: "Nike",
          price: "599",
          classify:'服饰鞋帽',
          details:'StrangeLove x Nike SB Dunk Low PRO 情人节限定 CT2552 800 36码'  
        },
      ],
      shoujiList: [
        {
          img: require("../img/shouji1.jpg"),
          name: "iPhone12 128G",
          price: "2500",
          classify:'手机电脑',
          details:'iPhone12 128G 白色 国行双卡,全网通,二手原装,无拆修,99新外观很新,配件齐全,支持七天无理由退换,保修一年 '
        },
        {
          img: require("../img/shouji2.jpg"),
          name: "曲屏华为P30",
          price: "900",
          classify:'手机电脑',
          details:'九新,市场新机售价为5488元的6.47寸华为p030pro曲面屏手机,市场新机售价为5999元的6.39寸华为Mate20pro曲屏手机  '
        },
        {
          img: require("../img/shouji3.jpg"),
          name: "iPhoneX 64G",
          price: "1000",
          classify:'手机电脑',
          details:'iPhoneX 64G 白色 本人在用，处理，喜欢的随时可以联系我看  '
        },
        { img: require("../img/shouji4.jpg"), 
        name: "索尼微单", price: "4499",
        classify:'手机电脑',
        details:'没用几次,配件齐全,包装都在,保修期内'
       },
        {
          img: require("../img/shouji5.jpg"),
          name: "尼康较新款Z卡口800定焦镜头",
          price: "6500",
          classify:'手机电脑',
          details:'58000+专配77毫米UV5000，镜徕图（Leofoto） LS-365C+PG-1悬臂镂空云台三脚架套装碳纤维大炮支架 徕图 LS-365C+PG-1，5200 '
        },
      ],
      yuleList:[
        {
          img: require("../img/yule1.jpg"),
          name: "萨克斯",
          price: "999",
          classify:'生活娱乐',
          details:'全新NORTON萨克斯出售'  
        },
        {
          img: require("../img/yule5.jpg"),
          name: "架子鼓",
          price: "4000",
          classify:'生活娱乐',
          details:'五鼓四擦，含谱架和脚垫。'  
        },
        {
          img: require("../img/yule2.jpg"),
          name: "圆号",
          price: "788",
          classify:'生活娱乐',
          details:'九成新圆号一把，一折价处理'  
        },
        {
          img: require("../img/yule3.jpg"),
          name: " 星黛露公仔",
          price: "40",
          classify:'生活娱乐',
          details:'星黛露公仔70厘米'  
        },
        {
          img: require("../img/yule4.jpg"),
          name: "家庭影院投影仪",
          price: "900",
          classify:'生活娱乐',
          details:'全新的轰天炮投影仪，适合家庭影院、室外旅游，足浴房使用,1080P画质'  
        },
        
      ],
      bookList:[
      {
          img: require("../img/img8.jpg"),
          name: "微信小程序实战开发",
          price: "20",
          state: "已完成",
          details: "",
          classify: "图书教材",
        },
        { img: require("../img/img9-1.jpg"),
         name: "亨利王子",
          price: "50" ,
          classify:"图书教材",
          details:"..."
        },
        { img: require("../img/book1.jpg"),
         name: "高三复习资料",
          price: "150" ,
          classify:"图书教材",
          details:"2022年购入高三理科复习资料，全新未拆封，娃娃高考完了，用不上。四川理科适用"
        },
        { img: require("../img/book2.jpg"),
         name: "儿童读物",
          price: "10" ,
          classify:"图书教材",
          details:"儿童读物"
        },
        { img: require("../img/book3.jpg"),
         name: "股票、期货投资经典读书",
          price: "300" ,
          classify:"图书教材",
          details:"证券从业、投资经典书籍，正版，八成新，32本，打包转让"
        },
      ],
      trafficList:[
      {
          img: require("../img/traffic1.jpg"),
          name: "美利达领航300",
          price: "998 ",
          details: "美利达领航者300，全车原版，前叉减震，前后双碟刹，禧玛诺变速器，前后快拆轮毂。26圈，16寸车架，适合160cm到180cm人群骑行",
          classify: "交通出行",
        },
        { img: require("../img/traffic4.jpg"),
         name: "捷安特锂电池电动车",
          price: "1000" ,
          classify:"交通出行",
          details:"捷安特电动车，八成新，本买来自用，现处理掉。车子功能完好无损，充满电可跑30公里"
        },
        { img: require("../img/traffic2.jpg"),
         name: "捷安特自行车",
          price: "150" ,
          classify:"交通出行",
          details:"捷安特专卖店实体店购买，780买进150出了"
        },
        { img: require("../img/traffic5.jpg"),
         name: "小米平衡车",
          price: "1000" ,
          classify:"交通出行",
          details:"小米平衡车燃动版，9成新"
        },
        { img: require("../img/traffic3.jpg"),
         name: "电瓶车",
          price: "1000" ,
          classify:"交通出行",
          details:"买来就没骑过，9成新"
        },
      ],
      sportsList:[
      {
          img: require("../img/sports1.jpg"),
          name: "未开封的篮球",
          price: "50",
          classify:'运动健身',
          details:'未开封的篮球适合于篮球初级学生'  
        },
        {
          img: require("../img/sports2.jpg"),
          name: "羽毛球拍",
          price: "75",
          classify:'运动健身',
          details:'买来没用，给转卖了有喜欢的朋友请与我联系'  
        },
        {
          img: require("../img/sports3.jpg"),
          name: "跑步机",
          price: "300",
          classify:'运动健身',
          details:'转让跑步机1台，该跑步机自买回至今使用不足100次，跑步机一切功能正常，可以插优盘，健身时可以听自己喜欢的音乐。'  
        },
        {
          img: require("../img/sports4.jpg"),
          name: "拳击沙袋",
          price: "100",
          classify:'运动健身',
          details:'成人拳击沙袋，高2米'  
        },
        {
          img: require("../img/sports5.jpg"),
          name: "蓝牙跳绳",
          price: "150",
          classify:'运动健身',
          details:'匹克智能蓝牙跳绳，全新开封，从未使用，低价出'  
        },
      ],
      activeTab:""


    
    };
  },
  computed:{
   
  },
  mounted(){
    window.home = this;
    this.tabClick();
  },
  created() {
    this.setTimer();
  },
  methods: {
    tabClick(){
      console.log(this.activeTab)
      let params = {
        "goods_type":this.activeTab,
      }
      axios.post('/search-goods',params)
        .then(res =>{
          if(res.status ==200 && res.data.errorcode==0){
            this.allList = res.data.data.map(v => {
              let item = this.goodsTypes.find(v1=>v1.name==v.goods_type);
              return {
                id:v.id,
                img:`/download?url=${v.goods_img_url}`,
                name:v.goods_name,
                price:v.goods_price,
                classify:item.label,
                details:v.goods_detail,
              }
            });
            // this.$message({message: '查询成功',type: 'success'});
          }else{
            this.$message({message: '查询失败',type: 'error'});
          }
        })
    },
    async search() {
    let params = {
      "goods_name": this.input,
      "goods_status":"0"
    }
    console.log(this.input)
    axios.post('/search-goods',params)
    .then( (res)=> {
      if(res.status ==200 && res.data.errorcode==0){
        this.$message({
          message: '搜索成功',
          type: 'success'
        });
        this.allList = res.data.data.map(v => {
              let item = this.goodsTypes.find(v1=>v1.name==v.goods_type);
              return {
                img:`/download?url=${v.goods_img_url}`,
                name:v.goods_name,
                price:v.goods_price,
                classify:item.label,
                details:v.goods_detail,
              }
            });
      }else{
        this.$message({
          message: '搜索失败'+res.data.message,
          type: 'error'
        });
      }
    })
  },
    setTimer() {
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        this.listIndex++;
        if (this.listIndex == this.BannerList.length) {
          this.listIndex = 0;
        }
      }, 2500);
    },
    upload() {
      let user_no = sessionStorage.getItem("user_no");
      console.log(sessionStorage)
      if(user_no){
        this.$router.push({ path: "/upload" });
      }else{
        this.$message({message: '请登录',type: 'error'});
      }
    },
    enteruser() {
      this.$router.push({ path: "/user" });
    },
  },
};
</script>

<style scoped>
/* .el-tabs__item{
  font-size: 20px;
  margin-top: 20px;
} */
.el-tabs__content {
  padding: 0;
  margin-left: 150px;
}
.likecontainer {
  background: #f5f5f5;
  width: 90%;
  margin-left: 60px;
}
#SearchForm {
  float: right;
  padding-right: 150px;
}
.header {
  width: 100%;
  display: block;
  height: 100px;
  background: #f5f5f5;
  margin-top: -8px;
}
#keyword {
  width: 300px;
  height: 40px;
  padding: 0 10px;
  float: left;
  border: 1px solid #ddd;
  border-right: none;
  font-size: 14px;
  color: #666;
  outline-style: none;
}
#searchbtn {
  height: 42px;
  width: 110px;
  padding: 0;
  cursor: pointer;
  border: 0;
  outline: 0;
  color: #fff;
  background-color: #96c4f9;
  font: 14px/1.5 Microsoft YaHei, \\5fae\8f6f\96c5\9ed1, arial, Simsun, \\5;
}
#uploadbtn {
  height: 42px;
  width: 110px;
  padding: 0;
  cursor: pointer;
  border: 0;
  outline: 0;
  color: #fff;
  background-color: #539df2;
  font: 14px/1.5 Microsoft YaHei, \\5fae\8f6f\96c5\9ed1, arial, Simsun, \\5;
}
ul {
  list-style-type: none;
  padding: 0px;
  margin: 0px;
}
.container2 {
  margin-top: 40px;
}
.fenlei {
  margin-left: 50px;
  height: 300px;
  background-color: rgb(237, 247, 250);
  border-radius: 20px;
}
.userbtn:hover {
  cursor: pointer;
  font-weight: bold;
}
</style>