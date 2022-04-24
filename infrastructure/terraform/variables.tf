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

variable "machine_type" {
  description = "The machine type of the cluster nodes. List of costs can be found here: https://gcpinstances.doit-intl.com"
}

variable "disk_size" {
  description = "The disk size of the cluster nodes"
}

variable "network_name" {
  description = "The name of the network. Must be 1-63 characters long and match the regular expression [a-z]([-a-z0-9]*[a-z0-9])?"
}