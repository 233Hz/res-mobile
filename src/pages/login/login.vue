<script setup lang="ts">
const { safeAreaInsets } = uni.getSystemInfoSync()
</script>

<template>
  <view class="viewport" :style="{ paddingTop: safeAreaInsets?.top + 'px' }">
    <image class="image" src="https://picsum.photos/390/844" mode="scaleToFill" />
    <view class="image-mask">
      <view class="content">
        <view class="logo">产教融和双创数字服务平台</view>
        <view class="form">
          <view class="form-input">
            <input
              type="text"
              placeholder="请输入用户名"
              placeholder-style="color: rgba(255,255,255,0.5)"
            />
          </view>
          <view class="form-input">
            <input
              type="text"
              placeholder="请输入密码"
              placeholder-style="color: rgba(255,255,255,0.5)"
            />
          </view>
          <button class="form-button">登入</button>
          <view class="divider">
            <div class="left-line"></div>
            <div class="divider-text">其他登录方式</div>
            <div class="right-line"></div>
          </view>
          <view class="others">
            <view class="item">
              <view class="icon">
                <text class="icon-weixin" />
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<style>
page {
  height: 100%;
  overflow: hidden;
}
</style>

<style scoped lang="scss">
.viewport {
  height: 100%;
  position: relative;

  .image {
    width: 100%;
    height: 100%;
  }

  .image-mask {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;

    .content {
      margin: auto;
      display: flex;
      flex-direction: column;
      align-items: center;

      .logo {
        text-align: center;
        color: #fff;
        font-weight: bold;
        font-size: 48rpx;
        height: 96rpx;
        line-height: 96rpx;
      }

      .form {
        width: 500rpx;

        &-input {
          padding: 20rpx 40rpx;
          border-radius: 20px;
          margin: 20rpx 0;
          background-color: rgba(0, 0, 0, 0.2);
          color: #fff;
          border: #ddd solid 1px;

          &::placeholder {
            color: #fff;
          }
        }
        &-button {
          background-color: #30a89d;
          color: #fff;
        }
      }

      .divider {
        display: flex;
        align-items: center;

        .left-line,
        .right-line {
          flex: 1;
          height: 1px;
          background-color: #ffffff99;
        }

        .divider-text {
          padding: 0 20rpx;
          color: #ffffff99;
        }
      }

      .others {
        display: flex;
        justify-content: center;
        align-items: center;

        .item {
          .icon {
            width: 80rpx;
            height: 80rpx;
            border-radius: 50%;
            padding: 10rpx;
            border: 2px solid #b2b2b2;
            display: flex;

            .icon-weixin {
            }
          }
        }
      }
    }
  }
}
</style>
