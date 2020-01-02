<style lang="less">
.body {
  border: 1px solid rgb(238, 238, 238);
}
.mt-2 {margin-top: 2px;}
.left-menu-item {
  border-bottom: 1px solid rgb(238, 238, 238);
  cursor: pointer;
  font-size: 1rem;
  &.active {
    background-color: rgb(240, 246, 255);
    color: rgb(55, 136, 238);
    border-right: 5px solid rgb(55, 136, 238);
  }
  &:hover {
    background-color: rgb(245, 245, 245);
  }
  span {
    display: inline-block;
    padding-top: 15px;
    padding-bottom: 15px;
    padding-left: 10px;
  }
}
.pt-15 {
  padding-top: 15px;
  padding-right: 15px;
}
</style>
<template>
  <div class="table-basic-vue frame-page h-panel">
    <div class="h-panel-bar"><span class="h-panel-title">系统配置</span></div>
    <div class="h-panel-body">
      <p><Button color="primary" @click="save">保存配置</Button></p>
      <Row class="body">
        <Cell width="5" style="border-right: 1px solid rgb(238, 238, 238);">
          <Row>
            <Cell v-for="item in items" width="24" class="left-menu-item" :class="{ active: item.key === activeItem }">
              <span style="display: inline-block; width: 100%" @click="switchItem(item)">{{ item.name }}</span>
            </Cell>
          </Row>
        </Cell>
        <Cell width="19" class="pt-15" v-if="activeItem === 'system'">
          <Form ref="form" :labelWidth="150">
            <FormItem>
              <template v-slot:label>开启缓存</template>
              <h-switch v-model="setting.meedu.system.cache.status" :trueValue="1" :falseValue="-1"></h-switch>
            </FormItem>
            <FormItem>
              <template v-slot:label>缓存时间</template>
              <div class="h-input-group" v-width="200">
                <input type="text" v-model="setting.meedu.system.cache.expire" />
                <span class="h-input-addon">分钟</span>
              </div>
            </FormItem>
            <FormItem>
              <template v-slot:label>备份</template>
              <h-switch v-model="setting.meedu.system.backup" :trueValue="1" :falseValue="-1"></h-switch>
            </FormItem>
            <FormItem>
              <template v-slot:label>网站统计js</template>
              <input type="text" v-model="setting.meedu.system.js" />
            </FormItem>
          </Form>
        </Cell>

        <Cell width="19" class="pt-15" v-if="activeItem === 'sociallogin'">
          <Tabs :datas="tab.socialLogin" v-model="tabSeleted.socialLogin"></Tabs>

          <div class="pt-15" v-show="tabSeleted.socialLogin === 'github'">
            <Form ref="form" :labelWidth="150">
              <FormItem>
                <template v-slot:label>开启</template>
                <h-switch v-model="setting.meedu.member.socialite.github.enabled" :trueValue="1" :falseValue="-1"></h-switch>
              </FormItem>
              <FormItem>
                <template v-slot:label>Github ClientId</template>
                <input type="text" v-model="setting.services.github.client_id" />
              </FormItem>
              <FormItem>
                <template v-slot:label>Github ClientSecret</template>
                <input type="text" v-model="setting.services.github.client_secret" />
              </FormItem>
              <FormItem>
                <template v-slot:label>Github Redirect</template>
                <input type="text" v-model="setting.services.github.redirect" />
              </FormItem>
            </Form>
          </div>
          <div class="pt-15" v-show="tabSeleted.socialLogin === 'qq'">
            <Form ref="form" :labelWidth="150">
              <FormItem>
                <template v-slot:label>开启</template>
                <h-switch v-model="setting.meedu.member.socialite.qq.enabled" :trueValue="1" :falseValue="-1"></h-switch>
              </FormItem>
              <FormItem>
                <template v-slot:label>QQ ClientId</template>
                <input type="text" v-model="setting.services.qq.client_id" />
              </FormItem>
              <FormItem>
                <template v-slot:label>QQ ClientSecret</template>
                <input type="text" v-model="setting.services.qq.client_secret" />
              </FormItem>
              <FormItem>
                <template v-slot:label>QQ Redirect</template>
                <input type="text" v-model="setting.services.qq.redirect" />
              </FormItem>
            </Form>
          </div>

          <div class="pt-15" v-show="tabSeleted.socialLogin === 'weixin'">
            <Form ref="form" :labelWidth="150">
              <FormItem>
                <template v-slot:label>开启</template>
                <h-switch v-model="setting.meedu.member.socialite.weixinweb.enabled" :trueValue="1" :falseValue="-1"></h-switch>
              </FormItem>
              <FormItem>
                <template v-slot:label>微信 ClientId</template>
                <input type="text" v-model="setting.services.weixinweb.client_id" />
              </FormItem>
              <FormItem>
                <template v-slot:label>微信 ClientSecret</template>
                <input type="text" v-model="setting.services.weixinweb.client_secret" />
              </FormItem>
              <FormItem>
                <template v-slot:label>微信 Redirect</template>
                <input type="text" v-model="setting.services.weixinweb.redirect" />
              </FormItem>
            </Form>
          </div>
        </Cell>

        <Cell width="19" class="pt-15" v-if="activeItem === 'mail'">
          <p>
            <span class="h-tag h-tag-yellow" style="margin-left: 50px">邮箱配置用的是阿里云的邮件服务。</span>
          </p>
          <Form ref="form" :labelWidth="150">
            <FormItem>
              <template v-slot:label>AccessKeyId</template>
              <input type="text" v-model="setting.services.directmail.app_key" />
            </FormItem>
            <FormItem>
              <template v-slot:label>AccessKeySecret</template>
              <input type="text" v-model="setting.services.directmail.app_secret" />
            </FormItem>
            <FormItem>
              <template v-slot:label>发送用户名</template>
              <input type="text" v-model="setting.services.directmail.account.alias" />
            </FormItem>
            <FormItem>
              <template v-slot:label>发送地址</template>
              <input type="text" v-model="setting.services.directmail.account.name" />
            </FormItem>
            <FormItem>
              <template v-slot:label>区域</template>
              <input type="text" v-model="setting.services.directmail.region" />
            </FormItem>
          </Form>
        </Cell>

        <Cell width="19" class="pt-15" v-if="activeItem === 'sms'">
          <Tabs :datas="tab.sms" v-model="tabSeleted.sms"></Tabs>

          <div class="pt-15" v-show="tabSeleted.sms === 'service'">
            <Form ref="form" :labelWidth="150">
              <FormItem>
                <template v-slot:label>选择短信服务商</template>
                <Select v-model="setting.meedu.system.sms" :datas="smsServices"></Select>
              </FormItem>
            </Form>
          </div>

          <div class="pt-15" v-show="tabSeleted.sms === 'aliyun'">
            <Form ref="form" :labelWidth="150">
              <FormItem>
                <template v-slot:label>AccessKeyId</template>
                <input type="text" v-model="setting.sms.gateways.aliyun.access_key_id" />
              </FormItem>
              <FormItem>
                <template v-slot:label>AccessKeySecret</template>
                <input type="text" v-model="setting.sms.gateways.aliyun.access_key_secret" />
              </FormItem>
              <FormItem>
                <template v-slot:label>短信签名</template>
                <input type="text" v-model="setting.sms.gateways.aliyun.sign_name" />
              </FormItem>
              <FormItem>
                <template v-slot:label>密码重置模板ID</template>
                <input type="text" v-model="setting.sms.gateways.aliyun.template.password_reset" />
              </FormItem>
              <FormItem>
                <template v-slot:label>注册模板ID</template>
                <input type="text" v-model="setting.sms.gateways.aliyun.template.register" />
              </FormItem>
              <FormItem>
                <template v-slot:label>手机号绑定ID</template>
                <input type="text" v-model="setting.sms.gateways.aliyun.template.mobile_bind" />
              </FormItem>
              <FormItem>
                <template v-slot:label>手机号登陆ID</template>
                <input type="text" v-model="setting.sms.gateways.aliyun.template.login" />
              </FormItem>
            </Form>
          </div>
          <div class="pt-15" v-show="tabSeleted.sms === 'yunpian'">
            <Form ref="form" :labelWidth="150">
              <FormItem>
                <template v-slot:label>ApiKey</template>
                <input type="text" v-model="setting.sms.gateways.yunpian.api_key" />
              </FormItem>
              <FormItem>
                <template v-slot:label>密码重置模板ID</template>
                <input type="text" v-model="setting.sms.gateways.yunpian.template.password_reset" />
              </FormItem>
              <FormItem>
                <template v-slot:label>注册模板ID</template>
                <input type="text" v-model="setting.sms.gateways.yunpian.template.register" />
              </FormItem>
              <FormItem>
                <template v-slot:label>手机号绑定ID</template>
                <input type="text" v-model="setting.sms.gateways.yunpian.template.mobile_bind" />
              </FormItem>
              <FormItem>
                <template v-slot:label>手机号登陆ID</template>
                <input type="text" v-model="setting.sms.gateways.yunpian.template.login" />
              </FormItem>
            </Form>
          </div>
        </Cell>

        <Cell width="19" class="pt-15" v-if="activeItem === 'image'">
          <Form ref="form" :labelWidth="150">
            <FormItem>
              <template v-slot:label>图片存储驱动</template>
              <Select v-model="setting.meedu.upload.image.disk" :datas="disks"></Select>
            </FormItem>
            <FormItem>
              <template v-slot:label>图片存储路径</template>
              <input type="text" v-model="setting.meedu.upload.image.path" />
            </FormItem>
            <FormItem>
              <template v-slot:label>图片参数（用于第三方存储）</template>
              <input type="text" v-model="setting.meedu.upload.image.params" />
              <span class="h-tag h-tag-yellow mt-2">不清楚具体功能请勿填写。</span>
            </FormItem>

            <template v-if="setting.meedu.upload.image.disk == 'qiniu'">
              <FormItem>
                <template v-slot:label>七牛访问域名</template>
                <input type="text" v-model="setting.filesystems.disks.qiniu.domains.default" />
              </FormItem>
              <FormItem>
                <template v-slot:label>七牛访问域名(https)</template>
                <input type="text" v-model="setting.filesystems.disks.qiniu.domains.https" />
              </FormItem>
              <FormItem>
                <template v-slot:label>七牛AccessKey</template>
                <input type="text" v-model="setting.filesystems.disks.qiniu.access_key" />
              </FormItem>
              <FormItem>
                <template v-slot:label>七牛SecretKey</template>
                <input type="text" v-model="setting.filesystems.disks.qiniu.secret_key" />
              </FormItem>
              <FormItem>
                <template v-slot:label>七牛Bucket</template>
                <input type="text" v-model="setting.filesystems.disks.qiniu.bucket" />
              </FormItem>
            </template>

            <template v-if="setting.meedu.upload.image.disk == 'oss'">
              <FormItem>
                <template v-slot:label>阿里云OSS AccessKeyId</template>
                <input type="text" v-model="setting.filesystems.disks.oss.access_id" />
              </FormItem>
              <FormItem>
                <template v-slot:label>阿里云OSS AccessKeySecret</template>
                <input type="text" v-model="setting.filesystems.disks.oss.access_key" />
              </FormItem>
               <FormItem>
                <template v-slot:label>阿里云OSS Bucket</template>
                <input type="text" v-model="setting.filesystems.disks.oss.bucket" />
              </FormItem>
               <FormItem>
                <template v-slot:label>阿里云OSS Endpoint</template>
                <input type="text" v-model="setting.filesystems.disks.oss.endpoint" />
              </FormItem>
            </template>
        

          </Form>
        </Cell>

        <Cell width="19" class="pt-15" v-if="activeItem === 'pay'">
          <Tabs :datas="tab.pay" v-model="tabSeleted.pay"></Tabs>

          <div class="pt-15" v-show="tabSeleted.pay === 'alipay'">
            <Form ref="form" :labelWidth="150">
              <FormItem>
                <template v-slot:label>开启</template>
                <h-switch v-model="setting.meedu.payment.alipay.enabled" :trueValue="1" :falseValue="-1"></h-switch>
              </FormItem>
              <FormItem>
                <template v-slot:label>AppId</template>
                <input type="text" v-model="setting.pay.alipay.app_id" />
              </FormItem>
              <FormItem>
                <template v-slot:label>公钥(RSA2加密方式)</template>
                <textarea v-model="setting.pay.alipay.ali_public_key"></textarea>
              </FormItem>
              <FormItem>
                <template v-slot:label>私钥(RSA2加密方式)</template>
                <textarea v-model="setting.pay.alipay.private_key"></textarea>
              </FormItem>
              <FormItem>
                <template v-slot:label>返回地址</template>
                <input type="text" v-model="setting.pay.alipay.return_url" />
                <p>Note:修改域名就可以了</p>
              </FormItem>
              <FormItem>
                <template v-slot:label>回调地址</template>
                <input type="text" v-model="setting.pay.alipay.notify_url" />
                <p>Note:修改域名就可以了</p>
              </FormItem>
            </Form>
          </div>

          <div class="pt-15" v-show="tabSeleted.pay === 'wechat'">
            <Form ref="form" :labelWidth="150">
              <FormItem>
                <template v-slot:label>开启</template>
                <h-switch v-model="setting.meedu.payment.wechat.enabled" :trueValue="1" :falseValue="-1"></h-switch>
              </FormItem>
              <FormItem>
                <template v-slot:label>公众号Id</template>
                <input type="text" v-model="setting.pay.wechat.app_id" />
              </FormItem>
              <FormItem>
                <template v-slot:label>MchId</template>
                <input type="text" v-model="setting.pay.wechat.mch_id" />
              </FormItem>
              <FormItem>
                <template v-slot:label>私钥</template>
                <textarea v-model="setting.pay.wechat.key"></textarea>
              </FormItem>
              <FormItem>
                <template v-slot:label>回调地址</template>
                <input type="text" v-model="setting.pay.wechat.notify_url" />
                <p>Note:修改域名就可以了</p>
              </FormItem>
            </Form>
          </div>

          <div class="pt-15" v-show="tabSeleted.pay === 'handPay'">
            <Form ref="form" :labelWidth="150">
              <FormItem>
                <template v-slot:label>开启</template>
                <h-switch v-model="setting.meedu.payment.handPay.enabled" :trueValue="1" :falseValue="-1"></h-switch>
              </FormItem>
              <FormItem>
                <template v-slot:label>手动打款说明</template>
                <tinymce-editor v-model="setting.meedu.payment.handPay.introduction"></tinymce-editor>
              </FormItem>
            </Form>
          </div>
        </Cell>

        <Cell width="19" class="pt-15" v-if="activeItem === 'video'">
          <Tabs :datas="tab.video" v-model="tabSeleted.video"></Tabs>

          <div class="pt-15" v-show="tabSeleted.video === 'aliyun'">
            <Form ref="form" :labelWidth="150">
              <FormItem>
                <template v-slot:label>Region</template>
                <input type="text" v-model="setting.meedu.upload.video.aliyun.region" />
              </FormItem>
              <FormItem>
                <template v-slot:label>AccessKeyId</template>
                <input type="text" v-model="setting.meedu.upload.video.aliyun.access_key_id" />
              </FormItem>
              <FormItem>
                <template v-slot:label>AccessKeySecret</template>
                <input type="text" v-model="setting.meedu.upload.video.aliyun.access_key_secret" />
              </FormItem>
            </Form>
          </div>

          <div class="pt-15" v-show="tabSeleted.video === 'tencent'">
            <Form ref="form" :labelWidth="150">
              <FormItem>
                <template v-slot:label>AppId</template>
                <input type="text" v-model="setting.tencent.vod.app_id" />
              </FormItem>
              <FormItem>
                <template v-slot:label>SecretId</template>
                <input type="text" v-model="setting.tencent.vod.secret_id" />
              </FormItem>
              <FormItem>
                <template v-slot:label>SecretKey</template>
                <input type="text" v-model="setting.tencent.vod.secret_key" />
              </FormItem>
            </Form>
          </div>
        </Cell>

        <Cell width="19" class="pt-15" v-if="activeItem === 'member'">
          <Form ref="form" :labelWidth="150">
            <FormItem>
              <template v-slot:label>会员注册默认激活</template>
              <h-switch v-model="setting.meedu.member.is_active_default" :trueValue="1" :falseValue="-1"></h-switch>
            </FormItem>
            <FormItem>
              <template v-slot:label>会员注册默认锁定</template>
              <h-switch v-model="setting.meedu.member.is_lock_default" :trueValue="1" :falseValue="-1"></h-switch>
            </FormItem>
            <FormItem>
              <template v-slot:label>默认头像</template>
              <avatar-upload v-model="setting.meedu.member.default_avatar" name="选择头像"></avatar-upload>
            </FormItem>
          </Form>
        </Cell>

        <Cell width="19" class="pt-15" v-if="activeItem === 'seo'">
          <Tabs :datas="tab.seo" v-model="tabSeleted.seo"></Tabs>

          <div class="pt-15" v-show="tabSeleted.seo === 'indexPage'">
            <Form ref="form" :labelWidth="150">
              <FormItem>
                <template v-slot:label>首页标题</template>
                <textarea v-model="setting.meedu.seo.index.title"></textarea>
              </FormItem>
              <FormItem>
                <template v-slot:label>首页关键字</template>
                <textarea v-model="setting.meedu.seo.index.keywords"></textarea>
              </FormItem>
              <FormItem>
                <template v-slot:label>首页描述</template>
                <textarea v-model="setting.meedu.seo.index.description"></textarea>
              </FormItem>
            </Form>
          </div>

          <div class="pt-15" v-show="tabSeleted.seo === 'coursePage'">
            <Form ref="form" :labelWidth="150">
              <FormItem>
                <template v-slot:label>课程列表页标题</template>
                <textarea v-model="setting.meedu.seo.course_list.title"></textarea>
              </FormItem>
              <FormItem>
                <template v-slot:label>课程列表页关键字</template>
                <textarea v-model="setting.meedu.seo.course_list.keywords"></textarea>
              </FormItem>
              <FormItem>
                <template v-slot:label>课程列表页描述</template>
                <textarea v-model="setting.meedu.seo.course_list.description"></textarea>
              </FormItem>
            </Form>
          </div>

          <div class="pt-15" v-show="tabSeleted.seo === 'rolePage'">
            <Form ref="form" :labelWidth="150">
              <FormItem>
                <template v-slot:label>订阅页标题</template>
                <textarea v-model="setting.meedu.seo.role_list.title"></textarea>
              </FormItem>
              <FormItem>
                <template v-slot:label>订阅页关键字</template>
                <textarea v-model="setting.meedu.seo.role_list.keywords"></textarea>
              </FormItem>
              <FormItem>
                <template v-slot:label>订阅页描述</template>
                <textarea v-model="setting.meedu.seo.role_list.description"></textarea>
              </FormItem>
            </Form>
          </div>
        </Cell>

        <Cell width="19" class="pt-15" v-if="activeItem === 'other'">
          <Form ref="form" :labelWidth="150">
            <FormItem>
              <template v-slot:label>课程列表页展示课程条数</template>
              <input type="text" v-model="setting.meedu.other.course_list_page_size" />
            </FormItem>
            <FormItem>
              <template v-slot:label>视频列表页面展示视频条数</template>
              <input type="text" v-model="setting.meedu.other.video_list_page_size" />
            </FormItem>
          </Form>
        </Cell>
      </Row>
    </div>
  </div>
