goog.provide('bumblebee.ui.router');
bumblebee.ui.router.routes = new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["/",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"home","home",-74557309)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["/about",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"about","about",1423892543)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["/admin",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"admin","admin",-1239101627),new cljs.core.Keyword(null,"requires-auth","requires-auth",1675442809),true], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["/login",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"login","login",55217519)], null)], null)], null);
bumblebee.ui.router.router = reitit.frontend.router.cljs$core$IFn$_invoke$arity$1(bumblebee.ui.router.routes);
if((typeof bumblebee !== 'undefined') && (typeof bumblebee.ui !== 'undefined') && (typeof bumblebee.ui.router !== 'undefined') && (typeof bumblebee.ui.router.current !== 'undefined')){
} else {
bumblebee.ui.router.current = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null);
}
if((typeof bumblebee !== 'undefined') && (typeof bumblebee.ui !== 'undefined') && (typeof bumblebee.ui.router !== 'undefined') && (typeof bumblebee.ui.router.started_QMARK_ !== 'undefined')){
} else {
bumblebee.ui.router.started_QMARK_ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(false);
}
bumblebee.ui.router.start_BANG_ = (function bumblebee$ui$router$start_BANG_(){
if(cljs.core.compare_and_set_BANG_(bumblebee.ui.router.started_QMARK_,false,true)){
return reitit.frontend.easy.start_BANG_(bumblebee.ui.router.router,(function (m){
return cljs.core.reset_BANG_(bumblebee.ui.router.current,m);
}),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"use-fragment","use-fragment",-1617737154),true], null));
} else {
return null;
}
});
bumblebee.ui.router.stop_BANG_ = (function bumblebee$ui$router$stop_BANG_(){
return cljs.core.reset_BANG_(bumblebee.ui.router.started_QMARK_,false);
});
bumblebee.ui.router.href = (function bumblebee$ui$router$href(var_args){
var args__5755__auto__ = [];
var len__5749__auto___37358 = arguments.length;
var i__5750__auto___37359 = (0);
while(true){
if((i__5750__auto___37359 < len__5749__auto___37358)){
args__5755__auto__.push((arguments[i__5750__auto___37359]));

var G__37360 = (i__5750__auto___37359 + (1));
i__5750__auto___37359 = G__37360;
continue;
} else {
}
break;
}

var argseq__5756__auto__ = ((((1) < args__5755__auto__.length))?(new cljs.core.IndexedSeq(args__5755__auto__.slice((1)),(0),null)):null);
return bumblebee.ui.router.href.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5756__auto__);
});

(bumblebee.ui.router.href.cljs$core$IFn$_invoke$arity$variadic = (function (name,p__37348){
var vec__37349 = p__37348;
var params = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37349,(0),null);
var query = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37349,(1),null);
return reitit.frontend.easy.href.cljs$core$IFn$_invoke$arity$3(name,params,query);
}));

(bumblebee.ui.router.href.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(bumblebee.ui.router.href.cljs$lang$applyTo = (function (seq37345){
var G__37346 = cljs.core.first(seq37345);
var seq37345__$1 = cljs.core.next(seq37345);
var self__5734__auto__ = this;
return self__5734__auto__.cljs$core$IFn$_invoke$arity$variadic(G__37346,seq37345__$1);
}));

bumblebee.ui.router.navigate_BANG_ = (function bumblebee$ui$router$navigate_BANG_(var_args){
var args__5755__auto__ = [];
var len__5749__auto___37367 = arguments.length;
var i__5750__auto___37368 = (0);
while(true){
if((i__5750__auto___37368 < len__5749__auto___37367)){
args__5755__auto__.push((arguments[i__5750__auto___37368]));

var G__37369 = (i__5750__auto___37368 + (1));
i__5750__auto___37368 = G__37369;
continue;
} else {
}
break;
}

var argseq__5756__auto__ = ((((1) < args__5755__auto__.length))?(new cljs.core.IndexedSeq(args__5755__auto__.slice((1)),(0),null)):null);
return bumblebee.ui.router.navigate_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5756__auto__);
});

(bumblebee.ui.router.navigate_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (name,p__37354){
var vec__37355 = p__37354;
var params = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37355,(0),null);
var query = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37355,(1),null);
return reitit.frontend.easy.push_state.cljs$core$IFn$_invoke$arity$3(name,params,query);
}));

(bumblebee.ui.router.navigate_BANG_.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(bumblebee.ui.router.navigate_BANG_.cljs$lang$applyTo = (function (seq37352){
var G__37353 = cljs.core.first(seq37352);
var seq37352__$1 = cljs.core.next(seq37352);
var self__5734__auto__ = this;
return self__5734__auto__.cljs$core$IFn$_invoke$arity$variadic(G__37353,seq37352__$1);
}));


//# sourceMappingURL=bumblebee.ui.router.js.map
