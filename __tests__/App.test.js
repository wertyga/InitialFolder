import App from '../client/components/App/App';

describe('#App component', () => {
    const wrapper = mount(<App/>);
    it('h1 present', () => {
        expect(wrapper.find('h1').length).equal(1)
    });

    it('Button present', () => {
        expect(wrapper.find('button').length).equal(1)
    });
});
