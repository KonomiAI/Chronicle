# Infrastructure Overview 

## Prerequisites

### Install the gcloud CLI
https://cloud.google.com/sdk/docs/install
Install gcloud CLI

```
## General Installation
tar -xzvf <GCLOUD_FILE>.tar.gz
./google-cloud-sdk/install.sh

## With Homebrew
brew install --cask google-cloud-sdk
```

###  Project Configuration
```
gcloud init

Pick cloud project to use:
 [1] konomi-ai
 [2] Create a new project
Please enter numeric choice or text value (must exactly match list item):  1

# click on the link and authenticate using your Google account associated with Chronicle
gcloud auth login

# configure regions
gcloud config set compute/region us-west4
gcloud config set compute/zone us-west4-a
```


## Secrets Management in GCP

```
# prequisite: make sure you're in the correct project
gcloud config set project konomi-ai

# list secrets
gcloud secrets list

# creating file based secrets
gcloud secrets create ${YOUR_SECRET_NAME} --date-file=./secret.txt --replication-policy=user-managed --locations=us-west4

# creating single value secrets
echo -n $YOUR_SECRET_VALUE | gcloud secrets create ${YOUR_SECRET_NAME} --data-file=- --replication-policy=user-managed --locations=us-west4

# reading secret values
gcloud secrets versions access latest --secret ${YOUR_SECRET_NAME} 

# deleting secrets
gcloud secrets delete ${YOUR_SECRET_NAME} 
```

## Manually Pushing Images to GCR
- [Publish a Docker container image to Google Container Registry (GCR)](https://support.terra.bio/hc/en-us/articles/360035638032-Publish-a-Docker-container-image-to-Google-Container-Registry-GCR-)
### Building and Pushing the Image (Manual Example)
1. To tag the image run the command  `docker build . -t gcr.io/konomi-ai/chronicle-api:1.0.0` in the directory `Chronicle/server`
2. To push the image to GCR, run the command `docker push gcr.io/konomi-ai/chronicle-api:1.0.0`
### Find the Image in the GCP Console
https://console.cloud.google.com/gcr/images/konomi-ai/GLOBAL


## Connecting to Kubernetes
```
# view available clusters
gcloud container clusters list

# get cluster credentials to your kubeconfig
gcloud container clusters get-credentials chronicle-staging --region us-west4-a

# switch to your cluster
kubectl config use-context ${YOUR_CLUSTER}
kubectl config use-context gke_chronicle-340503_us-west4-a_chronicle-staging

```

## MongoDB Atlas
https://www.mongodb.com/basics/mongodb-atlas-tutorial

### Tutorial to Set Up GKE Connectivity Via Cloud NAT
https://dchaykin.medium.com/connect-a-gke-cluster-with-mongodb-atlas-through-cloud-nat-b0ffb2683b7d
For our case, all the GCP resources were terraformed for easy infrastructure replicability. 

### Testing MongoDB Connectivity

```
# runs an ephermeral mongodb shell
kubectl run --image=mongo:latest -it mongo-shell --rm -- /bin/sh

# when inside the shell run the following command to test the connection
mongosh "mongodb+srv://chronicle-staging-2.ex0ca.mongodb.net/chronicle" --apiVersion 1 --username admin
```


