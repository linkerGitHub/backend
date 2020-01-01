<template>
  <div>
    <Avatar type="male" :src="image" v-if="image"></Avatar><br>
    <Button color="primary" class="btn btn-primary" id="pick-avatar"><i class="h-icon-upload"></i> {{ this.name }}</Button>
    <avatar-cropper @uploaded="handleUploaded" trigger="#pick-avatar" :upload-headers="uploadHeaders" upload-url="/backend/api/v1/upload/image" />
  </div>
</template>

<script>
import AvatarCropper from 'vue-avatar-cropper';
export default {
  components: {
    AvatarCropper
  },
  props: {
    value: {
      type: String
    },
    name: {
      type: String,
      default: '选择头像'
    }
  },
  data() {
    return {
      image: this.value,
      uploadHeaders: {
        Authorization: 'Bearer ' + Utils.getLocal('token')
      }
    };
  },
  methods: {
    handleUploaded(resp) {
      this.image = resp.data[0];
    }
  },
  watch: {
    value(newVal, oldVal) {
      this.image = newVal;
    },
    image(newVal, oldVal) {
      this.$emit('input', newVal);
    }
  }
};
</script>