</template>
<script>
import TinymceEditor from '../common/tinymce';
import AvatarUpload from '../common/avatar';

export default {
  components: { AvatarUpload,TinymceEditor },
  data() {
    return {
      loading: false,
      activeItem: 'system',
      items: [
        {
          name: '系统配置',
          key: 'system'
        },
        {
          name: '社交登录',
          key: 'sociallogin'
        },
        {
          name: '邮箱配置',
          key: 'mail'
        },
        {
          name: '短信',
          key: 'sms'
        },
        {
          name: '图片上传',
          key: 'image'
        },
        {
          name: '支付',
          key: 'pay'
        },
        {
          name: '视频上传',
          key: 'video'
        },
        {
          name: '会员配置',
          key: 'member'
        },
        {
          name: 'SEO配置',
          key: 'seo'
        },
        {
          name: '其它配置',
          key: 'other'
        }
      ],
      setting: {},
      tab: {
        socialLogin: {
          github: 'Github',
          qq: 'QQ',
          weixin: '微信'
        },
        sms: {
          service: '服务商',
          aliyun: '阿里云短信',
          yunpian: '云片短信'
        },
        pay: {
          alipay: '支付宝',
          wechat: '微信支付',
          handPay: '手动打款'
        },
        video: {
          aliyun: '阿里云视频',
          tencent: '腾讯云视频'
        },
        seo: {
          indexPage: '首页',
          coursePage: '课程列表',
          rolePage: '订阅界面'
        }
      },
      tabSeleted: {
        socialLogin: 'github',
        sms: 'service',
        pay: 'alipay',
        video: 'aliyun',
        seo: 'indexPage'
      },
      smsServices: [
        {
          title: '阿里云短信',
          key: 'aliyun'
        },
        {
          title: '云片短信',
          key: 'yunpian'
        }
      ],
      disks:[
        {
          title: '本地',
          key: 'public'
        },
        {
          title: '七牛云',
          key: 'qiniu'
        },
        {
          title: '阿里云OSS',
          key: 'oss'
        },
      ]
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.loading = true;
      R.Setting.Get().then(resp => {
        this.setting = resp.data;
        this.loading = false;
      });
    },
    switchItem(item) {
      this.activeItem = item.key;
    },
    save() {
        R.Setting.Save(this.setting).then(resp => {
            HeyUI.$Message.success('成功');
            this.init();
        })
    }
  }
};
</script>
