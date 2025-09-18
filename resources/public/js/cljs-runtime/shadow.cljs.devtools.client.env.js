goog.provide('shadow.cljs.devtools.client.env');
goog.scope(function(){
  shadow.cljs.devtools.client.env.goog$module$goog$object = goog.module.get('goog.object');
});
if((typeof shadow !== 'undefined') && (typeof shadow.cljs !== 'undefined') && (typeof shadow.cljs.devtools !== 'undefined') && (typeof shadow.cljs.devtools.client !== 'undefined') && (typeof shadow.cljs.devtools.client.env !== 'undefined') && (typeof shadow.cljs.devtools.client.env.active_modules_ref !== 'undefined')){
} else {
shadow.cljs.devtools.client.env.active_modules_ref = cljs.core.volatile_BANG_(cljs.core.PersistentHashSet.EMPTY);
}
shadow.cljs.devtools.client.env.module_loaded = (function shadow$cljs$devtools$client$env$module_loaded(name){
return shadow.cljs.devtools.client.env.active_modules_ref.cljs$core$IVolatile$_vreset_BANG_$arity$2(null,cljs.core.conj.cljs$core$IFn$_invoke$arity$2(shadow.cljs.devtools.client.env.active_modules_ref.cljs$core$IDeref$_deref$arity$1(null),cljs.core.keyword.cljs$core$IFn$_invoke$arity$1(name)));
});
shadow.cljs.devtools.client.env.module_is_active_QMARK_ = (function shadow$cljs$devtools$client$env$module_is_active_QMARK_(module){
return cljs.core.contains_QMARK_(cljs.core.deref(shadow.cljs.devtools.client.env.active_modules_ref),module);
});
if((typeof shadow !== 'undefined') && (typeof shadow.cljs !== 'undefined') && (typeof shadow.cljs.devtools !== 'undefined') && (typeof shadow.cljs.devtools.client !== 'undefined') && (typeof shadow.cljs.devtools.client.env !== 'undefined') && (typeof shadow.cljs.devtools.client.env.runtime_id !== 'undefined')){
} else {
shadow.cljs.devtools.client.env.runtime_id = cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.random_uuid());
}
/**
 * @define {boolean}
 */
shadow.cljs.devtools.client.env.enabled = goog.define("shadow.cljs.devtools.client.env.enabled",false);
/**
 * @define {boolean}
 */
shadow.cljs.devtools.client.env.log = goog.define("shadow.cljs.devtools.client.env.log",true);
/**
 * @define {boolean}
 */
shadow.cljs.devtools.client.env.autoload = goog.define("shadow.cljs.devtools.client.env.autoload",true);
/**
 * @define {string}
 */
shadow.cljs.devtools.client.env.module_format = goog.define("shadow.cljs.devtools.client.env.module_format","goog");
/**
 * @define {boolean}
 */
shadow.cljs.devtools.client.env.reload_with_state = goog.define("shadow.cljs.devtools.client.env.reload_with_state",false);
/**
 * @define {string}
 */
shadow.cljs.devtools.client.env.build_id = goog.define("shadow.cljs.devtools.client.env.build_id","");
/**
 * @define {string}
 */
shadow.cljs.devtools.client.env.proc_id = goog.define("shadow.cljs.devtools.client.env.proc_id","");
/**
 * @define {number}
 */
shadow.cljs.devtools.client.env.worker_client_id = goog.define("shadow.cljs.devtools.client.env.worker_client_id",(0));
/**
 * @define {string}
 */
shadow.cljs.devtools.client.env.server_host = goog.define("shadow.cljs.devtools.client.env.server_host","");
/**
 * @define {string}
 */
shadow.cljs.devtools.client.env.server_hosts = goog.define("shadow.cljs.devtools.client.env.server_hosts","");
/**
 * @define {number}
 */
shadow.cljs.devtools.client.env.connect_timeout = goog.define("shadow.cljs.devtools.client.env.connect_timeout",(1000));
shadow.cljs.devtools.client.env.selected_host = null;
/**
 * @define {number}
 */
shadow.cljs.devtools.client.env.server_port = goog.define("shadow.cljs.devtools.client.env.server_port",(8200));
/**
 * @define {boolean}
 */
shadow.cljs.devtools.client.env.repl_pprint = goog.define("shadow.cljs.devtools.client.env.repl_pprint",false);
/**
 * @define {boolean}
 */
shadow.cljs.devtools.client.env.use_document_host = goog.define("shadow.cljs.devtools.client.env.use_document_host",true);
/**
 * @define {boolean}
 */
shadow.cljs.devtools.client.env.use_document_protocol = goog.define("shadow.cljs.devtools.client.env.use_document_protocol",false);
/**
 * @define {string}
 */
