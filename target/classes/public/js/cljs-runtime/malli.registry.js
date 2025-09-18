goog.provide('malli.registry');
/**
 * @define {string}
 */
malli.registry.mode = goog.define("malli.registry.mode","default");
/**
 * @define {string}
 */
malli.registry.type = goog.define("malli.registry.type","default");

/**
 * @interface
 */
malli.registry.Registry = function(){};

var malli$registry$Registry$_schema$dyn_44145 = (function (this$,type){
var x__5373__auto__ = (((this$ == null))?null:this$);
var m__5374__auto__ = (malli.registry._schema[goog.typeOf(x__5373__auto__)]);
if((!((m__5374__auto__ == null)))){
return (m__5374__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5374__auto__.cljs$core$IFn$_invoke$arity$2(this$,type) : m__5374__auto__.call(null,this$,type));
} else {
var m__5372__auto__ = (malli.registry._schema["_"]);
if((!((m__5372__auto__ == null)))){
return (m__5372__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5372__auto__.cljs$core$IFn$_invoke$arity$2(this$,type) : m__5372__auto__.call(null,this$,type));
} else {
throw cljs.core.missing_protocol("Registry.-schema",this$);
}
}
});
/**
 * returns the schema from a registry
 */
malli.registry._schema = (function malli$registry$_schema(this$,type){
if((((!((this$ == null)))) && ((!((this$.malli$registry$Registry$_schema$arity$2 == null)))))){
return this$.malli$registry$Registry$_schema$arity$2(this$,type);
} else {
return malli$registry$Registry$_schema$dyn_44145(this$,type);
}
});

var malli$registry$Registry$_schemas$dyn_44146 = (function (this$){
var x__5373__auto__ = (((this$ == null))?null:this$);
var m__5374__auto__ = (malli.registry._schemas[goog.typeOf(x__5373__auto__)]);
if((!((m__5374__auto__ == null)))){
return (m__5374__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5374__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5374__auto__.call(null,this$));
} else {
var m__5372__auto__ = (malli.registry._schemas["_"]);
if((!((m__5372__auto__ == null)))){
return (m__5372__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5372__auto__.cljs$core$IFn$_invoke$arity$1(this$) : m__5372__auto__.call(null,this$));
} else {
throw cljs.core.missing_protocol("Registry.-schemas",this$);
}
}
});
/**
 * returns all schemas from a registry
 */
malli.registry._schemas = (function malli$registry$_schemas(this$){
if((((!((this$ == null)))) && ((!((this$.malli$registry$Registry$_schemas$arity$1 == null)))))){
return this$.malli$registry$Registry$_schemas$arity$1(this$);
} else {
return malli$registry$Registry$_schemas$dyn_44146(this$);
}
});

malli.registry.registry_QMARK_ = (function malli$registry$registry_QMARK_(x){
if((!((x == null)))){
if(((false) || ((cljs.core.PROTOCOL_SENTINEL === x.malli$registry$Registry$)))){
return true;
} else {
return false;
}
} else {
return false;
}
});

/**
* @constructor
 * @implements {malli.registry.Registry}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
malli.registry.t_malli$registry43997 = (function (m,fm,meta43998){
this.m = m;
this.fm = fm;
this.meta43998 = meta43998;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(malli.registry.t_malli$registry43997.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_43999,meta43998__$1){
var self__ = this;
var _43999__$1 = this;
return (new malli.registry.t_malli$registry43997(self__.m,self__.fm,meta43998__$1));
}));

(malli.registry.t_malli$registry43997.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_43999){
var self__ = this;
var _43999__$1 = this;
return self__.meta43998;
}));

(malli.registry.t_malli$registry43997.prototype.malli$registry$Registry$ = cljs.core.PROTOCOL_SENTINEL);

(malli.registry.t_malli$registry43997.prototype.malli$registry$Registry$_schema$arity$2 = (function (_,type){
var self__ = this;
var ___$1 = this;
return self__.fm.get(type);
}));

(malli.registry.t_malli$registry43997.prototype.malli$registry$Registry$_schemas$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.m;
}));

(malli.registry.t_malli$registry43997.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"m","m",-1021758608,null),new cljs.core.Symbol(null,"fm","fm",-1190690268,null),new cljs.core.Symbol(null,"meta43998","meta43998",1334232470,null)], null);
}));

(malli.registry.t_malli$registry43997.cljs$lang$type = true);

(malli.registry.t_malli$registry43997.cljs$lang$ctorStr = "malli.registry/t_malli$registry43997");

(malli.registry.t_malli$registry43997.cljs$lang$ctorPrWriter = (function (this__5310__auto__,writer__5311__auto__,opt__5312__auto__){
return cljs.core._write(writer__5311__auto__,"malli.registry/t_malli$registry43997");
}));

/**
 * Positional factory function for malli.registry/t_malli$registry43997.
 */
