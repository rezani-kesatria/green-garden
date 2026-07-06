import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

// Resolve the Tailwind config by absolute path — the dev server may be
// launched with a different cwd (e.g. via the preview harness), and the
// default cwd-relative lookup would silently pick up another project's config.
const root = dirname(fileURLToPath(import.meta.url))

export default {
  plugins: {
    tailwindcss: { config: join(root, 'tailwind.config.js') },
    autoprefixer: {},
  },
}
