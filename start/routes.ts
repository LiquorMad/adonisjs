import Route from '@ioc:Adonis/Core/Route'

Route.group(()=> {
  Route.resource('times', 'TimesController')
  Route.resource('players', 'PlayersController')
  Route.resource('partidas', 'PartidasController')
  Route.resource('resultados', 'ResultadosController')
}).prefix('/api')
