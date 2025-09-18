goog.provide('app.components.navbar');
app.components.navbar.navbar = (function app$components$navbar$navbar(){
var f__43724__auto__ = (function (){
if(goog.DEBUG){
var temp__5825__auto___51554 = app.components.navbar.navbar.fast_refresh_signature;
if(cljs.core.truth_(temp__5825__auto___51554)){
var f__43648__auto___51555 = temp__5825__auto___51554;
(f__43648__auto___51555.cljs$core$IFn$_invoke$arity$0 ? f__43648__auto___51555.cljs$core$IFn$_invoke$arity$0() : f__43648__auto___51555.call(null));
} else {
}
} else {
}

var vec__51484 = uix.core.use_state(cljs.core.deref(app.router.current));
var route = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__51484,(0),null);
var set_route = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__51484,(1),null);
var vec__51491 = uix.core.use_state(app.auth.authed_QMARK_());
var authed = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__51491,(0),null);
var set_authed = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__51491,(1),null);
var vec__51494 = uix.core.use_state(app.auth.token_remaining_s());
var remaining = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__51494,(0),null);
var set_remaining = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__51494,(1),null);
uix.hooks.alpha.use_effect.cljs$core$IFn$_invoke$arity$2((function (){
app.router.start_BANG_();

var _ = cljs.core.add_watch(app.router.current,new cljs.core.Keyword("app.components.navbar","nav","app.components.navbar/nav",855982490),(function (_,___$1,___$2,v){
return (set_route.cljs$core$IFn$_invoke$arity$1 ? set_route.cljs$core$IFn$_invoke$arity$1(v) : set_route.call(null,v));
}));
var ___$1 = cljs.core.add_watch(app.auth.state,new cljs.core.Keyword("app.components.navbar","auth","app.components.navbar/auth",-357561719),(function (___$1,___$2,___$3,___$4){
var G__51533_51558 = app.auth.authed_QMARK_();
(set_authed.cljs$core$IFn$_invoke$arity$1 ? set_authed.cljs$core$IFn$_invoke$arity$1(G__51533_51558) : set_authed.call(null,G__51533_51558));

var G__51534 = app.auth.token_remaining_s();
return (set_remaining.cljs$core$IFn$_invoke$arity$1 ? set_remaining.cljs$core$IFn$_invoke$arity$1(G__51534) : set_remaining.call(null,G__51534));
}));
var iid = setInterval((function (){
var G__51537 = app.auth.token_remaining_s();
return (set_remaining.cljs$core$IFn$_invoke$arity$1 ? set_remaining.cljs$core$IFn$_invoke$arity$1(G__51537) : set_remaining.call(null,G__51537));
}),(1000));
return (function (){
cljs.core.remove_watch(app.router.current,new cljs.core.Keyword("app.components.navbar","nav","app.components.navbar/nav",855982490));

cljs.core.remove_watch(app.auth.state,new cljs.core.Keyword("app.components.navbar","auth","app.components.navbar/auth",-357561719));

clearInterval(iid);

return app.router.stop_BANG_();
});
}),[uix.hooks.alpha.use_clj_deps(cljs.core.PersistentVector.EMPTY)]);

