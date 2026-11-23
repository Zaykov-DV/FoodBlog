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

  const authStore = useAuthUserStore()
  if (!authStore.profileId) await authStore.getCurrentUser()
  if (!authStore.isAdmin) return navigateTo('/')
})
