goog.provide('shadow.remote.runtime.shared');
shadow.remote.runtime.shared.init_state = (function shadow$remote$runtime$shared$init_state(client_info){
return new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"extensions","extensions",-1103629196),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"ops","ops",1237330063),cljs.core.PersistentArrayMap.EMPTY,new cljs.core.Keyword(null,"client-info","client-info",1958982504),client_info,new cljs.core.Keyword(null,"call-id-seq","call-id-seq",-1679248218),(0),new cljs.core.Keyword(null,"call-handlers","call-handlers",386605551),cljs.core.PersistentArrayMap.EMPTY], null);
});
shadow.remote.runtime.shared.now = (function shadow$remote$runtime$shared$now(){
return Date.now();
});
shadow.remote.runtime.shared.get_client_id = (function shadow$remote$runtime$shared$get_client_id(p__37080){
var map__37081 = p__37080;
var map__37081__$1 = cljs.core.__destructure_map(map__37081);
var runtime = map__37081__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37081__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
var or__5025__auto__ = new cljs.core.Keyword(null,"client-id","client-id",-464622140).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(state_ref));
if(cljs.core.truth_(or__5025__auto__)){
return or__5025__auto__;
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("runtime has no assigned runtime-id",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"runtime","runtime",-1331573996),runtime], null));
}
});
shadow.remote.runtime.shared.relay_msg = (function shadow$remote$runtime$shared$relay_msg(runtime,msg){
var self_id_37305 = shadow.remote.runtime.shared.get_client_id(runtime);
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"to","to",192099007).cljs$core$IFn$_invoke$arity$1(msg),self_id_37305)){
shadow.remote.runtime.api.relay_msg(runtime,msg);
} else {
Promise.resolve((1)).then((function (){
var G__37082 = runtime;
var G__37083 = cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(msg,new cljs.core.Keyword(null,"from","from",1815293044),self_id_37305);
return (shadow.remote.runtime.shared.process.cljs$core$IFn$_invoke$arity$2 ? shadow.remote.runtime.shared.process.cljs$core$IFn$_invoke$arity$2(G__37082,G__37083) : shadow.remote.runtime.shared.process.call(null,G__37082,G__37083));
}));
}

return msg;
});
shadow.remote.runtime.shared.reply = (function shadow$remote$runtime$shared$reply(runtime,p__37084,res){
var map__37085 = p__37084;
var map__37085__$1 = cljs.core.__destructure_map(map__37085);
var call_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37085__$1,new cljs.core.Keyword(null,"call-id","call-id",1043012968));
var from = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37085__$1,new cljs.core.Keyword(null,"from","from",1815293044));
var res__$1 = (function (){var G__37087 = res;
var G__37087__$1 = (cljs.core.truth_(call_id)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__37087,new cljs.core.Keyword(null,"call-id","call-id",1043012968),call_id):G__37087);
if(cljs.core.truth_(from)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__37087__$1,new cljs.core.Keyword(null,"to","to",192099007),from);
} else {
return G__37087__$1;
}
})();
return shadow.remote.runtime.api.relay_msg(runtime,res__$1);
});
shadow.remote.runtime.shared.call = (function shadow$remote$runtime$shared$call(var_args){
var G__37093 = arguments.length;
switch (G__37093) {
case 3:
return shadow.remote.runtime.shared.call.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return shadow.remote.runtime.shared.call.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.remote.runtime.shared.call.cljs$core$IFn$_invoke$arity$3 = (function (runtime,msg,handlers){
return shadow.remote.runtime.shared.call.cljs$core$IFn$_invoke$arity$4(runtime,msg,handlers,(0));
}));

(shadow.remote.runtime.shared.call.cljs$core$IFn$_invoke$arity$4 = (function (p__37097,msg,handlers,timeout_after_ms){
var map__37101 = p__37097;
var map__37101__$1 = cljs.core.__destructure_map(map__37101);
var runtime = map__37101__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37101__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
if(cljs.core.map_QMARK_(msg)){
} else {
throw (new Error("Assert failed: (map? msg)"));
}

if(cljs.core.map_QMARK_(handlers)){
} else {
throw (new Error("Assert failed: (map? handlers)"));
}

if(cljs.core.nat_int_QMARK_(timeout_after_ms)){
} else {
throw (new Error("Assert failed: (nat-int? timeout-after-ms)"));
}

var call_id = new cljs.core.Keyword(null,"call-id-seq","call-id-seq",-1679248218).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(state_ref));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state_ref,cljs.core.update,new cljs.core.Keyword(null,"call-id-seq","call-id-seq",-1679248218),cljs.core.inc);

cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state_ref,cljs.core.assoc_in,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"call-handlers","call-handlers",386605551),call_id], null),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"handlers","handlers",79528781),handlers,new cljs.core.Keyword(null,"called-at","called-at",607081160),shadow.remote.runtime.shared.now(),new cljs.core.Keyword(null,"msg","msg",-1386103444),msg,new cljs.core.Keyword(null,"timeout","timeout",-318625318),timeout_after_ms], null));

