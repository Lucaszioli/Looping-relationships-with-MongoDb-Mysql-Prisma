import { prismaClient1 as prismaMysql } from '../../../../config/prismaClient';
import { prismaClient2 as prismaMongo } from '../../../../config/prismaClient';
import { v4 as uuidv4 } from 'uuid';
class AulasService {
    async createAula(data: any){
        const id = uuidv4();
        
        const aula = await prismaMysql.aulas.create({
            data:{
                ...data,
                id: id
            }
        });
        
        await prismaMongo.aula.create({
            data:{
                id: id
            }
        });
        return aula;
    }

    async getAulasMysql(){
        const aulas = await prismaMysql.aulas.findMany();
        return aulas;
    }

    async getAulasMongo(id : string){
        const aulas = await prismaMongo.aula.findUnique({
            where:{
                id: id
            },
            include: {
                comentarios: true
            }
        });
        if(!aulas){
            throw new Error('Aula not found');
        }
        aulas.comentarios = await this.GetSubCategory(aulas.comentarios);
        return aulas;
    }

    async GetSubCategory(arr: any[]) {
        const new_arr = []
        for (const element of arr) {
            let responses = await prismaMongo.comentario.findMany({
                where: {
                    parentId: element.id
                }
            })
            element.createdBy = await prismaMysql.usuario.findFirst({
                where:{
                    id: element.createdBy
                }
            })
            if (!Array.isArray(responses) || !responses.length) {
                // array does not exist, is not an array, or is empty
                // ⇒ do not attempt to process array
                new_arr.push(element)
            } else {
                const temp_arr = await this.GetSubCategory(responses)
                element.responses = temp_arr
                new_arr.push(element)
            }
        }
        return new_arr
    }
    async deleteComment(id: string){
        // const comment = await prismaMongo.comentario.delete({
        //     where:{
        //         id: id
        //     }
        // });
        const comment = await prismaMongo.comentario.findUnique({
            where:{
                id: id
            },
            include:{
                replies: true
            }
        });
        if(!comment){
            throw new Error('Comment not found');
        }
        await this.deleteSubCategory(comment.replies)
        await prismaMongo.comentario.delete({
            where:{
                id: id
            }
        });
        return comment;
    }
    async deleteSubCategory(arr: any[]) {
        for (const element of arr) {
            let responses = await prismaMongo.comentario.findMany({
                where: {
                    parentId: element.id
                }
            })
            if (!Array.isArray(responses) || !responses.length) {
                // array does not exist, is not an array, or is empty
                // ⇒ do not attempt to process array
                await prismaMongo.comentario.delete({
                    where:{
                        id: element.id
                    }
                });
            } else {
                const temp_arr = await this.GetSubCategory(responses)
                await this.deleteSubCategory(temp_arr)
                await prismaMongo.comentario.delete({
                    where:{
                        id: element.id
                    }
                })
            }
        }
        return;
    }
    async createComment(data: any){
        const comment = await prismaMongo.comentario.create({
            data:{
                texto: data.texto,
                aulaId: data.aulaId,
                parentId: data.parentId,
                createdBy: data.createdBy
            }
        });
        return comment;
    }
}

export default new AulasService();
