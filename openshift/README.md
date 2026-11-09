# Red Hat OpenShift Deployment Guide — Prestige Luxury Motors

This directory contains the production-grade deployment manifests and templates for running **Prestige Luxury Motors** on **Red Hat OpenShift Container Platform (RHOCP)** or **Red Hat OpenShift on AWS / Azure (ROSA / ARO)**.

---

## Architecture Overview

```
                      +-----------------------------+
                      |   OpenShift Ingress/Router  |
                      |   (Edge TLS / HTTPS 443)    |
                      +--------------+--------------+
                                     |
                                     v
                      +-----------------------------+
                      |   Service: prestige-motors  |
                      |   (Port 3000 / ClusterIP)   |
                      +--------------+--------------+
                                     |
                                     v
               +-------------------------------------------+
               |  Deployment Pods: prestige-motors (x2)    |
               |  - Non-Root Container (UID 1001, GID 0)   |
               |  - Node.js 20 Alpine Standalone Server    |
               |  - Liveness & Readiness Probes Active     |
               +-------------------------------------------+
```

---

## Method 1: Deploy via OpenShift Web Console (Zero-CLI)

1. **Log in** to your Red Hat OpenShift Web Console.
2. Switch to the **Developer Perspective** (top-left dropdown).
3. Select your target Project / Namespace (or click **Create Project** e.g., `prestige-motors`).
4. Click **+Add** &rarr; **Import from Git**.
5. Configure the Git repository:
   - **Git Repo URL**: `https://github.com/achudh2005/prestige-motors.git`
   - OpenShift will automatically detect the **Dockerfile** in the repository root.
6. Under **General**:
   - **Application Name**: `prestige-motors-app`
   - **Name**: `prestige-motors`
7. Under **Routing**:
   - Ensure **Secure Route** is checked (TLS termination: **Edge**).
8. Click **Create**.
   - OpenShift's internal build pipeline will pull the code from GitHub, execute the multi-stage Docker build, push the image to the internal ImageStream registry, launch 2 replicas, and provide an active HTTPS route URL!

---

## Method 2: Deploy via OpenShift CLI (`oc`) in One Step

If you have the `oc` command-line tool logged into your cluster:

```bash
# 1. Login to your OpenShift cluster
oc login https://api.your-cluster.com:6443 --token=YOUR_TOKEN

# 2. Create or switch to project
oc new-project prestige-motors

# 3. Create app directly from GitHub repository using Dockerfile strategy
oc new-app https://github.com/achudh2005/prestige-motors.git --strategy=docker --name=prestige-motors

# 4. Expose as a secure Edge TLS Route
oc create route edge prestige-motors --service=prestige-motors --port=3000-tcp

# 5. Track the build and deployment
oc logs -f bc/prestige-motors
oc get routes prestige-motors
```

---

## Method 3: Deploy via the OpenShift Template

To use the declarative template included in this repository:

```bash
# Process and apply the OpenShift template
oc process -f openshift/template.yaml \
  -p APPLICATION_NAME=prestige-motors \
  -p GIT_REPO_URL=https://github.com/achudh2005/prestige-motors.git \
  -p GIT_BRANCH=main \
  -p REPLICA_COUNT=2 | oc apply -f -

# Trigger the initial build
oc start-build prestige-motors --follow
```

---

## Adding Supabase & Production Environment Variables

To add production credentials (Supabase, Resend, Twilio) in OpenShift:

```bash
# Create an OpenShift Secret
oc create secret generic prestige-secrets \
  --from-literal=NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co \
  --from-literal=NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key \
  --from-literal=SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Attach secrets to the deployment
oc set env deployment/prestige-motors --from=secret/prestige-secrets
```

---

## Security & OpenShift Compliance Notes

- **Arbitrary UID Compatible**: OpenShift enforces rootless security context constraints (`restricted` and `restricted-v2`). The `Dockerfile` sets ownership to `1001:0` with `chmod -R g=u /app`, ensuring seamless operation across any assigned OpenShift UID.
- **Port 3000**: Runs on unprivileged port 3000.
- **Next.js Standalone**: Output is configured as `standalone` in `next.config.ts`, minimizing container image size and memory footprint.
