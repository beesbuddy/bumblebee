goog.provide('devtools.format');

/**
 * @interface
 */
devtools.format.IDevtoolsFormat = function(){};

var devtools$format$IDevtoolsFormat$_header$dyn_31523 = (function (value){
var x__5373__auto__ = (((value == null))?null:value);
var m__5374__auto__ = (devtools.format._header[goog.typeOf(x__5373__auto__)]);
if((!((m__5374__auto__ == null)))){
return (m__5374__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5374__auto__.cljs$core$IFn$_invoke$arity$1(value) : m__5374__auto__.call(null,value));
} else {
var m__5372__auto__ = (devtools.format._header["_"]);
if((!((m__5372__auto__ == null)))){
return (m__5372__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5372__auto__.cljs$core$IFn$_invoke$arity$1(value) : m__5372__auto__.call(null,value));
} else {
throw cljs.core.missing_protocol("IDevtoolsFormat.-header",value);
}
}
});
devtools.format._header = (function devtools$format$_header(value){
if((((!((value == null)))) && ((!((value.devtools$format$IDevtoolsFormat$_header$arity$1 == null)))))){
return value.devtools$format$IDevtoolsFormat$_header$arity$1(value);
} else {
return devtools$format$IDevtoolsFormat$_header$dyn_31523(value);
}
});

var devtools$format$IDevtoolsFormat$_has_body$dyn_31530 = (function (value){
var x__5373__auto__ = (((value == null))?null:value);
var m__5374__auto__ = (devtools.format._has_body[goog.typeOf(x__5373__auto__)]);
if((!((m__5374__auto__ == null)))){
return (m__5374__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5374__auto__.cljs$core$IFn$_invoke$arity$1(value) : m__5374__auto__.call(null,value));
} else {
var m__5372__auto__ = (devtools.format._has_body["_"]);
if((!((m__5372__auto__ == null)))){
return (m__5372__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5372__auto__.cljs$core$IFn$_invoke$arity$1(value) : m__5372__auto__.call(null,value));
} else {
throw cljs.core.missing_protocol("IDevtoolsFormat.-has-body",value);
}
}
});
devtools.format._has_body = (function devtools$format$_has_body(value){
if((((!((value == null)))) && ((!((value.devtools$format$IDevtoolsFormat$_has_body$arity$1 == null)))))){
return value.devtools$format$IDevtoolsFormat$_has_body$arity$1(value);
} else {
return devtools$format$IDevtoolsFormat$_has_body$dyn_31530(value);
}
});

var devtools$format$IDevtoolsFormat$_body$dyn_31537 = (function (value){
var x__5373__auto__ = (((value == null))?null:value);
var m__5374__auto__ = (devtools.format._body[goog.typeOf(x__5373__auto__)]);
if((!((m__5374__auto__ == null)))){
return (m__5374__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5374__auto__.cljs$core$IFn$_invoke$arity$1(value) : m__5374__auto__.call(null,value));
} else {
var m__5372__auto__ = (devtools.format._body["_"]);
if((!((m__5372__auto__ == null)))){
return (m__5372__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5372__auto__.cljs$core$IFn$_invoke$arity$1(value) : m__5372__auto__.call(null,value));
} else {
throw cljs.core.missing_protocol("IDevtoolsFormat.-body",value);
}
}
});
devtools.format._body = (function devtools$format$_body(value){
if((((!((value == null)))) && ((!((value.devtools$format$IDevtoolsFormat$_body$arity$1 == null)))))){
return value.devtools$format$IDevtoolsFormat$_body$arity$1(value);
} else {
return devtools$format$IDevtoolsFormat$_body$dyn_31537(value);
}
});

