import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import App from '../App.vue'

describe('App', () => {
  it('renders the root component without errors', () => {
    const wrapper = mount(App, {
      global: {
        stubs: {
          'router-view': { template: '<div>router-view stub</div>' },
          'keep-alive': { template: '<slot></slot>' }
        }
      }
    })
    expect(wrapper.exists()).toBe(true)
  })
})
