goog.provide('bumblebee.ui.auth');
bumblebee.ui.auth.storage_key = "uix-starter.jwt";
if((typeof bumblebee !== 'undefined') && (typeof bumblebee.ui !== 'undefined') && (typeof bumblebee.ui.auth !== 'undefined') && (typeof bumblebee.ui.auth.state !== 'undefined')){
} else {
bumblebee.ui.auth.state = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"token","token",-1211463215),null,new cljs.core.Keyword(null,"redirect","redirect",-1975673286),null,new cljs.core.Keyword(null,"timer-id","timer-id",1622357927),null], null));
}
bumblebee.ui.auth.now_s = (function bumblebee$ui$auth$now_s(){
return Math.floor((Date.now() / (1000)));
});
bumblebee.ui.auth.gen_str = (function bumblebee$ui$auth$gen_str(){
return Math.random().toString((36));
});
bumblebee.ui.auth.token_expired_QMARK_ = (function bumblebee$ui$auth$token_expired_QMARK_(token){
var t = (function (){var or__5025__auto__ = token;
if(cljs.core.truth_(or__5025__auto__)){
return or__5025__auto__;
} else {
return new cljs.core.Keyword(null,"token","token",-1211463215).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(bumblebee.ui.auth.state));
}
})();
if(cljs.core.not(t)){
return true;
} else {
return (new cljs.core.Keyword(null,"exp","exp",-261706262).cljs$core$IFn$_invoke$arity$1(t) <= bumblebee.ui.auth.now_s());
}
});
bumblebee.ui.auth.token_remaining_s = (function bumblebee$ui$auth$token_remaining_s(){
var temp__5823__auto__ = new cljs.core.Keyword(null,"token","token",-1211463215).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(bumblebee.ui.auth.state));
if(cljs.core.truth_(temp__5823__auto__)){
var t = temp__5823__auto__;
var x__5110__auto__ = (0);
var y__5111__auto__ = (new cljs.core.Keyword(null,"exp","exp",-261706262).cljs$core$IFn$_invoke$arity$1(t) - bumblebee.ui.auth.now_s());
return ((x__5110__auto__ > y__5111__auto__) ? x__5110__auto__ : y__5111__auto__);
} else {
return (0);
}
});
bumblebee.ui.auth.authed_QMARK_ = (function bumblebee$ui$auth$authed_QMARK_(){
var and__5023__auto__ = new cljs.core.Keyword(null,"token","token",-1211463215).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(bumblebee.ui.auth.state));
if(cljs.core.truth_(and__5023__auto__)){
return (!(bumblebee.ui.auth.token_expired_QMARK_(new cljs.core.Keyword(null,"token","token",-1211463215).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(bumblebee.ui.auth.state)))));
} else {
return and__5023__auto__;
}
});
bumblebee.ui.auth.persist_BANG_ = (function bumblebee$ui$auth$persist_BANG_(){
try{return localStorage.setItem(bumblebee.ui.auth.storage_key,cljs.core.pr_str.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"token","token",-1211463215).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(bumblebee.ui.auth.state))], 0)));
}catch (e32531){var _ = e32531;
return null;
}});
bumblebee.ui.auth.load_BANG_ = (function bumblebee$ui$auth$load_BANG_(){
try{var temp__5825__auto__ = localStorage.getItem(bumblebee.ui.auth.storage_key);
if(cljs.core.truth_(temp__5825__auto__)){
var s = temp__5825__auto__;
var temp__5825__auto____$1 = cljs.reader.read_string.cljs$core$IFn$_invoke$arity$1(s);
if(cljs.core.truth_(temp__5825__auto____$1)){
var t = temp__5825__auto____$1;
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(bumblebee.ui.auth.state,cljs.core.assoc,new cljs.core.Keyword(null,"token","token",-1211463215),t);
} else {
return null;
}
} else {
return null;
}
}catch (e32540){var _ = e32540;
return null;
}});
cljs.core.add_watch(bumblebee.ui.auth.state,new cljs.core.Keyword("bumblebee.ui.auth","persist","bumblebee.ui.auth/persist",-114945807),(function (_,___$1,___$2,___$3){
return bumblebee.ui.auth.persist_BANG_();
}));
bumblebee.ui.auth.clear_timer_BANG_ = (function bumblebee$ui$auth$clear_timer_BANG_(){
var temp__5825__auto__ = new cljs.core.Keyword(null,"timer-id","timer-id",1622357927).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(bumblebee.ui.auth.state));
if(cljs.core.truth_(temp__5825__auto__)){
var id = temp__5825__auto__;
clearTimeout(id);

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(bumblebee.ui.auth.state,cljs.core.assoc,new cljs.core.Keyword(null,"timer-id","timer-id",1622357927),null);
} else {
return null;
}
});
bumblebee.ui.auth.schedule_refresh_BANG_ = (function bumblebee$ui$auth$schedule_refresh_BANG_(){
bumblebee.ui.auth.clear_timer_BANG_();

var temp__5825__auto__ = new cljs.core.Keyword(null,"token","token",-1211463215).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(bumblebee.ui.auth.state));
if(cljs.core.truth_(temp__5825__auto__)){
var t = temp__5825__auto__;
var remaining = (new cljs.core.Keyword(null,"exp","exp",-261706262).cljs$core$IFn$_invoke$arity$1(t) - bumblebee.ui.auth.now_s());
var delay_ms = ((1000) * (function (){var x__5110__auto__ = (0);
var y__5111__auto__ = (remaining - (10));
return ((x__5110__auto__ > y__5111__auto__) ? x__5110__auto__ : y__5111__auto__);
})());
if((remaining > (0))){
var id = setTimeout((function (){
return (bumblebee.ui.auth.refresh_async_BANG_.cljs$core$IFn$_invoke$arity$0 ? bumblebee.ui.auth.refresh_async_BANG_.cljs$core$IFn$_invoke$arity$0() : bumblebee.ui.auth.refresh_async_BANG_.call(null));
}),delay_ms);
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(bumblebee.ui.auth.state,cljs.core.assoc,new cljs.core.Keyword(null,"timer-id","timer-id",1622357927),id);
} else {
return null;
}
} else {
return null;
}
});
bumblebee.ui.auth.set_token_BANG_ = (function bumblebee$ui$auth$set_token_BANG_(t){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(bumblebee.ui.auth.state,cljs.core.assoc,new cljs.core.Keyword(null,"token","token",-1211463215),t);

return bumblebee.ui.auth.schedule_refresh_BANG_();
});
bumblebee.ui.auth.set_redirect_BANG_ = (function bumblebee$ui$auth$set_redirect_BANG_(target){
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(bumblebee.ui.auth.state,cljs.core.assoc,new cljs.core.Keyword(null,"redirect","redirect",-1975673286),target);
});
bumblebee.ui.auth.take_redirect_BANG_ = (function bumblebee$ui$auth$take_redirect_BANG_(){
var r = new cljs.core.Keyword(null,"redirect","redirect",-1975673286).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(bumblebee.ui.auth.state));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(bumblebee.ui.auth.state,cljs.core.assoc,new cljs.core.Keyword(null,"redirect","redirect",-1975673286),null);

return r;
});
bumblebee.ui.auth.logout_BANG_ = (function bumblebee$ui$auth$logout_BANG_(){
bumblebee.ui.auth.clear_timer_BANG_();

return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(bumblebee.ui.auth.state,cljs.core.assoc,new cljs.core.Keyword(null,"token","token",-1211463215),null);
});
/**
 * Fake login returning token valid for 60s.
 */
