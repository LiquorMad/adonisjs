import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Time from 'App/Models/Time';

export default class TimesController {
  public async index({response}: HttpContextContract) {
    try {
      const time = await Time.all();
      return response.json(time);
    } catch (error) {
      
    }
  }

  public async create({}: HttpContextContract) {}

  public async store({request,response}: HttpContextContract) {
    try {
      const body = request.body()

      const time = await Time.create(body);
  
      if(time.$isPersisted){
        response.status(201)
        return {
          message: 'Team created successfully',
          data: time
        } // true
      } 
  
    } catch (error) {
      
    }
  }

  public async show({params,response}: HttpContextContract) {

    try {
      const time = await Time.findOrFail(params.id)
      return response.json(time)
    } catch (error) {
      
    }
    
  }

  public async update({params, request}: HttpContextContract) {
    try {
      const body = request.body()

      const time = await Time.findOrFail(params.id)

      time.nome = body.nome

      await time.save()
      return {
        message:  'Time atualizado com sucesso !',
        data: time
      }

    } catch (error) {
      
    }
  }

  public async destroy({params}: HttpContextContract) {
    try {
      const time = await Time.findOrFail(params.id)

      await time.delete()
      
      return{
        message: 'Time eliminado com sucesso !'
      }
    } catch (error) {
      
    }
  }
}
