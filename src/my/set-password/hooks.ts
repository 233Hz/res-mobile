import { ref } from 'vue'
import { updatePasswordApi } from '@/api/user'
import { useUserStore } from '@/store'
import { useRouter } from 'uni-mini-router'
import createPopup from '@/utils/popup'
import type { UpdatePasswordData } from 'types/user'

export const useSetPassword = () => {
  const router = useRouter()
  const form = ref({
    opwd: void 0,
    npwd: void 0,
    rpwd: void 0
  })

  const onSubmit = async () => {
    if (!form.value.opwd) {
      uni.showToast({
        title: '请输入当前密码',
        icon: 'error'
      })
      return
    }
    if (!form.value.npwd) {
      uni.showToast({
        title: '请输入新密码',
        icon: 'error'
      })
      return
    }
    if (!form.value.rpwd) {
      uni.showToast({
        title: '请输入确认密码',
        icon: 'error'
      })
      return
    }
    if (form.value.npwd !== form.value.rpwd) {
      uni.showToast({
        title: '两次密码不一致',
        icon: 'error'
      })
      return
    }
    await updatePasswordApi(form.value as unknown as UpdatePasswordData)
    useUserStore().logout()
    createPopup({
      type: 'info',
      content: '修改成功，请重新登入',
      onConfirm: () => router.push({ name: 'login' })
    })
  }

  return { form, onSubmit }
}
