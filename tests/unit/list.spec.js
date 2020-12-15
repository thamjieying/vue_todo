import { createLocalVue, mount } from '@vue/test-utils'
import Vuex from 'vuex'
import ElementUI from 'element-ui';
import List from '../../src/components/List.vue'

const localVue = createLocalVue()
localVue.use(ElementUI)
localVue.use(Vuex)


describe('Testing Navbar.vue', () => {
  let wrapper
  let store
  let state
  let actions

  beforeEach(() => {
    actions = {
      loadTableData: jest.fn(),
      addItems: jest.fn(),
      removeItems: jest.fn(),
      toggleCheck: jest.fn()
    }
    state = {
      tableData: [
        { message: 'testing1', done: false },
        { message: 'testing2', done: true}
      ]
    }
    store = new Vuex.Store({
      state,
      actions
    })
    wrapper = mount(List, { store, localVue })
  })

  it('has a table element', () => {
    const tableComponent = wrapper.findComponent({ name: 'ElTable' })
    expect(tableComponent.exists()).toBe(true)
  })
  it('has 2 column', () => {
    const colComponents = wrapper.findAllComponents({ name: 'ElTableColumn' })
    expect(colComponents.length).toBe(2)
  })
  it('has input', () => {
    const inputComponent = wrapper.findComponent({ name: 'ElInput' })
    expect(inputComponent.exists()).toBe(true)
  })
  it('has add button', ()=> {
    const btnComponent = wrapper.findComponent({ name: 'ElButton' })
    expect(btnComponent.exists()).toBe(true)
    expect(btnComponent.text()).toBe("Add")
  })

  it('should have 2 preloaded items', ()=> {
    const checkboxes = wrapper.findAllComponents({ name: 'ElCheckbox' })
    expect(checkboxes.exists()).toBe(true)
    expect(checkboxes.length).toBe(2)
  })

  it('can add todo item', ()=> {
    const inputComponent = wrapper.find('input')
    const btnComponent = wrapper.find('button')

    inputComponent.setValue('testing')
    expect(wrapper.vm.input).toBe('testing')

    btnComponent.trigger('click')
    expect(wrapper.vm.input).toBe('')

    expect(actions.addItems).toHaveBeenCalled()
  })

  it('can toggle check item', ()=> {
    const checkboxes = wrapper.findAll('input[type="checkbox"]')

    const checkbox1 = checkboxes.at(0)
    checkbox1.setChecked()

    expect(actions.toggleCheck).toHaveBeenCalled()
  })

  it('can delete items', ()=> {
    const deleteBtn = wrapper.findAll('a')
    expect(deleteBtn.exists()).toBe(true)
    expect(deleteBtn.length).toBe(2)

    deleteBtn.trigger('click')
    expect(actions.removeItems).toHaveBeenCalled()
  })
})