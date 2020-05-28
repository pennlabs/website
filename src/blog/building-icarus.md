---
title: 'Icarus - Taming the Kubernetes Beast'
slug: building-icarus
authors: ['pawalt']
publishedAt: 2020-05-27
coverPhoto: ../images/blog/icarus.jpg
---

As of recent, we've moved our infrastructure away from [Dokku](http://dokku.viewdocs.io/dokku/) and onto [Kubernetes](https://kubernetes.io/). Especially for an organization with high turnover (nature of being a club), you have to carefully consider the organizational impacts of moving to a technology as complex as Kubernetes. This post should serve as a bit of insight into how we dealt with that challenge and built technology to solve it.

## Background

Typically when organizations decide to adopt Kubernetes, their organizational structure takes one of two patterns (or a combination of both):

### Pattern 1: Embedded SREs

In this pattern, each team has one or more Site Reliability Engineers embedded in each team. These SREs are responsible for managing the deployment infrastructure and general architecture for the product. Since this model gives teams Kubernetes experts right in the teams, these teams are responsible for managing their own Kubernetes manifests and general deployment strategy.

This system works great for teams with complicated application architectures whose applications might require special features like persistent volumes, cross-datacenter availability, complex scheduling requirements, etc. Think teams running Cassandra clusters, Solr clusters, or database services. In this model, SREs on each team can fit the Kubernetes configs to each team's needs. The clear drawback, however, is that your number of SREs required scales linearly with your number of teams.

Because of the (relative) simplicity of Penn Labs' applications and only having 2-3 SREs to service 5 teams, we determined that this pattern was not an option.

### Pattern 2: Platform Team

In this pattern, there is a single team (or organization) that is responsible for building a high-level platform that other teams can use to deploy their applications. Building a platform involves significant up-front engineering work and a strong team to build the automation and interfaces required in order to create a frictionless deployment experience.

This approach typically works best for applications with simple architectures. If you can restrict your applications to following similar architectures, you can build a platform that takes advantage of those shared architecture, abstracting away the common configuration required by your applications.

In Labs, all of our web applications follow similar architectures: a single frontend (usually React) and a monolithic backend (usually Django). Since we have a common, simple architecture and we don't have the personell to man every team with an SRE, we decided to go with the platform approach. This approach fit nicely into our organizational structure since we already have a platform team that manages our [authentication system](https://github.com/pennlabs/platform).

## Platform Abstractions

There are quite a few tools that fit together to make this system work (Hashicorp Vault, Grafana, etc.), but for the purposes of this post, I'm going to focus solely on the tool that developers actually use: Icarus.

Kubernetes configs are hard and complicated. Kubernetes aims to be able to support any containerized application architecture possible, so it exposes every knob you could possibly want to turn. In simple setups, as you can see below, this leads to nothing other than repetition and confusion:

```yaml
---
# Source: icarus/templates/services.yaml
apiVersion: v1
kind: Service
metadata:
  name: 'testsite-serve'
spec:
  type: ClusterIP
  ports:
    - port: 80
      targetPort: 80
  selector:
    name: 'testsite-serve'
---
# Source: icarus/templates/deployments.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: 'testsite-serve'
  namespace: default
  labels:
    name: 'testsite-serve'
spec:
  replicas: 1
  selector:
    matchLabels:
      name: 'testsite-serve'
  template:
    metadata:
      labels:
        name: 'testsite-serve'
    spec:
      containers:
        - name: 'worker'
          image: 'pennlabs/website:latest'
          imagePullPolicy: IfNotPresent
          ports:
            - containerPort: 80
          envFrom:
            - secretRef:
                name: test-secret
---
# Source: icarus/templates/ingresses.yaml
apiVersion: networking.k8s.io/v1beta1
kind: Ingress
metadata:
  name: testsite-serve
  namespace: default
spec:
  rules:
    - host: 'pennlabs.org'
      http:
        paths:
          - path: '/'
            backend:
              serviceName: testsite-serve
              servicePort: 80
  tls:
    - hosts:
        - 'pennlabs.org'
      secretName: pennlabs-org-tls
---
# Source: icarus/templates/certificates.yaml
apiVersion: cert-manager.io/v1alpha2
kind: Certificate
metadata:
  name: pennlabs-org
  annotations:
    'helm.sh/resource-policy': keep
spec:
  secretName: pennlabs-org-tls
  dnsNames:
    - 'pennlabs.org'
    - '*.pennlabs.org'
  issuerRef:
    name: wildcard-letsencrypt-prod
    kind: ClusterIssuer
    group: cert-manager.io
```

As mentioned earlier, in our applications we can make the following assumptions to make our lives easier:

- There will be exactly one container per application
- That application, if exposed to the world, will speak HTTP and want to be secured with HTTPS
- That application will use secrets synced into Kubernetes by our Vault secret sync job

With just these three assumptions, we can radically simplify our required configuration to the following for this example:

```yaml
deploy_version: 0.1.15

applications:
  - name: serve
    image: pennlabs/website
    secret: test-secret
    ingress:
      hosts:
        - host: pennlabs.org
          paths: ['/']
```

Let's dive into how this is possible.

### Helm

At the root of the transformation from Icarus file to full Kubernetes manifest is a tool called Helm. Helm describes itself as a "package manager for Kubernetes", but for the purposes of this article, think of it as a templating tool that happens to be good at deploying to Kubernetes.

Helm operates off the [Go template package](https://golang.org/pkg/text/template/). This package, much like Python's Jinja or Ruby's ERB, lets you define a template file, specifying where to put information the user provides. Take the example of our [service template](https://github.com/pennlabs/icarus/blob/master/templates/services.yaml). This template defines a basic service with parameters:

```yaml
apiVersion: v1
kind: Service
metadata:
  name: { { $app_id | quote } }
spec:
  type: { { .svc_type } }
  ports:
    - port: { { .port } }
      targetPort: { { .port } }
  selector:
    name: { { $app_id | quote } }
```

Helm lets you define default values, so in Icarus, we set `.svc_type` to be `ClusterIP` by default and `.port` to be 80 by default. We also set `$app_id` to be `<repository_name>-<application_name>`. Applying these rules, we get the resulting configuration that we see above:

```yaml
# Source: icarus/templates/services.yaml
apiVersion: v1
kind: Service
metadata:
  name: 'testsite-serve'
spec:
  type: ClusterIP
  ports:
    - port: 80
      targetPort: 80
  selector:
    name: 'testsite-serve'
```

Icarus works simply by applying substitutions like this to create the final Kubernetes manifests, and then we use the DigitalOcean API to automate the deployment of these manifests to our actual cluster. I'm glossing over a lot of detail here, but feel free to check out our [deploy orb](https://github.com/pennlabs/orb-helm-tools/blob/master/src/commands/deploy.yml) for the specifics.

## End Result

There's been a lot of talk here about organizational philosophy and YAML templating, but let's circle back to what this system actually gives us.

When one of our developers wants to create a new application, they can, completely independently, create a Git repo, add in a small CI config file, create their Icarus file, and add their proper secrets into Vault. Once that's done, they can Git push up, and their application will be published to the domain of their choice in just a few minutes. If you ask me, that's pretty cool.

## Reach Out

If any of this looks like it's up your alley or you wanna learn more about our mission, be sure to contact us at contact@pennlabs.org or [apply to be a part of Labs](https://pennlabs.org/apply)! We've got some fantastic teams working on interesting problems with a direct impact on campus.
