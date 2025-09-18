goog.provide('shadow.remote.runtime.tap_support');
shadow.remote.runtime.tap_support.tap_subscribe = (function shadow$remote$runtime$tap_support$tap_subscribe(p__41074,p__41075){
var map__41076 = p__41074;
var map__41076__$1 = cljs.core.__destructure_map(map__41076);
var svc = map__41076__$1;
var subs_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41076__$1,new cljs.core.Keyword(null,"subs-ref","subs-ref",-1355989911));
var obj_support = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41076__$1,new cljs.core.Keyword(null,"obj-support","obj-support",1522559229));
var runtime = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41076__$1,new cljs.core.Keyword(null,"runtime","runtime",-1331573996));
var map__41077 = p__41075;
var map__41077__$1 = cljs.core.__destructure_map(map__41077);
var msg = map__41077__$1;
var from = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41077__$1,new cljs.core.Keyword(null,"from","from",1815293044));
var summary = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41077__$1,new cljs.core.Keyword(null,"summary","summary",380847952));
var history__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41077__$1,new cljs.core.Keyword(null,"history","history",-247395220));
var num = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__41077__$1,new cljs.core.Keyword(null,"num","num",1985240673),(10));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(subs_ref,cljs.core.assoc,from,msg);

if(cljs.core.truth_(history__$1)){
return shadow.remote.runtime.shared.reply(runtime,msg,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"tap-subscribed","tap-subscribed",-1882247432),new cljs.core.Keyword(null,"history","history",-247395220),cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (oid){
return new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"oid","oid",-768692334),oid,new cljs.core.Keyword(null,"summary","summary",380847952),shadow.remote.runtime.obj_support.obj_describe_STAR_(obj_support,oid)], null);
}),shadow.remote.runtime.obj_support.get_tap_history(obj_support,num)))], null));
} else {
return null;
}
});
shadow.remote.runtime.tap_support.tap_unsubscribe = (function shadow$remote$runtime$tap_support$tap_unsubscribe(p__41086,p__41087){
var map__41089 = p__41086;
var map__41089__$1 = cljs.core.__destructure_map(map__41089);
var subs_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41089__$1,new cljs.core.Keyword(null,"subs-ref","subs-ref",-1355989911));
var map__41090 = p__41087;
var map__41090__$1 = cljs.core.__destructure_map(map__41090);
var from = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41090__$1,new cljs.core.Keyword(null,"from","from",1815293044));
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(subs_ref,cljs.core.dissoc,from);
});
shadow.remote.runtime.tap_support.request_tap_history = (function shadow$remote$runtime$tap_support$request_tap_history(p__41096,p__41097){
var map__41098 = p__41096;
var map__41098__$1 = cljs.core.__destructure_map(map__41098);
var obj_support = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41098__$1,new cljs.core.Keyword(null,"obj-support","obj-support",1522559229));
var runtime = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41098__$1,new cljs.core.Keyword(null,"runtime","runtime",-1331573996));
var map__41099 = p__41097;
var map__41099__$1 = cljs.core.__destructure_map(map__41099);
var msg = map__41099__$1;
var num = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__41099__$1,new cljs.core.Keyword(null,"num","num",1985240673),(10));
var tap_ids = shadow.remote.runtime.obj_support.get_tap_history(obj_support,num);
return shadow.remote.runtime.shared.reply(runtime,msg,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"tap-history","tap-history",-282803347),new cljs.core.Keyword(null,"oids","oids",-1580877688),tap_ids], null));
});
shadow.remote.runtime.tap_support.tool_disconnect = (function shadow$remote$runtime$tap_support$tool_disconnect(p__41105,tid){
var map__41106 = p__41105;
var map__41106__$1 = cljs.core.__destructure_map(map__41106);
var svc = map__41106__$1;
var subs_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41106__$1,new cljs.core.Keyword(null,"subs-ref","subs-ref",-1355989911));
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(subs_ref,cljs.core.dissoc,tid);
});
shadow.remote.runtime.tap_support.start = (function shadow$remote$runtime$tap_support$start(runtime,obj_support){
var subs_ref = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var tap_fn = (function shadow$remote$runtime$tap_support$start_$_runtime_tap(obj){
if((!((obj == null)))){
var oid = shadow.remote.runtime.obj_support.register(obj_support,obj,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"from","from",1815293044),new cljs.core.Keyword(null,"tap","tap",-1086702463)], null));
var seq__41117 = cljs.core.seq(cljs.core.deref(subs_ref));
var chunk__41118 = null;
var count__41119 = (0);
var i__41120 = (0);
while(true){
if((i__41120 < count__41119)){
var vec__41131 = chunk__41118.cljs$core$IIndexed$_nth$arity$2(null,i__41120);
var tid = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41131,(0),null);
var tap_config = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41131,(1),null);
shadow.remote.runtime.api.relay_msg(runtime,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"tap","tap",-1086702463),new cljs.core.Keyword(null,"to","to",192099007),tid,new cljs.core.Keyword(null,"oid","oid",-768692334),oid], null));


