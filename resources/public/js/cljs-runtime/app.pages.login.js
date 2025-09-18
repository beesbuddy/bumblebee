goog.provide('app.pages.login');
app.pages.login.page = (function app$pages$login$page(){
var f__43724__auto__ = (function (){
if(goog.DEBUG){
var temp__5825__auto___51384 = app.pages.login.page.fast_refresh_signature;
if(cljs.core.truth_(temp__5825__auto___51384)){
var f__43648__auto___51385 = temp__5825__auto___51384;
(f__43648__auto___51385.cljs$core$IFn$_invoke$arity$0 ? f__43648__auto___51385.cljs$core$IFn$_invoke$arity$0() : f__43648__auto___51385.call(null));
} else {
}
} else {
}

var vec__51346 = uix.core.use_state("");
var user = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__51346,(0),null);
var set_user = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__51346,(1),null);
var vec__51349 = uix.core.use_state("");
var pass = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__51349,(0),null);
var set_pass = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__51349,(1),null);
var vec__51352 = uix.core.use_state(false);
var pending_QMARK_ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__51352,(0),null);
var set_pending = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__51352,(1),null);
return uix.compiler.aot._GT_el("div",[{'className':"max-w-md mx-auto space-y-4"}],[uix.compiler.aot._GT_el("h1",[{'className':"text-2xl font-bold"}],["Login"]),uix.compiler.aot._GT_el("form",[{'className':"space-y-3",'onSubmit':(function (e){
e.preventDefault();

if(cljs.core.truth_(pending_QMARK_)){
return null;
} else {
(set_pending.cljs$core$IFn$_invoke$arity$1 ? set_pending.cljs$core$IFn$_invoke$arity$1(true) : set_pending.call(null,true));

return app.auth.login_async_BANG_().then((function (_){
var map__51355 = app.auth.take_redirect_BANG_();
var map__51355__$1 = cljs.core.__destructure_map(map__51355);
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__51355__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var params = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__51355__$1,new cljs.core.Keyword(null,"params","params",710516235));
var query = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__51355__$1,new cljs.core.Keyword(null,"query","query",-1288509510));
if(cljs.core.truth_(name)){
return app.router.navigate_BANG_.cljs$core$IFn$_invoke$arity$variadic(name,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([params,query], 0));
} else {
return app.router.navigate_BANG_(new cljs.core.Keyword(null,"home","home",-74557309));
}
})).finally((function (){
return (set_pending.cljs$core$IFn$_invoke$arity$1 ? set_pending.cljs$core$IFn$_invoke$arity$1(false) : set_pending.call(null,false));
}));
}
})}],[uix.compiler.aot._GT_el("div",[{'className':"space-y-1"}],[uix.compiler.aot._GT_el("label",[{'className':"block text-sm"}],["Username"]),uix.compiler.aot.create_uix_input("input",[{'className':"w-full border rounded px-2 py-1",'value':uix.compiler.attributes.keyword__GT_string(user),'onChange':(function (p1__51320_SHARP_){
var G__51360 = p1__51320_SHARP_.target.value;
return (set_user.cljs$core$IFn$_invoke$arity$1 ? set_user.cljs$core$IFn$_invoke$arity$1(G__51360) : set_user.call(null,G__51360));
})}],[])]),uix.compiler.aot._GT_el("div",[{'className':"space-y-1"}],[uix.compiler.aot._GT_el("label",[{'className':"block text-sm"}],["Password"]),uix.compiler.aot.create_uix_input("input",[{'type':"password",'className':"w-full border rounded px-2 py-1",'value':uix.compiler.attributes.keyword__GT_string(pass),'onChange':(function (p1__51321_SHARP_){
var G__51361 = p1__51321_SHARP_.target.value;
return (set_pass.cljs$core$IFn$_invoke$arity$1 ? set_pass.cljs$core$IFn$_invoke$arity$1(G__51361) : set_pass.call(null,G__51361));
})}],[])]),uix.compiler.aot._GT_el("button",[{'type':"submit",'disabled':uix.compiler.attributes.keyword__GT_string(pending_QMARK_),'className':["px-3 py-1 border rounded ",(cljs.core.truth_(pending_QMARK_)?"opacity-60 cursor-not-allowed":null)].join('')}],[(cljs.core.truth_(pending_QMARK_)?"Signing in\u2026":"Sign in")])]),(cljs.core.truth_(pending_QMARK_)?uix.compiler.aot._GT_el("div",[{'className':"pt-2"}],[uix.compiler.alpha.component_element(app.components.spinner.spinner,[new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"label","label",1718410804),"Authorizing\u2026"], null)],[])]):null)]);
});
if(goog.DEBUG){
var _STAR_current_component_STAR__orig_val__51366 = uix.core._STAR_current_component_STAR_;
var _STAR_current_component_STAR__temp_val__51367 = app.pages.login.page;
(uix.core._STAR_current_component_STAR_ = _STAR_current_component_STAR__temp_val__51367);

try{return f__43724__auto__();
}finally {(uix.core._STAR_current_component_STAR_ = _STAR_current_component_STAR__orig_val__51366);
}} else {
return f__43724__auto__();
}
});

(app.pages.login.page.uix_component_QMARK_ = true);

uix.core.set_display_name(app.pages.login.page,"app.pages.login/page");

if(goog.DEBUG){
if((typeof window !== 'undefined') && (typeof window.uix !== 'undefined') && (typeof window.uix.dev !== 'undefined')){
var sig__43657__auto___51390 = window.uix.dev.signature_BANG_();
(sig__43657__auto___51390.cljs$core$IFn$_invoke$arity$4 ? sig__43657__auto___51390.cljs$core$IFn$_invoke$arity$4(app.pages.login.page,"(use-state \"\")(use-state \"\")(use-state false)",null,null) : sig__43657__auto___51390.call(null,app.pages.login.page,"(use-state \"\")(use-state \"\")(use-state false)",null,null));

window.uix.dev.register_BANG_(app.pages.login.page,app.pages.login.page.displayName);

(app.pages.login.page.fast_refresh_signature = sig__43657__auto___51390);
} else {
}
} else {
}


//# sourceMappingURL=app.pages.login.js.map
