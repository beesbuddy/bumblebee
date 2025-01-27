package bumblebee.core.util

import bumblebee.core.Constants
import cn.hutool.core.util.StrUtil


object ScopeUtil {
    fun getMultipleScopeList(scope: String): List<List<String>> {
        val multipleScopes =  scope.split(Constants.SCOPE_OR)

        return multipleScopes.map { getScopeList(it) }
    }

    fun getScopeList(scope: String): List<String> {
        if (StrUtil.isBlank(scope)) {
            return ArrayList()
        }

        if (scope.startsWith(Constants.SLASH) || scope.endsWith(Constants.SLASH)) {
            return ArrayList()
        }

        if (scope.startsWith(Constants.SCOPE_ROOT)) {
            return ArrayList()
        }

        val tokenArray: Array<String> = scope.split(Constants.SLASH.toRegex()).dropLastWhile { it.isEmpty() }
            .toTypedArray()
        if (tokenArray.isEmpty()) {
            return ArrayList()
        }

        val tokenList = ArrayList<String>()

        for (i in tokenArray.indices) {
            val token = tokenArray[i]
            if (StrUtil.isBlank(token)) {
                return ArrayList()
            }
            if (Constants.SCOPE_MULTI == token && i != tokenArray.size - 1) {
                return ArrayList()
            }
            if (Constants.SCOPE_MULTI != token && token.contains(Constants.SCOPE_MULTI)) {
                return ArrayList()
            }
            if (Constants.SCOPE_SINGLE != token && token.contains(Constants.SCOPE_SINGLE)) {
                return ArrayList()
            }
            tokenList.add(token)
        }
        return tokenList
    }

    fun orMatch(orSubScopeList: List<List<String>>, matchScopeList: List<String>): Boolean {
        return orSubScopeList.fold(false) { acc, subScopeList -> acc || exactMatch(subScopeList, matchScopeList) }
    }

    fun andMatch(orSubScopeList: List<List<String>>, matchScopeList: List<String>): Boolean {
        return orSubScopeList.fold(false) { acc, subScopeList -> acc && exactMatch(subScopeList, matchScopeList) }
    }

    fun exactMatch(subScopeList: List<String?>, matchScopeList: List<String>): Boolean {
        var i = 0
        while (i < subScopeList.size) {
            val subToken = subScopeList[i]
            if (Constants.SCOPE_MULTI != subToken && Constants.SCOPE_SINGLE != subToken) {
                if (i >= matchScopeList.size) {
                    return false
                }
                val matchToken = matchScopeList[i]
                if (subToken != matchToken) {
                    return false
                }
            } else {
                if (Constants.SCOPE_MULTI == subToken) {
                    return true
                }
            }
            i++
        }

        return i == matchScopeList.size
    }


}
