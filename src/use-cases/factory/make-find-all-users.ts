import { UserRepository } from "../../repositories/typeorm/user.repository";
import { FindAllUsersUserUseCase } from "../user/find-all-users";

export const makeFindAllUsersUseCase = () => {
    const userRepository = new UserRepository();
    const findUserUseCase = new FindAllUsersUserUseCase(userRepository);
    return findUserUseCase;
  };
  