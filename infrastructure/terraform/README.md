# Spinning Up a GKE Kubernetes Cluster with Terraform

## Prerequisites
Refer to [Infrastructure Overview](../README.md)

## Deploying a Cluster
- Modify the file `config.gcs.tfbackend` if need be to support a desired Google Cloud Storage bucket, currently defaulted as the staging terraform bucket.
- Modify any variables in the `terraform.tfvars` file as need be.

Run the following commands:
```
terraform init -backend-config="config.gcs.tfbackend"
terraform apply
```