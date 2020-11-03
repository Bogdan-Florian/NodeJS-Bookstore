import test from 'ava'
import Books from '../modules/books.js'

test('BOOKS : if database returns an empty object', async test => {
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
		test.is(true,true)
	} catch(err) {
		test.fail(err)
	} finally {
		books.close()
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

