<template>
  <div class="panel_list p5">
    <!-- 弹层 -->
    <div class="case-left-container" :style="{paddingRight:showBtn?'25px':'550px'}">
      <!-- 基础信息 -->
      <baseInfo ref='BASE_INFO' :queryData='queryData' :caseNo='caseNo' :userId='userId' :collectCategory='collectCategory' :base_info_data='base_info_data' @deliveryData='deliveryData'></baseInfo>

      <!-- 案件信息 -->
      <caseInfo ref='CASE_INFO' :queryData='queryData' :caseNo='caseNo' @deliveryData='deliveryData'></caseInfo>

      <!-- 催收信息 -->
      <collectionInfo ref='COLLECTION_INFO' :queryData='queryData' :caseNo='caseNo' :userId='userId'></collectionInfo>

      <!-- 其他(绑卡、操作、站内信) -->
      <otherInfo ref='OTHER_INFO' :queryData='queryData' :caseNo='caseNo' :userId='userId'></otherInfo>
    </div>
    <div class="panel-case-right">
      <Tooltip v-if="showBtn" content="点击查看" placement="left">
        <div @click="isShow" class="txl-container">联系人信息</div>
      </Tooltip>
      <div class="case-desc-alert">
        <transition name="slide
        ">
          <div v-show="!showBtn" class="heighti">
            <addressList ref='ADDRESS_LIST' :queryData='queryData' :caseNo='caseNo' :userId='userId' :collectCategory='collectCategory' :address_list_data='address_list_data' @deliveryData='deliveryData' @isShow='isShow'></addressList>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>
<script src="./index.js"></script>
<style lang="less">
@import "./index.less";
.fail-icon {
  transform: rotate(132deg);
}
.tel-box {
  position: fixed;
  left: 0;
  bottom: 20px;
  width: 110px;
  height: 100px;
  border-top-right-radius: 6px;
  border-bottom-right-radius: 6px;
  background-color: rgba(0, 0, 0, 0.6);
  color: #fff;
  z-index: 1000;

  line-height: 25px;
  .tel-box-desc {
    padding: 5px;
    text-align: center;
    position: absolute;
    top: 0;
    width: 100px;
    left: 0;
    .tel-num {
      font-weight: 600;
      font-size: 16px;
    }
    .tel-desc {
      color: #fff;
      font-size: 12px;
    }
    .tel-btn-box {
      margin: 5px auto;
      display: flex;
      .item {
        flex: 1;
        cursor: pointer;
        .icon-box {
          font-size: 20px;
          width: 30px;
          display: inline-block;
          line-height: 30px;
          border-radius: 50%;
          height: 30px;
          color: #fff;
        }
        &.fail {
          .icon-box {
            background: rgb(234, 86, 66);
          }
        }
        &.success {
          .icon-box {
            background: rgb(117, 213, 114);
          }
        }
      }
    }
  }
}
</style>
