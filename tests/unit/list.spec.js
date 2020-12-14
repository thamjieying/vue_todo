import { createLocalVue, shallowMount } from '@vue/test-utils'
import Vuex from 'vuex'
import ElementUI from 'element-ui';
import List from '../../src/components/List.vue'

const localVue = createLocalVue()
localVue.use(ElementUI)
localVue.use(Vuex)


describe('Testing Navbar.vue', () => {
  let wrapper
  let store
  let actions

  beforeEach(() => {
    actions = {
      loadTableData: jest.fn(),
      addItems: jest.fn(),
      removeItems: jest.fn(),
      toggleCheck: jest.fn()
    }
    store = new Vuex.Store({
      actions
    })
    wrapper = shallowMount(List, { store, localVue })
  })

  it('has a table element', () => {
    const tableComponent = wrapper.findComponent({ name: 'ElTable' })
    expect(tableComponent.exists()).toBe(true)
  })
  it('has 2 column', () => {
    const colComponents = wrapper.findAllComponents({ name: 'ElTableColumn' })
    expect(colComponents.length).toBe(2)
  })

})