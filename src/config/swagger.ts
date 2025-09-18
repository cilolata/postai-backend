import swaggerJsdoc from "swagger-jsdoc";
import { EPermission } from "../entities/models/user.interface";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Postai API Documentation",
      version: "1.0.0",
    },
    servers: [
      {
        url: "http://localhost:3000",
        description: "Servidor local",
      },
    ],
    paths: {
      "/posts": {
        post: {
          summary: "Cria um novo post",
          description: "Endpoint para criação de novos posts no sistema",
          tags: ["Posts"],
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  properties: {
                    title: {
                      type: "string",
                      description: "Título do post",
                      example: "Como usar Swagger",
                    },
                    description: {
                      type: "string",
                      description: "Descrição resumida",
                      example: "Guia prático de documentação",
                    },
                    content: {
                      type: "string",
                      description: "Conteúdo completo",
                      example: "Aqui vai o conteúdo detalhado do post...",
                    },
                    subject: {
                      type: "string",
                      description: "Assunto/categoria (opcional)",
                      example: "Tecnologia",
                      nullable: true,
                    },
                    user_id: {
                      type: "integer",
                      description: "ID do autor",
                      example: 1,
                    },
                  },
                  required: ["title", "description", "content", "user_id"],
                },
              },
              responses: {
                201: {
                  description: "Post criado com sucesso",
                  content: {
                    "application/json": {
                      schema: {
                        $ref: "#/components/schemas/Post",
                      },
                    },
                  },
                },
                500: {
                  description: "Erro interno no servidor",
                },
              },
            },
          },
        },
      },
      "/posts/:id": {
        get: {
          summary: "Busca posts com paginação",
          description: "Retorna todos os posts paginados",
          tags: ["Posts"],
          parameters: [
            {
              in: "query",
              name: "id",
              schema: {
                type: "integer",
                minimum: 1,
                default: 1,
              },
              description: "id do post",
            },
          ],
          responses: {
            201: {
              description: "post filtrados",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      data: {
                        type: "object",
                        items: {
                          $ref: "#/components/schemas/Post",
                        },
                      },
                    },
                  },
                },
              },
            },
            500: {
              description: "Erro interno do servidor",
            },
          },
        },
      },
      "/posts/search": {
        get: {
          summary: "Busca posts com paginação",
          description:
            "Retorna posts paginados com possibilidade de busca textual",
          tags: ["Posts"],
          parameters: [
            {
              in: "query",
              name: "search",
              schema: {
                type: "string",
              },
              description:
                "Termo para buscar no título e conteúdo (case insensitive)",
            },
            {
              in: "query",
              name: "page",
              schema: {
                type: "integer",
                minimum: 1,
                default: 1,
              },
              description: "Número da página",
            },
            {
              in: "query",
              name: "limit",
              schema: {
                type: "integer",
                minimum: 1,
                maximum: 100,
                default: 10,
              },
              description: "Quantidade de itens por página",
            },
          ],
          responses: {
            201: {
              description: "Lista de posts filtrados",
              content: {
                "application/json": {
                  schema: {
                    type: "object",
                    properties: {
                      data: {
                        type: "object",
                        items: {
                          $ref: "#/components/schemas/Post",
                        },
                      },
                      type: "object",
                      properties: {
                        total: {
                          type: "integer",
                          description: "Total de posts encontrados",
                        },
                        page: {
                          type: "integer",
                          description: "Página atual",
                        },
                        limit: {
                          type: "integer",
                          description: "Itens por página",
                        },
                        totalPages: {
                          type: "integer",
                          description: "Total de páginas",
                        },
                      },
                    },
                  },
                },
              },
            },
          },
          500: {
            description: "Erro interno do servidor",
          },
        },
      },
      components: {
        schemas: {
          Post: {
            type: "object",
            properties: {
              id: {
                type: "integer",
                description: "ID auto-gerado do post",
                example: 1,
                readOnly: true,
              },
              title: {
                type: "string",
                description: "Título do post",
                example: "Como documentar APIs com Swagger",
                maxLength: 255,
              },
              description: {
                type: "string",
                description: "Descrição resumida do post",
                example: "Um guia prático para documentação de APIs",
              },
              content: {
                type: "string",
                description: "Conteúdo completo do post",
                example: "Lorem ipsum dolor sit amet...",
              },
              subject: {
                type: "string",
                description: "Assunto/categoria do post",
                example: "Tecnologia",
                nullable: true,
                maxLength: 255,
              },
              user_id: {
                type: "integer",
                description: "ID do autor do post",
                example: 1,
              },
              created_at: {
                type: "string",
                format: "date-time",
                description: "Data de criação do post",
              },
              updated_at: {
                type: "string",
                format: "date-time",
                description: "Data de atualização do post",
              },
            },
            required: ["title", "description", "content", "user_id"],
          },
          User: {
            type: "object",
            properties: {
              id: {
                type: "integer",
                description: "ID auto-gerado do usuário",
                example: 1,
                readOnly: true,
              },
              username: {
                type: "string",
                description: "Nome de usuário único",
                example: "john_doe",
              },
              email: {
                type: "string",
                format: "email",
                description: "Endereço de e-mail",
                example: "user@example.com",
                nullable: true,
              },
              password: {
                type: "string",
                format: "password",
                description: "Senha do usuário",
                example: "Str0ngP@ss",
                writeOnly: true,
              },
              permission_type: {
                type: "string",
                enum: Object.values(EPermission),
                example: EPermission.STUDENT,
                description: "Tipo de permissão do usuário",
              },
            },
          },
        },
      },
    },
  },
  apis: ["dist/routes/*.js"],
};

const specs = swaggerJsdoc(options);

export default specs;
