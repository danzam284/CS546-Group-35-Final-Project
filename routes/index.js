import authRoutes from './auth_routes.js';

const constructorMethod = (app) => {
    app.use('/', authRoutes);
}

export default constructorMethod;