devtools.format.setup_BANG_ = (function devtools$format$setup_BANG_(){
if(cljs.core.truth_(devtools.format._STAR_setup_done_STAR_)){
return null;
} else {
(devtools.format._STAR_setup_done_STAR_ = true);

devtools.format.make_template_fn = (function (){var temp__5823__auto__ = (devtools.context.get_root.call(null)["devtools"]);
if(cljs.core.truth_(temp__5823__auto__)){
var o31264 = temp__5823__auto__;
var temp__5823__auto____$1 = (o31264["formatters"]);
if(cljs.core.truth_(temp__5823__auto____$1)){
var o31265 = temp__5823__auto____$1;
var temp__5823__auto____$2 = (o31265["templating"]);
if(cljs.core.truth_(temp__5823__auto____$2)){
var o31266 = temp__5823__auto____$2;
return (o31266["make_template"]);
} else {
return null;
}
} else {
return null;
}
} else {
return null;
}
})();

devtools.format.make_group_fn = (function (){var temp__5823__auto__ = (devtools.context.get_root.call(null)["devtools"]);
if(cljs.core.truth_(temp__5823__auto__)){
var o31281 = temp__5823__auto__;
var temp__5823__auto____$1 = (o31281["formatters"]);
if(cljs.core.truth_(temp__5823__auto____$1)){
var o31282 = temp__5823__auto____$1;
var temp__5823__auto____$2 = (o31282["templating"]);
if(cljs.core.truth_(temp__5823__auto____$2)){
var o31283 = temp__5823__auto____$2;
return (o31283["make_group"]);
} else {
return null;
}
} else {
return null;
}
} else {
return null;
}
})();

devtools.format.make_reference_fn = (function (){var temp__5823__auto__ = (devtools.context.get_root.call(null)["devtools"]);
if(cljs.core.truth_(temp__5823__auto__)){
var o31291 = temp__5823__auto__;
var temp__5823__auto____$1 = (o31291["formatters"]);
if(cljs.core.truth_(temp__5823__auto____$1)){
var o31292 = temp__5823__auto____$1;
var temp__5823__auto____$2 = (o31292["templating"]);
if(cljs.core.truth_(temp__5823__auto____$2)){
var o31293 = temp__5823__auto____$2;
return (o31293["make_reference"]);
} else {
return null;
}
} else {
return null;
}
} else {
return null;
}
})();

devtools.format.make_surrogate_fn = (function (){var temp__5823__auto__ = (devtools.context.get_root.call(null)["devtools"]);
if(cljs.core.truth_(temp__5823__auto__)){
var o31305 = temp__5823__auto__;
var temp__5823__auto____$1 = (o31305["formatters"]);
if(cljs.core.truth_(temp__5823__auto____$1)){
var o31306 = temp__5823__auto____$1;
var temp__5823__auto____$2 = (o31306["templating"]);
if(cljs.core.truth_(temp__5823__auto____$2)){
var o31307 = temp__5823__auto____$2;
return (o31307["make_surrogate"]);
} else {
return null;
}
} else {
return null;
}
} else {
return null;
}
})();

devtools.format.render_markup_fn = (function (){var temp__5823__auto__ = (devtools.context.get_root.call(null)["devtools"]);
if(cljs.core.truth_(temp__5823__auto__)){
var o31322 = temp__5823__auto__;
var temp__5823__auto____$1 = (o31322["formatters"]);
if(cljs.core.truth_(temp__5823__auto____$1)){
var o31323 = temp__5823__auto____$1;
var temp__5823__auto____$2 = (o31323["templating"]);
if(cljs.core.truth_(temp__5823__auto____$2)){
var o31324 = temp__5823__auto____$2;
return (o31324["render_markup"]);
} else {
return null;
}
} else {
return null;
}
} else {
return null;
}
})();

devtools.format._LT_header_GT__fn = (function (){var temp__5823__auto__ = (devtools.context.get_root.call(null)["devtools"]);
if(cljs.core.truth_(temp__5823__auto__)){
var o31336 = temp__5823__auto__;
var temp__5823__auto____$1 = (o31336["formatters"]);
if(cljs.core.truth_(temp__5823__auto____$1)){
var o31337 = temp__5823__auto____$1;
var temp__5823__auto____$2 = (o31337["markup"]);
if(cljs.core.truth_(temp__5823__auto____$2)){
var o31338 = temp__5823__auto____$2;
return (o31338["_LT_header_GT_"]);
} else {
return null;
}
} else {
return null;
}
} else {
return null;
}
})();

devtools.format._LT_standard_body_GT__fn = (function (){var temp__5823__auto__ = (devtools.context.get_root.call(null)["devtools"]);
if(cljs.core.truth_(temp__5823__auto__)){
var o31345 = temp__5823__auto__;
var temp__5823__auto____$1 = (o31345["formatters"]);
if(cljs.core.truth_(temp__5823__auto____$1)){
var o31346 = temp__5823__auto____$1;
var temp__5823__auto____$2 = (o31346["markup"]);
if(cljs.core.truth_(temp__5823__auto____$2)){
var o31347 = temp__5823__auto____$2;
return (o31347["_LT_standard_body_GT_"]);
} else {
return null;
}
} else {
return null;
}
} else {
return null;
}
})();

if(cljs.core.truth_(devtools.format.make_template_fn)){
} else {
throw (new Error("Assert failed: make-template-fn"));
}

if(cljs.core.truth_(devtools.format.make_group_fn)){
} else {
throw (new Error("Assert failed: make-group-fn"));
}

if(cljs.core.truth_(devtools.format.make_reference_fn)){
} else {
throw (new Error("Assert failed: make-reference-fn"));
}

if(cljs.core.truth_(devtools.format.make_surrogate_fn)){
} else {
throw (new Error("Assert failed: make-surrogate-fn"));
}

if(cljs.core.truth_(devtools.format.render_markup_fn)){
} else {
throw (new Error("Assert failed: render-markup-fn"));
}

if(cljs.core.truth_(devtools.format._LT_header_GT__fn)){
} else {
throw (new Error("Assert failed: <header>-fn"));
}

if(cljs.core.truth_(devtools.format._LT_standard_body_GT__fn)){
return null;
} else {
throw (new Error("Assert failed: <standard-body>-fn"));
}
}
});
devtools.format.render_markup = (function devtools$format$render_markup(var_args){
var args__5755__auto__ = [];
var len__5749__auto___31562 = arguments.length;
var i__5750__auto___31564 = (0);
while(true){
if((i__5750__auto___31564 < len__5749__auto___31562)){
args__5755__auto__.push((arguments[i__5750__auto___31564]));

var G__31568 = (i__5750__auto___31564 + (1));
i__5750__auto___31564 = G__31568;
continue;
} else {
}
break;
}

var argseq__5756__auto__ = ((((0) < args__5755__auto__.length))?(new cljs.core.IndexedSeq(args__5755__auto__.slice((0)),(0),null)):null);
return devtools.format.render_markup.cljs$core$IFn$_invoke$arity$variadic(argseq__5756__auto__);
});

