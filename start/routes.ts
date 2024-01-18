import Route from '@ioc:Adonis/Core/Route'

Route.group(()=> {
  Route.resource('times', 'TimesController')
  Route.resource('players', 'PlayersController')
  Route.resource('partidas', 'PartidasController')
  Route.resource('resultados', 'ResultadosController')
  Route.resource('users', 'UsersController')
  Route.get('/usersToken/:token', 'UsersController.getUserByToken')
  Route.delete('logout/:token', 'UsersController.logout')
}).prefix('/api')
//.middleware('authorize')


Route.group(() => {
  Route.post('login', async ({ auth, request, response,session}) => {
    const email = request.input('email')
    const password = request.input('password')
    try {
      const token = await auth.use('api').attempt(email, password, {
        expiresIn: '2 mins'
      })
      session.put('token', token);
        return token
    } catch {
      return response.unauthorized('Invalid credentials')
    }
  })
  
}).prefix('/api')