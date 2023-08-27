import { DateTime } from 'luxon'
//User
import { 
  BaseModel, 
  column, 
  hasOne,
  HasOne
} from '@ioc:Adonis/Lucid/Orm'
import Resultado from './Resultado'


export default class Partida extends BaseModel {

  @hasOne(() => Resultado, {
    foreignKey: 'id_partida', // defaults to userId
  })
  public resultado: HasOne<typeof Resultado>

  @column({ isPrimary: true })
  public id: number

  @column()
  public nome: string

  @column()
  public id_player1: number

  @column()
  public id_player2: number

  @column()
  public id_time1: number

  @column()
  public id_time2: number

  @column()
  public estado: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
