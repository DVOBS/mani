import { LayoutNode } from '@/components/common/drag-layout/DragLayoutInterface'

export default {
  type: 'horizontal',
  children: [
    {
      type: 'tabs',
      children: [
        { type: 'tab', label: '文件', name: 'test-1' } ,
        {type: 'tab', label: '组件', name: 'test-2' }
      ],
      basis: 275
    },
    {
      type: 'vertical',
      fluid: true,
      fixed: true,
      children: [
        {
          type: 'main',
          name: 'main',
          fluid: true,
          fixed: true,
        },
      ]
    },
    {
      type: 'tabs',
      children: [
        { type: 'tab', label: '属性', name: 'test-3' },
        { type: 'tab', label: '数据', name: 'test-4' },
        { type: 'tab', label: '交互', name: 'test-5' }
      ],
      basis: 275
    }
  ]
} as LayoutNode