# Deploy External Secrets to Kubernetes

https://github.com/boredabdel/gke-secret-manager/tree/main/hello-secret-external-secrets
https://blog.container-solutions.com/tutorial-how-to-set-external-secrets-with-gcp-secret-manager

## Required Steps

```
# create service account with secrets manager role
gcloud iam service-accounts create external-secrets
gcloud projects add-iam-policy-binding konomi-ai \
    --member=serviceAccount:external-secrets@konomi-ai.iam.gserviceaccount.com \
    --role=roles/secretmanager.secretAccessor

# install external secrets controller
helm repo add external-secrets https://external-secrets.github.io/kubernetes-external-secrets/
helm install external-secrets external-secrets/kubernetes-external-secrets \
    --set serviceAccount.annotations."iam\.gke\.io/gcp-service-account"=' external-secrets@konomi-ai.iam.gserviceaccount.com' \
    --set serviceAccount.create=true \
    --set serviceAccount.name="external-secrets" \
    --namespace external-secrets

# bind generated kubernetes service account to gcp service account, "sandbox" is cluster namepspace, "external-secrets" is the service name
gcloud iam service-accounts add-iam-policy-binding external-secrets@konomi-ai.iam.gserviceaccount.com \
    --role roles/iam.workloadIdentityUser \
    --member "serviceAccount:konomi-ai.svc.id.goog[sandbox/external-secrets]"
kubectl annotate serviceaccount --namespace sandbox external-secrets iam.gke.io/gcp-service-account=external-secrets@konomi-ai.iam.gserviceaccount.com --overwrite
```

## Creating the ExternalSecret Object for Pod to Consume

See examples regarding how to create the externalsecrets manifest in `/secrets`. Eventually we may want to automate or script this process

```
echo -n '{"value": "my-secret-value"}' | gcloud secrets create my-secret --replication-policy="automatic" --data-file=- --locations=us-east1
kubectl apply -f secrets/my-gcp-secret.yaml

echo -n 'mongodb-password' | gcloud secrets create chronicle-staging-mongodb-password --replication-policy="automatic" --data-file=- --locations=us-east1
kubectl apply -f secrets/chronicle-staging-mongodb-password-secret.yaml
```
