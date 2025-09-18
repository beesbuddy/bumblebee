goog.provide('bumblebee.ui.pages.login');
bumblebee.ui.pages.login.page = (function bumblebee$ui$pages$login$page(){
var f__32256__auto__ = (function (){
if(goog.DEBUG){
var temp__5825__auto___38368 = bumblebee.ui.pages.login.page.fast_refresh_signature;
if(cljs.core.truth_(temp__5825__auto___38368)){
var f__32180__auto___38369 = temp__5825__auto___38368;
(f__32180__auto___38369.cljs$core$IFn$_invoke$arity$0 ? f__32180__auto___38369.cljs$core$IFn$_invoke$arity$0() : f__32180__auto___38369.call(null));
} else {
}
} else {
}

var vec__38354 = uix.core.use_state("");
var user = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38354,(0),null);
var set_user = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38354,(1),null);
var vec__38357 = uix.core.use_state("");
var pass = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38357,(0),null);
var set_pass = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38357,(1),null);
var vec__38360 = uix.core.use_state(false);
var pending_QMARK_ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38360,(0),null);
var set_pending = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38360,(1),null);
return uix.compiler.aot._GT_el("div",[{'className':"max-w-md mx-auto space-y-4"}],[uix.compiler.aot._GT_el("h1",[{'className':"text-2xl font-bold"}],["Login"]),uix.compiler.aot._GT_el("form",[{'className':"space-y-3",'onSubmit':(function (e){
e.preventDefault();

if(cljs.core.truth_(pending_QMARK_)){
return null;
} else {
(set_pending.cljs$core$IFn$_invoke$arity$1 ? set_pending.cljs$core$IFn$_invoke$arity$1(true) : set_pending.call(null,true));

return bumblebee.ui.auth.login_async_BANG_().then((function (_){
var map__38363 = bumblebee.ui.auth.take_redirect_BANG_();
var map__38363__$1 = cljs.core.__destructure_map(map__38363);
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__38363__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var params = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__38363__$1,new cljs.core.Keyword(null,"params","params",710516235));
var query = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__38363__$1,new cljs.core.Keyword(null,"query","query",-1288509510));
if(cljs.core.truth_(name)){
return bumblebee.ui.router.navigate_BANG_.cljs$core$IFn$_invoke$arity$variadic(name,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([params,query], 0));
} else {
return bumblebee.ui.router.navigate_BANG_(new cljs.core.Keyword(null,"home","home",-74557309));
}
})).finally((function (){
return (set_pending.cljs$core$IFn$_invoke$arity$1 ? set_pending.cljs$core$IFn$_invoke$arity$1(false) : set_pending.call(null,false));
}));
}
})}],[uix.compiler.aot._GT_el("div",[{'className':"space-y-1"}],[uix.compiler.aot._GT_el("label",[{'className':"block text-sm"}],["Username"]),uix.compiler.aot.create_uix_input("input",[{'className':"w-full border rounded px-2 py-1",'value':uix.compiler.attributes.keyword__GT_string(user),'onChange':(function (p1__38339_SHARP_){
var G__38364 = p1__38339_SHARP_.target.value;
return (set_user.cljs$core$IFn$_invoke$arity$1 ? set_user.cljs$core$IFn$_invoke$arity$1(G__38364) : set_user.call(null,G__38364));
})}],[])]),uix.compiler.aot._GT_el("div",[{'className':"space-y-1"}],[uix.compiler.aot._GT_el("label",[{'className':"block text-sm"}],["Password"]),uix.compiler.aot.create_uix_input("input",[{'type':"password",'className':"w-full border rounded px-2 py-1",'value':uix.compiler.attributes.keyword__GT_string(pass),'onChange':(function (p1__38340_SHARP_){
var G__38365 = p1__38340_SHARP_.target.value;
return (set_pass.cljs$core$IFn$_invoke$arity$1 ? set_pass.cljs$core$IFn$_invoke$arity$1(G__38365) : set_pass.call(null,G__38365));
})}],[])]),uix.compiler.aot._GT_el("button",[{'type':"submit",'disabled':uix.compiler.attributes.keyword__GT_string(pending_QMARK_),'className':["px-3 py-1 border rounded ",(cljs.core.truth_(pending_QMARK_)?"opacity-60 cursor-not-allowed":null)].join('')}],[(cljs.core.truth_(pending_QMARK_)?"Signing in\u2026":"Sign in")])]),(cljs.core.truth_(pending_QMARK_)?uix.compiler.aot._GT_el("div",[{'className':"pt-2"}],[uix.compiler.alpha.component_element(bumblebee.ui.components.spinner.spinner,[new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"label","label",1718410804),"Authorizing\u2026"], null)],[])]):null)]);
});
if(goog.DEBUG){
var _STAR_current_component_STAR__orig_val__38366 = uix.core._STAR_current_component_STAR_;
var _STAR_current_component_STAR__temp_val__38367 = bumblebee.ui.pages.login.page;
(uix.core._STAR_current_component_STAR_ = _STAR_current_component_STAR__temp_val__38367);

try{return f__32256__auto__();
}finally {(uix.core._STAR_current_component_STAR_ = _STAR_current_component_STAR__orig_val__38366);
}} else {
return f__32256__auto__();
}
});

(bumblebee.ui.pages.login.page.uix_component_QMARK_ = true);

uix.core.set_display_name(bumblebee.ui.pages.login.page,"bumblebee.ui.pages.login/page");

if(goog.DEBUG){
if((typeof window !== 'undefined') && (typeof window.uix !== 'undefined') && (typeof window.uix.dev !== 'undefined')){
var sig__32189__auto___38370 = window.uix.dev.signature_BANG_();
(sig__32189__auto___38370.cljs$core$IFn$_invoke$arity$4 ? sig__32189__auto___38370.cljs$core$IFn$_invoke$arity$4(bumblebee.ui.pages.login.page,"(use-state \"\")(use-state \"\")(use-state false)",null,null) : sig__32189__auto___38370.call(null,bumblebee.ui.pages.login.page,"(use-state \"\")(use-state \"\")(use-state false)",null,null));

window.uix.dev.register_BANG_(bumblebee.ui.pages.login.page,bumblebee.ui.pages.login.page.displayName);

(bumblebee.ui.pages.login.page.fast_refresh_signature = sig__32189__auto___38370);
} else {
}
} else {
}


//# sourceMappingURL=bumblebee.ui.pages.login.js.map
