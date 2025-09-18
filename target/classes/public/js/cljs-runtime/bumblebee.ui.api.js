goog.provide('bumblebee.ui.api');
var module$node_modules$axios$dist$browser$axios_cjs=shadow.js.require("module$node_modules$axios$dist$browser$axios_cjs", {});
if((typeof bumblebee !== 'undefined') && (typeof bumblebee.ui !== 'undefined') && (typeof bumblebee.ui.api !== 'undefined') && (typeof bumblebee.ui.api.client !== 'undefined')){
} else {
bumblebee.ui.api.client = (function (){var G__31182 = module$node_modules$axios$dist$browser$axios_cjs.create(({}));
G__31182.interceptors.request.use((function (config){
var temp__5825__auto___31183 = new cljs.core.Keyword(null,"token","token",-1211463215).cljs$core$IFn$_invoke$arity$1(cljs.core.deref(bumblebee.ui.auth.state));
if(cljs.core.truth_(temp__5825__auto___31183)){
var t_31184 = temp__5825__auto___31183;
(config.headers.Authorization = ["Bearer ",cljs.core.str.cljs$core$IFn$_invoke$arity$1(new cljs.core.Keyword(null,"access","access",2027349272).cljs$core$IFn$_invoke$arity$1(t_31184))].join(''));
} else {
}

return config;
}));

return G__31182;
})();
}
bumblebee.ui.api.get_json = (function bumblebee$ui$api$get_json(url){
return bumblebee.ui.api.client.get(url).then((function (resp){
return resp.data;
}));
});

//# sourceMappingURL=bumblebee.ui.api.js.map
