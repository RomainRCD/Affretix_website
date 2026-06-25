# Déploiement — Affretix (Cloudflare Workers + OpenNext)

Site Next.js 15 déployé sur **Cloudflare Workers** via l'adaptateur **`@opennextjs/cloudflare`**.
Déploiement continu : chaque push sur `main` redéploie en prod.
Le site est **non public** pour l'instant (garde-fous d'indexation + accès protégé).

---

## 1. Pré-requis (une seule fois, en local)

```bash
npm install            # installe @opennextjs/cloudflare, wrangler, et bump Next ≥ 15.5.18
cp .dev.vars.example .dev.vars   # puis renseigne RESEND_API_KEY pour tester le formulaire en local
```

Aperçu local dans le vrai runtime Workers :

```bash
npm run preview        # build OpenNext + serveur local Workers
```

> `npm run dev` reste disponible pour le dev classique Next.

---

## 2. Brancher le repo à Cloudflare (CI/CD)

> Tout ce qui touche au compte Cloudflare, au DNS et aux secrets doit être fait **par toi** —
> je ne peux pas créer de projet, modifier le DNS ni saisir de secret à ta place.

1. Cloudflare Dashboard → **Workers & Pages** → **Create** → **Workers** → **Connect to Git**.
2. Choisis le repo **`RomainRCD/Affretix_website`**, branche de production **`main`**.
3. Réglages de build (Workers Builds) :
   - **Build command** : `npx opennextjs-cloudflare build`
   - **Deploy command** : `npx opennextjs-cloudflare deploy`
   - **Build output** : laisser par défaut (géré par OpenNext / `wrangler.jsonc`).
4. Le nom du Worker doit rester **`affretix-website`** (= `name` dans `wrangler.jsonc`).
5. Les flags `nodejs_compat` + `global_fetch_strictly_public` et la `compatibility_date`
   sont déjà dans `wrangler.jsonc` — rien à régler à la main.

À chaque push sur `main`, Cloudflare build et déploie automatiquement.

---

## 3. Secret Resend (formulaire de devis)

La route `/api/contact` lit `RESEND_API_KEY` dans l'environnement du Worker.

- Dashboard → le Worker `affretix-website` → **Settings → Variables and Secrets** →
  **Add → Secret** → nom `RESEND_API_KEY`, valeur = ta clé Resend.
- Ou en CLI : `npx wrangler secret put RESEND_API_KEY`

> Sans cette clé, le formulaire renverra une erreur côté serveur (le reste du site marche).

---

## 4. Domaine (affretix.fr / .com)

1. Vérifie d'abord **quel domaine tu possèdes** et où il est (registrar / déjà sur Cloudflare ?).
2. Si le domaine n'est pas encore sur Cloudflare : Dashboard → **Add a site** → suivre les
   instructions (changement des serveurs DNS chez le registrar).
3. Une fois la zone active : le Worker `affretix-website` → **Settings → Domains & Routes** →
   **Add → Custom domain** → saisir `affretix.fr` (et/ou `www.affretix.fr`).
   Cloudflare crée le DNS et le certificat automatiquement.

---

## 5. Garde-fous « site non public » (déjà en place dans le code)

Triple protection, **à retirer au lancement officiel** :

1. **`robots.ts`** → `Disallow: /` (robots.txt bloque tous les crawlers).
2. **`layout.tsx`** → `robots: { index: false, follow: false }` (balise meta noindex sur toutes les pages).
3. **`public/_headers`** → en-tête `X-Robots-Tag: noindex, nofollow, noarchive` sur toutes les réponses.

### Accès protégé (au choix — recommandé : Cloudflare Access)

**Option A — Cloudflare Access (recommandé, sans code) :** seules les personnes autorisées
peuvent voir le site ; chacune reçoit un code à usage unique par email.
- Dashboard → **Zero Trust** → **Access → Applications** → **Add an application** → **Self-hosted**.
- Domaine de l'app : `affretix.fr` (ou le sous-domaine de preview).
- Policy : **Allow**, règle **Emails** = ta liste d'adresses autorisées (toi + le client).
- Méthode de login : **One-time PIN** (code par email, aucun compte à créer).
- Résultat : le site est invisible publiquement, accessible seulement aux emails listés.
  Retirable en 1 clic le jour du lancement.

**Option B — mot de passe unique partagé :** si tu préfères un simple login/mot de passe,
je peux ajouter un middleware Next (Basic Auth) lisant un secret `SITE_PASSWORD`.
Dis-le-moi et je l'ajoute (≈ 15 lignes).

---

## Récapitulatif des rôles

| Action | Qui |
|---|---|
| Config repo (OpenNext, wrangler, noindex, scripts) | ✅ fait dans le code |
| `npm install` + test local `npm run preview` | toi |
| Créer le projet Workers + connecter GitHub | toi (je te guide) |
| Secret `RESEND_API_KEY` | toi |
| Domaine + DNS | toi (je te guide) |
| Cloudflare Access (accès protégé) | toi (je te guide) |
| Pousser le code / les modifs | push sur `main` → auto-deploy |
