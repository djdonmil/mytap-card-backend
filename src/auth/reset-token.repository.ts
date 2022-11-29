import { ResetPasswordToken } from "src/shared/entity/reset-password-token.entity";
import { EntityRepository, getManager, Repository } from "typeorm";

@EntityRepository(ResetPasswordToken)
export class ResetTokenRepository extends Repository<ResetPasswordToken>{
    
    async findToken(resetToken,userId){

        try{
            const result= await getManager()
            .createQueryBuilder(ResetPasswordToken,'resetToken')
            .leftJoinAndSelect('resetToken.user','user')
            .select([
                'resetToken',
                'user'
            ])
            .where('resetToken.token =:token',{token:resetToken})
            .andWhere('resetToken.user_id =:userId',{userId})
            .getOne();
            
            console.log("eres",result)
            
            return result;
        }catch(e){
            console.log("wwww",e)
        }        
    }

}