goog.provide('app.pages.home');
var module$node_modules$axios$dist$browser$axios_cjs=shadow.js.require("module$node_modules$axios$dist$browser$axios_cjs", {});
app.pages.home.user_card = (function app$pages$home$user_card(props__43733__auto__){
var props50935 = uix.core.glue_args(props__43733__auto__);
var vec__50936 = [props50935];
var map__50939 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__50936,(0),null);
var map__50939__$1 = cljs.core.__destructure_map(map__50939);
var id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__50939__$1,new cljs.core.Keyword(null,"id","id",-1388402092));
var name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__50939__$1,new cljs.core.Keyword(null,"name","name",1843675177));
var ___43732__auto__ = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$1(props50935);
var f__43734__auto__ = (function (){

if(goog.DEBUG){
var temp__5825__auto___51090 = app.pages.home.user_card.fast_refresh_signature;
if(cljs.core.truth_(temp__5825__auto___51090)){
var f__43648__auto___51091 = temp__5825__auto___51090;
(f__43648__auto___51091.cljs$core$IFn$_invoke$arity$0 ? f__43648__auto___51091.cljs$core$IFn$_invoke$arity$0() : f__43648__auto___51091.call(null));
} else {
}
} else {
}

return uix.compiler.aot._GT_el("div",[{'className':"rounded border p-3"}],[uix.compiler.aot._GT_el("div",[{'className':"text-sm text-slate-500"}],[["ID: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(id)].join('')]),uix.compiler.aot._GT_el("div",[{'className':"font-semibold"}],[name])]);
});
if(goog.DEBUG){
var _STAR_current_component_STAR__orig_val__50941 = uix.core._STAR_current_component_STAR_;
var _STAR_current_component_STAR__temp_val__50942 = app.pages.home.user_card;
(uix.core._STAR_current_component_STAR_ = _STAR_current_component_STAR__temp_val__50942);

try{if(((cljs.core.map_QMARK_(props50935)) || ((props50935 == null)))){
} else {
throw (new Error(["Assert failed: ",["UIx component expects a map of props, but instead got ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(props50935)].join(''),"\n","(clojure.core/or (clojure.core/map? props50935) (clojure.core/nil? props50935))"].join('')));
}

return f__43734__auto__();
}finally {(uix.core._STAR_current_component_STAR_ = _STAR_current_component_STAR__orig_val__50941);
}} else {
return f__43734__auto__();
}
});

(app.pages.home.user_card.uix_component_QMARK_ = true);

uix.core.set_display_name(app.pages.home.user_card,"app.pages.home/user-card");

if(goog.DEBUG){
if((typeof window !== 'undefined') && (typeof window.uix !== 'undefined') && (typeof window.uix.dev !== 'undefined')){
var sig__43657__auto___51094 = window.uix.dev.signature_BANG_();
(sig__43657__auto___51094.cljs$core$IFn$_invoke$arity$4 ? sig__43657__auto___51094.cljs$core$IFn$_invoke$arity$4(app.pages.home.user_card,"",null,null) : sig__43657__auto___51094.call(null,app.pages.home.user_card,"",null,null));

window.uix.dev.register_BANG_(app.pages.home.user_card,app.pages.home.user_card.displayName);

(app.pages.home.user_card.fast_refresh_signature = sig__43657__auto___51094);
} else {
}
} else {
}

app.pages.home.page = (function app$pages$home$page(){
var f__43724__auto__ = (function (){
if(goog.DEBUG){
var temp__5825__auto___51095 = app.pages.home.page.fast_refresh_signature;
if(cljs.core.truth_(temp__5825__auto___51095)){
var f__43648__auto___51096 = temp__5825__auto___51095;
(f__43648__auto___51096.cljs$core$IFn$_invoke$arity$0 ? f__43648__auto___51096.cljs$core$IFn$_invoke$arity$0() : f__43648__auto___51096.call(null));
} else {
}
} else {
}

var vec__51068 = uix.core.use_state([]);
var users = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__51068,(0),null);
var set_users = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__51068,(1),null);
var vec__51071 = uix.core.use_state((0));
var count = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__51071,(0),null);
var set_count = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__51071,(1),null);
uix.hooks.alpha.use_effect.cljs$core$IFn$_invoke$arity$2((function (){
module$node_modules$axios$dist$browser$axios_cjs.get("https://jsonplaceholder.typicode.com/users").then((function (resp){
var arr = resp.data;
var G__51080 = Array.from(arr.filter((function (u){
return app.schemas.valid_user_QMARK_(cljs.core.js__GT_clj.cljs$core$IFn$_invoke$arity$variadic(u,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"keywordize-keys","keywordize-keys",1310784252),true], 0)));
})));
return (set_users.cljs$core$IFn$_invoke$arity$1 ? set_users.cljs$core$IFn$_invoke$arity$1(G__51080) : set_users.call(null,G__51080));
}));

return undefined;
}),[uix.hooks.alpha.use_clj_deps(cljs.core.PersistentVector.EMPTY)]);

return uix.compiler.aot._GT_el("div",[{'className':"space-y-4"}],[uix.compiler.aot._GT_el("h1",[{'className':"text-2xl font-bold"}],["Home"]),uix.compiler.aot._GT_el("p",uix.compiler.attributes.interpret_attrs("JWT mock demo. Login, then watch token badge in the navbar auto-refresh.",["p",null,null,false],false),[]),uix.compiler.aot._GT_el("div",[{'className':"flex items-center gap-2"}],[uix.compiler.aot._GT_el("button",[{'className':"px-3 py-1 border rounded",'onClick':(function (){
return (set_count.cljs$core$IFn$_invoke$arity$1 ? set_count.cljs$core$IFn$_invoke$arity$1(cljs.core.inc) : set_count.call(null,cljs.core.inc));
})}],["Increment"]),uix.compiler.aot._GT_el("span",uix.compiler.attributes.interpret_attrs(["Count: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(count)].join(''),["span",null,null,false],false),[]),uix.compiler.aot._GT_el("button",[{'className':"px-3 py-1 border rounded",'onClick':(function (){
var G__51082 = cljs.core.constantly((0));
return (set_count.cljs$core$IFn$_invoke$arity$1 ? set_count.cljs$core$IFn$_invoke$arity$1(G__51082) : set_count.call(null,G__51082));
})}],["Reset"])]),uix.compiler.aot._GT_el("div",[{'className':"grid md:grid-cols-2 lg:grid-cols-3 gap-3"}],[cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (u){
return uix.compiler.alpha.component_element(app.pages.home.user_card,[new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"key","key",-1516042587),u.id,new cljs.core.Keyword(null,"id","id",-1388402092),u.id,new cljs.core.Keyword(null,"name","name",1843675177),u.name], null)],[]);
}),cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(users))])]);
});
if(goog.DEBUG){
var _STAR_current_component_STAR__orig_val__51083 = uix.core._STAR_current_component_STAR_;
var _STAR_current_component_STAR__temp_val__51084 = app.pages.home.page;
(uix.core._STAR_current_component_STAR_ = _STAR_current_component_STAR__temp_val__51084);

try{return f__43724__auto__();
}finally {(uix.core._STAR_current_component_STAR_ = _STAR_current_component_STAR__orig_val__51083);
}} else {
return f__43724__auto__();
}
});

