export default defineNuxtRouteMiddleware(async (to: RouteLocationNormalizeGeneric, from :RouteLocationNormalizeGeneric) => {
    const user = await getCurrentUser()

    if (user && to.name === 'login') {
        return navigateTo('/')
    }

    if (!user && to.name !== 'login' && to.name !== 'signup') {
        return navigateTo('/login')
    }
})