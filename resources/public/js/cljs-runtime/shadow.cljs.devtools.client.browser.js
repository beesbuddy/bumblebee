goog.provide('shadow.cljs.devtools.client.browser');
shadow.cljs.devtools.client.browser.devtools_msg = (function shadow$cljs$devtools$client$browser$devtools_msg(var_args){
var args__5755__auto__ = [];
var len__5749__auto___42159 = arguments.length;
var i__5750__auto___42160 = (0);
while(true){
if((i__5750__auto___42160 < len__5749__auto___42159)){
args__5755__auto__.push((arguments[i__5750__auto___42160]));

var G__42161 = (i__5750__auto___42160 + (1));
i__5750__auto___42160 = G__42161;
continue;
} else {
}
break;
}

var argseq__5756__auto__ = ((((1) < args__5755__auto__.length))?(new cljs.core.IndexedSeq(args__5755__auto__.slice((1)),(0),null)):null);
return shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5756__auto__);
});

(shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic = (function (msg,args){
if(shadow.cljs.devtools.client.env.log){
if(cljs.core.seq(shadow.cljs.devtools.client.env.log_style)){
return console.log.apply(console,cljs.core.into_array.cljs$core$IFn$_invoke$arity$1(cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [["%cshadow-cljs: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(msg)].join(''),shadow.cljs.devtools.client.env.log_style], null),args)));
} else {
return console.log.apply(console,cljs.core.into_array.cljs$core$IFn$_invoke$arity$1(cljs.core.into.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [["shadow-cljs: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(msg)].join('')], null),args)));
}
} else {
return null;
}
}));

(shadow.cljs.devtools.client.browser.devtools_msg.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(shadow.cljs.devtools.client.browser.devtools_msg.cljs$lang$applyTo = (function (seq41479){
var G__41480 = cljs.core.first(seq41479);
var seq41479__$1 = cljs.core.next(seq41479);
var self__5734__auto__ = this;
return self__5734__auto__.cljs$core$IFn$_invoke$arity$variadic(G__41480,seq41479__$1);
}));

shadow.cljs.devtools.client.browser.script_eval = (function shadow$cljs$devtools$client$browser$script_eval(code){
return goog.globalEval(code);
});
shadow.cljs.devtools.client.browser.do_js_load = (function shadow$cljs$devtools$client$browser$do_js_load(sources){
var seq__41496 = cljs.core.seq(sources);
var chunk__41497 = null;
var count__41498 = (0);
var i__41499 = (0);
while(true){
if((i__41499 < count__41498)){
var map__41515 = chunk__41497.cljs$core$IIndexed$_nth$arity$2(null,i__41499);
var map__41515__$1 = cljs.core.__destructure_map(map__41515);
var src = map__41515__$1;
var resource_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41515__$1,new cljs.core.Keyword(null,"resource-id","resource-id",-1308422582));
var output_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41515__$1,new cljs.core.Keyword(null,"output-name","output-name",-1769107767));
var resource_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41515__$1,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100));
var js = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41515__$1,new cljs.core.Keyword(null,"js","js",1768080579));
$CLJS.SHADOW_ENV.setLoaded(output_name);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load JS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([resource_name], 0));

shadow.cljs.devtools.client.env.before_load_src(src);

try{shadow.cljs.devtools.client.browser.script_eval([cljs.core.str.cljs$core$IFn$_invoke$arity$1(js),"\n//# sourceURL=",cljs.core.str.cljs$core$IFn$_invoke$arity$1($CLJS.SHADOW_ENV.scriptBase),cljs.core.str.cljs$core$IFn$_invoke$arity$1(output_name)].join(''));
}catch (e41516){var e_42164 = e41516;
if(shadow.cljs.devtools.client.env.log){
console.error(["Failed to load ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name)].join(''),e_42164);
} else {
}

throw (new Error(["Failed to load ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name),": ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(e_42164.message)].join('')));
}

var G__42165 = seq__41496;
var G__42166 = chunk__41497;
var G__42167 = count__41498;
var G__42168 = (i__41499 + (1));
seq__41496 = G__42165;
chunk__41497 = G__42166;
count__41498 = G__42167;
i__41499 = G__42168;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__41496);
if(temp__5825__auto__){
var seq__41496__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__41496__$1)){
var c__5548__auto__ = cljs.core.chunk_first(seq__41496__$1);
var G__42169 = cljs.core.chunk_rest(seq__41496__$1);
var G__42170 = c__5548__auto__;
var G__42171 = cljs.core.count(c__5548__auto__);
var G__42172 = (0);
seq__41496 = G__42169;
chunk__41497 = G__42170;
count__41498 = G__42171;
i__41499 = G__42172;
continue;
} else {
var map__41519 = cljs.core.first(seq__41496__$1);
var map__41519__$1 = cljs.core.__destructure_map(map__41519);
var src = map__41519__$1;
var resource_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41519__$1,new cljs.core.Keyword(null,"resource-id","resource-id",-1308422582));
var output_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41519__$1,new cljs.core.Keyword(null,"output-name","output-name",-1769107767));
var resource_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41519__$1,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100));
var js = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41519__$1,new cljs.core.Keyword(null,"js","js",1768080579));
$CLJS.SHADOW_ENV.setLoaded(output_name);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load JS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([resource_name], 0));

shadow.cljs.devtools.client.env.before_load_src(src);

try{shadow.cljs.devtools.client.browser.script_eval([cljs.core.str.cljs$core$IFn$_invoke$arity$1(js),"\n//# sourceURL=",cljs.core.str.cljs$core$IFn$_invoke$arity$1($CLJS.SHADOW_ENV.scriptBase),cljs.core.str.cljs$core$IFn$_invoke$arity$1(output_name)].join(''));
}catch (e41525){var e_42173 = e41525;
if(shadow.cljs.devtools.client.env.log){
console.error(["Failed to load ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name)].join(''),e_42173);
} else {
}

throw (new Error(["Failed to load ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name),": ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(e_42173.message)].join('')));
}

var G__42176 = cljs.core.next(seq__41496__$1);
var G__42177 = null;
var G__42178 = (0);
var G__42179 = (0);
seq__41496 = G__42176;
chunk__41497 = G__42177;
count__41498 = G__42178;
i__41499 = G__42179;
continue;
}
} else {
return null;
}
}
break;
}
});
shadow.cljs.devtools.client.browser.do_js_reload = (function shadow$cljs$devtools$client$browser$do_js_reload(msg,sources,complete_fn,failure_fn){
return shadow.cljs.devtools.client.env.do_js_reload.cljs$core$IFn$_invoke$arity$4(cljs.core.assoc.cljs$core$IFn$_invoke$arity$variadic(msg,new cljs.core.Keyword(null,"log-missing-fn","log-missing-fn",732676765),(function (fn_sym){
return null;
}),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"log-call-async","log-call-async",183826192),(function (fn_sym){
return shadow.cljs.devtools.client.browser.devtools_msg(["call async ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym)].join(''));
}),new cljs.core.Keyword(null,"log-call","log-call",412404391),(function (fn_sym){
return shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym)].join(''));
})], 0)),(function (next){
shadow.cljs.devtools.client.browser.do_js_load(sources);

return (next.cljs$core$IFn$_invoke$arity$0 ? next.cljs$core$IFn$_invoke$arity$0() : next.call(null));
}),complete_fn,failure_fn);
});
/**
 * when (require '["some-str" :as x]) is done at the REPL we need to manually call the shadow.js.require for it
 * since the file only adds the shadow$provide. only need to do this for shadow-js.
 */