shadow.cljs.devtools.client.env.devtools_url = goog.define("shadow.cljs.devtools.client.env.devtools_url","");
/**
 * @define {string}
 */
shadow.cljs.devtools.client.env.reload_strategy = goog.define("shadow.cljs.devtools.client.env.reload_strategy","optimized");
/**
 * @define {string}
 */
shadow.cljs.devtools.client.env.server_token = goog.define("shadow.cljs.devtools.client.env.server_token","missing");
/**
 * @define {boolean}
 */
shadow.cljs.devtools.client.env.ssl = goog.define("shadow.cljs.devtools.client.env.ssl",false);
/**
 * @define {boolean}
 */
shadow.cljs.devtools.client.env.ignore_warnings = goog.define("shadow.cljs.devtools.client.env.ignore_warnings",false);
/**
 * @define {string}
 */
shadow.cljs.devtools.client.env.log_style = goog.define("shadow.cljs.devtools.client.env.log_style","font-weight: bold;");
/**
 * @define {string}
 */
shadow.cljs.devtools.client.env.custom_notify_fn = goog.define("shadow.cljs.devtools.client.env.custom_notify_fn","");
shadow.cljs.devtools.client.env.devtools_info = (function shadow$cljs$devtools$client$env$devtools_info(){
return ({"server_port": shadow.cljs.devtools.client.env.server_port, "server_host": shadow.cljs.devtools.client.env.server_host, "build_id": shadow.cljs.devtools.client.env.build_id, "proc_id": shadow.cljs.devtools.client.env.proc_id, "runtime_id": shadow.cljs.devtools.client.env.runtime_id, "ssl": shadow.cljs.devtools.client.env.ssl});
});
shadow.cljs.devtools.client.env.get_server_protocol = (function shadow$cljs$devtools$client$env$get_server_protocol(){
if(cljs.core.truth_((function (){var and__5023__auto__ = shadow.cljs.devtools.client.env.use_document_protocol;
if(and__5023__auto__){
var and__5023__auto____$1 = goog.global.location;
if(cljs.core.truth_(and__5023__auto____$1)){
return cljs.core.seq(goog.global.location.protocol);
} else {
return and__5023__auto____$1;
}
} else {
return and__5023__auto__;
}
})())){
return clojure.string.replace(goog.global.location.protocol,":","");
} else {
return ["http",((shadow.cljs.devtools.client.env.ssl)?"s":null)].join('');
}
});
shadow.cljs.devtools.client.env.get_server_host = (function shadow$cljs$devtools$client$env$get_server_host(){
if(cljs.core.seq(shadow.cljs.devtools.client.env.selected_host)){
return shadow.cljs.devtools.client.env.selected_host;
} else {
if(cljs.core.truth_((function (){var and__5023__auto__ = shadow.cljs.devtools.client.env.use_document_host;
if(and__5023__auto__){
var and__5023__auto____$1 = goog.global.location;
if(cljs.core.truth_(and__5023__auto____$1)){
return cljs.core.seq(goog.global.location.hostname);
} else {
return and__5023__auto____$1;
}
} else {
return and__5023__auto__;
}
})())){
return goog.global.location.hostname;
} else {
if(cljs.core.seq(shadow.cljs.devtools.client.env.server_host)){
return shadow.cljs.devtools.client.env.server_host;
} else {
return "localhost";

}
}
}
});
shadow.cljs.devtools.client.env.get_url_base = (function shadow$cljs$devtools$client$env$get_url_base(){
if(cljs.core.seq(shadow.cljs.devtools.client.env.devtools_url)){
return shadow.cljs.devtools.client.env.devtools_url;
} else {
return [shadow.cljs.devtools.client.env.get_server_protocol(),"://",cljs.core.str.cljs$core$IFn$_invoke$arity$1(shadow.cljs.devtools.client.env.get_server_host()),":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(shadow.cljs.devtools.client.env.server_port)].join('');
}
});
shadow.cljs.devtools.client.env.get_ws_url_base = (function shadow$cljs$devtools$client$env$get_ws_url_base(){
return clojure.string.replace(shadow.cljs.devtools.client.env.get_url_base(),/^http/,"ws");
});
shadow.cljs.devtools.client.env.get_ws_relay_path = (function shadow$cljs$devtools$client$env$get_ws_relay_path(){
return ["/api/remote-relay?server-token=",shadow.cljs.devtools.client.env.server_token].join('');
});
shadow.cljs.devtools.client.env.get_ws_relay_url = (function shadow$cljs$devtools$client$env$get_ws_relay_url(){
return [shadow.cljs.devtools.client.env.get_ws_url_base(),shadow.cljs.devtools.client.env.get_ws_relay_path()].join('');
});
if((typeof shadow !== 'undefined') && (typeof shadow.cljs !== 'undefined') && (typeof shadow.cljs.devtools !== 'undefined') && (typeof shadow.cljs.devtools.client !== 'undefined') && (typeof shadow.cljs.devtools.client.env !== 'undefined') && (typeof shadow.cljs.devtools.client.env.reset_print_fn_ref !== 'undefined')){
} else {
shadow.cljs.devtools.client.env.reset_print_fn_ref = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null);
}
if((typeof shadow !== 'undefined') && (typeof shadow.cljs !== 'undefined') && (typeof shadow.cljs.devtools !== 'undefined') && (typeof shadow.cljs.devtools.client !== 'undefined') && (typeof shadow.cljs.devtools.client.env !== 'undefined') && (typeof shadow.cljs.devtools.client.env.was_print_newline !== 'undefined')){
} else {
shadow.cljs.devtools.client.env.was_print_newline = cljs.core._STAR_print_newline_STAR_;
}
shadow.cljs.devtools.client.env.set_print_fns_BANG_ = (function shadow$cljs$devtools$client$env$set_print_fns_BANG_(msg_fn){
var original_print_fn = cljs.core._STAR_print_fn_STAR_;
var original_print_err_fn = cljs.core._STAR_print_err_fn_STAR_;
(cljs.core._STAR_print_newline_STAR_ = true);

(cljs.core.enable_console_print_BANG_ = (function (){
return null;
}));

cljs.core.reset_BANG_(shadow.cljs.devtools.client.env.reset_print_fn_ref,(function shadow$cljs$devtools$client$env$set_print_fns_BANG__$_reset_print_fns_BANG_(){
(cljs.core._STAR_print_newline_STAR_ = shadow.cljs.devtools.client.env.was_print_newline);

cljs.core.set_print_fn_BANG_(original_print_fn);

return cljs.core.set_print_err_fn_BANG_(original_print_err_fn);
}));

cljs.core.set_print_fn_BANG_((function shadow$cljs$devtools$client$env$set_print_fns_BANG__$_repl_print_fn(s){
(msg_fn.cljs$core$IFn$_invoke$arity$2 ? msg_fn.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"stdout","stdout",-531490018),s) : msg_fn.call(null,new cljs.core.Keyword(null,"stdout","stdout",-531490018),s));

if(cljs.core.truth_((function (){var and__5023__auto__ = original_print_fn;
if(cljs.core.truth_(and__5023__auto__)){
return cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(s,"\n");
} else {
return and__5023__auto__;
}
})())){
return (original_print_fn.cljs$core$IFn$_invoke$arity$1 ? original_print_fn.cljs$core$IFn$_invoke$arity$1(s) : original_print_fn.call(null,s));
} else {
return null;
}
}));

