import { defineCloudflareConfig } from '@opennextjs/cloudflare'

// Configuration minimale (staging). Pas de cache incrémental R2 pour l'instant —
// voir wrangler.jsonc pour activer NEXT_INC_CACHE_R2_BUCKET si besoin.
export default defineCloudflareConfig({})
