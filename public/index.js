/*
New users on the website are checked for UUID cookie
If they do not have one it means its their first time
on the website and a UUID is generated and set for them
*/
window.addEventListener('DOMContentLoaded', event => {
	const userIdentity = getCookie('UUID')
	if (userIdentity === '') {
		setCookie('UUID', createUUID(), 100)
	} else{
		console.log(getCookie('UUID'))
	}


})

function createUUID() {
	const uniqueId = Date.now().toString(36) + Math.random().toString(36).substring(2)
	return uniqueId


}

/*
Set users cookie
*/

function setCookie(cname, cvalue, exdays) {
	const d = new Date()
	// eslint-disable-next-line no-magic-numbers
	const miliseconds = 86400000
	d.setTime(d.getTime() + exdays* miliseconds)
	const expires = `expires=${ d.toUTCString()}`
	document.cookie = `${cname }=${ cvalue };${ expires };path=/`
	console.log()
}


/*
Check if user contains 'cname' cookie in their browser
*/
function getCookie(cname) {
	const name = `${cname }=`
	const decodedCookie = decodeURIComponent(document.cookie)
	const ca = decodedCookie.split(';')
	for(let i = 0; i <ca.length; i++) {
		let c = ca[i]
		while (c.charAt(0) === ' ') {
			c = c.substring(1)
		}
		if (c.indexOf(name) === 0) {
			return c.substring(name.length, c.length)
		}
	}
	return ''
}