return shadow.remote.runtime.api.relay_msg(runtime,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(msg,new cljs.core.Keyword(null,"call-id","call-id",1043012968),call_id));
}));

(shadow.remote.runtime.shared.call.cljs$lang$maxFixedArity = 4);

shadow.remote.runtime.shared.trigger_BANG_ = (function shadow$remote$runtime$shared$trigger_BANG_(var_args){
var args__5755__auto__ = [];
var len__5749__auto___37309 = arguments.length;
var i__5750__auto___37310 = (0);
while(true){
if((i__5750__auto___37310 < len__5749__auto___37309)){
args__5755__auto__.push((arguments[i__5750__auto___37310]));

var G__37311 = (i__5750__auto___37310 + (1));
i__5750__auto___37310 = G__37311;
continue;
} else {
}
break;
}

var argseq__5756__auto__ = ((((2) < args__5755__auto__.length))?(new cljs.core.IndexedSeq(args__5755__auto__.slice((2)),(0),null)):null);
return shadow.remote.runtime.shared.trigger_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),argseq__5756__auto__);
});

(shadow.remote.runtime.shared.trigger_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (p__37125,ev,args){
var map__37130 = p__37125;
var map__37130__$1 = cljs.core.__destructure_map(map__37130);
var runtime = map__37130__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37130__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
var seq__37132 = cljs.core.seq(cljs.core.vals(new cljs.core.Keyword(null,"extensions","extensions",-1103629196).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(state_ref))));
var chunk__37135 = null;
var count__37136 = (0);
var i__37137 = (0);
while(true){
if((i__37137 < count__37136)){
var ext = chunk__37135.cljs$core$IIndexed$_nth$arity$2(null,i__37137);
var ev_fn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(ext,ev);
if(cljs.core.truth_(ev_fn)){
cljs.core.apply.cljs$core$IFn$_invoke$arity$2(ev_fn,args);


var G__37313 = seq__37132;
var G__37314 = chunk__37135;
var G__37315 = count__37136;
var G__37316 = (i__37137 + (1));
seq__37132 = G__37313;
chunk__37135 = G__37314;
count__37136 = G__37315;
i__37137 = G__37316;
continue;
} else {
var G__37317 = seq__37132;
var G__37318 = chunk__37135;
var G__37319 = count__37136;
var G__37320 = (i__37137 + (1));
seq__37132 = G__37317;
chunk__37135 = G__37318;
count__37136 = G__37319;
i__37137 = G__37320;
continue;
}
} else {
var temp__5825__auto__ = cljs.core.seq(seq__37132);
if(temp__5825__auto__){
var seq__37132__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__37132__$1)){
var c__5548__auto__ = cljs.core.chunk_first(seq__37132__$1);
var G__37321 = cljs.core.chunk_rest(seq__37132__$1);
var G__37322 = c__5548__auto__;
var G__37323 = cljs.core.count(c__5548__auto__);
var G__37324 = (0);
seq__37132 = G__37321;
chunk__37135 = G__37322;
count__37136 = G__37323;
i__37137 = G__37324;
continue;
} else {
var ext = cljs.core.first(seq__37132__$1);
var ev_fn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(ext,ev);
if(cljs.core.truth_(ev_fn)){
cljs.core.apply.cljs$core$IFn$_invoke$arity$2(ev_fn,args);


var G__37325 = cljs.core.next(seq__37132__$1);
var G__37326 = null;
var G__37327 = (0);
var G__37328 = (0);
seq__37132 = G__37325;
chunk__37135 = G__37326;
count__37136 = G__37327;
i__37137 = G__37328;
continue;
} else {
var G__37329 = cljs.core.next(seq__37132__$1);
var G__37330 = null;
var G__37331 = (0);
var G__37332 = (0);
seq__37132 = G__37329;
chunk__37135 = G__37330;
count__37136 = G__37331;
i__37137 = G__37332;
continue;
}
}
} else {
return null;
}
}
break;
}
}));

