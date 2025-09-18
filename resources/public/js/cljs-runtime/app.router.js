goog.provide('app.router');
app.router.routes = new cljs.core.PersistentVector(null, 4, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["/",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"home","home",-74557309)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["/about",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"about","about",1423892543)], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["/admin",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"admin","admin",-1239101627),new cljs.core.Keyword(null,"requires-auth","requires-auth",1675442809),true], null)], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, ["/login",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"name","name",1843675177),new cljs.core.Keyword(null,"login","login",55217519)], null)], null)], null);
app.router.router = reitit.frontend.router.cljs$core$IFn$_invoke$arity$1(app.router.routes);
if((typeof app !== 'undefined') && (typeof app.router !== 'undefined') && (typeof app.router.current !== 'undefined')){
} else {
app.router.current = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null);
}
if((typeof app !== 'undefined') && (typeof app.router !== 'undefined') && (typeof app.router.started_QMARK_ !== 'undefined')){
} else {
app.router.started_QMARK_ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(false);
}
app.router.start_BANG_ = (function app$router$start_BANG_(){
if(cljs.core.compare_and_set_BANG_(app.router.started_QMARK_,false,true)){
return reitit.frontend.easy.start_BANG_(app.router.router,(function (m){
return cljs.core.reset_BANG_(app.router.current,m);
}),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"use-fragment","use-fragment",-1617737154),true], null));
} else {
return null;
}
});
app.router.stop_BANG_ = (function app$router$stop_BANG_(){
return cljs.core.reset_BANG_(app.router.started_QMARK_,false);
});
app.router.href = (function app$router$href(var_args){
var args__5755__auto__ = [];
var len__5749__auto___51302 = arguments.length;
var i__5750__auto___51303 = (0);
while(true){
if((i__5750__auto___51303 < len__5749__auto___51302)){
args__5755__auto__.push((arguments[i__5750__auto___51303]));

var G__51304 = (i__5750__auto___51303 + (1));
i__5750__auto___51303 = G__51304;
continue;
} else {
}
break;
}

var argseq__5756__auto__ = ((((1) < args__5755__auto__.length))?(new cljs.core.IndexedSeq(args__5755__auto__.slice((1)),(0),null)):null);
return app.router.href.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5756__auto__);
});

(app.router.href.cljs$core$IFn$_invoke$arity$variadic = (function (name,p__51287){
var vec__51288 = p__51287;
var params = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__51288,(0),null);
var query = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__51288,(1),null);
return reitit.frontend.easy.href.cljs$core$IFn$_invoke$arity$3(name,params,query);
}));

(app.router.href.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(app.router.href.cljs$lang$applyTo = (function (seq51284){
var G__51285 = cljs.core.first(seq51284);
var seq51284__$1 = cljs.core.next(seq51284);
var self__5734__auto__ = this;
return self__5734__auto__.cljs$core$IFn$_invoke$arity$variadic(G__51285,seq51284__$1);
}));

app.router.navigate_BANG_ = (function app$router$navigate_BANG_(var_args){
var args__5755__auto__ = [];
var len__5749__auto___51305 = arguments.length;
var i__5750__auto___51306 = (0);
while(true){
if((i__5750__auto___51306 < len__5749__auto___51305)){
args__5755__auto__.push((arguments[i__5750__auto___51306]));

var G__51308 = (i__5750__auto___51306 + (1));
i__5750__auto___51306 = G__51308;
continue;
} else {
}
break;
}

var argseq__5756__auto__ = ((((1) < args__5755__auto__.length))?(new cljs.core.IndexedSeq(args__5755__auto__.slice((1)),(0),null)):null);
return app.router.navigate_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5756__auto__);
});

(app.router.navigate_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (name,p__51298){
var vec__51299 = p__51298;
var params = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__51299,(0),null);
var query = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__51299,(1),null);
return reitit.frontend.easy.push_state.cljs$core$IFn$_invoke$arity$3(name,params,query);
}));

(app.router.navigate_BANG_.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(app.router.navigate_BANG_.cljs$lang$applyTo = (function (seq51292){
var G__51293 = cljs.core.first(seq51292);
var seq51292__$1 = cljs.core.next(seq51292);
var self__5734__auto__ = this;
return self__5734__auto__.cljs$core$IFn$_invoke$arity$variadic(G__51293,seq51292__$1);
}));


//# sourceMappingURL=app.router.js.map
