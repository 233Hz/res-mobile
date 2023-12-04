declare module 'vue' {
  /**
   * 自定义全局组件
   */
  export interface GlobalComponents {
    GlSwiper: (typeof import('../src/components'))['GlSwiper']
    GlCard: (typeof import('../src/components'))['GlCard']
    GlDrawer: (typeof import('../src/components'))['GlDrawer']
    GlEditor: (typeof import('../src/components'))['GlEditor']
    GlEmpty: (typeof import('../src/components'))['GlEmpty']
    GlForm: (typeof import('../src/components'))['GlForm']
    GlFormItem: (typeof import('../src/components'))['GlFormItem']
  }
}

export {}
