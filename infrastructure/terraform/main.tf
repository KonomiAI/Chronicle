variable "project_id" {
  description = "The project ID to host the cluster in"
}

variable "gke_cluster_name" {
  description = "The name of the GKE cluster"
}

variable "region" {
  description = "The region to host the GKE cluster"
}

variable "zone" {
  description = "The zone to host the GKE cluster in (required for zonal clusters)"
}

variable "number_of_nodes" {
  description = "The number of cluster nodes"
}

variable "machine_type" {
  description = "The machine type of the cluster nodes"
}

variable "disk_size" {
  description = "The disk size of the cluster nodes"
}

variable "ip_address_name" {
  description = "The name of the static IP Address for the load balancer. The name must be 1-63 characters long and match the regular expression [a-z]([-a-z0-9]*[a-z0-9])?"
}

variable "network_name" {
  description = "The name of the network. Must be 1-63 characters long and match the regular expression [a-z]([-a-z0-9]*[a-z0-9])?"
}

variable "ssl_cert_name" {
  description = "The name of the SSL certificate for the load balancer"
}

variable "ssl_cert_crt" {
  description = "Path to the SSL certificate .crt"
}

variable "ssl_cert_key" {
  description = "Path to the SSL certificate private .key"
}

variable "https" {
  description = "Whether to set up the load balancer with HTTPS or not"
}

resource "google_compute_network" "default" {
  project                 = var.project_id
  name                    = var.network_name
  auto_create_subnetworks = "false"
  routing_mode            = "REGIONAL" 
}
