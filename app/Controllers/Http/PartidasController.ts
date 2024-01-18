import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database';
import Partida from 'App/Models/Partida';
import Player from 'App/Models/Player';
import Time from 'App/Models/Time';

export default class PartidasController {
  
  public async index({response}: HttpContextContract) {
    try {
      const resultados = await Database
      .from('partidas')
      .join('players as p1', 'partidas.id_player1', '=', 'p1.id')
      .join('players as p2', 'partidas.id_player2', '=', 'p2.id')
      .join('times as t1', 'partidas.id_time1', '=', 't1.id')
      .join('times as t2', 'partidas.id_time2', '=', 't2.id')
      .select('partidas.nome')
      .select('p1.nome as player_1')
      .select('p2.nome as player_2')
      .select('t1.nome as time_1')
      .select('t2.nome as time_2')
      .select('partidas.id')

      return response.json(resultados);
      
    } catch (error) {
      
    }
  }

  public async create({}: HttpContextContract) {}

  public async store({request,response}: HttpContextContract) {
    
    try {

        const body = request.body()
        const id_time_1 = body.id_time_1
        const id_time_2 = body.id_time_2;
                const id_player_1 = body.id_player_1
        const id_player_2 = body.id_player_2
        console.log(id_player_1,id_player_2)
        //const  id_player_1 = await Player.findBy('nome',player_1)
        //const  id_player_2 = await Player.findBy('nome',player_2)
        //const  id_time_1 = await Time.findBy('nome',time_1)
        //const  id_time_2 = await Time.findBy('nome',time_2)

        const { nome } = request.body();

        //body.id_player1=id_player_1?.id
        const partida = await Partida.create({
          nome: nome,
          id_player1: id_player_1,
          id_player2: id_player_2,
          id_time1: id_time_1,
          id_time2: id_time_2,
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
      const id = Number(params.id); 
      const partida = await Partida.findOrFail(id);
      return response.json(partida);
    } catch (error) {
      
    }
    
  }

  public async update({params, request}: HttpContextContract) {
    try {

      const body = request.body()
      const player_1 = body.player_1
      const player_2 = body.player_2
      const time_1 = body.time_1
      const time_2 = body.time_2
      const id = Number(params.id);

      const partida = await Partida.findOrFail(id)

      const  id_player_1 = await Player.findBy('nome',player_1)
      
      const  id_player_2 = await Player.findBy('nome',player_2)
      const  id_time_1 = await Time.findBy('nome',time_1)
      const  id_time_2 = await Time.findBy('nome',time_2)
      
      partida.nome = body.nome
      partida.id_player1 = Number(id_player_1?.id)
      partida.id_player2 = Number(id_player_2?.id)
      partida.id_time1 = Number(id_time_1?.id)
      partida.id_time2 = Number(id_time_2?.id)

      await partida.save()
      return {
        message:  'Partida atualizado com sucesso !',
        data: partida
      }

    } catch (error) {
      
    }
  }

  public async destroy({params}: HttpContextContract) {
    try {
      const id = Number(params.id);
      const partida = await Partida.findOrFail(id)
      await partida.delete()

      return "Deleted successfully"  ;
      
    } catch (error) {
      return  error.message;
    }
  }
}
