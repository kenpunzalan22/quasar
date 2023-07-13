export default function guest({ to, next, store }) {
  const user = JSON.parse(localStorage.getItem("user"));

  if (user) {
    next('/')
  } else {
    next()
  }
}