(devtools.format.render_markup.cljs$core$IFn$_invoke$arity$variadic = (function (args){
devtools.format.setup_BANG_();

return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(devtools.format.render_markup_fn,args);
}));

(devtools.format.render_markup.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(devtools.format.render_markup.cljs$lang$applyTo = (function (seq31371){
var self__5735__auto__ = this;
return self__5735__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq31371));
}));

devtools.format.make_template = (function devtools$format$make_template(var_args){
var args__5755__auto__ = [];
var len__5749__auto___31572 = arguments.length;
var i__5750__auto___31573 = (0);
while(true){
if((i__5750__auto___31573 < len__5749__auto___31572)){
args__5755__auto__.push((arguments[i__5750__auto___31573]));

var G__31574 = (i__5750__auto___31573 + (1));
i__5750__auto___31573 = G__31574;
continue;
} else {
}
break;
}

var argseq__5756__auto__ = ((((0) < args__5755__auto__.length))?(new cljs.core.IndexedSeq(args__5755__auto__.slice((0)),(0),null)):null);
return devtools.format.make_template.cljs$core$IFn$_invoke$arity$variadic(argseq__5756__auto__);
});

(devtools.format.make_template.cljs$core$IFn$_invoke$arity$variadic = (function (args){
devtools.format.setup_BANG_();

return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(devtools.format.make_template_fn,args);
}));

