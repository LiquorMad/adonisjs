import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Partida from 'App/Models/Partida';
import Resultado from 'App/Models/Resultado';
//Profile
export default class ResultadosController {
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
      
      //const partida = body.partida
      
      //const id_partida = 

      //const golos_p1 = body.golos_p1
      //const golos_p2 = body.golos_p1

      //await Partida.findOrFail(id_partida)

      const resultado = await Resultado.create(body);

      if(resultado.$isPersisted){
        response.status(201)
        return {
          message: 'Retsult created successfully',
          data: resultado
        } // true
      } 
      
    } catch (error) {
      
    }

  }

  public async show({params, response}: HttpContextContract) {
    try {
      const resultado = await Resultado.findOrFail(params.id)

    return response.json(resultado);
    } catch (error) {
      
    }
    
  }

  public async update({params, request}: HttpContextContract) {
    try {
      const body = request.body()

      const resultado = await Resultado.findOrFail(params.id)

      resultado.golos_p1 = body.golos_p1
      resultado.golos_p2 = body.golos_p2

      await resultado.save()
      return {
        message:  'Resultado atualizado com sucesso !',
        data: resultado
      }

    } catch (error) {
      
    }
  }

  public async destroy({params}: HttpContextContract) {
    try {
      const resultado = await Resultado.findOrFail(params.id)

      await resultado.delete()
      
      return{
        message: 'Resultado eliminado com sucesso !'
      }
    } catch (error) {
      
    }
  }
}
