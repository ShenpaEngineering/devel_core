import { Client } from '../src';

describe('devClient Object', () => {
  it('should have "projects" namespace', () => {
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
  it('should have "environments" namespace', () => {
    expect(Client).toHaveProperty('environments')
  })
  describe('environment namespace methods', ()=> {
    it('should have a addApplication method', () => {
      expect(Client.environments.addApplication).toBeDefined();
    })
    it('should have a addDatabase method', () => {
      expect(Client.environments.addDatabase).toBeDefined();
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
    it('should have a createDockerfile method', () => {
      expect(Client.environments.buildEnvironmentFolder).toBeDefined();
    })
  })
  it('should have "github" namespace', () => {
    expect(Client).toHaveProperty('github')
  })

  it('should have "apps" namespace', () => {
    expect(Client).toHaveProperty('apps')
  })
  describe('apps namespace methods', () => {
    it('should have a getApps method', () => {
      expect(Client.apps.getApps).toBeDefined();
    })
  })

  it('should have "db" namespace', () => {
    expect(Client).toHaveProperty('db')
  })
  describe('db namespace methods', () => {
    it('should havee a getDatabases method', () => {
      expect(Client.db.getDatabases).toBeDefined()
    })
  })
  
});