(devtools.format.make_template.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(devtools.format.make_template.cljs$lang$applyTo = (function (seq31385){
var self__5735__auto__ = this;
return self__5735__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq31385));
}));

devtools.format.make_group = (function devtools$format$make_group(var_args){
var args__5755__auto__ = [];
var len__5749__auto___31579 = arguments.length;
var i__5750__auto___31580 = (0);
while(true){
if((i__5750__auto___31580 < len__5749__auto___31579)){
args__5755__auto__.push((arguments[i__5750__auto___31580]));

var G__31582 = (i__5750__auto___31580 + (1));
i__5750__auto___31580 = G__31582;
continue;
} else {
}
break;
}

var argseq__5756__auto__ = ((((0) < args__5755__auto__.length))?(new cljs.core.IndexedSeq(args__5755__auto__.slice((0)),(0),null)):null);
return devtools.format.make_group.cljs$core$IFn$_invoke$arity$variadic(argseq__5756__auto__);
});

(devtools.format.make_group.cljs$core$IFn$_invoke$arity$variadic = (function (args){
devtools.format.setup_BANG_();

return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(devtools.format.make_group_fn,args);
}));

(devtools.format.make_group.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(devtools.format.make_group.cljs$lang$applyTo = (function (seq31402){
var self__5735__auto__ = this;
return self__5735__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq31402));
}));

devtools.format.make_surrogate = (function devtools$format$make_surrogate(var_args){
var args__5755__auto__ = [];
var len__5749__auto___31586 = arguments.length;
var i__5750__auto___31587 = (0);
while(true){
if((i__5750__auto___31587 < len__5749__auto___31586)){
args__5755__auto__.push((arguments[i__5750__auto___31587]));

var G__31588 = (i__5750__auto___31587 + (1));
i__5750__auto___31587 = G__31588;
continue;
} else {
}
break;
}

var argseq__5756__auto__ = ((((0) < args__5755__auto__.length))?(new cljs.core.IndexedSeq(args__5755__auto__.slice((0)),(0),null)):null);
return devtools.format.make_surrogate.cljs$core$IFn$_invoke$arity$variadic(argseq__5756__auto__);
});

(devtools.format.make_surrogate.cljs$core$IFn$_invoke$arity$variadic = (function (args){
devtools.format.setup_BANG_();

return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(devtools.format.make_surrogate_fn,args);
}));

(devtools.format.make_surrogate.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(devtools.format.make_surrogate.cljs$lang$applyTo = (function (seq31405){
var self__5735__auto__ = this;
return self__5735__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq31405));
}));

devtools.format.template = (function devtools$format$template(var_args){
var args__5755__auto__ = [];
var len__5749__auto___31593 = arguments.length;
var i__5750__auto___31594 = (0);
while(true){
if((i__5750__auto___31594 < len__5749__auto___31593)){
args__5755__auto__.push((arguments[i__5750__auto___31594]));

var G__31597 = (i__5750__auto___31594 + (1));
i__5750__auto___31594 = G__31597;
continue;
} else {
}
break;
}

var argseq__5756__auto__ = ((((0) < args__5755__auto__.length))?(new cljs.core.IndexedSeq(args__5755__auto__.slice((0)),(0),null)):null);
return devtools.format.template.cljs$core$IFn$_invoke$arity$variadic(argseq__5756__auto__);
});

(devtools.format.template.cljs$core$IFn$_invoke$arity$variadic = (function (args){
devtools.format.setup_BANG_();

return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(devtools.format.make_template_fn,args);
}));

(devtools.format.template.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(devtools.format.template.cljs$lang$applyTo = (function (seq31414){
var self__5735__auto__ = this;
return self__5735__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq31414));
}));

