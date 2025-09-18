goog.provide('bumblebee.ui.core');
var module$node_modules$react$index=shadow.js.require("module$node_modules$react$index", {});
bumblebee.ui.core.route__GT_component = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"home","home",-74557309),bumblebee.ui.chunks.Home,new cljs.core.Keyword(null,"about","about",1423892543),bumblebee.ui.chunks.About,new cljs.core.Keyword(null,"admin","admin",-1239101627),bumblebee.ui.chunks.Admin,new cljs.core.Keyword(null,"login","login",55217519),bumblebee.ui.chunks.Login], null);
bumblebee.ui.core.app_root = (function bumblebee$ui$core$app_root(){
var f__32256__auto__ = (function (){
if(goog.DEBUG){
var temp__5825__auto___38428 = bumblebee.ui.core.app_root.fast_refresh_signature;
if(cljs.core.truth_(temp__5825__auto___38428)){
var f__32180__auto___38429 = temp__5825__auto___38428;
(f__32180__auto___38429.cljs$core$IFn$_invoke$arity$0 ? f__32180__auto___38429.cljs$core$IFn$_invoke$arity$0() : f__32180__auto___38429.call(null));
} else {
}
} else {
}

var vec__38417 = uix.core.use_state(cljs.core.deref(bumblebee.ui.router.current));
var route = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38417,(0),null);
var set_route = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38417,(1),null);
var vec__38420 = uix.core.use_state(bumblebee.ui.auth.authed_QMARK_());
var authed = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38420,(0),null);
var set_authed = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__38420,(1),null);
uix.hooks.alpha.use_effect.cljs$core$IFn$_invoke$arity$2((function (){
bumblebee.ui.auth.load_BANG_();

bumblebee.ui.router.start_BANG_();

var _ = cljs.core.add_watch(bumblebee.ui.router.current,new cljs.core.Keyword("bumblebee.ui.core","root","bumblebee.ui.core/root",985565639),(function (_,___$1,___$2,v){
return (set_route.cljs$core$IFn$_invoke$arity$1 ? set_route.cljs$core$IFn$_invoke$arity$1(v) : set_route.call(null,v));
}));
var ___$1 = cljs.core.add_watch(bumblebee.ui.auth.state,new cljs.core.Keyword("bumblebee.ui.core","auth","bumblebee.ui.core/auth",709341210),(function (___$1,___$2,___$3,___$4){
var G__38424 = bumblebee.ui.auth.authed_QMARK_();
return (set_authed.cljs$core$IFn$_invoke$arity$1 ? set_authed.cljs$core$IFn$_invoke$arity$1(G__38424) : set_authed.call(null,G__38424));
}));
return (function (){
cljs.core.remove_watch(bumblebee.ui.router.current,new cljs.core.Keyword("bumblebee.ui.core","root","bumblebee.ui.core/root",985565639));

cljs.core.remove_watch(bumblebee.ui.auth.state,new cljs.core.Keyword("bumblebee.ui.core","auth","bumblebee.ui.core/auth",709341210));

return bumblebee.ui.router.stop_BANG_();
});
}),[uix.hooks.alpha.use_clj_deps(cljs.core.PersistentVector.EMPTY)]);

var name = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(route,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"data","data",-232669377),new cljs.core.Keyword(null,"name","name",1843675177)], null));
var requires_auth_QMARK_ = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(route,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"data","data",-232669377),new cljs.core.Keyword(null,"requires-auth","requires-auth",1675442809)], null)) === true;
var unauthorized_QMARK_ = ((requires_auth_QMARK_) && (cljs.core.not(authed)));
var Page = cljs.core.get.cljs$core$IFn$_invoke$arity$3(bumblebee.ui.core.route__GT_component,name,bumblebee.ui.chunks.Home);
uix.hooks.alpha.use_effect.cljs$core$IFn$_invoke$arity$2((function (){
if(unauthorized_QMARK_){
bumblebee.ui.auth.set_redirect_BANG_(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"name","name",1843675177),name,new cljs.core.Keyword(null,"params","params",710516235),new cljs.core.Keyword(null,"path-params","path-params",-48130597).cljs$core$IFn$_invoke$arity$1(route),new cljs.core.Keyword(null,"query","query",-1288509510),new cljs.core.Keyword(null,"query-params","query-params",900640534).cljs$core$IFn$_invoke$arity$1(route)], null));

bumblebee.ui.router.navigate_BANG_(new cljs.core.Keyword(null,"login","login",55217519));
} else {
}

return undefined;
}),[uix.hooks.alpha.use_clj_deps(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [route,unauthorized_QMARK_,name], null))]);

return uix.compiler.aot._GT_el(uix.compiler.aot.fragment,uix.compiler.attributes.interpret_attrs(uix.compiler.alpha.component_element(bumblebee.ui.components.navbar.navbar,[null],[]),[],false),[uix.compiler.aot._GT_el("main",[{'className':"container py-6"}],[uix.compiler.alpha.component_element(Page,[null],[])])]);
});
if(goog.DEBUG){
var _STAR_current_component_STAR__orig_val__38425 = uix.core._STAR_current_component_STAR_;
var _STAR_current_component_STAR__temp_val__38426 = bumblebee.ui.core.app_root;
(uix.core._STAR_current_component_STAR_ = _STAR_current_component_STAR__temp_val__38426);

try{return f__32256__auto__();
}finally {(uix.core._STAR_current_component_STAR_ = _STAR_current_component_STAR__orig_val__38425);
}} else {
return f__32256__auto__();
}
});

