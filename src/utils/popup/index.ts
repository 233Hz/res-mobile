import { render, h, type VNode } from 'vue'
import PopupComponent from './index.vue'

const rootClassName = 'bunga-custom-popup'
let popup: VNode | null = null
export default function createPopup(
  options?: UniHelper.UniPopupDialogProps,
  type?: UniHelper.UniPopupProps['type']
) {
  let root = document.querySelector(`.${rootClassName}`)
  if (root) {
    render(null, root)
  } else {
    root = document.createElement('div')
    root.className = rootClassName
    document.body.appendChild(root)
  }
  popup = h(PopupComponent, {
    type,
    options,
    onClose: () => render(null, document.body)
  })
  render(popup, root)
  popup.component?.exposed?.open()
}