malli.registry.__GT_t_malli$registry43997 = (function malli$registry$__GT_t_malli$registry43997(m,fm,meta43998){
return (new malli.registry.t_malli$registry43997(m,fm,meta43998));
});


malli.registry.fast_registry = (function malli$registry$fast_registry(m){
var fm = m;
return (new malli.registry.t_malli$registry43997(m,fm,cljs.core.PersistentArrayMap.EMPTY));
});

/**
* @constructor
 * @implements {malli.registry.Registry}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
malli.registry.t_malli$registry44007 = (function (m,meta44008){
this.m = m;
this.meta44008 = meta44008;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(malli.registry.t_malli$registry44007.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_44009,meta44008__$1){
var self__ = this;
var _44009__$1 = this;
return (new malli.registry.t_malli$registry44007(self__.m,meta44008__$1));
}));

(malli.registry.t_malli$registry44007.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_44009){
var self__ = this;
var _44009__$1 = this;
return self__.meta44008;
}));

(malli.registry.t_malli$registry44007.prototype.malli$registry$Registry$ = cljs.core.PROTOCOL_SENTINEL);

(malli.registry.t_malli$registry44007.prototype.malli$registry$Registry$_schema$arity$2 = (function (_,type){
var self__ = this;
var ___$1 = this;
return (self__.m.cljs$core$IFn$_invoke$arity$1 ? self__.m.cljs$core$IFn$_invoke$arity$1(type) : self__.m.call(null,type));
}));

(malli.registry.t_malli$registry44007.prototype.malli$registry$Registry$_schemas$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.m;
}));

(malli.registry.t_malli$registry44007.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"m","m",-1021758608,null),new cljs.core.Symbol(null,"meta44008","meta44008",1431894177,null)], null);
}));

(malli.registry.t_malli$registry44007.cljs$lang$type = true);

(malli.registry.t_malli$registry44007.cljs$lang$ctorStr = "malli.registry/t_malli$registry44007");

(malli.registry.t_malli$registry44007.cljs$lang$ctorPrWriter = (function (this__5310__auto__,writer__5311__auto__,opt__5312__auto__){
return cljs.core._write(writer__5311__auto__,"malli.registry/t_malli$registry44007");
}));

/**
 * Positional factory function for malli.registry/t_malli$registry44007.
 */
malli.registry.__GT_t_malli$registry44007 = (function malli$registry$__GT_t_malli$registry44007(m,meta44008){
return (new malli.registry.t_malli$registry44007(m,meta44008));
});


malli.registry.simple_registry = (function malli$registry$simple_registry(m){
return (new malli.registry.t_malli$registry44007(m,cljs.core.PersistentArrayMap.EMPTY));
});
malli.registry.registry = (function malli$registry$registry(_QMARK_registry){
if((_QMARK_registry == null)){
return null;
} else {
if(malli.registry.registry_QMARK_(_QMARK_registry)){
return _QMARK_registry;
} else {
if(cljs.core.map_QMARK_(_QMARK_registry)){
return malli.registry.simple_registry(_QMARK_registry);
} else {
if((((!((_QMARK_registry == null))))?((((false) || ((cljs.core.PROTOCOL_SENTINEL === _QMARK_registry.malli$registry$Registry$))))?true:(((!_QMARK_registry.cljs$lang$protocol_mask$partition$))?cljs.core.native_satisfies_QMARK_(malli.registry.Registry,_QMARK_registry):false)):cljs.core.native_satisfies_QMARK_(malli.registry.Registry,_QMARK_registry))){
return _QMARK_registry;
} else {
return null;
}
}
}
}
});
malli.registry.registry_STAR_ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(malli.registry.simple_registry(cljs.core.PersistentArrayMap.EMPTY));
malli.registry.set_default_registry_BANG_ = (function malli$registry$set_default_registry_BANG_(_QMARK_registry){
if((!((malli.registry.mode === "strict")))){
return cljs.core.reset_BANG_(malli.registry.registry_STAR_,malli.registry.registry(_QMARK_registry));
} else {
throw cljs.core.ex_info.cljs$core$IFn$_invoke$arity$2("can't set default registry, invalid mode",new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"mode","mode",654403691),malli.registry.mode,new cljs.core.Keyword(null,"type","type",1174270348),malli.registry.type], null));
}
});

