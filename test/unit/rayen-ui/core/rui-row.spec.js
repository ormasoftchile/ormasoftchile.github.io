import {StageComponent} from 'aurelia-testing';
import {bootstrap} from 'aurelia-bootstrapper';

describe('row', () => {
  let component;

  beforeEach(() => {
    component = StageComponent
      .withResources('rayen-ui/core/rui-row')
      .inView('<row></row>');
  });

  it('elemento debería tener la clase ".row"', done => {
    component.create(bootstrap).then(() => {
      const nameElement = document.querySelector('.row');
      expect(nameElement.classList).toContain('row');
      done();
    }).catch(e => { console.log(e.toString()) });
  });

  afterEach(() => {
    component.dispose();
  });
});