(bumblebee.ui.core.app_root.uix_component_QMARK_ = true);

uix.core.set_display_name(bumblebee.ui.core.app_root,"bumblebee.ui.core/app-root");

if(goog.DEBUG){
if((typeof window !== 'undefined') && (typeof window.uix !== 'undefined') && (typeof window.uix.dev !== 'undefined')){
var sig__32189__auto___38430 = window.uix.dev.signature_BANG_();
(sig__32189__auto___38430.cljs$core$IFn$_invoke$arity$4 ? sig__32189__auto___38430.cljs$core$IFn$_invoke$arity$4(bumblebee.ui.core.app_root,"(uix.core/use-state (clojure.core/deref router/current))(uix.core/use-state (auth/authed?))(uix.core/use-effect (fn [] (auth/load!) (router/start!) (let [_ (add-watch router/current :bumblebee.ui.core/root (fn [_ _ _ v] (set-route v))) _ (add-watch auth/state :bumblebee.ui.core/auth (fn [_ _ _ _] (set-authed (auth/authed?))))] (fn [] (remove-watch router/current :bumblebee.ui.core/root) (remove-watch auth/state :bumblebee.ui.core/auth) (router/stop!)))) [])(uix.core/use-effect (fn [] (when unauthorized? (auth/set-redirect! {:name name, :params (:path-params route), :query (:query-params route)}) (router/navigate! :login)) js/undefined) [route unauthorized? name])",null,null) : sig__32189__auto___38430.call(null,bumblebee.ui.core.app_root,"(uix.core/use-state (clojure.core/deref router/current))(uix.core/use-state (auth/authed?))(uix.core/use-effect (fn [] (auth/load!) (router/start!) (let [_ (add-watch router/current :bumblebee.ui.core/root (fn [_ _ _ v] (set-route v))) _ (add-watch auth/state :bumblebee.ui.core/auth (fn [_ _ _ _] (set-authed (auth/authed?))))] (fn [] (remove-watch router/current :bumblebee.ui.core/root) (remove-watch auth/state :bumblebee.ui.core/auth) (router/stop!)))) [])(uix.core/use-effect (fn [] (when unauthorized? (auth/set-redirect! {:name name, :params (:path-params route), :query (:query-params route)}) (router/navigate! :login)) js/undefined) [route unauthorized? name])",null,null));

window.uix.dev.register_BANG_(bumblebee.ui.core.app_root,bumblebee.ui.core.app_root.displayName);

(bumblebee.ui.core.app_root.fast_refresh_signature = sig__32189__auto___38430);
} else {
}
} else {
}

if((typeof bumblebee !== 'undefined') && (typeof bumblebee.ui !== 'undefined') && (typeof bumblebee.ui.core !== 'undefined') && (typeof bumblebee.ui.core.root_STAR_ !== 'undefined')){
} else {
bumblebee.ui.core.root_STAR_ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null);
}
bumblebee.ui.core.ensure_root_BANG_ = (function bumblebee$ui$core$ensure_root_BANG_(){
if((cljs.core.deref(bumblebee.ui.core.root_STAR_) == null)){
var temp__5825__auto___38431 = document.getElementById("app");
if(cljs.core.truth_(temp__5825__auto___38431)){
var el_38432 = temp__5825__auto___38431;
console.log("[ui] creating root @ #app");

cljs.core.reset_BANG_(bumblebee.ui.core.root_STAR_,uix.dom.create_root.cljs$core$IFn$_invoke$arity$1(el_38432));
} else {
}
} else {
}

return cljs.core.deref(bumblebee.ui.core.root_STAR_);
});
bumblebee.ui.core.mount_BANG_ = (function bumblebee$ui$core$mount_BANG_(){
var temp__5825__auto__ = bumblebee.ui.core.ensure_root_BANG_();
if(cljs.core.truth_(temp__5825__auto__)){
var root = temp__5825__auto__;
console.log("[ui] mount! rendering");

return uix.dom.render_root(uix.compiler.alpha.component_element(uix.core.strict_mode,[cljs.core.PersistentArrayMap.EMPTY],[uix.compiler.alpha.component_element(bumblebee.ui.core.app_root,[null],[])]),root);
} else {
return null;
}
});
bumblebee.ui.core.render = (function bumblebee$ui$core$render(){
return bumblebee.ui.core.mount_BANG_();
});
bumblebee.ui.core.init = (function bumblebee$ui$core$init(){
console.log("[ui] init called");

bumblebee.ui.router.start_BANG_();

return bumblebee.ui.core.render();
});
goog.exportSymbol('bumblebee.ui.core.init', bumblebee.ui.core.init);
try{bumblebee.ui.core.init();
}catch (e38427){var __38433 = e38427;
}
//# sourceMappingURL=bumblebee.ui.core.js.map
