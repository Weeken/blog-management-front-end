// const home = resolve => require(['./home'], resolve)
import updateNote from './updateNote'
export default {
  path: '/updateNote',
  name: 'updateNote',
  component: () => import('./updateNote')
}
