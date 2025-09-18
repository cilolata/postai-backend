import { Router } from "express";
import { createUserController } from "../http/controllers/user-controller/create-user";
import { findUsersController } from "../http/controllers/user-controller/find-user";

import { createPostController } from "../http/controllers/post-controller/create-post";
import { deletePostByIdPostController } from "../http/controllers/post-controller/delete-post";
import { findAllPostsController } from "../http/controllers/post-controller/find-all-posts";
import { FindPostByIdPostController } from "../http/controllers/post-controller/find-post-by-id";
import { updatedpostByIdPostController } from "../http/controllers/post-controller/update.post";

const router = Router();

// Usuários
router.post("/cadastrar", createUserController);
router.post("/login", findUsersController);

// Posts
router.post("/posts", createPostController);
router.get("/posts", findAllPostsController);
router.get("/posts/:id", FindPostByIdPostController);
router.put("/posts/:id", updatedpostByIdPostController);
router.delete("/posts/:id", deletePostByIdPostController);

export { router };