devtools.format.group = (function devtools$format$group(var_args){
var args__5755__auto__ = [];
var len__5749__auto___31601 = arguments.length;
var i__5750__auto___31602 = (0);
while(true){
if((i__5750__auto___31602 < len__5749__auto___31601)){
args__5755__auto__.push((arguments[i__5750__auto___31602]));

var G__31603 = (i__5750__auto___31602 + (1));
i__5750__auto___31602 = G__31603;
continue;
} else {
}
break;
}

var argseq__5756__auto__ = ((((0) < args__5755__auto__.length))?(new cljs.core.IndexedSeq(args__5755__auto__.slice((0)),(0),null)):null);
return devtools.format.group.cljs$core$IFn$_invoke$arity$variadic(argseq__5756__auto__);
});

(devtools.format.group.cljs$core$IFn$_invoke$arity$variadic = (function (args){
devtools.format.setup_BANG_();

return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(devtools.format.make_group_fn,args);
}));

(devtools.format.group.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(devtools.format.group.cljs$lang$applyTo = (function (seq31427){
var self__5735__auto__ = this;
return self__5735__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq31427));
}));

devtools.format.surrogate = (function devtools$format$surrogate(var_args){
var args__5755__auto__ = [];
var len__5749__auto___31618 = arguments.length;
var i__5750__auto___31619 = (0);
while(true){
if((i__5750__auto___31619 < len__5749__auto___31618)){
args__5755__auto__.push((arguments[i__5750__auto___31619]));

var G__31621 = (i__5750__auto___31619 + (1));
i__5750__auto___31619 = G__31621;
continue;
} else {
}
break;
}

var argseq__5756__auto__ = ((((0) < args__5755__auto__.length))?(new cljs.core.IndexedSeq(args__5755__auto__.slice((0)),(0),null)):null);
return devtools.format.surrogate.cljs$core$IFn$_invoke$arity$variadic(argseq__5756__auto__);
});

(devtools.format.surrogate.cljs$core$IFn$_invoke$arity$variadic = (function (args){
devtools.format.setup_BANG_();

return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(devtools.format.make_surrogate_fn,args);
}));

(devtools.format.surrogate.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(devtools.format.surrogate.cljs$lang$applyTo = (function (seq31442){
var self__5735__auto__ = this;
return self__5735__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq31442));
}));

devtools.format.reference = (function devtools$format$reference(var_args){
var args__5755__auto__ = [];
var len__5749__auto___31635 = arguments.length;
var i__5750__auto___31636 = (0);
while(true){
if((i__5750__auto___31636 < len__5749__auto___31635)){
args__5755__auto__.push((arguments[i__5750__auto___31636]));

var G__31640 = (i__5750__auto___31636 + (1));
i__5750__auto___31636 = G__31640;
continue;
} else {
}
break;
}

var argseq__5756__auto__ = ((((1) < args__5755__auto__.length))?(new cljs.core.IndexedSeq(args__5755__auto__.slice((1)),(0),null)):null);
return devtools.format.reference.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5756__auto__);
});

(devtools.format.reference.cljs$core$IFn$_invoke$arity$variadic = (function (object,p__31467){
var vec__31469 = p__31467;
var state_override = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__31469,(0),null);
devtools.format.setup_BANG_();

return cljs.core.apply.cljs$core$IFn$_invoke$arity$2(devtools.format.make_reference_fn,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [object,(function (p1__31451_SHARP_){
return cljs.core.merge.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([p1__31451_SHARP_,state_override], 0));
})], null));
}));

