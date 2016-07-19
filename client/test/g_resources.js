import '../src/elements/resources/g_resources.js';

describe('Global resources', () => {

  it('check g_resources', () => {
    assert.isArray(window.g_resources);
  });

});