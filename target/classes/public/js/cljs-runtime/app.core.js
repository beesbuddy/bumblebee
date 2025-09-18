goog.provide('app.core');
var module$node_modules$react$index=shadow.js.require("module$node_modules$react$index", {});
app.core.route__GT_component = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"home","home",-74557309),app.chunks.Home,new cljs.core.Keyword(null,"about","about",1423892543),app.chunks.About,new cljs.core.Keyword(null,"admin","admin",-1239101627),app.chunks.Admin,new cljs.core.Keyword(null,"login","login",55217519),app.chunks.Login], null);
app.core.app_root = (function app$core$app_root(){
var f__43724__auto__ = (function (){
if(goog.DEBUG){
var temp__5825__auto___52763 = app.core.app_root.fast_refresh_signature;
if(cljs.core.truth_(temp__5825__auto___52763)){
var f__43648__auto___52764 = temp__5825__auto___52763;
(f__43648__auto___52764.cljs$core$IFn$_invoke$arity$0 ? f__43648__auto___52764.cljs$core$IFn$_invoke$arity$0() : f__43648__auto___52764.call(null));
} else {
}
} else {
}

var vec__52752 = uix.core.use_state(cljs.core.deref(app.router.current));
var route = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__52752,(0),null);
var set_route = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__52752,(1),null);
var vec__52755 = uix.core.use_state(app.auth.authed_QMARK_());
var authed = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__52755,(0),null);
var set_authed = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__52755,(1),null);
uix.hooks.alpha.use_effect.cljs$core$IFn$_invoke$arity$2((function (){
app.auth.load_BANG_();

app.router.start_BANG_();

var _ = cljs.core.add_watch(app.router.current,new cljs.core.Keyword("app.core","root","app.core/root",-1637851257),(function (_,___$1,___$2,v){
return (set_route.cljs$core$IFn$_invoke$arity$1 ? set_route.cljs$core$IFn$_invoke$arity$1(v) : set_route.call(null,v));
}));
var ___$1 = cljs.core.add_watch(app.auth.state,new cljs.core.Keyword("app.core","auth","app.core/auth",-1477009702),(function (___$1,___$2,___$3,___$4){
var G__52759 = app.auth.authed_QMARK_();
return (set_authed.cljs$core$IFn$_invoke$arity$1 ? set_authed.cljs$core$IFn$_invoke$arity$1(G__52759) : set_authed.call(null,G__52759));
}));
return (function (){
cljs.core.remove_watch(app.router.current,new cljs.core.Keyword("app.core","root","app.core/root",-1637851257));

cljs.core.remove_watch(app.auth.state,new cljs.core.Keyword("app.core","auth","app.core/auth",-1477009702));

return app.router.stop_BANG_();
});
}),[uix.hooks.alpha.use_clj_deps(cljs.core.PersistentVector.EMPTY)]);

var name = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(route,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"data","data",-232669377),new cljs.core.Keyword(null,"name","name",1843675177)], null));
var requires_auth_QMARK_ = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(route,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"data","data",-232669377),new cljs.core.Keyword(null,"requires-auth","requires-auth",1675442809)], null)) === true;
var unauthorized_QMARK_ = ((requires_auth_QMARK_) && (cljs.core.not(authed)));
var Page = cljs.core.get.cljs$core$IFn$_invoke$arity$3(app.core.route__GT_component,name,app.chunks.Home);
uix.hooks.alpha.use_effect.cljs$core$IFn$_invoke$arity$2((function (){
if(unauthorized_QMARK_){
app.auth.set_redirect_BANG_(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"name","name",1843675177),name,new cljs.core.Keyword(null,"params","params",710516235),new cljs.core.Keyword(null,"path-params","path-params",-48130597).cljs$core$IFn$_invoke$arity$1(route),new cljs.core.Keyword(null,"query","query",-1288509510),new cljs.core.Keyword(null,"query-params","query-params",900640534).cljs$core$IFn$_invoke$arity$1(route)], null));

app.router.navigate_BANG_(new cljs.core.Keyword(null,"login","login",55217519));
} else {
}

return undefined;
}),[uix.hooks.alpha.use_clj_deps(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [route,unauthorized_QMARK_,name], null))]);

