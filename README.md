# A lib to manage pagination.

Usage:

```js
import Pager from 'trick-pager'
const pager = Pager()

// Pager only paginates between 1 and 100.
// If you try to call next() or previous()
// after exceeding bounds nothing happens
pager.setBounds(1, 4)

pager.attach({
  [1]: _ => console.log('First page ayee'),
  each: page => console.log('This is the current page:', page)
})

pager.goTo(3) // Current page is 3
pager.next() // Current page is 4
pager.next() // Current page is 4
pager.previous() // Current page is 3
pager.getPage() // 3

pager.attachTo(2, _ => console.log('This is the second page!!'))

```