shadow.cljs.devtools.client.browser.do_js_requires = (function shadow$cljs$devtools$client$browser$do_js_requires(js_requires){
var seq__41536 = cljs.core.seq(js_requires);
var chunk__41537 = null;
var count__41538 = (0);
var i__41539 = (0);
while(true){
if((i__41539 < count__41538)){
var js_ns = chunk__41537.cljs$core$IIndexed$_nth$arity$2(null,i__41539);
var require_str_42181 = ["var ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(js_ns)," = shadow.js.require(\"",cljs.core.str.cljs$core$IFn$_invoke$arity$1(js_ns),"\");"].join('');
shadow.cljs.devtools.client.browser.script_eval(require_str_42181);


var G__42182 = seq__41536;
var G__42183 = chunk__41537;
var G__42184 = count__41538;
var G__42185 = (i__41539 + (1));
seq__41536 = G__42182;
chunk__41537 = G__42183;
count__41538 = G__42184;
i__41539 = G__42185;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__41536);
if(temp__5825__auto__){
var seq__41536__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__41536__$1)){
var c__5548__auto__ = cljs.core.chunk_first(seq__41536__$1);
var G__42189 = cljs.core.chunk_rest(seq__41536__$1);
var G__42190 = c__5548__auto__;
var G__42191 = cljs.core.count(c__5548__auto__);
var G__42192 = (0);
seq__41536 = G__42189;
chunk__41537 = G__42190;
count__41538 = G__42191;
i__41539 = G__42192;
continue;
} else {
var js_ns = cljs.core.first(seq__41536__$1);
var require_str_42195 = ["var ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(js_ns)," = shadow.js.require(\"",cljs.core.str.cljs$core$IFn$_invoke$arity$1(js_ns),"\");"].join('');
shadow.cljs.devtools.client.browser.script_eval(require_str_42195);


var G__42196 = cljs.core.next(seq__41536__$1);
var G__42197 = null;
var G__42198 = (0);
var G__42199 = (0);
seq__41536 = G__42196;
chunk__41537 = G__42197;
count__41538 = G__42198;
i__41539 = G__42199;
continue;
}
} else {
return null;
}
}
break;
}
});
shadow.cljs.devtools.client.browser.handle_build_complete = (function shadow$cljs$devtools$client$browser$handle_build_complete(runtime,p__41554){
var map__41557 = p__41554;
var map__41557__$1 = cljs.core.__destructure_map(map__41557);
var msg = map__41557__$1;
var info = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41557__$1,new cljs.core.Keyword(null,"info","info",-317069002));
var reload_info = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41557__$1,new cljs.core.Keyword(null,"reload-info","reload-info",1648088086));
var warnings = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.distinct.cljs$core$IFn$_invoke$arity$1((function (){var iter__5503__auto__ = (function shadow$cljs$devtools$client$browser$handle_build_complete_$_iter__41561(s__41562){
return (new cljs.core.LazySeq(null,(function (){
var s__41562__$1 = s__41562;
while(true){
var temp__5825__auto__ = cljs.core.seq(s__41562__$1);
if(temp__5825__auto__){
var xs__6385__auto__ = temp__5825__auto__;
var map__41568 = cljs.core.first(xs__6385__auto__);
var map__41568__$1 = cljs.core.__destructure_map(map__41568);
var src = map__41568__$1;
var resource_name = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41568__$1,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100));
var warnings = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41568__$1,new cljs.core.Keyword(null,"warnings","warnings",-735437651));
if(cljs.core.not(new cljs.core.Keyword(null,"from-jar","from-jar",1050932827).cljs$core$IFn$_invoke$arity$1(src))){
var iterys__5499__auto__ = ((function (s__41562__$1,map__41568,map__41568__$1,src,resource_name,warnings,xs__6385__auto__,temp__5825__auto__,map__41557,map__41557__$1,msg,info,reload_info){
return (function shadow$cljs$devtools$client$browser$handle_build_complete_$_iter__41561_$_iter__41563(s__41564){
return (new cljs.core.LazySeq(null,((function (s__41562__$1,map__41568,map__41568__$1,src,resource_name,warnings,xs__6385__auto__,temp__5825__auto__,map__41557,map__41557__$1,msg,info,reload_info){
return (function (){
var s__41564__$1 = s__41564;
while(true){
var temp__5825__auto____$1 = cljs.core.seq(s__41564__$1);
if(temp__5825__auto____$1){
var s__41564__$2 = temp__5825__auto____$1;
if(cljs.core.chunked_seq_QMARK_(s__41564__$2)){
var c__5501__auto__ = cljs.core.chunk_first(s__41564__$2);
var size__5502__auto__ = cljs.core.count(c__5501__auto__);
var b__41566 = cljs.core.chunk_buffer(size__5502__auto__);
if((function (){var i__41565 = (0);
while(true){
if((i__41565 < size__5502__auto__)){
var warning = cljs.core._nth(c__5501__auto__,i__41565);
cljs.core.chunk_append(b__41566,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(warning,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100),resource_name));

var G__42201 = (i__41565 + (1));
i__41565 = G__42201;
continue;
} else {
return true;
}
break;
}
})()){
return cljs.core.chunk_cons(cljs.core.chunk(b__41566),shadow$cljs$devtools$client$browser$handle_build_complete_$_iter__41561_$_iter__41563(cljs.core.chunk_rest(s__41564__$2)));
} else {
return cljs.core.chunk_cons(cljs.core.chunk(b__41566),null);
}
} else {
var warning = cljs.core.first(s__41564__$2);
return cljs.core.cons(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(warning,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100),resource_name),shadow$cljs$devtools$client$browser$handle_build_complete_$_iter__41561_$_iter__41563(cljs.core.rest(s__41564__$2)));
}
} else {
return null;
}
break;
}
});})(s__41562__$1,map__41568,map__41568__$1,src,resource_name,warnings,xs__6385__auto__,temp__5825__auto__,map__41557,map__41557__$1,msg,info,reload_info))
,null,null));
});})(s__41562__$1,map__41568,map__41568__$1,src,resource_name,warnings,xs__6385__auto__,temp__5825__auto__,map__41557,map__41557__$1,msg,info,reload_info))
;
var fs__5500__auto__ = cljs.core.seq(iterys__5499__auto__(warnings));
if(fs__5500__auto__){
return cljs.core.concat.cljs$core$IFn$_invoke$arity$2(fs__5500__auto__,shadow$cljs$devtools$client$browser$handle_build_complete_$_iter__41561(cljs.core.rest(s__41562__$1)));
} else {
var G__42202 = cljs.core.rest(s__41562__$1);
s__41562__$1 = G__42202;
continue;
}
} else {
var G__42203 = cljs.core.rest(s__41562__$1);
s__41562__$1 = G__42203;
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
if(shadow.cljs.devtools.client.env.log){
var seq__41582_42204 = cljs.core.seq(warnings);
var chunk__41583_42205 = null;
var count__41584_42206 = (0);
var i__41585_42207 = (0);
while(true){
if((i__41585_42207 < count__41584_42206)){
var map__41590_42208 = chunk__41583_42205.cljs$core$IIndexed$_nth$arity$2(null,i__41585_42207);
var map__41590_42209__$1 = cljs.core.__destructure_map(map__41590_42208);
var w_42210 = map__41590_42209__$1;
var msg_42211__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41590_42209__$1,new cljs.core.Keyword(null,"msg","msg",-1386103444));
var line_42212 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41590_42209__$1,new cljs.core.Keyword(null,"line","line",212345235));
var column_42213 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41590_42209__$1,new cljs.core.Keyword(null,"column","column",2078222095));
var resource_name_42214 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41590_42209__$1,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100));
console.warn(["BUILD-WARNING in ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name_42214)," at [",cljs.core.str.cljs$core$IFn$_invoke$arity$1(line_42212),":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(column_42213),"]\n\t",cljs.core.str.cljs$core$IFn$_invoke$arity$1(msg_42211__$1)].join(''));


var G__42215 = seq__41582_42204;
var G__42216 = chunk__41583_42205;
var G__42217 = count__41584_42206;
var G__42218 = (i__41585_42207 + (1));
seq__41582_42204 = G__42215;
chunk__41583_42205 = G__42216;
count__41584_42206 = G__42217;
i__41585_42207 = G__42218;
continue;
} else {
var temp__5825__auto___42219 = cljs.core.seq(seq__41582_42204);
if(temp__5825__auto___42219){
var seq__41582_42220__$1 = temp__5825__auto___42219;
if(cljs.core.chunked_seq_QMARK_(seq__41582_42220__$1)){
var c__5548__auto___42221 = cljs.core.chunk_first(seq__41582_42220__$1);
var G__42222 = cljs.core.chunk_rest(seq__41582_42220__$1);
var G__42223 = c__5548__auto___42221;
var G__42224 = cljs.core.count(c__5548__auto___42221);
var G__42225 = (0);
seq__41582_42204 = G__42222;
chunk__41583_42205 = G__42223;
count__41584_42206 = G__42224;
i__41585_42207 = G__42225;
continue;
} else {
var map__41591_42226 = cljs.core.first(seq__41582_42220__$1);
var map__41591_42227__$1 = cljs.core.__destructure_map(map__41591_42226);
var w_42228 = map__41591_42227__$1;
var msg_42229__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41591_42227__$1,new cljs.core.Keyword(null,"msg","msg",-1386103444));
var line_42230 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41591_42227__$1,new cljs.core.Keyword(null,"line","line",212345235));
var column_42231 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41591_42227__$1,new cljs.core.Keyword(null,"column","column",2078222095));
var resource_name_42232 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41591_42227__$1,new cljs.core.Keyword(null,"resource-name","resource-name",2001617100));
console.warn(["BUILD-WARNING in ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(resource_name_42232)," at [",cljs.core.str.cljs$core$IFn$_invoke$arity$1(line_42230),":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(column_42231),"]\n\t",cljs.core.str.cljs$core$IFn$_invoke$arity$1(msg_42229__$1)].join(''));


var G__42233 = cljs.core.next(seq__41582_42220__$1);
var G__42234 = null;
var G__42235 = (0);
var G__42236 = (0);
seq__41582_42204 = G__42233;
chunk__41583_42205 = G__42234;
count__41584_42206 = G__42235;
i__41585_42207 = G__42236;
continue;
}
} else {
}
}
break;
}
} else {
}

