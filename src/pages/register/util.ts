import type { ApplyRegister } from 'types/login'

export const formRules: FormRules<ApplyRegister> = {
  userName: [
    {
      required: true,
      message: '请输入用户名'
    }
  ],
  sex: [
    {
      required: true,
      message: '请输入性别'
    }
  ],
  phone: [
    {
      required: true,
      message: '请输入手机号'
    }
  ],
  email: [
    {
      required: true,
      message: '请输入邮箱'
    }
  ],
  idCard: [
    {
      required: true,
      message: '请输入身份证号'
    }
  ]
}
