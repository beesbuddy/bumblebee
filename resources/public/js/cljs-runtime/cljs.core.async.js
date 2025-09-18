goog.provide('cljs.core.async');
goog.scope(function(){
  cljs.core.async.goog$module$goog$array = goog.module.get('goog.array');
});

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async37489 = (function (f,blockable,meta37490){
this.f = f;
this.blockable = blockable;
this.meta37490 = meta37490;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async37489.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_37491,meta37490__$1){
var self__ = this;
var _37491__$1 = this;
return (new cljs.core.async.t_cljs$core$async37489(self__.f,self__.blockable,meta37490__$1));
}));

(cljs.core.async.t_cljs$core$async37489.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_37491){
var self__ = this;
var _37491__$1 = this;
return self__.meta37490;
}));

(cljs.core.async.t_cljs$core$async37489.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async37489.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
}));

(cljs.core.async.t_cljs$core$async37489.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.blockable;
}));

(cljs.core.async.t_cljs$core$async37489.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.f;
}));

(cljs.core.async.t_cljs$core$async37489.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"blockable","blockable",-28395259,null),new cljs.core.Symbol(null,"meta37490","meta37490",110546912,null)], null);
}));

(cljs.core.async.t_cljs$core$async37489.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async37489.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async37489");

(cljs.core.async.t_cljs$core$async37489.cljs$lang$ctorPrWriter = (function (this__5310__auto__,writer__5311__auto__,opt__5312__auto__){
return cljs.core._write(writer__5311__auto__,"cljs.core.async/t_cljs$core$async37489");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async37489.
 */
cljs.core.async.__GT_t_cljs$core$async37489 = (function cljs$core$async$__GT_t_cljs$core$async37489(f,blockable,meta37490){
return (new cljs.core.async.t_cljs$core$async37489(f,blockable,meta37490));
});


cljs.core.async.fn_handler = (function cljs$core$async$fn_handler(var_args){
var G__37487 = arguments.length;
switch (G__37487) {
case 1:
return cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1 = (function (f){
return cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2(f,true);
}));

(cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2 = (function (f,blockable){
return (new cljs.core.async.t_cljs$core$async37489(f,blockable,cljs.core.PersistentArrayMap.EMPTY));
}));

(cljs.core.async.fn_handler.cljs$lang$maxFixedArity = 2);

/**
 * Returns a fixed buffer of size n. When full, puts will block/park.
 */
cljs.core.async.buffer = (function cljs$core$async$buffer(n){
return cljs.core.async.impl.buffers.fixed_buffer(n);
});
/**
 * Returns a buffer of size n. When full, puts will complete but
 *   val will be dropped (no transfer).
 */
cljs.core.async.dropping_buffer = (function cljs$core$async$dropping_buffer(n){
return cljs.core.async.impl.buffers.dropping_buffer(n);
});
/**
 * Returns a buffer of size n. When full, puts will complete, and be
 *   buffered, but oldest elements in buffer will be dropped (not
 *   transferred).
 */
cljs.core.async.sliding_buffer = (function cljs$core$async$sliding_buffer(n){
return cljs.core.async.impl.buffers.sliding_buffer(n);
});
/**
 * Returns true if a channel created with buff will never block. That is to say,
 * puts into this buffer will never cause the buffer to be full. 
 */
cljs.core.async.unblocking_buffer_QMARK_ = (function cljs$core$async$unblocking_buffer_QMARK_(buff){
if((!((buff == null)))){
if(((false) || ((cljs.core.PROTOCOL_SENTINEL === buff.cljs$core$async$impl$protocols$UnblockingBuffer$)))){
return true;
} else {
if((!buff.cljs$lang$protocol_mask$partition$)){
return cljs.core.native_satisfies_QMARK_(cljs.core.async.impl.protocols.UnblockingBuffer,buff);
} else {
return false;
}
}
} else {
return cljs.core.native_satisfies_QMARK_(cljs.core.async.impl.protocols.UnblockingBuffer,buff);
}
});
/**
 * Creates a channel with an optional buffer, an optional transducer (like (map f),
 *   (filter p) etc or a composition thereof), and an optional exception handler.
 *   If buf-or-n is a number, will create and use a fixed buffer of that size. If a
 *   transducer is supplied a buffer must be specified. ex-handler must be a
 *   fn of one argument - if an exception occurs during transformation it will be called
 *   with the thrown value as an argument, and any non-nil return value will be placed
 *   in the channel.
 */
cljs.core.async.chan = (function cljs$core$async$chan(var_args){
var G__37497 = arguments.length;
switch (G__37497) {
case 0:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.chan.cljs$core$IFn$_invoke$arity$0 = (function (){
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(null);
}));

(cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1 = (function (buf_or_n){
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3(buf_or_n,null,null);
}));

(cljs.core.async.chan.cljs$core$IFn$_invoke$arity$2 = (function (buf_or_n,xform){
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3(buf_or_n,xform,null);
}));

(cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3 = (function (buf_or_n,xform,ex_handler){
var buf_or_n__$1 = ((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(buf_or_n,(0)))?null:buf_or_n);
if(cljs.core.truth_(xform)){
if(cljs.core.truth_(buf_or_n__$1)){
} else {
throw (new Error(["Assert failed: ","buffer must be supplied when transducer is","\n","buf-or-n"].join('')));
}
} else {
}

return cljs.core.async.impl.channels.chan.cljs$core$IFn$_invoke$arity$3(((typeof buf_or_n__$1 === 'number')?cljs.core.async.buffer(buf_or_n__$1):buf_or_n__$1),xform,ex_handler);
}));

(cljs.core.async.chan.cljs$lang$maxFixedArity = 3);

/**
 * Creates a promise channel with an optional transducer, and an optional
 *   exception-handler. A promise channel can take exactly one value that consumers
 *   will receive. Once full, puts complete but val is dropped (no transfer).
 *   Consumers will block until either a value is placed in the channel or the
 *   channel is closed, then return the value (or nil) forever. See chan for the
 *   semantics of xform and ex-handler.
 */
cljs.core.async.promise_chan = (function cljs$core$async$promise_chan(var_args){
var G__37500 = arguments.length;
switch (G__37500) {
case 0:
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$0();

break;
case 1:
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$0 = (function (){
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$1(null);
}));

(cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$1 = (function (xform){
return cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$2(xform,null);
}));

(cljs.core.async.promise_chan.cljs$core$IFn$_invoke$arity$2 = (function (xform,ex_handler){
return cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3(cljs.core.async.impl.buffers.promise_buffer(),xform,ex_handler);
}));

(cljs.core.async.promise_chan.cljs$lang$maxFixedArity = 2);

/**
 * Returns a channel that will close after msecs
 */
cljs.core.async.timeout = (function cljs$core$async$timeout(msecs){
return cljs.core.async.impl.timers.timeout(msecs);
});
/**
 * takes a val from port. Must be called inside a (go ...) block. Will
 *   return nil if closed. Will park if nothing is available.
 *   Returns true unless port is already closed
 */
cljs.core.async._LT__BANG_ = (function cljs$core$async$_LT__BANG_(port){
throw (new Error("<! used not in (go ...) block"));
});
/**
 * Asynchronously takes a val from port, passing to fn1. Will pass nil
 * if closed. If on-caller? (default true) is true, and value is
 * immediately available, will call fn1 on calling thread.
 * Returns nil.
 */
cljs.core.async.take_BANG_ = (function cljs$core$async$take_BANG_(var_args){
var G__37504 = arguments.length;
switch (G__37504) {
case 2:
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (port,fn1){
return cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3(port,fn1,true);
}));

(cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (port,fn1,on_caller_QMARK_){
var ret = cljs.core.async.impl.protocols.take_BANG_(port,cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1(fn1));
if(cljs.core.truth_(ret)){
var val_39628 = cljs.core.deref(ret);
if(cljs.core.truth_(on_caller_QMARK_)){
(fn1.cljs$core$IFn$_invoke$arity$1 ? fn1.cljs$core$IFn$_invoke$arity$1(val_39628) : fn1.call(null,val_39628));
} else {
cljs.core.async.impl.dispatch.run((function (){
return (fn1.cljs$core$IFn$_invoke$arity$1 ? fn1.cljs$core$IFn$_invoke$arity$1(val_39628) : fn1.call(null,val_39628));
}));
}
} else {
}

return null;
}));

(cljs.core.async.take_BANG_.cljs$lang$maxFixedArity = 3);

cljs.core.async.nop = (function cljs$core$async$nop(_){
return null;
});
cljs.core.async.fhnop = cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1(cljs.core.async.nop);
/**
 * puts a val into port. nil values are not allowed. Must be called
 *   inside a (go ...) block. Will park if no buffer space is available.
 *   Returns true unless port is already closed.
 */
cljs.core.async._GT__BANG_ = (function cljs$core$async$_GT__BANG_(port,val){
throw (new Error(">! used not in (go ...) block"));
});
/**
 * Asynchronously puts a val into port, calling fn1 (if supplied) when
 * complete. nil values are not allowed. Will throw if closed. If
 * on-caller? (default true) is true, and the put is immediately
 * accepted, will call fn1 on calling thread.  Returns nil.
 */
cljs.core.async.put_BANG_ = (function cljs$core$async$put_BANG_(var_args){
var G__37507 = arguments.length;
switch (G__37507) {
case 2:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (port,val){
var temp__5823__auto__ = cljs.core.async.impl.protocols.put_BANG_(port,val,cljs.core.async.fhnop);
if(cljs.core.truth_(temp__5823__auto__)){
var ret = temp__5823__auto__;
return cljs.core.deref(ret);
} else {
return true;
}
}));

(cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (port,val,fn1){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$4(port,val,fn1,true);
}));

(cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$4 = (function (port,val,fn1,on_caller_QMARK_){
var temp__5823__auto__ = cljs.core.async.impl.protocols.put_BANG_(port,val,cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$1(fn1));
if(cljs.core.truth_(temp__5823__auto__)){
var retb = temp__5823__auto__;
var ret = cljs.core.deref(retb);
if(cljs.core.truth_(on_caller_QMARK_)){
(fn1.cljs$core$IFn$_invoke$arity$1 ? fn1.cljs$core$IFn$_invoke$arity$1(ret) : fn1.call(null,ret));
} else {
cljs.core.async.impl.dispatch.run((function (){
return (fn1.cljs$core$IFn$_invoke$arity$1 ? fn1.cljs$core$IFn$_invoke$arity$1(ret) : fn1.call(null,ret));
}));
}

return ret;
} else {
return true;
}
}));

(cljs.core.async.put_BANG_.cljs$lang$maxFixedArity = 4);

cljs.core.async.close_BANG_ = (function cljs$core$async$close_BANG_(port){
return cljs.core.async.impl.protocols.close_BANG_(port);
});
cljs.core.async.random_array = (function cljs$core$async$random_array(n){
var a = (new Array(n));
var n__5616__auto___39630 = n;
var x_39631 = (0);
while(true){
if((x_39631 < n__5616__auto___39630)){
(a[x_39631] = x_39631);

var G__39632 = (x_39631 + (1));
x_39631 = G__39632;
continue;
} else {
}
break;
}

cljs.core.async.goog$module$goog$array.shuffle(a);

return a;
});

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async37510 = (function (flag,meta37511){
this.flag = flag;
this.meta37511 = meta37511;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async37510.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_37512,meta37511__$1){
var self__ = this;
var _37512__$1 = this;
return (new cljs.core.async.t_cljs$core$async37510(self__.flag,meta37511__$1));
}));

(cljs.core.async.t_cljs$core$async37510.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_37512){
var self__ = this;
var _37512__$1 = this;
return self__.meta37511;
}));

(cljs.core.async.t_cljs$core$async37510.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async37510.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.deref(self__.flag);
}));

(cljs.core.async.t_cljs$core$async37510.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
}));

(cljs.core.async.t_cljs$core$async37510.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_(self__.flag,null);

return true;
}));

(cljs.core.async.t_cljs$core$async37510.getBasis = (function (){
return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"meta37511","meta37511",353047143,null)], null);
}));

(cljs.core.async.t_cljs$core$async37510.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async37510.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async37510");

(cljs.core.async.t_cljs$core$async37510.cljs$lang$ctorPrWriter = (function (this__5310__auto__,writer__5311__auto__,opt__5312__auto__){
return cljs.core._write(writer__5311__auto__,"cljs.core.async/t_cljs$core$async37510");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async37510.
 */
cljs.core.async.__GT_t_cljs$core$async37510 = (function cljs$core$async$__GT_t_cljs$core$async37510(flag,meta37511){
return (new cljs.core.async.t_cljs$core$async37510(flag,meta37511));
});


cljs.core.async.alt_flag = (function cljs$core$async$alt_flag(){
var flag = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(true);
return (new cljs.core.async.t_cljs$core$async37510(flag,cljs.core.PersistentArrayMap.EMPTY));
});

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async37515 = (function (flag,cb,meta37516){
this.flag = flag;
this.cb = cb;
this.meta37516 = meta37516;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async37515.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_37517,meta37516__$1){
var self__ = this;
var _37517__$1 = this;
return (new cljs.core.async.t_cljs$core$async37515(self__.flag,self__.cb,meta37516__$1));
}));

(cljs.core.async.t_cljs$core$async37515.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_37517){
var self__ = this;
var _37517__$1 = this;
return self__.meta37516;
}));

(cljs.core.async.t_cljs$core$async37515.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async37515.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.active_QMARK_(self__.flag);
}));

(cljs.core.async.t_cljs$core$async37515.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return true;
}));

(cljs.core.async.t_cljs$core$async37515.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.async.impl.protocols.commit(self__.flag);

return self__.cb;
}));

(cljs.core.async.t_cljs$core$async37515.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"flag","flag",-1565787888,null),new cljs.core.Symbol(null,"cb","cb",-2064487928,null),new cljs.core.Symbol(null,"meta37516","meta37516",435972756,null)], null);
}));

(cljs.core.async.t_cljs$core$async37515.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async37515.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async37515");

(cljs.core.async.t_cljs$core$async37515.cljs$lang$ctorPrWriter = (function (this__5310__auto__,writer__5311__auto__,opt__5312__auto__){
return cljs.core._write(writer__5311__auto__,"cljs.core.async/t_cljs$core$async37515");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async37515.
 */
cljs.core.async.__GT_t_cljs$core$async37515 = (function cljs$core$async$__GT_t_cljs$core$async37515(flag,cb,meta37516){
return (new cljs.core.async.t_cljs$core$async37515(flag,cb,meta37516));
});


cljs.core.async.alt_handler = (function cljs$core$async$alt_handler(flag,cb){
return (new cljs.core.async.t_cljs$core$async37515(flag,cb,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * returns derefable [val port] if immediate, nil if enqueued
 */
cljs.core.async.do_alts = (function cljs$core$async$do_alts(fret,ports,opts){
if((cljs.core.count(ports) > (0))){
} else {
throw (new Error(["Assert failed: ","alts must have at least one channel operation","\n","(pos? (count ports))"].join('')));
}

var flag = cljs.core.async.alt_flag();
var ports__$1 = cljs.core.vec(ports);
var n = cljs.core.count(ports__$1);
var _ = (function (){var i = (0);
while(true){
if((i < n)){
var port_39638 = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(ports__$1,i);
if(cljs.core.vector_QMARK_(port_39638)){
if((!(((port_39638.cljs$core$IFn$_invoke$arity$1 ? port_39638.cljs$core$IFn$_invoke$arity$1((1)) : port_39638.call(null,(1))) == null)))){
} else {
throw (new Error(["Assert failed: ","can't put nil on channel","\n","(some? (port 1))"].join('')));
}
} else {
}

var G__39639 = (i + (1));
i = G__39639;
continue;
} else {
return null;
}
break;
}
})();
var idxs = cljs.core.async.random_array(n);
var priority = new cljs.core.Keyword(null,"priority","priority",1431093715).cljs$core$IFn$_invoke$arity$1(opts);
var ret = (function (){var i = (0);
while(true){
if((i < n)){
var idx = (cljs.core.truth_(priority)?i:(idxs[i]));
var port = cljs.core.nth.cljs$core$IFn$_invoke$arity$2(ports__$1,idx);
var wport = ((cljs.core.vector_QMARK_(port))?(port.cljs$core$IFn$_invoke$arity$1 ? port.cljs$core$IFn$_invoke$arity$1((0)) : port.call(null,(0))):null);
var vbox = (cljs.core.truth_(wport)?(function (){var val = (port.cljs$core$IFn$_invoke$arity$1 ? port.cljs$core$IFn$_invoke$arity$1((1)) : port.call(null,(1)));
return cljs.core.async.impl.protocols.put_BANG_(wport,val,cljs.core.async.alt_handler(flag,((function (i,val,idx,port,wport,flag,ports__$1,n,_,idxs,priority){
return (function (p1__37519_SHARP_){
var G__37524 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__37519_SHARP_,wport], null);
return (fret.cljs$core$IFn$_invoke$arity$1 ? fret.cljs$core$IFn$_invoke$arity$1(G__37524) : fret.call(null,G__37524));
});})(i,val,idx,port,wport,flag,ports__$1,n,_,idxs,priority))
));
})():cljs.core.async.impl.protocols.take_BANG_(port,cljs.core.async.alt_handler(flag,((function (i,idx,port,wport,flag,ports__$1,n,_,idxs,priority){
return (function (p1__37520_SHARP_){
var G__37525 = new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [p1__37520_SHARP_,port], null);
return (fret.cljs$core$IFn$_invoke$arity$1 ? fret.cljs$core$IFn$_invoke$arity$1(G__37525) : fret.call(null,G__37525));
});})(i,idx,port,wport,flag,ports__$1,n,_,idxs,priority))
)));
if(cljs.core.truth_(vbox)){
return cljs.core.async.impl.channels.box(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [cljs.core.deref(vbox),(function (){var or__5025__auto__ = wport;
if(cljs.core.truth_(or__5025__auto__)){
return or__5025__auto__;
} else {
return port;
}
})()], null));
} else {
var G__39642 = (i + (1));
i = G__39642;
continue;
}
} else {
return null;
}
break;
}
})();
var or__5025__auto__ = ret;
if(cljs.core.truth_(or__5025__auto__)){
return or__5025__auto__;
} else {
if(cljs.core.contains_QMARK_(opts,new cljs.core.Keyword(null,"default","default",-1987822328))){
var temp__5825__auto__ = (function (){var and__5023__auto__ = flag.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1(null);
if(cljs.core.truth_(and__5023__auto__)){
return flag.cljs$core$async$impl$protocols$Handler$commit$arity$1(null);
} else {
return and__5023__auto__;
}
})();
if(cljs.core.truth_(temp__5825__auto__)){
var got = temp__5825__auto__;
return cljs.core.async.impl.channels.box(new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"default","default",-1987822328).cljs$core$IFn$_invoke$arity$1(opts),new cljs.core.Keyword(null,"default","default",-1987822328)], null));
} else {
return null;
}
} else {
return null;
}
}
});
/**
 * Completes at most one of several channel operations. Must be called
 * inside a (go ...) block. ports is a vector of channel endpoints,
 * which can be either a channel to take from or a vector of
 *   [channel-to-put-to val-to-put], in any combination. Takes will be
 *   made as if by <!, and puts will be made as if by >!. Unless
 *   the :priority option is true, if more than one port operation is
 *   ready a non-deterministic choice will be made. If no operation is
 *   ready and a :default value is supplied, [default-val :default] will
 *   be returned, otherwise alts! will park until the first operation to
 *   become ready completes. Returns [val port] of the completed
 *   operation, where val is the value taken for takes, and a
 *   boolean (true unless already closed, as per put!) for puts.
 * 
 *   opts are passed as :key val ... Supported options:
 * 
 *   :default val - the value to use if none of the operations are immediately ready
 *   :priority true - (default nil) when true, the operations will be tried in order.
 * 
 *   Note: there is no guarantee that the port exps or val exprs will be
 *   used, nor in what order should they be, so they should not be
 *   depended upon for side effects.
 */
cljs.core.async.alts_BANG_ = (function cljs$core$async$alts_BANG_(var_args){
var args__5755__auto__ = [];
var len__5749__auto___39645 = arguments.length;
var i__5750__auto___39646 = (0);
while(true){
if((i__5750__auto___39646 < len__5749__auto___39645)){
args__5755__auto__.push((arguments[i__5750__auto___39646]));

var G__39647 = (i__5750__auto___39646 + (1));
i__5750__auto___39646 = G__39647;
continue;
} else {
}
break;
}

var argseq__5756__auto__ = ((((1) < args__5755__auto__.length))?(new cljs.core.IndexedSeq(args__5755__auto__.slice((1)),(0),null)):null);
return cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),argseq__5756__auto__);
});

(cljs.core.async.alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (ports,p__37530){
var map__37531 = p__37530;
var map__37531__$1 = cljs.core.__destructure_map(map__37531);
var opts = map__37531__$1;
throw (new Error("alts! used not in (go ...) block"));
}));

(cljs.core.async.alts_BANG_.cljs$lang$maxFixedArity = (1));

/** @this {Function} */
(cljs.core.async.alts_BANG_.cljs$lang$applyTo = (function (seq37526){
var G__37527 = cljs.core.first(seq37526);
var seq37526__$1 = cljs.core.next(seq37526);
var self__5734__auto__ = this;
return self__5734__auto__.cljs$core$IFn$_invoke$arity$variadic(G__37527,seq37526__$1);
}));

/**
 * Puts a val into port if it's possible to do so immediately.
 *   nil values are not allowed. Never blocks. Returns true if offer succeeds.
 */
cljs.core.async.offer_BANG_ = (function cljs$core$async$offer_BANG_(port,val){
var ret = cljs.core.async.impl.protocols.put_BANG_(port,val,cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2(cljs.core.async.nop,false));
if(cljs.core.truth_(ret)){
return cljs.core.deref(ret);
} else {
return null;
}
});
/**
 * Takes a val from port if it's possible to do so immediately.
 *   Never blocks. Returns value if successful, nil otherwise.
 */
cljs.core.async.poll_BANG_ = (function cljs$core$async$poll_BANG_(port){
var ret = cljs.core.async.impl.protocols.take_BANG_(port,cljs.core.async.fn_handler.cljs$core$IFn$_invoke$arity$2(cljs.core.async.nop,false));
if(cljs.core.truth_(ret)){
return cljs.core.deref(ret);
} else {
return null;
}
});
/**
 * Takes elements from the from channel and supplies them to the to
 * channel. By default, the to channel will be closed when the from
 * channel closes, but can be determined by the close?  parameter. Will
 * stop consuming the from channel if the to channel closes
 */