if((!(shadow.cljs.devtools.client.env.autoload))){
return shadow.cljs.devtools.client.hud.load_end_success();
} else {
if(((cljs.core.empty_QMARK_(warnings)) || (shadow.cljs.devtools.client.env.ignore_warnings))){
var sources_to_get = shadow.cljs.devtools.client.env.filter_reload_sources(info,reload_info);
if(cljs.core.not(cljs.core.seq(sources_to_get))){
return shadow.cljs.devtools.client.hud.load_end_success();
} else {
if(cljs.core.seq(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(msg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"reload-info","reload-info",1648088086),new cljs.core.Keyword(null,"after-load","after-load",-1278503285)], null)))){
} else {
shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("reloading code but no :after-load hooks are configured!",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["https://shadow-cljs.github.io/docs/UsersGuide.html#_lifecycle_hooks"], 0));
}

return shadow.cljs.devtools.client.shared.load_sources(runtime,sources_to_get,(function (p1__41551_SHARP_){
return shadow.cljs.devtools.client.browser.do_js_reload(msg,p1__41551_SHARP_,shadow.cljs.devtools.client.hud.load_end_success,shadow.cljs.devtools.client.hud.load_failure);
}));
}
} else {
return null;
}
}
});
shadow.cljs.devtools.client.browser.page_load_uri = (cljs.core.truth_(goog.global.document)?goog.Uri.parse(document.location.href):null);
shadow.cljs.devtools.client.browser.match_paths = (function shadow$cljs$devtools$client$browser$match_paths(old,new$){
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2("file",shadow.cljs.devtools.client.browser.page_load_uri.getScheme())){
var rel_new = cljs.core.subs.cljs$core$IFn$_invoke$arity$2(new$,(1));
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(old,rel_new)) || (clojure.string.starts_with_QMARK_(old,[rel_new,"?"].join(''))))){
return rel_new;
} else {
return null;
}
} else {
var node_uri = goog.Uri.parse(old);
var node_uri_resolved = shadow.cljs.devtools.client.browser.page_load_uri.resolve(node_uri);
var node_abs = node_uri_resolved.getPath();
var and__5023__auto__ = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$1(shadow.cljs.devtools.client.browser.page_load_uri.hasSameDomainAs(node_uri))) || (cljs.core.not(node_uri.hasDomain())));
if(and__5023__auto__){
var and__5023__auto____$1 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(node_abs,new$);
if(and__5023__auto____$1){
return cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var G__41608 = node_uri;
G__41608.setQuery(null);

G__41608.setPath(new$);

return G__41608;
})());
} else {
return and__5023__auto____$1;
}
} else {
return and__5023__auto__;
}
}
});
shadow.cljs.devtools.client.browser.handle_asset_update = (function shadow$cljs$devtools$client$browser$handle_asset_update(p__41613){
var map__41614 = p__41613;
var map__41614__$1 = cljs.core.__destructure_map(map__41614);
var msg = map__41614__$1;
var updates = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41614__$1,new cljs.core.Keyword(null,"updates","updates",2013983452));
var reload_info = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41614__$1,new cljs.core.Keyword(null,"reload-info","reload-info",1648088086));
var seq__41615 = cljs.core.seq(updates);
var chunk__41618 = null;
var count__41619 = (0);
var i__41620 = (0);
while(true){
if((i__41620 < count__41619)){
var path = chunk__41618.cljs$core$IIndexed$_nth$arity$2(null,i__41620);
if(clojure.string.ends_with_QMARK_(path,"css")){
var seq__41926_42240 = cljs.core.seq(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(document.querySelectorAll("link[rel=\"stylesheet\"]")));
var chunk__41930_42241 = null;
var count__41931_42242 = (0);
var i__41932_42243 = (0);
while(true){
if((i__41932_42243 < count__41931_42242)){
var node_42244 = chunk__41930_42241.cljs$core$IIndexed$_nth$arity$2(null,i__41932_42243);
if(cljs.core.not(node_42244.shadow$old)){
var path_match_42245 = shadow.cljs.devtools.client.browser.match_paths(node_42244.getAttribute("href"),path);
if(cljs.core.truth_(path_match_42245)){
var new_link_42246 = (function (){var G__41980 = node_42244.cloneNode(true);
G__41980.setAttribute("href",[cljs.core.str.cljs$core$IFn$_invoke$arity$1(path_match_42245),"?r=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand.cljs$core$IFn$_invoke$arity$0())].join(''));

return G__41980;
})();
(node_42244.shadow$old = true);

(new_link_42246.onload = ((function (seq__41926_42240,chunk__41930_42241,count__41931_42242,i__41932_42243,seq__41615,chunk__41618,count__41619,i__41620,new_link_42246,path_match_42245,node_42244,path,map__41614,map__41614__$1,msg,updates,reload_info){
return (function (e){
var seq__41981_42247 = cljs.core.seq(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(msg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"reload-info","reload-info",1648088086),new cljs.core.Keyword(null,"asset-load","asset-load",-1925902322)], null)));
var chunk__41983_42248 = null;
var count__41984_42249 = (0);
var i__41985_42250 = (0);
while(true){
if((i__41985_42250 < count__41984_42249)){
var map__41989_42256 = chunk__41983_42248.cljs$core$IIndexed$_nth$arity$2(null,i__41985_42250);
var map__41989_42257__$1 = cljs.core.__destructure_map(map__41989_42256);
var task_42258 = map__41989_42257__$1;
var fn_str_42259 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41989_42257__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_42260 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41989_42257__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_42262 = goog.getObjectByName(fn_str_42259,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_42260)].join(''));

(fn_obj_42262.cljs$core$IFn$_invoke$arity$2 ? fn_obj_42262.cljs$core$IFn$_invoke$arity$2(path,new_link_42246) : fn_obj_42262.call(null,path,new_link_42246));


var G__42263 = seq__41981_42247;
var G__42264 = chunk__41983_42248;
var G__42265 = count__41984_42249;
var G__42266 = (i__41985_42250 + (1));
seq__41981_42247 = G__42263;
chunk__41983_42248 = G__42264;
count__41984_42249 = G__42265;
i__41985_42250 = G__42266;
continue;
} else {
var temp__5825__auto___42267 = cljs.core.seq(seq__41981_42247);
if(temp__5825__auto___42267){
var seq__41981_42268__$1 = temp__5825__auto___42267;
if(cljs.core.chunked_seq_QMARK_(seq__41981_42268__$1)){
var c__5548__auto___42269 = cljs.core.chunk_first(seq__41981_42268__$1);
var G__42270 = cljs.core.chunk_rest(seq__41981_42268__$1);
var G__42271 = c__5548__auto___42269;
var G__42272 = cljs.core.count(c__5548__auto___42269);
var G__42273 = (0);
seq__41981_42247 = G__42270;
chunk__41983_42248 = G__42271;
count__41984_42249 = G__42272;
i__41985_42250 = G__42273;
continue;
} else {
var map__41990_42274 = cljs.core.first(seq__41981_42268__$1);
var map__41990_42275__$1 = cljs.core.__destructure_map(map__41990_42274);
var task_42276 = map__41990_42275__$1;
var fn_str_42277 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41990_42275__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_42278 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__41990_42275__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_42279 = goog.getObjectByName(fn_str_42277,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_42278)].join(''));

(fn_obj_42279.cljs$core$IFn$_invoke$arity$2 ? fn_obj_42279.cljs$core$IFn$_invoke$arity$2(path,new_link_42246) : fn_obj_42279.call(null,path,new_link_42246));


var G__42280 = cljs.core.next(seq__41981_42268__$1);
var G__42281 = null;
var G__42282 = (0);
var G__42283 = (0);
seq__41981_42247 = G__42280;
chunk__41983_42248 = G__42281;
count__41984_42249 = G__42282;
i__41985_42250 = G__42283;
continue;
}
} else {
}
}
break;
}

return goog.dom.removeNode(node_42244);
});})(seq__41926_42240,chunk__41930_42241,count__41931_42242,i__41932_42243,seq__41615,chunk__41618,count__41619,i__41620,new_link_42246,path_match_42245,node_42244,path,map__41614,map__41614__$1,msg,updates,reload_info))
);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load CSS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([path_match_42245], 0));

goog.dom.insertSiblingAfter(new_link_42246,node_42244);


var G__42284 = seq__41926_42240;
var G__42285 = chunk__41930_42241;
var G__42286 = count__41931_42242;
var G__42287 = (i__41932_42243 + (1));
seq__41926_42240 = G__42284;
chunk__41930_42241 = G__42285;
count__41931_42242 = G__42286;
i__41932_42243 = G__42287;
continue;
} else {
var G__42288 = seq__41926_42240;
var G__42289 = chunk__41930_42241;
var G__42290 = count__41931_42242;
var G__42291 = (i__41932_42243 + (1));
seq__41926_42240 = G__42288;
chunk__41930_42241 = G__42289;
count__41931_42242 = G__42290;
i__41932_42243 = G__42291;
continue;
}
} else {
var G__42292 = seq__41926_42240;
var G__42293 = chunk__41930_42241;
var G__42294 = count__41931_42242;
var G__42295 = (i__41932_42243 + (1));
seq__41926_42240 = G__42292;
chunk__41930_42241 = G__42293;
count__41931_42242 = G__42294;
i__41932_42243 = G__42295;
continue;
}
} else {
var temp__5825__auto___42296 = cljs.core.seq(seq__41926_42240);
if(temp__5825__auto___42296){
var seq__41926_42297__$1 = temp__5825__auto___42296;
if(cljs.core.chunked_seq_QMARK_(seq__41926_42297__$1)){
var c__5548__auto___42298 = cljs.core.chunk_first(seq__41926_42297__$1);
var G__42299 = cljs.core.chunk_rest(seq__41926_42297__$1);
var G__42300 = c__5548__auto___42298;
var G__42301 = cljs.core.count(c__5548__auto___42298);
var G__42302 = (0);
seq__41926_42240 = G__42299;
chunk__41930_42241 = G__42300;
count__41931_42242 = G__42301;
i__41932_42243 = G__42302;
continue;
} else {
var node_42303 = cljs.core.first(seq__41926_42297__$1);
if(cljs.core.not(node_42303.shadow$old)){
var path_match_42304 = shadow.cljs.devtools.client.browser.match_paths(node_42303.getAttribute("href"),path);
if(cljs.core.truth_(path_match_42304)){
var new_link_42305 = (function (){var G__41991 = node_42303.cloneNode(true);
G__41991.setAttribute("href",[cljs.core.str.cljs$core$IFn$_invoke$arity$1(path_match_42304),"?r=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand.cljs$core$IFn$_invoke$arity$0())].join(''));

return G__41991;
})();
(node_42303.shadow$old = true);

(new_link_42305.onload = ((function (seq__41926_42240,chunk__41930_42241,count__41931_42242,i__41932_42243,seq__41615,chunk__41618,count__41619,i__41620,new_link_42305,path_match_42304,node_42303,seq__41926_42297__$1,temp__5825__auto___42296,path,map__41614,map__41614__$1,msg,updates,reload_info){
return (function (e){
var seq__41993_42306 = cljs.core.seq(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(msg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"reload-info","reload-info",1648088086),new cljs.core.Keyword(null,"asset-load","asset-load",-1925902322)], null)));
var chunk__41995_42307 = null;
var count__41996_42308 = (0);
var i__41997_42309 = (0);
while(true){
if((i__41997_42309 < count__41996_42308)){
var map__42002_42310 = chunk__41995_42307.cljs$core$IIndexed$_nth$arity$2(null,i__41997_42309);
var map__42002_42311__$1 = cljs.core.__destructure_map(map__42002_42310);
var task_42312 = map__42002_42311__$1;
var fn_str_42313 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42002_42311__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_42314 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42002_42311__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_42318 = goog.getObjectByName(fn_str_42313,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_42314)].join(''));

(fn_obj_42318.cljs$core$IFn$_invoke$arity$2 ? fn_obj_42318.cljs$core$IFn$_invoke$arity$2(path,new_link_42305) : fn_obj_42318.call(null,path,new_link_42305));


var G__42319 = seq__41993_42306;
var G__42320 = chunk__41995_42307;
var G__42321 = count__41996_42308;
var G__42322 = (i__41997_42309 + (1));
seq__41993_42306 = G__42319;
chunk__41995_42307 = G__42320;
count__41996_42308 = G__42321;
i__41997_42309 = G__42322;
continue;
} else {
var temp__5825__auto___42323__$1 = cljs.core.seq(seq__41993_42306);
if(temp__5825__auto___42323__$1){
var seq__41993_42324__$1 = temp__5825__auto___42323__$1;
if(cljs.core.chunked_seq_QMARK_(seq__41993_42324__$1)){
var c__5548__auto___42325 = cljs.core.chunk_first(seq__41993_42324__$1);
var G__42326 = cljs.core.chunk_rest(seq__41993_42324__$1);
var G__42327 = c__5548__auto___42325;
var G__42328 = cljs.core.count(c__5548__auto___42325);
var G__42329 = (0);
seq__41993_42306 = G__42326;
chunk__41995_42307 = G__42327;
count__41996_42308 = G__42328;
i__41997_42309 = G__42329;
continue;
} else {
var map__42003_42330 = cljs.core.first(seq__41993_42324__$1);
var map__42003_42331__$1 = cljs.core.__destructure_map(map__42003_42330);
var task_42332 = map__42003_42331__$1;
var fn_str_42333 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42003_42331__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_42334 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42003_42331__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_42335 = goog.getObjectByName(fn_str_42333,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_42334)].join(''));

(fn_obj_42335.cljs$core$IFn$_invoke$arity$2 ? fn_obj_42335.cljs$core$IFn$_invoke$arity$2(path,new_link_42305) : fn_obj_42335.call(null,path,new_link_42305));


var G__42339 = cljs.core.next(seq__41993_42324__$1);
var G__42340 = null;
var G__42341 = (0);
var G__42342 = (0);
seq__41993_42306 = G__42339;
chunk__41995_42307 = G__42340;
count__41996_42308 = G__42341;
i__41997_42309 = G__42342;
continue;
}
} else {
}
}
break;
}

return goog.dom.removeNode(node_42303);
});})(seq__41926_42240,chunk__41930_42241,count__41931_42242,i__41932_42243,seq__41615,chunk__41618,count__41619,i__41620,new_link_42305,path_match_42304,node_42303,seq__41926_42297__$1,temp__5825__auto___42296,path,map__41614,map__41614__$1,msg,updates,reload_info))
);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load CSS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([path_match_42304], 0));