/**
* @constructor
 * @implements {malli.registry.Registry}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
malli.registry.t_malli$registry44025 = (function (meta44026){
this.meta44026 = meta44026;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(malli.registry.t_malli$registry44025.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_44027,meta44026__$1){
var self__ = this;
var _44027__$1 = this;
return (new malli.registry.t_malli$registry44025(meta44026__$1));
}));

(malli.registry.t_malli$registry44025.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_44027){
var self__ = this;
var _44027__$1 = this;
return self__.meta44026;
}));

(malli.registry.t_malli$registry44025.prototype.malli$registry$Registry$ = cljs.core.PROTOCOL_SENTINEL);

(malli.registry.t_malli$registry44025.prototype.malli$registry$Registry$_schema$arity$2 = (function (_,type){
var self__ = this;
var ___$1 = this;
return malli.registry._schema(cljs.core.deref(malli.registry.registry_STAR_),type);
}));

(malli.registry.t_malli$registry44025.prototype.malli$registry$Registry$_schemas$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return malli.registry._schemas(cljs.core.deref(malli.registry.registry_STAR_));
}));

(malli.registry.t_malli$registry44025.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"meta44026","meta44026",-851803843,null)], null);
}));

(malli.registry.t_malli$registry44025.cljs$lang$type = true);

(malli.registry.t_malli$registry44025.cljs$lang$ctorStr = "malli.registry/t_malli$registry44025");

(malli.registry.t_malli$registry44025.cljs$lang$ctorPrWriter = (function (this__5310__auto__,writer__5311__auto__,opt__5312__auto__){
return cljs.core._write(writer__5311__auto__,"malli.registry/t_malli$registry44025");
}));

/**
 * Positional factory function for malli.registry/t_malli$registry44025.
 */
malli.registry.__GT_t_malli$registry44025 = (function malli$registry$__GT_t_malli$registry44025(meta44026){
return (new malli.registry.t_malli$registry44025(meta44026));
});


malli.registry.custom_default_registry = (function malli$registry$custom_default_registry(){
return (new malli.registry.t_malli$registry44025(cljs.core.PersistentArrayMap.EMPTY));
});

/**
* @constructor
 * @implements {malli.registry.Registry}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
malli.registry.t_malli$registry44046 = (function (_QMARK_registries,registries,meta44047){
this._QMARK_registries = _QMARK_registries;
this.registries = registries;
this.meta44047 = meta44047;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(malli.registry.t_malli$registry44046.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_44048,meta44047__$1){
var self__ = this;
var _44048__$1 = this;
return (new malli.registry.t_malli$registry44046(self__._QMARK_registries,self__.registries,meta44047__$1));
}));

(malli.registry.t_malli$registry44046.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_44048){
var self__ = this;
var _44048__$1 = this;
return self__.meta44047;
}));

(malli.registry.t_malli$registry44046.prototype.malli$registry$Registry$ = cljs.core.PROTOCOL_SENTINEL);

(malli.registry.t_malli$registry44046.prototype.malli$registry$Registry$_schema$arity$2 = (function (_,type){
var self__ = this;
var ___$1 = this;
return cljs.core.some((function (p1__44040_SHARP_){
return malli.registry._schema(p1__44040_SHARP_,type);
}),self__.registries);
}));

(malli.registry.t_malli$registry44046.prototype.malli$registry$Registry$_schemas$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.reduce.cljs$core$IFn$_invoke$arity$2(cljs.core.merge,cljs.core.map.cljs$core$IFn$_invoke$arity$2(malli.registry._schemas,cljs.core.reverse(self__.registries)));
}));

(malli.registry.t_malli$registry44046.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"?registries","?registries",2135368100,null),new cljs.core.Symbol(null,"registries","registries",-1366064418,null),new cljs.core.Symbol(null,"meta44047","meta44047",-1091366683,null)], null);
}));

(malli.registry.t_malli$registry44046.cljs$lang$type = true);

(malli.registry.t_malli$registry44046.cljs$lang$ctorStr = "malli.registry/t_malli$registry44046");

(malli.registry.t_malli$registry44046.cljs$lang$ctorPrWriter = (function (this__5310__auto__,writer__5311__auto__,opt__5312__auto__){
return cljs.core._write(writer__5311__auto__,"malli.registry/t_malli$registry44046");
}));

/**
 * Positional factory function for malli.registry/t_malli$registry44046.
 */
