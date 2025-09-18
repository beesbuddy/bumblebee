goog.provide('shadow.dom');
shadow.dom.transition_supported_QMARK_ = true;

/**
 * @interface
 */
shadow.dom.IElement = function(){};

var shadow$dom$IElement$_to_dom$dyn_35436 = (function (this$){
var x__5373__auto__ = (((this$ == null))?null:this$);
var m__5374__auto__ = (shadow.dom._to_dom[goog.typeOf(x__5373__auto__)]);
if((!((m__5374__auto__ == null)))){
return (m__5374__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5374__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5374__auto__.call(null,this$));
} else {
var m__5372__auto__ = (shadow.dom._to_dom["_"]);
if((!((m__5372__auto__ == null)))){
return (m__5372__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5372__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5372__auto__.call(null,this$));
} else {
throw cljs.core.missing_protocol("IElement.-to-dom",this$);
}
}
});
shadow.dom._to_dom = (function shadow$dom$_to_dom(this$){
if((((!((this$ == null)))) && ((!((this$.shadow$dom$IElement$_to_dom$arity$1 == null)))))){
return this$.shadow$dom$IElement$_to_dom$arity$1(this$);
} else {
return shadow$dom$IElement$_to_dom$dyn_35436(this$);
}
});


/**
 * @interface
 */
shadow.dom.SVGElement = function(){};

var shadow$dom$SVGElement$_to_svg$dyn_35440 = (function (this$){
var x__5373__auto__ = (((this$ == null))?null:this$);
var m__5374__auto__ = (shadow.dom._to_svg[goog.typeOf(x__5373__auto__)]);
if((!((m__5374__auto__ == null)))){
return (m__5374__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5374__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5374__auto__.call(null,this$));
} else {
var m__5372__auto__ = (shadow.dom._to_svg["_"]);
if((!((m__5372__auto__ == null)))){
return (m__5372__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5372__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5372__auto__.call(null,this$));
} else {
throw cljs.core.missing_protocol("SVGElement.-to-svg",this$);
}
}
});
shadow.dom._to_svg = (function shadow$dom$_to_svg(this$){
if((((!((this$ == null)))) && ((!((this$.shadow$dom$SVGElement$_to_svg$arity$1 == null)))))){
return this$.shadow$dom$SVGElement$_to_svg$arity$1(this$);
} else {
return shadow$dom$SVGElement$_to_svg$dyn_35440(this$);
}
});

shadow.dom.lazy_native_coll_seq = (function shadow$dom$lazy_native_coll_seq(coll,idx){
if((idx < coll.length)){
return (new cljs.core.LazySeq(null,(function (){
return cljs.core.cons((coll[idx]),(function (){var G__34629 = coll;
var G__34630 = (idx + (1));
return (shadow.dom.lazy_native_coll_seq.cljs$core$IFn$_invoke$arity$2 ? shadow.dom.lazy_native_coll_seq.cljs$core$IFn$_invoke$arity$2(G__34629,G__34630) : shadow.dom.lazy_native_coll_seq.call(null,G__34629,G__34630));
})());
}),null,null));
} else {
return null;
}
});

/**
* @constructor
 * @implements {cljs.core.IIndexed}
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IDeref}
 * @implements {shadow.dom.IElement}
*/
shadow.dom.NativeColl = (function (coll){
this.coll = coll;
this.cljs$lang$protocol_mask$partition0$ = 8421394;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(shadow.dom.NativeColl.prototype.cljs$core$IDeref$_deref$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return self__.coll;
}));

(shadow.dom.NativeColl.prototype.cljs$core$IIndexed$_nth$arity$2 = (function (this$,n){
var self__ = this;
var this$__$1 = this;
return (self__.coll[n]);
}));

(shadow.dom.NativeColl.prototype.cljs$core$IIndexed$_nth$arity$3 = (function (this$,n,not_found){
var self__ = this;
var this$__$1 = this;
var or__5025__auto__ = (self__.coll[n]);
if(cljs.core.truth_(or__5025__auto__)){
return or__5025__auto__;
} else {
return not_found;
}
}));

(shadow.dom.NativeColl.prototype.cljs$core$ICounted$_count$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return self__.coll.length;
}));

(shadow.dom.NativeColl.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return shadow.dom.lazy_native_coll_seq(self__.coll,(0));
}));

(shadow.dom.NativeColl.prototype.shadow$dom$IElement$ = cljs.core.PROTOCOL_SENTINEL);

(shadow.dom.NativeColl.prototype.shadow$dom$IElement$_to_dom$arity$1 = (function (this$){
var self__ = this;
var this$__$1 = this;
return self__.coll;
}));

(shadow.dom.NativeColl.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"coll","coll",-1006698606,null)], null);
}));

(shadow.dom.NativeColl.cljs$lang$type = true);

(shadow.dom.NativeColl.cljs$lang$ctorStr = "shadow.dom/NativeColl");

(shadow.dom.NativeColl.cljs$lang$ctorPrWriter = (function (this__5310__auto__,writer__5311__auto__,opt__5312__auto__){
return cljs.core._write(writer__5311__auto__,"shadow.dom/NativeColl");
}));

/**
 * Positional factory function for shadow.dom/NativeColl.
 */
shadow.dom.__GT_NativeColl = (function shadow$dom$__GT_NativeColl(coll){
return (new shadow.dom.NativeColl(coll));
});

