import {StageComponent} from 'aurelia-testing';
import {bootstrap} from 'aurelia-bootstrapper';

describe('rui-check true', () => {
  let component;

  beforeEach(() => {
    component = StageComponent
      .withResources('rayen-ui/inputs/rui-check')
      .inView('<rui-check id="check1" checked.bind="itemChecked"></rui-check>')
      .boundTo({ itemChecked: true });
  });

  it('elemento debería tener checked true', done => {
    component.create(bootstrap).then(() => {
      const nameElement = document.querySelector('.form-check-input');
      expect(nameElement.checked).toBe(true);
      done();
    }).catch(e => { console.log(e.toString()) });
  }); 

  afterEach(() => {
    component.dispose();
  });
});

describe('rui-check false', () => {
  let component;

  beforeEach(() => {
    component = StageComponent
      .withResources('rayen-ui/inputs/rui-check')
      .inView('<rui-check id="check1" checked.bind="itemChecked"></rui-check>')
      .boundTo({ itemChecked: false });
  });

  it('elemento debería tener checked false', done => {
    component.create(bootstrap).then(() => {
      const nameElement = document.querySelector('.form-check-input');
      expect(nameElement.checked).toBe(false);
      done();
    }).catch(e => { console.log(e.toString()) });
  }); 

  afterEach(() => {
    component.dispose();
  });
});