malli.registry.__GT_t_malli$registry44046 = (function malli$registry$__GT_t_malli$registry44046(_QMARK_registries,registries,meta44047){
return (new malli.registry.t_malli$registry44046(_QMARK_registries,registries,meta44047));
});


malli.registry.composite_registry = (function malli$registry$composite_registry(var_args){
var args__5755__auto__ = [];
var len__5749__auto___44201 = arguments.length;
var i__5750__auto___44202 = (0);
while(true){
if((i__5750__auto___44202 < len__5749__auto___44201)){
args__5755__auto__.push((arguments[i__5750__auto___44202]));

var G__44203 = (i__5750__auto___44202 + (1));
i__5750__auto___44202 = G__44203;
continue;
} else {
}
break;
}

var argseq__5756__auto__ = ((((0) < args__5755__auto__.length))?(new cljs.core.IndexedSeq(args__5755__auto__.slice((0)),(0),null)):null);
return malli.registry.composite_registry.cljs$core$IFn$_invoke$arity$variadic(argseq__5756__auto__);
});

(malli.registry.composite_registry.cljs$core$IFn$_invoke$arity$variadic = (function (_QMARK_registries){
var registries = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2(malli.registry.registry,_QMARK_registries);
return (new malli.registry.t_malli$registry44046(_QMARK_registries,registries,cljs.core.PersistentArrayMap.EMPTY));
}));

(malli.registry.composite_registry.cljs$lang$maxFixedArity = (0));

/** @this {Function} */
(malli.registry.composite_registry.cljs$lang$applyTo = (function (seq44042){
var self__5735__auto__ = this;
return self__5735__auto__.cljs$core$IFn$_invoke$arity$variadic(cljs.core.seq(seq44042));
}));


/**
* @constructor
 * @implements {malli.registry.Registry}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
malli.registry.t_malli$registry44077 = (function (db,meta44078){
this.db = db;
this.meta44078 = meta44078;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(malli.registry.t_malli$registry44077.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_44079,meta44078__$1){
var self__ = this;
var _44079__$1 = this;
return (new malli.registry.t_malli$registry44077(self__.db,meta44078__$1));
}));

(malli.registry.t_malli$registry44077.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_44079){
var self__ = this;
var _44079__$1 = this;
return self__.meta44078;
}));

(malli.registry.t_malli$registry44077.prototype.malli$registry$Registry$ = cljs.core.PROTOCOL_SENTINEL);

(malli.registry.t_malli$registry44077.prototype.malli$registry$Registry$_schema$arity$2 = (function (_,type){
var self__ = this;
var ___$1 = this;
return malli.registry._schema(malli.registry.registry(cljs.core.deref(self__.db)),type);
}));

(malli.registry.t_malli$registry44077.prototype.malli$registry$Registry$_schemas$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return malli.registry._schemas(malli.registry.registry(cljs.core.deref(self__.db)));
}));

(malli.registry.t_malli$registry44077.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"db","db",-1661185010,null),new cljs.core.Symbol(null,"meta44078","meta44078",-544607180,null)], null);
}));

(malli.registry.t_malli$registry44077.cljs$lang$type = true);

(malli.registry.t_malli$registry44077.cljs$lang$ctorStr = "malli.registry/t_malli$registry44077");

(malli.registry.t_malli$registry44077.cljs$lang$ctorPrWriter = (function (this__5310__auto__,writer__5311__auto__,opt__5312__auto__){
return cljs.core._write(writer__5311__auto__,"malli.registry/t_malli$registry44077");
}));

/**
 * Positional factory function for malli.registry/t_malli$registry44077.
 */
malli.registry.__GT_t_malli$registry44077 = (function malli$registry$__GT_t_malli$registry44077(db,meta44078){
return (new malli.registry.t_malli$registry44077(db,meta44078));
});


malli.registry.mutable_registry = (function malli$registry$mutable_registry(db){
return (new malli.registry.t_malli$registry44077(db,cljs.core.PersistentArrayMap.EMPTY));
});

