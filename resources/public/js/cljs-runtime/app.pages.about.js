goog.provide('app.pages.about');
app.pages.about.page = (function app$pages$about$page(){
var f__43724__auto__ = (function (){
if(goog.DEBUG){
var temp__5825__auto___44117 = app.pages.about.page.fast_refresh_signature;
if(cljs.core.truth_(temp__5825__auto___44117)){
var f__43648__auto___44118 = temp__5825__auto___44117;
(f__43648__auto___44118.cljs$core$IFn$_invoke$arity$0 ? f__43648__auto___44118.cljs$core$IFn$_invoke$arity$0() : f__43648__auto___44118.call(null));
} else {
}
} else {
}

return uix.compiler.aot._GT_el("div",[{'className':"space-y-3"}],[uix.compiler.aot._GT_el("h1",[{'className':"text-2xl font-bold"}],["About (Lazy chunk)"]),uix.compiler.aot._GT_el("p",uix.compiler.attributes.interpret_attrs("This page was lazy-loaded via shadow.lazy when you navigated here.",["p",null,null,false],false),[])]);
});
if(goog.DEBUG){
var _STAR_current_component_STAR__orig_val__44113 = uix.core._STAR_current_component_STAR_;
var _STAR_current_component_STAR__temp_val__44114 = app.pages.about.page;
(uix.core._STAR_current_component_STAR_ = _STAR_current_component_STAR__temp_val__44114);

try{return f__43724__auto__();
}finally {(uix.core._STAR_current_component_STAR_ = _STAR_current_component_STAR__orig_val__44113);
}} else {
return f__43724__auto__();
}
});

(app.pages.about.page.uix_component_QMARK_ = true);

uix.core.set_display_name(app.pages.about.page,"app.pages.about/page");

if(goog.DEBUG){
if((typeof window !== 'undefined') && (typeof window.uix !== 'undefined') && (typeof window.uix.dev !== 'undefined')){
var sig__43657__auto___44121 = window.uix.dev.signature_BANG_();
(sig__43657__auto___44121.cljs$core$IFn$_invoke$arity$4 ? sig__43657__auto___44121.cljs$core$IFn$_invoke$arity$4(app.pages.about.page,"",null,null) : sig__43657__auto___44121.call(null,app.pages.about.page,"",null,null));

window.uix.dev.register_BANG_(app.pages.about.page,app.pages.about.page.displayName);

(app.pages.about.page.fast_refresh_signature = sig__43657__auto___44121);
} else {
}
} else {
}


//# sourceMappingURL=app.pages.about.js.map
