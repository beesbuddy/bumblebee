package bumblebee.core.subscription

import bumblebee.core.Constants
import cn.hutool.core.collection.ConcurrentHashSet
import cn.hutool.core.util.StrUtil
import com.alibaba.fastjson.JSON
import com.alibaba.fastjson.annotation.JSONField
import java.util.*
import java.util.concurrent.atomic.AtomicReference


class SubWildcardTree {
    private var root: SubNodeWrapper? = null

    fun init() {
        root = SubNodeWrapper(SubNode(Constants.SCOPE_ROOT, Constants.SCOPE_ROOT))
    }

    fun add(topicTokenList: List<String>, subscription: Subscription) {
        var res: Action
        do {
            res = insert(topicTokenList, subscription)
        } while (res == Action.REPEAT)
    }

    private fun insert(topicTokenList: List<String>, subscription: Subscription): Action {
        var matchNodeWrapper = this.root
        var tokenMatchIndex = -1
        for (i in topicTokenList.indices) {
            val subNodeWrapper = matchNodeWrapper!!.mainNode().matchChild(topicTokenList[i]) ?: break
            matchNodeWrapper = subNodeWrapper
            tokenMatchIndex = i
        }
        if (tokenMatchIndex == topicTokenList.size - 1) {
            val oldSubNode = matchNodeWrapper!!.mainNode()
            val updateSubNode = oldSubNode.copy()
            updateSubNode.subscriptions.add(subscription)
            return if (matchNodeWrapper.compareAndSet(oldSubNode, updateSubNode)) Action.OK else Action.REPEAT
        }
        val remainTokenList = topicTokenList.subList(tokenMatchIndex + 1, topicTokenList.size)
        val newSubNodeWrapper =
            buildNewSubNodeWrapperTree(matchNodeWrapper!!.mainNode().fullPath, remainTokenList, subscription)
        val oldSubNode = matchNodeWrapper.mainNode()
        val updateSubNode = oldSubNode.copy()
        updateSubNode.children.add(newSubNodeWrapper)
        return if (matchNodeWrapper.compareAndSet(oldSubNode, updateSubNode)) Action.OK else Action.REPEAT
    }

    private fun buildNewSubNodeWrapperTree(
        parentPath: String,
        tokenList: List<String>,
        subscription: Subscription
    ): SubNodeWrapper? {
        var headNodeWrapper: SubNodeWrapper? = null
        var currentNodeWrapper: SubNodeWrapper? = null
        for (remainToken in tokenList) {
            if (currentNodeWrapper == null) {
                val fullPath = java.lang.String.join(StrUtil.SLASH, parentPath, remainToken)
                headNodeWrapper = SubNodeWrapper(SubNode(remainToken, fullPath))
                currentNodeWrapper = headNodeWrapper
            } else {
                val pPath = currentNodeWrapper.mainNode().fullPath
                val fullPath = java.lang.String.join(StrUtil.SLASH, pPath, remainToken)
                val newNodeWrapper = SubNodeWrapper(SubNode(remainToken, fullPath))
                currentNodeWrapper.mainNode().children.add(newNodeWrapper)
                currentNodeWrapper = newNodeWrapper
            }
        }
        assert(currentNodeWrapper != null)
        currentNodeWrapper!!.mainNode().subscriptions.add(subscription)
        return headNodeWrapper
    }

    private fun delete(topicTokenList: List<String>, subscription: Subscription): Action {
        var matchNodeWrapper = this.root
        for (token in topicTokenList) {
            val subNodeWrapper = matchNodeWrapper!!.mainNode().matchChild(token) ?: break
            matchNodeWrapper = subNodeWrapper
        }
        if (matchNodeWrapper === this.root) {
            return Action.OK
        }
        val oldSubNode = matchNodeWrapper!!.mainNode()
        val updateSubNode = oldSubNode.copy()
        updateSubNode.subscriptions.remove(subscription)
        return if (matchNodeWrapper.compareAndSet(oldSubNode, updateSubNode)) Action.OK else Action.REPEAT
    }

