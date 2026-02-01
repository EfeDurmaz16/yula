import path from 'node:path'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    globals: true,
    coverage: {
      provider: 'v8',
      thresholds: { lines: 100, functions: 100, branches: 100, statements: 100 },
    },
  },
  resolve: {
    alias: {
      '../../convex/_generated/api': path.resolve(__dirname, 'src/__mocks__/convex-api.ts'),
      '../../convex/_generated/dataModel': path.resolve(
        __dirname,
        'src/__mocks__/convex-dataModel.ts',
      ),
    },
  },
})
