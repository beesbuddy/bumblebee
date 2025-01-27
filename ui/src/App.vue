<script setup lang="ts">
import { ref } from "vue"
import { Menu as IconMenu, Setting as IconSetting, ArrowLeftBold, ArrowRightBold, View as IconView } from "@element-plus/icons-vue"

const isCollapse = ref(false)

const handleSideMenu = () => {
    isCollapse.value = !isCollapse.value
}
</script>

<template>
    <div class="layout">
        <el-container>
            <el-menu default-active="/" class="sidenav" :collapse="isCollapse" :router="true">
                <el-menu-item index="/">
                    <el-icon><icon-menu /></el-icon>
                    <template #title> About </template>
                </el-menu-item>
                <el-menu-item index="/debug">
                    <el-icon>
                        <icon-view />
                    </el-icon>
                    <template #title> Debug </template>
                </el-menu-item>
                <el-menu-item index="/setting">
                    <el-icon>
                        <icon-setting />
                    </el-icon>
                    <template #title> Setting </template>
                </el-menu-item>
            </el-menu>

            <el-container>
                <el-header class="mt-4">
                    <el-button :icon="isCollapse ? ArrowRightBold : ArrowLeftBold" size="large" circle @click="handleSideMenu" />
                </el-header>
                <el-main><router-view /></el-main>
            </el-container>
        </el-container>
    </div>
</template>

<style>
.sidenav:not(.el-menu--collapse) {
    width: 200px;
}

.sidenav:is(.el-menu--collapse) {
    min-width: 63px;
}
</style>
