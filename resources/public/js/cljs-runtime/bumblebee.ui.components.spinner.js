goog.provide('bumblebee.ui.components.spinner');
bumblebee.ui.components.spinner.spinner = (function bumblebee$ui$components$spinner$spinner(props__32265__auto__){
var props37257 = uix.core.glue_args(props__32265__auto__);
var vec__37266 = [props37257];
var map__37269 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37266,(0),null);
var map__37269__$1 = cljs.core.__destructure_map(map__37269);
var label = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37269__$1,new cljs.core.Keyword(null,"label","label",1718410804));
var ___32264__auto__ = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$1(props37257);
var f__32266__auto__ = (function (){

if(goog.DEBUG){
var temp__5825__auto___37324 = bumblebee.ui.components.spinner.spinner.fast_refresh_signature;
if(cljs.core.truth_(temp__5825__auto___37324)){
var f__32180__auto___37325 = temp__5825__auto___37324;
(f__32180__auto___37325.cljs$core$IFn$_invoke$arity$0 ? f__32180__auto___37325.cljs$core$IFn$_invoke$arity$0() : f__32180__auto___37325.call(null));
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
var _STAR_current_component_STAR__orig_val__37277 = uix.core._STAR_current_component_STAR_;
var _STAR_current_component_STAR__temp_val__37278 = bumblebee.ui.components.spinner.spinner;
(uix.core._STAR_current_component_STAR_ = _STAR_current_component_STAR__temp_val__37278);

try{if(((cljs.core.map_QMARK_(props37257)) || ((props37257 == null)))){
} else {
throw (new Error(["Assert failed: ",["UIx component expects a map of props, but instead got ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(props37257)].join(''),"\n","(clojure.core/or (clojure.core/map? props37257) (clojure.core/nil? props37257))"].join('')));
}

return f__32266__auto__();
}finally {(uix.core._STAR_current_component_STAR_ = _STAR_current_component_STAR__orig_val__37277);
}} else {
return f__32266__auto__();
}
});

(bumblebee.ui.components.spinner.spinner.uix_component_QMARK_ = true);

uix.core.set_display_name(bumblebee.ui.components.spinner.spinner,"bumblebee.ui.components.spinner/spinner");

if(goog.DEBUG){
if((typeof window !== 'undefined') && (typeof window.uix !== 'undefined') && (typeof window.uix.dev !== 'undefined')){
var sig__32189__auto___37338 = window.uix.dev.signature_BANG_();
(sig__32189__auto___37338.cljs$core$IFn$_invoke$arity$4 ? sig__32189__auto___37338.cljs$core$IFn$_invoke$arity$4(bumblebee.ui.components.spinner.spinner,"",null,null) : sig__32189__auto___37338.call(null,bumblebee.ui.components.spinner.spinner,"",null,null));

window.uix.dev.register_BANG_(bumblebee.ui.components.spinner.spinner,bumblebee.ui.components.spinner.spinner.displayName);

(bumblebee.ui.components.spinner.spinner.fast_refresh_signature = sig__32189__auto___37338);
} else {
}
} else {
}


//# sourceMappingURL=bumblebee.ui.components.spinner.js.map
