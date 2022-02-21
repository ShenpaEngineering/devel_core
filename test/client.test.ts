import { Client } from '../src';

describe('devClient Object', () => {
  it('should have "projects" namespace', () => {
    expect(Client).toHaveProperty('projects')
  })
  describe('project namespace methods', () => {
    it('should have a createProject method', () => {
      expect(Client.projects.createProject).toBeDefined();
    });
    it('should have a addEnvironment method', () => {
      expect(Client.projects.addEnvironment).toBeDefined();
    })
  })
  it('should have "environments" namespace', () => {
    expect(Client).toHaveProperty('environments')
  })
  describe('environment namespace methods', ()=> {
    it('should have a addApplication method', () => {
      expect(Client.environments.addApplication).toBeDefined();
    })
    it('should have a addLanguage method', () => {
      expect(Client.environments.addLanguage).toBeDefined()
    })
    it('should have a createDockerCompose method', () => {
      expect(Client.environments.createDockerCompose).toBeDefined()
    })
    it('should have a createDockerfile method', () => {
      expect(Client.environments.createDockerfile).toBeDefined();
    })
    it('should have a createEnvironment method', () => {
      expect(Client.environments.createEnvironment).toBeDefined();
    })
    it('should have a createDockerfile method', () => {
      expect(Client.environments.buildEnvironmentFolder).toBeDefined();
    })
  })
  it('should have "github" namespace', () => {
    expect(Client).toHaveProperty('github')
  })
  
});
