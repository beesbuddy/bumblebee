goog.provide('devtools.prefs');
goog.scope(function(){
  devtools.prefs.goog$module$goog$labs$userAgent$browser = goog.module.get('goog.labs.userAgent.browser');
});
devtools.prefs.default_config = (new cljs.core.Delay((function (){
return cljs.core.deref(devtools.defaults.config);
}),null));
devtools.prefs.firefox_overrides_config = (new cljs.core.Delay((function (){
if(cljs.core.truth_(devtools.prefs.goog$module$goog$labs$userAgent$browser.isFirefox())){
return cljs.core.deref(devtools.defaults.firefox_overrides_config);
} else {
return null;
}
}),null));
devtools.prefs.external_config = (new cljs.core.Delay((function (){
return cljs.core.PersistentArrayMap.EMPTY;
}),null));
devtools.prefs.initial_config = (new cljs.core.Delay((function (){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.deref(devtools.prefs.default_config),cljs.core.deref(devtools.prefs.firefox_overrides_config),cljs.core.deref(devtools.prefs.external_config)], 0));
}),null));
devtools.prefs._STAR_current_config_STAR_ = (new cljs.core.Delay((function (){
return cljs.core.deref(devtools.prefs.initial_config);
}),null));
devtools.prefs.set_prefs_BANG_ = (function devtools$prefs$set_prefs_BANG_(new_prefs){
return (devtools.prefs._STAR_current_config_STAR_ = new_prefs);
});
devtools.prefs.get_prefs = (function devtools$prefs$get_prefs(){
if(cljs.core.delay_QMARK_(devtools.prefs._STAR_current_config_STAR_)){
devtools.prefs.set_prefs_BANG_(cljs.core.deref(devtools.prefs._STAR_current_config_STAR_));
} else {
}

return devtools.prefs._STAR_current_config_STAR_;
});
devtools.prefs.pref = (function devtools$prefs$pref(key){
var G__32172 = devtools.prefs.get_prefs();
return (key.cljs$core$IFn$_invoke$arity$1 ? key.cljs$core$IFn$_invoke$arity$1(G__32172) : key.call(null,G__32172));
});
devtools.prefs.set_pref_BANG_ = (function devtools$prefs$set_pref_BANG_(key,val){
return devtools.prefs.set_prefs_BANG_(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(devtools.prefs.get_prefs(),key,val));
});
devtools.prefs.merge_prefs_BANG_ = (function devtools$prefs$merge_prefs_BANG_(m){
return devtools.prefs.set_prefs_BANG_(cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([devtools.prefs.get_prefs(),m], 0)));
});
devtools.prefs.update_pref_BANG_ = (function devtools$prefs$update_pref_BANG_(var_args){
var args__5755__auto__ = [];
var len__5749__auto___32191 = arguments.length;
var i__5750__auto___32192 = (0);
while(true){
if((i__5750__auto___32192 < len__5749__auto___32191)){
args__5755__auto__.push((arguments[i__5750__auto___32192]));

var G__32193 = (i__5750__auto___32192 + (1));
i__5750__auto___32192 = G__32193;
continue;
} else {
}
break;
}

var argseq__5756__auto__ = ((((2) < args__5755__auto__.length))?(new cljs.core.IndexedSeq(args__5755__auto__.slice((2)),(0),null)):null);
return devtools.prefs.update_pref_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__5756__auto__);
});

(devtools.prefs.update_pref_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (key,f,args){
var new_val = cljs.core.apply.cljs$core$IFn$_invoke$arity$3(f,devtools.prefs.pref(key),args);
return devtools.prefs.set_pref_BANG_(key,new_val);
}));

(devtools.prefs.update_pref_BANG_.cljs$lang$maxFixedArity = (2));

/** @this {Function} */
(devtools.prefs.update_pref_BANG_.cljs$lang$applyTo = (function (seq32180){
var G__32181 = cljs.core.first(seq32180);
var seq32180__$1 = cljs.core.next(seq32180);
var G__32182 = cljs.core.first(seq32180__$1);
var seq32180__$2 = cljs.core.next(seq32180__$1);
var self__5734__auto__ = this;
return self__5734__auto__.cljs$core$IFn$_invoke$arity$variadic(G__32181,G__32182,seq32180__$2);
}));


//# sourceMappingURL=devtools.prefs.js.map