shadow.dom.native_coll = (function shadow$dom$native_coll(coll){
return (new shadow.dom.NativeColl(coll));
});
shadow.dom.dom_node = (function shadow$dom$dom_node(el){
if((el == null)){
return null;
} else {
if((((!((el == null))))?((((false) || ((cljs.core.PROTOCOL_SENTINEL === el.shadow$dom$IElement$))))?true:false):false)){
return el.shadow$dom$IElement$_to_dom$arity$1(null);
} else {
if(typeof el === 'string'){
return document.createTextNode(el);
} else {
if(typeof el === 'number'){
return document.createTextNode(cljs.core.str.cljs$core$IFn$_invoke$arity$1(el));
} else {
return el;

}
}
}
}
});
shadow.dom.query_one = (function shadow$dom$query_one(var_args){
var G__34673 = arguments.length;
switch (G__34673) {
case 1:
return shadow.dom.query_one.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.dom.query_one.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.query_one.cljs$core$IFn$_invoke$arity$1 = (function (sel){
return document.querySelector(sel);
}));

(shadow.dom.query_one.cljs$core$IFn$_invoke$arity$2 = (function (sel,root){
return shadow.dom.dom_node(root).querySelector(sel);
}));

(shadow.dom.query_one.cljs$lang$maxFixedArity = 2);

shadow.dom.query = (function shadow$dom$query(var_args){
var G__34675 = arguments.length;
switch (G__34675) {
case 1:
return shadow.dom.query.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.dom.query.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.query.cljs$core$IFn$_invoke$arity$1 = (function (sel){
return (new shadow.dom.NativeColl(document.querySelectorAll(sel)));
}));

(shadow.dom.query.cljs$core$IFn$_invoke$arity$2 = (function (sel,root){
return (new shadow.dom.NativeColl(shadow.dom.dom_node(root).querySelectorAll(sel)));
}));

(shadow.dom.query.cljs$lang$maxFixedArity = 2);

shadow.dom.by_id = (function shadow$dom$by_id(var_args){
var G__34692 = arguments.length;
switch (G__34692) {
case 2:
return shadow.dom.by_id.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 1:
return shadow.dom.by_id.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.by_id.cljs$core$IFn$_invoke$arity$2 = (function (id,el){
return shadow.dom.dom_node(el).getElementById(id);
}));

(shadow.dom.by_id.cljs$core$IFn$_invoke$arity$1 = (function (id){
return document.getElementById(id);
}));

(shadow.dom.by_id.cljs$lang$maxFixedArity = 2);

shadow.dom.build = shadow.dom.dom_node;
shadow.dom.ev_stop = (function shadow$dom$ev_stop(var_args){
var G__34708 = arguments.length;
switch (G__34708) {
case 1:
return shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 4:
return shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$1 = (function (e){
if(cljs.core.truth_(e.stopPropagation)){
e.stopPropagation();

e.preventDefault();
} else {
(e.cancelBubble = true);

(e.returnValue = false);
}

return e;
}));

(shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$2 = (function (e,el){
shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$1(e);

return el;
}));

(shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$4 = (function (e,el,scope,owner){
shadow.dom.ev_stop.cljs$core$IFn$_invoke$arity$1(e);

return el;
}));

(shadow.dom.ev_stop.cljs$lang$maxFixedArity = 4);

/**
 * check wether a parent node (or the document) contains the child
 */
shadow.dom.contains_QMARK_ = (function shadow$dom$contains_QMARK_(var_args){
var G__34726 = arguments.length;
switch (G__34726) {
case 1:
return shadow.dom.contains_QMARK_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.dom.contains_QMARK_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.contains_QMARK_.cljs$core$IFn$_invoke$arity$1 = (function (el){
return goog.dom.contains(document,shadow.dom.dom_node(el));
}));

(shadow.dom.contains_QMARK_.cljs$core$IFn$_invoke$arity$2 = (function (parent,el){
return goog.dom.contains(shadow.dom.dom_node(parent),shadow.dom.dom_node(el));
}));

(shadow.dom.contains_QMARK_.cljs$lang$maxFixedArity = 2);

shadow.dom.add_class = (function shadow$dom$add_class(el,cls){
return goog.dom.classlist.add(shadow.dom.dom_node(el),cls);
});
shadow.dom.remove_class = (function shadow$dom$remove_class(el,cls){
return goog.dom.classlist.remove(shadow.dom.dom_node(el),cls);
});
shadow.dom.toggle_class = (function shadow$dom$toggle_class(var_args){
var G__34778 = arguments.length;
switch (G__34778) {
case 2:
return shadow.dom.toggle_class.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return shadow.dom.toggle_class.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.toggle_class.cljs$core$IFn$_invoke$arity$2 = (function (el,cls){
return goog.dom.classlist.toggle(shadow.dom.dom_node(el),cls);
}));

(shadow.dom.toggle_class.cljs$core$IFn$_invoke$arity$3 = (function (el,cls,v){
if(cljs.core.truth_(v)){
return shadow.dom.add_class(el,cls);
} else {
return shadow.dom.remove_class(el,cls);
}
}));

(shadow.dom.toggle_class.cljs$lang$maxFixedArity = 3);

shadow.dom.dom_listen = (cljs.core.truth_((function (){var or__5025__auto__ = (!((typeof document !== 'undefined')));
if(or__5025__auto__){
return or__5025__auto__;
} else {
return document.addEventListener;
}
})())?(function shadow$dom$dom_listen_good(el,ev,handler){
return el.addEventListener(ev,handler,false);
}):(function shadow$dom$dom_listen_ie(el,ev,handler){
try{return el.attachEvent(["on",cljs.core.str.cljs$core$IFn$_invoke$arity$1(ev)].join(''),(function (e){
return (handler.cljs$core$IFn$_invoke$arity$2 ? handler.cljs$core$IFn$_invoke$arity$2(e,el) : handler.call(null,e,el));
}));
}catch (e34794){if((e34794 instanceof Object)){
var e = e34794;
return console.log("didnt support attachEvent",el,e);
} else {
throw e34794;

}
}}));
shadow.dom.dom_listen_remove = (cljs.core.truth_((function (){var or__5025__auto__ = (!((typeof document !== 'undefined')));
if(or__5025__auto__){
return or__5025__auto__;
} else {
return document.removeEventListener;
}
})())?(function shadow$dom$dom_listen_remove_good(el,ev,handler){
return el.removeEventListener(ev,handler,false);
}):(function shadow$dom$dom_listen_remove_ie(el,ev,handler){
return el.detachEvent(["on",cljs.core.str.cljs$core$IFn$_invoke$arity$1(ev)].join(''),handler);
}));
shadow.dom.on_query = (function shadow$dom$on_query(root_el,ev,selector,handler){
var seq__34812 = cljs.core.seq(shadow.dom.query.cljs$core$IFn$_invoke$arity$2(selector,root_el));
var chunk__34813 = null;
var count__34814 = (0);
var i__34815 = (0);
while(true){
if((i__34815 < count__34814)){
var el = chunk__34813.cljs$core$IIndexed$_nth$arity$2(null,i__34815);
var handler_35463__$1 = ((function (seq__34812,chunk__34813,count__34814,i__34815,el){
return (function (e){
return (handler.cljs$core$IFn$_invoke$arity$2 ? handler.cljs$core$IFn$_invoke$arity$2(e,el) : handler.call(null,e,el));
});})(seq__34812,chunk__34813,count__34814,i__34815,el))
;
shadow.dom.dom_listen(el,cljs.core.name(ev),handler_35463__$1);


var G__35464 = seq__34812;
var G__35465 = chunk__34813;
var G__35466 = count__34814;
var G__35467 = (i__34815 + (1));
seq__34812 = G__35464;
chunk__34813 = G__35465;
count__34814 = G__35466;
i__34815 = G__35467;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__34812);
if(temp__5825__auto__){
var seq__34812__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__34812__$1)){
var c__5548__auto__ = cljs.core.chunk_first(seq__34812__$1);
var G__35468 = cljs.core.chunk_rest(seq__34812__$1);
var G__35469 = c__5548__auto__;
var G__35470 = cljs.core.count(c__5548__auto__);
var G__35471 = (0);
seq__34812 = G__35468;
chunk__34813 = G__35469;
count__34814 = G__35470;
i__34815 = G__35471;
continue;
} else {
var el = cljs.core.first(seq__34812__$1);
var handler_35472__$1 = ((function (seq__34812,chunk__34813,count__34814,i__34815,el,seq__34812__$1,temp__5825__auto__){
return (function (e){
return (handler.cljs$core$IFn$_invoke$arity$2 ? handler.cljs$core$IFn$_invoke$arity$2(e,el) : handler.call(null,e,el));
});})(seq__34812,chunk__34813,count__34814,i__34815,el,seq__34812__$1,temp__5825__auto__))
;
shadow.dom.dom_listen(el,cljs.core.name(ev),handler_35472__$1);


var G__35473 = cljs.core.next(seq__34812__$1);
var G__35474 = null;
var G__35475 = (0);
var G__35476 = (0);
seq__34812 = G__35473;
chunk__34813 = G__35474;
count__34814 = G__35475;
i__34815 = G__35476;
continue;
}
} else {
return null;
}
}
break;
}
});
shadow.dom.on = (function shadow$dom$on(var_args){
var G__34878 = arguments.length;
switch (G__34878) {
case 3:
return shadow.dom.on.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return shadow.dom.on.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.on.cljs$core$IFn$_invoke$arity$3 = (function (el,ev,handler){
return shadow.dom.on.cljs$core$IFn$_invoke$arity$4(el,ev,handler,false);
}));

(shadow.dom.on.cljs$core$IFn$_invoke$arity$4 = (function (el,ev,handler,capture){
if(cljs.core.vector_QMARK_(ev)){
return shadow.dom.on_query(el,cljs.core.first(ev),cljs.core.second(ev),handler);
} else {
var handler__$1 = (function (e){
return (handler.cljs$core$IFn$_invoke$arity$2 ? handler.cljs$core$IFn$_invoke$arity$2(e,el) : handler.call(null,e,el));
});
return shadow.dom.dom_listen(shadow.dom.dom_node(el),cljs.core.name(ev),handler__$1);
}
}));

(shadow.dom.on.cljs$lang$maxFixedArity = 4);

shadow.dom.remove_event_handler = (function shadow$dom$remove_event_handler(el,ev,handler){
return shadow.dom.dom_listen_remove(shadow.dom.dom_node(el),cljs.core.name(ev),handler);
});
shadow.dom.add_event_listeners = (function shadow$dom$add_event_listeners(el,events){
var seq__34898 = cljs.core.seq(events);
var chunk__34899 = null;
var count__34900 = (0);
var i__34901 = (0);
while(true){
if((i__34901 < count__34900)){
var vec__34918 = chunk__34899.cljs$core$IIndexed$_nth$arity$2(null,i__34901);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34918,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34918,(1),null);
shadow.dom.on.cljs$core$IFn$_invoke$arity$3(el,k,v);


var G__35480 = seq__34898;
var G__35481 = chunk__34899;
var G__35482 = count__34900;
var G__35483 = (i__34901 + (1));
seq__34898 = G__35480;
chunk__34899 = G__35481;
count__34900 = G__35482;
i__34901 = G__35483;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__34898);
if(temp__5825__auto__){
var seq__34898__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__34898__$1)){
var c__5548__auto__ = cljs.core.chunk_first(seq__34898__$1);
var G__35485 = cljs.core.chunk_rest(seq__34898__$1);
var G__35486 = c__5548__auto__;
var G__35487 = cljs.core.count(c__5548__auto__);
var G__35488 = (0);
seq__34898 = G__35485;
chunk__34899 = G__35486;
count__34900 = G__35487;
i__34901 = G__35488;
continue;
} else {
var vec__34925 = cljs.core.first(seq__34898__$1);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34925,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34925,(1),null);
shadow.dom.on.cljs$core$IFn$_invoke$arity$3(el,k,v);


var G__35490 = cljs.core.next(seq__34898__$1);
var G__35491 = null;
var G__35492 = (0);
var G__35493 = (0);
seq__34898 = G__35490;
chunk__34899 = G__35491;
count__34900 = G__35492;
i__34901 = G__35493;
continue;
}
} else {
return null;
}
}
break;
}
});
shadow.dom.set_style = (function shadow$dom$set_style(el,styles){
var dom = shadow.dom.dom_node(el);
var seq__34929 = cljs.core.seq(styles);
var chunk__34930 = null;
var count__34931 = (0);
var i__34932 = (0);
while(true){
if((i__34932 < count__34931)){
var vec__34939 = chunk__34930.cljs$core$IIndexed$_nth$arity$2(null,i__34932);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34939,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34939,(1),null);
goog.style.setStyle(dom,cljs.core.name(k),(((v == null))?"":v));


var G__35495 = seq__34929;
var G__35496 = chunk__34930;
var G__35497 = count__34931;
var G__35498 = (i__34932 + (1));
seq__34929 = G__35495;
chunk__34930 = G__35496;
count__34931 = G__35497;
i__34932 = G__35498;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__34929);
if(temp__5825__auto__){
var seq__34929__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__34929__$1)){
var c__5548__auto__ = cljs.core.chunk_first(seq__34929__$1);
var G__35502 = cljs.core.chunk_rest(seq__34929__$1);
var G__35503 = c__5548__auto__;
var G__35504 = cljs.core.count(c__5548__auto__);
var G__35505 = (0);
seq__34929 = G__35502;
chunk__34930 = G__35503;
count__34931 = G__35504;
i__34932 = G__35505;
continue;
} else {
var vec__34942 = cljs.core.first(seq__34929__$1);
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34942,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34942,(1),null);
goog.style.setStyle(dom,cljs.core.name(k),(((v == null))?"":v));


var G__35508 = cljs.core.next(seq__34929__$1);
var G__35509 = null;
var G__35510 = (0);
var G__35511 = (0);
seq__34929 = G__35508;
chunk__34930 = G__35509;
count__34931 = G__35510;
i__34932 = G__35511;
continue;
}
} else {
return null;
}
}
break;
}
});
shadow.dom.set_attr_STAR_ = (function shadow$dom$set_attr_STAR_(el,key,value){
var G__34949_35512 = key;
var G__34949_35513__$1 = (((G__34949_35512 instanceof cljs.core.Keyword))?G__34949_35512.fqn:null);
switch (G__34949_35513__$1) {
case "id":
(el.id = cljs.core.str.cljs$core$IFn$_invoke$arity$1(value));

break;
case "class":
(el.className = cljs.core.str.cljs$core$IFn$_invoke$arity$1(value));

break;
case "for":
(el.htmlFor = value);

break;
case "cellpadding":
el.setAttribute("cellPadding",value);

break;
case "cellspacing":
el.setAttribute("cellSpacing",value);

break;
case "colspan":
el.setAttribute("colSpan",value);

break;
case "frameborder":
el.setAttribute("frameBorder",value);

break;
case "height":
el.setAttribute("height",value);

break;
case "maxlength":
el.setAttribute("maxLength",value);

break;
case "role":
el.setAttribute("role",value);

break;
case "rowspan":
el.setAttribute("rowSpan",value);

break;
case "type":
el.setAttribute("type",value);

break;
case "usemap":
el.setAttribute("useMap",value);

break;
case "valign":
el.setAttribute("vAlign",value);

break;
case "width":
el.setAttribute("width",value);

break;
case "on":
shadow.dom.add_event_listeners(el,value);

break;
case "style":
if((value == null)){
} else {
if(typeof value === 'string'){
el.setAttribute("style",value);
} else {
if(cljs.core.map_QMARK_(value)){
shadow.dom.set_style(el,value);
} else {
goog.style.setStyle(el,value);

}
}
}

break;
default:
var ks_35520 = cljs.core.name(key);
if(cljs.core.truth_((function (){var or__5025__auto__ = goog.string.startsWith(ks_35520,"data-");
if(cljs.core.truth_(or__5025__auto__)){
return or__5025__auto__;
} else {
return goog.string.startsWith(ks_35520,"aria-");
}
})())){
el.setAttribute(ks_35520,value);
} else {
(el[ks_35520] = value);
}

}

return el;
});
shadow.dom.set_attrs = (function shadow$dom$set_attrs(el,attrs){
return cljs.core.reduce_kv((function (el__$1,key,value){
shadow.dom.set_attr_STAR_(el__$1,key,value);

return el__$1;
}),shadow.dom.dom_node(el),attrs);
});
shadow.dom.set_attr = (function shadow$dom$set_attr(el,key,value){
return shadow.dom.set_attr_STAR_(shadow.dom.dom_node(el),key,value);
});
shadow.dom.has_class_QMARK_ = (function shadow$dom$has_class_QMARK_(el,cls){
return goog.dom.classlist.contains(shadow.dom.dom_node(el),cls);
});
shadow.dom.merge_class_string = (function shadow$dom$merge_class_string(current,extra_class){
if(cljs.core.seq(current)){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(current)," ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(extra_class)].join('');
} else {
return extra_class;
}
});
shadow.dom.parse_tag = (function shadow$dom$parse_tag(spec){
var spec__$1 = cljs.core.name(spec);
var fdot = spec__$1.indexOf(".");
var fhash = spec__$1.indexOf("#");
if(((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((-1),fdot)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((-1),fhash)))){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spec__$1,null,null], null);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((-1),fhash)){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spec__$1.substring((0),fdot),null,clojure.string.replace(spec__$1.substring((fdot + (1))),/\./," ")], null);
} else {
if(cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2((-1),fdot)){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spec__$1.substring((0),fhash),spec__$1.substring((fhash + (1))),null], null);
} else {
if((fhash > fdot)){
throw ["cant have id after class?",spec__$1].join('');
} else {
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [spec__$1.substring((0),fhash),spec__$1.substring((fhash + (1)),fdot),clojure.string.replace(spec__$1.substring((fdot + (1))),/\./," ")], null);

}
}
}
}
});
shadow.dom.create_dom_node = (function shadow$dom$create_dom_node(tag_def,p__34965){
var map__34966 = p__34965;
var map__34966__$1 = cljs.core.__destructure_map(map__34966);
var props = map__34966__$1;
var class$ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(map__34966__$1,new cljs.core.Keyword(null,"class","class",-2030961996));
var tag_props = ({});
var vec__34967 = shadow.dom.parse_tag(tag_def);
var tag_name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34967,(0),null);
var tag_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34967,(1),null);
var tag_classes = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34967,(2),null);
if(cljs.core.truth_(tag_id)){
(tag_props["id"] = tag_id);
} else {
}

