export default function hospital({ to, next, store }) {
  const hospital = JSON.parse(localStorage.getItem("hospital"));

  if (!hospital) {
    next('/')
  } else {
    next()
  }
}
