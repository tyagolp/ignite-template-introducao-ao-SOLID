import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  name: string;
  email: string;
}

class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ email, name }: IRequest): User {    

    if(!name)
      throw new Error('Name is required');
    if(!email)
      throw new Error('Email is required');

    const userAlreadyExists = this.usersRepository.findByEmail(email);
    if(userAlreadyExists)    
      throw new Error('User already exists');
      
    return this.usersRepository.create({ name, email });
  }
}

export { CreateUserUseCase };
