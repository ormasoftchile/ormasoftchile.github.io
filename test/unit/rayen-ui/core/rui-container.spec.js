import {StageComponent} from 'aurelia-testing';
import {bootstrap} from 'aurelia-bootstrapper';

describe('container', () => {
  let component, componentFluid;

  beforeEach(() => {
    component = StageComponent
      .withResources('rayen-ui/core/rui-container')
      .inView('<container></container>');
  });

  it('elemento debería tener la clase ".container"', done => {
    component.create(bootstrap).then(() => {
      const nameElement = document.querySelector('.container');
      expect(nameElement.classList).toContain('container');
      done();
    }).catch(e => { console.log(e.toString()) });
  });

  afterEach(() => {
    component.dispose();
  });
});

describe('container fluid', () => {
  let component;

  beforeEach(() => {
    component = StageComponent
      .withResources('rayen-ui/core/rui-container')
      .inView('<container fluid></container>');
  });

  it('elemento debería tener la clase ".container-fluid"', done => {
    component.create(bootstrap).then(() => {
      const nameElement = document.querySelector('.container-fluid');
      expect(nameElement.classList).toContain('container-fluid');
      done();
    }).catch(e => { console.log(e.toString()) });
  });

  afterEach(() => {
    component.dispose();
  });
});