goog.provide('cljs.repl');
cljs.repl.print_doc = (function cljs$repl$print_doc(p__39731){
var map__39755 = p__39731;
var map__39755__$1 = cljs.core.__destructure_map(map__39755);
var m = map__39755__$1;
var n = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39755__$1,new cljs.core.Keyword(null,"ns","ns",441598760));
var nm = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__39755__$1,new cljs.core.Keyword(null,"name","name",1843675177));
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["-------------------------"], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([(function (){var or__5025__auto__ = new cljs.core.Keyword(null,"spec","spec",347520401).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(or__5025__auto__)){
return or__5025__auto__;
} else {
return [(function (){var temp__5825__auto__ = new cljs.core.Keyword(null,"ns","ns",441598760).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(temp__5825__auto__)){
var ns = temp__5825__auto__;
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(ns),"/"].join('');
} else {
return null;
}
})(),cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(m))].join('');
}
})()], 0));

if(cljs.core.truth_(new cljs.core.Keyword(null,"protocol","protocol",652470118).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Protocol"], 0));
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"forms","forms",2045992350).cljs$core$IFn$_invoke$arity$1(m))){
var seq__39866_40391 = cljs.core.seq(new cljs.core.Keyword(null,"forms","forms",2045992350).cljs$core$IFn$_invoke$arity$1(m));
var chunk__39867_40392 = null;
var count__39868_40393 = (0);
var i__39869_40394 = (0);
while(true){
if((i__39869_40394 < count__39868_40393)){
var f_40395 = chunk__39867_40392.cljs$core$IIndexed$_nth$arity$2(null,i__39869_40394);
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["  ",f_40395], 0));


var G__40396 = seq__39866_40391;
var G__40397 = chunk__39867_40392;
var G__40398 = count__39868_40393;
var G__40399 = (i__39869_40394 + (1));
seq__39866_40391 = G__40396;
chunk__39867_40392 = G__40397;
count__39868_40393 = G__40398;
i__39869_40394 = G__40399;
continue;
} else {
var temp__5825__auto___40400 = cljs.core.seq(seq__39866_40391);
if(temp__5825__auto___40400){
var seq__39866_40402__$1 = temp__5825__auto___40400;
if(cljs.core.chunked_seq_QMARK_(seq__39866_40402__$1)){
var c__5548__auto___40403 = cljs.core.chunk_first(seq__39866_40402__$1);
var G__40404 = cljs.core.chunk_rest(seq__39866_40402__$1);
var G__40405 = c__5548__auto___40403;
var G__40406 = cljs.core.count(c__5548__auto___40403);
var G__40407 = (0);
seq__39866_40391 = G__40404;
chunk__39867_40392 = G__40405;
count__39868_40393 = G__40406;
i__39869_40394 = G__40407;
continue;
} else {
var f_40412 = cljs.core.first(seq__39866_40402__$1);
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["  ",f_40412], 0));


var G__40413 = cljs.core.next(seq__39866_40402__$1);
var G__40414 = null;
var G__40415 = (0);
var G__40416 = (0);
seq__39866_40391 = G__40413;
chunk__39867_40392 = G__40414;
count__39868_40393 = G__40415;
i__39869_40394 = G__40416;
continue;
}
} else {
}
}
break;
}
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m))){
var arglists_40418 = new cljs.core.Keyword(null,"arglists","arglists",1661989754).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_((function (){var or__5025__auto__ = new cljs.core.Keyword(null,"macro","macro",-867863404).cljs$core$IFn$_invoke$arity$1(m);
if(cljs.core.truth_(or__5025__auto__)){
return or__5025__auto__;
} else {
return new cljs.core.Keyword(null,"repl-special-function","repl-special-function",1262603725).cljs$core$IFn$_invoke$arity$1(m);
}
})())){
cljs.core.prn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([arglists_40418], 0));
} else {
cljs.core.prn.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(new cljs.core.Symbol(null,"quote","quote",1377916282,null),cljs.core.first(arglists_40418)))?cljs.core.second(arglists_40418):arglists_40418)], 0));
}
} else {
}
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"special-form","special-form",-1326536374).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Special Form"], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(m)], 0));

