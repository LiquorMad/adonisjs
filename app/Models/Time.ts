import { DateTime } from 'luxon'
import { BaseModel, HasOne, column, hasOne } from '@ioc:Adonis/Lucid/Orm'
import Partida from './Partida'

export default class Time extends BaseModel {

  @hasOne(() => Partida, {
    foreignKey: 'id_time1', // defaults to userId
  })
  public partida1: HasOne<typeof Partida>

  @hasOne(() => Partida, {
    foreignKey: 'id_time2', // defaults to userId
  })
  public partida2: HasOne<typeof Partida>
  
  @column({ isPrimary: true })
  public id: number
  
  @column()
  public nome: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