return cljs.core.set_print_err_fn_BANG_((function shadow$cljs$devtools$client$env$set_print_fns_BANG__$_repl_print_err_fn(s){
(msg_fn.cljs$core$IFn$_invoke$arity$2 ? msg_fn.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"stderr","stderr",-1571650309),s) : msg_fn.call(null,new cljs.core.Keyword(null,"stderr","stderr",-1571650309),s));

if(cljs.core.truth_((function (){var and__5023__auto__ = original_print_err_fn;
if(cljs.core.truth_(and__5023__auto__)){
return cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(s,"\n");
} else {
return and__5023__auto__;
}
})())){
return (original_print_err_fn.cljs$core$IFn$_invoke$arity$1 ? original_print_err_fn.cljs$core$IFn$_invoke$arity$1(s) : original_print_err_fn.call(null,s));
} else {
return null;
}
}));
});
shadow.cljs.devtools.client.env.reset_print_fns_BANG_ = (function shadow$cljs$devtools$client$env$reset_print_fns_BANG_(){
var temp__5825__auto__ = cljs.core.deref(shadow.cljs.devtools.client.env.reset_print_fn_ref);
if(cljs.core.truth_(temp__5825__auto__)){
var x = temp__5825__auto__;
(x.cljs$core$IFn$_invoke$arity$0 ? x.cljs$core$IFn$_invoke$arity$0() : x.call(null));

return cljs.core.reset_BANG_(shadow.cljs.devtools.client.env.reset_print_fn_ref,null);
} else {
return null;
}
});
shadow.cljs.devtools.client.env.patch_goog_BANG_ = (function shadow$cljs$devtools$client$env$patch_goog_BANG_(){
(goog.provide = goog.constructNamespace_);

return (goog.require = goog.module.get);
});
shadow.cljs.devtools.client.env.add_warnings_to_info = (function shadow$cljs$devtools$client$env$add_warnings_to_info(p__34292){
var map__34295 = p__34292;
var map__34295__$1 = cljs.core.__destructure_map(map__34295);
var msg = map__34295__$1;
var info = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__34295__$1,new cljs.core.Keyword(null,"info","info",-317069002));
var warnings = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.distinct.cljs$core$IFn$_invoke$arity$1((function (){var iter__5503__auto__ = (function shadow$cljs$devtools$client$env$add_warnings_to_info_$_iter__34298(s__34299){
return (new cljs.core.LazySeq(null,(function (){
var s__34299__$1 = s__34299;
while(true){
var temp__5825__auto__ = cljs.core.seq(s__34299__$1);
if(temp__5825__auto__){
var xs__6385__auto__ = temp__5825__auto__;
var map__34304 = cljs.core.first(xs__6385__auto__);
var map__34304__$1 = cljs.core.__destructure_map(map__34304);
var src = map__34304__$1;
var resource_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__34304__$1,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100));
var warnings = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__34304__$1,new cljs.core.Keyword(null,"warnings","warnings",-735437651));
if(cljs.core.not(new cljs.core.Keyword(null,"from-jar","from-jar",1050932827).cljs$core$IFn$_invoke$arity$1(src))){
var iterys__5499__auto__ = ((function (s__34299__$1,map__34304,map__34304__$1,src,resource_name,warnings,xs__6385__auto__,temp__5825__auto__,map__34295,map__34295__$1,msg,info){
return (function shadow$cljs$devtools$client$env$add_warnings_to_info_$_iter__34298_$_iter__34300(s__34301){
return (new cljs.core.LazySeq(null,((function (s__34299__$1,map__34304,map__34304__$1,src,resource_name,warnings,xs__6385__auto__,temp__5825__auto__,map__34295,map__34295__$1,msg,info){
return (function (){
var s__34301__$1 = s__34301;
while(true){
var temp__5825__auto____$1 = cljs.core.seq(s__34301__$1);
if(temp__5825__auto____$1){
var s__34301__$2 = temp__5825__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__34301__$2)){
var c__5501__auto__ = cljs.core.chunk_first(s__34301__$2);
var size__5502__auto__ = cljs.core.count(c__5501__auto__);
var b__34303 = cljs.core.chunk_buffer(size__5502__auto__);
if((function (){var i__34302 = (0);
while(true){
if((i__34302 < size__5502__auto__)){
var warning = cljs.core._nth(c__5501__auto__,i__34302);
cljs.core.chunk_append(b__34303,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(warning,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100),resource_name));

var G__34481 = (i__34302 + (1));
i__34302 = G__34481;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__34303),shadow$cljs$devtools$client$env$add_warnings_to_info_$_iter__34298_$_iter__34300(cljs.core.chunk_rest(s__34301__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__34303),null);
}
} else {
var warning = cljs.core.first(s__34301__$2);
return cljs.core.cons(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(warning,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100),resource_name),shadow$cljs$devtools$client$env$add_warnings_to_info_$_iter__34298_$_iter__34300(cljs.core.rest(s__34301__$2)));
}
} else {
return null;
}
break;
}
});})(s__34299__$1,map__34304,map__34304__$1,src,resource_name,warnings,xs__6385__auto__,temp__5825__auto__,map__34295,map__34295__$1,msg,info))
,null,null));
});})(s__34299__$1,map__34304,map__34304__$1,src,resource_name,warnings,xs__6385__auto__,temp__5825__auto__,map__34295,map__34295__$1,msg,info))
;
var fs__5500__auto__ = cljs.core.seq(iterys__5499__auto__(warnings));
if(fs__5500__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5500__auto__,shadow$cljs$devtools$client$env$add_warnings_to_info_$_iter__34298(cljs.core.rest(s__34299__$1)));
} else {
var G__34486 = cljs.core.rest(s__34299__$1);
s__34299__$1 = G__34486;
continue;
}
} else {
var G__34487 = cljs.core.rest(s__34299__$1);
s__34299__$1 = G__34487;
continue;
}
} else {
return null;
}
break;
}
}),null,null));
});
return iter__5503__auto__(new cljs.core.Keyword(null,"sources","sources",-321166424).cljs$core$IFn$_invoke$arity$1(info));
})()));
return cljs.core.assoc_in(msg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"info","info",-317069002),new cljs.core.Keyword(null,"warnings","warnings",-735437651)], null),warnings);
});
shadow.cljs.devtools.client.env.custom_notify_types = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"build-complete","build-complete",-501868472),null,new cljs.core.Keyword(null,"build-init","build-init",-1115755563),null,new cljs.core.Keyword(null,"build-failure","build-failure",-2107487466),null,new cljs.core.Keyword(null,"build-start","build-start",-959649480),null], null), null);
shadow.cljs.devtools.client.env.run_custom_notify_BANG_ = (function shadow$cljs$devtools$client$env$run_custom_notify_BANG_(msg){
if(cljs.core.seq(shadow.cljs.devtools.client.env.custom_notify_fn)){
var fn = goog.getObjectByName(shadow.cljs.devtools.client.env.custom_notify_fn,$CLJS);
if((!(cljs.core.fn_QMARK_(fn)))){
return console.warn("couldn't find custom :build-notify",shadow.cljs.devtools.client.env.custom_notify_fn);
} else {
try{return (fn.cljs$core$IFn$_invoke$arity$1 ? fn.cljs$core$IFn$_invoke$arity$1(msg) : fn.call(null,msg));
}catch (e34310){var e = e34310;
console.error("Failed to run custom :build-notify",shadow.cljs.devtools.client.env.custom_notify_fn);

return console.error(e);
}}
} else {
return null;
}
});
shadow.cljs.devtools.client.env.make_task_fn = (function shadow$cljs$devtools$client$env$make_task_fn(p__34315,p__34316){
var map__34317 = p__34315;
var map__34317__$1 = cljs.core.__destructure_map(map__34317);
var log_missing_fn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__34317__$1,new cljs.core.Keyword(null,"log-missing-fn","log-missing-fn",732676765));
var log_call_async = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__34317__$1,new cljs.core.Keyword(null,"log-call-async","log-call-async",183826192));
var log_call = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__34317__$1,new cljs.core.Keyword(null,"log-call","log-call",412404391));
var map__34318 = p__34316;
var map__34318__$1 = cljs.core.__destructure_map(map__34318);
var fn_sym = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__34318__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_str = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__34318__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var async = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__34318__$1,new cljs.core.Keyword(null,"async","async",1050769601));
return (function (next){
try{var fn_obj = goog.getObjectByName(fn_str,$CLJS);
if((fn_obj == null)){
if(cljs.core.truth_(log_missing_fn)){
(log_missing_fn.cljs$core$IFn$_invoke$arity$1 ? log_missing_fn.cljs$core$IFn$_invoke$arity$1(fn_sym) : log_missing_fn.call(null,fn_sym));
} else {
}

return (next.cljs$core$IFn$_invoke$arity$0 ? next.cljs$core$IFn$_invoke$arity$0() : next.call(null));
} else {
if(cljs.core.truth_(async)){
if(cljs.core.truth_(log_call_async)){
(log_call_async.cljs$core$IFn$_invoke$arity$1 ? log_call_async.cljs$core$IFn$_invoke$arity$1(fn_sym) : log_call_async.call(null,fn_sym));
} else {
}

return (fn_obj.cljs$core$IFn$_invoke$arity$1 ? fn_obj.cljs$core$IFn$_invoke$arity$1(next) : fn_obj.call(null,next));
} else {
if(cljs.core.truth_(log_call)){
(log_call.cljs$core$IFn$_invoke$arity$1 ? log_call.cljs$core$IFn$_invoke$arity$1(fn_sym) : log_call.call(null,fn_sym));
} else {
}

(fn_obj.cljs$core$IFn$_invoke$arity$0 ? fn_obj.cljs$core$IFn$_invoke$arity$0() : fn_obj.call(null));

return (next.cljs$core$IFn$_invoke$arity$0 ? next.cljs$core$IFn$_invoke$arity$0() : next.call(null));

}
}
}catch (e34322){var ex = e34322;
console.warn("error when calling lifecycle function",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym),ex);

return (next.cljs$core$IFn$_invoke$arity$0 ? next.cljs$core$IFn$_invoke$arity$0() : next.call(null));
}});
});
shadow.cljs.devtools.client.env.do_js_reload_STAR_ = (function shadow$cljs$devtools$client$env$do_js_reload_STAR_(failure_fn,p__34328){
var vec__34329 = p__34328;
var seq__34330 = cljs.core.seq(vec__34329);
var first__34331 = cljs.core.first(seq__34330);
var seq__34330__$1 = cljs.core.next(seq__34330);
var task = first__34331;
var remaining_tasks = seq__34330__$1;
if(cljs.core.truth_(task)){
try{var G__34333 = (function (){
return (shadow.cljs.devtools.client.env.do_js_reload_STAR_.cljs$core$IFn$_invoke$arity$2 ? shadow.cljs.devtools.client.env.do_js_reload_STAR_.cljs$core$IFn$_invoke$arity$2(failure_fn,remaining_tasks) : shadow.cljs.devtools.client.env.do_js_reload_STAR_.call(null,failure_fn,remaining_tasks));
});
return (task.cljs$core$IFn$_invoke$arity$1 ? task.cljs$core$IFn$_invoke$arity$1(G__34333) : task.call(null,G__34333));
}catch (e34332){var e = e34332;
return (failure_fn.cljs$core$IFn$_invoke$arity$3 ? failure_fn.cljs$core$IFn$_invoke$arity$3(e,task,remaining_tasks) : failure_fn.call(null,e,task,remaining_tasks));
}} else {
return null;
}
});
/**
 * should pass the :build-complete message and an additional callback
 * which performs the actual loading of the code (sync)
 * will call all before/after callbacks in order
 */
