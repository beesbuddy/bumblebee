goog.provide('app.components.spinner');
app.components.spinner.spinner = (function app$components$spinner$spinner(props__43733__auto__){
var props50269 = uix.core.glue_args(props__43733__auto__);
var vec__50270 = [props50269];
var map__50273 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__50270,(0),null);
var map__50273__$1 = cljs.core.__destructure_map(map__50273);
var label = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__50273__$1,new cljs.core.Keyword(null,"label","label",1718410804));
var ___43732__auto__ = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$1(props50269);
var f__43734__auto__ = (function (){

if(goog.DEBUG){
var temp__5825__auto___50286 = app.components.spinner.spinner.fast_refresh_signature;
if(cljs.core.truth_(temp__5825__auto___50286)){
var f__43648__auto___50287 = temp__5825__auto___50286;
(f__43648__auto___50287.cljs$core$IFn$_invoke$arity$0 ? f__43648__auto___50287.cljs$core$IFn$_invoke$arity$0() : f__43648__auto___50287.call(null));
} else {
}
} else {
}

return uix.compiler.aot._GT_el("div",[{'className':"flex items-center gap-3 text-slate-600"}],[uix.compiler.aot._GT_el("div",[{'className':"h-5 w-5 rounded-full border-2 border-slate-300 border-t-transparent animate-spin"}],[]),uix.compiler.aot._GT_el("span",uix.compiler.attributes.interpret_attrs((function (){var or__5025__auto__ = label;
if(cljs.core.truth_(or__5025__auto__)){
return or__5025__auto__;
} else {
return "Loading\u2026";
}
})(),["span",null,null,false],false),[])]);
});
if(goog.DEBUG){
var _STAR_current_component_STAR__orig_val__50279 = uix.core._STAR_current_component_STAR_;
var _STAR_current_component_STAR__temp_val__50280 = app.components.spinner.spinner;
(uix.core._STAR_current_component_STAR_ = _STAR_current_component_STAR__temp_val__50280);

try{if(((cljs.core.map_QMARK_(props50269)) || ((props50269 == null)))){
} else {
throw (new Error(["Assert failed: ",["UIx component expects a map of props, but instead got ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(props50269)].join(''),"\n","(clojure.core/or (clojure.core/map? props50269) (clojure.core/nil? props50269))"].join('')));
}

return f__43734__auto__();
}finally {(uix.core._STAR_current_component_STAR_ = _STAR_current_component_STAR__orig_val__50279);
}} else {
return f__43734__auto__();
}
});

(app.components.spinner.spinner.uix_component_QMARK_ = true);

uix.core.set_display_name(app.components.spinner.spinner,"app.components.spinner/spinner");

if(goog.DEBUG){
if((typeof window !== 'undefined') && (typeof window.uix !== 'undefined') && (typeof window.uix.dev !== 'undefined')){
var sig__43657__auto___50288 = window.uix.dev.signature_BANG_();
(sig__43657__auto___50288.cljs$core$IFn$_invoke$arity$4 ? sig__43657__auto___50288.cljs$core$IFn$_invoke$arity$4(app.components.spinner.spinner,"",null,null) : sig__43657__auto___50288.call(null,app.components.spinner.spinner,"",null,null));

window.uix.dev.register_BANG_(app.components.spinner.spinner,app.components.spinner.spinner.displayName);

(app.components.spinner.spinner.fast_refresh_signature = sig__43657__auto___50288);
} else {
}
} else {
}


//# sourceMappingURL=app.components.spinner.js.map
