let options = {
  routes: []
}

let noNav = (r => {
  return r.keys().map(key => r(key).default)
})(require.context('../pages/', true, /^\.\/noTab\/([\s\S])+\/route\.js$/))

let management = (r => {
  return r.keys().map(key => r(key).default)
})(require.context('../pages/', true, /^\.\/management\/([\s\S])+\/route\.js$/))

// let hasNav = {
//   path: '/nav',
//   component: () => import('components/navigator'),
//   name: 'nav',
//   children: (r => {
//     return r.keys().map(key => r(key).default)
//   })(require.context('../pages/', true, /^\.\/hasTabs\/([\s\S])+\/route\.js$/))
// }

options.routes = [...noNav, ...management]
options.routes.push({path: '/', redirect: '/login'})
// options.routes.push(hasNav)

// eslint-disable-next-line
// options.scrollBehavior = (to, from, savedPosition) => {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (to.path === '/note') {
//         // console.log();
//         resolve({ x: 0, y: parseInt(window.localStorage.getItem('scrollTop')) || 0 })
//       } else {
//         resolve({ x: 0, y: 0 })
//       }
//     }, 2000)
//   })
// }

export default options