(shadow.remote.runtime.shared.trigger_BANG_.cljs$lang$maxFixedArity = (2));

/** @this {Function} */
(shadow.remote.runtime.shared.trigger_BANG_.cljs$lang$applyTo = (function (seq37120){
var G__37121 = cljs.core.first(seq37120);
var seq37120__$1 = cljs.core.next(seq37120);
var G__37122 = cljs.core.first(seq37120__$1);
var seq37120__$2 = cljs.core.next(seq37120__$1);
var self__5734__auto__ = this;
return self__5734__auto__.cljs$core$IFn$_invoke$arity$variadic(G__37121,G__37122,seq37120__$2);
}));

shadow.remote.runtime.shared.welcome = (function shadow$remote$runtime$shared$welcome(p__37160,p__37161){
var map__37163 = p__37160;
var map__37163__$1 = cljs.core.__destructure_map(map__37163);
var runtime = map__37163__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37163__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
var map__37164 = p__37161;
var map__37164__$1 = cljs.core.__destructure_map(map__37164);
var msg = map__37164__$1;
var client_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37164__$1,new cljs.core.Keyword(null,"client-id","client-id",-464622140));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(state_ref,cljs.core.assoc,new cljs.core.Keyword(null,"client-id","client-id",-464622140),client_id,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"welcome","welcome",-578152123),true], 0));

var map__37165 = cljs.core.deref(state_ref);
var map__37165__$1 = cljs.core.__destructure_map(map__37165);
var client_info = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37165__$1,new cljs.core.Keyword(null,"client-info","client-info",1958982504));
var extensions = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37165__$1,new cljs.core.Keyword(null,"extensions","extensions",-1103629196));
shadow.remote.runtime.shared.relay_msg(runtime,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"hello","hello",-245025397),new cljs.core.Keyword(null,"client-info","client-info",1958982504),client_info], null));

