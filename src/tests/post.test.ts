import request from "supertest";
import { AppDataSource } from "../lib/typeorm/typeorm";
import express from "express";
import { router } from "../routes/routes";

let userId: number;

const createTestApp = () => {
  const app = express();
  app.use(express.json());
  app.use(router);
  return app;
};

let app: express.Express;

describe("Posts", () => {
  beforeAll(() => {
    app = createTestApp();

    if (!AppDataSource.isInitialized) {
      const start = async () => {
        await AppDataSource.initialize();
      };
      start();
    }
  });

  afterAll(() => {
    // Fecha a conexão com o banco após os testes
    if (AppDataSource.isInitialized) {
      const destroy = async () => {
        await AppDataSource.destroy();
      };
      destroy();
    }
  });

  it("Deve criar um novo post", async () => {
    const createuser = async () => {
      // Cria o usuário professor_teste antes dos testes
      const user = await request(app).post("/usuario").send({
        username: "professor_teste",
        password: "123456",
        email: "professor@example.com",
        permission_type: "0",
      });
      return user.body.id;
    };

    const userId = createuser();
    const res = await request(app).post("/posts").send({
      title: "Post de teste",
      description: "Descrição de teste",
      content: "Conteúdo do post",
      subject: "Matemática",
      user_id: userId,
    });

    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty("id");
  });

  it("Deve listar todos os posts", async () => {
    const res = await request(app).get("/posts");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("Deve buscar um post por ID", async () => {
    const createuser = async () => {
      // Cria o usuário professor_teste antes dos testes
      const user = await request(app).post("/usuario").send({
        username: "professor_teste",
        password: "123456",
        email: "professor@example.com",
        permission_type: "0",
      });
      return user.body.id;
    };

    const userId = createuser();
    const postCriado = await request(app).post("/posts").send({
      title: "Post para buscar",
      description: "Descrição teste buscar",
      content: "Conteúdo teste buscar",
      subject: "História",
      user_id: userId,
    });

    const res = await request(app).get(`/posts/${postCriado.body.id}`);
    expect(res.status).toBe(200);
    expect(res.body.id).toBe(postCriado.body.id);
  });

  it("Deve atualizar um post existente", async () => {
    const createuser = async () => {
      // Cria o usuário professor_teste antes dos testes
      const user = await request(app).post("/usuario").send({
        username: "professor_teste",
        password: "123456",
        email: "professor@example.com",
        permission_type: "0",
      });
      return user.body.id;
    };

    const userId = createuser();
    const postCriado = await request(app).post("/posts").send({
      title: "Post para atualizar",
      description: "Descrição antes",
      content: "Conteúdo antes",
      subject: "Física",
      user_id: userId,
    });

    const res = await request(app).put(`/posts/${postCriado.body.id}`).send({
      title: "Post atualizado",
      description: "Descrição depois",
      content: "Conteúdo depois",
      subject: "Física",
      user_id: userId,
    });

    expect(res.status).toBe(200);
  });

  it("Deve deletar um post", async () => {
    const createuser = async () => {
      // Cria o usuário professor_teste antes dos testes
      const user = await request(app).post("/usuario").send({
        username: "professor_teste",
        password: "123456",
        email: "professor@example.com",
        permission_type: "0",
      });
      return user.body.id;
    };

    const userId = createuser();
    const postCriado = await request(app).post("/posts").send({
      title: "Post para deletar",
      description: "Descrição delete",
      content: "Conteúdo delete",
      subject: "Química",
      user_id: userId,
    });

    const res = await request(app).delete(`/posts/${postCriado.body.id}`);
    expect(res.status).toBe(201);
  });
});