var G__41143 = seq__41117;
var G__41144 = chunk__41118;
var G__41145 = count__41119;
var G__41146 = (i__41120 + (1));
seq__41117 = G__41143;
chunk__41118 = G__41144;
count__41119 = G__41145;
i__41120 = G__41146;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__41117);
if(temp__5825__auto__){
var seq__41117__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__41117__$1)){
var c__5548__auto__ = cljs.core.chunk_first(seq__41117__$1);
var G__41147 = cljs.core.chunk_rest(seq__41117__$1);
var G__41148 = c__5548__auto__;
var G__41149 = cljs.core.count(c__5548__auto__);
var G__41150 = (0);
seq__41117 = G__41147;
chunk__41118 = G__41148;
count__41119 = G__41149;
i__41120 = G__41150;
continue;
} else {
var vec__41134 = cljs.core.first(seq__41117__$1);
var tid = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41134,(0),null);
var tap_config = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__41134,(1),null);
shadow.remote.runtime.api.relay_msg(runtime,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"tap","tap",-1086702463),new cljs.core.Keyword(null,"to","to",192099007),tid,new cljs.core.Keyword(null,"oid","oid",-768692334),oid], null));


var G__41151 = cljs.core.next(seq__41117__$1);
var G__41152 = null;
var G__41153 = (0);
var G__41154 = (0);
seq__41117 = G__41151;
chunk__41118 = G__41152;
count__41119 = G__41153;
i__41120 = G__41154;
continue;
}
} else {
return null;
}
}
break;
}
} else {
return null;
}
});
var svc = new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"runtime","runtime",-1331573996),runtime,new cljs.core.Keyword(null,"obj-support","obj-support",1522559229),obj_support,new cljs.core.Keyword(null,"tap-fn","tap-fn",1573556461),tap_fn,new cljs.core.Keyword(null,"subs-ref","subs-ref",-1355989911),subs_ref], null);
shadow.remote.runtime.api.add_extension(runtime,new cljs.core.Keyword("shadow.remote.runtime.tap-support","ext","shadow.remote.runtime.tap-support/ext",1019069674),new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"ops","ops",1237330063),new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"tap-subscribe","tap-subscribe",411179050),(function (p1__41111_SHARP_){
return shadow.remote.runtime.tap_support.tap_subscribe(svc,p1__41111_SHARP_);
}),new cljs.core.Keyword(null,"tap-unsubscribe","tap-unsubscribe",1183890755),(function (p1__41112_SHARP_){
return shadow.remote.runtime.tap_support.tap_unsubscribe(svc,p1__41112_SHARP_);
}),new cljs.core.Keyword(null,"request-tap-history","request-tap-history",-670837812),(function (p1__41113_SHARP_){
return shadow.remote.runtime.tap_support.request_tap_history(svc,p1__41113_SHARP_);
})], null),new cljs.core.Keyword(null,"on-tool-disconnect","on-tool-disconnect",693464366),(function (p1__41114_SHARP_){
return shadow.remote.runtime.tap_support.tool_disconnect(svc,p1__41114_SHARP_);
})], null));

cljs.core.add_tap(tap_fn);

return svc;
});
shadow.remote.runtime.tap_support.stop = (function shadow$remote$runtime$tap_support$stop(p__41141){
var map__41142 = p__41141;
var map__41142__$1 = cljs.core.__destructure_map(map__41142);
var svc = map__41142__$1;
var tap_fn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41142__$1,new cljs.core.Keyword(null,"tap-fn","tap-fn",1573556461));
var runtime = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41142__$1,new cljs.core.Keyword(null,"runtime","runtime",-1331573996));
cljs.core.remove_tap(tap_fn);

return shadow.remote.runtime.api.del_extension(runtime,new cljs.core.Keyword("shadow.remote.runtime.tap-support","ext","shadow.remote.runtime.tap-support/ext",1019069674));
});

//# sourceMappingURL=shadow.remote.runtime.tap_support.js.map
