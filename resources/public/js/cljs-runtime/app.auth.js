goog.provide('app.auth');
app.auth.storage_key = "uix-starter.jwt";
if((typeof app !== 'undefined') && (typeof app.auth !== 'undefined') && (typeof app.auth.state !== 'undefined')){
} else {
app.auth.state = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"token","token",-1211463215),null,new cljs.core.Keyword(null,"redirect","redirect",-1975673286),null,new cljs.core.Keyword(null,"timer-id","timer-id",1622357927),null], null));
}
app.auth.now_s = (function app$auth$now_s(){
return Math.floor((Date.now() / (1000)));
});
app.auth.gen_str = (function app$auth$gen_str(){
return Math.random().toString((36));
});
app.auth.token_expired_QMARK_ = (function app$auth$token_expired_QMARK_(token){
var t = (function (){var or__5025__auto__ = token;
if(cljs.core.truth_(or__5025__auto__)){
return or__5025__auto__;
} else {
return new cljs.core.Keyword(null,"token","token",-1211463215).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(app.auth.state));
}
})();
if(cljs.core.not(t)){
return true;
} else {
return (new cljs.core.Keyword(null,"exp","exp",-261706262).cljs$core$IFn$_invoke$arity$1(t) <= app.auth.now_s());
}
});
app.auth.token_remaining_s = (function app$auth$token_remaining_s(){
var temp__5823__auto__ = new cljs.core.Keyword(null,"token","token",-1211463215).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(app.auth.state));
if(cljs.core.truth_(temp__5823__auto__)){
var t = temp__5823__auto__;
var x__5110__auto__ = (0);
var y__5111__auto__ = (new cljs.core.Keyword(null,"exp","exp",-261706262).cljs$core$IFn$_invoke$arity$1(t) - app.auth.now_s());
return ((x__5110__auto__ > y__5111__auto__) ? x__5110__auto__ : y__5111__auto__);
} else {
return (0);
}
});
app.auth.authed_QMARK_ = (function app$auth$authed_QMARK_(){
var and__5023__auto__ = new cljs.core.Keyword(null,"token","token",-1211463215).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(app.auth.state));
if(cljs.core.truth_(and__5023__auto__)){
return (!(app.auth.token_expired_QMARK_(new cljs.core.Keyword(null,"token","token",-1211463215).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(app.auth.state)))));
} else {
return and__5023__auto__;
}
});
app.auth.persist_BANG_ = (function app$auth$persist_BANG_(){
try{return localStorage.setItem(app.auth.storage_key,cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"token","token",-1211463215).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(app.auth.state))], 0)));
}catch (e44197){var _ = e44197;
return null;
}});
app.auth.load_BANG_ = (function app$auth$load_BANG_(){
try{var temp__5825__auto__ = localStorage.getItem(app.auth.storage_key);
if(cljs.core.truth_(temp__5825__auto__)){
var s = temp__5825__auto__;
var temp__5825__auto____$1 = cljs.reader.read_string.cljs$core$IFn$_invoke$arity$1(s);
if(cljs.core.truth_(temp__5825__auto____$1)){
var t = temp__5825__auto____$1;
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(app.auth.state,cljs.core.assoc,new cljs.core.Keyword(null,"token","token",-1211463215),t);
} else {
return null;
}
} else {
return null;
}
}catch (e44204){var _ = e44204;
return null;
}});
cljs.core.add_watch(app.auth.state,new cljs.core.Keyword("app.auth","persist","app.auth/persist",1970863153),(function (_,___$1,___$2,___$3){
return app.auth.persist_BANG_();
}));
app.auth.clear_timer_BANG_ = (function app$auth$clear_timer_BANG_(){
var temp__5825__auto__ = new cljs.core.Keyword(null,"timer-id","timer-id",1622357927).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(app.auth.state));
if(cljs.core.truth_(temp__5825__auto__)){
var id = temp__5825__auto__;
clearTimeout(id);

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(app.auth.state,cljs.core.assoc,new cljs.core.Keyword(null,"timer-id","timer-id",1622357927),null);
} else {
return null;
}
});
app.auth.schedule_refresh_BANG_ = (function app$auth$schedule_refresh_BANG_(){
app.auth.clear_timer_BANG_();

var temp__5825__auto__ = new cljs.core.Keyword(null,"token","token",-1211463215).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(app.auth.state));
if(cljs.core.truth_(temp__5825__auto__)){
var t = temp__5825__auto__;
var remaining = (new cljs.core.Keyword(null,"exp","exp",-261706262).cljs$core$IFn$_invoke$arity$1(t) - app.auth.now_s());
var delay_ms = ((1000) * (function (){var x__5110__auto__ = (0);
var y__5111__auto__ = (remaining - (10));
return ((x__5110__auto__ > y__5111__auto__) ? x__5110__auto__ : y__5111__auto__);
})());
if((remaining > (0))){
var id = setTimeout((function (){
return (app.auth.refresh_async_BANG_.cljs$core$IFn$_invoke$arity$0 ? app.auth.refresh_async_BANG_.cljs$core$IFn$_invoke$arity$0() : app.auth.refresh_async_BANG_.call(null));
}),delay_ms);
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(app.auth.state,cljs.core.assoc,new cljs.core.Keyword(null,"timer-id","timer-id",1622357927),id);
} else {
return null;
}
} else {
return null;
}
});
app.auth.set_token_BANG_ = (function app$auth$set_token_BANG_(t){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(app.auth.state,cljs.core.assoc,new cljs.core.Keyword(null,"token","token",-1211463215),t);

return app.auth.schedule_refresh_BANG_();
});
app.auth.set_redirect_BANG_ = (function app$auth$set_redirect_BANG_(target){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(app.auth.state,cljs.core.assoc,new cljs.core.Keyword(null,"redirect","redirect",-1975673286),target);
});
app.auth.take_redirect_BANG_ = (function app$auth$take_redirect_BANG_(){
var r = new cljs.core.Keyword(null,"redirect","redirect",-1975673286).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(app.auth.state));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(app.auth.state,cljs.core.assoc,new cljs.core.Keyword(null,"redirect","redirect",-1975673286),null);

return r;
});
app.auth.logout_BANG_ = (function app$auth$logout_BANG_(){
app.auth.clear_timer_BANG_();

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(app.auth.state,cljs.core.assoc,new cljs.core.Keyword(null,"token","token",-1211463215),null);
});
/**
 * Fake login returning token valid for 60s.
 */
