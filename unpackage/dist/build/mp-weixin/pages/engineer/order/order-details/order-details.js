(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/engineer/order/order-details/order-details"],{"000e":function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=n("ae9b"),i=getApp(),u={data:function(){return{productImg:"200rpx",status:null,id:null,details:"",imgurl:i.globalData.imgurl}},methods:{ViewImage:function(e){var n=this;t.previewImage({urls:n.details.questionimages,current:e.currentTarget.dataset.url})},getDetails:function(){var t=this,e={status:t.status,id:t.id};a.POST1("apiengineerdetail",e,1).then((function(){var e=t.netWorkData.result[1];if(1==e.code){var n=e.data;n.servicetime=n.servicetime.split(" ")[0],t.details=n;var a=[];t.details.questionimages.map((function(e){a.push(t.imgurl+e)})),t.details.questionimages=a}}))}},onLoad:function(t){this.productImg="".concat(.77*(this.screenWidth-30-28)*.5*.8,"px"),this.status=t.status,this.id=t.id,this.getDetails()}};e.default=u}).call(this,n("543d")["default"])},"10cd":function(t,e,n){"use strict";var a;n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return u})),n.d(e,"a",(function(){return a}));var i=function(){var t=this,e=t.$createElement;t._self._c},u=[]},1300:function(t,e,n){"use strict";var a=n("b90d"),i=n.n(a);i.a},"85a6":function(t,e,n){"use strict";n.r(e);var a=n("000e"),i=n.n(a);for(var u in a)"default"!==u&&function(t){n.d(e,t,(function(){return a[t]}))}(u);e["default"]=i.a},a6fc:function(t,e,n){"use strict";n.r(e);var a=n("10cd"),i=n("85a6");for(var u in i)"default"!==u&&function(t){n.d(e,t,(function(){return i[t]}))}(u);n("1300");var r,s=n("f0c5"),c=Object(s["a"])(i["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],r);e["default"]=c.exports},af57:function(t,e,n){"use strict";(function(t){n("ecf4");a(n("66fd"));var e=a(n("a6fc"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},b90d:function(t,e,n){}},[["af57","common/runtime","common/vendor"]]]);