if(cljs.core.contains_QMARK_(m,new cljs.core.Keyword(null,"url","url",276297046))){
if(cljs.core.truth_(new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$1(m))){
return cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([["\n  Please see http://clojure.org/",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"url","url",276297046).cljs$core$IFn$_invoke$arity$1(m))].join('')], 0));
} else {
return null;
}
} else {
return cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([["\n  Please see http://clojure.org/special_forms#",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"name","name",1843675177).cljs$core$IFn$_invoke$arity$1(m))].join('')], 0));
}
} else {
if(cljs.core.truth_(new cljs.core.Keyword(null,"macro","macro",-867863404).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Macro"], 0));
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"spec","spec",347520401).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Spec"], 0));
} else {
}

if(cljs.core.truth_(new cljs.core.Keyword(null,"repl-special-function","repl-special-function",1262603725).cljs$core$IFn$_invoke$arity$1(m))){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["REPL Special Function"], 0));
} else {
}

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",new cljs.core.Keyword(null,"doc","doc",1913296891).cljs$core$IFn$_invoke$arity$1(m)], 0));

if(cljs.core.truth_(new cljs.core.Keyword(null,"protocol","protocol",652470118).cljs$core$IFn$_invoke$arity$1(m))){
var seq__39974_40424 = cljs.core.seq(new cljs.core.Keyword(null,"methods","methods",453930866).cljs$core$IFn$_invoke$arity$1(m));
var chunk__39975_40425 = null;
var count__39976_40426 = (0);
var i__39977_40427 = (0);
while(true){
if((i__39977_40427 < count__39976_40426)){
var vec__40049_40428 = chunk__39975_40425.cljs$core$IIndexed$_nth$arity$2(null,i__39977_40427);
var name_40429 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40049_40428,(0),null);
var map__40052_40430 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40049_40428,(1),null);
var map__40052_40431__$1 = cljs.core.__destructure_map(map__40052_40430);
var doc_40432 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40052_40431__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists_40433 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40052_40431__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println();

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",name_40429], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",arglists_40433], 0));

if(cljs.core.truth_(doc_40432)){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",doc_40432], 0));
} else {
}


var G__40434 = seq__39974_40424;
var G__40435 = chunk__39975_40425;
var G__40436 = count__39976_40426;
var G__40437 = (i__39977_40427 + (1));
seq__39974_40424 = G__40434;
chunk__39975_40425 = G__40435;
count__39976_40426 = G__40436;
i__39977_40427 = G__40437;
continue;
} else {
var temp__5825__auto___40439 = cljs.core.seq(seq__39974_40424);
if(temp__5825__auto___40439){
var seq__39974_40440__$1 = temp__5825__auto___40439;
if(cljs.core.chunked_seq_QMARK_(seq__39974_40440__$1)){
var c__5548__auto___40441 = cljs.core.chunk_first(seq__39974_40440__$1);
var G__40442 = cljs.core.chunk_rest(seq__39974_40440__$1);
var G__40443 = c__5548__auto___40441;
var G__40444 = cljs.core.count(c__5548__auto___40441);
var G__40445 = (0);
seq__39974_40424 = G__40442;
chunk__39975_40425 = G__40443;
count__39976_40426 = G__40444;
i__39977_40427 = G__40445;
continue;
} else {
var vec__40073_40446 = cljs.core.first(seq__39974_40440__$1);
var name_40447 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40073_40446,(0),null);
var map__40076_40448 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40073_40446,(1),null);
var map__40076_40449__$1 = cljs.core.__destructure_map(map__40076_40448);
var doc_40450 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40076_40449__$1,new cljs.core.Keyword(null,"doc","doc",1913296891));
var arglists_40451 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40076_40449__$1,new cljs.core.Keyword(null,"arglists","arglists",1661989754));
cljs.core.println();

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",name_40447], 0));

cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",arglists_40451], 0));

if(cljs.core.truth_(doc_40450)){
cljs.core.println.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([" ",doc_40450], 0));
} else {
}


var G__40453 = cljs.core.next(seq__39974_40440__$1);
var G__40454 = null;
var G__40455 = (0);
var G__40456 = (0);
seq__39974_40424 = G__40453;
chunk__39975_40425 = G__40454;
count__39976_40426 = G__40455;
i__39977_40427 = G__40456;
continue;
}
} else {
}
}
break;
}
} else {
}