return shadow.remote.runtime.shared.trigger_BANG_(runtime,new cljs.core.Keyword(null,"on-welcome","on-welcome",1895317125));
});
shadow.remote.runtime.shared.ping = (function shadow$remote$runtime$shared$ping(runtime,msg){
return shadow.remote.runtime.shared.reply(runtime,msg,new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"pong","pong",-172484958)], null));
});
shadow.remote.runtime.shared.request_supported_ops = (function shadow$remote$runtime$shared$request_supported_ops(p__37167,msg){
var map__37172 = p__37167;
var map__37172__$1 = cljs.core.__destructure_map(map__37172);
var runtime = map__37172__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37172__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
return shadow.remote.runtime.shared.reply(runtime,msg,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"supported-ops","supported-ops",337914702),new cljs.core.Keyword(null,"ops","ops",1237330063),cljs.core.disj.cljs$core$IFn$_invoke$arity$variadic(cljs.core.set(cljs.core.keys(new cljs.core.Keyword(null,"ops","ops",1237330063).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(state_ref)))),new cljs.core.Keyword(null,"welcome","welcome",-578152123),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"unknown-relay-op","unknown-relay-op",170832753),new cljs.core.Keyword(null,"unknown-op","unknown-op",1900385996),new cljs.core.Keyword(null,"request-supported-ops","request-supported-ops",-1034994502),new cljs.core.Keyword(null,"tool-disconnect","tool-disconnect",189103996)], 0))], null));
});
shadow.remote.runtime.shared.unknown_relay_op = (function shadow$remote$runtime$shared$unknown_relay_op(msg){
return console.warn("unknown-relay-op",msg);
});
shadow.remote.runtime.shared.unknown_op = (function shadow$remote$runtime$shared$unknown_op(msg){
return console.warn("unknown-op",msg);
});
shadow.remote.runtime.shared.add_extension_STAR_ = (function shadow$remote$runtime$shared$add_extension_STAR_(p__37192,key,p__37193){
var map__37194 = p__37192;
var map__37194__$1 = cljs.core.__destructure_map(map__37194);
var state = map__37194__$1;
var extensions = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37194__$1,new cljs.core.Keyword(null,"extensions","extensions",-1103629196));
var map__37195 = p__37193;
var map__37195__$1 = cljs.core.__destructure_map(map__37195);
var spec = map__37195__$1;
var ops = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37195__$1,new cljs.core.Keyword(null,"ops","ops",1237330063));
var transit_write_handlers = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37195__$1,new cljs.core.Keyword(null,"transit-write-handlers","transit-write-handlers",1886308716));
if(cljs.core.contains_QMARK_(extensions,key)){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("extension already registered",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),key,new cljs.core.Keyword(null,"spec","spec",347520401),spec], null));
} else {
}

