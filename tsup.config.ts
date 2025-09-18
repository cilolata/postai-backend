import { defineConfig } from 'tsup'

export default defineConfig({
    entry: [
        'src/app.ts',
        'src/entities/*.ts',
        'src/lib/**/*.ts',
        'src/migrations/*.ts'
    ],
    outDir: 'dist',
    format: ['cjs'],
    dts: true,
    clean: true,
    splitting: false,
    bundle: false,
    skipNodeModulesBundle: true,
})