if(cljs.core.truth_(tag_classes)){
(tag_props["class"] = shadow.dom.merge_class_string(class$,tag_classes));
} else {
}

var G__34971 = goog.dom.createDom(tag_name,tag_props);
shadow.dom.set_attrs(G__34971,cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(props,new cljs.core.Keyword(null,"class","class",-2030961996)));

return G__34971;
});
shadow.dom.append = (function shadow$dom$append(var_args){
var G__34973 = arguments.length;
switch (G__34973) {
case 1:
return shadow.dom.append.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.dom.append.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.append.cljs$core$IFn$_invoke$arity$1 = (function (node){
if(cljs.core.truth_(node)){
var temp__5825__auto__ = shadow.dom.dom_node(node);
if(cljs.core.truth_(temp__5825__auto__)){
var n = temp__5825__auto__;
document.body.appendChild(n);

return n;
} else {
return null;
}
} else {
return null;
}
}));

(shadow.dom.append.cljs$core$IFn$_invoke$arity$2 = (function (el,node){
if(cljs.core.truth_(node)){
var temp__5825__auto__ = shadow.dom.dom_node(node);
if(cljs.core.truth_(temp__5825__auto__)){
var n = temp__5825__auto__;
shadow.dom.dom_node(el).appendChild(n);

return n;
} else {
return null;
}
} else {
return null;
}
}));

(shadow.dom.append.cljs$lang$maxFixedArity = 2);

shadow.dom.destructure_node = (function shadow$dom$destructure_node(create_fn,p__34974){
var vec__34975 = p__34974;
var seq__34976 = cljs.core.seq(vec__34975);
var first__34977 = cljs.core.first(seq__34976);
var seq__34976__$1 = cljs.core.next(seq__34976);
var nn = first__34977;
var first__34977__$1 = cljs.core.first(seq__34976__$1);
var seq__34976__$2 = cljs.core.next(seq__34976__$1);
var np = first__34977__$1;
var nc = seq__34976__$2;
var node = vec__34975;
if((nn instanceof cljs.core.Keyword)){
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("invalid dom node",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"node","node",581201198),node], null));
}

if((((np == null)) && ((nc == null)))){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var G__34978 = nn;
var G__34979 = cljs.core.PersistentArrayMap.EMPTY;
return (create_fn.cljs$core$IFn$_invoke$arity$2 ? create_fn.cljs$core$IFn$_invoke$arity$2(G__34978,G__34979) : create_fn.call(null,G__34978,G__34979));
})(),cljs.core.List.EMPTY], null);
} else {
if(cljs.core.map_QMARK_(np)){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(create_fn.cljs$core$IFn$_invoke$arity$2 ? create_fn.cljs$core$IFn$_invoke$arity$2(nn,np) : create_fn.call(null,nn,np)),nc], null);
} else {
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(function (){var G__34980 = nn;
var G__34981 = cljs.core.PersistentArrayMap.EMPTY;
return (create_fn.cljs$core$IFn$_invoke$arity$2 ? create_fn.cljs$core$IFn$_invoke$arity$2(G__34980,G__34981) : create_fn.call(null,G__34980,G__34981));
})(),cljs.core.conj.cljs$core$IFn$_invoke$arity$2(nc,np)], null);

}
}
});
shadow.dom.make_dom_node = (function shadow$dom$make_dom_node(structure){
var vec__34982 = shadow.dom.destructure_node(shadow.dom.create_dom_node,structure);
var node = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34982,(0),null);
var node_children = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__34982,(1),null);
var seq__34985_35540 = cljs.core.seq(node_children);
var chunk__34986_35541 = null;
var count__34987_35542 = (0);
var i__34988_35543 = (0);
while(true){
if((i__34988_35543 < count__34987_35542)){
var child_struct_35545 = chunk__34986_35541.cljs$core$IIndexed$_nth$arity$2(null,i__34988_35543);
var children_35546 = shadow.dom.dom_node(child_struct_35545);
if(cljs.core.seq_QMARK_(children_35546)){
var seq__35016_35547 = cljs.core.seq(cljs.core.map.cljs$core$IFn$_invoke$arity$2(shadow.dom.dom_node,children_35546));
var chunk__35019_35548 = null;
var count__35020_35549 = (0);
var i__35021_35550 = (0);
while(true){
if((i__35021_35550 < count__35020_35549)){
var child_35551 = chunk__35019_35548.cljs$core$IIndexed$_nth$arity$2(null,i__35021_35550);
if(cljs.core.truth_(child_35551)){
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,child_35551);


var G__35552 = seq__35016_35547;
var G__35553 = chunk__35019_35548;
var G__35554 = count__35020_35549;
var G__35555 = (i__35021_35550 + (1));
seq__35016_35547 = G__35552;
chunk__35019_35548 = G__35553;
count__35020_35549 = G__35554;
i__35021_35550 = G__35555;
continue;
} else {
var G__35556 = seq__35016_35547;
var G__35557 = chunk__35019_35548;
var G__35558 = count__35020_35549;
var G__35559 = (i__35021_35550 + (1));
seq__35016_35547 = G__35556;
chunk__35019_35548 = G__35557;
count__35020_35549 = G__35558;
i__35021_35550 = G__35559;
continue;
}
} else {
var temp__5825__auto___35560 = cljs.core.seq(seq__35016_35547);
if(temp__5825__auto___35560){
var seq__35016_35561__$1 = temp__5825__auto___35560;
if(cljs.core.chunked_seq_QMARK_(seq__35016_35561__$1)){
var c__5548__auto___35562 = cljs.core.chunk_first(seq__35016_35561__$1);
var G__35563 = cljs.core.chunk_rest(seq__35016_35561__$1);
var G__35564 = c__5548__auto___35562;
var G__35565 = cljs.core.count(c__5548__auto___35562);
var G__35566 = (0);
seq__35016_35547 = G__35563;
chunk__35019_35548 = G__35564;
count__35020_35549 = G__35565;
i__35021_35550 = G__35566;
continue;
} else {
var child_35567 = cljs.core.first(seq__35016_35561__$1);
if(cljs.core.truth_(child_35567)){
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,child_35567);


var G__35568 = cljs.core.next(seq__35016_35561__$1);
var G__35569 = null;
var G__35570 = (0);
var G__35571 = (0);
seq__35016_35547 = G__35568;
chunk__35019_35548 = G__35569;
count__35020_35549 = G__35570;
i__35021_35550 = G__35571;
continue;
} else {
var G__35572 = cljs.core.next(seq__35016_35561__$1);
var G__35573 = null;
var G__35574 = (0);
var G__35575 = (0);
seq__35016_35547 = G__35572;
chunk__35019_35548 = G__35573;
count__35020_35549 = G__35574;
i__35021_35550 = G__35575;
continue;
}
}
} else {
}
}
break;
}
} else {
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,children_35546);
}


var G__35578 = seq__34985_35540;
var G__35579 = chunk__34986_35541;
var G__35580 = count__34987_35542;
var G__35581 = (i__34988_35543 + (1));
seq__34985_35540 = G__35578;
chunk__34986_35541 = G__35579;
count__34987_35542 = G__35580;
i__34988_35543 = G__35581;
continue;
} else {
var temp__5825__auto___35582 = cljs.core.seq(seq__34985_35540);
if(temp__5825__auto___35582){
var seq__34985_35583__$1 = temp__5825__auto___35582;
if(cljs.core.chunked_seq_QMARK_(seq__34985_35583__$1)){
var c__5548__auto___35584 = cljs.core.chunk_first(seq__34985_35583__$1);
var G__35585 = cljs.core.chunk_rest(seq__34985_35583__$1);
var G__35586 = c__5548__auto___35584;
var G__35587 = cljs.core.count(c__5548__auto___35584);
var G__35588 = (0);
seq__34985_35540 = G__35585;
chunk__34986_35541 = G__35586;
count__34987_35542 = G__35587;
i__34988_35543 = G__35588;
continue;
} else {
var child_struct_35589 = cljs.core.first(seq__34985_35583__$1);
var children_35590 = shadow.dom.dom_node(child_struct_35589);
if(cljs.core.seq_QMARK_(children_35590)){
var seq__35026_35591 = cljs.core.seq(cljs.core.map.cljs$core$IFn$_invoke$arity$2(shadow.dom.dom_node,children_35590));
var chunk__35028_35592 = null;
var count__35029_35593 = (0);
var i__35030_35594 = (0);
while(true){
if((i__35030_35594 < count__35029_35593)){
var child_35595 = chunk__35028_35592.cljs$core$IIndexed$_nth$arity$2(null,i__35030_35594);
if(cljs.core.truth_(child_35595)){
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,child_35595);


var G__35596 = seq__35026_35591;
var G__35597 = chunk__35028_35592;
var G__35598 = count__35029_35593;
var G__35599 = (i__35030_35594 + (1));
seq__35026_35591 = G__35596;
chunk__35028_35592 = G__35597;
count__35029_35593 = G__35598;
i__35030_35594 = G__35599;
continue;
} else {
var G__35601 = seq__35026_35591;
var G__35602 = chunk__35028_35592;
var G__35603 = count__35029_35593;
var G__35604 = (i__35030_35594 + (1));
seq__35026_35591 = G__35601;
chunk__35028_35592 = G__35602;
count__35029_35593 = G__35603;
i__35030_35594 = G__35604;
continue;
}
} else {
var temp__5825__auto___35605__$1 = cljs.core.seq(seq__35026_35591);
if(temp__5825__auto___35605__$1){
var seq__35026_35607__$1 = temp__5825__auto___35605__$1;
if(cljs.core.chunked_seq_QMARK_(seq__35026_35607__$1)){
var c__5548__auto___35608 = cljs.core.chunk_first(seq__35026_35607__$1);
var G__35609 = cljs.core.chunk_rest(seq__35026_35607__$1);
var G__35610 = c__5548__auto___35608;
var G__35611 = cljs.core.count(c__5548__auto___35608);
var G__35612 = (0);
seq__35026_35591 = G__35609;
chunk__35028_35592 = G__35610;
count__35029_35593 = G__35611;
i__35030_35594 = G__35612;
continue;
} else {
var child_35614 = cljs.core.first(seq__35026_35607__$1);
if(cljs.core.truth_(child_35614)){
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,child_35614);


var G__35616 = cljs.core.next(seq__35026_35607__$1);
var G__35617 = null;
var G__35618 = (0);
var G__35619 = (0);
seq__35026_35591 = G__35616;
chunk__35028_35592 = G__35617;
count__35029_35593 = G__35618;
i__35030_35594 = G__35619;
continue;
} else {
var G__35620 = cljs.core.next(seq__35026_35607__$1);
var G__35621 = null;
var G__35622 = (0);
var G__35623 = (0);
seq__35026_35591 = G__35620;
chunk__35028_35592 = G__35621;
count__35029_35593 = G__35622;
i__35030_35594 = G__35623;
continue;
}
}
} else {
}
}
break;
}
} else {
shadow.dom.append.cljs$core$IFn$_invoke$arity$2(node,children_35590);
}


var G__35625 = cljs.core.next(seq__34985_35583__$1);
var G__35626 = null;
var G__35627 = (0);
var G__35628 = (0);
seq__34985_35540 = G__35625;
chunk__34986_35541 = G__35626;
count__34987_35542 = G__35627;
i__34988_35543 = G__35628;
continue;
}
} else {
}
}
break;
}

return node;
});
(cljs.core.Keyword.prototype.shadow$dom$IElement$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.Keyword.prototype.shadow$dom$IElement$_to_dom$arity$1 = (function (this$){
var this$__$1 = this;
return shadow.dom.make_dom_node(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [this$__$1], null));
}));

(cljs.core.PersistentVector.prototype.shadow$dom$IElement$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.PersistentVector.prototype.shadow$dom$IElement$_to_dom$arity$1 = (function (this$){
var this$__$1 = this;
return shadow.dom.make_dom_node(this$__$1);
}));