cljs.core.async.pipe = (function cljs$core$async$pipe(var_args){
var G__37533 = arguments.length;
switch (G__37533) {
case 2:
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$2 = (function (from,to){
return cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3(from,to,true);
}));

(cljs.core.async.pipe.cljs$core$IFn$_invoke$arity$3 = (function (from,to,close_QMARK_){
var c__37424__auto___39652 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__37425__auto__ = (function (){var switch__36913__auto__ = (function (state_37559){
var state_val_37560 = (state_37559[(1)]);
if((state_val_37560 === (7))){
var inst_37555 = (state_37559[(2)]);
var state_37559__$1 = state_37559;
var statearr_37565_39653 = state_37559__$1;
(statearr_37565_39653[(2)] = inst_37555);

(statearr_37565_39653[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37560 === (1))){
var state_37559__$1 = state_37559;
var statearr_37568_39654 = state_37559__$1;
(statearr_37568_39654[(2)] = null);

(statearr_37568_39654[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37560 === (4))){
var inst_37538 = (state_37559[(7)]);
var inst_37538__$1 = (state_37559[(2)]);
var inst_37539 = (inst_37538__$1 == null);
var state_37559__$1 = (function (){var statearr_37572 = state_37559;
(statearr_37572[(7)] = inst_37538__$1);

return statearr_37572;
})();
if(cljs.core.truth_(inst_37539)){
var statearr_37573_39655 = state_37559__$1;
(statearr_37573_39655[(1)] = (5));

} else {
var statearr_37574_39656 = state_37559__$1;
(statearr_37574_39656[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37560 === (13))){
var state_37559__$1 = state_37559;
var statearr_37575_39657 = state_37559__$1;
(statearr_37575_39657[(2)] = null);

(statearr_37575_39657[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37560 === (6))){
var inst_37538 = (state_37559[(7)]);
var state_37559__$1 = state_37559;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_37559__$1,(11),to,inst_37538);
} else {
if((state_val_37560 === (3))){
var inst_37557 = (state_37559[(2)]);
var state_37559__$1 = state_37559;
return cljs.core.async.impl.ioc_helpers.return_chan(state_37559__$1,inst_37557);
} else {
if((state_val_37560 === (12))){
var state_37559__$1 = state_37559;
var statearr_37579_39660 = state_37559__$1;
(statearr_37579_39660[(2)] = null);

(statearr_37579_39660[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37560 === (2))){
var state_37559__$1 = state_37559;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_37559__$1,(4),from);
} else {
if((state_val_37560 === (11))){
var inst_37548 = (state_37559[(2)]);
var state_37559__$1 = state_37559;
if(cljs.core.truth_(inst_37548)){
var statearr_37581_39662 = state_37559__$1;
(statearr_37581_39662[(1)] = (12));

} else {
var statearr_37583_39663 = state_37559__$1;
(statearr_37583_39663[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37560 === (9))){
var state_37559__$1 = state_37559;
var statearr_37584_39664 = state_37559__$1;
(statearr_37584_39664[(2)] = null);

(statearr_37584_39664[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37560 === (5))){
var state_37559__$1 = state_37559;
if(cljs.core.truth_(close_QMARK_)){
var statearr_37588_39665 = state_37559__$1;
(statearr_37588_39665[(1)] = (8));

} else {
var statearr_37589_39666 = state_37559__$1;
(statearr_37589_39666[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37560 === (14))){
var inst_37553 = (state_37559[(2)]);
var state_37559__$1 = state_37559;
var statearr_37590_39668 = state_37559__$1;
(statearr_37590_39668[(2)] = inst_37553);

(statearr_37590_39668[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37560 === (10))){
var inst_37545 = (state_37559[(2)]);
var state_37559__$1 = state_37559;
var statearr_37592_39669 = state_37559__$1;
(statearr_37592_39669[(2)] = inst_37545);

(statearr_37592_39669[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37560 === (8))){
var inst_37542 = cljs.core.async.close_BANG_(to);
var state_37559__$1 = state_37559;
var statearr_37595_39672 = state_37559__$1;
(statearr_37595_39672[(2)] = inst_37542);

(statearr_37595_39672[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__36914__auto__ = null;
var cljs$core$async$state_machine__36914__auto____0 = (function (){
var statearr_37597 = [null,null,null,null,null,null,null,null];
(statearr_37597[(0)] = cljs$core$async$state_machine__36914__auto__);

(statearr_37597[(1)] = (1));

return statearr_37597;
});
var cljs$core$async$state_machine__36914__auto____1 = (function (state_37559){
while(true){
var ret_value__36915__auto__ = (function (){try{while(true){
var result__36916__auto__ = switch__36913__auto__(state_37559);
if(cljs.core.keyword_identical_QMARK_(result__36916__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__36916__auto__;
}
break;
}
}catch (e37599){var ex__36917__auto__ = e37599;
var statearr_37600_39673 = state_37559;
(statearr_37600_39673[(2)] = ex__36917__auto__);


if(cljs.core.seq((state_37559[(4)]))){
var statearr_37602_39674 = state_37559;
(statearr_37602_39674[(1)] = cljs.core.first((state_37559[(4)])));

} else {
throw ex__36917__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__36915__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__39675 = state_37559;
state_37559 = G__39675;
continue;
} else {
return ret_value__36915__auto__;
}
break;
}
});
cljs$core$async$state_machine__36914__auto__ = function(state_37559){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__36914__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__36914__auto____1.call(this,state_37559);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__36914__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__36914__auto____0;
cljs$core$async$state_machine__36914__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__36914__auto____1;
return cljs$core$async$state_machine__36914__auto__;
})()
})();
var state__37426__auto__ = (function (){var statearr_37605 = f__37425__auto__();
(statearr_37605[(6)] = c__37424__auto___39652);

return statearr_37605;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__37426__auto__);
}));


return to;
}));

(cljs.core.async.pipe.cljs$lang$maxFixedArity = 3);

cljs.core.async.pipeline_STAR_ = (function cljs$core$async$pipeline_STAR_(n,to,xf,from,close_QMARK_,ex_handler,type){
if((n > (0))){
} else {
throw (new Error("Assert failed: (pos? n)"));
}

var jobs = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(n);
var results = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(n);
var process__$1 = (function (p__37614){
var vec__37616 = p__37614;
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37616,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37616,(1),null);
var job = vec__37616;
if((job == null)){
cljs.core.async.close_BANG_(results);

return null;
} else {
var res = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$3((1),xf,ex_handler);
var c__37424__auto___39678 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__37425__auto__ = (function (){var switch__36913__auto__ = (function (state_37626){
var state_val_37627 = (state_37626[(1)]);
if((state_val_37627 === (1))){
var state_37626__$1 = state_37626;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_37626__$1,(2),res,v);
} else {
if((state_val_37627 === (2))){
var inst_37623 = (state_37626[(2)]);
var inst_37624 = cljs.core.async.close_BANG_(res);
var state_37626__$1 = (function (){var statearr_37631 = state_37626;
(statearr_37631[(7)] = inst_37623);

return statearr_37631;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_37626__$1,inst_37624);
} else {
return null;
}
}
});
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__36914__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__36914__auto____0 = (function (){
var statearr_37633 = [null,null,null,null,null,null,null,null];
(statearr_37633[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__36914__auto__);

(statearr_37633[(1)] = (1));

return statearr_37633;
});
var cljs$core$async$pipeline_STAR__$_state_machine__36914__auto____1 = (function (state_37626){
while(true){
var ret_value__36915__auto__ = (function (){try{while(true){
var result__36916__auto__ = switch__36913__auto__(state_37626);
if(cljs.core.keyword_identical_QMARK_(result__36916__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__36916__auto__;
}
break;
}
}catch (e37635){var ex__36917__auto__ = e37635;
var statearr_37636_39683 = state_37626;
(statearr_37636_39683[(2)] = ex__36917__auto__);


if(cljs.core.seq((state_37626[(4)]))){
var statearr_37637_39685 = state_37626;
(statearr_37637_39685[(1)] = cljs.core.first((state_37626[(4)])));

} else {
throw ex__36917__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__36915__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__39687 = state_37626;
state_37626 = G__39687;
continue;
} else {
return ret_value__36915__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__36914__auto__ = function(state_37626){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__36914__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__36914__auto____1.call(this,state_37626);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__36914__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__36914__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__36914__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__36914__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__36914__auto__;
})()
})();
var state__37426__auto__ = (function (){var statearr_37641 = f__37425__auto__();
(statearr_37641[(6)] = c__37424__auto___39678);

return statearr_37641;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__37426__auto__);
}));


cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(p,res);

return true;
}
});
var async = (function (p__37643){
var vec__37646 = p__37643;
var v = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37646,(0),null);
var p = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(vec__37646,(1),null);
var job = vec__37646;
if((job == null)){
cljs.core.async.close_BANG_(results);

return null;
} else {
var res = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
(xf.cljs$core$IFn$_invoke$arity$2 ? xf.cljs$core$IFn$_invoke$arity$2(v,res) : xf.call(null,v,res));

cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(p,res);

return true;
}
});
var n__5616__auto___39688 = n;
var __39689 = (0);
while(true){
if((__39689 < n__5616__auto___39688)){
var G__37651_39690 = type;
var G__37651_39691__$1 = (((G__37651_39690 instanceof cljs.core.Keyword))?G__37651_39690.fqn:null);
switch (G__37651_39691__$1) {
case "compute":
var c__37424__auto___39693 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (__39689,c__37424__auto___39693,G__37651_39690,G__37651_39691__$1,n__5616__auto___39688,jobs,results,process__$1,async){
return (function (){
var f__37425__auto__ = (function (){var switch__36913__auto__ = ((function (__39689,c__37424__auto___39693,G__37651_39690,G__37651_39691__$1,n__5616__auto___39688,jobs,results,process__$1,async){
return (function (state_37667){
var state_val_37668 = (state_37667[(1)]);
if((state_val_37668 === (1))){
var state_37667__$1 = state_37667;
var statearr_37674_39694 = state_37667__$1;
(statearr_37674_39694[(2)] = null);

(statearr_37674_39694[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37668 === (2))){
var state_37667__$1 = state_37667;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_37667__$1,(4),jobs);
} else {
if((state_val_37668 === (3))){
var inst_37665 = (state_37667[(2)]);
var state_37667__$1 = state_37667;
return cljs.core.async.impl.ioc_helpers.return_chan(state_37667__$1,inst_37665);
} else {
if((state_val_37668 === (4))){
var inst_37657 = (state_37667[(2)]);
var inst_37658 = process__$1(inst_37657);
var state_37667__$1 = state_37667;
if(cljs.core.truth_(inst_37658)){
var statearr_37676_39695 = state_37667__$1;
(statearr_37676_39695[(1)] = (5));

} else {
var statearr_37677_39696 = state_37667__$1;
(statearr_37677_39696[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37668 === (5))){
var state_37667__$1 = state_37667;
var statearr_37681_39697 = state_37667__$1;
(statearr_37681_39697[(2)] = null);

(statearr_37681_39697[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37668 === (6))){
var state_37667__$1 = state_37667;
var statearr_37683_39702 = state_37667__$1;
(statearr_37683_39702[(2)] = null);

(statearr_37683_39702[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37668 === (7))){
var inst_37663 = (state_37667[(2)]);
var state_37667__$1 = state_37667;
var statearr_37685_39707 = state_37667__$1;
(statearr_37685_39707[(2)] = inst_37663);

(statearr_37685_39707[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
});})(__39689,c__37424__auto___39693,G__37651_39690,G__37651_39691__$1,n__5616__auto___39688,jobs,results,process__$1,async))
;
return ((function (__39689,switch__36913__auto__,c__37424__auto___39693,G__37651_39690,G__37651_39691__$1,n__5616__auto___39688,jobs,results,process__$1,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__36914__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__36914__auto____0 = (function (){
var statearr_37688 = [null,null,null,null,null,null,null];
(statearr_37688[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__36914__auto__);

(statearr_37688[(1)] = (1));

return statearr_37688;
});
var cljs$core$async$pipeline_STAR__$_state_machine__36914__auto____1 = (function (state_37667){
while(true){
var ret_value__36915__auto__ = (function (){try{while(true){
var result__36916__auto__ = switch__36913__auto__(state_37667);
if(cljs.core.keyword_identical_QMARK_(result__36916__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__36916__auto__;
}
break;
}
}catch (e37690){var ex__36917__auto__ = e37690;
var statearr_37692_39717 = state_37667;
(statearr_37692_39717[(2)] = ex__36917__auto__);


if(cljs.core.seq((state_37667[(4)]))){
var statearr_37693_39718 = state_37667;
(statearr_37693_39718[(1)] = cljs.core.first((state_37667[(4)])));

} else {
throw ex__36917__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__36915__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__39719 = state_37667;
state_37667 = G__39719;
continue;
} else {
return ret_value__36915__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__36914__auto__ = function(state_37667){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__36914__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__36914__auto____1.call(this,state_37667);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__36914__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__36914__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__36914__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__36914__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__36914__auto__;
})()
;})(__39689,switch__36913__auto__,c__37424__auto___39693,G__37651_39690,G__37651_39691__$1,n__5616__auto___39688,jobs,results,process__$1,async))
})();
var state__37426__auto__ = (function (){var statearr_37695 = f__37425__auto__();
(statearr_37695[(6)] = c__37424__auto___39693);

return statearr_37695;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__37426__auto__);
});})(__39689,c__37424__auto___39693,G__37651_39690,G__37651_39691__$1,n__5616__auto___39688,jobs,results,process__$1,async))
);


break;
case "async":
var c__37424__auto___39727 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run(((function (__39689,c__37424__auto___39727,G__37651_39690,G__37651_39691__$1,n__5616__auto___39688,jobs,results,process__$1,async){
return (function (){
var f__37425__auto__ = (function (){var switch__36913__auto__ = ((function (__39689,c__37424__auto___39727,G__37651_39690,G__37651_39691__$1,n__5616__auto___39688,jobs,results,process__$1,async){
return (function (state_37711){
var state_val_37712 = (state_37711[(1)]);
if((state_val_37712 === (1))){
var state_37711__$1 = state_37711;
var statearr_37714_39732 = state_37711__$1;
(statearr_37714_39732[(2)] = null);

(statearr_37714_39732[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37712 === (2))){
var state_37711__$1 = state_37711;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_37711__$1,(4),jobs);
} else {
if((state_val_37712 === (3))){
var inst_37709 = (state_37711[(2)]);
var state_37711__$1 = state_37711;
return cljs.core.async.impl.ioc_helpers.return_chan(state_37711__$1,inst_37709);
} else {
if((state_val_37712 === (4))){
var inst_37701 = (state_37711[(2)]);
var inst_37702 = async(inst_37701);
var state_37711__$1 = state_37711;
if(cljs.core.truth_(inst_37702)){
var statearr_37718_39738 = state_37711__$1;
(statearr_37718_39738[(1)] = (5));

} else {
var statearr_37719_39740 = state_37711__$1;
(statearr_37719_39740[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37712 === (5))){
var state_37711__$1 = state_37711;
var statearr_37721_39749 = state_37711__$1;
(statearr_37721_39749[(2)] = null);

(statearr_37721_39749[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37712 === (6))){
var state_37711__$1 = state_37711;
var statearr_37722_39754 = state_37711__$1;
(statearr_37722_39754[(2)] = null);

(statearr_37722_39754[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37712 === (7))){
var inst_37707 = (state_37711[(2)]);
var state_37711__$1 = state_37711;
var statearr_37726_39756 = state_37711__$1;
(statearr_37726_39756[(2)] = inst_37707);

(statearr_37726_39756[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
});})(__39689,c__37424__auto___39727,G__37651_39690,G__37651_39691__$1,n__5616__auto___39688,jobs,results,process__$1,async))
;
return ((function (__39689,switch__36913__auto__,c__37424__auto___39727,G__37651_39690,G__37651_39691__$1,n__5616__auto___39688,jobs,results,process__$1,async){
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__36914__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__36914__auto____0 = (function (){
var statearr_37728 = [null,null,null,null,null,null,null];
(statearr_37728[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__36914__auto__);

(statearr_37728[(1)] = (1));

return statearr_37728;
});
var cljs$core$async$pipeline_STAR__$_state_machine__36914__auto____1 = (function (state_37711){
while(true){
var ret_value__36915__auto__ = (function (){try{while(true){
var result__36916__auto__ = switch__36913__auto__(state_37711);
if(cljs.core.keyword_identical_QMARK_(result__36916__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__36916__auto__;
}
break;
}
}catch (e37731){var ex__36917__auto__ = e37731;
var statearr_37733_39781 = state_37711;
(statearr_37733_39781[(2)] = ex__36917__auto__);


if(cljs.core.seq((state_37711[(4)]))){
var statearr_37734_39782 = state_37711;
(statearr_37734_39782[(1)] = cljs.core.first((state_37711[(4)])));

} else {
throw ex__36917__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__36915__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__39783 = state_37711;
state_37711 = G__39783;
continue;
} else {
return ret_value__36915__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__36914__auto__ = function(state_37711){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__36914__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__36914__auto____1.call(this,state_37711);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__36914__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__36914__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__36914__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__36914__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__36914__auto__;
})()
;})(__39689,switch__36913__auto__,c__37424__auto___39727,G__37651_39690,G__37651_39691__$1,n__5616__auto___39688,jobs,results,process__$1,async))
})();
var state__37426__auto__ = (function (){var statearr_37737 = f__37425__auto__();
(statearr_37737[(6)] = c__37424__auto___39727);

return statearr_37737;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__37426__auto__);
});})(__39689,c__37424__auto___39727,G__37651_39690,G__37651_39691__$1,n__5616__auto___39688,jobs,results,process__$1,async))
);


break;
default:
throw (new Error(["No matching clause: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(G__37651_39691__$1)].join('')));

}

var G__39784 = (__39689 + (1));
__39689 = G__39784;
continue;
} else {
}
break;
}

var c__37424__auto___39789 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__37425__auto__ = (function (){var switch__36913__auto__ = (function (state_37770){
var state_val_37771 = (state_37770[(1)]);
if((state_val_37771 === (7))){
var inst_37765 = (state_37770[(2)]);
var state_37770__$1 = state_37770;
var statearr_37779_39793 = state_37770__$1;
(statearr_37779_39793[(2)] = inst_37765);

(statearr_37779_39793[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37771 === (1))){
var state_37770__$1 = state_37770;
var statearr_37780_39794 = state_37770__$1;
(statearr_37780_39794[(2)] = null);

(statearr_37780_39794[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37771 === (4))){
var inst_37744 = (state_37770[(7)]);
var inst_37744__$1 = (state_37770[(2)]);
var inst_37745 = (inst_37744__$1 == null);
var state_37770__$1 = (function (){var statearr_37782 = state_37770;
(statearr_37782[(7)] = inst_37744__$1);

return statearr_37782;
})();
if(cljs.core.truth_(inst_37745)){
var statearr_37785_39800 = state_37770__$1;
(statearr_37785_39800[(1)] = (5));

} else {
var statearr_37787_39802 = state_37770__$1;
(statearr_37787_39802[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37771 === (6))){
var inst_37744 = (state_37770[(7)]);
var inst_37749 = (state_37770[(8)]);
var inst_37749__$1 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
var inst_37753 = cljs.core.PersistentVector.EMPTY_NODE;
var inst_37754 = [inst_37744,inst_37749__$1];
var inst_37755 = (new cljs.core.PersistentVector(null,2,(5),inst_37753,inst_37754,null));
var state_37770__$1 = (function (){var statearr_37789 = state_37770;
(statearr_37789[(8)] = inst_37749__$1);

return statearr_37789;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_37770__$1,(8),jobs,inst_37755);
} else {
if((state_val_37771 === (3))){
var inst_37767 = (state_37770[(2)]);
var state_37770__$1 = state_37770;
return cljs.core.async.impl.ioc_helpers.return_chan(state_37770__$1,inst_37767);
} else {
if((state_val_37771 === (2))){
var state_37770__$1 = state_37770;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_37770__$1,(4),from);
} else {
if((state_val_37771 === (9))){
var inst_37762 = (state_37770[(2)]);
var state_37770__$1 = (function (){var statearr_37794 = state_37770;
(statearr_37794[(9)] = inst_37762);

return statearr_37794;
})();
var statearr_37796_39823 = state_37770__$1;
(statearr_37796_39823[(2)] = null);

(statearr_37796_39823[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37771 === (5))){
var inst_37747 = cljs.core.async.close_BANG_(jobs);
var state_37770__$1 = state_37770;
var statearr_37800_39824 = state_37770__$1;
(statearr_37800_39824[(2)] = inst_37747);

(statearr_37800_39824[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37771 === (8))){
var inst_37749 = (state_37770[(8)]);
var inst_37757 = (state_37770[(2)]);
var state_37770__$1 = (function (){var statearr_37802 = state_37770;
(statearr_37802[(10)] = inst_37757);

return statearr_37802;
})();
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_37770__$1,(9),results,inst_37749);
} else {
return null;
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__36914__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__36914__auto____0 = (function (){
var statearr_37805 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_37805[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__36914__auto__);

(statearr_37805[(1)] = (1));

return statearr_37805;
});
var cljs$core$async$pipeline_STAR__$_state_machine__36914__auto____1 = (function (state_37770){
while(true){
var ret_value__36915__auto__ = (function (){try{while(true){
var result__36916__auto__ = switch__36913__auto__(state_37770);
if(cljs.core.keyword_identical_QMARK_(result__36916__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__36916__auto__;
}
break;
}
}catch (e37808){var ex__36917__auto__ = e37808;
var statearr_37809_39829 = state_37770;
(statearr_37809_39829[(2)] = ex__36917__auto__);


if(cljs.core.seq((state_37770[(4)]))){
var statearr_37810_39830 = state_37770;
(statearr_37810_39830[(1)] = cljs.core.first((state_37770[(4)])));

} else {
throw ex__36917__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__36915__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__39831 = state_37770;
state_37770 = G__39831;
continue;
} else {
return ret_value__36915__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__36914__auto__ = function(state_37770){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__36914__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__36914__auto____1.call(this,state_37770);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__36914__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__36914__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__36914__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__36914__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__36914__auto__;
})()
})();
var state__37426__auto__ = (function (){var statearr_37815 = f__37425__auto__();
(statearr_37815[(6)] = c__37424__auto___39789);

return statearr_37815;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__37426__auto__);
}));


var c__37424__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__37425__auto__ = (function (){var switch__36913__auto__ = (function (state_37858){
var state_val_37859 = (state_37858[(1)]);
if((state_val_37859 === (7))){
var inst_37854 = (state_37858[(2)]);
var state_37858__$1 = state_37858;
var statearr_37864_39836 = state_37858__$1;
(statearr_37864_39836[(2)] = inst_37854);

(statearr_37864_39836[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37859 === (20))){
var state_37858__$1 = state_37858;
var statearr_37865_39837 = state_37858__$1;
(statearr_37865_39837[(2)] = null);

(statearr_37865_39837[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37859 === (1))){
var state_37858__$1 = state_37858;
var statearr_37869_39838 = state_37858__$1;
(statearr_37869_39838[(2)] = null);

(statearr_37869_39838[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37859 === (4))){
var inst_37819 = (state_37858[(7)]);
var inst_37819__$1 = (state_37858[(2)]);
var inst_37820 = (inst_37819__$1 == null);
var state_37858__$1 = (function (){var statearr_37871 = state_37858;
(statearr_37871[(7)] = inst_37819__$1);

return statearr_37871;
})();
if(cljs.core.truth_(inst_37820)){
var statearr_37872_39840 = state_37858__$1;
(statearr_37872_39840[(1)] = (5));

} else {
var statearr_37875_39841 = state_37858__$1;
(statearr_37875_39841[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37859 === (15))){
var inst_37835 = (state_37858[(8)]);
var state_37858__$1 = state_37858;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_37858__$1,(18),to,inst_37835);
} else {
if((state_val_37859 === (21))){
var inst_37848 = (state_37858[(2)]);
var state_37858__$1 = state_37858;
var statearr_37878_39842 = state_37858__$1;
(statearr_37878_39842[(2)] = inst_37848);

(statearr_37878_39842[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37859 === (13))){
var inst_37850 = (state_37858[(2)]);
var state_37858__$1 = (function (){var statearr_37881 = state_37858;
(statearr_37881[(9)] = inst_37850);

return statearr_37881;
})();
var statearr_37883_39843 = state_37858__$1;
(statearr_37883_39843[(2)] = null);

(statearr_37883_39843[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37859 === (6))){
var inst_37819 = (state_37858[(7)]);
var state_37858__$1 = state_37858;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_37858__$1,(11),inst_37819);
} else {
if((state_val_37859 === (17))){
var inst_37843 = (state_37858[(2)]);
var state_37858__$1 = state_37858;
if(cljs.core.truth_(inst_37843)){
var statearr_37885_39844 = state_37858__$1;
(statearr_37885_39844[(1)] = (19));

} else {
var statearr_37886_39845 = state_37858__$1;
(statearr_37886_39845[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37859 === (3))){
var inst_37856 = (state_37858[(2)]);
var state_37858__$1 = state_37858;
return cljs.core.async.impl.ioc_helpers.return_chan(state_37858__$1,inst_37856);
} else {
if((state_val_37859 === (12))){
var inst_37830 = (state_37858[(10)]);
var state_37858__$1 = state_37858;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_37858__$1,(14),inst_37830);
} else {
if((state_val_37859 === (2))){
var state_37858__$1 = state_37858;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_37858__$1,(4),results);
} else {
if((state_val_37859 === (19))){
var state_37858__$1 = state_37858;
var statearr_37891_39850 = state_37858__$1;
(statearr_37891_39850[(2)] = null);

(statearr_37891_39850[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37859 === (11))){
var inst_37830 = (state_37858[(2)]);
var state_37858__$1 = (function (){var statearr_37895 = state_37858;
(statearr_37895[(10)] = inst_37830);

return statearr_37895;
})();
var statearr_37896_39851 = state_37858__$1;
(statearr_37896_39851[(2)] = null);

(statearr_37896_39851[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37859 === (9))){
var state_37858__$1 = state_37858;
var statearr_37898_39852 = state_37858__$1;
(statearr_37898_39852[(2)] = null);

(statearr_37898_39852[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37859 === (5))){
var state_37858__$1 = state_37858;
if(cljs.core.truth_(close_QMARK_)){
var statearr_37901_39853 = state_37858__$1;
(statearr_37901_39853[(1)] = (8));

} else {
var statearr_37903_39854 = state_37858__$1;
(statearr_37903_39854[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37859 === (14))){
var inst_37835 = (state_37858[(8)]);
var inst_37837 = (state_37858[(11)]);
var inst_37835__$1 = (state_37858[(2)]);
var inst_37836 = (inst_37835__$1 == null);
var inst_37837__$1 = cljs.core.not(inst_37836);
var state_37858__$1 = (function (){var statearr_37905 = state_37858;
(statearr_37905[(8)] = inst_37835__$1);

(statearr_37905[(11)] = inst_37837__$1);

return statearr_37905;
})();
if(inst_37837__$1){
var statearr_37906_39856 = state_37858__$1;
(statearr_37906_39856[(1)] = (15));

} else {
var statearr_37909_39857 = state_37858__$1;
(statearr_37909_39857[(1)] = (16));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37859 === (16))){
var inst_37837 = (state_37858[(11)]);
var state_37858__$1 = state_37858;
var statearr_37911_39858 = state_37858__$1;
(statearr_37911_39858[(2)] = inst_37837);

(statearr_37911_39858[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37859 === (10))){
var inst_37826 = (state_37858[(2)]);
var state_37858__$1 = state_37858;
var statearr_37914_39860 = state_37858__$1;
(statearr_37914_39860[(2)] = inst_37826);

(statearr_37914_39860[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37859 === (18))){
var inst_37840 = (state_37858[(2)]);
var state_37858__$1 = state_37858;
var statearr_37918_39861 = state_37858__$1;
(statearr_37918_39861[(2)] = inst_37840);

(statearr_37918_39861[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37859 === (8))){
var inst_37823 = cljs.core.async.close_BANG_(to);
var state_37858__$1 = state_37858;
var statearr_37920_39865 = state_37858__$1;
(statearr_37920_39865[(2)] = inst_37823);

(statearr_37920_39865[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$pipeline_STAR__$_state_machine__36914__auto__ = null;
var cljs$core$async$pipeline_STAR__$_state_machine__36914__auto____0 = (function (){
var statearr_37925 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_37925[(0)] = cljs$core$async$pipeline_STAR__$_state_machine__36914__auto__);

(statearr_37925[(1)] = (1));

return statearr_37925;
});
var cljs$core$async$pipeline_STAR__$_state_machine__36914__auto____1 = (function (state_37858){
while(true){
var ret_value__36915__auto__ = (function (){try{while(true){
var result__36916__auto__ = switch__36913__auto__(state_37858);
if(cljs.core.keyword_identical_QMARK_(result__36916__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__36916__auto__;
}
break;
}
}catch (e37926){var ex__36917__auto__ = e37926;
var statearr_37928_39870 = state_37858;
(statearr_37928_39870[(2)] = ex__36917__auto__);


if(cljs.core.seq((state_37858[(4)]))){
var statearr_37929_39871 = state_37858;
(statearr_37929_39871[(1)] = cljs.core.first((state_37858[(4)])));

} else {
throw ex__36917__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__36915__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__39872 = state_37858;
state_37858 = G__39872;
continue;
} else {
return ret_value__36915__auto__;
}
break;
}
});
cljs$core$async$pipeline_STAR__$_state_machine__36914__auto__ = function(state_37858){
switch(arguments.length){
case 0:
return cljs$core$async$pipeline_STAR__$_state_machine__36914__auto____0.call(this);
case 1:
return cljs$core$async$pipeline_STAR__$_state_machine__36914__auto____1.call(this,state_37858);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$pipeline_STAR__$_state_machine__36914__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$pipeline_STAR__$_state_machine__36914__auto____0;
cljs$core$async$pipeline_STAR__$_state_machine__36914__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$pipeline_STAR__$_state_machine__36914__auto____1;
return cljs$core$async$pipeline_STAR__$_state_machine__36914__auto__;
})()
})();
var state__37426__auto__ = (function (){var statearr_37933 = f__37425__auto__();
(statearr_37933[(6)] = c__37424__auto__);

return statearr_37933;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__37426__auto__);
}));

return c__37424__auto__;
});
/**
 * Takes elements from the from channel and supplies them to the to
 *   channel, subject to the async function af, with parallelism n. af
 *   must be a function of two arguments, the first an input value and
 *   the second a channel on which to place the result(s). The
 *   presumption is that af will return immediately, having launched some
 *   asynchronous operation whose completion/callback will put results on
 *   the channel, then close! it. Outputs will be returned in order
 *   relative to the inputs. By default, the to channel will be closed
 *   when the from channel closes, but can be determined by the close?
 *   parameter. Will stop consuming the from channel if the to channel
 *   closes. See also pipeline, pipeline-blocking.
 */
cljs.core.async.pipeline_async = (function cljs$core$async$pipeline_async(var_args){
var G__37940 = arguments.length;
switch (G__37940) {
case 4:
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$4 = (function (n,to,af,from){
return cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$5(n,to,af,from,true);
}));

(cljs.core.async.pipeline_async.cljs$core$IFn$_invoke$arity$5 = (function (n,to,af,from,close_QMARK_){
return cljs.core.async.pipeline_STAR_(n,to,af,from,close_QMARK_,null,new cljs.core.Keyword(null,"async","async",1050769601));
}));

(cljs.core.async.pipeline_async.cljs$lang$maxFixedArity = 5);

/**
 * Takes elements from the from channel and supplies them to the to
 *   channel, subject to the transducer xf, with parallelism n. Because
 *   it is parallel, the transducer will be applied independently to each
 *   element, not across elements, and may produce zero or more outputs
 *   per input.  Outputs will be returned in order relative to the
 *   inputs. By default, the to channel will be closed when the from
 *   channel closes, but can be determined by the close?  parameter. Will
 *   stop consuming the from channel if the to channel closes.
 * 
 *   Note this is supplied for API compatibility with the Clojure version.
 *   Values of N > 1 will not result in actual concurrency in a
 *   single-threaded runtime.
 */
cljs.core.async.pipeline = (function cljs$core$async$pipeline(var_args){
var G__37948 = arguments.length;
switch (G__37948) {
case 4:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
case 5:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$5((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]));

break;
case 6:
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$6((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]),(arguments[(4)]),(arguments[(5)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$4 = (function (n,to,xf,from){
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$5(n,to,xf,from,true);
}));

(cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$5 = (function (n,to,xf,from,close_QMARK_){
return cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$6(n,to,xf,from,close_QMARK_,null);
}));

(cljs.core.async.pipeline.cljs$core$IFn$_invoke$arity$6 = (function (n,to,xf,from,close_QMARK_,ex_handler){
return cljs.core.async.pipeline_STAR_(n,to,xf,from,close_QMARK_,ex_handler,new cljs.core.Keyword(null,"compute","compute",1555393130));
}));

(cljs.core.async.pipeline.cljs$lang$maxFixedArity = 6);

/**
 * Takes a predicate and a source channel and returns a vector of two
 *   channels, the first of which will contain the values for which the
 *   predicate returned true, the second those for which it returned
 *   false.
 * 
 *   The out channels will be unbuffered by default, or two buf-or-ns can
 *   be supplied. The channels will close after the source channel has
 *   closed.
 */
cljs.core.async.split = (function cljs$core$async$split(var_args){
var G__37950 = arguments.length;
switch (G__37950) {
case 2:
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 4:
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.split.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.split.cljs$core$IFn$_invoke$arity$4(p,ch,null,null);
}));

(cljs.core.async.split.cljs$core$IFn$_invoke$arity$4 = (function (p,ch,t_buf_or_n,f_buf_or_n){
var tc = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(t_buf_or_n);
var fc = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(f_buf_or_n);
var c__37424__auto___39881 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__37425__auto__ = (function (){var switch__36913__auto__ = (function (state_37976){
var state_val_37977 = (state_37976[(1)]);
if((state_val_37977 === (7))){
var inst_37972 = (state_37976[(2)]);
var state_37976__$1 = state_37976;
var statearr_37978_39882 = state_37976__$1;
(statearr_37978_39882[(2)] = inst_37972);

(statearr_37978_39882[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37977 === (1))){
var state_37976__$1 = state_37976;
var statearr_37979_39885 = state_37976__$1;
(statearr_37979_39885[(2)] = null);

(statearr_37979_39885[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37977 === (4))){
var inst_37953 = (state_37976[(7)]);
var inst_37953__$1 = (state_37976[(2)]);
var inst_37954 = (inst_37953__$1 == null);
var state_37976__$1 = (function (){var statearr_37982 = state_37976;
(statearr_37982[(7)] = inst_37953__$1);

return statearr_37982;
})();
if(cljs.core.truth_(inst_37954)){
var statearr_37983_39888 = state_37976__$1;
(statearr_37983_39888[(1)] = (5));

} else {
var statearr_37984_39892 = state_37976__$1;
(statearr_37984_39892[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37977 === (13))){
var state_37976__$1 = state_37976;
var statearr_37985_39894 = state_37976__$1;
(statearr_37985_39894[(2)] = null);

(statearr_37985_39894[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37977 === (6))){
var inst_37953 = (state_37976[(7)]);
var inst_37959 = (p.cljs$core$IFn$_invoke$arity$1 ? p.cljs$core$IFn$_invoke$arity$1(inst_37953) : p.call(null,inst_37953));
var state_37976__$1 = state_37976;
if(cljs.core.truth_(inst_37959)){
var statearr_37986_39895 = state_37976__$1;
(statearr_37986_39895[(1)] = (9));

} else {
var statearr_37987_39896 = state_37976__$1;
(statearr_37987_39896[(1)] = (10));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37977 === (3))){
var inst_37974 = (state_37976[(2)]);
var state_37976__$1 = state_37976;
return cljs.core.async.impl.ioc_helpers.return_chan(state_37976__$1,inst_37974);
} else {
if((state_val_37977 === (12))){
var state_37976__$1 = state_37976;
var statearr_37992_39897 = state_37976__$1;
(statearr_37992_39897[(2)] = null);

(statearr_37992_39897[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37977 === (2))){
var state_37976__$1 = state_37976;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_37976__$1,(4),ch);
} else {
if((state_val_37977 === (11))){
var inst_37953 = (state_37976[(7)]);
var inst_37963 = (state_37976[(2)]);
var state_37976__$1 = state_37976;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_37976__$1,(8),inst_37963,inst_37953);
} else {
if((state_val_37977 === (9))){
var state_37976__$1 = state_37976;
var statearr_37997_39898 = state_37976__$1;
(statearr_37997_39898[(2)] = tc);

(statearr_37997_39898[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37977 === (5))){
var inst_37956 = cljs.core.async.close_BANG_(tc);
var inst_37957 = cljs.core.async.close_BANG_(fc);
var state_37976__$1 = (function (){var statearr_37999 = state_37976;
(statearr_37999[(8)] = inst_37956);

return statearr_37999;
})();
var statearr_38000_39899 = state_37976__$1;
(statearr_38000_39899[(2)] = inst_37957);

(statearr_38000_39899[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37977 === (14))){
var inst_37970 = (state_37976[(2)]);
var state_37976__$1 = state_37976;
var statearr_38001_39900 = state_37976__$1;
(statearr_38001_39900[(2)] = inst_37970);

(statearr_38001_39900[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37977 === (10))){
var state_37976__$1 = state_37976;
var statearr_38002_39901 = state_37976__$1;
(statearr_38002_39901[(2)] = fc);

(statearr_38002_39901[(1)] = (11));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_37977 === (8))){
var inst_37965 = (state_37976[(2)]);
var state_37976__$1 = state_37976;
if(cljs.core.truth_(inst_37965)){
var statearr_38003_39902 = state_37976__$1;
(statearr_38003_39902[(1)] = (12));

} else {
var statearr_38004_39903 = state_37976__$1;
(statearr_38004_39903[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__36914__auto__ = null;
var cljs$core$async$state_machine__36914__auto____0 = (function (){
var statearr_38012 = [null,null,null,null,null,null,null,null,null];
(statearr_38012[(0)] = cljs$core$async$state_machine__36914__auto__);

(statearr_38012[(1)] = (1));

return statearr_38012;
});
var cljs$core$async$state_machine__36914__auto____1 = (function (state_37976){
while(true){
var ret_value__36915__auto__ = (function (){try{while(true){
var result__36916__auto__ = switch__36913__auto__(state_37976);
if(cljs.core.keyword_identical_QMARK_(result__36916__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__36916__auto__;
}
break;
}
}catch (e38014){var ex__36917__auto__ = e38014;
var statearr_38015_39904 = state_37976;
(statearr_38015_39904[(2)] = ex__36917__auto__);


if(cljs.core.seq((state_37976[(4)]))){
var statearr_38016_39909 = state_37976;
(statearr_38016_39909[(1)] = cljs.core.first((state_37976[(4)])));

} else {
throw ex__36917__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__36915__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__39910 = state_37976;
state_37976 = G__39910;
continue;
} else {
return ret_value__36915__auto__;
}
break;
}
});
cljs$core$async$state_machine__36914__auto__ = function(state_37976){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__36914__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__36914__auto____1.call(this,state_37976);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__36914__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__36914__auto____0;
cljs$core$async$state_machine__36914__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__36914__auto____1;
return cljs$core$async$state_machine__36914__auto__;
})()
})();
var state__37426__auto__ = (function (){var statearr_38020 = f__37425__auto__();
(statearr_38020[(6)] = c__37424__auto___39881);

return statearr_38020;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__37426__auto__);
}));


return new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [tc,fc], null);
}));

(cljs.core.async.split.cljs$lang$maxFixedArity = 4);

/**
 * f should be a function of 2 arguments. Returns a channel containing
 *   the single result of applying f to init and the first item from the
 *   channel, then applying f to that result and the 2nd item, etc. If
 *   the channel closes without yielding items, returns init and f is not
 *   called. ch must close before reduce produces a result.
 */
cljs.core.async.reduce = (function cljs$core$async$reduce(f,init,ch){
var c__37424__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__37425__auto__ = (function (){var switch__36913__auto__ = (function (state_38050){
var state_val_38051 = (state_38050[(1)]);
if((state_val_38051 === (7))){
var inst_38043 = (state_38050[(2)]);
var state_38050__$1 = state_38050;
var statearr_38053_39914 = state_38050__$1;
(statearr_38053_39914[(2)] = inst_38043);

(statearr_38053_39914[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38051 === (1))){
var inst_38026 = init;
var inst_38027 = inst_38026;
var state_38050__$1 = (function (){var statearr_38055 = state_38050;
(statearr_38055[(7)] = inst_38027);

return statearr_38055;
})();
var statearr_38056_39915 = state_38050__$1;
(statearr_38056_39915[(2)] = null);

(statearr_38056_39915[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38051 === (4))){
var inst_38030 = (state_38050[(8)]);
var inst_38030__$1 = (state_38050[(2)]);
var inst_38031 = (inst_38030__$1 == null);
var state_38050__$1 = (function (){var statearr_38057 = state_38050;
(statearr_38057[(8)] = inst_38030__$1);

return statearr_38057;
})();
if(cljs.core.truth_(inst_38031)){
var statearr_38058_39916 = state_38050__$1;
(statearr_38058_39916[(1)] = (5));

} else {
var statearr_38059_39917 = state_38050__$1;
(statearr_38059_39917[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38051 === (6))){
var inst_38027 = (state_38050[(7)]);
var inst_38030 = (state_38050[(8)]);
var inst_38034 = (state_38050[(9)]);
var inst_38034__$1 = (f.cljs$core$IFn$_invoke$arity$2 ? f.cljs$core$IFn$_invoke$arity$2(inst_38027,inst_38030) : f.call(null,inst_38027,inst_38030));
var inst_38035 = cljs.core.reduced_QMARK_(inst_38034__$1);
var state_38050__$1 = (function (){var statearr_38060 = state_38050;
(statearr_38060[(9)] = inst_38034__$1);

return statearr_38060;
})();
if(inst_38035){
var statearr_38065_39921 = state_38050__$1;
(statearr_38065_39921[(1)] = (8));

} else {
var statearr_38066_39922 = state_38050__$1;
(statearr_38066_39922[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38051 === (3))){
var inst_38045 = (state_38050[(2)]);
var state_38050__$1 = state_38050;
return cljs.core.async.impl.ioc_helpers.return_chan(state_38050__$1,inst_38045);
} else {
if((state_val_38051 === (2))){
var state_38050__$1 = state_38050;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_38050__$1,(4),ch);
} else {
if((state_val_38051 === (9))){
var inst_38034 = (state_38050[(9)]);
var inst_38027 = inst_38034;
var state_38050__$1 = (function (){var statearr_38071 = state_38050;
(statearr_38071[(7)] = inst_38027);

return statearr_38071;
})();
var statearr_38072_39923 = state_38050__$1;
(statearr_38072_39923[(2)] = null);

(statearr_38072_39923[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38051 === (5))){
var inst_38027 = (state_38050[(7)]);
var state_38050__$1 = state_38050;
var statearr_38073_39924 = state_38050__$1;
(statearr_38073_39924[(2)] = inst_38027);

(statearr_38073_39924[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38051 === (10))){
var inst_38041 = (state_38050[(2)]);
var state_38050__$1 = state_38050;
var statearr_38077_39925 = state_38050__$1;
(statearr_38077_39925[(2)] = inst_38041);

(statearr_38077_39925[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38051 === (8))){
var inst_38034 = (state_38050[(9)]);
var inst_38037 = cljs.core.deref(inst_38034);
var state_38050__$1 = state_38050;
var statearr_38079_39926 = state_38050__$1;
(statearr_38079_39926[(2)] = inst_38037);

(statearr_38079_39926[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$reduce_$_state_machine__36914__auto__ = null;
var cljs$core$async$reduce_$_state_machine__36914__auto____0 = (function (){
var statearr_38084 = [null,null,null,null,null,null,null,null,null,null];
(statearr_38084[(0)] = cljs$core$async$reduce_$_state_machine__36914__auto__);

(statearr_38084[(1)] = (1));

return statearr_38084;
});
var cljs$core$async$reduce_$_state_machine__36914__auto____1 = (function (state_38050){
while(true){
var ret_value__36915__auto__ = (function (){try{while(true){
var result__36916__auto__ = switch__36913__auto__(state_38050);
if(cljs.core.keyword_identical_QMARK_(result__36916__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__36916__auto__;
}
break;
}
}catch (e38085){var ex__36917__auto__ = e38085;
var statearr_38086_39930 = state_38050;
(statearr_38086_39930[(2)] = ex__36917__auto__);


if(cljs.core.seq((state_38050[(4)]))){
var statearr_38087_39931 = state_38050;
(statearr_38087_39931[(1)] = cljs.core.first((state_38050[(4)])));

} else {
throw ex__36917__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__36915__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__39932 = state_38050;
state_38050 = G__39932;
continue;
} else {
return ret_value__36915__auto__;
}
break;
}
});
cljs$core$async$reduce_$_state_machine__36914__auto__ = function(state_38050){
switch(arguments.length){
case 0:
return cljs$core$async$reduce_$_state_machine__36914__auto____0.call(this);
case 1:
return cljs$core$async$reduce_$_state_machine__36914__auto____1.call(this,state_38050);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$reduce_$_state_machine__36914__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$reduce_$_state_machine__36914__auto____0;
cljs$core$async$reduce_$_state_machine__36914__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$reduce_$_state_machine__36914__auto____1;
return cljs$core$async$reduce_$_state_machine__36914__auto__;
})()
})();
var state__37426__auto__ = (function (){var statearr_38091 = f__37425__auto__();
(statearr_38091[(6)] = c__37424__auto__);

return statearr_38091;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__37426__auto__);
}));

return c__37424__auto__;
});
/**
 * async/reduces a channel with a transformation (xform f).
 *   Returns a channel containing the result.  ch must close before
 *   transduce produces a result.
 */
cljs.core.async.transduce = (function cljs$core$async$transduce(xform,f,init,ch){
var f__$1 = (xform.cljs$core$IFn$_invoke$arity$1 ? xform.cljs$core$IFn$_invoke$arity$1(f) : xform.call(null,f));
var c__37424__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__37425__auto__ = (function (){var switch__36913__auto__ = (function (state_38099){
var state_val_38100 = (state_38099[(1)]);
if((state_val_38100 === (1))){
var inst_38094 = cljs.core.async.reduce(f__$1,init,ch);
var state_38099__$1 = state_38099;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_38099__$1,(2),inst_38094);
} else {
if((state_val_38100 === (2))){
var inst_38096 = (state_38099[(2)]);
var inst_38097 = (f__$1.cljs$core$IFn$_invoke$arity$1 ? f__$1.cljs$core$IFn$_invoke$arity$1(inst_38096) : f__$1.call(null,inst_38096));
var state_38099__$1 = state_38099;
return cljs.core.async.impl.ioc_helpers.return_chan(state_38099__$1,inst_38097);
} else {
return null;
}
}
});
return (function() {
var cljs$core$async$transduce_$_state_machine__36914__auto__ = null;
var cljs$core$async$transduce_$_state_machine__36914__auto____0 = (function (){
var statearr_38109 = [null,null,null,null,null,null,null];
(statearr_38109[(0)] = cljs$core$async$transduce_$_state_machine__36914__auto__);

(statearr_38109[(1)] = (1));

return statearr_38109;
});
var cljs$core$async$transduce_$_state_machine__36914__auto____1 = (function (state_38099){
while(true){
var ret_value__36915__auto__ = (function (){try{while(true){
var result__36916__auto__ = switch__36913__auto__(state_38099);
if(cljs.core.keyword_identical_QMARK_(result__36916__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__36916__auto__;
}
break;
}
}catch (e38110){var ex__36917__auto__ = e38110;
var statearr_38111_39937 = state_38099;
(statearr_38111_39937[(2)] = ex__36917__auto__);


if(cljs.core.seq((state_38099[(4)]))){
var statearr_38112_39938 = state_38099;
(statearr_38112_39938[(1)] = cljs.core.first((state_38099[(4)])));

} else {
throw ex__36917__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__36915__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__39939 = state_38099;
state_38099 = G__39939;
continue;
} else {
return ret_value__36915__auto__;
}
break;
}
});
cljs$core$async$transduce_$_state_machine__36914__auto__ = function(state_38099){
switch(arguments.length){
case 0:
return cljs$core$async$transduce_$_state_machine__36914__auto____0.call(this);
case 1:
return cljs$core$async$transduce_$_state_machine__36914__auto____1.call(this,state_38099);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$transduce_$_state_machine__36914__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$transduce_$_state_machine__36914__auto____0;
cljs$core$async$transduce_$_state_machine__36914__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$transduce_$_state_machine__36914__auto____1;
return cljs$core$async$transduce_$_state_machine__36914__auto__;
})()
})();
var state__37426__auto__ = (function (){var statearr_38117 = f__37425__auto__();
(statearr_38117[(6)] = c__37424__auto__);

return statearr_38117;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__37426__auto__);
}));

return c__37424__auto__;
});
/**
 * Puts the contents of coll into the supplied channel.
 * 
 *   By default the channel will be closed after the items are copied,
 *   but can be determined by the close? parameter.
 * 
 *   Returns a channel which will close after the items are copied.
 */
cljs.core.async.onto_chan_BANG_ = (function cljs$core$async$onto_chan_BANG_(var_args){
var G__38123 = arguments.length;
switch (G__38123) {
case 2:
return cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$2 = (function (ch,coll){
return cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$3(ch,coll,true);
}));

(cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$3 = (function (ch,coll,close_QMARK_){
var c__37424__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__37425__auto__ = (function (){var switch__36913__auto__ = (function (state_38153){
var state_val_38154 = (state_38153[(1)]);
if((state_val_38154 === (7))){
var inst_38134 = (state_38153[(2)]);
var state_38153__$1 = state_38153;
var statearr_38155_39942 = state_38153__$1;
(statearr_38155_39942[(2)] = inst_38134);

(statearr_38155_39942[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38154 === (1))){
var inst_38128 = cljs.core.seq(coll);
var inst_38129 = inst_38128;
var state_38153__$1 = (function (){var statearr_38156 = state_38153;
(statearr_38156[(7)] = inst_38129);

return statearr_38156;
})();
var statearr_38161_39946 = state_38153__$1;
(statearr_38161_39946[(2)] = null);

(statearr_38161_39946[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38154 === (4))){
var inst_38129 = (state_38153[(7)]);
var inst_38132 = cljs.core.first(inst_38129);
var state_38153__$1 = state_38153;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_38153__$1,(7),ch,inst_38132);
} else {
if((state_val_38154 === (13))){
var inst_38147 = (state_38153[(2)]);
var state_38153__$1 = state_38153;
var statearr_38166_39947 = state_38153__$1;
(statearr_38166_39947[(2)] = inst_38147);

(statearr_38166_39947[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38154 === (6))){
var inst_38137 = (state_38153[(2)]);
var state_38153__$1 = state_38153;
if(cljs.core.truth_(inst_38137)){
var statearr_38167_39948 = state_38153__$1;
(statearr_38167_39948[(1)] = (8));

} else {
var statearr_38168_39949 = state_38153__$1;
(statearr_38168_39949[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38154 === (3))){
var inst_38151 = (state_38153[(2)]);
var state_38153__$1 = state_38153;
return cljs.core.async.impl.ioc_helpers.return_chan(state_38153__$1,inst_38151);
} else {
if((state_val_38154 === (12))){
var state_38153__$1 = state_38153;
var statearr_38172_39950 = state_38153__$1;
(statearr_38172_39950[(2)] = null);

(statearr_38172_39950[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38154 === (2))){
var inst_38129 = (state_38153[(7)]);
var state_38153__$1 = state_38153;
if(cljs.core.truth_(inst_38129)){
var statearr_38174_39951 = state_38153__$1;
(statearr_38174_39951[(1)] = (4));

} else {
var statearr_38175_39952 = state_38153__$1;
(statearr_38175_39952[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38154 === (11))){
var inst_38143 = cljs.core.async.close_BANG_(ch);
var state_38153__$1 = state_38153;
var statearr_38179_39953 = state_38153__$1;
(statearr_38179_39953[(2)] = inst_38143);

(statearr_38179_39953[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38154 === (9))){
var state_38153__$1 = state_38153;
if(cljs.core.truth_(close_QMARK_)){
var statearr_38181_39954 = state_38153__$1;
(statearr_38181_39954[(1)] = (11));

} else {
var statearr_38182_39955 = state_38153__$1;
(statearr_38182_39955[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38154 === (5))){
var inst_38129 = (state_38153[(7)]);
var state_38153__$1 = state_38153;
var statearr_38183_39956 = state_38153__$1;
(statearr_38183_39956[(2)] = inst_38129);

(statearr_38183_39956[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38154 === (10))){
var inst_38149 = (state_38153[(2)]);
var state_38153__$1 = state_38153;
var statearr_38187_39957 = state_38153__$1;
(statearr_38187_39957[(2)] = inst_38149);

(statearr_38187_39957[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38154 === (8))){
var inst_38129 = (state_38153[(7)]);
var inst_38139 = cljs.core.next(inst_38129);
var inst_38129__$1 = inst_38139;
var state_38153__$1 = (function (){var statearr_38189 = state_38153;
(statearr_38189[(7)] = inst_38129__$1);

return statearr_38189;
})();
var statearr_38190_39959 = state_38153__$1;
(statearr_38190_39959[(2)] = null);

(statearr_38190_39959[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__36914__auto__ = null;
var cljs$core$async$state_machine__36914__auto____0 = (function (){
var statearr_38191 = [null,null,null,null,null,null,null,null];
(statearr_38191[(0)] = cljs$core$async$state_machine__36914__auto__);

(statearr_38191[(1)] = (1));

return statearr_38191;
});
var cljs$core$async$state_machine__36914__auto____1 = (function (state_38153){
while(true){
var ret_value__36915__auto__ = (function (){try{while(true){
var result__36916__auto__ = switch__36913__auto__(state_38153);
if(cljs.core.keyword_identical_QMARK_(result__36916__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__36916__auto__;
}
break;
}
}catch (e38192){var ex__36917__auto__ = e38192;
var statearr_38193_39960 = state_38153;
(statearr_38193_39960[(2)] = ex__36917__auto__);


if(cljs.core.seq((state_38153[(4)]))){
var statearr_38194_39961 = state_38153;
(statearr_38194_39961[(1)] = cljs.core.first((state_38153[(4)])));

} else {
throw ex__36917__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__36915__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__39962 = state_38153;
state_38153 = G__39962;
continue;
} else {
return ret_value__36915__auto__;
}
break;
}
});
cljs$core$async$state_machine__36914__auto__ = function(state_38153){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__36914__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__36914__auto____1.call(this,state_38153);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__36914__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__36914__auto____0;
cljs$core$async$state_machine__36914__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__36914__auto____1;
return cljs$core$async$state_machine__36914__auto__;
})()
})();
var state__37426__auto__ = (function (){var statearr_38195 = f__37425__auto__();
(statearr_38195[(6)] = c__37424__auto__);

return statearr_38195;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__37426__auto__);
}));

return c__37424__auto__;
}));

(cljs.core.async.onto_chan_BANG_.cljs$lang$maxFixedArity = 3);

/**
 * Creates and returns a channel which contains the contents of coll,
 *   closing when exhausted.
 */
cljs.core.async.to_chan_BANG_ = (function cljs$core$async$to_chan_BANG_(coll){
var ch = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(cljs.core.bounded_count((100),coll));
cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$2(ch,coll);

return ch;
});
/**
 * Deprecated - use onto-chan!
 */
cljs.core.async.onto_chan = (function cljs$core$async$onto_chan(var_args){
var G__38202 = arguments.length;
switch (G__38202) {
case 2:
return cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$2 = (function (ch,coll){
return cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$3(ch,coll,true);
}));

(cljs.core.async.onto_chan.cljs$core$IFn$_invoke$arity$3 = (function (ch,coll,close_QMARK_){
return cljs.core.async.onto_chan_BANG_.cljs$core$IFn$_invoke$arity$3(ch,coll,close_QMARK_);
}));

(cljs.core.async.onto_chan.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - use to-chan!
 */
cljs.core.async.to_chan = (function cljs$core$async$to_chan(coll){
return cljs.core.async.to_chan_BANG_(coll);
});

/**
 * @interface
 */
cljs.core.async.Mux = function(){};

var cljs$core$async$Mux$muxch_STAR_$dyn_39968 = (function (_){
var x__5373__auto__ = (((_ == null))?null:_);
var m__5374__auto__ = (cljs.core.async.muxch_STAR_[goog.typeOf(x__5373__auto__)]);
if((!((m__5374__auto__ == null)))){
return (m__5374__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5374__auto__.cljs$core$IFn$_invoke$arity$1(_) : m__5374__auto__.call(null,_));
} else {
var m__5372__auto__ = (cljs.core.async.muxch_STAR_["_"]);
if((!((m__5372__auto__ == null)))){
return (m__5372__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5372__auto__.cljs$core$IFn$_invoke$arity$1(_) : m__5372__auto__.call(null,_));
} else {
throw cljs.core.missing_protocol("Mux.muxch*",_);
}
}
});
cljs.core.async.muxch_STAR_ = (function cljs$core$async$muxch_STAR_(_){
if((((!((_ == null)))) && ((!((_.cljs$core$async$Mux$muxch_STAR_$arity$1 == null)))))){
return _.cljs$core$async$Mux$muxch_STAR_$arity$1(_);
} else {
return cljs$core$async$Mux$muxch_STAR_$dyn_39968(_);
}
});


/**
 * @interface
 */
cljs.core.async.Mult = function(){};

var cljs$core$async$Mult$tap_STAR_$dyn_39972 = (function (m,ch,close_QMARK_){
var x__5373__auto__ = (((m == null))?null:m);
var m__5374__auto__ = (cljs.core.async.tap_STAR_[goog.typeOf(x__5373__auto__)]);
if((!((m__5374__auto__ == null)))){
return (m__5374__auto__.cljs$core$IFn$_invoke$arity$3 ? m__5374__auto__.cljs$core$IFn$_invoke$arity$3(m,ch,close_QMARK_) : m__5374__auto__.call(null,m,ch,close_QMARK_));
} else {
var m__5372__auto__ = (cljs.core.async.tap_STAR_["_"]);
if((!((m__5372__auto__ == null)))){
return (m__5372__auto__.cljs$core$IFn$_invoke$arity$3 ? m__5372__auto__.cljs$core$IFn$_invoke$arity$3(m,ch,close_QMARK_) : m__5372__auto__.call(null,m,ch,close_QMARK_));
} else {
throw cljs.core.missing_protocol("Mult.tap*",m);
}
}
});
cljs.core.async.tap_STAR_ = (function cljs$core$async$tap_STAR_(m,ch,close_QMARK_){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mult$tap_STAR_$arity$3 == null)))))){
return m.cljs$core$async$Mult$tap_STAR_$arity$3(m,ch,close_QMARK_);
} else {
return cljs$core$async$Mult$tap_STAR_$dyn_39972(m,ch,close_QMARK_);
}
});

var cljs$core$async$Mult$untap_STAR_$dyn_39973 = (function (m,ch){
var x__5373__auto__ = (((m == null))?null:m);
var m__5374__auto__ = (cljs.core.async.untap_STAR_[goog.typeOf(x__5373__auto__)]);
if((!((m__5374__auto__ == null)))){
return (m__5374__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5374__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__5374__auto__.call(null,m,ch));
} else {
var m__5372__auto__ = (cljs.core.async.untap_STAR_["_"]);
if((!((m__5372__auto__ == null)))){
return (m__5372__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5372__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__5372__auto__.call(null,m,ch));
} else {
throw cljs.core.missing_protocol("Mult.untap*",m);
}
}
});
cljs.core.async.untap_STAR_ = (function cljs$core$async$untap_STAR_(m,ch){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mult$untap_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mult$untap_STAR_$arity$2(m,ch);
} else {
return cljs$core$async$Mult$untap_STAR_$dyn_39973(m,ch);
}
});

var cljs$core$async$Mult$untap_all_STAR_$dyn_39978 = (function (m){
var x__5373__auto__ = (((m == null))?null:m);
var m__5374__auto__ = (cljs.core.async.untap_all_STAR_[goog.typeOf(x__5373__auto__)]);
if((!((m__5374__auto__ == null)))){
return (m__5374__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5374__auto__.cljs$core$IFn$_invoke$arity$1(m) : m__5374__auto__.call(null,m));
} else {
var m__5372__auto__ = (cljs.core.async.untap_all_STAR_["_"]);
if((!((m__5372__auto__ == null)))){
return (m__5372__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5372__auto__.cljs$core$IFn$_invoke$arity$1(m) : m__5372__auto__.call(null,m));
} else {
throw cljs.core.missing_protocol("Mult.untap-all*",m);
}
}
});
cljs.core.async.untap_all_STAR_ = (function cljs$core$async$untap_all_STAR_(m){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mult$untap_all_STAR_$arity$1 == null)))))){
return m.cljs$core$async$Mult$untap_all_STAR_$arity$1(m);
} else {
return cljs$core$async$Mult$untap_all_STAR_$dyn_39978(m);
}
});


/**
* @constructor
 * @implements {cljs.core.async.Mult}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async38205 = (function (ch,cs,meta38206){
this.ch = ch;
this.cs = cs;
this.meta38206 = meta38206;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async38205.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_38207,meta38206__$1){
var self__ = this;
var _38207__$1 = this;
return (new cljs.core.async.t_cljs$core$async38205(self__.ch,self__.cs,meta38206__$1));
}));

(cljs.core.async.t_cljs$core$async38205.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_38207){
var self__ = this;
var _38207__$1 = this;
return self__.meta38206;
}));

(cljs.core.async.t_cljs$core$async38205.prototype.cljs$core$async$Mux$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async38205.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
}));

(cljs.core.async.t_cljs$core$async38205.prototype.cljs$core$async$Mult$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async38205.prototype.cljs$core$async$Mult$tap_STAR_$arity$3 = (function (_,ch__$1,close_QMARK_){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(self__.cs,cljs.core.assoc,ch__$1,close_QMARK_);

return null;
}));

(cljs.core.async.t_cljs$core$async38205.prototype.cljs$core$async$Mult$untap_STAR_$arity$2 = (function (_,ch__$1){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.cs,cljs.core.dissoc,ch__$1);

return null;
}));

(cljs.core.async.t_cljs$core$async38205.prototype.cljs$core$async$Mult$untap_all_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_(self__.cs,cljs.core.PersistentArrayMap.EMPTY);

return null;
}));

(cljs.core.async.t_cljs$core$async38205.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"cs","cs",-117024463,null),new cljs.core.Symbol(null,"meta38206","meta38206",366338041,null)], null);
}));

(cljs.core.async.t_cljs$core$async38205.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async38205.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async38205");

(cljs.core.async.t_cljs$core$async38205.cljs$lang$ctorPrWriter = (function (this__5310__auto__,writer__5311__auto__,opt__5312__auto__){
return cljs.core._write(writer__5311__auto__,"cljs.core.async/t_cljs$core$async38205");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async38205.
 */
cljs.core.async.__GT_t_cljs$core$async38205 = (function cljs$core$async$__GT_t_cljs$core$async38205(ch,cs,meta38206){
return (new cljs.core.async.t_cljs$core$async38205(ch,cs,meta38206));
});


/**
 * Creates and returns a mult(iple) of the supplied channel. Channels
 *   containing copies of the channel can be created with 'tap', and
 *   detached with 'untap'.
 * 
 *   Each item is distributed to all taps in parallel and synchronously,
 *   i.e. each tap must accept before the next item is distributed. Use
 *   buffering/windowing to prevent slow taps from holding up the mult.
 * 
 *   Items received when there are no taps get dropped.
 * 
 *   If a tap puts to a closed channel, it will be removed from the mult.
 */
cljs.core.async.mult = (function cljs$core$async$mult(ch){
var cs = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var m = (new cljs.core.async.t_cljs$core$async38205(ch,cs,cljs.core.PersistentArrayMap.EMPTY));
var dchan = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
var dctr = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null);
var done = (function (_){
if((cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(dctr,cljs.core.dec) === (0))){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(dchan,true);
} else {
return null;
}
});
var c__37424__auto___39986 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__37425__auto__ = (function (){var switch__36913__auto__ = (function (state_38346){
var state_val_38347 = (state_38346[(1)]);
if((state_val_38347 === (7))){
var inst_38341 = (state_38346[(2)]);
var state_38346__$1 = state_38346;
var statearr_38348_39988 = state_38346__$1;
(statearr_38348_39988[(2)] = inst_38341);

(statearr_38348_39988[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38347 === (20))){
var inst_38243 = (state_38346[(7)]);
var inst_38255 = cljs.core.first(inst_38243);
var inst_38256 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_38255,(0),null);
var inst_38257 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_38255,(1),null);
var state_38346__$1 = (function (){var statearr_38349 = state_38346;
(statearr_38349[(8)] = inst_38256);

return statearr_38349;
})();
if(cljs.core.truth_(inst_38257)){
var statearr_38350_39989 = state_38346__$1;
(statearr_38350_39989[(1)] = (22));

} else {
var statearr_38351_39990 = state_38346__$1;
(statearr_38351_39990[(1)] = (23));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38347 === (27))){
var inst_38287 = (state_38346[(9)]);
var inst_38289 = (state_38346[(10)]);
var inst_38294 = (state_38346[(11)]);
var inst_38212 = (state_38346[(12)]);
var inst_38294__$1 = cljs.core._nth(inst_38287,inst_38289);
var inst_38295 = cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3(inst_38294__$1,inst_38212,done);
var state_38346__$1 = (function (){var statearr_38352 = state_38346;
(statearr_38352[(11)] = inst_38294__$1);

return statearr_38352;
})();
if(cljs.core.truth_(inst_38295)){
var statearr_38353_39995 = state_38346__$1;
(statearr_38353_39995[(1)] = (30));

} else {
var statearr_38354_39997 = state_38346__$1;
(statearr_38354_39997[(1)] = (31));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38347 === (1))){
var state_38346__$1 = state_38346;
var statearr_38355_39998 = state_38346__$1;
(statearr_38355_39998[(2)] = null);

(statearr_38355_39998[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38347 === (24))){
var inst_38243 = (state_38346[(7)]);
var inst_38263 = (state_38346[(2)]);
var inst_38264 = cljs.core.next(inst_38243);
var inst_38221 = inst_38264;
var inst_38222 = null;
var inst_38223 = (0);
var inst_38224 = (0);
var state_38346__$1 = (function (){var statearr_38356 = state_38346;
(statearr_38356[(13)] = inst_38263);

(statearr_38356[(14)] = inst_38221);

(statearr_38356[(15)] = inst_38222);

(statearr_38356[(16)] = inst_38223);

(statearr_38356[(17)] = inst_38224);

return statearr_38356;
})();
var statearr_38357_39999 = state_38346__$1;
(statearr_38357_39999[(2)] = null);

(statearr_38357_39999[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38347 === (39))){
var state_38346__$1 = state_38346;
var statearr_38363_40001 = state_38346__$1;
(statearr_38363_40001[(2)] = null);

(statearr_38363_40001[(1)] = (41));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38347 === (4))){
var inst_38212 = (state_38346[(12)]);
var inst_38212__$1 = (state_38346[(2)]);
var inst_38213 = (inst_38212__$1 == null);
var state_38346__$1 = (function (){var statearr_38364 = state_38346;
(statearr_38364[(12)] = inst_38212__$1);

return statearr_38364;
})();
if(cljs.core.truth_(inst_38213)){
var statearr_38365_40003 = state_38346__$1;
(statearr_38365_40003[(1)] = (5));

} else {
var statearr_38366_40004 = state_38346__$1;
(statearr_38366_40004[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38347 === (15))){
var inst_38224 = (state_38346[(17)]);
var inst_38221 = (state_38346[(14)]);
var inst_38222 = (state_38346[(15)]);
var inst_38223 = (state_38346[(16)]);
var inst_38239 = (state_38346[(2)]);
var inst_38240 = (inst_38224 + (1));
var tmp38359 = inst_38222;
var tmp38360 = inst_38221;
var tmp38361 = inst_38223;
var inst_38221__$1 = tmp38360;
var inst_38222__$1 = tmp38359;
var inst_38223__$1 = tmp38361;
var inst_38224__$1 = inst_38240;
var state_38346__$1 = (function (){var statearr_38371 = state_38346;
(statearr_38371[(18)] = inst_38239);

(statearr_38371[(14)] = inst_38221__$1);

(statearr_38371[(15)] = inst_38222__$1);

(statearr_38371[(16)] = inst_38223__$1);

(statearr_38371[(17)] = inst_38224__$1);

return statearr_38371;
})();
var statearr_38372_40005 = state_38346__$1;
(statearr_38372_40005[(2)] = null);

(statearr_38372_40005[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38347 === (21))){
var inst_38267 = (state_38346[(2)]);
var state_38346__$1 = state_38346;
var statearr_38376_40006 = state_38346__$1;
(statearr_38376_40006[(2)] = inst_38267);

(statearr_38376_40006[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38347 === (31))){
var inst_38294 = (state_38346[(11)]);
var inst_38298 = m.cljs$core$async$Mult$untap_STAR_$arity$2(null,inst_38294);
var state_38346__$1 = state_38346;
var statearr_38378_40008 = state_38346__$1;
(statearr_38378_40008[(2)] = inst_38298);

(statearr_38378_40008[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38347 === (32))){
var inst_38289 = (state_38346[(10)]);
var inst_38286 = (state_38346[(19)]);
var inst_38287 = (state_38346[(9)]);
var inst_38288 = (state_38346[(20)]);
var inst_38300 = (state_38346[(2)]);
var inst_38301 = (inst_38289 + (1));
var tmp38373 = inst_38287;
var tmp38374 = inst_38286;
var tmp38375 = inst_38288;
var inst_38286__$1 = tmp38374;
var inst_38287__$1 = tmp38373;
var inst_38288__$1 = tmp38375;
var inst_38289__$1 = inst_38301;
var state_38346__$1 = (function (){var statearr_38379 = state_38346;
(statearr_38379[(21)] = inst_38300);

(statearr_38379[(19)] = inst_38286__$1);

(statearr_38379[(9)] = inst_38287__$1);

(statearr_38379[(20)] = inst_38288__$1);

(statearr_38379[(10)] = inst_38289__$1);

return statearr_38379;
})();
var statearr_38381_40013 = state_38346__$1;
(statearr_38381_40013[(2)] = null);

(statearr_38381_40013[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38347 === (40))){
var inst_38313 = (state_38346[(22)]);
var inst_38317 = m.cljs$core$async$Mult$untap_STAR_$arity$2(null,inst_38313);
var state_38346__$1 = state_38346;
var statearr_38382_40014 = state_38346__$1;
(statearr_38382_40014[(2)] = inst_38317);

(statearr_38382_40014[(1)] = (41));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38347 === (33))){
var inst_38304 = (state_38346[(23)]);
var inst_38306 = cljs.core.chunked_seq_QMARK_(inst_38304);
var state_38346__$1 = state_38346;
if(inst_38306){
var statearr_38384_40018 = state_38346__$1;
(statearr_38384_40018[(1)] = (36));

} else {
var statearr_38385_40022 = state_38346__$1;
(statearr_38385_40022[(1)] = (37));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38347 === (13))){
var inst_38233 = (state_38346[(24)]);
var inst_38236 = cljs.core.async.close_BANG_(inst_38233);
var state_38346__$1 = state_38346;
var statearr_38388_40024 = state_38346__$1;
(statearr_38388_40024[(2)] = inst_38236);

(statearr_38388_40024[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38347 === (22))){
var inst_38256 = (state_38346[(8)]);
var inst_38260 = cljs.core.async.close_BANG_(inst_38256);
var state_38346__$1 = state_38346;
var statearr_38389_40025 = state_38346__$1;
(statearr_38389_40025[(2)] = inst_38260);

(statearr_38389_40025[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38347 === (36))){
var inst_38304 = (state_38346[(23)]);
var inst_38308 = cljs.core.chunk_first(inst_38304);
var inst_38309 = cljs.core.chunk_rest(inst_38304);
var inst_38310 = cljs.core.count(inst_38308);
var inst_38286 = inst_38309;
var inst_38287 = inst_38308;
var inst_38288 = inst_38310;
var inst_38289 = (0);
var state_38346__$1 = (function (){var statearr_38390 = state_38346;
(statearr_38390[(19)] = inst_38286);

(statearr_38390[(9)] = inst_38287);

(statearr_38390[(20)] = inst_38288);

(statearr_38390[(10)] = inst_38289);

return statearr_38390;
})();
var statearr_38394_40029 = state_38346__$1;
(statearr_38394_40029[(2)] = null);

(statearr_38394_40029[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38347 === (41))){
var inst_38304 = (state_38346[(23)]);
var inst_38319 = (state_38346[(2)]);
var inst_38320 = cljs.core.next(inst_38304);
var inst_38286 = inst_38320;
var inst_38287 = null;
var inst_38288 = (0);
var inst_38289 = (0);
var state_38346__$1 = (function (){var statearr_38395 = state_38346;
(statearr_38395[(25)] = inst_38319);

(statearr_38395[(19)] = inst_38286);

(statearr_38395[(9)] = inst_38287);

(statearr_38395[(20)] = inst_38288);

(statearr_38395[(10)] = inst_38289);

return statearr_38395;
})();
var statearr_38396_40030 = state_38346__$1;
(statearr_38396_40030[(2)] = null);

(statearr_38396_40030[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38347 === (43))){
var state_38346__$1 = state_38346;
var statearr_38397_40031 = state_38346__$1;
(statearr_38397_40031[(2)] = null);

(statearr_38397_40031[(1)] = (44));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38347 === (29))){
var inst_38328 = (state_38346[(2)]);
var state_38346__$1 = state_38346;
var statearr_38398_40032 = state_38346__$1;
(statearr_38398_40032[(2)] = inst_38328);

(statearr_38398_40032[(1)] = (26));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38347 === (44))){
var inst_38338 = (state_38346[(2)]);
var state_38346__$1 = (function (){var statearr_38399 = state_38346;
(statearr_38399[(26)] = inst_38338);

return statearr_38399;
})();
var statearr_38400_40033 = state_38346__$1;
(statearr_38400_40033[(2)] = null);

(statearr_38400_40033[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38347 === (6))){
var inst_38278 = (state_38346[(27)]);
var inst_38277 = cljs.core.deref(cs);
var inst_38278__$1 = cljs.core.keys(inst_38277);
var inst_38279 = cljs.core.count(inst_38278__$1);
var inst_38280 = cljs.core.reset_BANG_(dctr,inst_38279);
var inst_38285 = cljs.core.seq(inst_38278__$1);
var inst_38286 = inst_38285;
var inst_38287 = null;
var inst_38288 = (0);
var inst_38289 = (0);
var state_38346__$1 = (function (){var statearr_38414 = state_38346;
(statearr_38414[(27)] = inst_38278__$1);

(statearr_38414[(28)] = inst_38280);

(statearr_38414[(19)] = inst_38286);

(statearr_38414[(9)] = inst_38287);

(statearr_38414[(20)] = inst_38288);

(statearr_38414[(10)] = inst_38289);

return statearr_38414;
})();
var statearr_38415_40035 = state_38346__$1;
(statearr_38415_40035[(2)] = null);

(statearr_38415_40035[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38347 === (28))){
var inst_38286 = (state_38346[(19)]);
var inst_38304 = (state_38346[(23)]);
var inst_38304__$1 = cljs.core.seq(inst_38286);
var state_38346__$1 = (function (){var statearr_38422 = state_38346;
(statearr_38422[(23)] = inst_38304__$1);

return statearr_38422;
})();
if(inst_38304__$1){
var statearr_38423_40036 = state_38346__$1;
(statearr_38423_40036[(1)] = (33));

} else {
var statearr_38424_40038 = state_38346__$1;
(statearr_38424_40038[(1)] = (34));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38347 === (25))){
var inst_38289 = (state_38346[(10)]);
var inst_38288 = (state_38346[(20)]);
var inst_38291 = (inst_38289 < inst_38288);
var inst_38292 = inst_38291;
var state_38346__$1 = state_38346;
if(cljs.core.truth_(inst_38292)){
var statearr_38425_40039 = state_38346__$1;
(statearr_38425_40039[(1)] = (27));

} else {
var statearr_38426_40040 = state_38346__$1;
(statearr_38426_40040[(1)] = (28));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38347 === (34))){
var state_38346__$1 = state_38346;
var statearr_38427_40046 = state_38346__$1;
(statearr_38427_40046[(2)] = null);

(statearr_38427_40046[(1)] = (35));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38347 === (17))){
var state_38346__$1 = state_38346;
var statearr_38435_40047 = state_38346__$1;
(statearr_38435_40047[(2)] = null);

(statearr_38435_40047[(1)] = (18));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38347 === (3))){
var inst_38343 = (state_38346[(2)]);
var state_38346__$1 = state_38346;
return cljs.core.async.impl.ioc_helpers.return_chan(state_38346__$1,inst_38343);
} else {
if((state_val_38347 === (12))){
var inst_38272 = (state_38346[(2)]);
var state_38346__$1 = state_38346;
var statearr_38439_40048 = state_38346__$1;
(statearr_38439_40048[(2)] = inst_38272);

(statearr_38439_40048[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38347 === (2))){
var state_38346__$1 = state_38346;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_38346__$1,(4),ch);
} else {
if((state_val_38347 === (23))){
var state_38346__$1 = state_38346;
var statearr_38440_40053 = state_38346__$1;
(statearr_38440_40053[(2)] = null);

(statearr_38440_40053[(1)] = (24));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38347 === (35))){
var inst_38326 = (state_38346[(2)]);
var state_38346__$1 = state_38346;
var statearr_38444_40054 = state_38346__$1;
(statearr_38444_40054[(2)] = inst_38326);

(statearr_38444_40054[(1)] = (29));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38347 === (19))){
var inst_38243 = (state_38346[(7)]);
var inst_38247 = cljs.core.chunk_first(inst_38243);
var inst_38248 = cljs.core.chunk_rest(inst_38243);
var inst_38249 = cljs.core.count(inst_38247);
var inst_38221 = inst_38248;
var inst_38222 = inst_38247;
var inst_38223 = inst_38249;
var inst_38224 = (0);
var state_38346__$1 = (function (){var statearr_38445 = state_38346;
(statearr_38445[(14)] = inst_38221);

(statearr_38445[(15)] = inst_38222);

(statearr_38445[(16)] = inst_38223);

(statearr_38445[(17)] = inst_38224);

return statearr_38445;
})();
var statearr_38446_40055 = state_38346__$1;
(statearr_38446_40055[(2)] = null);

(statearr_38446_40055[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38347 === (11))){
var inst_38221 = (state_38346[(14)]);
var inst_38243 = (state_38346[(7)]);
var inst_38243__$1 = cljs.core.seq(inst_38221);
var state_38346__$1 = (function (){var statearr_38447 = state_38346;
(statearr_38447[(7)] = inst_38243__$1);

return statearr_38447;
})();
if(inst_38243__$1){
var statearr_38448_40056 = state_38346__$1;
(statearr_38448_40056[(1)] = (16));

} else {
var statearr_38449_40057 = state_38346__$1;
(statearr_38449_40057[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38347 === (9))){
var inst_38274 = (state_38346[(2)]);
var state_38346__$1 = state_38346;
var statearr_38450_40058 = state_38346__$1;
(statearr_38450_40058[(2)] = inst_38274);

(statearr_38450_40058[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38347 === (5))){
var inst_38219 = cljs.core.deref(cs);
var inst_38220 = cljs.core.seq(inst_38219);
var inst_38221 = inst_38220;
var inst_38222 = null;
var inst_38223 = (0);
var inst_38224 = (0);
var state_38346__$1 = (function (){var statearr_38455 = state_38346;
(statearr_38455[(14)] = inst_38221);

(statearr_38455[(15)] = inst_38222);

(statearr_38455[(16)] = inst_38223);

(statearr_38455[(17)] = inst_38224);

return statearr_38455;
})();
var statearr_38456_40059 = state_38346__$1;
(statearr_38456_40059[(2)] = null);

(statearr_38456_40059[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38347 === (14))){
var state_38346__$1 = state_38346;
var statearr_38457_40061 = state_38346__$1;
(statearr_38457_40061[(2)] = null);

(statearr_38457_40061[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38347 === (45))){
var inst_38334 = (state_38346[(2)]);
var state_38346__$1 = state_38346;
var statearr_38458_40062 = state_38346__$1;
(statearr_38458_40062[(2)] = inst_38334);

(statearr_38458_40062[(1)] = (44));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38347 === (26))){
var inst_38278 = (state_38346[(27)]);
var inst_38330 = (state_38346[(2)]);
var inst_38331 = cljs.core.seq(inst_38278);
var state_38346__$1 = (function (){var statearr_38459 = state_38346;
(statearr_38459[(29)] = inst_38330);

return statearr_38459;
})();
if(inst_38331){
var statearr_38460_40063 = state_38346__$1;
(statearr_38460_40063[(1)] = (42));

} else {
var statearr_38461_40064 = state_38346__$1;
(statearr_38461_40064[(1)] = (43));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38347 === (16))){
var inst_38243 = (state_38346[(7)]);
var inst_38245 = cljs.core.chunked_seq_QMARK_(inst_38243);
var state_38346__$1 = state_38346;
if(inst_38245){
var statearr_38462_40065 = state_38346__$1;
(statearr_38462_40065[(1)] = (19));

} else {
var statearr_38463_40066 = state_38346__$1;
(statearr_38463_40066[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38347 === (38))){
var inst_38323 = (state_38346[(2)]);
var state_38346__$1 = state_38346;
var statearr_38464_40068 = state_38346__$1;
(statearr_38464_40068[(2)] = inst_38323);

(statearr_38464_40068[(1)] = (35));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38347 === (30))){
var state_38346__$1 = state_38346;
var statearr_38465_40069 = state_38346__$1;
(statearr_38465_40069[(2)] = null);

(statearr_38465_40069[(1)] = (32));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38347 === (10))){
var inst_38222 = (state_38346[(15)]);
var inst_38224 = (state_38346[(17)]);
var inst_38232 = cljs.core._nth(inst_38222,inst_38224);
var inst_38233 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_38232,(0),null);
var inst_38234 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_38232,(1),null);
var state_38346__$1 = (function (){var statearr_38467 = state_38346;
(statearr_38467[(24)] = inst_38233);

return statearr_38467;
})();
if(cljs.core.truth_(inst_38234)){
var statearr_38471_40070 = state_38346__$1;
(statearr_38471_40070[(1)] = (13));

} else {
var statearr_38472_40071 = state_38346__$1;
(statearr_38472_40071[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38347 === (18))){
var inst_38270 = (state_38346[(2)]);
var state_38346__$1 = state_38346;
var statearr_38473_40072 = state_38346__$1;
(statearr_38473_40072[(2)] = inst_38270);

(statearr_38473_40072[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38347 === (42))){
var state_38346__$1 = state_38346;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_38346__$1,(45),dchan);
} else {
if((state_val_38347 === (37))){
var inst_38304 = (state_38346[(23)]);
var inst_38313 = (state_38346[(22)]);
var inst_38212 = (state_38346[(12)]);
var inst_38313__$1 = cljs.core.first(inst_38304);
var inst_38314 = cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$3(inst_38313__$1,inst_38212,done);
var state_38346__$1 = (function (){var statearr_38476 = state_38346;
(statearr_38476[(22)] = inst_38313__$1);

return statearr_38476;
})();
if(cljs.core.truth_(inst_38314)){
var statearr_38477_40077 = state_38346__$1;
(statearr_38477_40077[(1)] = (39));

} else {
var statearr_38478_40078 = state_38346__$1;
(statearr_38478_40078[(1)] = (40));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38347 === (8))){
var inst_38224 = (state_38346[(17)]);
var inst_38223 = (state_38346[(16)]);
var inst_38226 = (inst_38224 < inst_38223);
var inst_38227 = inst_38226;
var state_38346__$1 = state_38346;
if(cljs.core.truth_(inst_38227)){
var statearr_38480_40079 = state_38346__$1;
(statearr_38480_40079[(1)] = (10));

} else {
var statearr_38482_40080 = state_38346__$1;
(statearr_38482_40080[(1)] = (11));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$mult_$_state_machine__36914__auto__ = null;
var cljs$core$async$mult_$_state_machine__36914__auto____0 = (function (){
var statearr_38483 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_38483[(0)] = cljs$core$async$mult_$_state_machine__36914__auto__);

(statearr_38483[(1)] = (1));

return statearr_38483;
});
var cljs$core$async$mult_$_state_machine__36914__auto____1 = (function (state_38346){
while(true){
var ret_value__36915__auto__ = (function (){try{while(true){
var result__36916__auto__ = switch__36913__auto__(state_38346);
if(cljs.core.keyword_identical_QMARK_(result__36916__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__36916__auto__;
}
break;
}
}catch (e38484){var ex__36917__auto__ = e38484;
var statearr_38485_40084 = state_38346;
(statearr_38485_40084[(2)] = ex__36917__auto__);


if(cljs.core.seq((state_38346[(4)]))){
var statearr_38486_40085 = state_38346;
(statearr_38486_40085[(1)] = cljs.core.first((state_38346[(4)])));

} else {
throw ex__36917__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__36915__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__40086 = state_38346;
state_38346 = G__40086;
continue;
} else {
return ret_value__36915__auto__;
}
break;
}
});
cljs$core$async$mult_$_state_machine__36914__auto__ = function(state_38346){
switch(arguments.length){
case 0:
return cljs$core$async$mult_$_state_machine__36914__auto____0.call(this);
case 1:
return cljs$core$async$mult_$_state_machine__36914__auto____1.call(this,state_38346);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mult_$_state_machine__36914__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mult_$_state_machine__36914__auto____0;
cljs$core$async$mult_$_state_machine__36914__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mult_$_state_machine__36914__auto____1;
return cljs$core$async$mult_$_state_machine__36914__auto__;
})()
})();
var state__37426__auto__ = (function (){var statearr_38487 = f__37425__auto__();
(statearr_38487[(6)] = c__37424__auto___39986);

return statearr_38487;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__37426__auto__);
}));


return m;
});
/**
 * Copies the mult source onto the supplied channel.
 * 
 *   By default the channel will be closed when the source closes,
 *   but can be determined by the close? parameter.
 */
cljs.core.async.tap = (function cljs$core$async$tap(var_args){
var G__38489 = arguments.length;
switch (G__38489) {
case 2:
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.tap.cljs$core$IFn$_invoke$arity$2 = (function (mult,ch){
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3(mult,ch,true);
}));

(cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3 = (function (mult,ch,close_QMARK_){
cljs.core.async.tap_STAR_(mult,ch,close_QMARK_);

return ch;
}));

(cljs.core.async.tap.cljs$lang$maxFixedArity = 3);

/**
 * Disconnects a target channel from a mult
 */
cljs.core.async.untap = (function cljs$core$async$untap(mult,ch){
return cljs.core.async.untap_STAR_(mult,ch);
});
/**
 * Disconnects all target channels from a mult
 */
cljs.core.async.untap_all = (function cljs$core$async$untap_all(mult){
return cljs.core.async.untap_all_STAR_(mult);
});

/**
 * @interface
 */
cljs.core.async.Mix = function(){};

var cljs$core$async$Mix$admix_STAR_$dyn_40091 = (function (m,ch){
var x__5373__auto__ = (((m == null))?null:m);
var m__5374__auto__ = (cljs.core.async.admix_STAR_[goog.typeOf(x__5373__auto__)]);
if((!((m__5374__auto__ == null)))){
return (m__5374__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5374__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__5374__auto__.call(null,m,ch));
} else {
var m__5372__auto__ = (cljs.core.async.admix_STAR_["_"]);
if((!((m__5372__auto__ == null)))){
return (m__5372__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5372__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__5372__auto__.call(null,m,ch));
} else {
throw cljs.core.missing_protocol("Mix.admix*",m);
}
}
});
cljs.core.async.admix_STAR_ = (function cljs$core$async$admix_STAR_(m,ch){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$admix_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mix$admix_STAR_$arity$2(m,ch);
} else {
return cljs$core$async$Mix$admix_STAR_$dyn_40091(m,ch);
}
});

var cljs$core$async$Mix$unmix_STAR_$dyn_40092 = (function (m,ch){
var x__5373__auto__ = (((m == null))?null:m);
var m__5374__auto__ = (cljs.core.async.unmix_STAR_[goog.typeOf(x__5373__auto__)]);
if((!((m__5374__auto__ == null)))){
return (m__5374__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5374__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__5374__auto__.call(null,m,ch));
} else {
var m__5372__auto__ = (cljs.core.async.unmix_STAR_["_"]);
if((!((m__5372__auto__ == null)))){
return (m__5372__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5372__auto__.cljs$core$IFn$_invoke$arity$2(m,ch) : m__5372__auto__.call(null,m,ch));
} else {
throw cljs.core.missing_protocol("Mix.unmix*",m);
}
}
});
cljs.core.async.unmix_STAR_ = (function cljs$core$async$unmix_STAR_(m,ch){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$unmix_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mix$unmix_STAR_$arity$2(m,ch);
} else {
return cljs$core$async$Mix$unmix_STAR_$dyn_40092(m,ch);
}
});

var cljs$core$async$Mix$unmix_all_STAR_$dyn_40100 = (function (m){
var x__5373__auto__ = (((m == null))?null:m);
var m__5374__auto__ = (cljs.core.async.unmix_all_STAR_[goog.typeOf(x__5373__auto__)]);
if((!((m__5374__auto__ == null)))){
return (m__5374__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5374__auto__.cljs$core$IFn$_invoke$arity$1(m) : m__5374__auto__.call(null,m));
} else {
var m__5372__auto__ = (cljs.core.async.unmix_all_STAR_["_"]);
if((!((m__5372__auto__ == null)))){
return (m__5372__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5372__auto__.cljs$core$IFn$_invoke$arity$1(m) : m__5372__auto__.call(null,m));
} else {
throw cljs.core.missing_protocol("Mix.unmix-all*",m);
}
}
});
cljs.core.async.unmix_all_STAR_ = (function cljs$core$async$unmix_all_STAR_(m){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$unmix_all_STAR_$arity$1 == null)))))){
return m.cljs$core$async$Mix$unmix_all_STAR_$arity$1(m);
} else {
return cljs$core$async$Mix$unmix_all_STAR_$dyn_40100(m);
}
});

var cljs$core$async$Mix$toggle_STAR_$dyn_40106 = (function (m,state_map){
var x__5373__auto__ = (((m == null))?null:m);
var m__5374__auto__ = (cljs.core.async.toggle_STAR_[goog.typeOf(x__5373__auto__)]);
if((!((m__5374__auto__ == null)))){
return (m__5374__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5374__auto__.cljs$core$IFn$_invoke$arity$2(m,state_map) : m__5374__auto__.call(null,m,state_map));
} else {
var m__5372__auto__ = (cljs.core.async.toggle_STAR_["_"]);
if((!((m__5372__auto__ == null)))){
return (m__5372__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5372__auto__.cljs$core$IFn$_invoke$arity$2(m,state_map) : m__5372__auto__.call(null,m,state_map));
} else {
throw cljs.core.missing_protocol("Mix.toggle*",m);
}
}
});
cljs.core.async.toggle_STAR_ = (function cljs$core$async$toggle_STAR_(m,state_map){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$toggle_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mix$toggle_STAR_$arity$2(m,state_map);
} else {
return cljs$core$async$Mix$toggle_STAR_$dyn_40106(m,state_map);
}
});

var cljs$core$async$Mix$solo_mode_STAR_$dyn_40108 = (function (m,mode){
var x__5373__auto__ = (((m == null))?null:m);
var m__5374__auto__ = (cljs.core.async.solo_mode_STAR_[goog.typeOf(x__5373__auto__)]);
if((!((m__5374__auto__ == null)))){
return (m__5374__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5374__auto__.cljs$core$IFn$_invoke$arity$2(m,mode) : m__5374__auto__.call(null,m,mode));
} else {
var m__5372__auto__ = (cljs.core.async.solo_mode_STAR_["_"]);
if((!((m__5372__auto__ == null)))){
return (m__5372__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5372__auto__.cljs$core$IFn$_invoke$arity$2(m,mode) : m__5372__auto__.call(null,m,mode));
} else {
throw cljs.core.missing_protocol("Mix.solo-mode*",m);
}
}
});
cljs.core.async.solo_mode_STAR_ = (function cljs$core$async$solo_mode_STAR_(m,mode){
if((((!((m == null)))) && ((!((m.cljs$core$async$Mix$solo_mode_STAR_$arity$2 == null)))))){
return m.cljs$core$async$Mix$solo_mode_STAR_$arity$2(m,mode);
} else {
return cljs$core$async$Mix$solo_mode_STAR_$dyn_40108(m,mode);
}
});

cljs.core.async.ioc_alts_BANG_ = (function cljs$core$async$ioc_alts_BANG_(var_args){
var args__5755__auto__ = [];
var len__5749__auto___40110 = arguments.length;
var i__5750__auto___40111 = (0);
while(true){
if((i__5750__auto___40111 < len__5749__auto___40110)){
args__5755__auto__.push((arguments[i__5750__auto___40111]));

var G__40112 = (i__5750__auto___40111 + (1));
i__5750__auto___40111 = G__40112;
continue;
} else {
}
break;
}

var argseq__5756__auto__ = ((((3) < args__5755__auto__.length))?(new cljs.core.IndexedSeq(args__5755__auto__.slice((3)),(0),null)):null);
return cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),argseq__5756__auto__);
});

(cljs.core.async.ioc_alts_BANG_.cljs$core$IFn$_invoke$arity$variadic = (function (state,cont_block,ports,p__38508){
var map__38509 = p__38508;
var map__38509__$1 = cljs.core.__destructure_map(map__38509);
var opts = map__38509__$1;
var statearr_38510_40113 = state;
(statearr_38510_40113[(1)] = cont_block);


var temp__5825__auto__ = cljs.core.async.do_alts((function (val){
var statearr_38512_40114 = state;
(statearr_38512_40114[(2)] = val);


return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state);
}),ports,opts);
if(cljs.core.truth_(temp__5825__auto__)){
var cb = temp__5825__auto__;
var statearr_38514_40115 = state;
(statearr_38514_40115[(2)] = cljs.core.deref(cb));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}));

(cljs.core.async.ioc_alts_BANG_.cljs$lang$maxFixedArity = (3));

/** @this {Function} */
(cljs.core.async.ioc_alts_BANG_.cljs$lang$applyTo = (function (seq38503){
var G__38504 = cljs.core.first(seq38503);
var seq38503__$1 = cljs.core.next(seq38503);
var G__38505 = cljs.core.first(seq38503__$1);
var seq38503__$2 = cljs.core.next(seq38503__$1);
var G__38506 = cljs.core.first(seq38503__$2);
var seq38503__$3 = cljs.core.next(seq38503__$2);
var self__5734__auto__ = this;
return self__5734__auto__.cljs$core$IFn$_invoke$arity$variadic(G__38504,G__38505,G__38506,seq38503__$3);
}));


/**
* @constructor
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mix}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async38518 = (function (change,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,meta38519){
this.change = change;
this.solo_mode = solo_mode;
this.pick = pick;
this.cs = cs;
this.calc_state = calc_state;
this.out = out;
this.changed = changed;
this.solo_modes = solo_modes;
this.attrs = attrs;
this.meta38519 = meta38519;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async38518.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_38520,meta38519__$1){
var self__ = this;
var _38520__$1 = this;
return (new cljs.core.async.t_cljs$core$async38518(self__.change,self__.solo_mode,self__.pick,self__.cs,self__.calc_state,self__.out,self__.changed,self__.solo_modes,self__.attrs,meta38519__$1));
}));

(cljs.core.async.t_cljs$core$async38518.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_38520){
var self__ = this;
var _38520__$1 = this;
return self__.meta38519;
}));

(cljs.core.async.t_cljs$core$async38518.prototype.cljs$core$async$Mux$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async38518.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.out;
}));

(cljs.core.async.t_cljs$core$async38518.prototype.cljs$core$async$Mix$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async38518.prototype.cljs$core$async$Mix$admix_STAR_$arity$2 = (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$4(self__.cs,cljs.core.assoc,ch,cljs.core.PersistentArrayMap.EMPTY);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
}));

(cljs.core.async.t_cljs$core$async38518.prototype.cljs$core$async$Mix$unmix_STAR_$arity$2 = (function (_,ch){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.cs,cljs.core.dissoc,ch);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
}));

(cljs.core.async.t_cljs$core$async38518.prototype.cljs$core$async$Mix$unmix_all_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
cljs.core.reset_BANG_(self__.cs,cljs.core.PersistentArrayMap.EMPTY);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
}));

(cljs.core.async.t_cljs$core$async38518.prototype.cljs$core$async$Mix$toggle_STAR_$arity$2 = (function (_,state_map){
var self__ = this;
var ___$1 = this;
cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.cs,cljs.core.partial.cljs$core$IFn$_invoke$arity$2(cljs.core.merge_with,cljs.core.merge),state_map);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
}));

(cljs.core.async.t_cljs$core$async38518.prototype.cljs$core$async$Mix$solo_mode_STAR_$arity$2 = (function (_,mode){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_((self__.solo_modes.cljs$core$IFn$_invoke$arity$1 ? self__.solo_modes.cljs$core$IFn$_invoke$arity$1(mode) : self__.solo_modes.call(null,mode)))){
} else {
throw (new Error(["Assert failed: ",["mode must be one of: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(self__.solo_modes)].join(''),"\n","(solo-modes mode)"].join('')));
}

cljs.core.reset_BANG_(self__.solo_mode,mode);

return (self__.changed.cljs$core$IFn$_invoke$arity$0 ? self__.changed.cljs$core$IFn$_invoke$arity$0() : self__.changed.call(null));
}));

(cljs.core.async.t_cljs$core$async38518.getBasis = (function (){
return new cljs.core.PersistentVector(null, 10, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"change","change",477485025,null),new cljs.core.Symbol(null,"solo-mode","solo-mode",2031788074,null),new cljs.core.Symbol(null,"pick","pick",1300068175,null),new cljs.core.Symbol(null,"cs","cs",-117024463,null),new cljs.core.Symbol(null,"calc-state","calc-state",-349968968,null),new cljs.core.Symbol(null,"out","out",729986010,null),new cljs.core.Symbol(null,"changed","changed",-2083710852,null),new cljs.core.Symbol(null,"solo-modes","solo-modes",882180540,null),new cljs.core.Symbol(null,"attrs","attrs",-450137186,null),new cljs.core.Symbol(null,"meta38519","meta38519",97249192,null)], null);
}));

(cljs.core.async.t_cljs$core$async38518.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async38518.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async38518");

(cljs.core.async.t_cljs$core$async38518.cljs$lang$ctorPrWriter = (function (this__5310__auto__,writer__5311__auto__,opt__5312__auto__){
return cljs.core._write(writer__5311__auto__,"cljs.core.async/t_cljs$core$async38518");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async38518.
 */
cljs.core.async.__GT_t_cljs$core$async38518 = (function cljs$core$async$__GT_t_cljs$core$async38518(change,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,meta38519){
return (new cljs.core.async.t_cljs$core$async38518(change,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,meta38519));
});


/**
 * Creates and returns a mix of one or more input channels which will
 *   be put on the supplied out channel. Input sources can be added to
 *   the mix with 'admix', and removed with 'unmix'. A mix supports
 *   soloing, muting and pausing multiple inputs atomically using
 *   'toggle', and can solo using either muting or pausing as determined
 *   by 'solo-mode'.
 * 
 *   Each channel can have zero or more boolean modes set via 'toggle':
 * 
 *   :solo - when true, only this (ond other soloed) channel(s) will appear
 *        in the mix output channel. :mute and :pause states of soloed
 *        channels are ignored. If solo-mode is :mute, non-soloed
 *        channels are muted, if :pause, non-soloed channels are
 *        paused.
 * 
 *   :mute - muted channels will have their contents consumed but not included in the mix
 *   :pause - paused channels will not have their contents consumed (and thus also not included in the mix)
 */
cljs.core.async.mix = (function cljs$core$async$mix(out){
var cs = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var solo_modes = new cljs.core.PersistentHashSet(null, new cljs.core.PersistentArrayMap(null, 2, [new cljs.core.Keyword(null,"pause","pause",-2095325672),null,new cljs.core.Keyword(null,"mute","mute",1151223646),null], null), null);
var attrs = cljs.core.conj.cljs$core$IFn$_invoke$arity$2(solo_modes,new cljs.core.Keyword(null,"solo","solo",-316350075));
var solo_mode = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"mute","mute",1151223646));
var change = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(cljs.core.async.sliding_buffer((1)));
var changed = (function (){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(change,true);
});
var pick = (function (attr,chs){
return cljs.core.reduce_kv((function (ret,c,v){
if(cljs.core.truth_((attr.cljs$core$IFn$_invoke$arity$1 ? attr.cljs$core$IFn$_invoke$arity$1(v) : attr.call(null,v)))){
return cljs.core.conj.cljs$core$IFn$_invoke$arity$2(ret,c);
} else {
return ret;
}
}),cljs.core.PersistentHashSet.EMPTY,chs);
});
var calc_state = (function (){
var chs = cljs.core.deref(cs);
var mode = cljs.core.deref(solo_mode);
var solos = pick(new cljs.core.Keyword(null,"solo","solo",-316350075),chs);
var pauses = pick(new cljs.core.Keyword(null,"pause","pause",-2095325672),chs);
return new cljs.core.PersistentArrayMap(null, 3, [new cljs.core.Keyword(null,"solos","solos",1441458643),solos,new cljs.core.Keyword(null,"mutes","mutes",1068806309),pick(new cljs.core.Keyword(null,"mute","mute",1151223646),chs),new cljs.core.Keyword(null,"reads","reads",-1215067361),cljs.core.conj.cljs$core$IFn$_invoke$arity$2(((((cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(mode,new cljs.core.Keyword(null,"pause","pause",-2095325672))) && (cljs.core.seq(solos))))?cljs.core.vec(solos):cljs.core.vec(cljs.core.remove.cljs$core$IFn$_invoke$arity$2(pauses,cljs.core.keys(chs)))),change)], null);
});
var m = (new cljs.core.async.t_cljs$core$async38518(change,solo_mode,pick,cs,calc_state,out,changed,solo_modes,attrs,cljs.core.PersistentArrayMap.EMPTY));
var c__37424__auto___40122 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__37425__auto__ = (function (){var switch__36913__auto__ = (function (state_38601){
var state_val_38602 = (state_38601[(1)]);
if((state_val_38602 === (7))){
var inst_38558 = (state_38601[(2)]);
var state_38601__$1 = state_38601;
if(cljs.core.truth_(inst_38558)){
var statearr_38603_40123 = state_38601__$1;
(statearr_38603_40123[(1)] = (8));

} else {
var statearr_38604_40124 = state_38601__$1;
(statearr_38604_40124[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38602 === (20))){
var inst_38550 = (state_38601[(7)]);
var state_38601__$1 = state_38601;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_38601__$1,(23),out,inst_38550);
} else {
if((state_val_38602 === (1))){
var inst_38532 = calc_state();
var inst_38533 = cljs.core.__destructure_map(inst_38532);
var inst_38534 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_38533,new cljs.core.Keyword(null,"solos","solos",1441458643));
var inst_38535 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_38533,new cljs.core.Keyword(null,"mutes","mutes",1068806309));
var inst_38536 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_38533,new cljs.core.Keyword(null,"reads","reads",-1215067361));
var inst_38537 = inst_38532;
var state_38601__$1 = (function (){var statearr_38605 = state_38601;
(statearr_38605[(8)] = inst_38534);

(statearr_38605[(9)] = inst_38535);

(statearr_38605[(10)] = inst_38536);

(statearr_38605[(11)] = inst_38537);

return statearr_38605;
})();
var statearr_38606_40127 = state_38601__$1;
(statearr_38606_40127[(2)] = null);

(statearr_38606_40127[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38602 === (24))){
var inst_38540 = (state_38601[(12)]);
var inst_38537 = inst_38540;
var state_38601__$1 = (function (){var statearr_38607 = state_38601;
(statearr_38607[(11)] = inst_38537);

return statearr_38607;
})();
var statearr_38608_40130 = state_38601__$1;
(statearr_38608_40130[(2)] = null);

(statearr_38608_40130[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38602 === (4))){
var inst_38550 = (state_38601[(7)]);
var inst_38552 = (state_38601[(13)]);
var inst_38548 = (state_38601[(2)]);
var inst_38550__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_38548,(0),null);
var inst_38551 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_38548,(1),null);
var inst_38552__$1 = (inst_38550__$1 == null);
var state_38601__$1 = (function (){var statearr_38609 = state_38601;
(statearr_38609[(7)] = inst_38550__$1);

(statearr_38609[(14)] = inst_38551);

(statearr_38609[(13)] = inst_38552__$1);

return statearr_38609;
})();
if(cljs.core.truth_(inst_38552__$1)){
var statearr_38610_40132 = state_38601__$1;
(statearr_38610_40132[(1)] = (5));

} else {
var statearr_38611_40133 = state_38601__$1;
(statearr_38611_40133[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38602 === (15))){
var inst_38541 = (state_38601[(15)]);
var inst_38572 = (state_38601[(16)]);
var inst_38572__$1 = cljs.core.empty_QMARK_(inst_38541);
var state_38601__$1 = (function (){var statearr_38612 = state_38601;
(statearr_38612[(16)] = inst_38572__$1);

return statearr_38612;
})();
if(inst_38572__$1){
var statearr_38613_40136 = state_38601__$1;
(statearr_38613_40136[(1)] = (17));

} else {
var statearr_38614_40137 = state_38601__$1;
(statearr_38614_40137[(1)] = (18));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38602 === (21))){
var inst_38540 = (state_38601[(12)]);
var inst_38537 = inst_38540;
var state_38601__$1 = (function (){var statearr_38615 = state_38601;
(statearr_38615[(11)] = inst_38537);

return statearr_38615;
})();
var statearr_38616_40138 = state_38601__$1;
(statearr_38616_40138[(2)] = null);

(statearr_38616_40138[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38602 === (13))){
var inst_38565 = (state_38601[(2)]);
var inst_38566 = calc_state();
var inst_38537 = inst_38566;
var state_38601__$1 = (function (){var statearr_38617 = state_38601;
(statearr_38617[(17)] = inst_38565);

(statearr_38617[(11)] = inst_38537);

return statearr_38617;
})();
var statearr_38618_40139 = state_38601__$1;
(statearr_38618_40139[(2)] = null);

(statearr_38618_40139[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38602 === (22))){
var inst_38592 = (state_38601[(2)]);
var state_38601__$1 = state_38601;
var statearr_38619_40141 = state_38601__$1;
(statearr_38619_40141[(2)] = inst_38592);

(statearr_38619_40141[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38602 === (6))){
var inst_38551 = (state_38601[(14)]);
var inst_38556 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_38551,change);
var state_38601__$1 = state_38601;
var statearr_38620_40142 = state_38601__$1;
(statearr_38620_40142[(2)] = inst_38556);

(statearr_38620_40142[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38602 === (25))){
var state_38601__$1 = state_38601;
var statearr_38621_40143 = state_38601__$1;
(statearr_38621_40143[(2)] = null);

(statearr_38621_40143[(1)] = (26));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38602 === (17))){
var inst_38542 = (state_38601[(18)]);
var inst_38551 = (state_38601[(14)]);
var inst_38574 = (inst_38542.cljs$core$IFn$_invoke$arity$1 ? inst_38542.cljs$core$IFn$_invoke$arity$1(inst_38551) : inst_38542.call(null,inst_38551));
var inst_38575 = cljs.core.not(inst_38574);
var state_38601__$1 = state_38601;
var statearr_38622_40144 = state_38601__$1;
(statearr_38622_40144[(2)] = inst_38575);

(statearr_38622_40144[(1)] = (19));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38602 === (3))){
var inst_38596 = (state_38601[(2)]);
var state_38601__$1 = state_38601;
return cljs.core.async.impl.ioc_helpers.return_chan(state_38601__$1,inst_38596);
} else {
if((state_val_38602 === (12))){
var state_38601__$1 = state_38601;
var statearr_38623_40145 = state_38601__$1;
(statearr_38623_40145[(2)] = null);

(statearr_38623_40145[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38602 === (2))){
var inst_38537 = (state_38601[(11)]);
var inst_38540 = (state_38601[(12)]);
var inst_38540__$1 = cljs.core.__destructure_map(inst_38537);
var inst_38541 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_38540__$1,new cljs.core.Keyword(null,"solos","solos",1441458643));
var inst_38542 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_38540__$1,new cljs.core.Keyword(null,"mutes","mutes",1068806309));
var inst_38543 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_38540__$1,new cljs.core.Keyword(null,"reads","reads",-1215067361));
var state_38601__$1 = (function (){var statearr_38624 = state_38601;
(statearr_38624[(12)] = inst_38540__$1);

(statearr_38624[(15)] = inst_38541);

(statearr_38624[(18)] = inst_38542);

return statearr_38624;
})();
return cljs.core.async.ioc_alts_BANG_(state_38601__$1,(4),inst_38543);
} else {
if((state_val_38602 === (23))){
var inst_38583 = (state_38601[(2)]);
var state_38601__$1 = state_38601;
if(cljs.core.truth_(inst_38583)){
var statearr_38625_40146 = state_38601__$1;
(statearr_38625_40146[(1)] = (24));

} else {
var statearr_38626_40147 = state_38601__$1;
(statearr_38626_40147[(1)] = (25));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38602 === (19))){
var inst_38578 = (state_38601[(2)]);
var state_38601__$1 = state_38601;
var statearr_38627_40148 = state_38601__$1;
(statearr_38627_40148[(2)] = inst_38578);

(statearr_38627_40148[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38602 === (11))){
var inst_38551 = (state_38601[(14)]);
var inst_38562 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(cs,cljs.core.dissoc,inst_38551);
var state_38601__$1 = state_38601;
var statearr_38628_40149 = state_38601__$1;
(statearr_38628_40149[(2)] = inst_38562);

(statearr_38628_40149[(1)] = (13));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38602 === (9))){
var inst_38541 = (state_38601[(15)]);
var inst_38551 = (state_38601[(14)]);
var inst_38569 = (state_38601[(19)]);
var inst_38569__$1 = (inst_38541.cljs$core$IFn$_invoke$arity$1 ? inst_38541.cljs$core$IFn$_invoke$arity$1(inst_38551) : inst_38541.call(null,inst_38551));
var state_38601__$1 = (function (){var statearr_38629 = state_38601;
(statearr_38629[(19)] = inst_38569__$1);

return statearr_38629;
})();
if(cljs.core.truth_(inst_38569__$1)){
var statearr_38630_40156 = state_38601__$1;
(statearr_38630_40156[(1)] = (14));

} else {
var statearr_38631_40157 = state_38601__$1;
(statearr_38631_40157[(1)] = (15));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38602 === (5))){
var inst_38552 = (state_38601[(13)]);
var state_38601__$1 = state_38601;
var statearr_38632_40158 = state_38601__$1;
(statearr_38632_40158[(2)] = inst_38552);

(statearr_38632_40158[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38602 === (14))){
var inst_38569 = (state_38601[(19)]);
var state_38601__$1 = state_38601;
var statearr_38633_40159 = state_38601__$1;
(statearr_38633_40159[(2)] = inst_38569);

(statearr_38633_40159[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38602 === (26))){
var inst_38588 = (state_38601[(2)]);
var state_38601__$1 = state_38601;
var statearr_38634_40160 = state_38601__$1;
(statearr_38634_40160[(2)] = inst_38588);

(statearr_38634_40160[(1)] = (22));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38602 === (16))){
var inst_38580 = (state_38601[(2)]);
var state_38601__$1 = state_38601;
if(cljs.core.truth_(inst_38580)){
var statearr_38635_40161 = state_38601__$1;
(statearr_38635_40161[(1)] = (20));

} else {
var statearr_38636_40162 = state_38601__$1;
(statearr_38636_40162[(1)] = (21));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38602 === (10))){
var inst_38594 = (state_38601[(2)]);
var state_38601__$1 = state_38601;
var statearr_38637_40163 = state_38601__$1;
(statearr_38637_40163[(2)] = inst_38594);

(statearr_38637_40163[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38602 === (18))){
var inst_38572 = (state_38601[(16)]);
var state_38601__$1 = state_38601;
var statearr_38638_40164 = state_38601__$1;
(statearr_38638_40164[(2)] = inst_38572);

(statearr_38638_40164[(1)] = (19));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38602 === (8))){
var inst_38550 = (state_38601[(7)]);
var inst_38560 = (inst_38550 == null);
var state_38601__$1 = state_38601;
if(cljs.core.truth_(inst_38560)){
var statearr_38640_40165 = state_38601__$1;
(statearr_38640_40165[(1)] = (11));

} else {
var statearr_38641_40166 = state_38601__$1;
(statearr_38641_40166[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$mix_$_state_machine__36914__auto__ = null;
var cljs$core$async$mix_$_state_machine__36914__auto____0 = (function (){
var statearr_38642 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_38642[(0)] = cljs$core$async$mix_$_state_machine__36914__auto__);

(statearr_38642[(1)] = (1));

return statearr_38642;
});
var cljs$core$async$mix_$_state_machine__36914__auto____1 = (function (state_38601){
while(true){
var ret_value__36915__auto__ = (function (){try{while(true){
var result__36916__auto__ = switch__36913__auto__(state_38601);
if(cljs.core.keyword_identical_QMARK_(result__36916__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__36916__auto__;
}
break;
}
}catch (e38643){var ex__36917__auto__ = e38643;
var statearr_38644_40167 = state_38601;
(statearr_38644_40167[(2)] = ex__36917__auto__);


if(cljs.core.seq((state_38601[(4)]))){
var statearr_38645_40169 = state_38601;
(statearr_38645_40169[(1)] = cljs.core.first((state_38601[(4)])));

} else {
throw ex__36917__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__36915__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__40170 = state_38601;
state_38601 = G__40170;
continue;
} else {
return ret_value__36915__auto__;
}
break;
}
});
cljs$core$async$mix_$_state_machine__36914__auto__ = function(state_38601){
switch(arguments.length){
case 0:
return cljs$core$async$mix_$_state_machine__36914__auto____0.call(this);
case 1:
return cljs$core$async$mix_$_state_machine__36914__auto____1.call(this,state_38601);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mix_$_state_machine__36914__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mix_$_state_machine__36914__auto____0;
cljs$core$async$mix_$_state_machine__36914__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mix_$_state_machine__36914__auto____1;
return cljs$core$async$mix_$_state_machine__36914__auto__;
})()
})();
var state__37426__auto__ = (function (){var statearr_38646 = f__37425__auto__();
(statearr_38646[(6)] = c__37424__auto___40122);

return statearr_38646;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__37426__auto__);
}));


return m;
});
/**
 * Adds ch as an input to the mix
 */
cljs.core.async.admix = (function cljs$core$async$admix(mix,ch){
return cljs.core.async.admix_STAR_(mix,ch);
});
/**
 * Removes ch as an input to the mix
 */
cljs.core.async.unmix = (function cljs$core$async$unmix(mix,ch){
return cljs.core.async.unmix_STAR_(mix,ch);
});
/**
 * removes all inputs from the mix
 */
cljs.core.async.unmix_all = (function cljs$core$async$unmix_all(mix){
return cljs.core.async.unmix_all_STAR_(mix);
});
/**
 * Atomically sets the state(s) of one or more channels in a mix. The
 *   state map is a map of channels -> channel-state-map. A
 *   channel-state-map is a map of attrs -> boolean, where attr is one or
 *   more of :mute, :pause or :solo. Any states supplied are merged with
 *   the current state.
 * 
 *   Note that channels can be added to a mix via toggle, which can be
 *   used to add channels in a particular (e.g. paused) state.
 */
cljs.core.async.toggle = (function cljs$core$async$toggle(mix,state_map){
return cljs.core.async.toggle_STAR_(mix,state_map);
});
/**
 * Sets the solo mode of the mix. mode must be one of :mute or :pause
 */
cljs.core.async.solo_mode = (function cljs$core$async$solo_mode(mix,mode){
return cljs.core.async.solo_mode_STAR_(mix,mode);
});

/**
 * @interface
 */
cljs.core.async.Pub = function(){};

var cljs$core$async$Pub$sub_STAR_$dyn_40179 = (function (p,v,ch,close_QMARK_){
var x__5373__auto__ = (((p == null))?null:p);
var m__5374__auto__ = (cljs.core.async.sub_STAR_[goog.typeOf(x__5373__auto__)]);
if((!((m__5374__auto__ == null)))){
return (m__5374__auto__.cljs$core$IFn$_invoke$arity$4 ? m__5374__auto__.cljs$core$IFn$_invoke$arity$4(p,v,ch,close_QMARK_) : m__5374__auto__.call(null,p,v,ch,close_QMARK_));
} else {
var m__5372__auto__ = (cljs.core.async.sub_STAR_["_"]);
if((!((m__5372__auto__ == null)))){
return (m__5372__auto__.cljs$core$IFn$_invoke$arity$4 ? m__5372__auto__.cljs$core$IFn$_invoke$arity$4(p,v,ch,close_QMARK_) : m__5372__auto__.call(null,p,v,ch,close_QMARK_));
} else {
throw cljs.core.missing_protocol("Pub.sub*",p);
}
}
});
cljs.core.async.sub_STAR_ = (function cljs$core$async$sub_STAR_(p,v,ch,close_QMARK_){
if((((!((p == null)))) && ((!((p.cljs$core$async$Pub$sub_STAR_$arity$4 == null)))))){
return p.cljs$core$async$Pub$sub_STAR_$arity$4(p,v,ch,close_QMARK_);
} else {
return cljs$core$async$Pub$sub_STAR_$dyn_40179(p,v,ch,close_QMARK_);
}
});

var cljs$core$async$Pub$unsub_STAR_$dyn_40184 = (function (p,v,ch){
var x__5373__auto__ = (((p == null))?null:p);
var m__5374__auto__ = (cljs.core.async.unsub_STAR_[goog.typeOf(x__5373__auto__)]);
if((!((m__5374__auto__ == null)))){
return (m__5374__auto__.cljs$core$IFn$_invoke$arity$3 ? m__5374__auto__.cljs$core$IFn$_invoke$arity$3(p,v,ch) : m__5374__auto__.call(null,p,v,ch));
} else {
var m__5372__auto__ = (cljs.core.async.unsub_STAR_["_"]);
if((!((m__5372__auto__ == null)))){
return (m__5372__auto__.cljs$core$IFn$_invoke$arity$3 ? m__5372__auto__.cljs$core$IFn$_invoke$arity$3(p,v,ch) : m__5372__auto__.call(null,p,v,ch));
} else {
throw cljs.core.missing_protocol("Pub.unsub*",p);
}
}
});
cljs.core.async.unsub_STAR_ = (function cljs$core$async$unsub_STAR_(p,v,ch){
if((((!((p == null)))) && ((!((p.cljs$core$async$Pub$unsub_STAR_$arity$3 == null)))))){
return p.cljs$core$async$Pub$unsub_STAR_$arity$3(p,v,ch);
} else {
return cljs$core$async$Pub$unsub_STAR_$dyn_40184(p,v,ch);
}
});

var cljs$core$async$Pub$unsub_all_STAR_$dyn_40188 = (function() {
var G__40189 = null;
var G__40189__1 = (function (p){
var x__5373__auto__ = (((p == null))?null:p);
var m__5374__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__5373__auto__)]);
if((!((m__5374__auto__ == null)))){
return (m__5374__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5374__auto__.cljs$core$IFn$_invoke$arity$1(p) : m__5374__auto__.call(null,p));
} else {
var m__5372__auto__ = (cljs.core.async.unsub_all_STAR_["_"]);
if((!((m__5372__auto__ == null)))){
return (m__5372__auto__.cljs$core$IFn$_invoke$arity$1 ? m__5372__auto__.cljs$core$IFn$_invoke$arity$1(p) : m__5372__auto__.call(null,p));
} else {
throw cljs.core.missing_protocol("Pub.unsub-all*",p);
}
}
});
var G__40189__2 = (function (p,v){
var x__5373__auto__ = (((p == null))?null:p);
var m__5374__auto__ = (cljs.core.async.unsub_all_STAR_[goog.typeOf(x__5373__auto__)]);
if((!((m__5374__auto__ == null)))){
return (m__5374__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5374__auto__.cljs$core$IFn$_invoke$arity$2(p,v) : m__5374__auto__.call(null,p,v));
} else {
var m__5372__auto__ = (cljs.core.async.unsub_all_STAR_["_"]);
if((!((m__5372__auto__ == null)))){
return (m__5372__auto__.cljs$core$IFn$_invoke$arity$2 ? m__5372__auto__.cljs$core$IFn$_invoke$arity$2(p,v) : m__5372__auto__.call(null,p,v));
} else {
throw cljs.core.missing_protocol("Pub.unsub-all*",p);
}
}
});
G__40189 = function(p,v){
switch(arguments.length){
case 1:
return G__40189__1.call(this,p);
case 2:
return G__40189__2.call(this,p,v);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
G__40189.cljs$core$IFn$_invoke$arity$1 = G__40189__1;
G__40189.cljs$core$IFn$_invoke$arity$2 = G__40189__2;
return G__40189;
})()
;
cljs.core.async.unsub_all_STAR_ = (function cljs$core$async$unsub_all_STAR_(var_args){
var G__38663 = arguments.length;
switch (G__38663) {
case 1:
return cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$1 = (function (p){
if((((!((p == null)))) && ((!((p.cljs$core$async$Pub$unsub_all_STAR_$arity$1 == null)))))){
return p.cljs$core$async$Pub$unsub_all_STAR_$arity$1(p);
} else {
return cljs$core$async$Pub$unsub_all_STAR_$dyn_40188(p);
}
}));

(cljs.core.async.unsub_all_STAR_.cljs$core$IFn$_invoke$arity$2 = (function (p,v){
if((((!((p == null)))) && ((!((p.cljs$core$async$Pub$unsub_all_STAR_$arity$2 == null)))))){
return p.cljs$core$async$Pub$unsub_all_STAR_$arity$2(p,v);
} else {
return cljs$core$async$Pub$unsub_all_STAR_$dyn_40188(p,v);
}
}));

(cljs.core.async.unsub_all_STAR_.cljs$lang$maxFixedArity = 2);



/**
* @constructor
 * @implements {cljs.core.async.Pub}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.async.Mux}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async38701 = (function (ch,topic_fn,buf_fn,mults,ensure_mult,meta38702){
this.ch = ch;
this.topic_fn = topic_fn;
this.buf_fn = buf_fn;
this.mults = mults;
this.ensure_mult = ensure_mult;
this.meta38702 = meta38702;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async38701.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_38703,meta38702__$1){
var self__ = this;
var _38703__$1 = this;
return (new cljs.core.async.t_cljs$core$async38701(self__.ch,self__.topic_fn,self__.buf_fn,self__.mults,self__.ensure_mult,meta38702__$1));
}));

(cljs.core.async.t_cljs$core$async38701.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_38703){
var self__ = this;
var _38703__$1 = this;
return self__.meta38702;
}));

(cljs.core.async.t_cljs$core$async38701.prototype.cljs$core$async$Mux$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async38701.prototype.cljs$core$async$Mux$muxch_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return self__.ch;
}));

(cljs.core.async.t_cljs$core$async38701.prototype.cljs$core$async$Pub$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async38701.prototype.cljs$core$async$Pub$sub_STAR_$arity$4 = (function (p,topic,ch__$1,close_QMARK_){
var self__ = this;
var p__$1 = this;
var m = (self__.ensure_mult.cljs$core$IFn$_invoke$arity$1 ? self__.ensure_mult.cljs$core$IFn$_invoke$arity$1(topic) : self__.ensure_mult.call(null,topic));
return cljs.core.async.tap.cljs$core$IFn$_invoke$arity$3(m,ch__$1,close_QMARK_);
}));

(cljs.core.async.t_cljs$core$async38701.prototype.cljs$core$async$Pub$unsub_STAR_$arity$3 = (function (p,topic,ch__$1){
var self__ = this;
var p__$1 = this;
var temp__5825__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(self__.mults),topic);
if(cljs.core.truth_(temp__5825__auto__)){
var m = temp__5825__auto__;
return cljs.core.async.untap(m,ch__$1);
} else {
return null;
}
}));

(cljs.core.async.t_cljs$core$async38701.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.reset_BANG_(self__.mults,cljs.core.PersistentArrayMap.EMPTY);
}));

(cljs.core.async.t_cljs$core$async38701.prototype.cljs$core$async$Pub$unsub_all_STAR_$arity$2 = (function (_,topic){
var self__ = this;
var ___$1 = this;
return cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(self__.mults,cljs.core.dissoc,topic);
}));

(cljs.core.async.t_cljs$core$async38701.getBasis = (function (){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"topic-fn","topic-fn",-862449736,null),new cljs.core.Symbol(null,"buf-fn","buf-fn",-1200281591,null),new cljs.core.Symbol(null,"mults","mults",-461114485,null),new cljs.core.Symbol(null,"ensure-mult","ensure-mult",1796584816,null),new cljs.core.Symbol(null,"meta38702","meta38702",42956075,null)], null);
}));

(cljs.core.async.t_cljs$core$async38701.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async38701.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async38701");

(cljs.core.async.t_cljs$core$async38701.cljs$lang$ctorPrWriter = (function (this__5310__auto__,writer__5311__auto__,opt__5312__auto__){
return cljs.core._write(writer__5311__auto__,"cljs.core.async/t_cljs$core$async38701");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async38701.
 */
cljs.core.async.__GT_t_cljs$core$async38701 = (function cljs$core$async$__GT_t_cljs$core$async38701(ch,topic_fn,buf_fn,mults,ensure_mult,meta38702){
return (new cljs.core.async.t_cljs$core$async38701(ch,topic_fn,buf_fn,mults,ensure_mult,meta38702));
});


/**
 * Creates and returns a pub(lication) of the supplied channel,
 *   partitioned into topics by the topic-fn. topic-fn will be applied to
 *   each value on the channel and the result will determine the 'topic'
 *   on which that value will be put. Channels can be subscribed to
 *   receive copies of topics using 'sub', and unsubscribed using
 *   'unsub'. Each topic will be handled by an internal mult on a
 *   dedicated channel. By default these internal channels are
 *   unbuffered, but a buf-fn can be supplied which, given a topic,
 *   creates a buffer with desired properties.
 * 
 *   Each item is distributed to all subs in parallel and synchronously,
 *   i.e. each sub must accept before the next item is distributed. Use
 *   buffering/windowing to prevent slow subs from holding up the pub.
 * 
 *   Items received when there are no matching subs get dropped.
 * 
 *   Note that if buf-fns are used then each topic is handled
 *   asynchronously, i.e. if a channel is subscribed to more than one
 *   topic it should not expect them to be interleaved identically with
 *   the source.
 */
cljs.core.async.pub = (function cljs$core$async$pub(var_args){
var G__38692 = arguments.length;
switch (G__38692) {
case 2:
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.pub.cljs$core$IFn$_invoke$arity$2 = (function (ch,topic_fn){
return cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3(ch,topic_fn,cljs.core.constantly(null));
}));

(cljs.core.async.pub.cljs$core$IFn$_invoke$arity$3 = (function (ch,topic_fn,buf_fn){
var mults = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(cljs.core.PersistentArrayMap.EMPTY);
var ensure_mult = (function (topic){
var or__5025__auto__ = cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.deref(mults),topic);
if(cljs.core.truth_(or__5025__auto__)){
return or__5025__auto__;
} else {
return cljs.core.get.cljs$core$IFn$_invoke$arity$2(cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(mults,(function (p1__38676_SHARP_){
if(cljs.core.truth_((p1__38676_SHARP_.cljs$core$IFn$_invoke$arity$1 ? p1__38676_SHARP_.cljs$core$IFn$_invoke$arity$1(topic) : p1__38676_SHARP_.call(null,topic)))){
return p1__38676_SHARP_;
} else {
return cljs.core.assoc.cljs$core$IFn$_invoke$arity$3(p1__38676_SHARP_,topic,cljs.core.async.mult(cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((buf_fn.cljs$core$IFn$_invoke$arity$1 ? buf_fn.cljs$core$IFn$_invoke$arity$1(topic) : buf_fn.call(null,topic)))));
}
})),topic);
}
});
var p = (new cljs.core.async.t_cljs$core$async38701(ch,topic_fn,buf_fn,mults,ensure_mult,cljs.core.PersistentArrayMap.EMPTY));
var c__37424__auto___40204 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__37425__auto__ = (function (){var switch__36913__auto__ = (function (state_38779){
var state_val_38780 = (state_38779[(1)]);
if((state_val_38780 === (7))){
var inst_38775 = (state_38779[(2)]);
var state_38779__$1 = state_38779;
var statearr_38781_40206 = state_38779__$1;
(statearr_38781_40206[(2)] = inst_38775);

(statearr_38781_40206[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38780 === (20))){
var state_38779__$1 = state_38779;
var statearr_38782_40207 = state_38779__$1;
(statearr_38782_40207[(2)] = null);

(statearr_38782_40207[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38780 === (1))){
var state_38779__$1 = state_38779;
var statearr_38783_40209 = state_38779__$1;
(statearr_38783_40209[(2)] = null);

(statearr_38783_40209[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38780 === (24))){
var inst_38758 = (state_38779[(7)]);
var inst_38767 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$3(mults,cljs.core.dissoc,inst_38758);
var state_38779__$1 = state_38779;
var statearr_38784_40210 = state_38779__$1;
(statearr_38784_40210[(2)] = inst_38767);

(statearr_38784_40210[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38780 === (4))){
var inst_38710 = (state_38779[(8)]);
var inst_38710__$1 = (state_38779[(2)]);
var inst_38711 = (inst_38710__$1 == null);
var state_38779__$1 = (function (){var statearr_38785 = state_38779;
(statearr_38785[(8)] = inst_38710__$1);

return statearr_38785;
})();
if(cljs.core.truth_(inst_38711)){
var statearr_38786_40211 = state_38779__$1;
(statearr_38786_40211[(1)] = (5));

} else {
var statearr_38787_40212 = state_38779__$1;
(statearr_38787_40212[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38780 === (15))){
var inst_38752 = (state_38779[(2)]);
var state_38779__$1 = state_38779;
var statearr_38788_40214 = state_38779__$1;
(statearr_38788_40214[(2)] = inst_38752);

(statearr_38788_40214[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38780 === (21))){
var inst_38772 = (state_38779[(2)]);
var state_38779__$1 = (function (){var statearr_38789 = state_38779;
(statearr_38789[(9)] = inst_38772);

return statearr_38789;
})();
var statearr_38790_40215 = state_38779__$1;
(statearr_38790_40215[(2)] = null);

(statearr_38790_40215[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38780 === (13))){
var inst_38734 = (state_38779[(10)]);
var inst_38736 = cljs.core.chunked_seq_QMARK_(inst_38734);
var state_38779__$1 = state_38779;
if(inst_38736){
var statearr_38791_40216 = state_38779__$1;
(statearr_38791_40216[(1)] = (16));

} else {
var statearr_38792_40217 = state_38779__$1;
(statearr_38792_40217[(1)] = (17));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38780 === (22))){
var inst_38764 = (state_38779[(2)]);
var state_38779__$1 = state_38779;
if(cljs.core.truth_(inst_38764)){
var statearr_38796_40219 = state_38779__$1;
(statearr_38796_40219[(1)] = (23));

} else {
var statearr_38799_40220 = state_38779__$1;
(statearr_38799_40220[(1)] = (24));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38780 === (6))){
var inst_38710 = (state_38779[(8)]);
var inst_38758 = (state_38779[(7)]);
var inst_38760 = (state_38779[(11)]);
var inst_38758__$1 = (topic_fn.cljs$core$IFn$_invoke$arity$1 ? topic_fn.cljs$core$IFn$_invoke$arity$1(inst_38710) : topic_fn.call(null,inst_38710));
var inst_38759 = cljs.core.deref(mults);
var inst_38760__$1 = cljs.core.get.cljs$core$IFn$_invoke$arity$2(inst_38759,inst_38758__$1);
var state_38779__$1 = (function (){var statearr_38803 = state_38779;
(statearr_38803[(7)] = inst_38758__$1);

(statearr_38803[(11)] = inst_38760__$1);

return statearr_38803;
})();
if(cljs.core.truth_(inst_38760__$1)){
var statearr_38807_40225 = state_38779__$1;
(statearr_38807_40225[(1)] = (19));

} else {
var statearr_38808_40227 = state_38779__$1;
(statearr_38808_40227[(1)] = (20));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38780 === (25))){
var inst_38769 = (state_38779[(2)]);
var state_38779__$1 = state_38779;
var statearr_38809_40228 = state_38779__$1;
(statearr_38809_40228[(2)] = inst_38769);

(statearr_38809_40228[(1)] = (21));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38780 === (17))){
var inst_38734 = (state_38779[(10)]);
var inst_38743 = cljs.core.first(inst_38734);
var inst_38744 = cljs.core.async.muxch_STAR_(inst_38743);
var inst_38745 = cljs.core.async.close_BANG_(inst_38744);
var inst_38746 = cljs.core.next(inst_38734);
var inst_38720 = inst_38746;
var inst_38721 = null;
var inst_38722 = (0);
var inst_38723 = (0);
var state_38779__$1 = (function (){var statearr_38810 = state_38779;
(statearr_38810[(12)] = inst_38745);

(statearr_38810[(13)] = inst_38720);

(statearr_38810[(14)] = inst_38721);

(statearr_38810[(15)] = inst_38722);

(statearr_38810[(16)] = inst_38723);

return statearr_38810;
})();
var statearr_38811_40229 = state_38779__$1;
(statearr_38811_40229[(2)] = null);

(statearr_38811_40229[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38780 === (3))){
var inst_38777 = (state_38779[(2)]);
var state_38779__$1 = state_38779;
return cljs.core.async.impl.ioc_helpers.return_chan(state_38779__$1,inst_38777);
} else {
if((state_val_38780 === (12))){
var inst_38754 = (state_38779[(2)]);
var state_38779__$1 = state_38779;
var statearr_38812_40230 = state_38779__$1;
(statearr_38812_40230[(2)] = inst_38754);

(statearr_38812_40230[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38780 === (2))){
var state_38779__$1 = state_38779;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_38779__$1,(4),ch);
} else {
if((state_val_38780 === (23))){
var state_38779__$1 = state_38779;
var statearr_38813_40231 = state_38779__$1;
(statearr_38813_40231[(2)] = null);

(statearr_38813_40231[(1)] = (25));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38780 === (19))){
var inst_38760 = (state_38779[(11)]);
var inst_38710 = (state_38779[(8)]);
var inst_38762 = cljs.core.async.muxch_STAR_(inst_38760);
var state_38779__$1 = state_38779;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_38779__$1,(22),inst_38762,inst_38710);
} else {
if((state_val_38780 === (11))){
var inst_38720 = (state_38779[(13)]);
var inst_38734 = (state_38779[(10)]);
var inst_38734__$1 = cljs.core.seq(inst_38720);
var state_38779__$1 = (function (){var statearr_38814 = state_38779;
(statearr_38814[(10)] = inst_38734__$1);

return statearr_38814;
})();
if(inst_38734__$1){
var statearr_38815_40235 = state_38779__$1;
(statearr_38815_40235[(1)] = (13));

} else {
var statearr_38816_40236 = state_38779__$1;
(statearr_38816_40236[(1)] = (14));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38780 === (9))){
var inst_38756 = (state_38779[(2)]);
var state_38779__$1 = state_38779;
var statearr_38817_40237 = state_38779__$1;
(statearr_38817_40237[(2)] = inst_38756);

(statearr_38817_40237[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38780 === (5))){
var inst_38717 = cljs.core.deref(mults);
var inst_38718 = cljs.core.vals(inst_38717);
var inst_38719 = cljs.core.seq(inst_38718);
var inst_38720 = inst_38719;
var inst_38721 = null;
var inst_38722 = (0);
var inst_38723 = (0);
var state_38779__$1 = (function (){var statearr_38818 = state_38779;
(statearr_38818[(13)] = inst_38720);

(statearr_38818[(14)] = inst_38721);

(statearr_38818[(15)] = inst_38722);

(statearr_38818[(16)] = inst_38723);

return statearr_38818;
})();
var statearr_38819_40240 = state_38779__$1;
(statearr_38819_40240[(2)] = null);

(statearr_38819_40240[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38780 === (14))){
var state_38779__$1 = state_38779;
var statearr_38823_40241 = state_38779__$1;
(statearr_38823_40241[(2)] = null);

(statearr_38823_40241[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38780 === (16))){
var inst_38734 = (state_38779[(10)]);
var inst_38738 = cljs.core.chunk_first(inst_38734);
var inst_38739 = cljs.core.chunk_rest(inst_38734);
var inst_38740 = cljs.core.count(inst_38738);
var inst_38720 = inst_38739;
var inst_38721 = inst_38738;
var inst_38722 = inst_38740;
var inst_38723 = (0);
var state_38779__$1 = (function (){var statearr_38824 = state_38779;
(statearr_38824[(13)] = inst_38720);

(statearr_38824[(14)] = inst_38721);

(statearr_38824[(15)] = inst_38722);

(statearr_38824[(16)] = inst_38723);

return statearr_38824;
})();
var statearr_38825_40242 = state_38779__$1;
(statearr_38825_40242[(2)] = null);

(statearr_38825_40242[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38780 === (10))){
var inst_38721 = (state_38779[(14)]);
var inst_38723 = (state_38779[(16)]);
var inst_38720 = (state_38779[(13)]);
var inst_38722 = (state_38779[(15)]);
var inst_38728 = cljs.core._nth(inst_38721,inst_38723);
var inst_38729 = cljs.core.async.muxch_STAR_(inst_38728);
var inst_38730 = cljs.core.async.close_BANG_(inst_38729);
var inst_38731 = (inst_38723 + (1));
var tmp38820 = inst_38721;
var tmp38821 = inst_38722;
var tmp38822 = inst_38720;
var inst_38720__$1 = tmp38822;
var inst_38721__$1 = tmp38820;
var inst_38722__$1 = tmp38821;
var inst_38723__$1 = inst_38731;
var state_38779__$1 = (function (){var statearr_38826 = state_38779;
(statearr_38826[(17)] = inst_38730);

(statearr_38826[(13)] = inst_38720__$1);

(statearr_38826[(14)] = inst_38721__$1);

(statearr_38826[(15)] = inst_38722__$1);

(statearr_38826[(16)] = inst_38723__$1);

return statearr_38826;
})();
var statearr_38828_40245 = state_38779__$1;
(statearr_38828_40245[(2)] = null);

(statearr_38828_40245[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38780 === (18))){
var inst_38749 = (state_38779[(2)]);
var state_38779__$1 = state_38779;
var statearr_38829_40246 = state_38779__$1;
(statearr_38829_40246[(2)] = inst_38749);

(statearr_38829_40246[(1)] = (15));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38780 === (8))){
var inst_38723 = (state_38779[(16)]);
var inst_38722 = (state_38779[(15)]);
var inst_38725 = (inst_38723 < inst_38722);
var inst_38726 = inst_38725;
var state_38779__$1 = state_38779;
if(cljs.core.truth_(inst_38726)){
var statearr_38831_40247 = state_38779__$1;
(statearr_38831_40247[(1)] = (10));

} else {
var statearr_38832_40248 = state_38779__$1;
(statearr_38832_40248[(1)] = (11));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__36914__auto__ = null;
var cljs$core$async$state_machine__36914__auto____0 = (function (){
var statearr_38833 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_38833[(0)] = cljs$core$async$state_machine__36914__auto__);

(statearr_38833[(1)] = (1));

return statearr_38833;
});
var cljs$core$async$state_machine__36914__auto____1 = (function (state_38779){
while(true){
var ret_value__36915__auto__ = (function (){try{while(true){
var result__36916__auto__ = switch__36913__auto__(state_38779);
if(cljs.core.keyword_identical_QMARK_(result__36916__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__36916__auto__;
}
break;
}
}catch (e38836){var ex__36917__auto__ = e38836;
var statearr_38837_40253 = state_38779;
(statearr_38837_40253[(2)] = ex__36917__auto__);


if(cljs.core.seq((state_38779[(4)]))){
var statearr_38838_40257 = state_38779;
(statearr_38838_40257[(1)] = cljs.core.first((state_38779[(4)])));

} else {
throw ex__36917__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__36915__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__40258 = state_38779;
state_38779 = G__40258;
continue;
} else {
return ret_value__36915__auto__;
}
break;
}
});
cljs$core$async$state_machine__36914__auto__ = function(state_38779){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__36914__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__36914__auto____1.call(this,state_38779);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__36914__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__36914__auto____0;
cljs$core$async$state_machine__36914__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__36914__auto____1;
return cljs$core$async$state_machine__36914__auto__;
})()
})();
var state__37426__auto__ = (function (){var statearr_38839 = f__37425__auto__();
(statearr_38839[(6)] = c__37424__auto___40204);

return statearr_38839;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__37426__auto__);
}));


return p;
}));

(cljs.core.async.pub.cljs$lang$maxFixedArity = 3);

/**
 * Subscribes a channel to a topic of a pub.
 * 
 *   By default the channel will be closed when the source closes,
 *   but can be determined by the close? parameter.
 */
cljs.core.async.sub = (function cljs$core$async$sub(var_args){
var G__38843 = arguments.length;
switch (G__38843) {
case 3:
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
case 4:
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$4((arguments[(0)]),(arguments[(1)]),(arguments[(2)]),(arguments[(3)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.sub.cljs$core$IFn$_invoke$arity$3 = (function (p,topic,ch){
return cljs.core.async.sub.cljs$core$IFn$_invoke$arity$4(p,topic,ch,true);
}));

(cljs.core.async.sub.cljs$core$IFn$_invoke$arity$4 = (function (p,topic,ch,close_QMARK_){
return cljs.core.async.sub_STAR_(p,topic,ch,close_QMARK_);
}));

(cljs.core.async.sub.cljs$lang$maxFixedArity = 4);

/**
 * Unsubscribes a channel from a topic of a pub
 */
cljs.core.async.unsub = (function cljs$core$async$unsub(p,topic,ch){
return cljs.core.async.unsub_STAR_(p,topic,ch);
});
/**
 * Unsubscribes all channels from a pub, or a topic of a pub
 */
cljs.core.async.unsub_all = (function cljs$core$async$unsub_all(var_args){
var G__38847 = arguments.length;
switch (G__38847) {
case 1:
return cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$1 = (function (p){
return cljs.core.async.unsub_all_STAR_(p);
}));

(cljs.core.async.unsub_all.cljs$core$IFn$_invoke$arity$2 = (function (p,topic){
return cljs.core.async.unsub_all_STAR_(p,topic);
}));

(cljs.core.async.unsub_all.cljs$lang$maxFixedArity = 2);

/**
 * Takes a function and a collection of source channels, and returns a
 *   channel which contains the values produced by applying f to the set
 *   of first items taken from each source channel, followed by applying
 *   f to the set of second items from each channel, until any one of the
 *   channels is closed, at which point the output channel will be
 *   closed. The returned channel will be unbuffered by default, or a
 *   buf-or-n can be supplied
 */
cljs.core.async.map = (function cljs$core$async$map(var_args){
var G__38849 = arguments.length;
switch (G__38849) {
case 2:
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.map.cljs$core$IFn$_invoke$arity$2 = (function (f,chs){
return cljs.core.async.map.cljs$core$IFn$_invoke$arity$3(f,chs,null);
}));

(cljs.core.async.map.cljs$core$IFn$_invoke$arity$3 = (function (f,chs,buf_or_n){
var chs__$1 = cljs.core.vec(chs);
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var cnt = cljs.core.count(chs__$1);
var rets = cljs.core.object_array.cljs$core$IFn$_invoke$arity$1(cnt);
var dchan = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
var dctr = cljs.core.atom.cljs$core$IFn$_invoke$arity$1(null);
var done = cljs.core.mapv.cljs$core$IFn$_invoke$arity$2((function (i){
return (function (ret){
(rets[i] = ret);

if((cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(dctr,cljs.core.dec) === (0))){
return cljs.core.async.put_BANG_.cljs$core$IFn$_invoke$arity$2(dchan,rets.slice((0)));
} else {
return null;
}
});
}),cljs.core.range.cljs$core$IFn$_invoke$arity$1(cnt));
if((cnt === (0))){
cljs.core.async.close_BANG_(out);
} else {
var c__37424__auto___40270 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__37425__auto__ = (function (){var switch__36913__auto__ = (function (state_38908){
var state_val_38909 = (state_38908[(1)]);
if((state_val_38909 === (7))){
var state_38908__$1 = state_38908;
var statearr_38917_40271 = state_38908__$1;
(statearr_38917_40271[(2)] = null);

(statearr_38917_40271[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38909 === (1))){
var state_38908__$1 = state_38908;
var statearr_38921_40272 = state_38908__$1;
(statearr_38921_40272[(2)] = null);

(statearr_38921_40272[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38909 === (4))){
var inst_38856 = (state_38908[(7)]);
var inst_38855 = (state_38908[(8)]);
var inst_38858 = (inst_38856 < inst_38855);
var state_38908__$1 = state_38908;
if(cljs.core.truth_(inst_38858)){
var statearr_38922_40273 = state_38908__$1;
(statearr_38922_40273[(1)] = (6));

} else {
var statearr_38923_40274 = state_38908__$1;
(statearr_38923_40274[(1)] = (7));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38909 === (15))){
var inst_38894 = (state_38908[(9)]);
var inst_38899 = cljs.core.apply.cljs$core$IFn$_invoke$arity$2(f,inst_38894);
var state_38908__$1 = state_38908;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_38908__$1,(17),out,inst_38899);
} else {
if((state_val_38909 === (13))){
var inst_38894 = (state_38908[(9)]);
var inst_38894__$1 = (state_38908[(2)]);
var inst_38895 = cljs.core.some(cljs.core.nil_QMARK_,inst_38894__$1);
var state_38908__$1 = (function (){var statearr_38931 = state_38908;
(statearr_38931[(9)] = inst_38894__$1);

return statearr_38931;
})();
if(cljs.core.truth_(inst_38895)){
var statearr_38935_40278 = state_38908__$1;
(statearr_38935_40278[(1)] = (14));

} else {
var statearr_38936_40279 = state_38908__$1;
(statearr_38936_40279[(1)] = (15));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38909 === (6))){
var state_38908__$1 = state_38908;
var statearr_38940_40280 = state_38908__$1;
(statearr_38940_40280[(2)] = null);

(statearr_38940_40280[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38909 === (17))){
var inst_38901 = (state_38908[(2)]);
var state_38908__$1 = (function (){var statearr_38948 = state_38908;
(statearr_38948[(10)] = inst_38901);

return statearr_38948;
})();
var statearr_38949_40285 = state_38908__$1;
(statearr_38949_40285[(2)] = null);

(statearr_38949_40285[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38909 === (3))){
var inst_38906 = (state_38908[(2)]);
var state_38908__$1 = state_38908;
return cljs.core.async.impl.ioc_helpers.return_chan(state_38908__$1,inst_38906);
} else {
if((state_val_38909 === (12))){
var _ = (function (){var statearr_38950 = state_38908;
(statearr_38950[(4)] = cljs.core.rest((state_38908[(4)])));

return statearr_38950;
})();
var state_38908__$1 = state_38908;
var ex38947 = (state_38908__$1[(2)]);
var statearr_38951_40288 = state_38908__$1;
(statearr_38951_40288[(5)] = ex38947);


if((ex38947 instanceof Object)){
var statearr_38952_40289 = state_38908__$1;
(statearr_38952_40289[(1)] = (11));

(statearr_38952_40289[(5)] = null);

} else {
throw ex38947;

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38909 === (2))){
var inst_38854 = cljs.core.reset_BANG_(dctr,cnt);
var inst_38855 = cnt;
var inst_38856 = (0);
var state_38908__$1 = (function (){var statearr_38953 = state_38908;
(statearr_38953[(11)] = inst_38854);

(statearr_38953[(8)] = inst_38855);

(statearr_38953[(7)] = inst_38856);

return statearr_38953;
})();
var statearr_38954_40291 = state_38908__$1;
(statearr_38954_40291[(2)] = null);

(statearr_38954_40291[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38909 === (11))){
var inst_38870 = (state_38908[(2)]);
var inst_38871 = cljs.core.swap_BANG_.cljs$core$IFn$_invoke$arity$2(dctr,cljs.core.dec);
var state_38908__$1 = (function (){var statearr_38955 = state_38908;
(statearr_38955[(12)] = inst_38870);

return statearr_38955;
})();
var statearr_38956_40296 = state_38908__$1;
(statearr_38956_40296[(2)] = inst_38871);

(statearr_38956_40296[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38909 === (9))){
var inst_38856 = (state_38908[(7)]);
var _ = (function (){var statearr_38957 = state_38908;
(statearr_38957[(4)] = cljs.core.cons((12),(state_38908[(4)])));

return statearr_38957;
})();
var inst_38880 = (chs__$1.cljs$core$IFn$_invoke$arity$1 ? chs__$1.cljs$core$IFn$_invoke$arity$1(inst_38856) : chs__$1.call(null,inst_38856));
var inst_38881 = (done.cljs$core$IFn$_invoke$arity$1 ? done.cljs$core$IFn$_invoke$arity$1(inst_38856) : done.call(null,inst_38856));
var inst_38882 = cljs.core.async.take_BANG_.cljs$core$IFn$_invoke$arity$2(inst_38880,inst_38881);
var ___$1 = (function (){var statearr_38958 = state_38908;
(statearr_38958[(4)] = cljs.core.rest((state_38908[(4)])));

return statearr_38958;
})();
var state_38908__$1 = state_38908;
var statearr_38959_40299 = state_38908__$1;
(statearr_38959_40299[(2)] = inst_38882);

(statearr_38959_40299[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38909 === (5))){
var inst_38892 = (state_38908[(2)]);
var state_38908__$1 = (function (){var statearr_38960 = state_38908;
(statearr_38960[(13)] = inst_38892);

return statearr_38960;
})();
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_38908__$1,(13),dchan);
} else {
if((state_val_38909 === (14))){
var inst_38897 = cljs.core.async.close_BANG_(out);
var state_38908__$1 = state_38908;
var statearr_38961_40300 = state_38908__$1;
(statearr_38961_40300[(2)] = inst_38897);

(statearr_38961_40300[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38909 === (16))){
var inst_38904 = (state_38908[(2)]);
var state_38908__$1 = state_38908;
var statearr_38962_40301 = state_38908__$1;
(statearr_38962_40301[(2)] = inst_38904);

(statearr_38962_40301[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38909 === (10))){
var inst_38856 = (state_38908[(7)]);
var inst_38885 = (state_38908[(2)]);
var inst_38886 = (inst_38856 + (1));
var inst_38856__$1 = inst_38886;
var state_38908__$1 = (function (){var statearr_38963 = state_38908;
(statearr_38963[(14)] = inst_38885);

(statearr_38963[(7)] = inst_38856__$1);

return statearr_38963;
})();
var statearr_38964_40307 = state_38908__$1;
(statearr_38964_40307[(2)] = null);

(statearr_38964_40307[(1)] = (4));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_38909 === (8))){
var inst_38890 = (state_38908[(2)]);
var state_38908__$1 = state_38908;
var statearr_38965_40312 = state_38908__$1;
(statearr_38965_40312[(2)] = inst_38890);

(statearr_38965_40312[(1)] = (5));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__36914__auto__ = null;
var cljs$core$async$state_machine__36914__auto____0 = (function (){
var statearr_38966 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_38966[(0)] = cljs$core$async$state_machine__36914__auto__);

(statearr_38966[(1)] = (1));

return statearr_38966;
});
var cljs$core$async$state_machine__36914__auto____1 = (function (state_38908){
while(true){
var ret_value__36915__auto__ = (function (){try{while(true){
var result__36916__auto__ = switch__36913__auto__(state_38908);
if(cljs.core.keyword_identical_QMARK_(result__36916__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__36916__auto__;
}
break;
}
}catch (e38967){var ex__36917__auto__ = e38967;
var statearr_38968_40317 = state_38908;
(statearr_38968_40317[(2)] = ex__36917__auto__);


if(cljs.core.seq((state_38908[(4)]))){
var statearr_38969_40318 = state_38908;
(statearr_38969_40318[(1)] = cljs.core.first((state_38908[(4)])));

} else {
throw ex__36917__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__36915__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__40322 = state_38908;
state_38908 = G__40322;
continue;
} else {
return ret_value__36915__auto__;
}
break;
}
});
cljs$core$async$state_machine__36914__auto__ = function(state_38908){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__36914__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__36914__auto____1.call(this,state_38908);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__36914__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__36914__auto____0;
cljs$core$async$state_machine__36914__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__36914__auto____1;
return cljs$core$async$state_machine__36914__auto__;
})()
})();
var state__37426__auto__ = (function (){var statearr_38970 = f__37425__auto__();
(statearr_38970[(6)] = c__37424__auto___40270);

return statearr_38970;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__37426__auto__);
}));

}

return out;
}));

(cljs.core.async.map.cljs$lang$maxFixedArity = 3);

/**
 * Takes a collection of source channels and returns a channel which
 *   contains all values taken from them. The returned channel will be
 *   unbuffered by default, or a buf-or-n can be supplied. The channel
 *   will close after all the source channels have closed.
 */
cljs.core.async.merge = (function cljs$core$async$merge(var_args){
var G__38975 = arguments.length;
switch (G__38975) {
case 1:
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.merge.cljs$core$IFn$_invoke$arity$1 = (function (chs){
return cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2(chs,null);
}));

(cljs.core.async.merge.cljs$core$IFn$_invoke$arity$2 = (function (chs,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__37424__auto___40351 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__37425__auto__ = (function (){var switch__36913__auto__ = (function (state_39018){
var state_val_39019 = (state_39018[(1)]);
if((state_val_39019 === (7))){
var inst_38997 = (state_39018[(7)]);
var inst_38998 = (state_39018[(8)]);
var inst_38997__$1 = (state_39018[(2)]);
var inst_38998__$1 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_38997__$1,(0),null);
var inst_38999 = cljs.core.nth.cljs$core$IFn$_invoke$arity$3(inst_38997__$1,(1),null);
var inst_39000 = (inst_38998__$1 == null);
var state_39018__$1 = (function (){var statearr_39022 = state_39018;
(statearr_39022[(7)] = inst_38997__$1);

(statearr_39022[(8)] = inst_38998__$1);

(statearr_39022[(9)] = inst_38999);

return statearr_39022;
})();
if(cljs.core.truth_(inst_39000)){
var statearr_39023_40363 = state_39018__$1;
(statearr_39023_40363[(1)] = (8));

} else {
var statearr_39024_40364 = state_39018__$1;
(statearr_39024_40364[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39019 === (1))){
var inst_38977 = cljs.core.vec(chs);
var inst_38978 = inst_38977;
var state_39018__$1 = (function (){var statearr_39025 = state_39018;
(statearr_39025[(10)] = inst_38978);

return statearr_39025;
})();
var statearr_39026_40370 = state_39018__$1;
(statearr_39026_40370[(2)] = null);

(statearr_39026_40370[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39019 === (4))){
var inst_38978 = (state_39018[(10)]);
var state_39018__$1 = state_39018;
return cljs.core.async.ioc_alts_BANG_(state_39018__$1,(7),inst_38978);
} else {
if((state_val_39019 === (6))){
var inst_39014 = (state_39018[(2)]);
var state_39018__$1 = state_39018;
var statearr_39027_40378 = state_39018__$1;
(statearr_39027_40378[(2)] = inst_39014);

(statearr_39027_40378[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39019 === (3))){
var inst_39016 = (state_39018[(2)]);
var state_39018__$1 = state_39018;
return cljs.core.async.impl.ioc_helpers.return_chan(state_39018__$1,inst_39016);
} else {
if((state_val_39019 === (2))){
var inst_38978 = (state_39018[(10)]);
var inst_38980 = cljs.core.count(inst_38978);
var inst_38981 = (inst_38980 > (0));
var state_39018__$1 = state_39018;
if(cljs.core.truth_(inst_38981)){
var statearr_39029_40379 = state_39018__$1;
(statearr_39029_40379[(1)] = (4));

} else {
var statearr_39030_40383 = state_39018__$1;
(statearr_39030_40383[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39019 === (11))){
var inst_38978 = (state_39018[(10)]);
var inst_39007 = (state_39018[(2)]);
var tmp39028 = inst_38978;
var inst_38978__$1 = tmp39028;
var state_39018__$1 = (function (){var statearr_39031 = state_39018;
(statearr_39031[(11)] = inst_39007);

(statearr_39031[(10)] = inst_38978__$1);

return statearr_39031;
})();
var statearr_39032_40388 = state_39018__$1;
(statearr_39032_40388[(2)] = null);

(statearr_39032_40388[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39019 === (9))){
var inst_38998 = (state_39018[(8)]);
var state_39018__$1 = state_39018;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_39018__$1,(11),out,inst_38998);
} else {
if((state_val_39019 === (5))){
var inst_39012 = cljs.core.async.close_BANG_(out);
var state_39018__$1 = state_39018;
var statearr_39033_40389 = state_39018__$1;
(statearr_39033_40389[(2)] = inst_39012);

(statearr_39033_40389[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39019 === (10))){
var inst_39010 = (state_39018[(2)]);
var state_39018__$1 = state_39018;
var statearr_39034_40390 = state_39018__$1;
(statearr_39034_40390[(2)] = inst_39010);

(statearr_39034_40390[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39019 === (8))){
var inst_38978 = (state_39018[(10)]);
var inst_38997 = (state_39018[(7)]);
var inst_38998 = (state_39018[(8)]);
var inst_38999 = (state_39018[(9)]);
var inst_39002 = (function (){var cs = inst_38978;
var vec__38990 = inst_38997;
var v = inst_38998;
var c = inst_38999;
return (function (p1__38973_SHARP_){
return cljs.core.not_EQ_.cljs$core$IFn$_invoke$arity$2(c,p1__38973_SHARP_);
});
})();
var inst_39003 = cljs.core.filterv(inst_39002,inst_38978);
var inst_38978__$1 = inst_39003;
var state_39018__$1 = (function (){var statearr_39035 = state_39018;
(statearr_39035[(10)] = inst_38978__$1);

return statearr_39035;
})();
var statearr_39036_40417 = state_39018__$1;
(statearr_39036_40417[(2)] = null);

(statearr_39036_40417[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__36914__auto__ = null;
var cljs$core$async$state_machine__36914__auto____0 = (function (){
var statearr_39037 = [null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_39037[(0)] = cljs$core$async$state_machine__36914__auto__);

(statearr_39037[(1)] = (1));

return statearr_39037;
});
var cljs$core$async$state_machine__36914__auto____1 = (function (state_39018){
while(true){
var ret_value__36915__auto__ = (function (){try{while(true){
var result__36916__auto__ = switch__36913__auto__(state_39018);
if(cljs.core.keyword_identical_QMARK_(result__36916__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__36916__auto__;
}
break;
}
}catch (e39040){var ex__36917__auto__ = e39040;
var statearr_39041_40421 = state_39018;
(statearr_39041_40421[(2)] = ex__36917__auto__);


if(cljs.core.seq((state_39018[(4)]))){
var statearr_39042_40422 = state_39018;
(statearr_39042_40422[(1)] = cljs.core.first((state_39018[(4)])));

} else {
throw ex__36917__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__36915__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__40423 = state_39018;
state_39018 = G__40423;
continue;
} else {
return ret_value__36915__auto__;
}
break;
}
});
cljs$core$async$state_machine__36914__auto__ = function(state_39018){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__36914__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__36914__auto____1.call(this,state_39018);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__36914__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__36914__auto____0;
cljs$core$async$state_machine__36914__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__36914__auto____1;
return cljs$core$async$state_machine__36914__auto__;
})()
})();
var state__37426__auto__ = (function (){var statearr_39044 = f__37425__auto__();
(statearr_39044[(6)] = c__37424__auto___40351);

return statearr_39044;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__37426__auto__);
}));


return out;
}));

(cljs.core.async.merge.cljs$lang$maxFixedArity = 2);

/**
 * Returns a channel containing the single (collection) result of the
 *   items taken from the channel conjoined to the supplied
 *   collection. ch must close before into produces a result.
 */
cljs.core.async.into = (function cljs$core$async$into(coll,ch){
return cljs.core.async.reduce(cljs.core.conj,coll,ch);
});
/**
 * Returns a channel that will return, at most, n items from ch. After n items
 * have been returned, or ch has been closed, the return chanel will close.
 * 
 *   The output channel is unbuffered by default, unless buf-or-n is given.
 */
cljs.core.async.take = (function cljs$core$async$take(var_args){
var G__39046 = arguments.length;
switch (G__39046) {
case 2:
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.take.cljs$core$IFn$_invoke$arity$2 = (function (n,ch){
return cljs.core.async.take.cljs$core$IFn$_invoke$arity$3(n,ch,null);
}));

(cljs.core.async.take.cljs$core$IFn$_invoke$arity$3 = (function (n,ch,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__37424__auto___40452 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__37425__auto__ = (function (){var switch__36913__auto__ = (function (state_39080){
var state_val_39081 = (state_39080[(1)]);
if((state_val_39081 === (7))){
var inst_39061 = (state_39080[(7)]);
var inst_39061__$1 = (state_39080[(2)]);
var inst_39062 = (inst_39061__$1 == null);
var inst_39063 = cljs.core.not(inst_39062);
var state_39080__$1 = (function (){var statearr_39082 = state_39080;
(statearr_39082[(7)] = inst_39061__$1);

return statearr_39082;
})();
if(inst_39063){
var statearr_39083_40457 = state_39080__$1;
(statearr_39083_40457[(1)] = (8));

} else {
var statearr_39084_40458 = state_39080__$1;
(statearr_39084_40458[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39081 === (1))){
var inst_39056 = (0);
var state_39080__$1 = (function (){var statearr_39085 = state_39080;
(statearr_39085[(8)] = inst_39056);

return statearr_39085;
})();
var statearr_39086_40461 = state_39080__$1;
(statearr_39086_40461[(2)] = null);

(statearr_39086_40461[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39081 === (4))){
var state_39080__$1 = state_39080;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_39080__$1,(7),ch);
} else {
if((state_val_39081 === (6))){
var inst_39075 = (state_39080[(2)]);
var state_39080__$1 = state_39080;
var statearr_39087_40470 = state_39080__$1;
(statearr_39087_40470[(2)] = inst_39075);

(statearr_39087_40470[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39081 === (3))){
var inst_39077 = (state_39080[(2)]);
var inst_39078 = cljs.core.async.close_BANG_(out);
var state_39080__$1 = (function (){var statearr_39088 = state_39080;
(statearr_39088[(9)] = inst_39077);

return statearr_39088;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_39080__$1,inst_39078);
} else {
if((state_val_39081 === (2))){
var inst_39056 = (state_39080[(8)]);
var inst_39058 = (inst_39056 < n);
var state_39080__$1 = state_39080;
if(cljs.core.truth_(inst_39058)){
var statearr_39089_40477 = state_39080__$1;
(statearr_39089_40477[(1)] = (4));

} else {
var statearr_39090_40478 = state_39080__$1;
(statearr_39090_40478[(1)] = (5));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39081 === (11))){
var inst_39056 = (state_39080[(8)]);
var inst_39066 = (state_39080[(2)]);
var inst_39067 = (inst_39056 + (1));
var inst_39056__$1 = inst_39067;
var state_39080__$1 = (function (){var statearr_39091 = state_39080;
(statearr_39091[(10)] = inst_39066);

(statearr_39091[(8)] = inst_39056__$1);

return statearr_39091;
})();
var statearr_39092_40479 = state_39080__$1;
(statearr_39092_40479[(2)] = null);

(statearr_39092_40479[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39081 === (9))){
var state_39080__$1 = state_39080;
var statearr_39093_40480 = state_39080__$1;
(statearr_39093_40480[(2)] = null);

(statearr_39093_40480[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39081 === (5))){
var state_39080__$1 = state_39080;
var statearr_39094_40481 = state_39080__$1;
(statearr_39094_40481[(2)] = null);

(statearr_39094_40481[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39081 === (10))){
var inst_39072 = (state_39080[(2)]);
var state_39080__$1 = state_39080;
var statearr_39097_40483 = state_39080__$1;
(statearr_39097_40483[(2)] = inst_39072);

(statearr_39097_40483[(1)] = (6));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39081 === (8))){
var inst_39061 = (state_39080[(7)]);
var state_39080__$1 = state_39080;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_39080__$1,(11),out,inst_39061);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__36914__auto__ = null;
var cljs$core$async$state_machine__36914__auto____0 = (function (){
var statearr_39098 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_39098[(0)] = cljs$core$async$state_machine__36914__auto__);

(statearr_39098[(1)] = (1));

return statearr_39098;
});
var cljs$core$async$state_machine__36914__auto____1 = (function (state_39080){
while(true){
var ret_value__36915__auto__ = (function (){try{while(true){
var result__36916__auto__ = switch__36913__auto__(state_39080);
if(cljs.core.keyword_identical_QMARK_(result__36916__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__36916__auto__;
}
break;
}
}catch (e39099){var ex__36917__auto__ = e39099;
var statearr_39100_40491 = state_39080;
(statearr_39100_40491[(2)] = ex__36917__auto__);


if(cljs.core.seq((state_39080[(4)]))){
var statearr_39102_40492 = state_39080;
(statearr_39102_40492[(1)] = cljs.core.first((state_39080[(4)])));

} else {
throw ex__36917__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__36915__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__40495 = state_39080;
state_39080 = G__40495;
continue;
} else {
return ret_value__36915__auto__;
}
break;
}
});
cljs$core$async$state_machine__36914__auto__ = function(state_39080){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__36914__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__36914__auto____1.call(this,state_39080);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__36914__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__36914__auto____0;
cljs$core$async$state_machine__36914__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__36914__auto____1;
return cljs$core$async$state_machine__36914__auto__;
})()
})();
var state__37426__auto__ = (function (){var statearr_39104 = f__37425__auto__();
(statearr_39104[(6)] = c__37424__auto___40452);

return statearr_39104;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__37426__auto__);
}));


return out;
}));

(cljs.core.async.take.cljs$lang$maxFixedArity = 3);


/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Handler}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async39116 = (function (f,ch,meta39107,_,fn1,meta39117){
this.f = f;
this.ch = ch;
this.meta39107 = meta39107;
this._ = _;
this.fn1 = fn1;
this.meta39117 = meta39117;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async39116.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_39118,meta39117__$1){
var self__ = this;
var _39118__$1 = this;
return (new cljs.core.async.t_cljs$core$async39116(self__.f,self__.ch,self__.meta39107,self__._,self__.fn1,meta39117__$1));
}));

(cljs.core.async.t_cljs$core$async39116.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_39118){
var self__ = this;
var _39118__$1 = this;
return self__.meta39117;
}));

(cljs.core.async.t_cljs$core$async39116.prototype.cljs$core$async$impl$protocols$Handler$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async39116.prototype.cljs$core$async$impl$protocols$Handler$active_QMARK_$arity$1 = (function (___$1){
var self__ = this;
var ___$2 = this;
return cljs.core.async.impl.protocols.active_QMARK_(self__.fn1);
}));

(cljs.core.async.t_cljs$core$async39116.prototype.cljs$core$async$impl$protocols$Handler$blockable_QMARK_$arity$1 = (function (___$1){
var self__ = this;
var ___$2 = this;
return true;
}));

(cljs.core.async.t_cljs$core$async39116.prototype.cljs$core$async$impl$protocols$Handler$commit$arity$1 = (function (___$1){
var self__ = this;
var ___$2 = this;
var f1 = cljs.core.async.impl.protocols.commit(self__.fn1);
return (function (p1__39105_SHARP_){
var G__39129 = (((p1__39105_SHARP_ == null))?null:(self__.f.cljs$core$IFn$_invoke$arity$1 ? self__.f.cljs$core$IFn$_invoke$arity$1(p1__39105_SHARP_) : self__.f.call(null,p1__39105_SHARP_)));
return (f1.cljs$core$IFn$_invoke$arity$1 ? f1.cljs$core$IFn$_invoke$arity$1(G__39129) : f1.call(null,G__39129));
});
}));

(cljs.core.async.t_cljs$core$async39116.getBasis = (function (){
return new cljs.core.PersistentVector(null, 6, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta39107","meta39107",-1189514859,null),cljs.core.with_meta(new cljs.core.Symbol(null,"_","_",-1201019570,null),new cljs.core.PersistentArrayMap(null, 1, [new cljs.core.Keyword(null,"tag","tag",-1290361223),new cljs.core.Symbol("cljs.core.async","t_cljs$core$async39106","cljs.core.async/t_cljs$core$async39106",681543631,null)], null)),new cljs.core.Symbol(null,"fn1","fn1",895834444,null),new cljs.core.Symbol(null,"meta39117","meta39117",1902556525,null)], null);
}));

(cljs.core.async.t_cljs$core$async39116.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async39116.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async39116");

(cljs.core.async.t_cljs$core$async39116.cljs$lang$ctorPrWriter = (function (this__5310__auto__,writer__5311__auto__,opt__5312__auto__){
return cljs.core._write(writer__5311__auto__,"cljs.core.async/t_cljs$core$async39116");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async39116.
 */
cljs.core.async.__GT_t_cljs$core$async39116 = (function cljs$core$async$__GT_t_cljs$core$async39116(f,ch,meta39107,_,fn1,meta39117){
return (new cljs.core.async.t_cljs$core$async39116(f,ch,meta39107,_,fn1,meta39117));
});



/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async39106 = (function (f,ch,meta39107){
this.f = f;
this.ch = ch;
this.meta39107 = meta39107;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async39106.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_39108,meta39107__$1){
var self__ = this;
var _39108__$1 = this;
return (new cljs.core.async.t_cljs$core$async39106(self__.f,self__.ch,meta39107__$1));
}));

(cljs.core.async.t_cljs$core$async39106.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_39108){
var self__ = this;
var _39108__$1 = this;
return self__.meta39107;
}));

(cljs.core.async.t_cljs$core$async39106.prototype.cljs$core$async$impl$protocols$Channel$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async39106.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async39106.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async39106.prototype.cljs$core$async$impl$protocols$ReadPort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async39106.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
var ret = cljs.core.async.impl.protocols.take_BANG_(self__.ch,(new cljs.core.async.t_cljs$core$async39116(self__.f,self__.ch,self__.meta39107,___$1,fn1,cljs.core.PersistentArrayMap.EMPTY)));
if(cljs.core.truth_((function (){var and__5023__auto__ = ret;
if(cljs.core.truth_(and__5023__auto__)){
return (!((cljs.core.deref(ret) == null)));
} else {
return and__5023__auto__;
}
})())){
return cljs.core.async.impl.channels.box((function (){var G__39142 = cljs.core.deref(ret);
return (self__.f.cljs$core$IFn$_invoke$arity$1 ? self__.f.cljs$core$IFn$_invoke$arity$1(G__39142) : self__.f.call(null,G__39142));
})());
} else {
return ret;
}
}));

(cljs.core.async.t_cljs$core$async39106.prototype.cljs$core$async$impl$protocols$WritePort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async39106.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_(self__.ch,val,fn1);
}));

(cljs.core.async.t_cljs$core$async39106.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta39107","meta39107",-1189514859,null)], null);
}));

(cljs.core.async.t_cljs$core$async39106.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async39106.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async39106");

(cljs.core.async.t_cljs$core$async39106.cljs$lang$ctorPrWriter = (function (this__5310__auto__,writer__5311__auto__,opt__5312__auto__){
return cljs.core._write(writer__5311__auto__,"cljs.core.async/t_cljs$core$async39106");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async39106.
 */
cljs.core.async.__GT_t_cljs$core$async39106 = (function cljs$core$async$__GT_t_cljs$core$async39106(f,ch,meta39107){
return (new cljs.core.async.t_cljs$core$async39106(f,ch,meta39107));
});


/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_LT_ = (function cljs$core$async$map_LT_(f,ch){
return (new cljs.core.async.t_cljs$core$async39106(f,ch,cljs.core.PersistentArrayMap.EMPTY));
});

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async39150 = (function (f,ch,meta39151){
this.f = f;
this.ch = ch;
this.meta39151 = meta39151;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async39150.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_39152,meta39151__$1){
var self__ = this;
var _39152__$1 = this;
return (new cljs.core.async.t_cljs$core$async39150(self__.f,self__.ch,meta39151__$1));
}));

(cljs.core.async.t_cljs$core$async39150.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_39152){
var self__ = this;
var _39152__$1 = this;
return self__.meta39151;
}));

(cljs.core.async.t_cljs$core$async39150.prototype.cljs$core$async$impl$protocols$Channel$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async39150.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async39150.prototype.cljs$core$async$impl$protocols$ReadPort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async39150.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_(self__.ch,fn1);
}));

(cljs.core.async.t_cljs$core$async39150.prototype.cljs$core$async$impl$protocols$WritePort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async39150.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.put_BANG_(self__.ch,(self__.f.cljs$core$IFn$_invoke$arity$1 ? self__.f.cljs$core$IFn$_invoke$arity$1(val) : self__.f.call(null,val)),fn1);
}));

(cljs.core.async.t_cljs$core$async39150.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"f","f",43394975,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta39151","meta39151",1323301197,null)], null);
}));

(cljs.core.async.t_cljs$core$async39150.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async39150.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async39150");

(cljs.core.async.t_cljs$core$async39150.cljs$lang$ctorPrWriter = (function (this__5310__auto__,writer__5311__auto__,opt__5312__auto__){
return cljs.core._write(writer__5311__auto__,"cljs.core.async/t_cljs$core$async39150");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async39150.
 */
cljs.core.async.__GT_t_cljs$core$async39150 = (function cljs$core$async$__GT_t_cljs$core$async39150(f,ch,meta39151){
return (new cljs.core.async.t_cljs$core$async39150(f,ch,meta39151));
});


/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.map_GT_ = (function cljs$core$async$map_GT_(f,ch){
return (new cljs.core.async.t_cljs$core$async39150(f,ch,cljs.core.PersistentArrayMap.EMPTY));
});

/**
* @constructor
 * @implements {cljs.core.async.impl.protocols.Channel}
 * @implements {cljs.core.async.impl.protocols.WritePort}
 * @implements {cljs.core.async.impl.protocols.ReadPort}
 * @implements {cljs.core.IMeta}
 * @implements {cljs.core.IWithMeta}
*/
cljs.core.async.t_cljs$core$async39159 = (function (p,ch,meta39160){
this.p = p;
this.ch = ch;
this.meta39160 = meta39160;
this.cljs$lang$protocol_mask$partition0$ = 393216;
this.cljs$lang$protocol_mask$partition1$ = 0;
});
(cljs.core.async.t_cljs$core$async39159.prototype.cljs$core$IWithMeta$_with_meta$arity$2 = (function (_39161,meta39160__$1){
var self__ = this;
var _39161__$1 = this;
return (new cljs.core.async.t_cljs$core$async39159(self__.p,self__.ch,meta39160__$1));
}));

(cljs.core.async.t_cljs$core$async39159.prototype.cljs$core$IMeta$_meta$arity$1 = (function (_39161){
var self__ = this;
var _39161__$1 = this;
return self__.meta39160;
}));

(cljs.core.async.t_cljs$core$async39159.prototype.cljs$core$async$impl$protocols$Channel$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async39159.prototype.cljs$core$async$impl$protocols$Channel$close_BANG_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.close_BANG_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async39159.prototype.cljs$core$async$impl$protocols$Channel$closed_QMARK_$arity$1 = (function (_){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.closed_QMARK_(self__.ch);
}));

(cljs.core.async.t_cljs$core$async39159.prototype.cljs$core$async$impl$protocols$ReadPort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async39159.prototype.cljs$core$async$impl$protocols$ReadPort$take_BANG_$arity$2 = (function (_,fn1){
var self__ = this;
var ___$1 = this;
return cljs.core.async.impl.protocols.take_BANG_(self__.ch,fn1);
}));

(cljs.core.async.t_cljs$core$async39159.prototype.cljs$core$async$impl$protocols$WritePort$ = cljs.core.PROTOCOL_SENTINEL);

(cljs.core.async.t_cljs$core$async39159.prototype.cljs$core$async$impl$protocols$WritePort$put_BANG_$arity$3 = (function (_,val,fn1){
var self__ = this;
var ___$1 = this;
if(cljs.core.truth_((self__.p.cljs$core$IFn$_invoke$arity$1 ? self__.p.cljs$core$IFn$_invoke$arity$1(val) : self__.p.call(null,val)))){
return cljs.core.async.impl.protocols.put_BANG_(self__.ch,val,fn1);
} else {
return cljs.core.async.impl.channels.box(cljs.core.not(cljs.core.async.impl.protocols.closed_QMARK_(self__.ch)));
}
}));

(cljs.core.async.t_cljs$core$async39159.getBasis = (function (){
return new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Symbol(null,"p","p",1791580836,null),new cljs.core.Symbol(null,"ch","ch",1085813622,null),new cljs.core.Symbol(null,"meta39160","meta39160",-1387479631,null)], null);
}));

(cljs.core.async.t_cljs$core$async39159.cljs$lang$type = true);

(cljs.core.async.t_cljs$core$async39159.cljs$lang$ctorStr = "cljs.core.async/t_cljs$core$async39159");

(cljs.core.async.t_cljs$core$async39159.cljs$lang$ctorPrWriter = (function (this__5310__auto__,writer__5311__auto__,opt__5312__auto__){
return cljs.core._write(writer__5311__auto__,"cljs.core.async/t_cljs$core$async39159");
}));

/**
 * Positional factory function for cljs.core.async/t_cljs$core$async39159.
 */
cljs.core.async.__GT_t_cljs$core$async39159 = (function cljs$core$async$__GT_t_cljs$core$async39159(p,ch,meta39160){
return (new cljs.core.async.t_cljs$core$async39159(p,ch,meta39160));
});


/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.filter_GT_ = (function cljs$core$async$filter_GT_(p,ch){
return (new cljs.core.async.t_cljs$core$async39159(p,ch,cljs.core.PersistentArrayMap.EMPTY));
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.remove_GT_ = (function cljs$core$async$remove_GT_(p,ch){
return cljs.core.async.filter_GT_(cljs.core.complement(p),ch);
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.filter_LT_ = (function cljs$core$async$filter_LT_(var_args){
var G__39176 = arguments.length;
switch (G__39176) {
case 2:
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3(p,ch,null);
}));

(cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3 = (function (p,ch,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__37424__auto___40530 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__37425__auto__ = (function (){var switch__36913__auto__ = (function (state_39198){
var state_val_39199 = (state_39198[(1)]);
if((state_val_39199 === (7))){
var inst_39194 = (state_39198[(2)]);
var state_39198__$1 = state_39198;
var statearr_39200_40536 = state_39198__$1;
(statearr_39200_40536[(2)] = inst_39194);

(statearr_39200_40536[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39199 === (1))){
var state_39198__$1 = state_39198;
var statearr_39201_40538 = state_39198__$1;
(statearr_39201_40538[(2)] = null);

(statearr_39201_40538[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39199 === (4))){
var inst_39180 = (state_39198[(7)]);
var inst_39180__$1 = (state_39198[(2)]);
var inst_39181 = (inst_39180__$1 == null);
var state_39198__$1 = (function (){var statearr_39202 = state_39198;
(statearr_39202[(7)] = inst_39180__$1);

return statearr_39202;
})();
if(cljs.core.truth_(inst_39181)){
var statearr_39203_40539 = state_39198__$1;
(statearr_39203_40539[(1)] = (5));

} else {
var statearr_39204_40541 = state_39198__$1;
(statearr_39204_40541[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39199 === (6))){
var inst_39180 = (state_39198[(7)]);
var inst_39185 = (p.cljs$core$IFn$_invoke$arity$1 ? p.cljs$core$IFn$_invoke$arity$1(inst_39180) : p.call(null,inst_39180));
var state_39198__$1 = state_39198;
if(cljs.core.truth_(inst_39185)){
var statearr_39209_40545 = state_39198__$1;
(statearr_39209_40545[(1)] = (8));

} else {
var statearr_39210_40546 = state_39198__$1;
(statearr_39210_40546[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39199 === (3))){
var inst_39196 = (state_39198[(2)]);
var state_39198__$1 = state_39198;
return cljs.core.async.impl.ioc_helpers.return_chan(state_39198__$1,inst_39196);
} else {
if((state_val_39199 === (2))){
var state_39198__$1 = state_39198;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_39198__$1,(4),ch);
} else {
if((state_val_39199 === (11))){
var inst_39188 = (state_39198[(2)]);
var state_39198__$1 = state_39198;
var statearr_39211_40551 = state_39198__$1;
(statearr_39211_40551[(2)] = inst_39188);

(statearr_39211_40551[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39199 === (9))){
var state_39198__$1 = state_39198;
var statearr_39213_40552 = state_39198__$1;
(statearr_39213_40552[(2)] = null);

(statearr_39213_40552[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39199 === (5))){
var inst_39183 = cljs.core.async.close_BANG_(out);
var state_39198__$1 = state_39198;
var statearr_39214_40553 = state_39198__$1;
(statearr_39214_40553[(2)] = inst_39183);

(statearr_39214_40553[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39199 === (10))){
var inst_39191 = (state_39198[(2)]);
var state_39198__$1 = (function (){var statearr_39215 = state_39198;
(statearr_39215[(8)] = inst_39191);

return statearr_39215;
})();
var statearr_39216_40558 = state_39198__$1;
(statearr_39216_40558[(2)] = null);

(statearr_39216_40558[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39199 === (8))){
var inst_39180 = (state_39198[(7)]);
var state_39198__$1 = state_39198;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_39198__$1,(11),out,inst_39180);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__36914__auto__ = null;
var cljs$core$async$state_machine__36914__auto____0 = (function (){
var statearr_39226 = [null,null,null,null,null,null,null,null,null];
(statearr_39226[(0)] = cljs$core$async$state_machine__36914__auto__);

(statearr_39226[(1)] = (1));

return statearr_39226;
});
var cljs$core$async$state_machine__36914__auto____1 = (function (state_39198){
while(true){
var ret_value__36915__auto__ = (function (){try{while(true){
var result__36916__auto__ = switch__36913__auto__(state_39198);
if(cljs.core.keyword_identical_QMARK_(result__36916__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__36916__auto__;
}
break;
}
}catch (e39227){var ex__36917__auto__ = e39227;
var statearr_39228_40567 = state_39198;
(statearr_39228_40567[(2)] = ex__36917__auto__);


if(cljs.core.seq((state_39198[(4)]))){
var statearr_39230_40568 = state_39198;
(statearr_39230_40568[(1)] = cljs.core.first((state_39198[(4)])));

} else {
throw ex__36917__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__36915__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__40573 = state_39198;
state_39198 = G__40573;
continue;
} else {
return ret_value__36915__auto__;
}
break;
}
});
cljs$core$async$state_machine__36914__auto__ = function(state_39198){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__36914__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__36914__auto____1.call(this,state_39198);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__36914__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__36914__auto____0;
cljs$core$async$state_machine__36914__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__36914__auto____1;
return cljs$core$async$state_machine__36914__auto__;
})()
})();
var state__37426__auto__ = (function (){var statearr_39234 = f__37425__auto__();
(statearr_39234[(6)] = c__37424__auto___40530);

return statearr_39234;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__37426__auto__);
}));


return out;
}));

(cljs.core.async.filter_LT_.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.remove_LT_ = (function cljs$core$async$remove_LT_(var_args){
var G__39242 = arguments.length;
switch (G__39242) {
case 2:
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$2 = (function (p,ch){
return cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$3(p,ch,null);
}));

(cljs.core.async.remove_LT_.cljs$core$IFn$_invoke$arity$3 = (function (p,ch,buf_or_n){
return cljs.core.async.filter_LT_.cljs$core$IFn$_invoke$arity$3(cljs.core.complement(p),ch,buf_or_n);
}));

(cljs.core.async.remove_LT_.cljs$lang$maxFixedArity = 3);

cljs.core.async.mapcat_STAR_ = (function cljs$core$async$mapcat_STAR_(f,in$,out){
var c__37424__auto__ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__37425__auto__ = (function (){var switch__36913__auto__ = (function (state_39312){
var state_val_39313 = (state_39312[(1)]);
if((state_val_39313 === (7))){
var inst_39308 = (state_39312[(2)]);
var state_39312__$1 = state_39312;
var statearr_39319_40595 = state_39312__$1;
(statearr_39319_40595[(2)] = inst_39308);

(statearr_39319_40595[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39313 === (20))){
var inst_39277 = (state_39312[(7)]);
var inst_39289 = (state_39312[(2)]);
var inst_39290 = cljs.core.next(inst_39277);
var inst_39262 = inst_39290;
var inst_39263 = null;
var inst_39264 = (0);
var inst_39265 = (0);
var state_39312__$1 = (function (){var statearr_39325 = state_39312;
(statearr_39325[(8)] = inst_39289);

(statearr_39325[(9)] = inst_39262);

(statearr_39325[(10)] = inst_39263);

(statearr_39325[(11)] = inst_39264);

(statearr_39325[(12)] = inst_39265);

return statearr_39325;
})();
var statearr_39326_40596 = state_39312__$1;
(statearr_39326_40596[(2)] = null);

(statearr_39326_40596[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39313 === (1))){
var state_39312__$1 = state_39312;
var statearr_39327_40598 = state_39312__$1;
(statearr_39327_40598[(2)] = null);

(statearr_39327_40598[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39313 === (4))){
var inst_39251 = (state_39312[(13)]);
var inst_39251__$1 = (state_39312[(2)]);
var inst_39252 = (inst_39251__$1 == null);
var state_39312__$1 = (function (){var statearr_39328 = state_39312;
(statearr_39328[(13)] = inst_39251__$1);

return statearr_39328;
})();
if(cljs.core.truth_(inst_39252)){
var statearr_39329_40601 = state_39312__$1;
(statearr_39329_40601[(1)] = (5));

} else {
var statearr_39330_40602 = state_39312__$1;
(statearr_39330_40602[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39313 === (15))){
var state_39312__$1 = state_39312;
var statearr_39335_40605 = state_39312__$1;
(statearr_39335_40605[(2)] = null);

(statearr_39335_40605[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39313 === (21))){
var state_39312__$1 = state_39312;
var statearr_39336_40606 = state_39312__$1;
(statearr_39336_40606[(2)] = null);

(statearr_39336_40606[(1)] = (23));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39313 === (13))){
var inst_39265 = (state_39312[(12)]);
var inst_39262 = (state_39312[(9)]);
var inst_39263 = (state_39312[(10)]);
var inst_39264 = (state_39312[(11)]);
var inst_39273 = (state_39312[(2)]);
var inst_39274 = (inst_39265 + (1));
var tmp39332 = inst_39263;
var tmp39333 = inst_39264;
var tmp39334 = inst_39262;
var inst_39262__$1 = tmp39334;
var inst_39263__$1 = tmp39332;
var inst_39264__$1 = tmp39333;
var inst_39265__$1 = inst_39274;
var state_39312__$1 = (function (){var statearr_39338 = state_39312;
(statearr_39338[(14)] = inst_39273);

(statearr_39338[(9)] = inst_39262__$1);

(statearr_39338[(10)] = inst_39263__$1);

(statearr_39338[(11)] = inst_39264__$1);

(statearr_39338[(12)] = inst_39265__$1);

return statearr_39338;
})();
var statearr_39344_40617 = state_39312__$1;
(statearr_39344_40617[(2)] = null);

(statearr_39344_40617[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39313 === (22))){
var state_39312__$1 = state_39312;
var statearr_39345_40618 = state_39312__$1;
(statearr_39345_40618[(2)] = null);

(statearr_39345_40618[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39313 === (6))){
var inst_39251 = (state_39312[(13)]);
var inst_39260 = (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(inst_39251) : f.call(null,inst_39251));
var inst_39261 = cljs.core.seq(inst_39260);
var inst_39262 = inst_39261;
var inst_39263 = null;
var inst_39264 = (0);
var inst_39265 = (0);
var state_39312__$1 = (function (){var statearr_39346 = state_39312;
(statearr_39346[(9)] = inst_39262);

(statearr_39346[(10)] = inst_39263);

(statearr_39346[(11)] = inst_39264);

(statearr_39346[(12)] = inst_39265);

return statearr_39346;
})();
var statearr_39347_40619 = state_39312__$1;
(statearr_39347_40619[(2)] = null);

(statearr_39347_40619[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39313 === (17))){
var inst_39277 = (state_39312[(7)]);
var inst_39282 = cljs.core.chunk_first(inst_39277);
var inst_39283 = cljs.core.chunk_rest(inst_39277);
var inst_39284 = cljs.core.count(inst_39282);
var inst_39262 = inst_39283;
var inst_39263 = inst_39282;
var inst_39264 = inst_39284;
var inst_39265 = (0);
var state_39312__$1 = (function (){var statearr_39348 = state_39312;
(statearr_39348[(9)] = inst_39262);

(statearr_39348[(10)] = inst_39263);

(statearr_39348[(11)] = inst_39264);

(statearr_39348[(12)] = inst_39265);

return statearr_39348;
})();
var statearr_39349_40620 = state_39312__$1;
(statearr_39349_40620[(2)] = null);

(statearr_39349_40620[(1)] = (8));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39313 === (3))){
var inst_39310 = (state_39312[(2)]);
var state_39312__$1 = state_39312;
return cljs.core.async.impl.ioc_helpers.return_chan(state_39312__$1,inst_39310);
} else {
if((state_val_39313 === (12))){
var inst_39298 = (state_39312[(2)]);
var state_39312__$1 = state_39312;
var statearr_39354_40621 = state_39312__$1;
(statearr_39354_40621[(2)] = inst_39298);

(statearr_39354_40621[(1)] = (9));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39313 === (2))){
var state_39312__$1 = state_39312;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_39312__$1,(4),in$);
} else {
if((state_val_39313 === (23))){
var inst_39306 = (state_39312[(2)]);
var state_39312__$1 = state_39312;
var statearr_39355_40622 = state_39312__$1;
(statearr_39355_40622[(2)] = inst_39306);

(statearr_39355_40622[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39313 === (19))){
var inst_39293 = (state_39312[(2)]);
var state_39312__$1 = state_39312;
var statearr_39356_40624 = state_39312__$1;
(statearr_39356_40624[(2)] = inst_39293);

(statearr_39356_40624[(1)] = (16));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39313 === (11))){
var inst_39262 = (state_39312[(9)]);
var inst_39277 = (state_39312[(7)]);
var inst_39277__$1 = cljs.core.seq(inst_39262);
var state_39312__$1 = (function (){var statearr_39357 = state_39312;
(statearr_39357[(7)] = inst_39277__$1);

return statearr_39357;
})();
if(inst_39277__$1){
var statearr_39358_40626 = state_39312__$1;
(statearr_39358_40626[(1)] = (14));

} else {
var statearr_39359_40627 = state_39312__$1;
(statearr_39359_40627[(1)] = (15));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39313 === (9))){
var inst_39300 = (state_39312[(2)]);
var inst_39301 = cljs.core.async.impl.protocols.closed_QMARK_(out);
var state_39312__$1 = (function (){var statearr_39367 = state_39312;
(statearr_39367[(15)] = inst_39300);

return statearr_39367;
})();
if(cljs.core.truth_(inst_39301)){
var statearr_39368_40628 = state_39312__$1;
(statearr_39368_40628[(1)] = (21));

} else {
var statearr_39369_40629 = state_39312__$1;
(statearr_39369_40629[(1)] = (22));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39313 === (5))){
var inst_39254 = cljs.core.async.close_BANG_(out);
var state_39312__$1 = state_39312;
var statearr_39373_40631 = state_39312__$1;
(statearr_39373_40631[(2)] = inst_39254);

(statearr_39373_40631[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39313 === (14))){
var inst_39277 = (state_39312[(7)]);
var inst_39280 = cljs.core.chunked_seq_QMARK_(inst_39277);
var state_39312__$1 = state_39312;
if(inst_39280){
var statearr_39374_40634 = state_39312__$1;
(statearr_39374_40634[(1)] = (17));

} else {
var statearr_39375_40635 = state_39312__$1;
(statearr_39375_40635[(1)] = (18));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39313 === (16))){
var inst_39296 = (state_39312[(2)]);
var state_39312__$1 = state_39312;
var statearr_39376_40636 = state_39312__$1;
(statearr_39376_40636[(2)] = inst_39296);

(statearr_39376_40636[(1)] = (12));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39313 === (10))){
var inst_39263 = (state_39312[(10)]);
var inst_39265 = (state_39312[(12)]);
var inst_39271 = cljs.core._nth(inst_39263,inst_39265);
var state_39312__$1 = state_39312;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_39312__$1,(13),out,inst_39271);
} else {
if((state_val_39313 === (18))){
var inst_39277 = (state_39312[(7)]);
var inst_39287 = cljs.core.first(inst_39277);
var state_39312__$1 = state_39312;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_39312__$1,(20),out,inst_39287);
} else {
if((state_val_39313 === (8))){
var inst_39265 = (state_39312[(12)]);
var inst_39264 = (state_39312[(11)]);
var inst_39268 = (inst_39265 < inst_39264);
var inst_39269 = inst_39268;
var state_39312__$1 = state_39312;
if(cljs.core.truth_(inst_39269)){
var statearr_39377_40645 = state_39312__$1;
(statearr_39377_40645[(1)] = (10));

} else {
var statearr_39378_40646 = state_39312__$1;
(statearr_39378_40646[(1)] = (11));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$mapcat_STAR__$_state_machine__36914__auto__ = null;
var cljs$core$async$mapcat_STAR__$_state_machine__36914__auto____0 = (function (){
var statearr_39382 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_39382[(0)] = cljs$core$async$mapcat_STAR__$_state_machine__36914__auto__);

(statearr_39382[(1)] = (1));

return statearr_39382;
});
var cljs$core$async$mapcat_STAR__$_state_machine__36914__auto____1 = (function (state_39312){
while(true){
var ret_value__36915__auto__ = (function (){try{while(true){
var result__36916__auto__ = switch__36913__auto__(state_39312);
if(cljs.core.keyword_identical_QMARK_(result__36916__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__36916__auto__;
}
break;
}
}catch (e39383){var ex__36917__auto__ = e39383;
var statearr_39384_40648 = state_39312;
(statearr_39384_40648[(2)] = ex__36917__auto__);


if(cljs.core.seq((state_39312[(4)]))){
var statearr_39385_40653 = state_39312;
(statearr_39385_40653[(1)] = cljs.core.first((state_39312[(4)])));

} else {
throw ex__36917__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__36915__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__40654 = state_39312;
state_39312 = G__40654;
continue;
} else {
return ret_value__36915__auto__;
}
break;
}
});
cljs$core$async$mapcat_STAR__$_state_machine__36914__auto__ = function(state_39312){
switch(arguments.length){
case 0:
return cljs$core$async$mapcat_STAR__$_state_machine__36914__auto____0.call(this);
case 1:
return cljs$core$async$mapcat_STAR__$_state_machine__36914__auto____1.call(this,state_39312);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$mapcat_STAR__$_state_machine__36914__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$mapcat_STAR__$_state_machine__36914__auto____0;
cljs$core$async$mapcat_STAR__$_state_machine__36914__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$mapcat_STAR__$_state_machine__36914__auto____1;
return cljs$core$async$mapcat_STAR__$_state_machine__36914__auto__;
})()
})();
var state__37426__auto__ = (function (){var statearr_39386 = f__37425__auto__();
(statearr_39386[(6)] = c__37424__auto__);

return statearr_39386;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__37426__auto__);
}));

return c__37424__auto__;
});
/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.mapcat_LT_ = (function cljs$core$async$mapcat_LT_(var_args){
var G__39388 = arguments.length;
switch (G__39388) {
case 2:
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$2 = (function (f,in$){
return cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$3(f,in$,null);
}));

(cljs.core.async.mapcat_LT_.cljs$core$IFn$_invoke$arity$3 = (function (f,in$,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
cljs.core.async.mapcat_STAR_(f,in$,out);

return out;
}));

(cljs.core.async.mapcat_LT_.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.mapcat_GT_ = (function cljs$core$async$mapcat_GT_(var_args){
var G__39390 = arguments.length;
switch (G__39390) {
case 2:
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$2 = (function (f,out){
return cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$3(f,out,null);
}));

(cljs.core.async.mapcat_GT_.cljs$core$IFn$_invoke$arity$3 = (function (f,out,buf_or_n){
var in$ = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
cljs.core.async.mapcat_STAR_(f,in$,out);

return in$;
}));

(cljs.core.async.mapcat_GT_.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.unique = (function cljs$core$async$unique(var_args){
var G__39392 = arguments.length;
switch (G__39392) {
case 1:
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$1((arguments[(0)]));

break;
case 2:
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.unique.cljs$core$IFn$_invoke$arity$1 = (function (ch){
return cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2(ch,null);
}));

(cljs.core.async.unique.cljs$core$IFn$_invoke$arity$2 = (function (ch,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__37424__auto___40662 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__37425__auto__ = (function (){var switch__36913__auto__ = (function (state_39416){
var state_val_39418 = (state_39416[(1)]);
if((state_val_39418 === (7))){
var inst_39411 = (state_39416[(2)]);
var state_39416__$1 = state_39416;
var statearr_39419_40663 = state_39416__$1;
(statearr_39419_40663[(2)] = inst_39411);

(statearr_39419_40663[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39418 === (1))){
var inst_39393 = null;
var state_39416__$1 = (function (){var statearr_39420 = state_39416;
(statearr_39420[(7)] = inst_39393);

return statearr_39420;
})();
var statearr_39421_40667 = state_39416__$1;
(statearr_39421_40667[(2)] = null);

(statearr_39421_40667[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39418 === (4))){
var inst_39396 = (state_39416[(8)]);
var inst_39396__$1 = (state_39416[(2)]);
var inst_39397 = (inst_39396__$1 == null);
var inst_39398 = cljs.core.not(inst_39397);
var state_39416__$1 = (function (){var statearr_39425 = state_39416;
(statearr_39425[(8)] = inst_39396__$1);

return statearr_39425;
})();
if(inst_39398){
var statearr_39426_40669 = state_39416__$1;
(statearr_39426_40669[(1)] = (5));

} else {
var statearr_39427_40670 = state_39416__$1;
(statearr_39427_40670[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39418 === (6))){
var state_39416__$1 = state_39416;
var statearr_39428_40671 = state_39416__$1;
(statearr_39428_40671[(2)] = null);

(statearr_39428_40671[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39418 === (3))){
var inst_39413 = (state_39416[(2)]);
var inst_39414 = cljs.core.async.close_BANG_(out);
var state_39416__$1 = (function (){var statearr_39429 = state_39416;
(statearr_39429[(9)] = inst_39413);

return statearr_39429;
})();
return cljs.core.async.impl.ioc_helpers.return_chan(state_39416__$1,inst_39414);
} else {
if((state_val_39418 === (2))){
var state_39416__$1 = state_39416;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_39416__$1,(4),ch);
} else {
if((state_val_39418 === (11))){
var inst_39396 = (state_39416[(8)]);
var inst_39405 = (state_39416[(2)]);
var inst_39393 = inst_39396;
var state_39416__$1 = (function (){var statearr_39430 = state_39416;
(statearr_39430[(10)] = inst_39405);

(statearr_39430[(7)] = inst_39393);

return statearr_39430;
})();
var statearr_39434_40673 = state_39416__$1;
(statearr_39434_40673[(2)] = null);

(statearr_39434_40673[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39418 === (9))){
var inst_39396 = (state_39416[(8)]);
var state_39416__$1 = state_39416;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_39416__$1,(11),out,inst_39396);
} else {
if((state_val_39418 === (5))){
var inst_39396 = (state_39416[(8)]);
var inst_39393 = (state_39416[(7)]);
var inst_39400 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_39396,inst_39393);
var state_39416__$1 = state_39416;
if(inst_39400){
var statearr_39436_40674 = state_39416__$1;
(statearr_39436_40674[(1)] = (8));

} else {
var statearr_39437_40676 = state_39416__$1;
(statearr_39437_40676[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39418 === (10))){
var inst_39408 = (state_39416[(2)]);
var state_39416__$1 = state_39416;
var statearr_39438_40678 = state_39416__$1;
(statearr_39438_40678[(2)] = inst_39408);

(statearr_39438_40678[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39418 === (8))){
var inst_39393 = (state_39416[(7)]);
var tmp39435 = inst_39393;
var inst_39393__$1 = tmp39435;
var state_39416__$1 = (function (){var statearr_39439 = state_39416;
(statearr_39439[(7)] = inst_39393__$1);

return statearr_39439;
})();
var statearr_39440_40684 = state_39416__$1;
(statearr_39440_40684[(2)] = null);

(statearr_39440_40684[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__36914__auto__ = null;
var cljs$core$async$state_machine__36914__auto____0 = (function (){
var statearr_39441 = [null,null,null,null,null,null,null,null,null,null,null];
(statearr_39441[(0)] = cljs$core$async$state_machine__36914__auto__);

(statearr_39441[(1)] = (1));

return statearr_39441;
});
var cljs$core$async$state_machine__36914__auto____1 = (function (state_39416){
while(true){
var ret_value__36915__auto__ = (function (){try{while(true){
var result__36916__auto__ = switch__36913__auto__(state_39416);
if(cljs.core.keyword_identical_QMARK_(result__36916__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__36916__auto__;
}
break;
}
}catch (e39442){var ex__36917__auto__ = e39442;
var statearr_39443_40688 = state_39416;
(statearr_39443_40688[(2)] = ex__36917__auto__);


if(cljs.core.seq((state_39416[(4)]))){
var statearr_39444_40691 = state_39416;
(statearr_39444_40691[(1)] = cljs.core.first((state_39416[(4)])));

} else {
throw ex__36917__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__36915__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__40692 = state_39416;
state_39416 = G__40692;
continue;
} else {
return ret_value__36915__auto__;
}
break;
}
});
cljs$core$async$state_machine__36914__auto__ = function(state_39416){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__36914__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__36914__auto____1.call(this,state_39416);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__36914__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__36914__auto____0;
cljs$core$async$state_machine__36914__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__36914__auto____1;
return cljs$core$async$state_machine__36914__auto__;
})()
})();
var state__37426__auto__ = (function (){var statearr_39445 = f__37425__auto__();
(statearr_39445[(6)] = c__37424__auto___40662);

return statearr_39445;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__37426__auto__);
}));


return out;
}));

(cljs.core.async.unique.cljs$lang$maxFixedArity = 2);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.partition = (function cljs$core$async$partition(var_args){
var G__39448 = arguments.length;
switch (G__39448) {
case 2:
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.partition.cljs$core$IFn$_invoke$arity$2 = (function (n,ch){
return cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3(n,ch,null);
}));

(cljs.core.async.partition.cljs$core$IFn$_invoke$arity$3 = (function (n,ch,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__37424__auto___40696 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__37425__auto__ = (function (){var switch__36913__auto__ = (function (state_39494){
var state_val_39495 = (state_39494[(1)]);
if((state_val_39495 === (7))){
var inst_39486 = (state_39494[(2)]);
var state_39494__$1 = state_39494;
var statearr_39496_40697 = state_39494__$1;
(statearr_39496_40697[(2)] = inst_39486);

(statearr_39496_40697[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39495 === (1))){
var inst_39449 = (new Array(n));
var inst_39450 = inst_39449;
var inst_39453 = (0);
var state_39494__$1 = (function (){var statearr_39497 = state_39494;
(statearr_39497[(7)] = inst_39450);

(statearr_39497[(8)] = inst_39453);

return statearr_39497;
})();
var statearr_39498_40704 = state_39494__$1;
(statearr_39498_40704[(2)] = null);

(statearr_39498_40704[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39495 === (4))){
var inst_39458 = (state_39494[(9)]);
var inst_39458__$1 = (state_39494[(2)]);
var inst_39459 = (inst_39458__$1 == null);
var inst_39460 = cljs.core.not(inst_39459);
var state_39494__$1 = (function (){var statearr_39499 = state_39494;
(statearr_39499[(9)] = inst_39458__$1);

return statearr_39499;
})();
if(inst_39460){
var statearr_39500_40705 = state_39494__$1;
(statearr_39500_40705[(1)] = (5));

} else {
var statearr_39501_40706 = state_39494__$1;
(statearr_39501_40706[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39495 === (15))){
var inst_39480 = (state_39494[(2)]);
var state_39494__$1 = state_39494;
var statearr_39502_40707 = state_39494__$1;
(statearr_39502_40707[(2)] = inst_39480);

(statearr_39502_40707[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39495 === (13))){
var state_39494__$1 = state_39494;
var statearr_39503_40708 = state_39494__$1;
(statearr_39503_40708[(2)] = null);

(statearr_39503_40708[(1)] = (14));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39495 === (6))){
var inst_39453 = (state_39494[(8)]);
var inst_39476 = (inst_39453 > (0));
var state_39494__$1 = state_39494;
if(cljs.core.truth_(inst_39476)){
var statearr_39504_40709 = state_39494__$1;
(statearr_39504_40709[(1)] = (12));

} else {
var statearr_39505_40710 = state_39494__$1;
(statearr_39505_40710[(1)] = (13));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39495 === (3))){
var inst_39488 = (state_39494[(2)]);
var state_39494__$1 = state_39494;
return cljs.core.async.impl.ioc_helpers.return_chan(state_39494__$1,inst_39488);
} else {
if((state_val_39495 === (12))){
var inst_39450 = (state_39494[(7)]);
var inst_39478 = cljs.core.vec(inst_39450);
var state_39494__$1 = state_39494;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_39494__$1,(15),out,inst_39478);
} else {
if((state_val_39495 === (2))){
var state_39494__$1 = state_39494;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_39494__$1,(4),ch);
} else {
if((state_val_39495 === (11))){
var inst_39470 = (state_39494[(2)]);
var inst_39471 = (new Array(n));
var inst_39450 = inst_39471;
var inst_39453 = (0);
var state_39494__$1 = (function (){var statearr_39508 = state_39494;
(statearr_39508[(10)] = inst_39470);

(statearr_39508[(7)] = inst_39450);

(statearr_39508[(8)] = inst_39453);

return statearr_39508;
})();
var statearr_39509_40717 = state_39494__$1;
(statearr_39509_40717[(2)] = null);

(statearr_39509_40717[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39495 === (9))){
var inst_39450 = (state_39494[(7)]);
var inst_39468 = cljs.core.vec(inst_39450);
var state_39494__$1 = state_39494;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_39494__$1,(11),out,inst_39468);
} else {
if((state_val_39495 === (5))){
var inst_39450 = (state_39494[(7)]);
var inst_39453 = (state_39494[(8)]);
var inst_39458 = (state_39494[(9)]);
var inst_39463 = (state_39494[(11)]);
var inst_39462 = (inst_39450[inst_39453] = inst_39458);
var inst_39463__$1 = (inst_39453 + (1));
var inst_39464 = (inst_39463__$1 < n);
var state_39494__$1 = (function (){var statearr_39510 = state_39494;
(statearr_39510[(12)] = inst_39462);

(statearr_39510[(11)] = inst_39463__$1);

return statearr_39510;
})();
if(cljs.core.truth_(inst_39464)){
var statearr_39511_40721 = state_39494__$1;
(statearr_39511_40721[(1)] = (8));

} else {
var statearr_39512_40725 = state_39494__$1;
(statearr_39512_40725[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39495 === (14))){
var inst_39483 = (state_39494[(2)]);
var inst_39484 = cljs.core.async.close_BANG_(out);
var state_39494__$1 = (function (){var statearr_39514 = state_39494;
(statearr_39514[(13)] = inst_39483);

return statearr_39514;
})();
var statearr_39515_40727 = state_39494__$1;
(statearr_39515_40727[(2)] = inst_39484);

(statearr_39515_40727[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39495 === (10))){
var inst_39474 = (state_39494[(2)]);
var state_39494__$1 = state_39494;
var statearr_39516_40728 = state_39494__$1;
(statearr_39516_40728[(2)] = inst_39474);

(statearr_39516_40728[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39495 === (8))){
var inst_39450 = (state_39494[(7)]);
var inst_39463 = (state_39494[(11)]);
var tmp39513 = inst_39450;
var inst_39450__$1 = tmp39513;
var inst_39453 = inst_39463;
var state_39494__$1 = (function (){var statearr_39517 = state_39494;
(statearr_39517[(7)] = inst_39450__$1);

(statearr_39517[(8)] = inst_39453);

return statearr_39517;
})();
var statearr_39518_40729 = state_39494__$1;
(statearr_39518_40729[(2)] = null);

(statearr_39518_40729[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__36914__auto__ = null;
var cljs$core$async$state_machine__36914__auto____0 = (function (){
var statearr_39519 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_39519[(0)] = cljs$core$async$state_machine__36914__auto__);

(statearr_39519[(1)] = (1));

return statearr_39519;
});
var cljs$core$async$state_machine__36914__auto____1 = (function (state_39494){
while(true){
var ret_value__36915__auto__ = (function (){try{while(true){
var result__36916__auto__ = switch__36913__auto__(state_39494);
if(cljs.core.keyword_identical_QMARK_(result__36916__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__36916__auto__;
}
break;
}
}catch (e39520){var ex__36917__auto__ = e39520;
var statearr_39521_40732 = state_39494;
(statearr_39521_40732[(2)] = ex__36917__auto__);


if(cljs.core.seq((state_39494[(4)]))){
var statearr_39522_40733 = state_39494;
(statearr_39522_40733[(1)] = cljs.core.first((state_39494[(4)])));

} else {
throw ex__36917__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__36915__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__40734 = state_39494;
state_39494 = G__40734;
continue;
} else {
return ret_value__36915__auto__;
}
break;
}
});
cljs$core$async$state_machine__36914__auto__ = function(state_39494){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__36914__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__36914__auto____1.call(this,state_39494);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__36914__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__36914__auto____0;
cljs$core$async$state_machine__36914__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__36914__auto____1;
return cljs$core$async$state_machine__36914__auto__;
})()
})();
var state__37426__auto__ = (function (){var statearr_39523 = f__37425__auto__();
(statearr_39523[(6)] = c__37424__auto___40696);

return statearr_39523;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__37426__auto__);
}));


return out;
}));

(cljs.core.async.partition.cljs$lang$maxFixedArity = 3);

/**
 * Deprecated - this function will be removed. Use transducer instead
 */
cljs.core.async.partition_by = (function cljs$core$async$partition_by(var_args){
var G__39529 = arguments.length;
switch (G__39529) {
case 2:
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$2((arguments[(0)]),(arguments[(1)]));

break;
case 3:
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3((arguments[(0)]),(arguments[(1)]),(arguments[(2)]));

break;
default:
throw (new Error(["Invalid arity: ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(arguments.length)].join('')));

}
});

(cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$2 = (function (f,ch){
return cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3(f,ch,null);
}));

(cljs.core.async.partition_by.cljs$core$IFn$_invoke$arity$3 = (function (f,ch,buf_or_n){
var out = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1(buf_or_n);
var c__37424__auto___40738 = cljs.core.async.chan.cljs$core$IFn$_invoke$arity$1((1));
cljs.core.async.impl.dispatch.run((function (){
var f__37425__auto__ = (function (){var switch__36913__auto__ = (function (state_39577){
var state_val_39578 = (state_39577[(1)]);
if((state_val_39578 === (7))){
var inst_39573 = (state_39577[(2)]);
var state_39577__$1 = state_39577;
var statearr_39579_40740 = state_39577__$1;
(statearr_39579_40740[(2)] = inst_39573);

(statearr_39579_40740[(1)] = (3));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39578 === (1))){
var inst_39533 = [];
var inst_39534 = inst_39533;
var inst_39535 = new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123);
var state_39577__$1 = (function (){var statearr_39580 = state_39577;
(statearr_39580[(7)] = inst_39534);

(statearr_39580[(8)] = inst_39535);

return statearr_39580;
})();
var statearr_39581_40743 = state_39577__$1;
(statearr_39581_40743[(2)] = null);

(statearr_39581_40743[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39578 === (4))){
var inst_39538 = (state_39577[(9)]);
var inst_39538__$1 = (state_39577[(2)]);
var inst_39539 = (inst_39538__$1 == null);
var inst_39540 = cljs.core.not(inst_39539);
var state_39577__$1 = (function (){var statearr_39582 = state_39577;
(statearr_39582[(9)] = inst_39538__$1);

return statearr_39582;
})();
if(inst_39540){
var statearr_39584_40747 = state_39577__$1;
(statearr_39584_40747[(1)] = (5));

} else {
var statearr_39585_40748 = state_39577__$1;
(statearr_39585_40748[(1)] = (6));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39578 === (15))){
var inst_39534 = (state_39577[(7)]);
var inst_39565 = cljs.core.vec(inst_39534);
var state_39577__$1 = state_39577;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_39577__$1,(18),out,inst_39565);
} else {
if((state_val_39578 === (13))){
var inst_39560 = (state_39577[(2)]);
var state_39577__$1 = state_39577;
var statearr_39586_40751 = state_39577__$1;
(statearr_39586_40751[(2)] = inst_39560);

(statearr_39586_40751[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39578 === (6))){
var inst_39534 = (state_39577[(7)]);
var inst_39562 = inst_39534.length;
var inst_39563 = (inst_39562 > (0));
var state_39577__$1 = state_39577;
if(cljs.core.truth_(inst_39563)){
var statearr_39587_40754 = state_39577__$1;
(statearr_39587_40754[(1)] = (15));

} else {
var statearr_39588_40755 = state_39577__$1;
(statearr_39588_40755[(1)] = (16));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39578 === (17))){
var inst_39570 = (state_39577[(2)]);
var inst_39571 = cljs.core.async.close_BANG_(out);
var state_39577__$1 = (function (){var statearr_39589 = state_39577;
(statearr_39589[(10)] = inst_39570);

return statearr_39589;
})();
var statearr_39590_40756 = state_39577__$1;
(statearr_39590_40756[(2)] = inst_39571);

(statearr_39590_40756[(1)] = (7));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39578 === (3))){
var inst_39575 = (state_39577[(2)]);
var state_39577__$1 = state_39577;
return cljs.core.async.impl.ioc_helpers.return_chan(state_39577__$1,inst_39575);
} else {
if((state_val_39578 === (12))){
var inst_39534 = (state_39577[(7)]);
var inst_39553 = cljs.core.vec(inst_39534);
var state_39577__$1 = state_39577;
return cljs.core.async.impl.ioc_helpers.put_BANG_(state_39577__$1,(14),out,inst_39553);
} else {
if((state_val_39578 === (2))){
var state_39577__$1 = state_39577;
return cljs.core.async.impl.ioc_helpers.take_BANG_(state_39577__$1,(4),ch);
} else {
if((state_val_39578 === (11))){
var inst_39534 = (state_39577[(7)]);
var inst_39538 = (state_39577[(9)]);
var inst_39542 = (state_39577[(11)]);
var inst_39550 = inst_39534.push(inst_39538);
var tmp39591 = inst_39534;
var inst_39534__$1 = tmp39591;
var inst_39535 = inst_39542;
var state_39577__$1 = (function (){var statearr_39592 = state_39577;
(statearr_39592[(12)] = inst_39550);

(statearr_39592[(7)] = inst_39534__$1);

(statearr_39592[(8)] = inst_39535);

return statearr_39592;
})();
var statearr_39596_40767 = state_39577__$1;
(statearr_39596_40767[(2)] = null);

(statearr_39596_40767[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39578 === (9))){
var inst_39535 = (state_39577[(8)]);
var inst_39546 = cljs.core.keyword_identical_QMARK_(inst_39535,new cljs.core.Keyword("cljs.core.async","nothing","cljs.core.async/nothing",-69252123));
var state_39577__$1 = state_39577;
var statearr_39597_40768 = state_39577__$1;
(statearr_39597_40768[(2)] = inst_39546);

(statearr_39597_40768[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39578 === (5))){
var inst_39538 = (state_39577[(9)]);
var inst_39542 = (state_39577[(11)]);
var inst_39535 = (state_39577[(8)]);
var inst_39543 = (state_39577[(13)]);
var inst_39542__$1 = (f.cljs$core$IFn$_invoke$arity$1 ? f.cljs$core$IFn$_invoke$arity$1(inst_39538) : f.call(null,inst_39538));
var inst_39543__$1 = cljs.core._EQ_.cljs$core$IFn$_invoke$arity$2(inst_39542__$1,inst_39535);
var state_39577__$1 = (function (){var statearr_39598 = state_39577;
(statearr_39598[(11)] = inst_39542__$1);

(statearr_39598[(13)] = inst_39543__$1);

return statearr_39598;
})();
if(inst_39543__$1){
var statearr_39599_40778 = state_39577__$1;
(statearr_39599_40778[(1)] = (8));

} else {
var statearr_39600_40779 = state_39577__$1;
(statearr_39600_40779[(1)] = (9));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39578 === (14))){
var inst_39538 = (state_39577[(9)]);
var inst_39542 = (state_39577[(11)]);
var inst_39555 = (state_39577[(2)]);
var inst_39556 = [];
var inst_39557 = inst_39556.push(inst_39538);
var inst_39534 = inst_39556;
var inst_39535 = inst_39542;
var state_39577__$1 = (function (){var statearr_39601 = state_39577;
(statearr_39601[(14)] = inst_39555);

(statearr_39601[(15)] = inst_39557);

(statearr_39601[(7)] = inst_39534);

(statearr_39601[(8)] = inst_39535);

return statearr_39601;
})();
var statearr_39602_40793 = state_39577__$1;
(statearr_39602_40793[(2)] = null);

(statearr_39602_40793[(1)] = (2));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39578 === (16))){
var state_39577__$1 = state_39577;
var statearr_39603_40798 = state_39577__$1;
(statearr_39603_40798[(2)] = null);

(statearr_39603_40798[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39578 === (10))){
var inst_39548 = (state_39577[(2)]);
var state_39577__$1 = state_39577;
if(cljs.core.truth_(inst_39548)){
var statearr_39604_40800 = state_39577__$1;
(statearr_39604_40800[(1)] = (11));

} else {
var statearr_39605_40801 = state_39577__$1;
(statearr_39605_40801[(1)] = (12));

}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39578 === (18))){
var inst_39567 = (state_39577[(2)]);
var state_39577__$1 = state_39577;
var statearr_39606_40802 = state_39577__$1;
(statearr_39606_40802[(2)] = inst_39567);

(statearr_39606_40802[(1)] = (17));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
if((state_val_39578 === (8))){
var inst_39543 = (state_39577[(13)]);
var state_39577__$1 = state_39577;
var statearr_39607_40807 = state_39577__$1;
(statearr_39607_40807[(2)] = inst_39543);

(statearr_39607_40807[(1)] = (10));


return new cljs.core.Keyword(null,"recur","recur",-437573268);
} else {
return null;
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
}
});
return (function() {
var cljs$core$async$state_machine__36914__auto__ = null;
var cljs$core$async$state_machine__36914__auto____0 = (function (){
var statearr_39608 = [null,null,null,null,null,null,null,null,null,null,null,null,null,null,null,null];
(statearr_39608[(0)] = cljs$core$async$state_machine__36914__auto__);

(statearr_39608[(1)] = (1));

return statearr_39608;
});
var cljs$core$async$state_machine__36914__auto____1 = (function (state_39577){
while(true){
var ret_value__36915__auto__ = (function (){try{while(true){
var result__36916__auto__ = switch__36913__auto__(state_39577);
if(cljs.core.keyword_identical_QMARK_(result__36916__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
continue;
} else {
return result__36916__auto__;
}
break;
}
}catch (e39609){var ex__36917__auto__ = e39609;
var statearr_39610_40808 = state_39577;
(statearr_39610_40808[(2)] = ex__36917__auto__);


if(cljs.core.seq((state_39577[(4)]))){
var statearr_39611_40810 = state_39577;
(statearr_39611_40810[(1)] = cljs.core.first((state_39577[(4)])));

} else {
throw ex__36917__auto__;
}

return new cljs.core.Keyword(null,"recur","recur",-437573268);
}})();
if(cljs.core.keyword_identical_QMARK_(ret_value__36915__auto__,new cljs.core.Keyword(null,"recur","recur",-437573268))){
var G__40811 = state_39577;
state_39577 = G__40811;
continue;
} else {
return ret_value__36915__auto__;
}
break;
}
});
cljs$core$async$state_machine__36914__auto__ = function(state_39577){
switch(arguments.length){
case 0:
return cljs$core$async$state_machine__36914__auto____0.call(this);
case 1:
return cljs$core$async$state_machine__36914__auto____1.call(this,state_39577);
}
throw(new Error('Invalid arity: ' + arguments.length));
};
cljs$core$async$state_machine__36914__auto__.cljs$core$IFn$_invoke$arity$0 = cljs$core$async$state_machine__36914__auto____0;
cljs$core$async$state_machine__36914__auto__.cljs$core$IFn$_invoke$arity$1 = cljs$core$async$state_machine__36914__auto____1;
return cljs$core$async$state_machine__36914__auto__;
})()
})();
var state__37426__auto__ = (function (){var statearr_39612 = f__37425__auto__();
(statearr_39612[(6)] = c__37424__auto___40738);

return statearr_39612;
})();
return cljs.core.async.impl.ioc_helpers.run_state_machine_wrapped(state__37426__auto__);
}));


return out;
}));

(cljs.core.async.partition_by.cljs$lang$maxFixedArity = 3);


//# sourceMappingURL=cljs.core.async.js.map
