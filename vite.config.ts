import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import path from 'path';

export default defineConfig({
    resolve: {
        alias: {
            '@pages': path.resolve(__dirname, './src/pages'),
            '@controls': path.resolve(__dirname, './src/controls'),
            '@data': path.resolve(__dirname, './src/state'),
            '@': path.resolve(__dirname, './src'),
        }
    },
    define: {
        APP_VERSION: JSON.stringify(process.env.npm_package_version),
    },
    plugins: [solid()],

})
