provider "google-beta" {
  # Run 'gcloud auth application-default login' to get credentials.json
  # credentials = "${file("credentials.json")}"
  project     = var.project_id
  region      = var.region
}

resource "google_container_cluster" "default" {
  provider = google-beta
  project  = var.project_id
  name     = var.gke_cluster_name
  location = var.region

  network    = google_compute_network.default.name
  subnetwork = google_compute_subnetwork.default.name

  enable_autopilot = true

  private_cluster_config {
    # Need to use private nodes for VPC-native GKE clusters
    enable_private_nodes = true
    # Allow private cluster Master to be accessible outside of the network
    enable_private_endpoint = false
    master_ipv4_cidr_block = "172.16.0.16/28"
  }
}

resource "time_sleep" "wait_for_kube" {
  depends_on = [google_container_cluster.default]
  # GKE master endpoint may not be immediately accessible, resulting in error, waiting does the trick
  create_duration = "30s"
}

resource "null_resource" "local_k8s_context" {
  depends_on = [time_sleep.wait_for_kube]
  provisioner "local-exec" {
    # Update your local gcloud and kubectl credentials for the newly created cluster
    command = "for i in 1 2 3 4 5; do gcloud container clusters get-credentials ${var.gke_cluster_name} --project=${var.project_id} --zone=${var.zone} && break || sleep 60; done"
  }
}