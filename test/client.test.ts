import { Client } from '../src';

describe('devClient Object', () => {
  it('should have "project" namespace', () => {
    expect(Client).toHaveProperty('projects')
  })
  describe('project namespace methods', () => {
    it('should have a createProject method', () => {
      expect(Client.projects.createProject).toBeDefined();
    });
    it('should have a listProjects method', () => {
      expect(Client.projects.listProjects).toBeDefined();
    });
    it('should have a addEnvironment method', () => {
      expect(Client.projects.addEnvironment).toBeDefined();
    })
  })

  describe('environmnet namespace methods', ()=> {
    it('should have a addApplication method', () => {
      expect(Client.environments.addApplication).toBeDefined();
    })
    it('should have a addDatabase method', () => {
      expect(Client.environments.addDatabase).toBeDefined();
    })
    it('should have a addLanguage method', () => {
      expect(Client.environments.addLanguage).toBeDefined()
    })
  })
  
});
