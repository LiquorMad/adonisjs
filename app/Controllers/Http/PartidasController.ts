import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Partida from 'App/Models/Partida';
import Player from 'App/Models/Player';
import Time from 'App/Models/Time';

export default class PartidasController {
  
  public async index({response}: HttpContextContract) {
    try {

      const partidas = await Partida
      .query()
      .preload('resultado')
      return response.json(partidas);

    } catch (error) {
      
    }
  }

  public async create({}: HttpContextContract) {}

  public async store({request,response}: HttpContextContract) {

    try {

        const body = request.body()

        const time_1 = body.time_1
        const time_2 = body.time_2
        const  id_time_1 = await Time.findBy('nome',time_1)
        const  id_time_2 = await Time.findBy('nome',time_2)

        const player_1 = body.player_1
        const player_2 = body.player_2

        const  id_player_1 = await Player.findBy('nome',player_1)
        const  id_player_2 = await Player.findBy('nome',player_2)

        const { nome } = request.body();

        body.id_player1=id_player_1?.id

        const partida = await Partida.create({
          nome: nome,
          id_player1: Number(id_player_1?.id),
          id_player2: Number(id_player_2?.id),
          id_time1: Number(id_time_1?.id),
          id_time2: Number(id_time_2?.id),
        })

        if(partida.$isPersisted){
          response.status(201)
          return {
            message: 'Partida created successfully',
            data: partida
          } // true
        } 
    
    } catch (error) {
      
    }

  }

  public async show({params,response}: HttpContextContract) {
    try {
      const partida = await Partida.findOrFail(params.id)
      return response.json(partida);
    } catch (error) {
      
    }
    
  }

  public async destroy({params}: HttpContextContract) {
    try {
      const partida = await Partida.findOrFail(params.id)

      await partida.delete()
      
      return{
        message: 'Partida eliminado com sucesso !'
      }
    } catch (error) {
      
    }
  }
}
