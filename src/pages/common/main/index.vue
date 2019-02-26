<style lang="less">
@import "./index.less";
</style>
<template>
  <div
    class="main"
    :class="{'main-hide-text': shrink}"
  >
    <Modal
      width="450"
      title="修改密码"
      v-model="visible1"
      @on-ok="ok"
      class="panel_list"
      @on-cancel="cancel"
    >
      <Form
        ref="formItem"
        :model="formItem"
        :label-width="60"
        :rules="ruleValidate"
      >
        <Row>
          <Col
          :xs="24" :sm="24" :md="24" :lg="24" span="24">
          <FormItem
            span="6"
            label="新密码:"
            prop="newLoginPwd"
          >
            <Input
              size="small"
              clearable
              type="password"
              v-model="formItem.newLoginPwd"
              placeholder="请输入新密码"
            ></Input>
          </FormItem>
          </Col>
          <Col>
          </Col>
        </Row>
      </Form>
    </Modal>
    <div
      class="sidebar-menu-con"
      :style="{width: shrink?'60px':'200px', overflow: shrink ? 'visible' : 'auto'}"
    >
      <scroll-bar
        :shrink="shrink"
        ref="scrollBar"
      >
        <shrinkable-menu
          :shrink="shrink"
          @on-change="handleSubmenuChange"
          :theme="menuTheme"
          :before-push="beforePush"
          :menu-list="menuList"
        >
          <div
            slot="top"
            class="logo-con"
            @click="$router.push('/home/home/home')"
          >
            <img
              v-show="!shrink"
              src="../../../assets/images/logo.png"
              key="max-logo"
            />
            <img
              v-show="shrink"
              src="../../../assets/images/logo-min.png"
              key="min-logo"
            />
          </div>
        </shrinkable-menu>
      </scroll-bar>
    </div>
    <div
      class="main-header-con"
      :style="{paddingLeft: shrink?'60px':'200px'}"
    >
      <div class="main-header">
        <div class="navicon-con">
          <Button
            :style="{transform: 'rotateZ(' + (this.shrink ? '-90' : '0') + 'deg)'}"
            type="text"
            @click="toggleClick"
          >
            <Icon
              type="md-menu"
              size="32"
            ></Icon>
          </Button>
        </div>
        <div class="header-middle-con">
          <div class="main-breadcrumb">
            <breadcrumb-nav :currentPath="currentPath"></breadcrumb-nav>
          </div>
        </div>
        <div class="header-avator-con">
          <full-screen
            v-model="isFullScreen"
            @on-change="fullscreenChange"
          ></full-screen>
          <lock-screen></lock-screen>
          <!-- <message-tip v-model="mesCount"></message-tip> -->
          <!-- <theme-switch></theme-switch> -->

          <div class="user-dropdown-menu-con">
            <Row
              type="flex"
              justify="end"
              align="middle"
              class="user-dropdown-innercon"
            >
              <Dropdown
                transfer
                trigger="click"
                @on-click="handleClickUserDropdown"
              >
                <a href="javascript:void(0)">
                  <span class="main-user-name">{{ userName }}</span><Icon type="md-arrow-dropdown"></Icon>
                </a>
                <DropdownMenu slot="list">
                  <DropdownItem name="editPwd"> 修改密码</DropdownItem>
                  <DropdownItem name="loginout">退出登录</DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <Avatar
                :src="avatorPath"
                style="background: #619fe7;margin-left: 10px;"
              ></Avatar>
            </Row>
          </div>
        </div>
      </div>
      <div class="tags-con">
        <tags-page-opened :pageTagsList="pageTagsList"></tags-page-opened>
      </div>
    </div>
    <div
      class="single-page-con"
      :style="{left: shrink?'60px':'200px'}"
    >
      <div class="single-page">
        <!-- <keep-alive :include="cachePage"> -->
        <router-view></router-view>
        <!-- </keep-alive> -->
      </div>
    </div>
  </div>
</template>
<script src="./index.js"></script>