if(cljs.core.truth_(n)){
var temp__5825__auto__ = cljs.spec.alpha.get_spec(cljs.core.symbol.cljs$core$IFn$_invoke$arity$2(cljs.core.str.cljs$core$IFn$_invoke$arity$1(cljs.core.ns_name(n)),cljs.core.name(nm)));
if(cljs.core.truth_(temp__5825__auto__)){
var fnspec = temp__5825__auto__;
cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2(["Spec"], 0));

var seq__40102 = cljs.core.seq(new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"args","args",1315556576),new cljs.core.Keyword(null,"ret","ret",-468222814),new cljs.core.Keyword(null,"fn","fn",-1175266204)], null));
var chunk__40103 = null;
var count__40104 = (0);
var i__40105 = (0);
while(true){
if((i__40105 < count__40104)){
var role = chunk__40103.cljs$core$IIndexed$_nth$arity$2(null,i__40105);
var temp__5825__auto___40459__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(fnspec,role);
if(cljs.core.truth_(temp__5825__auto___40459__$1)){
var spec_40460 = temp__5825__auto___40459__$1;
cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([["\n ",cljs.core.name(role),":"].join(''),cljs.spec.alpha.describe(spec_40460)], 0));
} else {
}


var G__40462 = seq__40102;
var G__40463 = chunk__40103;
var G__40464 = count__40104;
var G__40465 = (i__40105 + (1));
seq__40102 = G__40462;
chunk__40103 = G__40463;
count__40104 = G__40464;
i__40105 = G__40465;
continue;
} else {
var temp__5825__auto____$1 = cljs.core.seq(seq__40102);
if(temp__5825__auto____$1){
var seq__40102__$1 = temp__5825__auto____$1;
if(cljs.core.chunked_seq_QMARK_(seq__40102__$1)){
var c__5548__auto__ = cljs.core.chunk_first(seq__40102__$1);
var G__40466 = cljs.core.chunk_rest(seq__40102__$1);
var G__40467 = c__5548__auto__;
var G__40468 = cljs.core.count(c__5548__auto__);
var G__40469 = (0);
seq__40102 = G__40466;
chunk__40103 = G__40467;
count__40104 = G__40468;
i__40105 = G__40469;
continue;
} else {
var role = cljs.core.first(seq__40102__$1);
var temp__5825__auto___40471__$2 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(fnspec,role);
if(cljs.core.truth_(temp__5825__auto___40471__$2)){
var spec_40472 = temp__5825__auto___40471__$2;
cljs.core.print.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([["\n ",cljs.core.name(role),":"].join(''),cljs.spec.alpha.describe(spec_40472)], 0));
} else {
}


var G__40473 = cljs.core.next(seq__40102__$1);
var G__40474 = null;
var G__40475 = (0);
var G__40476 = (0);
seq__40102 = G__40473;
chunk__40103 = G__40474;
count__40104 = G__40475;
i__40105 = G__40476;
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
} else {
return null;
}
}
});
/**
 * Constructs a data representation for a Error with keys:
 *  :cause - root cause message
 *  :phase - error phase
 *  :via - cause chain, with cause keys:
 *           :type - exception class symbol
 *           :message - exception message
 *           :data - ex-data
 *           :at - top stack element
 *  :trace - root cause stack elements
 */
cljs.repl.Error__GT_map = (function cljs$repl$Error__GT_map(o){
return cljs.core.Throwable__GT_map(o);
});
/**
 * Returns an analysis of the phase, error, cause, and location of an error that occurred
 *   based on Throwable data, as returned by Throwable->map. All attributes other than phase
 *   are optional:
 *  :clojure.error/phase - keyword phase indicator, one of:
 *    :read-source :compile-syntax-check :compilation :macro-syntax-check :macroexpansion
 *    :execution :read-eval-result :print-eval-result
 *  :clojure.error/source - file name (no path)
 *  :clojure.error/line - integer line number
 *  :clojure.error/column - integer column number
 *  :clojure.error/symbol - symbol being expanded/compiled/invoked
 *  :clojure.error/class - cause exception class symbol
 *  :clojure.error/cause - cause exception message
 *  :clojure.error/spec - explain-data for spec error
 */
