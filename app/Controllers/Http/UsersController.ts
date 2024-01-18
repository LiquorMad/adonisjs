import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Database from '@ioc:Adonis/Lucid/Database';
import ApiToken from 'App/Models/ApiToken';
import User from 'App/Models/User';

export default class UsersController {
  public async index({response}: HttpContextContract) {
    try {
      const user = await User.all();
      return response.json(user);
    } catch (error) {
      
    }

  }

  public async create({}: HttpContextContract) {}

  public async store({request,response}: HttpContextContract) {
    try {
      const body = request.body()

      const user = await User.create(body);
  
      if(user.$isPersisted){
        response.status(201)
        return {
          message: 'User created successfully',
          data: user
        } // true
      } 

    } catch (error) {
      
    }
  }

  public async show({params,response}: HttpContextContract) {
    const user = await User.findByOrFail('email', params.id)
    const token = await Database
      .from('api_tokens as api')
      .join('users', 'api.user_id', '=', 'users.id')
      .select('api.token').orderBy('api.id', 'desc').first()

    return response.json({
      user:user,
      token:token
    });
  }

  public async edit({}: HttpContextContract) {}

  public async update({}: HttpContextContract) {}

  public async destroy({}: HttpContextContract) {}

  public async getUserByToken({params,response}:HttpContextContract){
    const token = params.token
    const api_token = await Database
      .from('api_tokens as api')
      .join('users', 'api.user_id', '=', 'users.id')
      .where('token',token)
      .select('users.id')
      .select('users.email')
      .select('api.token');
    return response.json(api_token);
  }
  public async logout({params,session}: HttpContextContract) {
    try {
      const token = params.token;
      const api = await ApiToken.findByOrFail('token', token)
      const response = await api.delete()
      session.forget('token');
      return response
    } catch (error) {
      return  error.message;
    }
  }
}
