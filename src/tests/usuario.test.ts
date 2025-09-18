import express from 'express';
import request from 'supertest';
import { DataSource, Repository } from 'typeorm';
import { router } from '../routes/routes';
import { postMock, useMock } from './mocks';

jest.mock('typeorm', () => {
  const actual = jest.requireActual('typeorm');
  return {
    ...actual,
    DataSource: jest.fn().mockImplementation(() => ({
      initialize: jest.fn().mockResolvedValue(undefined),
      destroy: jest.fn().mockResolvedValue(undefined),
      getRepository: jest.fn().mockReturnValue({
        create: jest.fn().mockImplementation((dto) => dto),
        save: jest.fn().mockImplementation((Users, Posts) => Promise.resolve({
          id: Math.floor(Math.random() * 1000),
          ...Users,
          ...Posts
        })),
        findOne: jest.fn().mockResolvedValue(null)
      }),
    })),
  };
});

const createTestApp = () => {
  const app = express();
  app.use(express.json());
  app.use(router);
  return app;
};

describe("Usuários", () => {
  let testApp: express.Express;
  let mockRepository: jest.Mocked<Repository<any>>;

  beforeAll(() => {
    testApp = createTestApp();
    
    mockRepository = {
      create: jest.fn(),
      save: jest.fn(),
      findOne: jest.fn(),
    } as unknown as jest.Mocked<Repository<any>>;

    (DataSource as jest.Mock).mockImplementation(() => ({
      initialize: jest.fn().mockResolvedValue(undefined),
      getRepository: jest.fn().mockReturnValue(mockRepository),
    }));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Deve criar um novo usuário", async () => {  
    mockRepository.create.mockReturnValue(useMock);
    mockRepository.save.mockResolvedValue(useMock);
    mockRepository.findOne.mockResolvedValue(null);


    const response = await request(testApp)
      .post("/usuario")
      .send(useMock);

    expect(response.statusCode).toBe(201); 
  });
});