cljs.repl.ex_triage = (function cljs$repl$ex_triage(datafied_throwable){
var map__40193 = datafied_throwable;
var map__40193__$1 = cljs.core.__destructure_map(map__40193);
var via = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40193__$1,new cljs.core.Keyword(null,"via","via",-1904457336));
var trace = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40193__$1,new cljs.core.Keyword(null,"trace","trace",-1082747415));
var phase = cljs.core.get.cljs$core$IFn$_invoke$arity$3(map__40193__$1,new cljs.core.Keyword(null,"phase","phase",575722892),new cljs.core.Keyword(null,"execution","execution",253283524));
var map__40194 = cljs.core.last(via);
var map__40194__$1 = cljs.core.__destructure_map(map__40194);
var type = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40194__$1,new cljs.core.Keyword(null,"type","type",1174270348));
var message = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40194__$1,new cljs.core.Keyword(null,"message","message",-406056002));
var data = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40194__$1,new cljs.core.Keyword(null,"data","data",-232669377));
var map__40195 = data;
var map__40195__$1 = cljs.core.__destructure_map(map__40195);
var problems = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40195__$1,new cljs.core.Keyword("cljs.spec.alpha","problems","cljs.spec.alpha/problems",447400814));
var fn = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40195__$1,new cljs.core.Keyword("cljs.spec.alpha","fn","cljs.spec.alpha/fn",408600443));
var caller = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40195__$1,new cljs.core.Keyword("cljs.spec.test.alpha","caller","cljs.spec.test.alpha/caller",-398302390));
var map__40196 = new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(cljs.core.first(via));
var map__40196__$1 = cljs.core.__destructure_map(map__40196);
var top_data = map__40196__$1;
var source = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40196__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397));
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3((function (){var G__40202 = phase;
var G__40202__$1 = (((G__40202 instanceof cljs.core.Keyword))?G__40202.fqn:null);
switch (G__40202__$1) {
case "read-source":
var map__40205 = data;
var map__40205__$1 = cljs.core.__destructure_map(map__40205);
var line = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40205__$1,new cljs.core.Keyword("clojure.error","line","clojure.error/line",-1816287471));
var column = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40205__$1,new cljs.core.Keyword("clojure.error","column","clojure.error/column",304721553));
var G__40208 = cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"data","data",-232669377).cljs$core$IFn$_invoke$arity$1(cljs.core.second(via)),top_data], 0));
var G__40208__$1 = (cljs.core.truth_(source)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__40208,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397),source):G__40208);
var G__40208__$2 = (cljs.core.truth_((function (){var fexpr__40213 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["NO_SOURCE_PATH",null,"NO_SOURCE_FILE",null], null), null);
return (fexpr__40213.cljs$core$IFn$_invoke$arity$1 ? fexpr__40213.cljs$core$IFn$_invoke$arity$1(source) : fexpr__40213.call(null,source));
})())?cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(G__40208__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397)):G__40208__$1);
if(cljs.core.truth_(message)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__40208__$2,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742),message);
} else {
return G__40208__$2;
}

break;
case "compile-syntax-check":
case "compilation":
case "macro-syntax-check":
case "macroexpansion":
var G__40218 = top_data;
var G__40218__$1 = (cljs.core.truth_(source)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__40218,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397),source):G__40218);
var G__40218__$2 = (cljs.core.truth_((function (){var fexpr__40226 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["NO_SOURCE_PATH",null,"NO_SOURCE_FILE",null], null), null);
return (fexpr__40226.cljs$core$IFn$_invoke$arity$1 ? fexpr__40226.cljs$core$IFn$_invoke$arity$1(source) : fexpr__40226.call(null,source));
})())?cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(G__40218__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397)):G__40218__$1);
var G__40218__$3 = (cljs.core.truth_(type)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__40218__$2,new cljs.core.Keyword("clojure.error","class","clojure.error/class",278435890),type):G__40218__$2);
var G__40218__$4 = (cljs.core.truth_(message)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__40218__$3,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742),message):G__40218__$3);
if(cljs.core.truth_(problems)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__40218__$4,new cljs.core.Keyword("clojure.error","spec","clojure.error/spec",2055032595),data);
} else {
return G__40218__$4;
}

