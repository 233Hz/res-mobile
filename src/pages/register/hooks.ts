import { ref } from 'vue'
import { useRouter } from 'uni-mini-router'
import { registerApi } from '@/api/login'
import { validata } from '@/utils/util'
import { formRules } from './util'
import type { ApplyRegister } from 'types/login'

export const useRegister = () => {
  const router = useRouter()

  const loading = ref(false)

  const form = ref<Partial<ApplyRegister>>({
    userName: void 0,
    sex: 1,
    phone: void 0,
    email: void 0,
    idCard: void 0,
    address: void 0
  })

  const handleSexChange: UniHelper.RadioGroupOnChange = async (ev) => {
    form.value.sex = +ev.detail.value
  }

  const onSubmit = async () => {
    loading.value = true
    try {
      const { valid, message } = validata(formRules, form.value)
      if (valid) {
        await registerApi(form.value as ApplyRegister)
        uni.showToast({ title: '注册成功', icon: 'success' })
        resetForm()
        router.push({ name: 'login' })
      } else {
        uni.showToast({ title: message, icon: 'error' })
      }
    } catch (error) {
      /* empty */
    } finally {
      loading.value = false
    }
  }

  const resetForm = () => {
    form.value = {
      userName: void 0,
      sex: 1,
      phone: void 0,
      email: void 0,
      idCard: void 0,
      address: void 0
    }
  }

  return {
    loading,
    form,
    handleSexChange,
    onSubmit
  }
}