goog.dom.insertSiblingAfter(new_link_42305,node_42303);


var G__42343 = cljs.core.next(seq__41926_42297__$1);
var G__42344 = null;
var G__42345 = (0);
var G__42346 = (0);
seq__41926_42240 = G__42343;
chunk__41930_42241 = G__42344;
count__41931_42242 = G__42345;
i__41932_42243 = G__42346;
continue;
} else {
var G__42347 = cljs.core.next(seq__41926_42297__$1);
var G__42348 = null;
var G__42349 = (0);
var G__42350 = (0);
seq__41926_42240 = G__42347;
chunk__41930_42241 = G__42348;
count__41931_42242 = G__42349;
i__41932_42243 = G__42350;
continue;
}
} else {
var G__42351 = cljs.core.next(seq__41926_42297__$1);
var G__42352 = null;
var G__42353 = (0);
var G__42354 = (0);
seq__41926_42240 = G__42351;
chunk__41930_42241 = G__42352;
count__41931_42242 = G__42353;
i__41932_42243 = G__42354;
continue;
}
}
} else {
}
}
break;
}


var G__42355 = seq__41615;
var G__42356 = chunk__41618;
var G__42357 = count__41619;
var G__42358 = (i__41620 + (1));
seq__41615 = G__42355;
chunk__41618 = G__42356;
count__41619 = G__42357;
i__41620 = G__42358;
continue;
} else {
var G__42359 = seq__41615;
var G__42360 = chunk__41618;
var G__42361 = count__41619;
var G__42362 = (i__41620 + (1));
seq__41615 = G__42359;
chunk__41618 = G__42360;
count__41619 = G__42361;
i__41620 = G__42362;
continue;
}
} else {
var temp__5825__auto__ = cljs.core.seq(seq__41615);
if(temp__5825__auto__){
var seq__41615__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__41615__$1)){
var c__5548__auto__ = cljs.core.chunk_first(seq__41615__$1);
var G__42364 = cljs.core.chunk_rest(seq__41615__$1);
var G__42365 = c__5548__auto__;
var G__42366 = cljs.core.count(c__5548__auto__);
var G__42367 = (0);
seq__41615 = G__42364;
chunk__41618 = G__42365;
count__41619 = G__42366;
i__41620 = G__42367;
continue;
} else {
var path = cljs.core.first(seq__41615__$1);
if(clojure.string.ends_with_QMARK_(path,"css")){
var seq__42004_42368 = cljs.core.seq(cljs.core.array_seq.cljs$core$IFn$_invoke$arity$1(document.querySelectorAll("link[rel=\"stylesheet\"]")));
var chunk__42008_42369 = null;
var count__42009_42370 = (0);
var i__42010_42371 = (0);
while(true){
if((i__42010_42371 < count__42009_42370)){
var node_42372 = chunk__42008_42369.cljs$core$IIndexed$_nth$arity$2(null,i__42010_42371);
if(cljs.core.not(node_42372.shadow$old)){
var path_match_42373 = shadow.cljs.devtools.client.browser.match_paths(node_42372.getAttribute("href"),path);
if(cljs.core.truth_(path_match_42373)){
var new_link_42376 = (function (){var G__42072 = node_42372.cloneNode(true);
G__42072.setAttribute("href",[cljs.core.str.cljs$core$IFn$_invoke$arity$1(path_match_42373),"?r=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand.cljs$core$IFn$_invoke$arity$0())].join(''));

return G__42072;
})();
(node_42372.shadow$old = true);

(new_link_42376.onload = ((function (seq__42004_42368,chunk__42008_42369,count__42009_42370,i__42010_42371,seq__41615,chunk__41618,count__41619,i__41620,new_link_42376,path_match_42373,node_42372,path,seq__41615__$1,temp__5825__auto__,map__41614,map__41614__$1,msg,updates,reload_info){
return (function (e){
var seq__42073_42380 = cljs.core.seq(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(msg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"reload-info","reload-info",1648088086),new cljs.core.Keyword(null,"asset-load","asset-load",-1925902322)], null)));
var chunk__42075_42381 = null;
var count__42076_42382 = (0);
var i__42077_42383 = (0);
while(true){
if((i__42077_42383 < count__42076_42382)){
var map__42086_42384 = chunk__42075_42381.cljs$core$IIndexed$_nth$arity$2(null,i__42077_42383);
var map__42086_42385__$1 = cljs.core.__destructure_map(map__42086_42384);
var task_42386 = map__42086_42385__$1;
var fn_str_42387 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42086_42385__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_42388 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42086_42385__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_42389 = goog.getObjectByName(fn_str_42387,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_42388)].join(''));

(fn_obj_42389.cljs$core$IFn$_invoke$arity$2 ? fn_obj_42389.cljs$core$IFn$_invoke$arity$2(path,new_link_42376) : fn_obj_42389.call(null,path,new_link_42376));


var G__42390 = seq__42073_42380;
var G__42391 = chunk__42075_42381;
var G__42392 = count__42076_42382;
var G__42393 = (i__42077_42383 + (1));
seq__42073_42380 = G__42390;
chunk__42075_42381 = G__42391;
count__42076_42382 = G__42392;
i__42077_42383 = G__42393;
continue;
} else {
var temp__5825__auto___42394__$1 = cljs.core.seq(seq__42073_42380);
if(temp__5825__auto___42394__$1){
var seq__42073_42395__$1 = temp__5825__auto___42394__$1;
if(cljs.core.chunked_seq_QMARK_(seq__42073_42395__$1)){
var c__5548__auto___42396 = cljs.core.chunk_first(seq__42073_42395__$1);
var G__42398 = cljs.core.chunk_rest(seq__42073_42395__$1);
var G__42399 = c__5548__auto___42396;
var G__42400 = cljs.core.count(c__5548__auto___42396);
var G__42401 = (0);
seq__42073_42380 = G__42398;
chunk__42075_42381 = G__42399;
count__42076_42382 = G__42400;
i__42077_42383 = G__42401;
continue;
} else {
var map__42087_42402 = cljs.core.first(seq__42073_42395__$1);
var map__42087_42403__$1 = cljs.core.__destructure_map(map__42087_42402);
var task_42404 = map__42087_42403__$1;
var fn_str_42405 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42087_42403__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_42406 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42087_42403__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_42407 = goog.getObjectByName(fn_str_42405,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_42406)].join(''));

(fn_obj_42407.cljs$core$IFn$_invoke$arity$2 ? fn_obj_42407.cljs$core$IFn$_invoke$arity$2(path,new_link_42376) : fn_obj_42407.call(null,path,new_link_42376));


var G__42408 = cljs.core.next(seq__42073_42395__$1);
var G__42409 = null;
var G__42410 = (0);
var G__42411 = (0);
seq__42073_42380 = G__42408;
chunk__42075_42381 = G__42409;
count__42076_42382 = G__42410;
i__42077_42383 = G__42411;
continue;
}
} else {
}
}
break;
}

return goog.dom.removeNode(node_42372);
});})(seq__42004_42368,chunk__42008_42369,count__42009_42370,i__42010_42371,seq__41615,chunk__41618,count__41619,i__41620,new_link_42376,path_match_42373,node_42372,path,seq__41615__$1,temp__5825__auto__,map__41614,map__41614__$1,msg,updates,reload_info))
);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load CSS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([path_match_42373], 0));

