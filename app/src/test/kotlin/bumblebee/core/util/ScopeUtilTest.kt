package bumblebee.core.util

import bumblebee.core.Constants
import cn.hutool.core.collection.CollUtil
import cn.hutool.core.util.StrUtil
import org.junit.jupiter.api.Assertions.*
import org.junit.jupiter.api.Test


class ScopeUtilTest {
    @Test
    fun getTokenList_WhenTokenProvided_ThenReturnTokenListAccordingRules() {
        var scope = "/"
        var scopeList: List<String?> = ScopeUtil.getScopeList(scope)

        assertTrue(CollUtil.isEmpty(scopeList))
        scope = "abc/"
        scopeList = ScopeUtil.getScopeList(scope)
        assertTrue(CollUtil.isEmpty(scopeList))
        scope = Constants.SCOPE_ROOT
        scopeList = ScopeUtil.getScopeList(scope)
        assertTrue(CollUtil.isEmpty(scopeList))
        scope = "+"
        scopeList = ScopeUtil.getScopeList(scope)
        assertTrue(scopeList.size == 1 && scope == scopeList[0])
        scope = "+/"
        scopeList = ScopeUtil.getScopeList(scope)
        assertTrue(CollUtil.isEmpty(scopeList))
        scope = "t1/++"
        scopeList = ScopeUtil.getScopeList(scope)
        assertTrue(CollUtil.isEmpty(scopeList))
        scope = "#/11"
        scopeList = ScopeUtil.getScopeList(scope)
        assertTrue(CollUtil.isEmpty(scopeList))
        scope = "+/"
        scopeList = ScopeUtil.getScopeList(scope)
        assertTrue(CollUtil.isEmpty(scopeList))
        scope = "a/+"
        scopeList = ScopeUtil.getScopeList(scope)
        assertEquals(scope, StrUtil.join(StrUtil.SLASH, scopeList))
        scope = "a/c d"
        scopeList = ScopeUtil.getScopeList(scope)
        assertEquals(scope, StrUtil.join(StrUtil.SLASH, scopeList))
        scope = "a/+/#11"
        scopeList = ScopeUtil.getScopeList(scope)
        assertTrue(CollUtil.isEmpty(scopeList))
        scope = "a/+/#"
        scopeList = ScopeUtil.getScopeList(scope)
        assertEquals(scope, StrUtil.join(StrUtil.SLASH, scopeList))

        var scopeSubList = ScopeUtil.getMultipleScopeList("a/+/#")
        assertTrue(scopeSubList.size == 1)
        scopeSubList = ScopeUtil.getMultipleScopeList("a/+/#|b/+")
        assertTrue(scopeSubList.size == 2)
        scopeSubList = ScopeUtil.getMultipleScopeList("a/+/#|b/+|c")
        assertTrue(scopeSubList.size == 3)
    }

    @Test
    fun match_WhenTokenListProvided_ThenExactMatchThemAccordingRules() {
        var subScopeList: List<String> = ScopeUtil.getScopeList("a/+")
        var matchScopeList: List<String> = ScopeUtil.getScopeList("a/b")
        var match = ScopeUtil.exactMatch(subScopeList, matchScopeList)

        assertTrue(match)
        subScopeList = ScopeUtil.getScopeList("a/b")
        matchScopeList = ScopeUtil.getScopeList("a/+")
        match = ScopeUtil.exactMatch(subScopeList, matchScopeList)
        assertFalse(match)
        subScopeList = ScopeUtil.getScopeList("a/+/+")
        matchScopeList = ScopeUtil.getScopeList("a/b")
        match = ScopeUtil.exactMatch(subScopeList, matchScopeList)
        assertFalse(match)
        subScopeList = ScopeUtil.getScopeList("a/+/+")
        matchScopeList = ScopeUtil.getScopeList("a/b/+")
        match = ScopeUtil.exactMatch(subScopeList, matchScopeList)
        assertTrue(match)
        subScopeList = ScopeUtil.getScopeList("a/#")
        matchScopeList = ScopeUtil.getScopeList("a/b/+")
        match = ScopeUtil.exactMatch(subScopeList, matchScopeList)
        assertTrue(match)
        subScopeList = ScopeUtil.getScopeList("a/b/+")
        matchScopeList = ScopeUtil.getScopeList("a/#")
        match = ScopeUtil.exactMatch(subScopeList, matchScopeList)
        assertFalse(match)
        subScopeList = ScopeUtil.getScopeList("a/b/+/c/+")
        matchScopeList = ScopeUtil.getScopeList("a/b/d/c/e")
        match = ScopeUtil.exactMatch(subScopeList, matchScopeList)
        assertTrue(match)
        subScopeList = ScopeUtil.getScopeList("+/b")
        matchScopeList = ScopeUtil.getScopeList("c/b")
        match = ScopeUtil.exactMatch(subScopeList, matchScopeList)
        assertTrue(match)
        subScopeList = ScopeUtil.getScopeList("+/b")
        matchScopeList = ScopeUtil.getScopeList("c/c")
        match = ScopeUtil.exactMatch(subScopeList, matchScopeList)
        assertFalse(match)

        var orSubScopeList = ScopeUtil.getMultipleScopeList("+/admin/+|+/topic/+")
        matchScopeList = ScopeUtil.getScopeList("web/topic/info")
        var orMatch = ScopeUtil.orMatch(orSubScopeList, matchScopeList)
        assertTrue(orMatch)

        orSubScopeList = ScopeUtil.getMultipleScopeList("#")
        matchScopeList = ScopeUtil.getScopeList("bumblebee/device")
        orMatch = ScopeUtil.orMatch(orSubScopeList, matchScopeList)
        assertTrue(orMatch)
    }
}