goog.provide('bumblebee.ui.pages.home');
var module$node_modules$axios$dist$browser$axios_cjs=shadow.js.require("module$node_modules$axios$dist$browser$axios_cjs", {});
bumblebee.ui.pages.home.user_card = (function bumblebee$ui$pages$home$user_card(props__36204__auto__){
var props39458 = uix.core.glue_args(props__36204__auto__);
var vec__39459 = [props39458];
var map__39462 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39459,(0),null);
var map__39462__$1 = cljs.core.__destructure_map(map__39462);
var id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39462__$1,new cljs.core.Keyword(null,"id","id",-1388402092));
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39462__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var ___36203__auto__ = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$1(props39458);
var f__36205__auto__ = (function (){

if(goog.DEBUG){
var temp__5825__auto___39491 = bumblebee.ui.pages.home.user_card.fast_refresh_signature;
if(cljs.core.truth_(temp__5825__auto___39491)){
var f__36119__auto___39492 = temp__5825__auto___39491;
(f__36119__auto___39492.cljs$core$IFn$_invoke$arity$0 ? f__36119__auto___39492.cljs$core$IFn$_invoke$arity$0() : f__36119__auto___39492.call(null));
} else {
}
} else {
}

return uix.compiler.aot._GT_el("div",[{'className':"rounded border p-3"}],[uix.compiler.aot._GT_el("div",[{'className':"text-sm text-slate-500"}],[["ID: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(id)].join('')]),uix.compiler.aot._GT_el("div",[{'className':"font-semibold"}],[name])]);
});
if(goog.DEBUG){
var _STAR_current_component_STAR__orig_val__39463 = uix.core._STAR_current_component_STAR_;
var _STAR_current_component_STAR__temp_val__39464 = bumblebee.ui.pages.home.user_card;
(uix.core._STAR_current_component_STAR_ = _STAR_current_component_STAR__temp_val__39464);

try{if(((cljs.core.map_QMARK_(props39458)) || ((props39458 == null)))){
} else {
throw (new Error(["Assert failed: ",["UIx component expects a map of props, but instead got ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(props39458)].join(''),"\n","(clojure.core/or (clojure.core/map? props39458) (clojure.core/nil? props39458))"].join('')));
}

return f__36205__auto__();
}finally {(uix.core._STAR_current_component_STAR_ = _STAR_current_component_STAR__orig_val__39463);
}} else {
return f__36205__auto__();
}
});

(bumblebee.ui.pages.home.user_card.uix_component_QMARK_ = true);

uix.core.set_display_name(bumblebee.ui.pages.home.user_card,"bumblebee.ui.pages.home/user-card");

if(goog.DEBUG){
if((typeof window !== 'undefined') && (typeof window.uix !== 'undefined') && (typeof window.uix.dev !== 'undefined')){
var sig__36128__auto___39493 = window.uix.dev.signature_BANG_();
(sig__36128__auto___39493.cljs$core$IFn$_invoke$arity$4 ? sig__36128__auto___39493.cljs$core$IFn$_invoke$arity$4(bumblebee.ui.pages.home.user_card,"",null,null) : sig__36128__auto___39493.call(null,bumblebee.ui.pages.home.user_card,"",null,null));

window.uix.dev.register_BANG_(bumblebee.ui.pages.home.user_card,bumblebee.ui.pages.home.user_card.displayName);

(bumblebee.ui.pages.home.user_card.fast_refresh_signature = sig__36128__auto___39493);
} else {
}
} else {
}

bumblebee.ui.pages.home.page = (function bumblebee$ui$pages$home$page(){
var f__36195__auto__ = (function (){
if(goog.DEBUG){
var temp__5825__auto___39494 = bumblebee.ui.pages.home.page.fast_refresh_signature;
if(cljs.core.truth_(temp__5825__auto___39494)){
var f__36119__auto___39495 = temp__5825__auto___39494;
(f__36119__auto___39495.cljs$core$IFn$_invoke$arity$0 ? f__36119__auto___39495.cljs$core$IFn$_invoke$arity$0() : f__36119__auto___39495.call(null));
} else {
}
} else {
}

var vec__39480 = uix.core.use_state(cljs.core.PersistentVector.EMPTY);
var users = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39480,(0),null);
var set_users = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39480,(1),null);
var vec__39483 = uix.core.use_state((0));
var count = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39483,(0),null);
var set_count = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__39483,(1),null);
uix.hooks.alpha.use_effect.cljs$core$IFn$_invoke$arity$2((function (){
return module$node_modules$axios$dist$browser$axios_cjs.get("https://jsonplaceholder.typicode.com/users").then((function (resp){
var users__$1 = new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(cljs.core.js__GT_clj.cljs$core$IFn$_invoke$arity$variadic(resp,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"keywordize-keys","keywordize-keys",1310784252),true], 0)));
var G__39487 = cljs.core.filterv((function (p1__39465_SHARP_){
return bumblebee.ui.schemas.valid_user_QMARK_(p1__39465_SHARP_);
}),users__$1);
return (set_users.cljs$core$IFn$_invoke$arity$1 ? set_users.cljs$core$IFn$_invoke$arity$1(G__39487) : set_users.call(null,G__39487));
}));
}),[uix.hooks.alpha.use_clj_deps(cljs.core.PersistentVector.EMPTY)]);

return uix.compiler.aot._GT_el("div",[{'className':"space-y-4"}],[uix.compiler.aot._GT_el("h1",[{'className':"text-2xl font-bold"}],["Home"]),uix.compiler.aot._GT_el("p",uix.compiler.attributes.interpret_attrs("JWT mock demo. Login, then watch token badge in the navbar auto-refresh.",["p",null,null,false],false),[]),uix.compiler.aot._GT_el("div",[{'className':"flex items-center gap-2"}],[uix.compiler.aot._GT_el("button",[{'className':"px-3 py-1 border rounded",'onClick':(function (){
return (set_count.cljs$core$IFn$_invoke$arity$1 ? set_count.cljs$core$IFn$_invoke$arity$1(cljs.core.inc) : set_count.call(null,cljs.core.inc));
})}],["Increment"]),uix.compiler.aot._GT_el("span",uix.compiler.attributes.interpret_attrs(["Count: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(count)].join(''),["span",null,null,false],false),[]),uix.compiler.aot._GT_el("button",[{'className':"px-3 py-1 border rounded",'onClick':(function (){
var G__39488 = cljs.core.constantly((0));
return (set_count.cljs$core$IFn$_invoke$arity$1 ? set_count.cljs$core$IFn$_invoke$arity$1(G__39488) : set_count.call(null,G__39488));
})}],["Reset"])]),uix.compiler.aot._GT_el("div",[{'className':"grid md:grid-cols-2 lg:grid-cols-3 gap-3"}],[cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (u){
return uix.compiler.alpha.component_element(bumblebee.ui.pages.home.user_card,[new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"key","key",-1516042587),new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(u),new cljs.core.Keyword(null,"id","id",-1388402092),new cljs.core.Keyword(null,"id","id",-1388402092).cljs$core$IFn$_invoke$arity$1(u),new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(u)], null)],[]);
}),users)])]);
});
if(goog.DEBUG){
var _STAR_current_component_STAR__orig_val__39489 = uix.core._STAR_current_component_STAR_;
var _STAR_current_component_STAR__temp_val__39490 = bumblebee.ui.pages.home.page;
(uix.core._STAR_current_component_STAR_ = _STAR_current_component_STAR__temp_val__39490);

try{return f__36195__auto__();
}finally {(uix.core._STAR_current_component_STAR_ = _STAR_current_component_STAR__orig_val__39489);
}} else {
return f__36195__auto__();
}
});