(cljs.core.LazySeq.prototype.shadow$dom$IElement$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.LazySeq.prototype.shadow$dom$IElement$_to_dom$arity$1 = (function (this$){
var this$__$1 = this;
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(shadow.dom._to_dom,this$__$1);
}));
if(cljs.core.truth_(((typeof HTMLElement) != 'undefined'))){
(HTMLElement.prototype.shadow$dom$IElement$ = cljs.core.PROTOCOL_SENTINEL);

(HTMLElement.prototype.shadow$dom$IElement$_to_dom$arity$1 = (function (this$){
var this$__$1 = this;
return this$__$1;
}));
} else {
}
if(cljs.core.truth_(((typeof DocumentFragment) != 'undefined'))){
(DocumentFragment.prototype.shadow$dom$IElement$ = cljs.core.PROTOCOL_SENTINEL);

(DocumentFragment.prototype.shadow$dom$IElement$_to_dom$arity$1 = (function (this$){
var this$__$1 = this;
return this$__$1;
}));
} else {
}
/**
 * clear node children
 */
shadow.dom.reset = (function shadow$dom$reset(node){
return goog.dom.removeChildren(shadow.dom.dom_node(node));
});
shadow.dom.remove = (function shadow$dom$remove(node){
if((((!((node == null))))?(((((node.cljs$lang$protocol_mask$partition0$ & (8388608))) || ((cljs.core.PROTOCOL_SENTINEL === node.cljs$core$ISeqable$))))?true:false):false)){
var seq__35048 = cljs.core.seq(node);
var chunk__35049 = null;
var count__35050 = (0);
var i__35051 = (0);
while(true){
if((i__35051 < count__35050)){
var n = chunk__35049.cljs$core$IIndexed$_nth$arity$2(null,i__35051);
(shadow.dom.remove.cljs$core$IFn$_invoke$arity$1 ? shadow.dom.remove.cljs$core$IFn$_invoke$arity$1(n) : shadow.dom.remove.call(null,n));


var G__35632 = seq__35048;
var G__35633 = chunk__35049;
var G__35634 = count__35050;
var G__35635 = (i__35051 + (1));
seq__35048 = G__35632;
chunk__35049 = G__35633;
count__35050 = G__35634;
i__35051 = G__35635;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__35048);
if(temp__5825__auto__){
var seq__35048__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__35048__$1)){
var c__5548__auto__ = cljs.core.chunk_first(seq__35048__$1);
var G__35642 = cljs.core.chunk_rest(seq__35048__$1);
var G__35643 = c__5548__auto__;
var G__35644 = cljs.core.count(c__5548__auto__);
var G__35645 = (0);
seq__35048 = G__35642;
chunk__35049 = G__35643;
count__35050 = G__35644;
i__35051 = G__35645;
continue;
} else {
var n = cljs.core.first(seq__35048__$1);
(shadow.dom.remove.cljs$core$IFn$_invoke$arity$1 ? shadow.dom.remove.cljs$core$IFn$_invoke$arity$1(n) : shadow.dom.remove.call(null,n));


var G__35649 = cljs.core.next(seq__35048__$1);
var G__35650 = null;
var G__35651 = (0);
var G__35652 = (0);
seq__35048 = G__35649;
chunk__35049 = G__35650;
count__35050 = G__35651;
i__35051 = G__35652;
continue;
}
} else {
return null;
}
}
break;
}
} else {
return goog.dom.removeNode(node);
}
});
shadow.dom.replace_node = (function shadow$dom$replace_node(old,new$){
return goog.dom.replaceNode(shadow.dom.dom_node(new$),shadow.dom.dom_node(old));
});
shadow.dom.text = (function shadow$dom$text(var_args){
var G__35055 = arguments.length;
switch (G__35055) {
case 2:
return shadow.dom.text.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 1:
return shadow.dom.text.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.text.cljs$core$IFn$_invoke$arity$2 = (function (el,new_text){
return (shadow.dom.dom_node(el).innerText = new_text);
}));

(shadow.dom.text.cljs$core$IFn$_invoke$arity$1 = (function (el){
return shadow.dom.dom_node(el).innerText;
}));

(shadow.dom.text.cljs$lang$maxFixedArity = 2);

shadow.dom.check = (function shadow$dom$check(var_args){
var G__35057 = arguments.length;
switch (G__35057) {
case 1:
return shadow.dom.check.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.dom.check.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.check.cljs$core$IFn$_invoke$arity$1 = (function (el){
return shadow.dom.check.cljs$core$IFn$_invoke$arity$2(el,true);
}));

(shadow.dom.check.cljs$core$IFn$_invoke$arity$2 = (function (el,checked){
return (shadow.dom.dom_node(el).checked = checked);
}));

(shadow.dom.check.cljs$lang$maxFixedArity = 2);

shadow.dom.checked_QMARK_ = (function shadow$dom$checked_QMARK_(el){
return shadow.dom.dom_node(el).checked;
});
shadow.dom.form_elements = (function shadow$dom$form_elements(el){
return (new shadow.dom.NativeColl(shadow.dom.dom_node(el).elements));
});
shadow.dom.children = (function shadow$dom$children(el){
return (new shadow.dom.NativeColl(shadow.dom.dom_node(el).children));
});
shadow.dom.child_nodes = (function shadow$dom$child_nodes(el){
return (new shadow.dom.NativeColl(shadow.dom.dom_node(el).childNodes));
});
shadow.dom.attr = (function shadow$dom$attr(var_args){
var G__35059 = arguments.length;
switch (G__35059) {
case 2:
return shadow.dom.attr.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return shadow.dom.attr.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.attr.cljs$core$IFn$_invoke$arity$2 = (function (el,key){
return shadow.dom.dom_node(el).getAttribute(cljs.core.name(key));
}));

(shadow.dom.attr.cljs$core$IFn$_invoke$arity$3 = (function (el,key,default$){
var or__5025__auto__ = shadow.dom.dom_node(el).getAttribute(cljs.core.name(key));
if(cljs.core.truth_(or__5025__auto__)){
return or__5025__auto__;
} else {
return default$;
}
}));

(shadow.dom.attr.cljs$lang$maxFixedArity = 3);

shadow.dom.del_attr = (function shadow$dom$del_attr(el,key){
return shadow.dom.dom_node(el).removeAttribute(cljs.core.name(key));
});
shadow.dom.data = (function shadow$dom$data(el,key){
return shadow.dom.dom_node(el).getAttribute(["data-",cljs.core.name(key)].join(''));
});
shadow.dom.set_data = (function shadow$dom$set_data(el,key,value){
return shadow.dom.dom_node(el).setAttribute(["data-",cljs.core.name(key)].join(''),cljs.core.str.cljs$core$IFn$_invoke$arity$1(value));
});
shadow.dom.set_html = (function shadow$dom$set_html(node,text){
return (shadow.dom.dom_node(node).innerHTML = text);
});
shadow.dom.get_html = (function shadow$dom$get_html(node){
return shadow.dom.dom_node(node).innerHTML;
});
shadow.dom.fragment = (function shadow$dom$fragment(var_args){
var args__5755__auto__ = [];
var len__5749__auto___35664 = arguments.length;
var i__5750__auto___35665 = (0);
while(true){
if((i__5750__auto___35665 < len__5749__auto___35664)){
args__5755__auto__.push((arguments[i__5750__auto___35665]));

var G__35666 = (i__5750__auto___35665 + (1));
i__5750__auto___35665 = G__35666;
continue;
} else {
}
break;
}

var argseq__5756__auto__ = ((((0) < args__5755__auto__.length))?(new cljs.core.IndexedSeq(args__5755__auto__.slice((0)),(0),null)):null);
return shadow.dom.fragment.cljs$core$IFn$_invoke$arity$variadic(argseq__5756__auto__);
});

(shadow.dom.fragment.cljs$core$IFn$_invoke$arity$variadic = (function (nodes){
var fragment = document.createDocumentFragment();
var seq__35061_35667 = cljs.core.seq(nodes);
var chunk__35062_35668 = null;
var count__35063_35669 = (0);
var i__35064_35670 = (0);
while(true){
if((i__35064_35670 < count__35063_35669)){
var node_35671 = chunk__35062_35668.cljs$core$IIndexed$_nth$arity$2(null,i__35064_35670);
fragment.appendChild(shadow.dom._to_dom(node_35671));


var G__35674 = seq__35061_35667;
var G__35675 = chunk__35062_35668;
var G__35676 = count__35063_35669;
var G__35677 = (i__35064_35670 + (1));
seq__35061_35667 = G__35674;
chunk__35062_35668 = G__35675;
count__35063_35669 = G__35676;
i__35064_35670 = G__35677;
continue;
} else {
var temp__5825__auto___35678 = cljs.core.seq(seq__35061_35667);
if(temp__5825__auto___35678){
var seq__35061_35679__$1 = temp__5825__auto___35678;
if(cljs.core.chunked_seq_QMARK_(seq__35061_35679__$1)){
var c__5548__auto___35680 = cljs.core.chunk_first(seq__35061_35679__$1);
var G__35681 = cljs.core.chunk_rest(seq__35061_35679__$1);
var G__35682 = c__5548__auto___35680;
var G__35683 = cljs.core.count(c__5548__auto___35680);
var G__35684 = (0);
seq__35061_35667 = G__35681;
chunk__35062_35668 = G__35682;
count__35063_35669 = G__35683;
i__35064_35670 = G__35684;
continue;
} else {
var node_35685 = cljs.core.first(seq__35061_35679__$1);
fragment.appendChild(shadow.dom._to_dom(node_35685));


var G__35686 = cljs.core.next(seq__35061_35679__$1);
var G__35687 = null;
var G__35688 = (0);
var G__35689 = (0);
seq__35061_35667 = G__35686;
chunk__35062_35668 = G__35687;
count__35063_35669 = G__35688;
i__35064_35670 = G__35689;
continue;
}
} else {
}
}
break;
}

return (new shadow.dom.NativeColl(fragment));
}));

(shadow.dom.fragment.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(shadow.dom.fragment.cljs$lang$applyTo = (function (seq35060){
var self__5735__auto__ = this;
return self__5735__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq35060));
}));

/**
 * given a html string, eval all <script> tags and return the html without the scripts
 * don't do this for everything, only content you trust.
 */
shadow.dom.eval_scripts = (function shadow$dom$eval_scripts(s){
var scripts = cljs.core.re_seq(/<script[^>]*?>(.+?)<\/script>/,s);
var seq__35065_35692 = cljs.core.seq(scripts);
var chunk__35066_35693 = null;
var count__35067_35694 = (0);
var i__35068_35695 = (0);
while(true){
if((i__35068_35695 < count__35067_35694)){
var vec__35077_35697 = chunk__35066_35693.cljs$core$IIndexed$_nth$arity$2(null,i__35068_35695);
var script_tag_35698 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__35077_35697,(0),null);
var script_body_35699 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__35077_35697,(1),null);
eval(script_body_35699);


var G__35701 = seq__35065_35692;
var G__35702 = chunk__35066_35693;
var G__35703 = count__35067_35694;
var G__35704 = (i__35068_35695 + (1));
seq__35065_35692 = G__35701;
chunk__35066_35693 = G__35702;
count__35067_35694 = G__35703;
i__35068_35695 = G__35704;
continue;
} else {
var temp__5825__auto___35705 = cljs.core.seq(seq__35065_35692);
if(temp__5825__auto___35705){
var seq__35065_35706__$1 = temp__5825__auto___35705;
if(cljs.core.chunked_seq_QMARK_(seq__35065_35706__$1)){
var c__5548__auto___35707 = cljs.core.chunk_first(seq__35065_35706__$1);
var G__35708 = cljs.core.chunk_rest(seq__35065_35706__$1);
var G__35709 = c__5548__auto___35707;
var G__35710 = cljs.core.count(c__5548__auto___35707);
var G__35711 = (0);
seq__35065_35692 = G__35708;
chunk__35066_35693 = G__35709;
count__35067_35694 = G__35710;
i__35068_35695 = G__35711;
continue;
} else {
var vec__35080_35712 = cljs.core.first(seq__35065_35706__$1);
var script_tag_35713 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__35080_35712,(0),null);
var script_body_35714 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__35080_35712,(1),null);
eval(script_body_35714);


var G__35716 = cljs.core.next(seq__35065_35706__$1);
var G__35717 = null;
var G__35718 = (0);
var G__35719 = (0);
seq__35065_35692 = G__35716;
chunk__35066_35693 = G__35717;
count__35067_35694 = G__35718;
i__35068_35695 = G__35719;
continue;
}
} else {
}
}
break;
}

return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (s__$1,p__35083){
var vec__35084 = p__35083;
var script_tag = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__35084,(0),null);
var script_body = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__35084,(1),null);
return clojure.string.replace(s__$1,script_tag,"");
}),s,scripts);
});
shadow.dom.str__GT_fragment = (function shadow$dom$str__GT_fragment(s){
var el = document.createElement("div");
(el.innerHTML = s);

return (new shadow.dom.NativeColl(goog.dom.childrenToNode_(document,el)));
});
shadow.dom.node_name = (function shadow$dom$node_name(el){
return shadow.dom.dom_node(el).nodeName;
});
shadow.dom.ancestor_by_class = (function shadow$dom$ancestor_by_class(el,cls){
return goog.dom.getAncestorByClass(shadow.dom.dom_node(el),cls);
});
shadow.dom.ancestor_by_tag = (function shadow$dom$ancestor_by_tag(var_args){
var G__35092 = arguments.length;
switch (G__35092) {
case 2:
return shadow.dom.ancestor_by_tag.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return shadow.dom.ancestor_by_tag.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.ancestor_by_tag.cljs$core$IFn$_invoke$arity$2 = (function (el,tag){
return goog.dom.getAncestorByTagNameAndClass(shadow.dom.dom_node(el),cljs.core.name(tag));
}));

(shadow.dom.ancestor_by_tag.cljs$core$IFn$_invoke$arity$3 = (function (el,tag,cls){
return goog.dom.getAncestorByTagNameAndClass(shadow.dom.dom_node(el),cljs.core.name(tag),cljs.core.name(cls));
}));

(shadow.dom.ancestor_by_tag.cljs$lang$maxFixedArity = 3);

shadow.dom.get_value = (function shadow$dom$get_value(dom){
return goog.dom.forms.getValue(shadow.dom.dom_node(dom));
});
shadow.dom.set_value = (function shadow$dom$set_value(dom,value){
return goog.dom.forms.setValue(shadow.dom.dom_node(dom),value);
});
shadow.dom.px = (function shadow$dom$px(value){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1((value | (0))),"px"].join('');
});
shadow.dom.pct = (function shadow$dom$pct(value){
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(value),"%"].join('');
});
shadow.dom.remove_style_STAR_ = (function shadow$dom$remove_style_STAR_(el,style){
return el.style.removeProperty(cljs.core.name(style));
});
shadow.dom.remove_style = (function shadow$dom$remove_style(el,style){
var el__$1 = shadow.dom.dom_node(el);
return shadow.dom.remove_style_STAR_(el__$1,style);
});
shadow.dom.remove_styles = (function shadow$dom$remove_styles(el,style_keys){
var el__$1 = shadow.dom.dom_node(el);
var seq__35110 = cljs.core.seq(style_keys);
var chunk__35111 = null;
var count__35112 = (0);
var i__35113 = (0);
while(true){
if((i__35113 < count__35112)){
var it = chunk__35111.cljs$core$IIndexed$_nth$arity$2(null,i__35113);
shadow.dom.remove_style_STAR_(el__$1,it);


var G__35733 = seq__35110;
var G__35734 = chunk__35111;
var G__35735 = count__35112;
var G__35736 = (i__35113 + (1));
seq__35110 = G__35733;
chunk__35111 = G__35734;
count__35112 = G__35735;
i__35113 = G__35736;
continue;
} else {
var temp__5825__auto__ = cljs.core.seq(seq__35110);
if(temp__5825__auto__){
var seq__35110__$1 = temp__5825__auto__;
if(cljs.core.chunked_seq_QMARK_(seq__35110__$1)){
var c__5548__auto__ = cljs.core.chunk_first(seq__35110__$1);
var G__35737 = cljs.core.chunk_rest(seq__35110__$1);
var G__35738 = c__5548__auto__;
var G__35739 = cljs.core.count(c__5548__auto__);
var G__35740 = (0);
seq__35110 = G__35737;
chunk__35111 = G__35738;
count__35112 = G__35739;
i__35113 = G__35740;
continue;
} else {
var it = cljs.core.first(seq__35110__$1);
shadow.dom.remove_style_STAR_(el__$1,it);


var G__35741 = cljs.core.next(seq__35110__$1);
var G__35742 = null;
var G__35743 = (0);
var G__35744 = (0);
seq__35110 = G__35741;
chunk__35111 = G__35742;
count__35112 = G__35743;
i__35113 = G__35744;
continue;
}
} else {
return null;
}
}
break;
}
});

