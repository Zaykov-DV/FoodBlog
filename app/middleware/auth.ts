import { getAuth, onAuthStateChanged } from 'firebase/auth'

export default defineNuxtRouteMiddleware(async () => {
  if (import.meta.server) return

  const user = await new Promise((resolve) => {
    const unsubscribe = onAuthStateChanged(getAuth(), (currentUser) => {
      unsubscribe()
      resolve(currentUser)
    })
  })

  if (!user) return navigateTo('/login')
})