break;
case "read-eval-result":
case "print-eval-result":
var vec__40232 = cljs.core.first(trace);
var source__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40232,(0),null);
var method = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40232,(1),null);
var file = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40232,(2),null);
var line = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40232,(3),null);
var G__40239 = top_data;
var G__40239__$1 = (cljs.core.truth_(line)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__40239,new cljs.core.Keyword("clojure.error","line","clojure.error/line",-1816287471),line):G__40239);
var G__40239__$2 = (cljs.core.truth_(file)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__40239__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397),file):G__40239__$1);
var G__40239__$3 = (cljs.core.truth_((function (){var and__5023__auto__ = source__$1;
if(cljs.core.truth_(and__5023__auto__)){
return method;
} else {
return and__5023__auto__;
}
})())?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__40239__$2,new cljs.core.Keyword("clojure.error","symbol","clojure.error/symbol",1544821994),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[source__$1,method],null))):G__40239__$2);
var G__40239__$4 = (cljs.core.truth_(type)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__40239__$3,new cljs.core.Keyword("clojure.error","class","clojure.error/class",278435890),type):G__40239__$3);
if(cljs.core.truth_(message)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__40239__$4,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742),message);
} else {
return G__40239__$4;
}

break;
case "execution":
var vec__40249 = cljs.core.first(trace);
var source__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40249,(0),null);
var method = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40249,(1),null);
var file = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40249,(2),null);
var line = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__40249,(3),null);
var file__$1 = cljs.core.first(cljs.core.remove.cljs$core$IFn$_invoke$arity$2((function (p1__40180_SHARP_){
var or__5025__auto__ = (p1__40180_SHARP_ == null);
if(or__5025__auto__){
return or__5025__auto__;
} else {
var fexpr__40265 = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["NO_SOURCE_PATH",null,"NO_SOURCE_FILE",null], null), null);
return (fexpr__40265.cljs$core$IFn$_invoke$arity$1 ? fexpr__40265.cljs$core$IFn$_invoke$arity$1(p1__40180_SHARP_) : fexpr__40265.call(null,p1__40180_SHARP_));
}
}),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"file","file",-1269645878).cljs$core$IFn$_invoke$arity$1(caller),file], null)));
var err_line = (function (){var or__5025__auto__ = new cljs.core.Keyword(null,"line","line",212345235).cljs$core$IFn$_invoke$arity$1(caller);
if(cljs.core.truth_(or__5025__auto__)){
return or__5025__auto__;
} else {
return line;
}
})();
var G__40269 = new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword("clojure.error","class","clojure.error/class",278435890),type], null);
var G__40269__$1 = (cljs.core.truth_(err_line)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__40269,new cljs.core.Keyword("clojure.error","line","clojure.error/line",-1816287471),err_line):G__40269);
var G__40269__$2 = (cljs.core.truth_(message)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__40269__$1,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742),message):G__40269__$1);
var G__40269__$3 = (cljs.core.truth_((function (){var or__5025__auto__ = fn;
if(cljs.core.truth_(or__5025__auto__)){
return or__5025__auto__;
} else {
var and__5023__auto__ = source__$1;
if(cljs.core.truth_(and__5023__auto__)){
return method;
} else {
return and__5023__auto__;
}
}
})())?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__40269__$2,new cljs.core.Keyword("clojure.error","symbol","clojure.error/symbol",1544821994),(function (){var or__5025__auto__ = fn;
if(cljs.core.truth_(or__5025__auto__)){
return or__5025__auto__;
} else {
return (new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[source__$1,method],null));
}
})()):G__40269__$2);
var G__40269__$4 = (cljs.core.truth_(file__$1)?cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__40269__$3,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397),file__$1):G__40269__$3);
if(cljs.core.truth_(problems)){
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(G__40269__$4,new cljs.core.Keyword("clojure.error","spec","clojure.error/spec",2055032595),data);
} else {
return G__40269__$4;
}

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__40202__$1)].join('')));

}
})(),new cljs.core.Keyword("clojure.error","phase","clojure.error/phase",275140358),phase);
});
/**
 * Returns a string from exception data, as produced by ex-triage.
 *   The first line summarizes the exception phase and location.
 *   The subsequent lines describe the cause.
 */