/**
* @constructor
 * @implements {cljs.core.IRecord}
 * @implements {cljs.core.IKVReduce}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.ICollection}
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.ICloneable}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {cljs.core.IIterable}
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IAssociative}
 * @implements {cljs.core.IMap}
 * @implements {cljs.core.ILookup}
*/
shadow.dom.Coordinate = (function (x,y,__meta,__extmap,__hash){
this.x = x;
this.y = y;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2230716170;
this.cljs$lang$protocol_mask$partition1$ = 139264;
});
(shadow.dom.Coordinate.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__5323__auto__,k__5324__auto__){
var self__ = this;
var this__5323__auto____$1 = this;
return this__5323__auto____$1.cljs$core$ILookup$_lookup$arity$3(null,k__5324__auto__,null);
}));

(shadow.dom.Coordinate.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5325__auto__,k35126,else__5326__auto__){
var self__ = this;
var this__5325__auto____$1 = this;
var G__35139 = k35126;
var G__35139__$1 = (((G__35139 instanceof cljs.core.Keyword))?G__35139.fqn:null);
switch (G__35139__$1) {
case "x":
return self__.x;

break;
case "y":
return self__.y;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k35126,else__5326__auto__);

}
}));

(shadow.dom.Coordinate.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = (function (this__5343__auto__,f__5344__auto__,init__5345__auto__){
var self__ = this;
var this__5343__auto____$1 = this;
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (ret__5346__auto__,p__35145){
var vec__35146 = p__35145;
var k__5347__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__35146,(0),null);
var v__5348__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__35146,(1),null);
return (f__5344__auto__.cljs$core$IFn$_invoke$arity$3 ? f__5344__auto__.cljs$core$IFn$_invoke$arity$3(ret__5346__auto__,k__5347__auto__,v__5348__auto__) : f__5344__auto__.call(null,ret__5346__auto__,k__5347__auto__,v__5348__auto__));
}),init__5345__auto__,this__5343__auto____$1);
}));

(shadow.dom.Coordinate.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__5338__auto__,writer__5339__auto__,opts__5340__auto__){
var self__ = this;
var this__5338__auto____$1 = this;
var pr_pair__5341__auto__ = (function (keyval__5342__auto__){
return cljs.core.pr_sequential_writer(writer__5339__auto__,cljs.core.pr_writer,""," ","",opts__5340__auto__,keyval__5342__auto__);
});
return cljs.core.pr_sequential_writer(writer__5339__auto__,pr_pair__5341__auto__,"#shadow.dom.Coordinate{",", ","}",opts__5340__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"x","x",2099068185),self__.x],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"y","y",-1757859776),self__.y],null))], null),self__.__extmap));
}));

(shadow.dom.Coordinate.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__35125){
var self__ = this;
var G__35125__$1 = this;
return (new cljs.core.RecordIter((0),G__35125__$1,2,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"x","x",2099068185),new cljs.core.Keyword(null,"y","y",-1757859776)], null),(cljs.core.truth_(self__.__extmap)?cljs.core._iterator(self__.__extmap):cljs.core.nil_iter())));
}));

(shadow.dom.Coordinate.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__5321__auto__){
var self__ = this;
var this__5321__auto____$1 = this;
return self__.__meta;
}));

(shadow.dom.Coordinate.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__5318__auto__){
var self__ = this;
var this__5318__auto____$1 = this;
return (new shadow.dom.Coordinate(self__.x,self__.y,self__.__meta,self__.__extmap,self__.__hash));
}));

(shadow.dom.Coordinate.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__5327__auto__){
var self__ = this;
var this__5327__auto____$1 = this;
return (2 + cljs.core.count(self__.__extmap));
}));

(shadow.dom.Coordinate.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__5319__auto__){
var self__ = this;
var this__5319__auto____$1 = this;
var h__5134__auto__ = self__.__hash;
if((!((h__5134__auto__ == null)))){
return h__5134__auto__;
} else {
var h__5134__auto____$1 = (function (coll__5320__auto__){
return (145542109 ^ cljs.core.hash_unordered_coll(coll__5320__auto__));
})(this__5319__auto____$1);
(self__.__hash = h__5134__auto____$1);

return h__5134__auto____$1;
}
}));

(shadow.dom.Coordinate.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this35127,other35128){
var self__ = this;
var this35127__$1 = this;
return (((!((other35128 == null)))) && ((((this35127__$1.constructor === other35128.constructor)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this35127__$1.x,other35128.x)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this35127__$1.y,other35128.y)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this35127__$1.__extmap,other35128.__extmap)))))))));
}));

(shadow.dom.Coordinate.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__5333__auto__,k__5334__auto__){
var self__ = this;
var this__5333__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"y","y",-1757859776),null,new cljs.core.Keyword(null,"x","x",2099068185),null], null), null),k__5334__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core._with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__5333__auto____$1),self__.__meta),k__5334__auto__);
} else {
return (new shadow.dom.Coordinate(self__.x,self__.y,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__5334__auto__)),null));
}
}));

(shadow.dom.Coordinate.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (this__5330__auto__,k35126){
var self__ = this;
var this__5330__auto____$1 = this;
var G__35168 = k35126;
var G__35168__$1 = (((G__35168 instanceof cljs.core.Keyword))?G__35168.fqn:null);
switch (G__35168__$1) {
case "x":
case "y":
return true;

break;
default:
return cljs.core.contains_QMARK_(self__.__extmap,k35126);

}
}));

(shadow.dom.Coordinate.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5331__auto__,k__5332__auto__,G__35125){
var self__ = this;
var this__5331__auto____$1 = this;
var pred__35169 = cljs.core.keyword_identical_QMARK_;
var expr__35170 = k__5332__auto__;
if(cljs.core.truth_((pred__35169.cljs$core$IFn$_invoke$arity$2 ? pred__35169.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"x","x",2099068185),expr__35170) : pred__35169.call(null,new cljs.core.Keyword(null,"x","x",2099068185),expr__35170)))){
return (new shadow.dom.Coordinate(G__35125,self__.y,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__35169.cljs$core$IFn$_invoke$arity$2 ? pred__35169.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"y","y",-1757859776),expr__35170) : pred__35169.call(null,new cljs.core.Keyword(null,"y","y",-1757859776),expr__35170)))){
return (new shadow.dom.Coordinate(self__.x,G__35125,self__.__meta,self__.__extmap,null));
} else {
return (new shadow.dom.Coordinate(self__.x,self__.y,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5332__auto__,G__35125),null));
}
}
}));

(shadow.dom.Coordinate.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__5336__auto__){
var self__ = this;
var this__5336__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.MapEntry(new cljs.core.Keyword(null,"x","x",2099068185),self__.x,null)),(new cljs.core.MapEntry(new cljs.core.Keyword(null,"y","y",-1757859776),self__.y,null))], null),self__.__extmap));
}));

