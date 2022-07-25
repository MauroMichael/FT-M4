const { db, Role } = require('../db');

describe('Role Model', () => {
  beforeAll(async () => {
    await db.sync({ force: true });
  });

  it('should not create the Role if name is not send', async () => {
    expect.assertions(1);
    try {
      await Role.create({description: 'Big amount of HP needed to withstands the attacks'});
    } catch (error) {
      expect(error.message).toMatch(/notNull Violation/);
    }
  });

  it('should create the Race if all required properties are ok', async () => {
    const role = await Role.create({
      name: 'Tank',
      description: 'Big amount of HP needed to withstands the attacks'
    });
    expect(role.toJSON()).toHaveProperty('name','Tank');
    expect(role.toJSON()).toHaveProperty('description','Big amount of HP needed to withstands the attacks');
  });

  afterAll(async () => {
    await db.sync({ force: true });
    db.close();
  })
});