return cljs.core.reduce_kv((function (state__$1,op_kw,op_handler){
if(cljs.core.truth_(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(state__$1,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ops","ops",1237330063),op_kw], null)))){
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("op already registered",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"key","key",-1516042587),key,new cljs.core.Keyword(null,"op","op",-1882987955),op_kw], null));
} else {
}

return cljs.core.assoc_in(state__$1,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ops","ops",1237330063),op_kw], null),op_handler);
}),cljs.core.assoc_in(state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"extensions","extensions",-1103629196),key], null),spec),ops);
});
shadow.remote.runtime.shared.add_extension = (function shadow$remote$runtime$shared$add_extension(p__37199,key,spec){
var map__37200 = p__37199;
var map__37200__$1 = cljs.core.__destructure_map(map__37200);
var runtime = map__37200__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37200__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(state_ref,shadow.remote.runtime.shared.add_extension_STAR_,key,spec);

var temp__5829__auto___37333 = new cljs.core.Keyword(null,"on-welcome","on-welcome",1895317125).cljs$core$IFn$_invoke$arity$1(spec);
if((temp__5829__auto___37333 == null)){
} else {
var on_welcome_37334 = temp__5829__auto___37333;
if(cljs.core.truth_(new cljs.core.Keyword(null,"welcome","welcome",-578152123).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(state_ref)))){
(on_welcome_37334.cljs$core$IFn$_invoke$arity$0 ? on_welcome_37334.cljs$core$IFn$_invoke$arity$0() : on_welcome_37334.call(null));
} else {
}
}

return runtime;
});
shadow.remote.runtime.shared.add_defaults = (function shadow$remote$runtime$shared$add_defaults(runtime){
return shadow.remote.runtime.shared.add_extension(runtime,new cljs.core.Keyword("shadow.remote.runtime.shared","defaults","shadow.remote.runtime.shared/defaults",-1821257543),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"ops","ops",1237330063),new cljs.core.PersistentArrayMap(null, 5, [new cljs.core.Keyword(null,"welcome","welcome",-578152123),(function (p1__37201_SHARP_){
return shadow.remote.runtime.shared.welcome(runtime,p1__37201_SHARP_);
}),new cljs.core.Keyword(null,"unknown-relay-op","unknown-relay-op",170832753),(function (p1__37202_SHARP_){
return shadow.remote.runtime.shared.unknown_relay_op(p1__37202_SHARP_);
}),new cljs.core.Keyword(null,"unknown-op","unknown-op",1900385996),(function (p1__37203_SHARP_){
return shadow.remote.runtime.shared.unknown_op(p1__37203_SHARP_);
}),new cljs.core.Keyword(null,"ping","ping",-1670114784),(function (p1__37204_SHARP_){
return shadow.remote.runtime.shared.ping(runtime,p1__37204_SHARP_);
}),new cljs.core.Keyword(null,"request-supported-ops","request-supported-ops",-1034994502),(function (p1__37205_SHARP_){
return shadow.remote.runtime.shared.request_supported_ops(runtime,p1__37205_SHARP_);
})], null)], null));
});
shadow.remote.runtime.shared.del_extension_STAR_ = (function shadow$remote$runtime$shared$del_extension_STAR_(state,key){
var ext = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"extensions","extensions",-1103629196),key], null));
if(cljs.core.not(ext)){
return state;
} else {
return cljs.core.reduce_kv((function (state__$1,op_kw,op_handler){
return cljs.core.update_in.cljs$core$IFn$_invoke$arity$4(state__$1,new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ops","ops",1237330063)], null),cljs.core.dissoc,op_kw);
}),cljs.core.update.cljs$core$IFn$_invoke$arity$4(state,new cljs.core.Keyword(null,"extensions","extensions",-1103629196),cljs.core.dissoc,key),new cljs.core.Keyword(null,"ops","ops",1237330063).cljs$core$IFn$_invoke$arity$1(ext));
}
});
shadow.remote.runtime.shared.del_extension = (function shadow$remote$runtime$shared$del_extension(p__37227,key){
var map__37228 = p__37227;
var map__37228__$1 = cljs.core.__destructure_map(map__37228);
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37228__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(state_ref,shadow.remote.runtime.shared.del_extension_STAR_,key);
});
shadow.remote.runtime.shared.unhandled_call_result = (function shadow$remote$runtime$shared$unhandled_call_result(call_config,msg){
return console.warn("unhandled call result",msg,call_config);
});
shadow.remote.runtime.shared.unhandled_client_not_found = (function shadow$remote$runtime$shared$unhandled_client_not_found(p__37235,msg){
var map__37240 = p__37235;
var map__37240__$1 = cljs.core.__destructure_map(map__37240);
var runtime = map__37240__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37240__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
return shadow.remote.runtime.shared.trigger_BANG_.cljs$core$IFn$_invoke$arity$variadic(runtime,new cljs.core.Keyword(null,"on-client-not-found","on-client-not-found",-642452849),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([msg], 0));
});
shadow.remote.runtime.shared.reply_unknown_op = (function shadow$remote$runtime$shared$reply_unknown_op(runtime,msg){
return shadow.remote.runtime.shared.reply(runtime,msg,new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"unknown-op","unknown-op",1900385996),new cljs.core.Keyword(null,"msg","msg",-1386103444),msg], null));
});
shadow.remote.runtime.shared.process = (function shadow$remote$runtime$shared$process(p__37263,p__37264){
var map__37266 = p__37263;
var map__37266__$1 = cljs.core.__destructure_map(map__37266);
var runtime = map__37266__$1;
var state_ref = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37266__$1,new cljs.core.Keyword(null,"state-ref","state-ref",2127874952));
var map__37268 = p__37264;
var map__37268__$1 = cljs.core.__destructure_map(map__37268);
var msg = map__37268__$1;
var op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37268__$1,new cljs.core.Keyword(null,"op","op",-1882987955));
var call_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37268__$1,new cljs.core.Keyword(null,"call-id","call-id",1043012968));
var state = cljs.core.deref(state_ref);
var op_handler = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"ops","ops",1237330063),op], null));
if(cljs.core.truth_(call_id)){
var cfg = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(state,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"call-handlers","call-handlers",386605551),call_id], null));
var call_handler = cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(cfg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"handlers","handlers",79528781),op], null));
if(cljs.core.truth_(call_handler)){
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$variadic(state_ref,cljs.core.update,new cljs.core.Keyword(null,"call-handlers","call-handlers",386605551),cljs.core.dissoc,cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([call_id], 0));

return (call_handler.cljs$core$IFn$_invoke$arity$1 ? call_handler.cljs$core$IFn$_invoke$arity$1(msg) : call_handler.call(null,msg));
} else {
if(cljs.core.truth_(op_handler)){
return (op_handler.cljs$core$IFn$_invoke$arity$1 ? op_handler.cljs$core$IFn$_invoke$arity$1(msg) : op_handler.call(null,msg));
} else {
return shadow.remote.runtime.shared.unhandled_call_result(cfg,msg);

}
}
} else {
if(cljs.core.truth_(op_handler)){
return (op_handler.cljs$core$IFn$_invoke$arity$1 ? op_handler.cljs$core$IFn$_invoke$arity$1(msg) : op_handler.call(null,msg));
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"client-not-found","client-not-found",-1754042614),op)){
return shadow.remote.runtime.shared.unhandled_client_not_found(runtime,msg);
} else {
return shadow.remote.runtime.shared.reply_unknown_op(runtime,msg);

}
}
}
});
shadow.remote.runtime.shared.run_on_idle = (function shadow$remote$runtime$shared$run_on_idle(state_ref){
var seq__37279 = cljs.core.seq(cljs.core.vals(new cljs.core.Keyword(null,"extensions","extensions",-1103629196).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(state_ref))));
var chunk__37281 = null;
var count__37282 = (0);
var i__37283 = (0);
while(true){
if((i__37283 < count__37282)){
var map__37288 = chunk__37281.cljs$core$IIndexed$_nth$arity$2(null,i__37283);
var map__37288__$1 = cljs.core.__destructure_map(map__37288);
var on_idle = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37288__$1,new cljs.core.Keyword(null,"on-idle","on-idle",2044706602));
if(cljs.core.truth_(on_idle)){
(on_idle.cljs$core$IFn$_invoke$arity$0 ? on_idle.cljs$core$IFn$_invoke$arity$0() : on_idle.call(null));


var G__37336 = seq__37279;
var G__37337 = chunk__37281;
var G__37338 = count__37282;
var G__37339 = (i__37283 + (1));
seq__37279 = G__37336;
chunk__37281 = G__37337;
count__37282 = G__37338;
i__37283 = G__37339;
continue;
} else {
var G__37340 = seq__37279;
var G__37341 = chunk__37281;
var G__37342 = count__37282;
var G__37343 = (i__37283 + (1));
seq__37279 = G__37340;
chunk__37281 = G__37341;
count__37282 = G__37342;
i__37283 = G__37343;
continue;
}
} else {
var temp__5825__auto__ = cljs.core.seq(seq__37279);
if(temp__5825__auto__){
var seq__37279__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__37279__$1)){
var c__5548__auto__ = cljs.core.chunk_first(seq__37279__$1);
var G__37344 = cljs.core.chunk_rest(seq__37279__$1);
var G__37345 = c__5548__auto__;
var G__37346 = cljs.core.count(c__5548__auto__);
var G__37347 = (0);
seq__37279 = G__37344;
chunk__37281 = G__37345;
count__37282 = G__37346;
i__37283 = G__37347;
continue;
} else {
var map__37289 = cljs.core.first(seq__37279__$1);
var map__37289__$1 = cljs.core.__destructure_map(map__37289);
var on_idle = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__37289__$1,new cljs.core.Keyword(null,"on-idle","on-idle",2044706602));
if(cljs.core.truth_(on_idle)){
(on_idle.cljs$core$IFn$_invoke$arity$0 ? on_idle.cljs$core$IFn$_invoke$arity$0() : on_idle.call(null));


var G__37348 = cljs.core.next(seq__37279__$1);
var G__37349 = null;
var G__37350 = (0);
var G__37351 = (0);
seq__37279 = G__37348;
chunk__37281 = G__37349;
count__37282 = G__37350;
i__37283 = G__37351;
continue;
} else {
var G__37352 = cljs.core.next(seq__37279__$1);
var G__37353 = null;
var G__37354 = (0);
var G__37355 = (0);
seq__37279 = G__37352;
chunk__37281 = G__37353;
count__37282 = G__37354;
i__37283 = G__37355;
continue;
}
}
} else {
return null;
}
}
break;
}
});

//# sourceMappingURL=shadow.remote.runtime.shared.js.map
