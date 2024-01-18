import { Exception } from '@adonisjs/core/build/standalone'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class Authorize {
  public async handle({session}: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    const token = session.get('token')
    console.log()
    if(typeof(token)==='undefined') {
      throw new Exception('Invalid session token');
    }
    await next()
    console.log('Authorize after next')
  }
}
