"use strict";(self.webpackChunkegg_frontend=self.webpackChunkegg_frontend||[]).push([[126],{4126:function(e,t,n){n.r(t),n.d(t,{default:function(){return P}});var r=n(1413),a=n(4165),i=n(5861),l=n(9439),c=n(2872),o=n(7484),s=n(7031),u=n(6106),d=n(7309),p=n(7462),f=n(4942),m=n(1694),x=n.n(m),v=n(5501),h=n(2791),g=n(1929),Z=n(9911);function y(e){var t=e.className,n=e.direction,r=e.index,a=e.marginDirection,i=e.children,l=e.split,c=e.wrap,o=h.useContext(j),s=o.horizontalSize,u=o.verticalSize,d=o.latestIndex,m={};return o.supportFlexGap||("vertical"===n?r<d&&(m={marginBottom:s/(l?2:1)}):m=(0,p.Z)((0,p.Z)({},r<d&&(0,f.Z)({},a,s/(l?2:1))),c&&{paddingBottom:u})),null===i||void 0===i?null:h.createElement(h.Fragment,null,h.createElement("div",{className:t,style:m},i),r<d&&l&&h.createElement("span",{className:"".concat(t,"-split"),style:m},l))}var b=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols){var a=0;for(r=Object.getOwnPropertySymbols(e);a<r.length;a++)t.indexOf(r[a])<0&&Object.prototype.propertyIsEnumerable.call(e,r[a])&&(n[r[a]]=e[r[a]])}return n},j=h.createContext({latestIndex:0,horizontalSize:0,verticalSize:0,supportFlexGap:!1}),k={small:8,middle:16,large:24};var w=function(e){var t,n=h.useContext(g.E_),r=n.getPrefixCls,a=n.space,i=n.direction,c=e.size,o=void 0===c?(null===a||void 0===a?void 0:a.size)||"small":c,s=e.align,u=e.className,d=e.children,m=e.direction,w=void 0===m?"horizontal":m,z=e.prefixCls,S=e.split,C=e.style,O=e.wrap,N=void 0!==O&&O,E=b(e,["size","align","className","children","direction","prefixCls","split","style","wrap"]),I=(0,Z.Z)(),R=h.useMemo((function(){return(Array.isArray(o)?o:[o,o]).map((function(e){return function(e){return"string"===typeof e?k[e]:e||0}(e)}))}),[o]),F=(0,l.Z)(R,2),M=F[0],P=F[1],_=(0,v.Z)(d,{keepEmpty:!0}),B=void 0===s&&"horizontal"===w?"center":s,G=r("space",z),A=x()(G,"".concat(G,"-").concat(w),(t={},(0,f.Z)(t,"".concat(G,"-rtl"),"rtl"===i),(0,f.Z)(t,"".concat(G,"-align-").concat(B),B),t),u),U="".concat(G,"-item"),D="rtl"===i?"marginLeft":"marginRight",q=0,L=_.map((function(e,t){null!==e&&void 0!==e&&(q=t);var n=e&&e.key||"".concat(U,"-").concat(t);return h.createElement(y,{className:U,key:n,direction:w,index:t,marginDirection:D,split:S,wrap:N},e)})),V=h.useMemo((function(){return{horizontalSize:M,verticalSize:P,latestIndex:q,supportFlexGap:I}}),[M,P,q,I]);if(0===_.length)return null;var W={};return N&&(W.flexWrap="wrap",I||(W.marginBottom=-P)),I&&(W.columnGap=M,W.rowGap=P),h.createElement("div",(0,p.Z)({className:A,style:(0,p.Z)((0,p.Z)({},W),C)},E),h.createElement(j.Provider,{value:V},L))},z=n(5048),S=n(4479),C=n(5523),O=n(6076),N="RoleManage_root__zbBjR",E=n(1756),I=n(1776),R=n(184),F=c.Z.Column,M=[{title:"\u89d2\u8272id",dataIndex:"uuid"},{title:"\u89d2\u8272\u540d\u79f0",dataIndex:"roleName"},{title:"\u89d2\u8272\u63cf\u8ff0",dataIndex:"roleMark"}],P=function(){var e=(0,h.useState)("add"),t=(0,l.Z)(e,2),n=t[0],p=t[1],f=(0,h.useState)(!1),m=(0,l.Z)(f,2),v=m[0],g=m[1],Z=(0,h.useState)(),y=(0,l.Z)(Z,2),b=y[0],j=y[1],k=(0,h.useState)(!1),P=(0,l.Z)(k,2),_=P[0],B=P[1],G=h.createRef(),A=(0,S.T)(),U=(0,S.C)((function(e){return e.user.Roles}),z.wU);(0,h.useEffect)((function(){A((0,C.Rl)())}),[A]);var D=function(){var e=(0,i.Z)((0,a.Z)().mark((function e(){var t,r,i,l,c,o,s,u,d,p;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if("add"!==n){e.next=21;break}return e.prev=1,t=G.current,e.next=5,t.validateFields();case 5:return r=t.getFieldsValue(),B(!0),e.next=9,(0,E.MQ)(r);case 9:if(i=e.sent,l=i.data,c=l.code,o=l.message,1!==c){e.next=15;break}return e.abrupt("return",(0,I.vU)(o));case 15:0===c&&(q("\u6dfb\u52a0\u6210\u529f"),t.resetFields()),e.next=21;break;case 18:e.prev=18,e.t0=e.catch(1),B(!1);case 21:if("delete"!==n||!b&&0!==b){e.next=40;break}return e.prev=22,B(!0),e.next=26,(0,E.Rd)(b);case 26:if(s=e.sent,u=s.data,d=u.code,p=u.message,1!==d){e.next=32;break}return e.abrupt("return",(0,I.vU)(p));case 32:0===d&&q("\u5220\u9664\u6210\u529f"),e.next=40;break;case 35:e.prev=35,e.t1=e.catch(22),B(!1),g(!1),(0,I.vU)("ERROR ".concat(JSON.stringify(e.t1)));case 40:case"end":return e.stop()}}),e,null,[[1,18],[22,35]])})));return function(){return e.apply(this,arguments)}}(),q=function(e){g(!1),B(!1),(0,I.Vp)(e),A((0,C.Rl)())},L=function(){var e=(0,i.Z)((0,a.Z)().mark((function e(t){var n;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=t.uuid,p("delete"),g(!0),j(n);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return(0,R.jsxs)("main",{className:x()(N),children:[(0,R.jsx)(O.Z,{visible:v,confirmLoading:_,handleOk:D,handleCancel:function(){var e;g(!1),null===(e=G.current)||void 0===e||e.resetFields()},title:"add"===n?"\u6dfb\u52a0\u89d2\u8272":"\u5220\u9664\u89d2\u8272",children:"add"===n?(0,R.jsxs)(o.Z,{autoComplete:"off",ref:G,labelCol:{flex:"110px"},labelAlign:"left",labelWrap:!0,wrapperCol:{flex:1},children:[(0,R.jsx)(o.Z.Item,{label:"\u89d2\u8272\u540d\u79f0",name:"roleName",rules:[{required:!0,min:1,max:10,message:"1-10\u4e2a\u5b57"}],children:(0,R.jsx)(s.Z,{})}),(0,R.jsx)(o.Z.Item,{label:"\u89d2\u8272\u63cf\u8ff0",name:"roleMark",rules:[{required:!1,max:50,message:"\u6700\u591a50\u4e2a\u5b57"}],children:(0,R.jsx)(s.Z,{})})]}):(0,R.jsx)("p",{children:"\u786e\u5b9a\u5220\u9664\u5f53\u524d\u89d2\u8272\u5417"})}),(0,R.jsx)(u.Z,{justify:"end",children:(0,R.jsx)(d.Z,{type:"primary",className:"roleAddButton",onClick:function(){return p("add"),void g(!0)},children:"\u6dfb\u52a0\u89d2\u8272"})}),(0,R.jsxs)(c.Z,{pagination:{total:U.length,showSizeChanger:!0,onShowSizeChange:function(e,t){console.log(e,t)},pageSizeOptions:[5,10,20,50],defaultPageSize:5},dataSource:U.map((function(e){return(0,r.Z)({key:e.uuid},e)})),rowKey:function(e){return e.uuid},children:[M.map((function(e){var t=e.title,n=e.dataIndex;return(0,R.jsx)(F,{title:t,dataIndex:n},n)})),(0,R.jsx)(F,{title:"\u64cd\u4f5c",render:function(e,t){return(0,R.jsx)(w,{size:"middle",children:(0,R.jsx)(d.Z,{type:"dashed",onClick:function(){return L(t)},disabled:!t.canDelete,children:"\u5220\u9664"})})}},"action")]})]})}}}]);
//# sourceMappingURL=126.bb3799de.chunk.js.map