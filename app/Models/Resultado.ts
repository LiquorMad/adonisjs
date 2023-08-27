import { DateTime } from 'luxon'
//Profile
import { 
  BaseModel, 
  column, 
  belongsTo,
  BelongsTo
} from '@ioc:Adonis/Lucid/Orm'
import Partida from './Partida'

export default class Resultado extends BaseModel {

  @belongsTo(() => Partida)
  public partida: BelongsTo<typeof Partida>
 
  @column({ isPrimary: true })
  public id: number

  @column()
  public id_partida: number

  @column()
  public golos_p2: number

  @column()
  public golos_p1: number

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
