(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/user/appointment/home/home"],{1721:function(e,t,n){"use strict";n.r(t);var a=n("c32f"),i=n("dbcd");for(var r in i)"default"!==r&&function(e){n.d(t,e,(function(){return i[e]}))}(r);n("ef33");var o,s=n("f0c5"),c=Object(s["a"])(i["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],o);t["default"]=c.exports},"3ad6":function(e,t,n){},5376:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=i(n("a34a"));function i(e){return e&&e.__esModule?e:{default:e}}function r(e,t,n,a,i,r,o){try{var s=e[r](o),c=s.value}catch(u){return void n(u)}s.done?t(c):Promise.resolve(c).then(a,i)}function o(e){return function(){var t=this,n=arguments;return new Promise((function(a,i){var o=e.apply(t,n);function s(e){r(o,a,i,s,c,"next",e)}function c(e){r(o,a,i,s,c,"throw",e)}s(void 0)}))}}var s=function(){Promise.all([n.e("common/vendor"),n.e("components/custom/foot")]).then(function(){return resolve(n("58a6"))}.bind(null,n)).catch(n.oe)},c=n("ae9b"),u={data:function(){return{imgList:[],type:"date",time:"请选择时间",date:"请选择日期",system:"",systemDate:"",systemTime:"",region:"省/市/区",address:"",people:"",name:"",details:"",imgLists:""}},methods:{ViewImage:function(t){e.previewImage({urls:this.imgList,current:t.currentTarget.dataset.url})},ChooseImage:function(){var t=this;e.chooseImage({count:4,sizeType:["original","compressed"],sourceType:["album"],success:function(e){0!=t.imgList.length?t.imgList=t.imgList.concat(e.tempFilePaths):t.imgList=e.tempFilePaths}})},DelImg:function(e){this.imgList.splice(e.currentTarget.dataset.index,1)},getTime:function(e){var t=this,n=e.detail.value;"date"==t.type?(t.type="time",t.date=n,n==t.systemDate&&(t.system=t.systemTime)):"time"==t.type&&(t.type="date",t.time=n,t.system=t.systemDate)},getRegion:function(e){this.region=String(e.detail.value).replace(",","/").replace(",","/")},getImgList:function(){var t,n=this;return console.log(n.imgList),new Promise((function(a){n.imgList.map((function(i,r){e.uploadFile({url:"http://212.129.238.250:8811/apiupload",filePath:i,name:"file",formData:{user:"test"},success:function(e){e.data=JSON.parse(e.data);var i=e.data.data.avatar;0==r?(t=i,1==n.imgList.length&&a(t)):(t="".concat(t,",").concat(i),n.imgList.length==r+1&&a(t))}})}))}))},getSubscribe:function(){var t=this;return o(a.default.mark((function n(){var i,r,o,s;return a.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(i=t,i.name){n.next=4;break}return e.showToast({title:"产品名称不能为空!",icon:"none"}),n.abrupt("return");case 4:if(i.details){n.next=7;break}return e.showToast({title:"问题详情不能为空!",icon:"none"}),n.abrupt("return");case 7:if(0!=i.imgList.length){n.next=10;break}return e.showToast({title:"请选择图片上传!",icon:"none"}),n.abrupt("return");case 10:if("请选择日期"!=i.date&&"请选择时间"!=i.time){n.next=13;break}return e.showToast({title:"请选择完整的预约时间!",icon:"none"}),n.abrupt("return");case 13:if(i.people){n.next=16;break}return e.showToast({title:"联系人不能为空!",icon:"none"}),n.abrupt("return");case 16:if("省/市/区"!=i.region){n.next=19;break}return e.showToast({title:"请选择省/市/区!",icon:"none"}),n.abrupt("return");case 19:if(i.details){n.next=22;break}return e.showToast({title:"详细地址不能为空!",icon:"none"}),n.abrupt("return");case 22:return n.next=24,i.getImgList();case 24:r=n.sent,console.log(r),o="".concat(i.date," ").concat(i.time),o=new Date(o).getTime()/1e3,s={user_id:e.getStorageSync("uid"),username:i.people,userphone:e.getStorageSync("phone"),city:i.region,address:i.address,questionimages:r,servicetime:o,productname:i.name,questioncontent:i.details},c.POST1("apireserveData",s,1).then((function(){var t=i.netWorkData.result[1];1==t.code&&(e.showToast({title:"预约成功!",icon:"none"}),setTimeout((function(){e.redirectTo({url:"/pages/user/home/home"})}),1500))}));case 30:case"end":return n.stop()}}),n)})))()}},components:{"user-foot":s},onLoad:function(){var e=new Date,t=e.getMonth()+1;t<10&&(t="0".concat(t));var n=e.getDate();n<10&&(n="0".concat(n)),this.systemDate="".concat(e.getFullYear(),"-").concat(t,"-").concat(n),this.system=this.systemDate;var a=String(e).split(" ")[4];this.systemTime=a.replace("-",":").replace("-",":")}};t.default=u}).call(this,n("543d")["default"])},b5b5:function(e,t,n){"use strict";(function(e){n("ecf4");a(n("66fd"));var t=a(n("1721"));function a(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},c32f:function(e,t,n){"use strict";var a;n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return r})),n.d(t,"a",(function(){return a}));var i=function(){var e=this,t=e.$createElement;e._self._c},r=[]},dbcd:function(e,t,n){"use strict";n.r(t);var a=n("5376"),i=n.n(a);for(var r in a)"default"!==r&&function(e){n.d(t,e,(function(){return a[e]}))}(r);t["default"]=i.a},ef33:function(e,t,n){"use strict";var a=n("3ad6"),i=n.n(a);i.a}},[["b5b5","common/runtime","common/vendor"]]]);