goog.dom.insertSiblingAfter(new_link_42376,node_42372);


var G__42412 = seq__42004_42368;
var G__42413 = chunk__42008_42369;
var G__42414 = count__42009_42370;
var G__42415 = (i__42010_42371 + (1));
seq__42004_42368 = G__42412;
chunk__42008_42369 = G__42413;
count__42009_42370 = G__42414;
i__42010_42371 = G__42415;
continue;
} else {
var G__42416 = seq__42004_42368;
var G__42417 = chunk__42008_42369;
var G__42418 = count__42009_42370;
var G__42419 = (i__42010_42371 + (1));
seq__42004_42368 = G__42416;
chunk__42008_42369 = G__42417;
count__42009_42370 = G__42418;
i__42010_42371 = G__42419;
continue;
}
} else {
var G__42420 = seq__42004_42368;
var G__42421 = chunk__42008_42369;
var G__42422 = count__42009_42370;
var G__42423 = (i__42010_42371 + (1));
seq__42004_42368 = G__42420;
chunk__42008_42369 = G__42421;
count__42009_42370 = G__42422;
i__42010_42371 = G__42423;
continue;
}
} else {
var temp__5825__auto___42424__$1 = cljs.core.seq(seq__42004_42368);
if(temp__5825__auto___42424__$1){
var seq__42004_42425__$1 = temp__5825__auto___42424__$1;
if(cljs.core.chunked_seq_QMARK_(seq__42004_42425__$1)){
var c__5548__auto___42426 = cljs.core.chunk_first(seq__42004_42425__$1);
var G__42427 = cljs.core.chunk_rest(seq__42004_42425__$1);
var G__42428 = c__5548__auto___42426;
var G__42429 = cljs.core.count(c__5548__auto___42426);
var G__42430 = (0);
seq__42004_42368 = G__42427;
chunk__42008_42369 = G__42428;
count__42009_42370 = G__42429;
i__42010_42371 = G__42430;
continue;
} else {
var node_42431 = cljs.core.first(seq__42004_42425__$1);
if(cljs.core.not(node_42431.shadow$old)){
var path_match_42432 = shadow.cljs.devtools.client.browser.match_paths(node_42431.getAttribute("href"),path);
if(cljs.core.truth_(path_match_42432)){
var new_link_42433 = (function (){var G__42092 = node_42431.cloneNode(true);
G__42092.setAttribute("href",[cljs.core.str.cljs$core$IFn$_invoke$arity$1(path_match_42432),"?r=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.rand.cljs$core$IFn$_invoke$arity$0())].join(''));

return G__42092;
})();
(node_42431.shadow$old = true);

(new_link_42433.onload = ((function (seq__42004_42368,chunk__42008_42369,count__42009_42370,i__42010_42371,seq__41615,chunk__41618,count__41619,i__41620,new_link_42433,path_match_42432,node_42431,seq__42004_42425__$1,temp__5825__auto___42424__$1,path,seq__41615__$1,temp__5825__auto__,map__41614,map__41614__$1,msg,updates,reload_info){
return (function (e){
var seq__42095_42435 = cljs.core.seq(cljs.core.get_in.cljs$core$IFn$_invoke$arity$2(msg,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"reload-info","reload-info",1648088086),new cljs.core.Keyword(null,"asset-load","asset-load",-1925902322)], null)));
var chunk__42097_42436 = null;
var count__42098_42437 = (0);
var i__42099_42438 = (0);
while(true){
if((i__42099_42438 < count__42098_42437)){
var map__42107_42440 = chunk__42097_42436.cljs$core$IIndexed$_nth$arity$2(null,i__42099_42438);
var map__42107_42441__$1 = cljs.core.__destructure_map(map__42107_42440);
var task_42442 = map__42107_42441__$1;
var fn_str_42443 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42107_42441__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_42444 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42107_42441__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_42446 = goog.getObjectByName(fn_str_42443,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_42444)].join(''));

(fn_obj_42446.cljs$core$IFn$_invoke$arity$2 ? fn_obj_42446.cljs$core$IFn$_invoke$arity$2(path,new_link_42433) : fn_obj_42446.call(null,path,new_link_42433));


var G__42449 = seq__42095_42435;
var G__42450 = chunk__42097_42436;
var G__42451 = count__42098_42437;
var G__42452 = (i__42099_42438 + (1));
seq__42095_42435 = G__42449;
chunk__42097_42436 = G__42450;
count__42098_42437 = G__42451;
i__42099_42438 = G__42452;
continue;
} else {
var temp__5825__auto___42453__$2 = cljs.core.seq(seq__42095_42435);
if(temp__5825__auto___42453__$2){
var seq__42095_42454__$1 = temp__5825__auto___42453__$2;
if(cljs.core.chunked_seq_QMARK_(seq__42095_42454__$1)){
var c__5548__auto___42455 = cljs.core.chunk_first(seq__42095_42454__$1);
var G__42456 = cljs.core.chunk_rest(seq__42095_42454__$1);
var G__42457 = c__5548__auto___42455;
var G__42458 = cljs.core.count(c__5548__auto___42455);
var G__42459 = (0);
seq__42095_42435 = G__42456;
chunk__42097_42436 = G__42457;
count__42098_42437 = G__42458;
i__42099_42438 = G__42459;
continue;
} else {
var map__42111_42460 = cljs.core.first(seq__42095_42454__$1);
var map__42111_42461__$1 = cljs.core.__destructure_map(map__42111_42460);
var task_42462 = map__42111_42461__$1;
var fn_str_42463 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42111_42461__$1,new cljs.core.Keyword(null,"fn-str","fn-str",-1348506402));
var fn_sym_42464 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42111_42461__$1,new cljs.core.Keyword(null,"fn-sym","fn-sym",1423988510));
var fn_obj_42465 = goog.getObjectByName(fn_str_42463,$CLJS);
shadow.cljs.devtools.client.browser.devtools_msg(["call ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(fn_sym_42464)].join(''));

(fn_obj_42465.cljs$core$IFn$_invoke$arity$2 ? fn_obj_42465.cljs$core$IFn$_invoke$arity$2(path,new_link_42433) : fn_obj_42465.call(null,path,new_link_42433));


var G__42467 = cljs.core.next(seq__42095_42454__$1);
var G__42468 = null;
var G__42469 = (0);
var G__42470 = (0);
seq__42095_42435 = G__42467;
chunk__42097_42436 = G__42468;
count__42098_42437 = G__42469;
i__42099_42438 = G__42470;
continue;
}
} else {
}
}
break;
}

return goog.dom.removeNode(node_42431);
});})(seq__42004_42368,chunk__42008_42369,count__42009_42370,i__42010_42371,seq__41615,chunk__41618,count__41619,i__41620,new_link_42433,path_match_42432,node_42431,seq__42004_42425__$1,temp__5825__auto___42424__$1,path,seq__41615__$1,temp__5825__auto__,map__41614,map__41614__$1,msg,updates,reload_info))
);

shadow.cljs.devtools.client.browser.devtools_msg.cljs$core$IFn$_invoke$arity$variadic("load CSS",cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([path_match_42432], 0));

goog.dom.insertSiblingAfter(new_link_42433,node_42431);


var G__42471 = cljs.core.next(seq__42004_42425__$1);
var G__42472 = null;
var G__42473 = (0);
var G__42474 = (0);
seq__42004_42368 = G__42471;
chunk__42008_42369 = G__42472;
count__42009_42370 = G__42473;
i__42010_42371 = G__42474;
continue;
} else {
var G__42475 = cljs.core.next(seq__42004_42425__$1);
var G__42476 = null;
var G__42477 = (0);
var G__42478 = (0);
seq__42004_42368 = G__42475;
chunk__42008_42369 = G__42476;
count__42009_42370 = G__42477;
i__42010_42371 = G__42478;
continue;
}
} else {
var G__42479 = cljs.core.next(seq__42004_42425__$1);
var G__42480 = null;
var G__42481 = (0);
var G__42482 = (0);
seq__42004_42368 = G__42479;
chunk__42008_42369 = G__42480;
count__42009_42370 = G__42481;
i__42010_42371 = G__42482;
continue;
}
}
} else {
}
}
break;
}


