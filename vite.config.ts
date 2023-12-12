/// <reference types="vite/client" />
/// <reference types="vitest" />

// import { defineConfig } from 'vite'
import { defineConfig } from 'vitest/config'
import path from 'path';
import solid from 'vite-plugin-solid'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
    resolve: {
        alias: {
            '@pages': path.resolve(__dirname, './src/pages'),
            '@controls': path.resolve(__dirname, './src/controls'),
            '@data': path.resolve(__dirname, './src/state'),
            '@': path.resolve(__dirname, './src'),
        },
        conditions: ['development', 'browser'],
    },
    define: {
        APP_VERSION: JSON.stringify(process.env.npm_package_version),
    },
    plugins: [
        solid(),
        VitePWA({
            registerType: 'autoUpdate',
            workbox: {
                globPatterns: ['**/*.{js,css,html,ico,png,svg}']
            },
            manifest: {
                name: 'Time Tracker',
                short_name: 'TimeTracker',
                description: 'A work time tracking application',
                theme_color: '#c2410c',
                background_color: "#0a0a0a",
                icons: [
                    {
                        "src": "/pwa-192x192.png",
                        "sizes": "192x192",
                        "type": "image/png",
                        "purpose": "any"
                    },
                    {
                        "src": "/pwa-512x512.png",
                        "sizes": "512x512",
                        "type": "image/png",
                        "purpose": "any"
                    },
                    {
                        "src": "/pwa-maskable-192x192.png",
                        "sizes": "192x192",
                        "type": "image/png",
                        "purpose": "maskable"
                    },
                    {
                        "src": "/pwa-maskable-512x512.png",
                        "sizes": "512x512",
                        "type": "image/png",
                        "purpose": "maskable"
                    }
                ]
            }
        }),
    ],
    test: {
        environment: "jsdom",
        deps: {
            // inline: [/solid-js/],
            optimizer: {
                web: {
                    exclude: ['solid-js'],
                },
            },
        },
        // globals: true,
        setupFiles: [
            // 'node_modules/@testing-library/jest-dom',
            // @testing-library/jest-dom ?
            // '@testing-library/jest-dom',
            'fake-indexeddb/auto',
            './vitest-setup.ts'
        ],
        // transformMode: { web: [/\.[jt]sx?$/] },
        coverage: {
            enabled: true,
            provider: 'v8',
        },
    },
})
