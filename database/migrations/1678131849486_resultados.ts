import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class extends BaseSchema {
  protected tableName = 'resultados'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer("id_partida").unsigned().references("partidas.id").onDelete("CASCADE")
      table.integer("golos_p1").notNullable()
      table.integer("golos_p2").notNullable()
      
      table.timestamps(true, true)

    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
