'use strict'

const Schema = use('Schema')

class CreateCacheTable extends Schema {
  
  /**
   * Run the migrations.
   *
   * @return {void}
   */
  async up () {
    const exists = await this.hasTable('cache')
    
    if (exists === false) {
      this.create('cache', (table) => {
        table.string('key').unique()
        table.text('value')
        table.integer('expiration')
      })
    }
    
  }

  /**
   * Reverse the migrations/
   *
   * @return {void}
   */
  async down () {
    const exists = await this.hasTable('cache')
    if (exists === true) {
      this.dropIfExists('cache')
    }
  }

}

module.exports = CreateCacheTable
