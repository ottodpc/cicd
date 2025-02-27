import { readResourceFromPath } from './utils';
import { delay } from './utils';

import * as request from 'supertest';
describe('TodoController (e2e)', () => {
  jest.setTimeout(180000);

  beforeAll(() => {});

  it('should validate Create action', async () => {
    const data = await readResourceFromPath('/resources/todo/todo.create.json');
    const response = await request(global.app.getHttpServer())
      .post('/v1/todos')

      .set('Content-Type', 'application/json')
      .send(data);

    expect(response.status.toString()).toMatch(/^2/);
  });

  it('should validate Update action', async () => {
    const data = await readResourceFromPath('/resources/todo/todo.create.json');
    const createResponse = await request(global.app.getHttpServer())
      .post('/v1/todos')

      .set('Content-Type', 'application/json')
      .send(data);

    const updateLocationUrl = createResponse.header['location'];

    await delay(1000);

    const updateData = await readResourceFromPath(
      '/resources/todo/todo.update.json',
    );

    const updateResponse = await request(global.app.getHttpServer())
      .put(updateLocationUrl)
      .set('Content-Type', 'application/json')
      .send(updateData);

    expect(updateResponse.status.toString()).toMatch(/^2/);
  });

  it('should validate Get action', async () => {
    const data = await readResourceFromPath('/resources/todo/todo.create.json');
    const createResponse = await request(global.app.getHttpServer())
      .post('/v1/todos')

      .set('Content-Type', 'application/json')
      .send(data);

    const resourceIdLocationUrl = createResponse.header['location'];

    await delay(1000);

    const getResponse = await request(global.app.getHttpServer())
      .get(resourceIdLocationUrl)
      .set('Content-Type', 'application/json');

    expect(getResponse.status.toString()).toMatch(/^2/);
  });

  it('should validate Select action', async () => {});

  it('should validate Delete action', async () => {
    const data = await readResourceFromPath('/resources/todo/todo.create.json');
    const createResponse = await request(global.app.getHttpServer())
      .post('/v1/todos')

      .set('Content-Type', 'application/json')
      .send(data);

    const resourceIdLocationUrl = createResponse.header['location'];

    await delay(1000);

    const deletedResponse = await request(global.app.getHttpServer())
      .get(resourceIdLocationUrl)
      .set('Content-Type', 'application/json');

    await delay(1000);

    expect(deletedResponse.status.toString()).toMatch(/^2/);
  });
});