(shadow.dom.Coordinate.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5322__auto__,G__35125){
var self__ = this;
var this__5322__auto____$1 = this;
return (new shadow.dom.Coordinate(self__.x,self__.y,G__35125,self__.__extmap,self__.__hash));
}));

(shadow.dom.Coordinate.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__5328__auto__,entry__5329__auto__){
var self__ = this;
var this__5328__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__5329__auto__)){
return this__5328__auto____$1.cljs$core$IAssociative$_assoc$arity$3(null,cljs.core._nth(entry__5329__auto__,(0)),cljs.core._nth(entry__5329__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__5328__auto____$1,entry__5329__auto__);
}
}));

(shadow.dom.Coordinate.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"x","x",-555367584,null),new cljs.core.Symbol(null,"y","y",-117328249,null)], null);
}));

(shadow.dom.Coordinate.cljs$lang$type = true);

(shadow.dom.Coordinate.cljs$lang$ctorPrSeq = (function (this__5369__auto__){
return (new cljs.core.List(null,"shadow.dom/Coordinate",null,(1),null));
}));

(shadow.dom.Coordinate.cljs$lang$ctorPrWriter = (function (this__5369__auto__,writer__5370__auto__){
return cljs.core._write(writer__5370__auto__,"shadow.dom/Coordinate");
}));

/**
 * Positional factory function for shadow.dom/Coordinate.
 */
shadow.dom.__GT_Coordinate = (function shadow$dom$__GT_Coordinate(x,y){
return (new shadow.dom.Coordinate(x,y,null,null,null));
});

/**
 * Factory function for shadow.dom/Coordinate, taking a map of keywords to field values.
 */
shadow.dom.map__GT_Coordinate = (function shadow$dom$map__GT_Coordinate(G__35131){
var extmap__5365__auto__ = (function (){var G__35172 = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__35131,new cljs.core.Keyword(null,"x","x",2099068185),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"y","y",-1757859776)], 0));
if(cljs.core.record_QMARK_(G__35131)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,G__35172);
} else {
return G__35172;
}
})();
return (new shadow.dom.Coordinate(new cljs.core.Keyword(null,"x","x",2099068185).cljs$core$IFn$_invoke$arity$1(G__35131),new cljs.core.Keyword(null,"y","y",-1757859776).cljs$core$IFn$_invoke$arity$1(G__35131),null,cljs.core.not_empty(extmap__5365__auto__),null));
});

shadow.dom.get_position = (function shadow$dom$get_position(el){
var pos = goog.style.getPosition(shadow.dom.dom_node(el));
return shadow.dom.__GT_Coordinate(pos.x,pos.y);
});
shadow.dom.get_client_position = (function shadow$dom$get_client_position(el){
var pos = goog.style.getClientPosition(shadow.dom.dom_node(el));
return shadow.dom.__GT_Coordinate(pos.x,pos.y);
});
shadow.dom.get_page_offset = (function shadow$dom$get_page_offset(el){
var pos = goog.style.getPageOffset(shadow.dom.dom_node(el));
return shadow.dom.__GT_Coordinate(pos.x,pos.y);
});

/**
* @constructor
 * @implements {cljs.core.IRecord}
 * @implements {cljs.core.IKVReduce}
 * @implements {cljs.core.IEquiv}
 * @implements {cljs.core.IHash}
 * @implements {cljs.core.ICollection}
 * @implements {cljs.core.ICounted}
 * @implements {cljs.core.ISeqable}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.ICloneable}
 * @implements {cljs.core.IPrintWithWriter}
 * @implements {cljs.core.IIterable}
 * @implements {cljs.core.IWithMeta}
 * @implements {cljs.core.IAssociative}
 * @implements {cljs.core.IMap}
 * @implements {cljs.core.ILookup}
*/
shadow.dom.Size = (function (w,h,__meta,__extmap,__hash){
this.w = w;
this.h = h;
this.__meta = __meta;
this.__extmap = __extmap;
this.__hash = __hash;
this.cljs$lang$protocol_mask$partition0$ = 2230716170;
this.cljs$lang$protocol_mask$partition1$ = 139264;
});
(shadow.dom.Size.prototype.cljs$core$ILookup$_lookup$arity$2 = (function (this__5323__auto__,k__5324__auto__){
var self__ = this;
var this__5323__auto____$1 = this;
return this__5323__auto____$1.cljs$core$ILookup$_lookup$arity$3(null,k__5324__auto__,null);
}));

(shadow.dom.Size.prototype.cljs$core$ILookup$_lookup$arity$3 = (function (this__5325__auto__,k35174,else__5326__auto__){
var self__ = this;
var this__5325__auto____$1 = this;
var G__35178 = k35174;
var G__35178__$1 = (((G__35178 instanceof cljs.core.Keyword))?G__35178.fqn:null);
switch (G__35178__$1) {
case "w":
return self__.w;

break;
case "h":
return self__.h;

break;
default:
return cljs.core.get.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k35174,else__5326__auto__);

}
}));

(shadow.dom.Size.prototype.cljs$core$IKVReduce$_kv_reduce$arity$3 = (function (this__5343__auto__,f__5344__auto__,init__5345__auto__){
var self__ = this;
var this__5343__auto____$1 = this;
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3((function (ret__5346__auto__,p__35179){
var vec__35180 = p__35179;
var k__5347__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__35180,(0),null);
var v__5348__auto__ = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__35180,(1),null);
return (f__5344__auto__.cljs$core$IFn$_invoke$arity$3 ? f__5344__auto__.cljs$core$IFn$_invoke$arity$3(ret__5346__auto__,k__5347__auto__,v__5348__auto__) : f__5344__auto__.call(null,ret__5346__auto__,k__5347__auto__,v__5348__auto__));
}),init__5345__auto__,this__5343__auto____$1);
}));

(shadow.dom.Size.prototype.cljs$core$IPrintWithWriter$_pr_writer$arity$3 = (function (this__5338__auto__,writer__5339__auto__,opts__5340__auto__){
var self__ = this;
var this__5338__auto____$1 = this;
var pr_pair__5341__auto__ = (function (keyval__5342__auto__){
return cljs.core.pr_sequential_writer(writer__5339__auto__,cljs.core.pr_writer,""," ","",opts__5340__auto__,keyval__5342__auto__);
});
return cljs.core.pr_sequential_writer(writer__5339__auto__,pr_pair__5341__auto__,"#shadow.dom.Size{",", ","}",opts__5340__auto__,cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"w","w",354169001),self__.w],null)),(new cljs.core.PersistentVector(null,2,(5),cljs.core.PersistentVector.EMPTY_NODE,[new cljs.core.Keyword(null,"h","h",1109658740),self__.h],null))], null),self__.__extmap));
}));

(shadow.dom.Size.prototype.cljs$core$IIterable$_iterator$arity$1 = (function (G__35173){
var self__ = this;
var G__35173__$1 = this;
return (new cljs.core.RecordIter((0),G__35173__$1,2,new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"w","w",354169001),new cljs.core.Keyword(null,"h","h",1109658740)], null),(cljs.core.truth_(self__.__extmap)?cljs.core._iterator(self__.__extmap):cljs.core.nil_iter())));
}));

(shadow.dom.Size.prototype.cljs$core$IMeta$_meta$arity$1 = (function (this__5321__auto__){
var self__ = this;
var this__5321__auto____$1 = this;
return self__.__meta;
}));

(shadow.dom.Size.prototype.cljs$core$ICloneable$_clone$arity$1 = (function (this__5318__auto__){
var self__ = this;
var this__5318__auto____$1 = this;
return (new shadow.dom.Size(self__.w,self__.h,self__.__meta,self__.__extmap,self__.__hash));
}));

(shadow.dom.Size.prototype.cljs$core$ICounted$_count$arity$1 = (function (this__5327__auto__){
var self__ = this;
var this__5327__auto____$1 = this;
return (2 + cljs.core.count(self__.__extmap));
}));

(shadow.dom.Size.prototype.cljs$core$IHash$_hash$arity$1 = (function (this__5319__auto__){
var self__ = this;
var this__5319__auto____$1 = this;
var h__5134__auto__ = self__.__hash;
if((!((h__5134__auto__ == null)))){
return h__5134__auto__;
} else {
var h__5134__auto____$1 = (function (coll__5320__auto__){
return (-1228019642 ^ cljs.core.hash_unordered_coll(coll__5320__auto__));
})(this__5319__auto____$1);
(self__.__hash = h__5134__auto____$1);

return h__5134__auto____$1;
}
}));

(shadow.dom.Size.prototype.cljs$core$IEquiv$_equiv$arity$2 = (function (this35175,other35176){
var self__ = this;
var this35175__$1 = this;
return (((!((other35176 == null)))) && ((((this35175__$1.constructor === other35176.constructor)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this35175__$1.w,other35176.w)) && (((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this35175__$1.h,other35176.h)) && (cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(this35175__$1.__extmap,other35176.__extmap)))))))));
}));

(shadow.dom.Size.prototype.cljs$core$IMap$_dissoc$arity$2 = (function (this__5333__auto__,k__5334__auto__){
var self__ = this;
var this__5333__auto____$1 = this;
if(cljs.core.contains_QMARK_(new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"w","w",354169001),null,new cljs.core.Keyword(null,"h","h",1109658740),null], null), null),k__5334__auto__)){
return cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(cljs.core._with_meta(cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,this__5333__auto____$1),self__.__meta),k__5334__auto__);
} else {
return (new shadow.dom.Size(self__.w,self__.h,self__.__meta,cljs.core.not_empty(cljs.core.dissoc.cljs$core$IFn$_invoke$arity$2(self__.__extmap,k__5334__auto__)),null));
}
}));

(shadow.dom.Size.prototype.cljs$core$IAssociative$_contains_key_QMARK_$arity$2 = (function (this__5330__auto__,k35174){
var self__ = this;
var this__5330__auto____$1 = this;
var G__35183 = k35174;
var G__35183__$1 = (((G__35183 instanceof cljs.core.Keyword))?G__35183.fqn:null);
switch (G__35183__$1) {
case "w":
case "h":
return true;

break;
default:
return cljs.core.contains_QMARK_(self__.__extmap,k35174);

}
}));

(shadow.dom.Size.prototype.cljs$core$IAssociative$_assoc$arity$3 = (function (this__5331__auto__,k__5332__auto__,G__35173){
var self__ = this;
var this__5331__auto____$1 = this;
var pred__35184 = cljs.core.keyword_identical_QMARK_;
var expr__35185 = k__5332__auto__;
if(cljs.core.truth_((pred__35184.cljs$core$IFn$_invoke$arity$2 ? pred__35184.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"w","w",354169001),expr__35185) : pred__35184.call(null,new cljs.core.Keyword(null,"w","w",354169001),expr__35185)))){
return (new shadow.dom.Size(G__35173,self__.h,self__.__meta,self__.__extmap,null));
} else {
if(cljs.core.truth_((pred__35184.cljs$core$IFn$_invoke$arity$2 ? pred__35184.cljs$core$IFn$_invoke$arity$2(new cljs.core.Keyword(null,"h","h",1109658740),expr__35185) : pred__35184.call(null,new cljs.core.Keyword(null,"h","h",1109658740),expr__35185)))){
return (new shadow.dom.Size(self__.w,G__35173,self__.__meta,self__.__extmap,null));
} else {
return (new shadow.dom.Size(self__.w,self__.h,self__.__meta,cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(self__.__extmap,k__5332__auto__,G__35173),null));
}
}
}));

(shadow.dom.Size.prototype.cljs$core$ISeqable$_seq$arity$1 = (function (this__5336__auto__){
var self__ = this;
var this__5336__auto____$1 = this;
return cljs.core.seq(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [(new cljs.core.MapEntry(new cljs.core.Keyword(null,"w","w",354169001),self__.w,null)),(new cljs.core.MapEntry(new cljs.core.Keyword(null,"h","h",1109658740),self__.h,null))], null),self__.__extmap));
}));

