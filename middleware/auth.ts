export default defineNuxtRouteMiddleware(() => {
    const user = useSupabaseUser();

    // Allow access to login and register pages without authentication
    const allowedRoutes = ['/login', '/register'];
    console.log('user', user.value);
    console.log('allowedRoutes', allowedRoutes);
    console.log('route', route.path);
    if (!user.value && !allowedRoutes.includes(route.path)) {
        return navigateTo('/login');
    }
});