shadow.cljs.devtools.client.env.do_js_reload = (function shadow$cljs$devtools$client$env$do_js_reload(var_args){
var G__34342 = arguments.length;
switch (G__34342) {
case 2:
return shadow.cljs.devtools.client.env.do_js_reload.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return shadow.cljs.devtools.client.env.do_js_reload.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return shadow.cljs.devtools.client.env.do_js_reload.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.cljs.devtools.client.env.do_js_reload.cljs$core$IFn$_invoke$arity$2 = (function (msg,load_code_fn){
return shadow.cljs.devtools.client.env.do_js_reload.cljs$core$IFn$_invoke$arity$3(msg,load_code_fn,(function (){
return null;
}));
}));

(shadow.cljs.devtools.client.env.do_js_reload.cljs$core$IFn$_invoke$arity$3 = (function (msg,load_code_fn,complete_fn){
return shadow.cljs.devtools.client.env.do_js_reload.cljs$core$IFn$_invoke$arity$4(msg,load_code_fn,complete_fn,(function (error,task,remaining){
return console.warn("JS reload failed",error);
}));
}));

(shadow.cljs.devtools.client.env.do_js_reload.cljs$core$IFn$_invoke$arity$4 = (function (p__34378,load_code_fn,complete_fn,failure_fn){
var map__34379 = p__34378;
var map__34379__$1 = cljs.core.__destructure_map(map__34379);
var msg = map__34379__$1;
var reload_info = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__34379__$1,new cljs.core.Keyword(null,"reload-info","reload-info",1648088086));
var load_tasks = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.conj.cljs$core$IFn$_invoke$arity$2(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.reverse(cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__34334_SHARP_){
return shadow.cljs.devtools.client.env.make_task_fn(msg,p1__34334_SHARP_);
}),new cljs.core.Keyword(null,"before-load","before-load",-2060117064).cljs$core$IFn$_invoke$arity$1(reload_info)))),load_code_fn),cljs.core.map.cljs$core$IFn$_invoke$arity$1((function (p1__34335_SHARP_){
return shadow.cljs.devtools.client.env.make_task_fn(msg,p1__34335_SHARP_);
})),new cljs.core.Keyword(null,"after-load","after-load",-1278503285).cljs$core$IFn$_invoke$arity$1(reload_info)),(function (next){
(complete_fn.cljs$core$IFn$_invoke$arity$0 ? complete_fn.cljs$core$IFn$_invoke$arity$0() : complete_fn.call(null));

return (next.cljs$core$IFn$_invoke$arity$0 ? next.cljs$core$IFn$_invoke$arity$0() : next.call(null));
}));
return shadow.cljs.devtools.client.env.do_js_reload_STAR_(failure_fn,load_tasks);
}));