var name = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(route,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"data","data",-232669377),new cljs.core.Keyword(null,"name","name",1843675177)], null));
return uix.compiler.aot._GT_el("header",[{'className':"border-b"}],[uix.compiler.aot._GT_el("div",[{'className':"py-3 flex gap-6 items-center"}],[uix.compiler.aot._GT_el("nav",[{'className':"flex gap-4"}],[uix.compiler.aot._GT_el("a",[{'href':app.router.href(new cljs.core.Keyword(null,"home","home",-74557309)),'onMouseEnter':uix.compiler.attributes.keyword__GT_string(app.chunks.preload_home),'className':((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(name,new cljs.core.Keyword(null,"home","home",-74557309)))?"font-bold":null)}],["Home"]),uix.compiler.aot._GT_el("a",[{'href':app.router.href(new cljs.core.Keyword(null,"about","about",1423892543)),'onMouseEnter':uix.compiler.attributes.keyword__GT_string(app.chunks.preload_about),'className':((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(name,new cljs.core.Keyword(null,"about","about",1423892543)))?"font-bold":null)}],["About"]),uix.compiler.aot._GT_el("a",[{'href':app.router.href(new cljs.core.Keyword(null,"admin","admin",-1239101627)),'onMouseEnter':uix.compiler.attributes.keyword__GT_string(app.chunks.preload_admin),'className':((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(name,new cljs.core.Keyword(null,"admin","admin",-1239101627)))?"font-bold":null)}],["Admin"])]),uix.compiler.aot._GT_el("div",[{'className':"ml-auto flex items-center gap-3"}],[(cljs.core.truth_(authed)?uix.compiler.aot._GT_el("span",[{'className':"badge text-xs px-2 py-0.5 rounded bg-slate-100 border"}],[["token ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(remaining),"s"].join('')]):null),(cljs.core.truth_(authed)?uix.compiler.aot._GT_el("button",[{'className':"px-3 py-1 border rounded",'onClick':uix.compiler.attributes.keyword__GT_string(app.auth.logout_BANG_)}],["Logout"]):uix.compiler.aot._GT_el("a",[{'href':app.router.href(new cljs.core.Keyword(null,"login","login",55217519)),'onMouseEnter':uix.compiler.attributes.keyword__GT_string(app.chunks.preload_login),'className':"px-3 py-1 border rounded"}],["Login"]))])])]);
});
if(goog.DEBUG){
var _STAR_current_component_STAR__orig_val__51547 = uix.core._STAR_current_component_STAR_;
var _STAR_current_component_STAR__temp_val__51548 = app.components.navbar.navbar;
(uix.core._STAR_current_component_STAR_ = _STAR_current_component_STAR__temp_val__51548);

try{return f__43724__auto__();
}finally {(uix.core._STAR_current_component_STAR_ = _STAR_current_component_STAR__orig_val__51547);
}} else {
return f__43724__auto__();
}
});

(app.components.navbar.navbar.uix_component_QMARK_ = true);

uix.core.set_display_name(app.components.navbar.navbar,"app.components.navbar/navbar");

if(goog.DEBUG){
if((typeof window !== 'undefined') && (typeof window.uix !== 'undefined') && (typeof window.uix.dev !== 'undefined')){
var sig__43657__auto___51566 = window.uix.dev.signature_BANG_();
(sig__43657__auto___51566.cljs$core$IFn$_invoke$arity$4 ? sig__43657__auto___51566.cljs$core$IFn$_invoke$arity$4(app.components.navbar.navbar,"(use-state (clojure.core/deref router/current))(use-state (auth/authed?))(use-state (auth/token-remaining-s))(use-effect (fn [] (router/start!) (let [_ (add-watch router/current :app.components.navbar/nav (fn [_ _ _ v] (set-route v))) _ (add-watch auth/state :app.components.navbar/auth (fn [_ _ _ _] (set-authed (auth/authed?)) (set-remaining (auth/token-remaining-s)))) iid (js/setInterval (fn* [] (set-remaining (auth/token-remaining-s))) 1000)] (fn [] (remove-watch router/current :app.components.navbar/nav) (remove-watch auth/state :app.components.navbar/auth) (js/clearInterval iid) (router/stop!)))) [])",null,null) : sig__43657__auto___51566.call(null,app.components.navbar.navbar,"(use-state (clojure.core/deref router/current))(use-state (auth/authed?))(use-state (auth/token-remaining-s))(use-effect (fn [] (router/start!) (let [_ (add-watch router/current :app.components.navbar/nav (fn [_ _ _ v] (set-route v))) _ (add-watch auth/state :app.components.navbar/auth (fn [_ _ _ _] (set-authed (auth/authed?)) (set-remaining (auth/token-remaining-s)))) iid (js/setInterval (fn* [] (set-remaining (auth/token-remaining-s))) 1000)] (fn [] (remove-watch router/current :app.components.navbar/nav) (remove-watch auth/state :app.components.navbar/auth) (js/clearInterval iid) (router/stop!)))) [])",null,null));

window.uix.dev.register_BANG_(app.components.navbar.navbar,app.components.navbar.navbar.displayName);

(app.components.navbar.navbar.fast_refresh_signature = sig__43657__auto___51566);
} else {
}
} else {
}


//# sourceMappingURL=app.components.navbar.js.map
