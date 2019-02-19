import Home from '@/views/HomePage.vue';

import store from '@/store';
import VueRouter from 'vue-router';
import { shallowMount, createLocalVue } from '@vue/test-utils';

const localVue = createLocalVue();
localVue.use(VueRouter);
const router = new VueRouter();

describe('Home.vue', () => {
    it('render the HomePage view', () => {
        const wrapper = shallowMount(Home, {
            localVue,
            router,
            store,
            propsData: {}
        });

        expect(wrapper.is('div')).toBe(true);
    });
});