app.auth.login_async_BANG_ = (function app$auth$login_async_BANG_(){
return (new Promise((function (resolve,_reject){
return setTimeout((function (){
var t = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"access","access",2027349272),["acc-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(app.auth.gen_str())].join(''),new cljs.core.Keyword(null,"refresh","refresh",1947415525),["ref-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(app.auth.gen_str())].join(''),new cljs.core.Keyword(null,"exp","exp",-261706262),(app.auth.now_s() + (60))], null);
app.auth.set_token_BANG_(t);

return (resolve.cljs$core$IFn$_invoke$arity$1 ? resolve.cljs$core$IFn$_invoke$arity$1(t) : resolve.call(null,t));
}),(800));
})));
});
/**
 * Fake refresh using stored refresh token. Extends expiry by 60s.
 */
app.auth.refresh_async_BANG_ = (function app$auth$refresh_async_BANG_(){
return (new Promise((function (resolve,reject){
var temp__5823__auto__ = new cljs.core.Keyword(null,"token","token",-1211463215).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(app.auth.state));
if(cljs.core.truth_(temp__5823__auto__)){
var t = temp__5823__auto__;
return setTimeout((function (){
if(app.auth.token_expired_QMARK_(t)){
app.auth.logout_BANG_();

var G__44222 = (new Error("refresh: token expired"));
return (reject.cljs$core$IFn$_invoke$arity$1 ? reject.cljs$core$IFn$_invoke$arity$1(G__44222) : reject.call(null,G__44222));
} else {
var t2 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(t,new cljs.core.Keyword(null,"access","access",2027349272),["acc-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(app.auth.gen_str())].join(''),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"exp","exp",-261706262),(app.auth.now_s() + (60))], 0));
app.auth.set_token_BANG_(t2);

return (resolve.cljs$core$IFn$_invoke$arity$1 ? resolve.cljs$core$IFn$_invoke$arity$1(t2) : resolve.call(null,t2));
}
}),(500));
} else {
var G__44223 = (new Error("refresh: no token"));
return (reject.cljs$core$IFn$_invoke$arity$1 ? reject.cljs$core$IFn$_invoke$arity$1(G__44223) : reject.call(null,G__44223));
}
})));
});

//# sourceMappingURL=app.auth.js.map
