import { createLocalVue, shallowMount } from '@vue/test-utils'
import ElementUI from 'element-ui';
import NavBar from '../../src/components/NavBar.vue'

const localVue = createLocalVue()
localVue.use(ElementUI)


describe('Testing Navbar.vue', ()=> {
  let wrapper
  beforeEach(()=> {
    wrapper = shallowMount(NavBar, { localVue })
  })

  it('has a menu element', ()=>{
    expect(wrapper.html()).toContain('el-menu')
  })
  it('has a menu item', ()=> {
    expect(wrapper.html()).toContain('el-menu-item')
  })
  it('has one meun item of index 1', ()=> {
    const menuItems = wrapper.findAllComponents({ name: 'ElMenuItem'})
    expect(menuItems.length).toBe(1)
    expect(menuItems.at(0).attributes('index')).toBe("1")
    expect(menuItems.at(0).text()).toBe('About')
  })
})