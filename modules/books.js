import sqlite from 'sqlite-async'
class Books {

	constructor(dbName) {
		return (async() => {
			this.db = await sqlite.open(dbName)
			await this.db
			return this
		})()
	}

	async getBooks() {
		const sql = 'SELECT * FROM books'
 		const data = await this.db.all(sql)
		if (data === null || undefined) {
			throw new Error('Database could not retrieve data')
		}
		return data


	}

	async close() {
		await this.db.close()
	}
}

export default Books
