import { createLocalVue, shallowMount } from '@vue/test-utils'
import ElementUI from 'element-ui';
import App from '../../src/App.vue'
import NavBar from '../../src/components/NavBar.vue'
import List from '../../src/components/List.vue'

const localVue = createLocalVue()
localVue.use(ElementUI)

describe('Testing App.vue', ()=> {
  let wrapper
  beforeEach(() => {
    wrapper = shallowMount(App, { localVue })
  })
  it('has app div', ()=> {
    const appDiv = wrapper.find('div')
    expect(appDiv.exists()).toBe(true)
    expect(appDiv.attributes('id')).toBe('app')
  })
  it('has NavBar component', ()=>{
    const navBarComponent = wrapper.findComponent(NavBar)
    expect(navBarComponent.exists()).toBe(true)
  })
  it('has List component', ()=> {
    const ListComponent = wrapper.findComponent(List)
    expect(ListComponent.exists()).toBe(true)
  })
  it('has container with class of bg-blue', ()=> {
    const container = wrapper.findComponent({ name: 'ElContainer' })
    expect(container.exists()).toBe(true)
    expect(container.classes()).toContain('bg-blue')
  })
})