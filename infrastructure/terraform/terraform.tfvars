project_id  = "konomi-ai"

# Pick a region with low spot VM prices. us-west4 is currently the cheapest.
# https://cloud.google.com/compute/vm-instance-pricing
region           = "us-east1"
zone             = "us-east1-a"
gke_cluster_name = "chronicle-staging"
network_name     = "chronicle-staging-network"
ip_address_name  = "chronicle-staging"
# number_of_nodes  = 1
# machine_type     = "e2-micro"
# disk_size        = 10