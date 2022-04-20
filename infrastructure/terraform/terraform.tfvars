project_id  = "konomi-ai"

# Pick a region with low spot VM prices. us-west4 is currently the cheapest.
# https://cloud.google.com/compute/vm-instance-pricing
region           = "us-west4"
zone             = "us-west4-a"
gke_cluster_name = "chronicle-staging"
number_of_nodes  = 1
machine_type     = "e2-medium"
disk_size        = 10
network_name     = "chronicle-staging-network"
ip_address_name  = "chronicle-staging"
ssl_cert_name    = "chronicle-ssl-cert"
ssl_cert_crt     = "certs/self-signed.crt"
ssl_cert_key     = "certs/self-signed.key"

# Change to true to enable HTTPS and HTTP redirect for the load balancer
https            = false