return uix.compiler.aot._GT_el(uix.compiler.aot.fragment,uix.compiler.attributes.interpret_attrs(uix.compiler.alpha.component_element(app.components.navbar.navbar,[null],[]),[],false),[uix.compiler.aot._GT_el("main",[{'className':"container py-6"}],[uix.compiler.alpha.component_element(Page,[null],[])])]);
});
if(goog.DEBUG){
var _STAR_current_component_STAR__orig_val__52760 = uix.core._STAR_current_component_STAR_;
var _STAR_current_component_STAR__temp_val__52761 = app.core.app_root;
(uix.core._STAR_current_component_STAR_ = _STAR_current_component_STAR__temp_val__52761);

try{return f__43724__auto__();
}finally {(uix.core._STAR_current_component_STAR_ = _STAR_current_component_STAR__orig_val__52760);
}} else {
return f__43724__auto__();
}
});

(app.core.app_root.uix_component_QMARK_ = true);

uix.core.set_display_name(app.core.app_root,"app.core/app-root");

if(goog.DEBUG){
if((typeof window !== 'undefined') && (typeof window.uix !== 'undefined') && (typeof window.uix.dev !== 'undefined')){
var sig__43657__auto___52765 = window.uix.dev.signature_BANG_();
(sig__43657__auto___52765.cljs$core$IFn$_invoke$arity$4 ? sig__43657__auto___52765.cljs$core$IFn$_invoke$arity$4(app.core.app_root,"(uix.core/use-state (clojure.core/deref router/current))(uix.core/use-state (auth/authed?))(uix.core/use-effect (fn [] (auth/load!) (router/start!) (let [_ (add-watch router/current :app.core/root (fn [_ _ _ v] (set-route v))) _ (add-watch auth/state :app.core/auth (fn [_ _ _ _] (set-authed (auth/authed?))))] (fn [] (remove-watch router/current :app.core/root) (remove-watch auth/state :app.core/auth) (router/stop!)))) [])(uix.core/use-effect (fn [] (when unauthorized? (auth/set-redirect! {:name name, :params (:path-params route), :query (:query-params route)}) (router/navigate! :login)) js/undefined) [route unauthorized? name])",null,null) : sig__43657__auto___52765.call(null,app.core.app_root,"(uix.core/use-state (clojure.core/deref router/current))(uix.core/use-state (auth/authed?))(uix.core/use-effect (fn [] (auth/load!) (router/start!) (let [_ (add-watch router/current :app.core/root (fn [_ _ _ v] (set-route v))) _ (add-watch auth/state :app.core/auth (fn [_ _ _ _] (set-authed (auth/authed?))))] (fn [] (remove-watch router/current :app.core/root) (remove-watch auth/state :app.core/auth) (router/stop!)))) [])(uix.core/use-effect (fn [] (when unauthorized? (auth/set-redirect! {:name name, :params (:path-params route), :query (:query-params route)}) (router/navigate! :login)) js/undefined) [route unauthorized? name])",null,null));

window.uix.dev.register_BANG_(app.core.app_root,app.core.app_root.displayName);

(app.core.app_root.fast_refresh_signature = sig__43657__auto___52765);
} else {
}
} else {
}

if((typeof app !== 'undefined') && (typeof app.core !== 'undefined') && (typeof app.core.root_STAR_ !== 'undefined')){
} else {
app.core.root_STAR_ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null);
}
app.core.ensure_root_BANG_ = (function app$core$ensure_root_BANG_(){
if((cljs.core.deref(app.core.root_STAR_) == null)){
var temp__5825__auto___52766 = document.getElementById("app");
if(cljs.core.truth_(temp__5825__auto___52766)){
var el_52767 = temp__5825__auto___52766;
console.log("[app] creating root @ #app");

cljs.core.reset_BANG_(app.core.root_STAR_,uix.dom.create_root.cljs$core$IFn$_invoke$arity$1(el_52767));
} else {
}
} else {
}

return cljs.core.deref(app.core.root_STAR_);
});
app.core.mount_BANG_ = (function app$core$mount_BANG_(){
var temp__5825__auto__ = app.core.ensure_root_BANG_();
if(cljs.core.truth_(temp__5825__auto__)){
var root = temp__5825__auto__;
console.log("[app] mount! rendering");

return uix.dom.render_root(uix.compiler.alpha.component_element(uix.core.strict_mode,[cljs.core.PersistentArrayMap.EMPTY],[uix.compiler.alpha.component_element(app.core.app_root,[null],[])]),root);
} else {
return null;
}
});
app.core.render = (function app$core$render(){
return app.core.mount_BANG_();
});
app.core.init = (function app$core$init(){
console.log("[app] init called");

app.router.start_BANG_();

return app.core.render();
});
goog.exportSymbol('app.core.init', app.core.init);
try{app.core.init();
}catch (e52762){var __52768 = e52762;
}
//# sourceMappingURL=app.core.js.map