cljs.repl.ex_str = (function cljs$repl$ex_str(p__40297){
var map__40298 = p__40297;
var map__40298__$1 = cljs.core.__destructure_map(map__40298);
var triage_data = map__40298__$1;
var phase = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40298__$1,new cljs.core.Keyword("clojure.error","phase","clojure.error/phase",275140358));
var source = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40298__$1,new cljs.core.Keyword("clojure.error","source","clojure.error/source",-2011936397));
var line = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40298__$1,new cljs.core.Keyword("clojure.error","line","clojure.error/line",-1816287471));
var column = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40298__$1,new cljs.core.Keyword("clojure.error","column","clojure.error/column",304721553));
var symbol = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40298__$1,new cljs.core.Keyword("clojure.error","symbol","clojure.error/symbol",1544821994));
var class$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40298__$1,new cljs.core.Keyword("clojure.error","class","clojure.error/class",278435890));
var cause = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40298__$1,new cljs.core.Keyword("clojure.error","cause","clojure.error/cause",-1879175742));
var spec = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__40298__$1,new cljs.core.Keyword("clojure.error","spec","clojure.error/spec",2055032595));
var loc = [cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var or__5025__auto__ = source;
if(cljs.core.truth_(or__5025__auto__)){
return or__5025__auto__;
} else {
return "<cljs repl>";
}
})()),":",cljs.core.str.cljs$core$IFn$_invoke$arity$1((function (){var or__5025__auto__ = line;
if(cljs.core.truth_(or__5025__auto__)){
return or__5025__auto__;
} else {
return (1);
}
})()),(cljs.core.truth_(column)?[":",cljs.core.str.cljs$core$IFn$_invoke$arity$1(column)].join(''):"")].join('');
var class_name = cljs.core.name((function (){var or__5025__auto__ = class$;
if(cljs.core.truth_(or__5025__auto__)){
return or__5025__auto__;
} else {
return "";
}
})());
var simple_class = class_name;
var cause_type = ((cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, ["RuntimeException",null,"Exception",null], null), null),simple_class))?"":[" (",simple_class,")"].join(''));
var format = goog.string.format;
var G__40302 = phase;
var G__40302__$1 = (((G__40302 instanceof cljs.core.Keyword))?G__40302.fqn:null);
switch (G__40302__$1) {
case "read-source":
return (format.cljs$core$IFn$_invoke$arity$3 ? format.cljs$core$IFn$_invoke$arity$3("Syntax error reading source at (%s).\n%s\n",loc,cause) : format.call(null,"Syntax error reading source at (%s).\n%s\n",loc,cause));

break;
case "macro-syntax-check":
var G__40308 = "Syntax error macroexpanding %sat (%s).\n%s";
var G__40309 = (cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):"");
var G__40310 = loc;
var G__40311 = (cljs.core.truth_(spec)?(function (){var sb__5670__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR__orig_val__40313_40522 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR__orig_val__40314_40523 = cljs.core._STAR_print_fn_STAR_;
var _STAR_print_newline_STAR__temp_val__40315_40524 = true;
var _STAR_print_fn_STAR__temp_val__40316_40525 = (function (x__5671__auto__){
return sb__5670__auto__.append(x__5671__auto__);
});
(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__temp_val__40315_40524);

(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__temp_val__40316_40525);

try{cljs.spec.alpha.explain_out(cljs.core.update.cljs$core$IFn$_invoke$arity$3(spec,new cljs.core.Keyword("cljs.spec.alpha","problems","cljs.spec.alpha/problems",447400814),(function (probs){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__40290_SHARP_){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__40290_SHARP_,new cljs.core.Keyword(null,"in","in",-1531184865));
}),probs);
}))
);
}finally {(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__orig_val__40314_40523);

(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__orig_val__40313_40522);
}
return cljs.core.str.cljs$core$IFn$_invoke$arity$1(sb__5670__auto__);
})():(format.cljs$core$IFn$_invoke$arity$2 ? format.cljs$core$IFn$_invoke$arity$2("%s\n",cause) : format.call(null,"%s\n",cause)));
return (format.cljs$core$IFn$_invoke$arity$4 ? format.cljs$core$IFn$_invoke$arity$4(G__40308,G__40309,G__40310,G__40311) : format.call(null,G__40308,G__40309,G__40310,G__40311));

