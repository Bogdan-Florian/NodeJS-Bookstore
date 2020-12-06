import test from 'ava'
import Books from '../modules/books.js'

test('BOOKS : database does not contain any empty objects', async test => {
	test.plan(1)
	const books = await new Books('website.db')
	try {
		const data = await books.getBooks()
		test.is(Object.keys(data).length === 0 && data.constructor === Object, false)
	} catch(err) {
		test.fail(err)
	} finally {
		books.close()
	}
})


test('BOOKS : instantiate class and retrieve data', async test => {
	test.plan(1)
	const books = await new Books('website.db')
	try {
		const data = await books.getBooks()
		data.length
		test.is(true,true)
	} catch(err) {
		test.fail(err)
	} finally {
		books.close()
	}
})


test('BOOKS : Individual books has no missing fields', async test => {
	test.plan(0)


	const individualBook = await new Books('website.db')

	const data = await individualBook.db.all('SELECT * FROM books INNER JOIN books_extra ON books.id = books_extra.id')
	for (const each in data) {
		if(data[each] === undefined || data[each].length === 0) {
			test.fail(`Test failed at record number: ${ each}`)
		}
	}
})


// test('BOOKS : if database data has empty fields', async test => {
// 	test.plan(1)
// 	const books = await new Books('website.db')
// 	try {


// 	books.forEach(function (arrayItem) {
//     break
//     console.log(arrayItem);
// });


// 	} catch(err) {
//     test.fail(err)
// 	} finally {
// 		books.close()
// 	}
// })