/**
* @constructor
 * @implements {malli.registry.Registry}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
malli.registry.t_malli$registry44092 = (function (meta44093){
this.meta44093 = meta44093;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(malli.registry.t_malli$registry44092.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_44094,meta44093__$1){
var self__ = this;
var _44094__$1 = this;
return (new malli.registry.t_malli$registry44092(meta44093__$1));
}));

(malli.registry.t_malli$registry44092.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_44094){
var self__ = this;
var _44094__$1 = this;
return self__.meta44093;
}));

(malli.registry.t_malli$registry44092.prototype.malli$registry$Registry$ = cljs.core.PROTOCOL_SENTINEL);

(malli.registry.t_malli$registry44092.prototype.malli$registry$Registry$_schema$arity$2 = (function (_,type){
var self__ = this;
var ___$1 = this;
if(cljs.core.var_QMARK_(type)){
return cljs.core.deref(type);
} else {
return null;
}
}));

(malli.registry.t_malli$registry44092.prototype.malli$registry$Registry$_schemas$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return null;
}));

(malli.registry.t_malli$registry44092.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"meta44093","meta44093",-344585701,null)], null);
}));

(malli.registry.t_malli$registry44092.cljs$lang$type = true);

(malli.registry.t_malli$registry44092.cljs$lang$ctorStr = "malli.registry/t_malli$registry44092");

(malli.registry.t_malli$registry44092.cljs$lang$ctorPrWriter = (function (this__5310__auto__,writer__5311__auto__,opt__5312__auto__){
return cljs.core._write(writer__5311__auto__,"malli.registry/t_malli$registry44092");
}));

/**
 * Positional factory function for malli.registry/t_malli$registry44092.
 */
malli.registry.__GT_t_malli$registry44092 = (function malli$registry$__GT_t_malli$registry44092(meta44093){
return (new malli.registry.t_malli$registry44092(meta44093));
});


malli.registry.var_registry = (function malli$registry$var_registry(){
return (new malli.registry.t_malli$registry44092(cljs.core.PersistentArrayMap.EMPTY));
});
malli.registry._STAR_registry_STAR_ = cljs.core.PersistentArrayMap.EMPTY;

/**
* @constructor
 * @implements {malli.registry.Registry}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
malli.registry.t_malli$registry44105 = (function (meta44106){
this.meta44106 = meta44106;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(malli.registry.t_malli$registry44105.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_44107,meta44106__$1){
var self__ = this;
var _44107__$1 = this;
return (new malli.registry.t_malli$registry44105(meta44106__$1));
}));

(malli.registry.t_malli$registry44105.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_44107){
var self__ = this;
var _44107__$1 = this;
return self__.meta44106;
}));

(malli.registry.t_malli$registry44105.prototype.malli$registry$Registry$ = cljs.core.PROTOCOL_SENTINEL);

(malli.registry.t_malli$registry44105.prototype.malli$registry$Registry$_schema$arity$2 = (function (_,type){
var self__ = this;
var ___$1 = this;
return malli.registry._schema(malli.registry.registry(malli.registry._STAR_registry_STAR_),type);
}));

(malli.registry.t_malli$registry44105.prototype.malli$registry$Registry$_schemas$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return malli.registry._schemas(malli.registry.registry(malli.registry._STAR_registry_STAR_));
}));

(malli.registry.t_malli$registry44105.getBasis = (function (){
return new cljs.core.PersistentVector(null, 1, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"meta44106","meta44106",1083202696,null)], null);
}));

(malli.registry.t_malli$registry44105.cljs$lang$type = true);

(malli.registry.t_malli$registry44105.cljs$lang$ctorStr = "malli.registry/t_malli$registry44105");

(malli.registry.t_malli$registry44105.cljs$lang$ctorPrWriter = (function (this__5310__auto__,writer__5311__auto__,opt__5312__auto__){
return cljs.core._write(writer__5311__auto__,"malli.registry/t_malli$registry44105");
}));

/**
 * Positional factory function for malli.registry/t_malli$registry44105.
 */
malli.registry.__GT_t_malli$registry44105 = (function malli$registry$__GT_t_malli$registry44105(meta44106){
return (new malli.registry.t_malli$registry44105(meta44106));
});


malli.registry.dynamic_registry = (function malli$registry$dynamic_registry(){
return (new malli.registry.t_malli$registry44105(cljs.core.PersistentArrayMap.EMPTY));
});

