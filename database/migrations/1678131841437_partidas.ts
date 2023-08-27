import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'partidas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nome')
      table.integer("id_player1").unsigned().references("players.id").onDelete("CASCADE")
      table.integer("id_time1").unsigned().references("times.id").onDelete("CASCADE")
      table.integer("id_player2").unsigned().references("players.id").onDelete("CASCADE")
      table.integer("id_time2").unsigned().references("times.id").onDelete("CASCADE")
      table.string('estado').defaultTo('ativo')
      table.timestamps(true, true)
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
