import { UserRepository } from "../../repositories/typeorm/user.repository";
import { FindUserByIdUseCase } from "../user/find-user-by-id";

export const makeFindUserUseByIdCase = () => {
    const userRepository = new UserRepository();
    const findUserUseCase = new FindUserByIdUseCase(userRepository);
    return findUserUseCase;
  };
  