var G__42483 = cljs.core.next(seq__41615__$1);
var G__42484 = null;
var G__42485 = (0);
var G__42486 = (0);
seq__41615 = G__42483;
chunk__41618 = G__42484;
count__41619 = G__42485;
i__41620 = G__42486;
continue;
} else {
var G__42487 = cljs.core.next(seq__41615__$1);
var G__42488 = null;
var G__42489 = (0);
var G__42490 = (0);
seq__41615 = G__42487;
chunk__41618 = G__42488;
count__41619 = G__42489;
i__41620 = G__42490;
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
shadow.cljs.devtools.client.browser.global_eval = (function shadow$cljs$devtools$client$browser$global_eval(js){
if(cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2("undefined",typeof(module))){
return eval(js);
} else {
return (0,eval)(js);;
}
});
shadow.cljs.devtools.client.browser.runtime_info = (((typeof SHADOW_CONFIG !== 'undefined'))?shadow.json.to_clj.cljs$core$IFn$_invoke$arity$1(SHADOW_CONFIG):null);
shadow.cljs.devtools.client.browser.client_info = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([shadow.cljs.devtools.client.browser.runtime_info,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"host","host",-1558485167),(cljs.core.truth_(goog.global.document)?new cljs.core.Keyword(null,"browser","browser",828191719):new cljs.core.Keyword(null,"browser-worker","browser-worker",1638998282)),new cljs.core.Keyword(null,"user-agent","user-agent",1220426212),[(cljs.core.truth_(goog.userAgent.OPERA)?"Opera":(cljs.core.truth_(goog.userAgent.product.CHROME)?"Chrome":(cljs.core.truth_(goog.userAgent.IE)?"MSIE":(cljs.core.truth_(goog.userAgent.EDGE)?"Edge":(cljs.core.truth_(goog.userAgent.GECKO)?"Firefox":(cljs.core.truth_(goog.userAgent.SAFARI)?"Safari":(cljs.core.truth_(goog.userAgent.WEBKIT)?"Webkit":null)))))))," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(goog.userAgent.VERSION)," [",cljs.core.str.cljs$core$IFn$_invoke$arity$1(goog.userAgent.PLATFORM),"]"].join(''),new cljs.core.Keyword(null,"dom","dom",-1236537922),(!((goog.global.document == null)))], null)], 0));
if((typeof shadow !== 'undefined') && (typeof shadow.cljs !== 'undefined') && (typeof shadow.cljs.devtools !== 'undefined') && (typeof shadow.cljs.devtools.client !== 'undefined') && (typeof shadow.cljs.devtools.client.browser !== 'undefined') && (typeof shadow.cljs.devtools.client.browser.ws_was_welcome_ref !== 'undefined')){
} else {
shadow.cljs.devtools.client.browser.ws_was_welcome_ref = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(false);
}
if(((shadow.cljs.devtools.client.env.enabled) && ((shadow.cljs.devtools.client.env.worker_client_id > (0))))){
(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$remote$runtime$api$IEvalJS$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$remote$runtime$api$IEvalJS$_js_eval$arity$4 = (function (this$,code,success,fail){
var this$__$1 = this;
try{var G__42120 = shadow.cljs.devtools.client.browser.global_eval(code);
return (success.cljs$core$IFn$_invoke$arity$1 ? success.cljs$core$IFn$_invoke$arity$1(G__42120) : success.call(null,G__42120));
}catch (e42119){var e = e42119;
return (fail.cljs$core$IFn$_invoke$arity$1 ? fail.cljs$core$IFn$_invoke$arity$1(e) : fail.call(null,e));
}}));

(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$cljs$devtools$client$shared$IHostSpecific$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$cljs$devtools$client$shared$IHostSpecific$do_invoke$arity$5 = (function (this$,ns,p__42121,success,fail){
var map__42122 = p__42121;
var map__42122__$1 = cljs.core.__destructure_map(map__42122);
var js = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42122__$1,new cljs.core.Keyword(null,"js","js",1768080579));
var this$__$1 = this;
try{var G__42124 = shadow.cljs.devtools.client.browser.global_eval(js);
return (success.cljs$core$IFn$_invoke$arity$1 ? success.cljs$core$IFn$_invoke$arity$1(G__42124) : success.call(null,G__42124));
}catch (e42123){var e = e42123;
return (fail.cljs$core$IFn$_invoke$arity$1 ? fail.cljs$core$IFn$_invoke$arity$1(e) : fail.call(null,e));
}}));

(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$cljs$devtools$client$shared$IHostSpecific$do_repl_init$arity$4 = (function (runtime,p__42125,done,error){
var map__42126 = p__42125;
var map__42126__$1 = cljs.core.__destructure_map(map__42126);
var repl_sources = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42126__$1,new cljs.core.Keyword(null,"repl-sources","repl-sources",723867535));
var runtime__$1 = this;
return shadow.cljs.devtools.client.shared.load_sources(runtime__$1,cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.remove.cljs$core$IFn$_invoke$arity$2(shadow.cljs.devtools.client.env.src_is_loaded_QMARK_,repl_sources)),(function (sources){
shadow.cljs.devtools.client.browser.do_js_load(sources);

return (done.cljs$core$IFn$_invoke$arity$0 ? done.cljs$core$IFn$_invoke$arity$0() : done.call(null));
}));
}));

(shadow.cljs.devtools.client.shared.Runtime.prototype.shadow$cljs$devtools$client$shared$IHostSpecific$do_repl_require$arity$4 = (function (runtime,p__42128,done,error){
var map__42129 = p__42128;
var map__42129__$1 = cljs.core.__destructure_map(map__42129);
var msg = map__42129__$1;
var sources = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42129__$1,new cljs.core.Keyword(null,"sources","sources",-321166424));
var reload_namespaces = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42129__$1,new cljs.core.Keyword(null,"reload-namespaces","reload-namespaces",250210134));
var js_requires = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42129__$1,new cljs.core.Keyword(null,"js-requires","js-requires",-1311472051));
var runtime__$1 = this;
var sources_to_load = cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentVector.EMPTY,cljs.core.remove.cljs$core$IFn$_invoke$arity$2((function (p__42131){
var map__42132 = p__42131;
var map__42132__$1 = cljs.core.__destructure_map(map__42132);
var src = map__42132__$1;
var provides = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42132__$1,new cljs.core.Keyword(null,"provides","provides",-1634397992));
var and__5023__auto__ = shadow.cljs.devtools.client.env.src_is_loaded_QMARK_(src);
if(cljs.core.truth_(and__5023__auto__)){
return cljs.core.not(cljs.core.some(reload_namespaces,provides));
} else {
return and__5023__auto__;
}
}),sources));
if(cljs.core.not(cljs.core.seq(sources_to_load))){
var G__42134 = cljs.core.PersistentVector.EMPTY;
return (done.cljs$core$IFn$_invoke$arity$1 ? done.cljs$core$IFn$_invoke$arity$1(G__42134) : done.call(null,G__42134));
} else {
return shadow.remote.runtime.shared.call.cljs$core$IFn$_invoke$arity$3(runtime__$1,new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"op","op",-1882987955),new cljs.core.Keyword(null,"cljs-load-sources","cljs-load-sources",-1458295962),new cljs.core.Keyword(null,"to","to",192099007),shadow.cljs.devtools.client.env.worker_client_id,new cljs.core.Keyword(null,"sources","sources",-321166424),cljs.core.into.cljs$core$IFn$_invoke$arity$3(cljs.core.PersistentVector.EMPTY,cljs.core.map.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"resource-id","resource-id",-1308422582)),sources_to_load)], null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"cljs-sources","cljs-sources",31121610),(function (p__42135){
var map__42136 = p__42135;
var map__42136__$1 = cljs.core.__destructure_map(map__42136);
var msg__$1 = map__42136__$1;
var sources__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42136__$1,new cljs.core.Keyword(null,"sources","sources",-321166424));
try{shadow.cljs.devtools.client.browser.do_js_load(sources__$1);

if(cljs.core.seq(js_requires)){
shadow.cljs.devtools.client.browser.do_js_requires(js_requires);
} else {
}

return (done.cljs$core$IFn$_invoke$arity$1 ? done.cljs$core$IFn$_invoke$arity$1(sources_to_load) : done.call(null,sources_to_load));
}catch (e42138){var ex = e42138;
return (error.cljs$core$IFn$_invoke$arity$1 ? error.cljs$core$IFn$_invoke$arity$1(ex) : error.call(null,ex));
}})], null));
}
}));