(bumblebee.ui.pages.home.page.uix_component_QMARK_ = true);

uix.core.set_display_name(bumblebee.ui.pages.home.page,"bumblebee.ui.pages.home/page");

if(goog.DEBUG){
if((typeof window !== 'undefined') && (typeof window.uix !== 'undefined') && (typeof window.uix.dev !== 'undefined')){
var sig__36128__auto___39496 = window.uix.dev.signature_BANG_();
(sig__36128__auto___39496.cljs$core$IFn$_invoke$arity$4 ? sig__36128__auto___39496.cljs$core$IFn$_invoke$arity$4(bumblebee.ui.pages.home.page,"(use-state [])(use-state 0)(use-effect (fn [] (.. axios (get \"https://jsonplaceholder.typicode.com/users\") (then (fn [resp] (let [users (:data (js->clj resp :keywordize-keys true))] (set-users (filterv (fn* [p1] (s/valid-user? p1)) users))))))) [])",null,null) : sig__36128__auto___39496.call(null,bumblebee.ui.pages.home.page,"(use-state [])(use-state 0)(use-effect (fn [] (.. axios (get \"https://jsonplaceholder.typicode.com/users\") (then (fn [resp] (let [users (:data (js->clj resp :keywordize-keys true))] (set-users (filterv (fn* [p1] (s/valid-user? p1)) users))))))) [])",null,null));

window.uix.dev.register_BANG_(bumblebee.ui.pages.home.page,bumblebee.ui.pages.home.page.displayName);

(bumblebee.ui.pages.home.page.fast_refresh_signature = sig__36128__auto___39496);
} else {
}
} else {
}


//# sourceMappingURL=bumblebee.ui.pages.home.js.map
