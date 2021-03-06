
import Router from 'koa-router'
import bodyParser from 'koa-body'

const router = new Router()
router.use(bodyParser({multipart: true}))

import Books from '../modules/books.js'
import Accounts from '../modules/accounts.js'
const dbName = 'website.db'

/**
 * The secure home page.
 *
 * @name Home Page
 * @route {GET} /
 */

router.get('/', async ctx => {
	try {
		if (ctx.session.basket === undefined) {
			ctx.session.basket = []
		}
		const books = await new Books(dbName)
		const data = await books.getBooks()
		ctx.hbs.data = data
		ctx.session.data = data
		await ctx.render('index', ctx.hbs)
	} catch(err) {
		console.log(err)
		await ctx.render('error', ctx.hbs)
	}
})

/**
 * The user registration page.
 *
 * @name Register Page
 * @route {GET} /register
 */
router.get('/register', async ctx => await ctx.render('register'))

/**
 * The script to process new user registrations.
 *
 * @name Register Script
 * @route {POST} /register
 */
router.post('/register', async ctx => {
	const account = await new Accounts(dbName)
	try {
		// call the functions in the module
		await account.register(ctx.request.body.user, ctx.request.body.pass, ctx.request.body.email)
		ctx.redirect(`/login?msg=new user "${ctx.request.body.user}" added, you need to log in`)
	} catch(err) {
		ctx.hbs.msg = err.message
		ctx.hbs.body = ctx.request.body
		console.log(ctx.hbs)
		await ctx.render('register', ctx.hbs)
	} finally {
		account.close()
	}
})

router.get('/login', async ctx => {
	console.log(ctx.hbs)
	await ctx.render('login', ctx.hbs)
})

router.get('/basket', async ctx => {
  ctx.hbs.data = []
  console.log(ctx.session.basket)
  for (let data of ctx.session.data)
    {
      if (ctx.session.basket.includes(data['id'])){
        ctx.hbs.data.push(data)
      }
    }
 
  await ctx.render('basket', ctx.hbs)
})


router.post('/removeFromBasket', async ctx =>{
 let removedBookId = parseInt(ctx.request.body.id)
 console.log(removedBookId)
 ctx.session.basket = ctx.session.basket.filter(function(item) {
  return item !== removedBookId
})

  ctx.response.status = 200
})


router.post('/login', async ctx => {
	const account = await new Accounts(dbName)
	ctx.hbs.body = ctx.request.body
	try {
		const body = ctx.request.body
		await account.login(body.user, body.pass)
		ctx.session.authorised = true
		const referrer = body.referrer || '/'
		if (ctx.session.basket === undefined) {
			ctx.session.basket = []
		}
		return ctx.redirect(`${referrer}?msg=you are now logged in...`)
	} catch(err) {
		ctx.hbs.msg = err.message
		await ctx.render('login', ctx.hbs)
	} finally {
		account.close()
	}
})

router.get('/logout', async ctx => {
	ctx.session.authorised = null
	ctx.redirect('/?msg=you are now logged out')
})


router.get('/product/:id', async ctx => {
	const bookId = ctx.params['id']
	const books = await new Books(dbName)
	const bookData = await books.getIndividualBook(bookId)
	ctx.hbs.data = bookData
	await ctx.render('product',ctx.hbs)

})


router.post('/addItem', async ctx => {
	const bookId = parseInt(ctx.request.body['id'])
	const bookInBasket = ctx.session.basket.includes(bookId)
	if (!bookInBasket) {
		ctx.session.basket.push(bookId)
	} else{
		ctx.response.body = 'failed'
	}
	ctx.status = 200
})


export default router