bumblebee.ui.auth.login_async_BANG_ = (function bumblebee$ui$auth$login_async_BANG_(){
return (new Promise((function (resolve,_reject){
return setTimeout((function (){
var t = new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"access","access",2027349272),["acc-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(bumblebee.ui.auth.gen_str())].join(''),new cljs.core.Keyword(null,"refresh","refresh",1947415525),["ref-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(bumblebee.ui.auth.gen_str())].join(''),new cljs.core.Keyword(null,"exp","exp",-261706262),(bumblebee.ui.auth.now_s() + (60))], null);
bumblebee.ui.auth.set_token_BANG_(t);

return (resolve.cljs$core$IFn$_invoke$arity$1 ? resolve.cljs$core$IFn$_invoke$arity$1(t) : resolve.call(null,t));
}),(800));
})));
});
/**
 * Fake refresh using stored refresh token. Extends expiry by 60s.
 */
bumblebee.ui.auth.refresh_async_BANG_ = (function bumblebee$ui$auth$refresh_async_BANG_(){
return (new Promise((function (resolve,reject){
var temp__5823__auto__ = new cljs.core.Keyword(null,"token","token",-1211463215).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(bumblebee.ui.auth.state));
if(cljs.core.truth_(temp__5823__auto__)){
var t = temp__5823__auto__;
return setTimeout((function (){
if(bumblebee.ui.auth.token_expired_QMARK_(t)){
bumblebee.ui.auth.logout_BANG_();

var G__32669 = (new Error("refresh: token expired"));
return (reject.cljs$core$IFn$_invoke$arity$1 ? reject.cljs$core$IFn$_invoke$arity$1(G__32669) : reject.call(null,G__32669));
} else {
var t2 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(t,new cljs.core.Keyword(null,"access","access",2027349272),["acc-",cljs.core.str.cljs$core$IFn$_invoke$arity$1(bumblebee.ui.auth.gen_str())].join(''),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"exp","exp",-261706262),(bumblebee.ui.auth.now_s() + (60))], 0));
bumblebee.ui.auth.set_token_BANG_(t2);

return (resolve.cljs$core$IFn$_invoke$arity$1 ? resolve.cljs$core$IFn$_invoke$arity$1(t2) : resolve.call(null,t2));
}
}),(500));
} else {
var G__32708 = (new Error("refresh: no token"));
return (reject.cljs$core$IFn$_invoke$arity$1 ? reject.cljs$core$IFn$_invoke$arity$1(G__32708) : reject.call(null,G__32708));
}
})));
});

//# sourceMappingURL=bumblebee.ui.auth.js.map
