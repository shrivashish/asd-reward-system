# Deploying Star Board to Azure Static Web Apps

Star Board is a fully static PWA (built with webpack into `dist/`). It needs no
server, no database, and no Azure Functions — so **Azure Static Web Apps** is a
good, low-cost fit (the Free tier is enough for this app).

This guide covers:

1. What Azure resource to create.
2. How to create it (Portal and CLI).
3. Where to put the resource details so the GitHub pipeline can deploy.

---

## 1. What you need to create

| Item | Value / Notes |
| --- | --- |
| **Resource type** | Azure Static Web App |
| **Plan / SKU** | `Free` (sufficient) or `Standard` if you need custom auth/SLA |
| **Region** | Closest to your users (e.g. `Central US`, `West Europe`) |
| **Deployment source** | GitHub (this repo) — or "Other" if you prefer to wire CI yourself |
| **App location** | `dist` (our webpack build output) |
| **API location** | _empty_ (no backend) |
| **Output location** | _empty_ (we deploy a pre-built `dist`) |

The repo already contains everything the build/deploy needs:

- `.github/workflows/azure-static-web-apps.yml` — the CI/CD pipeline.
- `public/staticwebapp.config.json` — copied into `dist` at build time; it
  configures SPA fallback routing and caching so deep links and the service
  worker behave correctly.

---

## 2. How to create the resource

You only need **one** of the two options below.

### Option A — Azure Portal (UI)

1. Go to <https://portal.azure.com> → **Create a resource** → search
   **"Static Web App"** → **Create**.
2. Fill in the **Basics** tab:
   - **Subscription** and **Resource Group** (create a new group, e.g.
     `rg-star-board`).
   - **Name**: e.g. `star-board`.
   - **Plan type**: `Free`.
   - **Region**: pick the nearest.
3. **Deployment details**:
   - **Source**: `GitHub` → sign in and authorize.
   - **Organization / Repository / Branch**: select this repo and `main`.
   - **Build Presets**: choose **Custom**.
   - **App location**: `dist`
   - **Api location**: _(leave empty)_
   - **Output location**: _(leave empty)_
4. **Review + create** → **Create**.

> ⚠️ When you create the resource through the Portal with a GitHub source,
> Azure **automatically commits its own workflow file** into
> `.github/workflows/`. If that happens, delete Azure's generated file and keep
> the one in this repo (`azure-static-web-apps.yml`), because ours builds with
> our exact webpack config and uses `skip_app_build`. Azure will also have added
> the deployment token secret for you (see step 3 below) — that part you keep.

If you prefer to avoid the auto-generated workflow entirely, choose
**Source: Other** in step 3. Then you grab the token manually (see next).

### Option B — Azure CLI

```bash
# Log in
az login

# Create a resource group (skip if you already have one)
az group create \
  --name rg-star-board \
  --location centralus

# Create the Static Web App (no GitHub wiring — we use our own workflow)
az staticwebapp create \
  --name star-board \
  --resource-group rg-star-board \
  --location centralus \
  --sku Free
```

Then read the **deployment token**:

```bash
az staticwebapp secrets list \
  --name star-board \
  --resource-group rg-star-board \
  --query "properties.apiKey" -o tsv
```

Copy the printed value — that's your `AZURE_STATIC_WEB_APPS_API_TOKEN`.

---

## 3. Where to add the resource details

The pipeline authenticates to your Static Web App with a single secret. **You do
not paste it into any file** — store it as a GitHub Actions secret.

### Add the deployment token to GitHub

1. In Azure, get the token:
   - **Portal**: open your Static Web App → **Overview** → **Manage deployment
     token** → copy it.
   - **CLI**: use the `az staticwebapp secrets list` command shown above.
2. In GitHub, go to this repository →
   **Settings → Secrets and variables → Actions → New repository secret**.
3. Create a secret named **exactly**:

   ```
   AZURE_STATIC_WEB_APPS_API_TOKEN
   ```

   Paste the token as the value → **Add secret**.

That name is the only thing the workflow expects — see
`.github/workflows/azure-static-web-apps.yml`:

```yaml
azure_static_web_apps_api_token: ${{ secrets.AZURE_STATIC_WEB_APPS_API_TOKEN }}
```

> If you ever rotate or regenerate the token in Azure, just update this one
> GitHub secret — nothing in the code changes.

---

## 4. How the pipeline works

On every push to `main` (and on pull requests targeting `main`) the workflow:

1. Checks out the repo and installs dependencies with `npm ci`.
2. Runs `npm run build` → produces `dist/` (including
   `staticwebapp.config.json`).
3. Runs the `Azure/static-web-apps-deploy` action with `skip_app_build: true`
   and `app_location: dist`, uploading the pre-built files.

Pull requests get a temporary **staging** environment with their own URL;
closing the PR tears that environment down automatically (the
`close_pull_request` job).

Your production URL is shown in the Azure Portal on the Static Web App
**Overview** page (e.g. `https://<name>.azurestaticapps.net`).

---

## 5. Local sanity check (optional)

You can produce the exact artifact the pipeline deploys:

```bash
npm ci
npm run build
# Serve the output to verify before pushing
npx serve dist
```

If deep links and a refresh on a sub-route work locally, the
`staticwebapp.config.json` fallback is doing its job and Azure will behave the
same way.