(shadow.cljs.devtools.client.env.do_js_reload.cljs$lang$maxFixedArity = 4);

shadow.cljs.devtools.client.env.before_load_src = (function shadow$cljs$devtools$client$env$before_load_src(p__34386){
var map__34387 = p__34386;
var map__34387__$1 = cljs.core.__destructure_map(map__34387);
var src = map__34387__$1;
var type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__34387__$1,new cljs.core.Keyword(null,"type","type",1174270348));
var ns = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__34387__$1,new cljs.core.Keyword(null,"ns","ns",441598760));
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"cljs","cljs",1492417629),type)){
var seq__34388 = cljs.core.seq(goog.global.SHADOW_NS_RESET);
var chunk__34389 = null;
var count__34390 = (0);
var i__34391 = (0);
while(true){
if((i__34391 < count__34390)){
var x = chunk__34389.cljs$core$IIndexed$_nth$arity$2(null,i__34391);
(x.cljs$core$IFn$_invoke$arity$1 ? x.cljs$core$IFn$_invoke$arity$1(ns) : x.call(null,ns));


var G__34534 = seq__34388;
var G__34535 = chunk__34389;
var G__34536 = count__34390;
var G__34537 = (i__34391 + (1));
seq__34388 = G__34534;
chunk__34389 = G__34535;
count__34390 = G__34536;
i__34391 = G__34537;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__34388);
if(temp__5825__auto__){
var seq__34388__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__34388__$1)){
var c__5548__auto__ = cljs.core.chunk_first(seq__34388__$1);
var G__34538 = cljs.core.chunk_rest(seq__34388__$1);
var G__34539 = c__5548__auto__;
var G__34540 = cljs.core.count(c__5548__auto__);
var G__34541 = (0);
seq__34388 = G__34538;
chunk__34389 = G__34539;
count__34390 = G__34540;
i__34391 = G__34541;
continue;
} else {
var x = cljs.core.first(seq__34388__$1);
(x.cljs$core$IFn$_invoke$arity$1 ? x.cljs$core$IFn$_invoke$arity$1(ns) : x.call(null,ns));


var G__34545 = cljs.core.next(seq__34388__$1);
var G__34546 = null;
var G__34547 = (0);
var G__34548 = (0);
seq__34388 = G__34545;
chunk__34389 = G__34546;
count__34390 = G__34547;
i__34391 = G__34548;
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
shadow.cljs.devtools.client.env.goog_is_loaded_QMARK_ = (function shadow$cljs$devtools$client$env$goog_is_loaded_QMARK_(name){
return $CLJS.SHADOW_ENV.isLoaded(name);
});
shadow.cljs.devtools.client.env.goog_base_rc = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword("shadow.build.classpath","resource","shadow.build.classpath/resource",-879517823),"goog/base.js"], null);
shadow.cljs.devtools.client.env.src_is_loaded_QMARK_ = (function shadow$cljs$devtools$client$env$src_is_loaded_QMARK_(p__34402){
var map__34403 = p__34402;
var map__34403__$1 = cljs.core.__destructure_map(map__34403);
var src = map__34403__$1;
var resource_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__34403__$1,new cljs.core.Keyword(null,"resource-id","resource-id",-1308422582));
var output_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__34403__$1,new cljs.core.Keyword(null,"output-name","output-name",-1769107767));
var or__5025__auto__ = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(shadow.cljs.devtools.client.env.goog_base_rc,resource_id);
if(or__5025__auto__){
return or__5025__auto__;
} else {
return shadow.cljs.devtools.client.env.goog_is_loaded_QMARK_(output_name);
}
});
shadow.cljs.devtools.client.env.prefilter_sources = (function shadow$cljs$devtools$client$env$prefilter_sources(reload_info,sources){
return cljs.core.remove.cljs$core$IFn$_invoke$arity$2((function (p__34408){
var map__34409 = p__34408;
var map__34409__$1 = cljs.core.__destructure_map(map__34409);
var ns = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__34409__$1,new cljs.core.Keyword(null,"ns","ns",441598760));
return cljs.core.contains_QMARK_(new cljs.core.Keyword(null,"never-load","never-load",1300896819).cljs$core$IFn$_invoke$arity$1(reload_info),ns);
}),cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p__34410){
var map__34411 = p__34410;
var map__34411__$1 = cljs.core.__destructure_map(map__34411);
var rc = map__34411__$1;
var module__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__34411__$1,new cljs.core.Keyword(null,"module","module",1424618191));
return ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("js",shadow.cljs.devtools.client.env.module_format)) || (shadow.cljs.devtools.client.env.module_is_active_QMARK_(module__$1)));
}),sources));
});
shadow.cljs.devtools.client.env.filter_sources_to_get_optimized = (function shadow$cljs$devtools$client$env$filter_sources_to_get_optimized(p__34412,reload_info){
var map__34413 = p__34412;
var map__34413__$1 = cljs.core.__destructure_map(map__34413);
var info = map__34413__$1;
var sources = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__34413__$1,new cljs.core.Keyword(null,"sources","sources",-321166424));
var compiled = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__34413__$1,new cljs.core.Keyword(null,"compiled","compiled",850043082));
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.filter.cljs$core$IFn$_invoke$arity$2((function (p__34414){
var map__34415 = p__34414;
var map__34415__$1 = cljs.core.__destructure_map(map__34415);
var src = map__34415__$1;
var ns = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__34415__$1,new cljs.core.Keyword(null,"ns","ns",441598760));
var resource_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__34415__$1,new cljs.core.Keyword(null,"resource-id","resource-id",-1308422582));
return ((cljs.core.contains_QMARK_(new cljs.core.Keyword(null,"always-load","always-load",66405637).cljs$core$IFn$_invoke$arity$1(reload_info),ns)) || (((cljs.core.not(shadow.cljs.devtools.client.env.src_is_loaded_QMARK_(src))) || (((cljs.core.contains_QMARK_(compiled,resource_id)) && (cljs.core.not(new cljs.core.Keyword(null,"from-jar","from-jar",1050932827).cljs$core$IFn$_invoke$arity$1(src))))))));
}),shadow.cljs.devtools.client.env.prefilter_sources(reload_info,sources)));
});
shadow.cljs.devtools.client.env.filter_sources_to_get_full = (function shadow$cljs$devtools$client$env$filter_sources_to_get_full(p__34423,reload_info){
var map__34424 = p__34423;
var map__34424__$1 = cljs.core.__destructure_map(map__34424);
var info = map__34424__$1;
var sources = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__34424__$1,new cljs.core.Keyword(null,"sources","sources",-321166424));
var compiled = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__34424__$1,new cljs.core.Keyword(null,"compiled","compiled",850043082));
var affected = cljs.core.PersistentHashSet.EMPTY;
var sources_to_get = cljs.core.PersistentVector.EMPTY;
var G__34428 = shadow.cljs.devtools.client.env.prefilter_sources(reload_info,sources);
var vec__34429 = G__34428;
var seq__34430 = cljs.core.seq(vec__34429);
var first__34431 = cljs.core.first(seq__34430);
var seq__34430__$1 = cljs.core.next(seq__34430);
var src = first__34431;
var more = seq__34430__$1;
var affected__$1 = affected;
var sources_to_get__$1 = sources_to_get;
var G__34428__$1 = G__34428;
while(true){
var affected__$2 = affected__$1;
var sources_to_get__$2 = sources_to_get__$1;
var vec__34441 = G__34428__$1;
var seq__34442 = cljs.core.seq(vec__34441);
var first__34443 = cljs.core.first(seq__34442);
var seq__34442__$1 = cljs.core.next(seq__34442);
var src__$1 = first__34443;
var more__$1 = seq__34442__$1;
if(cljs.core.not(src__$1)){
return sources_to_get__$2;
} else {
var map__34444 = src__$1;
var map__34444__$1 = cljs.core.__destructure_map(map__34444);
var ns = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__34444__$1,new cljs.core.Keyword(null,"ns","ns",441598760));
var resource_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__34444__$1,new cljs.core.Keyword(null,"resource-id","resource-id",-1308422582));
var deps = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__34444__$1,new cljs.core.Keyword(null,"deps","deps",1883360319));
var provides = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__34444__$1,new cljs.core.Keyword(null,"provides","provides",-1634397992));
var should_reload_QMARK_ = (function (){var or__5025__auto__ = cljs.core.contains_QMARK_(new cljs.core.Keyword(null,"always-load","always-load",66405637).cljs$core$IFn$_invoke$arity$1(reload_info),ns);
if(or__5025__auto__){
return or__5025__auto__;
} else {
var or__5025__auto____$1 = cljs.core.not(shadow.cljs.devtools.client.env.src_is_loaded_QMARK_(src__$1));
if(or__5025__auto____$1){
return or__5025__auto____$1;
} else {
var and__5023__auto__ = (function (){var or__5025__auto____$2 = cljs.core.contains_QMARK_(compiled,resource_id);
if(or__5025__auto____$2){
return or__5025__auto____$2;
} else {
return cljs.core.some(affected__$2,deps);
}
})();
if(cljs.core.truth_(and__5023__auto__)){
return cljs.core.not(new cljs.core.Keyword(null,"from-jar","from-jar",1050932827).cljs$core$IFn$_invoke$arity$1(src__$1));
} else {
return and__5023__auto__;
}
}
}
})();
if(cljs.core.not(should_reload_QMARK_)){
var G__34555 = affected__$2;
var G__34556 = sources_to_get__$2;
var G__34557 = more__$1;
affected__$1 = G__34555;
sources_to_get__$1 = G__34556;
G__34428__$1 = G__34557;
continue;
} else {
var G__34558 = clojure.set.union.cljs$core$IFn$_invoke$arity$2(affected__$2,provides);
var G__34559 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(sources_to_get__$2,src__$1);
var G__34560 = more__$1;
affected__$1 = G__34558;
sources_to_get__$1 = G__34559;
G__34428__$1 = G__34560;
continue;
}
}
break;
}
});
shadow.cljs.devtools.client.env.filter_reload_sources = (function shadow$cljs$devtools$client$env$filter_reload_sources(info,reload_info){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("full",shadow.cljs.devtools.client.env.reload_strategy)){
return shadow.cljs.devtools.client.env.filter_sources_to_get_full(info,reload_info);
} else {
return shadow.cljs.devtools.client.env.filter_sources_to_get_optimized(info,reload_info);
}
});

//# sourceMappingURL=shadow.cljs.devtools.client.env.js.map
