import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Player from 'App/Models/Player'

export default class PlayersController {
  public async index({response}: HttpContextContract) {

    try {
      const player = await Player.all();
      return response.json(player);
    } catch (error) {
      
    }
    
  }

  public async store({ request,response}: HttpContextContract) {
    try {
      const body = request.body()

      const player = await Player.create(body);
  
      if(player.$isPersisted){
        response.status(201)
        return {
          message: 'Player created successfully',
          data: player
        } // true
      } 

    } catch (error) {
      
    }
   

  }

  public async show({params,response}: HttpContextContract) {

    try {
      const player = await Player.findOrFail(params.id)
      return response.json(player);
    } catch (error) {
      
    }
    
  }

  public async update({params, request}: HttpContextContract) {
    try {
      const body = request.body()

      const player = await Player.findOrFail(params.id)

      player.nome = body.nome
      player.apelido = body.apelido

      await player.save()
      return {
        message:  'Player atualizado com sucesso !',
        data: player
      }

    } catch (error) {
      
    }
  }

  public async destroy({params}: HttpContextContract) {
    try {
      const player = await Player.findOrFail(params.id)

      await player.delete()
      
      return{
        message: 'Player eliminado com sucesso !'
      }
    } catch (error) {
      
    }
  }
}
