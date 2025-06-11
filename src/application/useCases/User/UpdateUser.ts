import { User } from '../../../domain/entities/User';
import { UserRepository } from '../../../domain/repositories/UserRepository';
import { UpdateuserInputDTO } from '../../dto/user/UpdateUserInputDTO';
import { UpdateUserOutputDTO } from '../../dto/user/UpdateUserOutputDTO';
import { UseCase } from '../UseCase';

export class UpdateUser implements UseCase<UpdateuserInputDTO, UpdateUserOutputDTO> {
    constructor(private userRepository: UserRepository) {}

    async execute(input: UpdateuserInputDTO): Promise<UpdateUserOutputDTO> {
        try {
            const existingUser = await this.userRepository.findById(input.id);
            
            if (!existingUser) {
                return {
                    id: input.id,
                    success: false,
                    message: 'User not found'
                };
            }
              // Obter os dados atuais do usuário
            const currentProps = existingUser.toPersistentData();
            
            // Criar um novo usuário com os dados atualizados
            const updatedUser = User.fromPersistentData({
                id: currentProps.id,
                name: input.name ?? currentProps.name,
                email: input.email ?? currentProps.email,
                password: input.password ?? currentProps.password,
            });
            
            await this.userRepository.update(updatedUser);
              return {
                id: updatedUser.id,
                success: true,
                message: 'User updated successfully'
            };
        } catch (error) {
            console.error('Error updating User:', error);
            return {
                id: input.id,
                success: false,
                message: 'Failed to update User'
            };
        }
    }
}