(devtools.format.reference.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(devtools.format.reference.cljs$lang$applyTo = (function (seq31453){
var G__31454 = cljs.core.first(seq31453);
var seq31453__$1 = cljs.core.next(seq31453);
var self__5734__auto__ = this;
return self__5734__auto__.cljs$core$IFn$_invoke$arity$variadic(G__31454,seq31453__$1);
}));

devtools.format.standard_reference = (function devtools$format$standard_reference(target){
devtools.format.setup_BANG_();

var G__31481 = new cljs.core.Keyword(null,"ol","ol",932524051);
var G__31482 = new cljs.core.Keyword(null,"standard-ol-style","standard-ol-style",2143825615);
var G__31483 = (function (){var G__31484 = new cljs.core.Keyword(null,"li","li",723558921);
var G__31485 = new cljs.core.Keyword(null,"standard-li-style","standard-li-style",413442955);
var G__31486 = (devtools.format.make_reference_fn.cljs$core$IFn$_invoke$arity$1 ? devtools.format.make_reference_fn.cljs$core$IFn$_invoke$arity$1(target) : devtools.format.make_reference_fn.call(null,target));
return (devtools.format.make_template_fn.cljs$core$IFn$_invoke$arity$3 ? devtools.format.make_template_fn.cljs$core$IFn$_invoke$arity$3(G__31484,G__31485,G__31486) : devtools.format.make_template_fn.call(null,G__31484,G__31485,G__31486));
})();
return (devtools.format.make_template_fn.cljs$core$IFn$_invoke$arity$3 ? devtools.format.make_template_fn.cljs$core$IFn$_invoke$arity$3(G__31481,G__31482,G__31483) : devtools.format.make_template_fn.call(null,G__31481,G__31482,G__31483));
});
devtools.format.build_header = (function devtools$format$build_header(var_args){
var args__5755__auto__ = [];
var len__5749__auto___31652 = arguments.length;
var i__5750__auto___31653 = (0);
while(true){
if((i__5750__auto___31653 < len__5749__auto___31652)){
args__5755__auto__.push((arguments[i__5750__auto___31653]));

var G__31654 = (i__5750__auto___31653 + (1));
i__5750__auto___31653 = G__31654;
continue;
} else {
}
break;
}

var argseq__5756__auto__ = ((((0) < args__5755__auto__.length))?(new cljs.core.IndexedSeq(args__5755__auto__.slice((0)),(0),null)):null);
return devtools.format.build_header.cljs$core$IFn$_invoke$arity$variadic(argseq__5756__auto__);
});

(devtools.format.build_header.cljs$core$IFn$_invoke$arity$variadic = (function (args){
devtools.format.setup_BANG_();

return devtools.format.render_markup.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.apply.cljs$core$IFn$_invoke$arity$2(devtools.format._LT_header_GT__fn,args)], 0));
}));

(devtools.format.build_header.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(devtools.format.build_header.cljs$lang$applyTo = (function (seq31489){
var self__5735__auto__ = this;
return self__5735__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq31489));
}));

devtools.format.standard_body_template = (function devtools$format$standard_body_template(var_args){
var args__5755__auto__ = [];
var len__5749__auto___31655 = arguments.length;
var i__5750__auto___31656 = (0);
while(true){
if((i__5750__auto___31656 < len__5749__auto___31655)){
args__5755__auto__.push((arguments[i__5750__auto___31656]));

var G__31664 = (i__5750__auto___31656 + (1));
i__5750__auto___31656 = G__31664;
continue;
} else {
}
break;
}

var argseq__5756__auto__ = ((((1) < args__5755__auto__.length))?(new cljs.core.IndexedSeq(args__5755__auto__.slice((1)),(0),null)):null);
return devtools.format.standard_body_template.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5756__auto__);
});

(devtools.format.standard_body_template.cljs$core$IFn$_invoke$arity$variadic = (function (lines,rest){
devtools.format.setup_BANG_();

var args = cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (x){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [x], null);
}),lines)], null),rest);
return devtools.format.render_markup.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([cljs.core.apply.cljs$core$IFn$_invoke$arity$2(devtools.format._LT_standard_body_GT__fn,args)], 0));
}));

(devtools.format.standard_body_template.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(devtools.format.standard_body_template.cljs$lang$applyTo = (function (seq31499){
var G__31500 = cljs.core.first(seq31499);
var seq31499__$1 = cljs.core.next(seq31499);
var self__5734__auto__ = this;
return self__5734__auto__.cljs$core$IFn$_invoke$arity$variadic(G__31500,seq31499__$1);
}));


//# sourceMappingURL=devtools.format.js.map
