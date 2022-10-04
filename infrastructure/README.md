# Infrastructure Overview

## Prerequisites

### Install the gcloud CLI

Install gcloud binary: https://cloud.google.com/sdk/docs/install

```
## General Installation
tar -xzvf <GCLOUD_FILE>.tar.gz
./google-cloud-sdk/install.sh

## With Homebrew
brew install --cask google-cloud-sdk
```

### Project Configuration

```
gcloud init

Pick cloud project to use:
 [1] konomi-ai
 [2] Create a new project
Please enter numeric choice or text value (must exactly match list item):  1

# click on the link and authenticate using your Google account associated with Chronicle
gcloud auth login

# configure regions
gcloud config set compute/region us-east1
gcloud config set compute/zone us-east1-a
```

## Connecting to Kubernetes

```
# view available clusters
gcloud container clusters list

# get cluster credentials to your kubeconfig
gcloud container clusters get-credentials chronicle-staging --region us-east1

# switch to your cluster
kubectl config use-context ${YOUR_CLUSTER}
kubectl config use-context gke_konomi-ai_us-east1_chronicle-staging
```

## Secrets Management in GCP

```
# prequisite: make sure you're in the correct project
gcloud config set project konomi-ai

# list secrets
gcloud secrets list

# creating file based secrets
gcloud secrets create ${YOUR_SECRET_NAME} --date-file=./secret.txt --replication-policy=user-managed --locations=us-east1

# creating single value secrets
echo -n $YOUR_SECRET_VALUE | gcloud secrets create ${YOUR_SECRET_NAME} --data-file=- --replication-policy=user-managed --locations=us-east1

# reading secret values
gcloud secrets versions access latest --secret ${YOUR_SECRET_NAME}

# deleting secrets
gcloud secrets delete ${YOUR_SECRET_NAME}
```

### Persisting Secrets to Kubernetes Pods via the External Secrets Controller

Refer to [Infrastructure Overview](kubernetes/external-secrets/README.md)

## Pushing Images to GCR

- [Publish a Docker container image to Google Container Registry (GCR)](https://support.terra.bio/hc/en-us/articles/360035638032-Publish-a-Docker-container-image-to-Google-Container-Registry-GCR-)

### Building and Pushing the Image (Manually)

1. To tag the image run the command `docker build . -t gcr.io/konomi-ai/chronicle-api:1.0.0` in the directory `Chronicle/server`
2. To push the image to GCR, run the command `docker push gcr.io/konomi-ai/chronicle-api:1.0.0`

### Find the Image in the GCP Console

https://console.cloud.google.com/gcr/images/konomi-ai/GLOBAL

## MongoDB Atlas

https://www.mongodb.com/basics/mongodb-atlas-tutorial

### Tutorial to Set Up GKE Connectivity Via Cloud NAT

https://dchaykin.medium.com/connect-a-gke-cluster-with-mongodb-atlas-through-cloud-nat-b0ffb2683b7d
For our case, all the GCP resources were provisioned via terraform for easy infrastructure replicability.

### Testing MongoDB Connectivity

```
# run an ephermeral mongodb shell
kubectl run --image=mongo:latest -it mongo-shell --rm -- /bin/sh

# when inside the shell run the following command to test the connection
mongosh "mongodb+srv://chronicle-staging-2.ex0ca.mongodb.net/chronicle" --apiVersion 1 --username admin
```

# Persisting a Secret to Kubernetes
1. Encode your secret. This can be done via the following command:
`echo "YOUR_SECRET_VALUE" | base64`

2. Copy your base64 encoded secret and create the following json key value pair:
`{"value": "YOUR_BASE_64_ENCODED_SECRET"}`

3. Navigate to https://github.com/KonomiAI/Chronicle/settings/secrets/actions and create a github actions secret, ex: `YOUR_SECRET_NAME`, and ensure the secret value is of the format described in the previous step.

4. Add your secret to the github action workflow `.github/workflows/secrets_push.yaml` by adding the following step:

```
- name: Push YOUR_SECRET_NAME k8s Secret
  uses: azure/k8s-create-secret@v2
  with:
    namespace: 'staging'
    secret-type: 'generic'
    secret-name: chronicle-{staging|production}-YOUR_SECRET_NAME-secret
    data: ${{ secrets.YOUR_SECRET_NAME }}
```

5. To ensure your secret will persist as an environment variable in the backend pod in kubernetes, a reference to the secret will be required in the backend manifest, ex: `infrastructure/kubernetes/staging/chronicle-backend.yaml`:
```
spec:
  template:
    spec:
      containers:
          env:
            - name: YOUR_SECRET_NAME
              valueFrom:
                secretKeyRef:
                  name: chronicle-{staging|production}-YOUR_SECRET_NAME-secret
                  key: value
```