(shadow.dom.Size.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (this__5322__auto__,G__35173){
var self__ = this;
var this__5322__auto____$1 = this;
return (new shadow.dom.Size(self__.w,self__.h,G__35173,self__.__extmap,self__.__hash));
}));

(shadow.dom.Size.prototype.cljs$core$ICollection$_conj$arity$2 = (function (this__5328__auto__,entry__5329__auto__){
var self__ = this;
var this__5328__auto____$1 = this;
if(cljs.core.vector_QMARK_(entry__5329__auto__)){
return this__5328__auto____$1.cljs$core$IAssociative$_assoc$arity$3(null,cljs.core._nth(entry__5329__auto__,(0)),cljs.core._nth(entry__5329__auto__,(1)));
} else {
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$3(cljs.core._conj,this__5328__auto____$1,entry__5329__auto__);
}
}));

(shadow.dom.Size.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"w","w",1994700528,null),new cljs.core.Symbol(null,"h","h",-1544777029,null)], null);
}));

(shadow.dom.Size.cljs$lang$type = true);

(shadow.dom.Size.cljs$lang$ctorPrSeq = (function (this__5369__auto__){
return (new cljs.core.List(null,"shadow.dom/Size",null,(1),null));
}));

(shadow.dom.Size.cljs$lang$ctorPrWriter = (function (this__5369__auto__,writer__5370__auto__){
return cljs.core._write(writer__5370__auto__,"shadow.dom/Size");
}));

/**
 * Positional factory function for shadow.dom/Size.
 */
shadow.dom.__GT_Size = (function shadow$dom$__GT_Size(w,h){
return (new shadow.dom.Size(w,h,null,null,null));
});

/**
 * Factory function for shadow.dom/Size, taking a map of keywords to field values.
 */
shadow.dom.map__GT_Size = (function shadow$dom$map__GT_Size(G__35177){
var extmap__5365__auto__ = (function (){var G__35187 = cljs.core.dissoc.cljs$core$IFn$_invoke$arity$variadic(G__35177,new cljs.core.Keyword(null,"w","w",354169001),cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([new cljs.core.Keyword(null,"h","h",1109658740)], 0));
if(cljs.core.record_QMARK_(G__35177)){
return cljs.core.into.cljs$core$IFn$_invoke$arity$2(cljs.core.PersistentArrayMap.EMPTY,G__35187);
} else {
return G__35187;
}
})();
return (new shadow.dom.Size(new cljs.core.Keyword(null,"w","w",354169001).cljs$core$IFn$_invoke$arity$1(G__35177),new cljs.core.Keyword(null,"h","h",1109658740).cljs$core$IFn$_invoke$arity$1(G__35177),null,cljs.core.not_empty(extmap__5365__auto__),null));
});

shadow.dom.size__GT_clj = (function shadow$dom$size__GT_clj(size){
return (new shadow.dom.Size(size.width,size.height,null,null,null));
});
shadow.dom.get_size = (function shadow$dom$get_size(el){
return shadow.dom.size__GT_clj(goog.style.getSize(shadow.dom.dom_node(el)));
});
shadow.dom.get_height = (function shadow$dom$get_height(el){
return shadow.dom.get_size(el).h;
});
shadow.dom.get_viewport_size = (function shadow$dom$get_viewport_size(){
return shadow.dom.size__GT_clj(goog.dom.getViewportSize());
});
shadow.dom.first_child = (function shadow$dom$first_child(el){
return (shadow.dom.dom_node(el).children[(0)]);
});
shadow.dom.select_option_values = (function shadow$dom$select_option_values(el){
var native$ = shadow.dom.dom_node(el);
var opts = (native$["options"]);
var a__5613__auto__ = opts;
var l__5614__auto__ = a__5613__auto__.length;
var i = (0);
var ret = cljs.core.PersistentVector.EMPTY;
while(true){
if((i < l__5614__auto__)){
var G__35793 = (i + (1));
var G__35794 = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(ret,(opts[i]["value"]));
i = G__35793;
ret = G__35794;
continue;
} else {
return ret;
}
break;
}
});
shadow.dom.build_url = (function shadow$dom$build_url(path,query_params){
if(cljs.core.empty_QMARK_(query_params)){
return path;
} else {
return [cljs.core.str.cljs$core$IFn$_invoke$arity$1(path),"?",clojure.string.join.cljs$core$IFn$_invoke$arity$2("&",cljs.core.map.cljs$core$IFn$_invoke$arity$2((function (p__35192){
var vec__35193 = p__35192;
var k = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__35193,(0),null);
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__35193,(1),null);
return [cljs.core.name(k),"=",cljs.core.str.cljs$core$IFn$_invoke$arity$1(encodeURIComponent(cljs.core.str.cljs$core$IFn$_invoke$arity$1(v)))].join('');
}),query_params))].join('');
}
});
shadow.dom.redirect = (function shadow$dom$redirect(var_args){
var G__35197 = arguments.length;
switch (G__35197) {
case 1:
return shadow.dom.redirect.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return shadow.dom.redirect.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(shadow.dom.redirect.cljs$core$IFn$_invoke$arity$1 = (function (path){
return shadow.dom.redirect.cljs$core$IFn$_invoke$arity$2(path,cljs.core.PersistentArrayMap.EMPTY);
}));

(shadow.dom.redirect.cljs$core$IFn$_invoke$arity$2 = (function (path,query_params){
return (document["location"]["href"] = shadow.dom.build_url(path,query_params));
}));

(shadow.dom.redirect.cljs$lang$maxFixedArity = 2);

shadow.dom.reload_BANG_ = (function shadow$dom$reload_BANG_(){
return (document.location.href = document.location.href);
});
shadow.dom.tag_name = (function shadow$dom$tag_name(el){
var dom = shadow.dom.dom_node(el);
return dom.tagName;
});
shadow.dom.insert_after = (function shadow$dom$insert_after(ref,new$){
var new_node = shadow.dom.dom_node(new$);
goog.dom.insertSiblingAfter(new_node,shadow.dom.dom_node(ref));

return new_node;
});
shadow.dom.insert_before = (function shadow$dom$insert_before(ref,new$){
var new_node = shadow.dom.dom_node(new$);
goog.dom.insertSiblingBefore(new_node,shadow.dom.dom_node(ref));

return new_node;
});
shadow.dom.insert_first = (function shadow$dom$insert_first(ref,new$){
var temp__5823__auto__ = shadow.dom.dom_node(ref).firstChild;
if(cljs.core.truth_(temp__5823__auto__)){
var child = temp__5823__auto__;
return shadow.dom.insert_before(child,new$);
} else {
return shadow.dom.append.cljs$core$IFn$_invoke$arity$2(ref,new$);
}
});
shadow.dom.index_of = (function shadow$dom$index_of(el){
var el__$1 = shadow.dom.dom_node(el);
var i = (0);
while(true){
var ps = el__$1.previousSibling;
if((ps == null)){
return i;
} else {
var G__35809 = ps;
var G__35810 = (i + (1));
el__$1 = G__35809;
i = G__35810;
continue;
}
break;
}
});
shadow.dom.get_parent = (function shadow$dom$get_parent(el){
return goog.dom.getParentElement(shadow.dom.dom_node(el));
});
shadow.dom.parents = (function shadow$dom$parents(el){
var parent = shadow.dom.get_parent(el);
if(cljs.core.truth_(parent)){
return cljs.core.cons(parent,(new cljs.core.LazySeq(null,(function (){
return (shadow.dom.parents.cljs$core$IFn$_invoke$arity$1 ? shadow.dom.parents.cljs$core$IFn$_invoke$arity$1(parent) : shadow.dom.parents.call(null,parent));
}),null,null)));
} else {
return null;
}
});
shadow.dom.matches = (function shadow$dom$matches(el,sel){
return shadow.dom.dom_node(el).matches(sel);
});
shadow.dom.get_next_sibling = (function shadow$dom$get_next_sibling(el){
return goog.dom.getNextElementSibling(shadow.dom.dom_node(el));
});
shadow.dom.get_previous_sibling = (function shadow$dom$get_previous_sibling(el){
return goog.dom.getPreviousElementSibling(shadow.dom.dom_node(el));
});
shadow.dom.xmlns = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.PersistentArrayMap(null, 2, ["svg","http://www.w3.org/2000/svg","xlink","http://www.w3.org/1999/xlink"], null));
shadow.dom.create_svg_node = (function shadow$dom$create_svg_node(tag_def,props){
var vec__35198 = shadow.dom.parse_tag(tag_def);
var tag_name = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__35198,(0),null);
var tag_id = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__35198,(1),null);
var tag_classes = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__35198,(2),null);
var el = document.createElementNS("http://www.w3.org/2000/svg",tag_name);
if(cljs.core.truth_(tag_id)){
el.setAttribute("id",tag_id);
} else {
}

if(cljs.core.truth_(tag_classes)){
el.setAttribute("class",shadow.dom.merge_class_string(new cljs.core.Keyword(null,"class","class",-2030961996).cljs$core$IFn$_invoke$arity$1(props),tag_classes));
} else {
}

var seq__35201_35815 = cljs.core.seq(props);
var chunk__35202_35816 = null;
var count__35203_35817 = (0);
var i__35204_35818 = (0);
while(true){
if((i__35204_35818 < count__35203_35817)){
var vec__35212_35819 = chunk__35202_35816.cljs$core$IIndexed$_nth$arity$2(null,i__35204_35818);
var k_35820 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__35212_35819,(0),null);
var v_35821 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__35212_35819,(1),null);
el.setAttributeNS((function (){var temp__5825__auto__ = cljs.core.namespace(k_35820);
if(cljs.core.truth_(temp__5825__auto__)){
var ns = temp__5825__auto__;
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(shadow.dom.xmlns),ns);
} else {
return null;
}
})(),cljs.core.name(k_35820),v_35821);


var G__35824 = seq__35201_35815;
var G__35825 = chunk__35202_35816;
var G__35826 = count__35203_35817;
var G__35827 = (i__35204_35818 + (1));
seq__35201_35815 = G__35824;
chunk__35202_35816 = G__35825;
count__35203_35817 = G__35826;
i__35204_35818 = G__35827;
continue;
} else {
var temp__5825__auto___35828 = cljs.core.seq(seq__35201_35815);
if(temp__5825__auto___35828){
var seq__35201_35829__$1 = temp__5825__auto___35828;
if(cljs.core.chunked_seq_QMARK_(seq__35201_35829__$1)){
var c__5548__auto___35830 = cljs.core.chunk_first(seq__35201_35829__$1);
var G__35831 = cljs.core.chunk_rest(seq__35201_35829__$1);
var G__35832 = c__5548__auto___35830;
var G__35833 = cljs.core.count(c__5548__auto___35830);
var G__35834 = (0);
seq__35201_35815 = G__35831;
chunk__35202_35816 = G__35832;
count__35203_35817 = G__35833;
i__35204_35818 = G__35834;
continue;
} else {
var vec__35215_35835 = cljs.core.first(seq__35201_35829__$1);
var k_35836 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__35215_35835,(0),null);
var v_35837 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__35215_35835,(1),null);
el.setAttributeNS((function (){var temp__5825__auto____$1 = cljs.core.namespace(k_35836);
if(cljs.core.truth_(temp__5825__auto____$1)){
var ns = temp__5825__auto____$1;
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(shadow.dom.xmlns),ns);
} else {
return null;
}
})(),cljs.core.name(k_35836),v_35837);


var G__35838 = cljs.core.next(seq__35201_35829__$1);
var G__35839 = null;
var G__35840 = (0);
var G__35841 = (0);
seq__35201_35815 = G__35838;
chunk__35202_35816 = G__35839;
count__35203_35817 = G__35840;
i__35204_35818 = G__35841;
continue;
}
} else {
}
}
break;
}

