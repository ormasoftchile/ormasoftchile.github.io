import {App} from '../../src/app';

describe('the app', () => {
  it('says rayen', () => {
    expect(new App().title).toBe('rayen');
  });
});
