# Cloud Infrastructure

The entire infrastructure of the project will be hosted on GCP

- Secrets: GCP Secrets Manager
  - Manually store sensitive information
- Kubernetes Cluster: GKE (Google Kubernetes Engine)
- Images: GCR (Google Container Registry)

## Google Cloud Setup:

- [x] Setup GCP Account, Project and Organization
- [ ] Grant everyone access to GCP
- [ ] Setup gcloud CLI access (fetching images, secrets access, k8s access)

## Github Actions CI/CD Pipeline:

- [ ] Setup gcloud integration
  - https://github.com/google-github-actions/setup-gcloud
- [ ] Deploy to gcloud Cluster:
  - https://github.com/google-github-actions/setup-gcloud/blob/master/example-workflows/gke/README.md
- [ ] Building and pushing image to GCR:
  - https://medium.com/mistergreen-engineering/uploading-a-docker-image-to-gcr-using-github-actions-92e1cdf14811
- [ ] Create the Workflow:
  - Do validation, install packages, run tests
  - Build and deploy the image to GCR
  - Deploy the application itself

## IaaC

- All of our our GCP infrastructure will be built using [Terraform](https://www.terraform.io/) to ensure that infrastructure can be easily rebuilt.
- It would very beneficial to be able have the terraform commands be automated so one doesn't have to manually run the commands locally

### Tasks:

[ ] Store the terraform state in [Google Cloud Storage](https://cloud.google.com/storage)
[ ] Define terraform repository strucuture
[ ] Determine the terraform modules to use
[ ] (Potential) Setup [Atlantis](https://www.runatlantis.io/) to run Terraform commands from Github and keep a history of the output logs

## The K8s Route

### Advantages

- Dynamic integration with the GCP suite (easy access to secrets, GKE allows easy cluster configuration)
- Easy control over desired state of our application (Configuration as Code, [GitOps](https://www.weave.works/technologies/gitops/), scability, self healing)
- Highly customizable via the use of [controllers](https://kubernetes.io/docs/concepts/architecture/controller/)
- Learning Kubernetes

### Disadvantages

- Adds an additional layer to the application building process
- Can be overkill for simple applications
- Could just host o a single VM or use a hosting platform like [Heroku](https://www.heroku.com/)
- Learning Kubernetes
