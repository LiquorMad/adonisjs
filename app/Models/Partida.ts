import { DateTime } from 'luxon'
//User
import { 
  BaseModel, 
  BelongsTo, 
  belongsTo, 
  column, 
} from '@ioc:Adonis/Lucid/Orm'
import Time from './Time'
import Player from './Player'

export default class Partida extends BaseModel {

  @belongsTo(() => Time)
  public time: BelongsTo<typeof Time>

  @belongsTo(() => Player)
  public player: BelongsTo<typeof Player>

  @column({ isPrimary: true })
  public id: number

  @column()
  public nome: string

  @column()
  public id_resultado: number

  @column()
  public id_player1: number

  @column()
  public id_player2: number

  @column()
  public id_time1: number

  @column()
  public id_time2: number

  @column()
  public golos_p1: number

  @column()
  public golos_p2: number

  @column()
  public estado: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