return el;
});
shadow.dom.svg_node = (function shadow$dom$svg_node(el){
if((el == null)){
return null;
} else {
if((((!((el == null))))?((((false) || ((cljs.core.PROTOCOL_SENTINEL === el.shadow$dom$SVGElement$))))?true:false):false)){
return el.shadow$dom$SVGElement$_to_svg$arity$1(null);
} else {
return el;

}
}
});
shadow.dom.make_svg_node = (function shadow$dom$make_svg_node(structure){
var vec__35219 = shadow.dom.destructure_node(shadow.dom.create_svg_node,structure);
var node = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__35219,(0),null);
var node_children = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__35219,(1),null);
var seq__35222_35843 = cljs.core.seq(node_children);
var chunk__35224_35844 = null;
var count__35225_35845 = (0);
var i__35226_35846 = (0);
while(true){
if((i__35226_35846 < count__35225_35845)){
var child_struct_35849 = chunk__35224_35844.cljs$core$IIndexed$_nth$arity$2(null,i__35226_35846);
if((!((child_struct_35849 == null)))){
if(typeof child_struct_35849 === 'string'){
var text_35850 = (node["textContent"]);
(node["textContent"] = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(text_35850),child_struct_35849].join(''));
} else {
var children_35852 = shadow.dom.svg_node(child_struct_35849);
if(cljs.core.seq_QMARK_(children_35852)){
var seq__35285_35854 = cljs.core.seq(children_35852);
var chunk__35287_35855 = null;
var count__35288_35856 = (0);
var i__35289_35857 = (0);
while(true){
if((i__35289_35857 < count__35288_35856)){
var child_35860 = chunk__35287_35855.cljs$core$IIndexed$_nth$arity$2(null,i__35289_35857);
if(cljs.core.truth_(child_35860)){
node.appendChild(child_35860);


var G__35862 = seq__35285_35854;
var G__35863 = chunk__35287_35855;
var G__35864 = count__35288_35856;
var G__35865 = (i__35289_35857 + (1));
seq__35285_35854 = G__35862;
chunk__35287_35855 = G__35863;
count__35288_35856 = G__35864;
i__35289_35857 = G__35865;
continue;
} else {
var G__35866 = seq__35285_35854;
var G__35867 = chunk__35287_35855;
var G__35868 = count__35288_35856;
var G__35869 = (i__35289_35857 + (1));
seq__35285_35854 = G__35866;
chunk__35287_35855 = G__35867;
count__35288_35856 = G__35868;
i__35289_35857 = G__35869;
continue;
}
} else {
var temp__5825__auto___35870 = cljs.core.seq(seq__35285_35854);
if(temp__5825__auto___35870){
var seq__35285_35871__$1 = temp__5825__auto___35870;
if(cljs.core.chunked_seq_QMARK_(seq__35285_35871__$1)){
var c__5548__auto___35872 = cljs.core.chunk_first(seq__35285_35871__$1);
var G__35873 = cljs.core.chunk_rest(seq__35285_35871__$1);
var G__35874 = c__5548__auto___35872;
var G__35875 = cljs.core.count(c__5548__auto___35872);
var G__35876 = (0);
seq__35285_35854 = G__35873;
chunk__35287_35855 = G__35874;
count__35288_35856 = G__35875;
i__35289_35857 = G__35876;
continue;
} else {
var child_35877 = cljs.core.first(seq__35285_35871__$1);
if(cljs.core.truth_(child_35877)){
node.appendChild(child_35877);


var G__35878 = cljs.core.next(seq__35285_35871__$1);
var G__35879 = null;
var G__35880 = (0);
var G__35881 = (0);
seq__35285_35854 = G__35878;
chunk__35287_35855 = G__35879;
count__35288_35856 = G__35880;
i__35289_35857 = G__35881;
continue;
} else {
var G__35882 = cljs.core.next(seq__35285_35871__$1);
var G__35883 = null;
var G__35884 = (0);
var G__35885 = (0);
seq__35285_35854 = G__35882;
chunk__35287_35855 = G__35883;
count__35288_35856 = G__35884;
i__35289_35857 = G__35885;
continue;
}
}
} else {
}
}
break;
}
} else {
node.appendChild(children_35852);
}
}


var G__35886 = seq__35222_35843;
var G__35887 = chunk__35224_35844;
var G__35888 = count__35225_35845;
var G__35889 = (i__35226_35846 + (1));
seq__35222_35843 = G__35886;
chunk__35224_35844 = G__35887;
count__35225_35845 = G__35888;
i__35226_35846 = G__35889;
continue;
} else {
var G__35891 = seq__35222_35843;
var G__35892 = chunk__35224_35844;
var G__35893 = count__35225_35845;
var G__35894 = (i__35226_35846 + (1));
seq__35222_35843 = G__35891;
chunk__35224_35844 = G__35892;
count__35225_35845 = G__35893;
i__35226_35846 = G__35894;
continue;
}
} else {
var temp__5825__auto___35895 = cljs.core.seq(seq__35222_35843);
if(temp__5825__auto___35895){
var seq__35222_35896__$1 = temp__5825__auto___35895;
if(cljs.core.chunked_seq_QMARK_(seq__35222_35896__$1)){
var c__5548__auto___35901 = cljs.core.chunk_first(seq__35222_35896__$1);
var G__35902 = cljs.core.chunk_rest(seq__35222_35896__$1);
var G__35903 = c__5548__auto___35901;
var G__35904 = cljs.core.count(c__5548__auto___35901);
var G__35905 = (0);
seq__35222_35843 = G__35902;
chunk__35224_35844 = G__35903;
count__35225_35845 = G__35904;
i__35226_35846 = G__35905;
continue;
} else {
var child_struct_35910 = cljs.core.first(seq__35222_35896__$1);
if((!((child_struct_35910 == null)))){
if(typeof child_struct_35910 === 'string'){
var text_35912 = (node["textContent"]);
(node["textContent"] = [cljs.core.str.cljs$core$IFn$_invoke$arity$1(text_35912),child_struct_35910].join(''));
} else {
var children_35913 = shadow.dom.svg_node(child_struct_35910);
if(cljs.core.seq_QMARK_(children_35913)){
var seq__35321_35914 = cljs.core.seq(children_35913);
var chunk__35323_35915 = null;
var count__35324_35916 = (0);
var i__35325_35917 = (0);
while(true){
if((i__35325_35917 < count__35324_35916)){
var child_35918 = chunk__35323_35915.cljs$core$IIndexed$_nth$arity$2(null,i__35325_35917);
if(cljs.core.truth_(child_35918)){
node.appendChild(child_35918);


var G__35919 = seq__35321_35914;
var G__35920 = chunk__35323_35915;
var G__35921 = count__35324_35916;
var G__35922 = (i__35325_35917 + (1));
seq__35321_35914 = G__35919;
chunk__35323_35915 = G__35920;
count__35324_35916 = G__35921;
i__35325_35917 = G__35922;
continue;
} else {
var G__35923 = seq__35321_35914;
var G__35924 = chunk__35323_35915;
var G__35925 = count__35324_35916;
var G__35926 = (i__35325_35917 + (1));
seq__35321_35914 = G__35923;
chunk__35323_35915 = G__35924;
count__35324_35916 = G__35925;
i__35325_35917 = G__35926;
continue;
}
} else {
var temp__5825__auto___35927__$1 = cljs.core.seq(seq__35321_35914);
if(temp__5825__auto___35927__$1){
var seq__35321_35928__$1 = temp__5825__auto___35927__$1;
if(cljs.core.chunked_seq_QMARK_(seq__35321_35928__$1)){
var c__5548__auto___35929 = cljs.core.chunk_first(seq__35321_35928__$1);
var G__35930 = cljs.core.chunk_rest(seq__35321_35928__$1);
var G__35931 = c__5548__auto___35929;
var G__35932 = cljs.core.count(c__5548__auto___35929);
var G__35933 = (0);
seq__35321_35914 = G__35930;
chunk__35323_35915 = G__35931;
count__35324_35916 = G__35932;
i__35325_35917 = G__35933;
continue;
} else {
var child_35935 = cljs.core.first(seq__35321_35928__$1);
if(cljs.core.truth_(child_35935)){
node.appendChild(child_35935);


var G__35936 = cljs.core.next(seq__35321_35928__$1);
var G__35937 = null;
var G__35938 = (0);
var G__35939 = (0);
seq__35321_35914 = G__35936;
chunk__35323_35915 = G__35937;
count__35324_35916 = G__35938;
i__35325_35917 = G__35939;
continue;
} else {
var G__35941 = cljs.core.next(seq__35321_35928__$1);
var G__35942 = null;
var G__35943 = (0);
var G__35944 = (0);
seq__35321_35914 = G__35941;
chunk__35323_35915 = G__35942;
count__35324_35916 = G__35943;
i__35325_35917 = G__35944;
continue;
}
}
} else {
}
}
break;
}
} else {
node.appendChild(children_35913);
}
}


var G__35945 = cljs.core.next(seq__35222_35896__$1);
var G__35946 = null;
var G__35947 = (0);
var G__35948 = (0);
seq__35222_35843 = G__35945;
chunk__35224_35844 = G__35946;
count__35225_35845 = G__35947;
i__35226_35846 = G__35948;
continue;
} else {
var G__35949 = cljs.core.next(seq__35222_35896__$1);
var G__35950 = null;
var G__35951 = (0);
var G__35952 = (0);
seq__35222_35843 = G__35949;
chunk__35224_35844 = G__35950;
count__35225_35845 = G__35951;
i__35226_35846 = G__35952;
continue;
}
}
} else {
}
}
break;
}

return node;
});
(shadow.dom.SVGElement["string"] = true);

(shadow.dom._to_svg["string"] = (function (this$){
if((this$ instanceof cljs.core.Keyword)){
return shadow.dom.make_svg_node(new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [this$], null));
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("strings cannot be in svgs",new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"this","this",-611633625),this$], null));
}
}));

(cljs.core.PersistentVector.prototype.shadow$dom$SVGElement$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.PersistentVector.prototype.shadow$dom$SVGElement$_to_svg$arity$1 = (function (this$){
var this$__$1 = this;
return shadow.dom.make_svg_node(this$__$1);
}));

(cljs.core.LazySeq.prototype.shadow$dom$SVGElement$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.LazySeq.prototype.shadow$dom$SVGElement$_to_svg$arity$1 = (function (this$){
var this$__$1 = this;
return cljs.core.map.cljs$core$IFn$_invoke$arity$2(shadow.dom._to_svg,this$__$1);
}));

(shadow.dom.SVGElement["null"] = true);

(shadow.dom._to_svg["null"] = (function (_){
return null;
}));
shadow.dom.svg = (function shadow$dom$svg(var_args){
var args__5755__auto__ = [];
var len__5749__auto___35957 = arguments.length;
var i__5750__auto___35958 = (0);
while(true){
if((i__5750__auto___35958 < len__5749__auto___35957)){
args__5755__auto__.push((arguments[i__5750__auto___35958]));

var G__35960 = (i__5750__auto___35958 + (1));
i__5750__auto___35958 = G__35960;
continue;
} else {
}
break;
}

var argseq__5756__auto__ = ((((1) < args__5755__auto__.length))?(new cljs.core.IndexedSeq(args__5755__auto__.slice((1)),(0),null)):null);
return shadow.dom.svg.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5756__auto__);
});

(shadow.dom.svg.cljs$core$IFn$_invoke$arity$variadic = (function (attrs,children){
return shadow.dom._to_svg(cljs.core.vec(cljs.core.concat.cljs$core$IFn$_invoke$arity$2(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"svg","svg",856789142),attrs], null),children)));
}));

(shadow.dom.svg.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(shadow.dom.svg.cljs$lang$applyTo = (function (seq35392){
var G__35394 = cljs.core.first(seq35392);
var seq35392__$1 = cljs.core.next(seq35392);
var self__5734__auto__ = this;
return self__5734__auto__.cljs$core$IFn$_invoke$arity$variadic(G__35394,seq35392__$1);
}));


//# sourceMappingURL=shadow.dom.js.map
