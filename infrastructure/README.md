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

gcloud auth login # Click on the link and authenticate using your Google account associated with Chronicle
```


## Secrets Management in GCP

### Enabling the Service
`gcloud services enable secretmanager.googleapis.com`

### List of Commands
```
# Prerequisite
gcloud config set project konomi-ai

# List Secrets
gcloud secrets list

# Creating File Based Secrets
gcloud secrets create ${YOUR_SECRET_NAME} --date-file=./secret.txt --replication-policy=user-managed --locations=us-west4

# Creating Single Value Secrets
echo -n $YOUR_SECRET_VALUE | gcloud secrets create ${YOUR_SECRET_NAME} --data-file=- --replication-policy=user-managed --locations=us-west4

# Reading Secret Values
gcloud secrets versions access latest --secret ${YOUR_SECRET_NAME} 

# Deleting Secrets
gcloud secrets delete ${YOUR_SECRET_NAME} 
```

## Publishing Images GCR
- https://support.terra.bio/hc/en-us/articles/360035638032-Publish-a-Docker-container-image-to-Google-Container-Registry-GCR-
- https://cloud.google.com/container-registry/docs/enable-service

### Enabling the Service
Run the command: `gcloud services enable containerregistry.googleapis.com`

### Building and Pushing the Image (Manual Example)
To tag the image: `docker build . -t gcr.io/konomi-ai/chronicle-api:1.0.0` in `Chronicle/server`
To push to GCR, run: `docker push gcr.io/konomi-ai/chronicle-api:1.0.0`

## Finding the Image in Console
https://console.cloud.google.com/gcr/images/konomi-ai/GLOBAL


