import { User } from "../../../domain/entities/User";
import { UserRepository } from "../../../domain/repositories/UserRepository";
import { CreateUserInputDTO } from "../../dto/user/CreateUserInputDTO";
import { CreateUserOutPutDTO } from "../../dto/user/CreateUserOutPutDTO";
import { UseCase } from "../UseCase";

export class CreateUser implements UseCase<CreateUserInputDTO, CreateUserOutPutDTO> {
    constructor(private readonly userRepository: UserRepository) {}

    public async execute(inputDto: CreateUserInputDTO): Promise<CreateUserOutPutDTO> {
        const user = User.create(inputDto.name, inputDto.email, inputDto.password);
        await this.userRepository.save(user);

        const outputDTO: CreateUserOutPutDTO = { id: user.id };
        return outputDTO;
    }
}