/**
* @constructor
 * @implements {malli.registry.Registry}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
malli.registry.t_malli$registry44122 = (function (default_registry,provider,cache_STAR_,registry_STAR_,meta44123){
this.default_registry = default_registry;
this.provider = provider;
this.cache_STAR_ = cache_STAR_;
this.registry_STAR_ = registry_STAR_;
this.meta44123 = meta44123;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(malli.registry.t_malli$registry44122.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_44124,meta44123__$1){
var self__ = this;
var _44124__$1 = this;
return (new malli.registry.t_malli$registry44122(self__.default_registry,self__.provider,self__.cache_STAR_,self__.registry_STAR_,meta44123__$1));
}));

(malli.registry.t_malli$registry44122.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_44124){
var self__ = this;
var _44124__$1 = this;
return self__.meta44123;
}));

(malli.registry.t_malli$registry44122.prototype.malli$registry$Registry$ = cljs.core.PROTOCOL_SENTINEL);

(malli.registry.t_malli$registry44122.prototype.malli$registry$Registry$_schema$arity$2 = (function (_,name){
var self__ = this;
var ___$1 = this;
var or__5025__auto__ = (function (){var fexpr__44131 = cljs.core.deref(self__.cache_STAR_);
return (fexpr__44131.cljs$core$IFn$_invoke$arity$1 ? fexpr__44131.cljs$core$IFn$_invoke$arity$1(name) : fexpr__44131.call(null,name));
})();
if(cljs.core.truth_(or__5025__auto__)){
return or__5025__auto__;
} else {
var temp__5825__auto__ = (function (){var G__44132 = name;
var G__44133 = cljs.core.deref(self__.registry_STAR_);
return (self__.provider.cljs$core$IFn$_invoke$arity$2 ? self__.provider.cljs$core$IFn$_invoke$arity$2(G__44132,G__44133) : self__.provider.call(null,G__44132,G__44133));
})();
if(cljs.core.truth_(temp__5825__auto__)){
var schema = temp__5825__auto__;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(self__.cache_STAR_,cljs.core.assoc,name,schema);

return schema;
} else {
return null;
}
}
}));

(malli.registry.t_malli$registry44122.prototype.malli$registry$Registry$_schemas$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.deref(self__.cache_STAR_);
}));

(malli.registry.t_malli$registry44122.getBasis = (function (){
return new cljs.core.PersistentVector(null, 5, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"default-registry","default-registry",732204441,null),new cljs.core.Symbol(null,"provider","provider",1338474627,null),new cljs.core.Symbol(null,"cache*","cache*",-548597526,null),new cljs.core.Symbol(null,"registry*","registry*",-268031273,null),new cljs.core.Symbol(null,"meta44123","meta44123",-1376797065,null)], null);
}));

(malli.registry.t_malli$registry44122.cljs$lang$type = true);

(malli.registry.t_malli$registry44122.cljs$lang$ctorStr = "malli.registry/t_malli$registry44122");

(malli.registry.t_malli$registry44122.cljs$lang$ctorPrWriter = (function (this__5310__auto__,writer__5311__auto__,opt__5312__auto__){
return cljs.core._write(writer__5311__auto__,"malli.registry/t_malli$registry44122");
}));

/**
 * Positional factory function for malli.registry/t_malli$registry44122.
 */
malli.registry.__GT_t_malli$registry44122 = (function malli$registry$__GT_t_malli$registry44122(default_registry,provider,cache_STAR_,registry_STAR_,meta44123){
return (new malli.registry.t_malli$registry44122(default_registry,provider,cache_STAR_,registry_STAR_,meta44123));
});


malli.registry.lazy_registry = (function malli$registry$lazy_registry(default_registry,provider){
var cache_STAR_ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var registry_STAR_ = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(default_registry);
return cljs.core.reset_BANG_(registry_STAR_,malli.registry.composite_registry.cljs$core$IFn$_invoke$arity$variadic(cljs.core.prim_seq.cljs$core$IFn$_invoke$arity$2([default_registry,(new malli.registry.t_malli$registry44122(default_registry,provider,cache_STAR_,registry_STAR_,cljs.core.PersistentArrayMap.EMPTY))], 0)));
});
/**
 * finds a schema from a registry
 */
malli.registry.schema = (function malli$registry$schema(registry,type){
return malli.registry._schema(registry,type);
});
/**
 * finds all schemas from a registry
 */
malli.registry.schemas = (function malli$registry$schemas(registry){
return malli.registry._schemas(registry);
});

//# sourceMappingURL=malli.registry.js.map
