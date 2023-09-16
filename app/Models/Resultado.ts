import { DateTime } from 'luxon'
//Profile
import { 
  BaseModel, 
  HasOne, 
  column,
  hasOne, 
} from '@ioc:Adonis/Lucid/Orm'
import Partida from './Partida'

export default class Resultado extends BaseModel {

  @hasOne(() => Partida
  , {
    foreignKey: 'id_resultado', // defaults to userId
  })
  public partida: HasOne<typeof Partida>

  @column({ isPrimary: true })
  public id: number

  @column()
  public golos_p2: number

  @column()
  public golos_p1: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