shadow.cljs.devtools.client.shared.add_plugin_BANG_(new cljs.core.Keyword("shadow.cljs.devtools.client.browser","client","shadow.cljs.devtools.client.browser/client",-1461019282),cljs.core.PersistentHashSet.EMPTY,(function (p__42141){
var map__42142 = p__42141;
var map__42142__$1 = cljs.core.__destructure_map(map__42142);
var env = map__42142__$1;
var runtime = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42142__$1,new cljs.core.Keyword(null,"runtime","runtime",-1331573996));
var svc = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"runtime","runtime",-1331573996),runtime], null);
shadow.remote.runtime.api.add_extension(runtime,new cljs.core.Keyword("shadow.cljs.devtools.client.browser","client","shadow.cljs.devtools.client.browser/client",-1461019282),new cljs.core.PersistentArrayMap(null, 4, [new cljs.core.Keyword(null,"on-welcome","on-welcome",1895317125),(function (){
cljs.core.reset_BANG_(shadow.cljs.devtools.client.browser.ws_was_welcome_ref,true);

shadow.cljs.devtools.client.hud.connection_error_clear_BANG_();

shadow.cljs.devtools.client.env.patch_goog_BANG_();

return shadow.cljs.devtools.client.browser.devtools_msg(["#",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"client-id","client-id",-464622140).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(new cljs.core.Keyword(null,"state-ref","state-ref",2127874952).cljs$core$IFn$_invoke$arity$1(runtime))))," ready!"].join(''));
}),new cljs.core.Keyword(null,"on-disconnect","on-disconnect",-809021814),(function (e){
if(cljs.core.truth_(cljs.core.deref(shadow.cljs.devtools.client.browser.ws_was_welcome_ref))){
shadow.cljs.devtools.client.hud.connection_error("The Websocket connection was closed!");

return cljs.core.reset_BANG_(shadow.cljs.devtools.client.browser.ws_was_welcome_ref,false);
} else {
return null;
}
}),new cljs.core.Keyword(null,"on-reconnect","on-reconnect",1239988702),(function (e){
return shadow.cljs.devtools.client.hud.connection_error("Reconnecting ...");
}),new cljs.core.Keyword(null,"ops","ops",1237330063),new cljs.core.PersistentArrayMap(null, 7, [new cljs.core.Keyword(null,"access-denied","access-denied",959449406),(function (msg){
cljs.core.reset_BANG_(shadow.cljs.devtools.client.browser.ws_was_welcome_ref,false);

return shadow.cljs.devtools.client.hud.connection_error(["Stale Output! Your loaded JS was not produced by the running shadow-cljs instance."," Is the watch for this build running?"].join(''));
}),new cljs.core.Keyword(null,"cljs-asset-update","cljs-asset-update",1224093028),(function (msg){
return shadow.cljs.devtools.client.browser.handle_asset_update(msg);
}),new cljs.core.Keyword(null,"cljs-build-configure","cljs-build-configure",-2089891268),(function (msg){
return null;
}),new cljs.core.Keyword(null,"cljs-build-start","cljs-build-start",-725781241),(function (msg){
shadow.cljs.devtools.client.hud.hud_hide();

shadow.cljs.devtools.client.hud.load_start();

return shadow.cljs.devtools.client.env.run_custom_notify_BANG_(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(msg,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"build-start","build-start",-959649480)));
}),new cljs.core.Keyword(null,"cljs-build-complete","cljs-build-complete",273626153),(function (msg){
var msg__$1 = shadow.cljs.devtools.client.env.add_warnings_to_info(msg);
shadow.cljs.devtools.client.hud.connection_error_clear_BANG_();

shadow.cljs.devtools.client.hud.hud_warnings(msg__$1);

shadow.cljs.devtools.client.browser.handle_build_complete(runtime,msg__$1);

return shadow.cljs.devtools.client.env.run_custom_notify_BANG_(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(msg__$1,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"build-complete","build-complete",-501868472)));
}),new cljs.core.Keyword(null,"cljs-build-failure","cljs-build-failure",1718154990),(function (msg){
shadow.cljs.devtools.client.hud.load_end();

shadow.cljs.devtools.client.hud.hud_error(msg);

return shadow.cljs.devtools.client.env.run_custom_notify_BANG_(cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(msg,new cljs.core.Keyword(null,"type","type",1174270348),new cljs.core.Keyword(null,"build-failure","build-failure",-2107487466)));
}),new cljs.core.Keyword("shadow.cljs.devtools.client.env","worker-notify","shadow.cljs.devtools.client.env/worker-notify",-1456820670),(function (p__42149){
var map__42150 = p__42149;
var map__42150__$1 = cljs.core.__destructure_map(map__42150);
var event_op = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42150__$1,new cljs.core.Keyword(null,"event-op","event-op",200358057));
var client_id = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42150__$1,new cljs.core.Keyword(null,"client-id","client-id",-464622140));
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"client-disconnect","client-disconnect",640227957),event_op)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(client_id,shadow.cljs.devtools.client.env.worker_client_id)))){
shadow.cljs.devtools.client.hud.connection_error_clear_BANG_();

return shadow.cljs.devtools.client.hud.connection_error("The watch for this build was stopped!");
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"client-connect","client-connect",-1113973888),event_op)){
shadow.cljs.devtools.client.hud.connection_error_clear_BANG_();

return shadow.cljs.devtools.client.hud.connection_error("The watch for this build was restarted. Reload required!");
} else {
return null;
}
}
})], null)], null));

return svc;
}),(function (p__42152){
var map__42153 = p__42152;
var map__42153__$1 = cljs.core.__destructure_map(map__42153);
var svc = map__42153__$1;
var runtime = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__42153__$1,new cljs.core.Keyword(null,"runtime","runtime",-1331573996));
return shadow.remote.runtime.api.del_extension(runtime,new cljs.core.Keyword("shadow.cljs.devtools.client.browser","client","shadow.cljs.devtools.client.browser/client",-1461019282));
}));

shadow.cljs.devtools.client.shared.init_runtime_BANG_(shadow.cljs.devtools.client.browser.client_info,shadow.cljs.devtools.client.websocket.start,shadow.cljs.devtools.client.websocket.send,shadow.cljs.devtools.client.websocket.stop);
} else {
}

//# sourceMappingURL=shadow.cljs.devtools.client.browser.js.map
