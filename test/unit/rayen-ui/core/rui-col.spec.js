import {StageComponent} from 'aurelia-testing';
import {bootstrap} from 'aurelia-bootstrapper';

describe('column', () => {
  let component;

  beforeEach(() => {
    component = StageComponent
      .withResources('rayen-ui/core/rui-col')
      .inView('<column></column>');
  });

  it('elemento debería tener la clase ".col"', done => {
    component.create(bootstrap).then(() => {
      const nameElement = document.querySelector('.col');
      expect(nameElement.classList).toContain('col');
      done();
    }).catch(e => { console.log(e.toString()) });
  }); 

  afterEach(() => {
    component.dispose();
  });
});