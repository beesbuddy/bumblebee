goog.provide('uix.validate');
uix.validate.set_props_assertion_enabled_BANG_ = (function uix$validate$set_props_assertion_enabled_BANG_(enabled_QMARK_){
return cljs.core.reset_BANG_(uix.core.props_assert_fn,(function (pred,val){
if(cljs.core.truth_(enabled_QMARK_)){
var msg__52722__auto__ = (function (){var sb__5670__auto__ = (new goog.string.StringBuffer());
var _STAR_print_newline_STAR__orig_val__52735_52739 = cljs.core._STAR_print_newline_STAR_;
var _STAR_print_fn_STAR__orig_val__52736_52740 = cljs.core._STAR_print_fn_STAR_;
var _STAR_print_newline_STAR__temp_val__52737_52741 = true;
var _STAR_print_fn_STAR__temp_val__52738_52742 = (function (x__5671__auto__){
return sb__5670__auto__.append(x__5671__auto__);
});
(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__temp_val__52737_52741);

(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__temp_val__52738_52742);

try{expound.alpha.expound.cljs$core$IFn$_invoke$arity$2(pred,val);
}finally {(cljs.core._STAR_print_fn_STAR_ = _STAR_print_fn_STAR__orig_val__52736_52740);

(cljs.core._STAR_print_newline_STAR_ = _STAR_print_newline_STAR__orig_val__52735_52739);
}
return cljs.core.str.cljs$core$IFn$_invoke$arity$1(sb__5670__auto__);
})();
if(clojure.string.includes_QMARK_(msg__52722__auto__,"Success!")){
return true;
} else {
return preo.core.throw_error_BANG_(["Invalid argument: val","\n",msg__52722__auto__].join(''));
}
} else {
return true;
}
}));
});

//# sourceMappingURL=uix.validate.js.map
