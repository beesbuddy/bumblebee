goog.provide('app.pages.admin');
app.pages.admin.page = (function app$pages$admin$page(){
var f__43724__auto__ = (function (){
if(goog.DEBUG){
var temp__5825__auto___44550 = app.pages.admin.page.fast_refresh_signature;
if(cljs.core.truth_(temp__5825__auto___44550)){
var f__43648__auto___44558 = temp__5825__auto___44550;
(f__43648__auto___44558.cljs$core$IFn$_invoke$arity$0 ? f__43648__auto___44558.cljs$core$IFn$_invoke$arity$0() : f__43648__auto___44558.call(null));
} else {
}
} else {
}

var vec__44435 = uix.core.use_state(true);
var ok_QMARK_ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__44435,(0),null);
var set_ok = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__44435,(1),null);
var vec__44438 = uix.core.use_state(null);
var data = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__44438,(0),null);
var set_data = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__44438,(1),null);
uix.hooks.alpha.use_effect.cljs$core$IFn$_invoke$arity$2((function (){
app.api.get_json("https://httpbin.org/anything").then(set_data).catch((function (_){
var G__44476 = ({"note": "offline or blocked"});
return (set_data.cljs$core$IFn$_invoke$arity$1 ? set_data.cljs$core$IFn$_invoke$arity$1(G__44476) : set_data.call(null,G__44476));
}));

return undefined;
}),[uix.hooks.alpha.use_clj_deps(cljs.core.PersistentVector.EMPTY)]);

return uix.compiler.aot._GT_el("div",[{'className':"space-y-4"}],[uix.compiler.aot._GT_el("h1",[{'className':"text-2xl font-bold"}],["Admin (Guarded)"]),uix.compiler.aot._GT_el("p",uix.compiler.attributes.interpret_attrs("Axios instance attaches Authorization header using the mock access token.",["p",null,null,false],false),[]),(cljs.core.truth_(data)?uix.compiler.aot._GT_el("pre",[{'className':"bg-slate-50 p-3 rounded border overflow-auto text-xs"}],[JSON.stringify(data,null,(2))]):null),uix.compiler.aot._GT_el("button",[{'className':"px-3 py-1 border rounded",'onClick':(function (){
return (set_ok.cljs$core$IFn$_invoke$arity$1 ? set_ok.cljs$core$IFn$_invoke$arity$1(cljs.core.not) : set_ok.call(null,cljs.core.not));
})}],[(cljs.core.truth_(ok_QMARK_)?"Disable feature":"Enable feature")]),(cljs.core.truth_(ok_QMARK_)?uix.compiler.aot._GT_el("div",[{'className':"p-3 rounded border bg-green-50"}],["Feature enabled."]):uix.compiler.aot._GT_el("div",[{'className':"p-3 rounded border bg-yellow-50"}],["Feature disabled."]))]);
});
if(goog.DEBUG){
var _STAR_current_component_STAR__orig_val__44522 = uix.core._STAR_current_component_STAR_;
var _STAR_current_component_STAR__temp_val__44523 = app.pages.admin.page;
(uix.core._STAR_current_component_STAR_ = _STAR_current_component_STAR__temp_val__44523);

try{return f__43724__auto__();
}finally {(uix.core._STAR_current_component_STAR_ = _STAR_current_component_STAR__orig_val__44522);
}} else {
return f__43724__auto__();
}
});

(app.pages.admin.page.uix_component_QMARK_ = true);

uix.core.set_display_name(app.pages.admin.page,"app.pages.admin/page");

if(goog.DEBUG){
if((typeof window !== 'undefined') && (typeof window.uix !== 'undefined') && (typeof window.uix.dev !== 'undefined')){
var sig__43657__auto___44565 = window.uix.dev.signature_BANG_();
(sig__43657__auto___44565.cljs$core$IFn$_invoke$arity$4 ? sig__43657__auto___44565.cljs$core$IFn$_invoke$arity$4(app.pages.admin.page,"(use-state true)(use-state nil)(uix.core/use-effect (fn [] (-> (api/get-json \"https://httpbin.org/anything\") (.then set-data) (.catch (fn [_] (set-data {:note \"offline or blocked\"})))) js/undefined) [])",null,null) : sig__43657__auto___44565.call(null,app.pages.admin.page,"(use-state true)(use-state nil)(uix.core/use-effect (fn [] (-> (api/get-json \"https://httpbin.org/anything\") (.then set-data) (.catch (fn [_] (set-data {:note \"offline or blocked\"})))) js/undefined) [])",null,null));

window.uix.dev.register_BANG_(app.pages.admin.page,app.pages.admin.page.displayName);

(app.pages.admin.page.fast_refresh_signature = sig__43657__auto___44565);
} else {
}
} else {
}


//# sourceMappingURL=app.pages.admin.js.map
