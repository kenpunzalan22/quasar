export default function auth({ to, next, store }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    next({ name: 'login' })
  } else {
    next()
  }
}
