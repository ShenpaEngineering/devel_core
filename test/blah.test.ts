import { Client } from '../src';

describe('devClient Object', () => {
  it('should have a createProject method', () => {
    expect(Client.createProject).toBeDefined();
    expect(Client).not.toHaveProperty('default');
  });
});
