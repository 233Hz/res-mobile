import { ref } from 'vue'
import { useRouter } from 'uni-mini-router'
import { useUserStoreHook } from '@/store'
import { hex_md5 } from '@/utils/md5'
import { A } from '@/utils/constant'

export const useLogin = () => {
  const router = useRouter()

  const loading = ref(false)
  const form = ref({
    username: void 0,
    password: void 0
  })

  const handleLogin = async () => {
    if (!form.value.username) {
      uni.showToast({
        title: '请输入用户名',
        icon: 'none'
      })
      return
    }
    if (!form.value.password) {
      uni.showToast({
        title: '请输入密码',
        icon: 'none'
      })
      return
    }
    try {
      await useUserStoreHook().loginByUsername(
        form.value.username,
        hex_md5(form.value.password + A)
      )
      uni.showToast({
        title: '登录成功',
        icon: 'success'
      })
      router.pushTab({ name: 'home' })
    } catch (error) {
      // empty
    }
  }

  const handleRegister = () => {
    router.push({ name: 'register' })
  }

  const handleNotLogin = () => {
    router.pushTab({ name: 'home' })
  }

  return {
    loading,
    form,
    handleLogin,
    handleRegister,
    handleNotLogin
  }
}