break;
case "macroexpansion":
var G__40324 = "Unexpected error%s macroexpanding %sat (%s).\n%s\n";
var G__40325 = cause_type;
var G__40326 = (cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):"");
var G__40327 = loc;
var G__40328 = cause;
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5(G__40324,G__40325,G__40326,G__40327,G__40328) : format.call(null,G__40324,G__40325,G__40326,G__40327,G__40328));

break;
case "compile-syntax-check":
var G__40329 = "Syntax error%s compiling %sat (%s).\n%s\n";
var G__40330 = cause_type;
var G__40331 = (cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):"");
var G__40332 = loc;
var G__40333 = cause;
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5(G__40329,G__40330,G__40331,G__40332,G__40333) : format.call(null,G__40329,G__40330,G__40331,G__40332,G__40333));

break;
case "compilation":
var G__40338 = "Unexpected error%s compiling %sat (%s).\n%s\n";
var G__40339 = cause_type;
var G__40340 = (cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):"");
var G__40341 = loc;
var G__40342 = cause;
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5(G__40338,G__40339,G__40340,G__40341,G__40342) : format.call(null,G__40338,G__40339,G__40340,G__40341,G__40342));

break;
case "read-eval-result":
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5("Error reading eval result%s at %s (%s).\n%s\n",cause_type,symbol,loc,cause) : format.call(null,"Error reading eval result%s at %s (%s).\n%s\n",cause_type,symbol,loc,cause));

break;
case "print-eval-result":
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5("Error printing return value%s at %s (%s).\n%s\n",cause_type,symbol,loc,cause) : format.call(null,"Error printing return value%s at %s (%s).\n%s\n",cause_type,symbol,loc,cause));

break;
case "execution":
if(cljs.core.truth_(spec)){
var G__40347 = "Execution error - invalid arguments to %s at (%s).\n%s";
var G__40348 = symbol;
var G__40349 = loc;
var G__40350 = (function (){var sb__5670__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR__orig_val__40352_40532 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR__orig_val__40353_40533 = cljs.core._STAR_print_fn_STAR_;
var _STAR_print_newline_STAR__temp_val__40354_40534 = true;
var _STAR_print_fn_STAR__temp_val__40355_40535 = (function (x__5671__auto__){
return sb__5670__auto__.append(x__5671__auto__);
});
(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__temp_val__40354_40534);

(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__temp_val__40355_40535);

try{cljs.spec.alpha.explain_out(cljs.core.update.cljs$core$IFn$_invoke$arity$3(spec,new cljs.core.Keyword("cljs.spec.alpha","problems","cljs.spec.alpha/problems",447400814),(function (probs){
return cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p1__40295_SHARP_){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(p1__40295_SHARP_,new cljs.core.Keyword(null,"in","in",-1531184865));
}),probs);
}))
);
}finally {(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__orig_val__40353_40533);

(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__orig_val__40352_40532);
}
return cljs.core.str.cljs$core$IFn$_invoke$arity$1(sb__5670__auto__);
})();
return (format.cljs$core$IFn$_invoke$arity$4 ? format.cljs$core$IFn$_invoke$arity$4(G__40347,G__40348,G__40349,G__40350) : format.call(null,G__40347,G__40348,G__40349,G__40350));
} else {
var G__40365 = "Execution error%s at %s(%s).\n%s\n";
var G__40366 = cause_type;
var G__40367 = (cljs.core.truth_(symbol)?[cljs.core.str.cljs$core$IFn$_invoke$arity$1(symbol)," "].join(''):"");
var G__40368 = loc;
var G__40369 = cause;
return (format.cljs$core$IFn$_invoke$arity$5 ? format.cljs$core$IFn$_invoke$arity$5(G__40365,G__40366,G__40367,G__40368,G__40369) : format.call(null,G__40365,G__40366,G__40367,G__40368,G__40369));
}

break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__40302__$1)].join('')));

}
});
cljs.repl.error__GT_str = (function cljs$repl$error__GT_str(error){
return cljs.repl.ex_str(cljs.repl.ex_triage(cljs.repl.Error__GT_map(error)));
});

//# sourceMappingURL=cljs.repl.js.map