(app.pages.home.page.uix_component_QMARK_ = true);

uix.core.set_display_name(app.pages.home.page,"app.pages.home/page");

if(goog.DEBUG){
if((typeof window !== 'undefined') && (typeof window.uix !== 'undefined') && (typeof window.uix.dev !== 'undefined')){
var sig__43657__auto___51102 = window.uix.dev.signature_BANG_();
(sig__43657__auto___51102.cljs$core$IFn$_invoke$arity$4 ? sig__43657__auto___51102.cljs$core$IFn$_invoke$arity$4(app.pages.home.page,"(use-state [])(use-state 0)(use-effect (fn [] (.then (.get axios \"https://jsonplaceholder.typicode.com/users\") (fn [resp] (let [arr (.-data resp)] (set-users (js/Array.from (.filter arr (fn [u] (s/valid-user? (js->clj u :keywordize-keys true))))))))) js/undefined) [])",null,null) : sig__43657__auto___51102.call(null,app.pages.home.page,"(use-state [])(use-state 0)(use-effect (fn [] (.then (.get axios \"https://jsonplaceholder.typicode.com/users\") (fn [resp] (let [arr (.-data resp)] (set-users (js/Array.from (.filter arr (fn [u] (s/valid-user? (js->clj u :keywordize-keys true))))))))) js/undefined) [])",null,null));

window.uix.dev.register_BANG_(app.pages.home.page,app.pages.home.page.displayName);

(app.pages.home.page.fast_refresh_signature = sig__43657__auto___51102);
} else {
}
} else {
}


//# sourceMappingURL=app.pages.home.js.map
