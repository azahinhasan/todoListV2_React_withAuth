(this.webpackJsonptodo_list=this.webpackJsonptodo_list||[]).push([[0],{16:function(e,t,n){"use strict";n.d(t,"c",(function(){return o})),n.d(t,"a",(function(){return a})),n.d(t,"b",(function(){return r})),n.d(t,"d",(function(){return c})),n.d(t,"e",(function(){return i}));var o="AUTH_SUCCESS",a="AUTH_FAILED",r="AUTH_LOGOUT",c="LODING_START",i="LODING_STOP"},28:function(e,t){},33:function(e,t,n){"use strict";n.d(t,"a",(function(){return a}));var o=n(18);n(87),n(65),n(88);o.a.initializeApp({apiKey:"AIzaSyAvqfm2zNHYHKAN75c_FwjViuJhe6HneaI",authDomain:"todolist-4d2db.firebaseapp.com",projectId:"todolist-4d2db",storageBucket:"todolist-4d2db.appspot.com",messagingSenderId:"611839853346",appId:"1:611839853346:web:cfdf7461552546a6129b7b",measurementId:"G-S32YXE5E9Z"}),o.a.analytics();var a=o.a.firestore()},37:function(e,t,n){e.exports={App:"App__App__2vBGD",chngeMoodDark:"App__chngeMoodDark__1xhFZ",chngeMoodLight:"App__chngeMoodLight__34flI",userName:"App__userName__3uDfi",noPrint:"App__noPrint__29U3i",table:"App__table__15fDY",PSnote:"App__PSnote__3xD7o"}},42:function(e,t,n){"use strict";n.d(t,"d",(function(){return o.getTodo})),n.d(t,"a",(function(){return l})),n.d(t,"b",(function(){return f})),n.d(t,"c",(function(){return h})),n.d(t,"g",(function(){return m})),n.d(t,"f",(function(){return g})),n.d(t,"e",(function(){return I}));var o=n(28),a=n(16),r=n(18),c=n(33),i=n(39),u=n.n(i),s=function(){return{type:a.c,signedIn:!0,userId:localStorage.getItem("userId"),name:localStorage.getItem("displayName"),token:localStorage.getItem("token")}},d=function(e){return{type:a.a,signedIn:!1,error:e}},l=function(e,t){return function(n){var o={email:e,password:t};u.a.post("https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAvqfm2zNHYHKAN75c_FwjViuJhe6HneaI",o).then((function(e){console.log(e),localStorage.setItem("token",e.data.idToken),localStorage.setItem("userId",e.data.localId),localStorage.setItem("displayName",e.data.displayName),n(s())})).catch((function(e){n(d(e.response.data.error.message))}))}},p=function(e,t){return function(n){var o=0;c.a.collection("userInfo").where("UserID","==",t).get().then((function(n){o=n.size,console.log("coutReturn ",o),o<=0&&(console.log("{adding..}"),c.a.collection("userInfo").add({Name:e,UserID:t,SignUpDate:new Date}))}))}},f=function(e,t,n){return function(o){var a={email:e,password:t,displayName:n};u.a.post("https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAvqfm2zNHYHKAN75c_FwjViuJhe6HneaI",a).then((function(a){new Date(1e3*((new Date).getTime()+a.data.expiresIn));o(p(n,a.data.localId)),o(l(e,t))})).catch((function(e){o(d(e.response.data.error.message))}))}},g=function(){var e=new r.a.auth.GoogleAuthProvider;return function(t){return r.a.auth().signInWithPopup(e).then((function(e){console.log(e.user.ja.X),console.log(e),localStorage.setItem("token",e.credential.idToken),localStorage.setItem("userId",e.user.ja.X),localStorage.setItem("displayName",e.additionalUserInfo.profile.name),t(p(e.additionalUserInfo.profile.name,e.user.ja.X)),t(s())})).catch((function(e){console.log(e.message),t(d(e.message))}))}},I=function(){var e=new r.a.auth.FacebookAuthProvider;return function(t){return r.a.auth().signInWithPopup(e).then((function(e){console.log(e),localStorage.setItem("accessToken",e.credential.accessToken),localStorage.setItem("userId",e.user.ja.X),localStorage.setItem("displayName",e.additionalUserInfo.profile.name),t(p(e.additionalUserInfo.profile.name,e.user.ja.X)),t(s())})).catch((function(e){console.log(e),t(d(e.message))}))}},m=function(){return localStorage.removeItem("token"),localStorage.removeItem("displayName"),localStorage.removeItem("userId"),localStorage.removeItem("accessToken"),{type:a.b}},h=function(){return function(e){var t=localStorage.getItem("userId");e(t?s():m())}}},54:function(e,t){},60:function(e,t,n){},86:function(e,t,n){"use strict";n.r(t);var o=n(1),a=n(31),r=n.n(a),c=(n(60),n(23)),i=n(24),u=n(26),s=n(25),d=n(27),l=n(42),p=n(5),f=n(37),g=n.n(f),I=n(14),m=n(7),h=function(e){return function(t){Object(u.a)(o,t);var n=Object(s.a)(o);function o(){var e;Object(c.a)(this,o);for(var t=arguments.length,a=new Array(t),r=0;r<t;r++)a[r]=arguments[r];return(e=n.call.apply(n,[this].concat(a))).state={component:null},e}return Object(i.a)(o,[{key:"componentDidMount",value:function(){var t=this;e().then((function(e){t.setState({component:e.default})}))}},{key:"render",value:function(){var e=this.state.component;return e?Object(m.jsx)(e,Object(I.a)({},this.props)):null}}]),o}(o.Component)},b=h((function(){return n.e(3).then(n.bind(null,101))})),j=h((function(){return n.e(4).then(n.bind(null,98))})),O=h((function(){return n.e(5).then(n.bind(null,99))})),_=function(e){Object(u.a)(n,e);var t=Object(s.a)(n);function n(){var e;Object(c.a)(this,n);for(var o=arguments.length,a=new Array(o),r=0;r<o;r++)a[r]=arguments[r];return(e=t.call.apply(t,[this].concat(a))).state={updateCounter:0,updatePage:!1,todoInput:"Enter Your ToDo",getTodoCallAgain:!1,todos:[],darkMood:!1},e}return Object(i.a)(n,[{key:"componentDidMount",value:function(){this.props.authCheckState()}},{key:"render",value:function(){var e=null;return e=this.props.signedIn?Object(m.jsxs)(p.d,{children:[Object(m.jsx)(p.b,{path:"/ToDos",component:b}),Object(m.jsx)(p.a,{to:"/ToDos"})]}):Object(m.jsxs)(p.d,{children:[Object(m.jsx)(p.b,{path:"/SignUp",component:O}),Object(m.jsx)(p.b,{path:"/SignIn",exact:!0,component:j}),Object(m.jsx)(p.a,{to:"/SignIn"})]}),Object(m.jsx)("div",{className:g.a.App,children:e})}}]),n}(o.Component),v=Object(d.b)((function(e){return{signedIn:e.auth.signedIn}}),(function(e){return{authCheckState:function(){return e(l.c())}}}))(_),S=function(e){e&&e instanceof Function&&n.e(6).then(n.bind(null,100)).then((function(t){var n=t.getCLS,o=t.getFID,a=t.getFCP,r=t.getLCP,c=t.getTTFB;n(e),o(e),a(e),r(e),c(e)}))},A=n(16),y={signedIn:!1,error:"",userId:"",name:"",loading:!1},k=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:y,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case A.c:return Object(I.a)(Object(I.a)({},e),{},{signedIn:t.signedIn,userId:t.userId,name:t.name});case A.a:return Object(I.a)(Object(I.a)({},e),{},{signedIn:t.signedIn,error:t.error});case A.b:return Object(I.a)(Object(I.a)({},e),{},{signedIn:!1});case A.d:return Object(I.a)(Object(I.a)({},e),{},{loading:!0});case A.e:return Object(I.a)(Object(I.a)({},e),{},{loading:!1});default:return e}},D=n(54),T=n.n(D),N=n(19),w=n(55),x=n(34),U=Object(N.c)({auth:k,data:T.a}),P=window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__||N.d,C=Object(N.e)(U,P(Object(N.a)(w.a)));r.a.render(Object(m.jsx)(d.a,{store:C,children:Object(m.jsx)(x.a,{children:Object(m.jsx)(v,{})})}),document.getElementById("root")),S()}},[[86,1,2]]]);
//# sourceMappingURL=main.16780ed6.chunk.js.map