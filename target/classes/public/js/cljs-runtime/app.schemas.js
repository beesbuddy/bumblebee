goog.provide('app.schemas');
app.schemas.User = new cljs.core.PersistentVector(null, 3, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"map","map",1371690461),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"id","id",-1388402092),cljs.core.int_QMARK_], null),new cljs.core.PersistentVector(null, 2, 5, cljs.core.PersistentVector.EMPTY_NODE, [new cljs.core.Keyword(null,"name","name",1843675177),cljs.core.string_QMARK_], null)], null);
app.schemas.valid_user_QMARK_ = (function app$schemas$valid_user_QMARK_(x){
return malli.core.validate.cljs$core$IFn$_invoke$arity$2(app.schemas.User,x);
});

//# sourceMappingURL=app.schemas.js.map