    fun remove(topicTokenList: List<String>, subscription: Subscription) {
        var res: Action
        do {
            res = delete(topicTokenList, subscription)
        } while (res == Action.REPEAT)
    }

    fun getSubListFor(topicTokenList: List<String>): List<Subscription> {
        return ArrayList(match(topicTokenList))
    }

    private fun match(topicTokenList: List<String>): Set<Subscription> {
        return recursiveMatch(topicTokenList, this.root)
    }

    private fun recursiveMatch(topicTokenList: List<String>, subNodeWrapper: SubNodeWrapper?): Set<Subscription> {
        val currentNode = subNodeWrapper!!.mainNode()
        if (Constants.SCOPE_MULTI == currentNode.token) {
            return currentNode.subscriptions
        }
        val tokenSize = topicTokenList.size
        var currentToken: String = StrUtil.EMPTY
        var nextToken: String = StrUtil.EMPTY
        if (tokenSize > 0) {
            currentToken = topicTokenList[0]
        }
        if (tokenSize > 1) {
            nextToken = topicTokenList[1]
        }
        if (Constants.SCOPE_ROOT.equals(currentNode.token) || Constants.SCOPE_SINGLE.equals(currentNode.token) || currentNode.token == currentToken) {
            var subIndex = 0
            if (Constants.SCOPE_ROOT.equals(currentNode.token)) {
                nextToken = currentToken
                subIndex = -1
            }
            val subscriptions: MutableSet<Subscription> = HashSet()
            if (StrUtil.EMPTY == nextToken) {
                subscriptions.addAll(currentNode.subscriptions)
            } else {
                for (childSubNode in currentNode.children) {
                    val remainTopicTokenList = topicTokenList.subList(subIndex + 1, topicTokenList.size)
                    subscriptions.addAll(recursiveMatch(remainTopicTokenList, childSubNode))
                }
            }
            return subscriptions
        }
        return emptySet()
    }

    fun dumpTreeToJson(): String {
        return JSON.toJSONString(this.root)
    }

    private enum class Action {
        OK,
        REPEAT
    }


    private class SubNodeWrapper internal constructor(mainNode: SubNode?) {
        private val mainNode: AtomicReference<SubNode> = AtomicReference<SubNode>()

        init {
            this.mainNode.set(mainNode)
        }

        fun compareAndSet(old: SubNode?, newNode: SubNode?): Boolean {
            return mainNode.compareAndSet(old, newNode)
        }

        fun mainNode(): SubNode {
            return mainNode.get()
        }
    }

    private inner class SubNode {
        @JSONField(ordinal = 1)
        var fullPath: String

        @JSONField(ordinal = 2)
        var token: String

        @JSONField(ordinal = 3)
        var subscriptions: MutableSet<Subscription> = ConcurrentHashSet()

        @JSONField(ordinal = 4)
        var children: MutableSet<SubNodeWrapper?> = ConcurrentHashSet<SubNodeWrapper>()

        constructor(token: String, fullPath: String) {
            this.token = token
            this.fullPath = fullPath
        }

        constructor(
            token: String,
            fullPath: String,
            subscriptions: MutableSet<Subscription>,
            children: MutableSet<SubNodeWrapper?>
        ) {
            this.token = token
            this.fullPath = fullPath
            this.subscriptions = subscriptions
            this.children = children
        }

        fun copy(): SubNode {
            return SubNode(token, fullPath, subscriptions, children)
        }

        fun matchChild(token: String): SubNodeWrapper? {
            for (child in children) {
                if (child!!.mainNode().token == token) {
                    return child
                }
            }
            return null
        }

        override fun equals(other: Any?): Boolean {
            if (this === other) {
                return true
            }
            if (other == null || javaClass != other.javaClass) {
                return false
            }
            val subNode = other as SubNode
            return fullPath == subNode.fullPath
        }

        override fun hashCode(): Int {
            return Objects.hash(fullPath)
        }
    }

    companion object {
        fun isWildcardTopic(topic: String?): Boolean {
            return StrUtil.containsAny(topic, Constants.SCOPE_MULTI) || StrUtil.containsAny(
                topic,
                Constants.SCOPE_SINGLE
            )
        }
    }
}
