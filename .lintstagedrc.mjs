export default {
  '*.{ts,tsx,js,jsx}': ['biome check --write'],
  '*.{json,md}': ['biome format --write'],
}
