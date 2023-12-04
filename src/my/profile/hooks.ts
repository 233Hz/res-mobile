import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { getUserInfoApi, updateSelfInfoApi } from '@/api/user'

export const useProfile = () => {
  const form = ref<any>({
    oid: void 0,
    loginName: void 0,
    userName: void 0,
    sex: void 0,
    mobile: void 0,
    email: void 0,
    idCard: void 0,
    address: void 0
  })

  const onFetch = async () => {
    const {
      data: { oid, loginName, userName, sex, mobile, email, idCard, address }
    } = await getUserInfoApi()
    form.value.oid = oid ?? void 0
    form.value.loginName = loginName ?? void 0
    form.value.userName = userName ?? void 0
    form.value.sex = sex ?? void 0
    form.value.mobile = mobile ?? void 0
    form.value.email = email ?? void 0
    form.value.idCard = idCard ?? void 0
    form.value.address = address ?? void 0
  }

  const handleGenderChange: UniHelper.RadioGroupOnChange = (ev) => {
    form.value.sex = ev.detail.value
  }

  const onSubmit = async () => {
    await updateSelfInfoApi(form.value)
    uni.showToast({
      title: '修改成功',
      icon: 'success'
    })
  }

  onLoad(async () => {
    await onFetch()
  })

  return { form, handleGenderChange, onSubmit }
}
