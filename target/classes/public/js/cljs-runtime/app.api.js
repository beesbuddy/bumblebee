goog.provide('app.api');
var module$node_modules$axios$dist$browser$axios_cjs=shadow.js.require("module$node_modules$axios$dist$browser$axios_cjs", {});
if((typeof app !== 'undefined') && (typeof app.api !== 'undefined') && (typeof app.api.client !== 'undefined')){
} else {
app.api.client = (function (){var G__32488 = module$node_modules$axios$dist$browser$axios_cjs.create(({}));
G__32488.interceptors.request.use((function (config){
var temp__5825__auto___32523 = new cljs.core.Keyword(null,"token","token",-1211463215).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(app.auth.state));
if(cljs.core.truth_(temp__5825__auto___32523)){
var t_32524 = temp__5825__auto___32523;
(config.headers.Authorization = ["Bearer ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"access","access",2027349272).cljs$core$IFn$_invoke$arity$1(t_32524))].join(''));
} else {
}

return config;
}));

return G__32488;
})();
}
app.api.get_json = (function app$api$get_json(url){
return app.api.client.get(url).then((function (resp){
return resp.data;
}));
});

//# sourceMappingURL=app.api.js.map
