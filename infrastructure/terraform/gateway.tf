resource "google_compute_network" "default" {
  project                 = var.project_id
  name                    = var.network_name
  auto_create_subnetworks = "false"
  routing_mode            = "REGIONAL" 
}
resource "google_compute_subnetwork" "default" {
  depends_on    = [google_compute_network.default]
  name          = "${var.gke_cluster_name}-subnet"
  project       = google_compute_network.default.project
  region        = var.region
  network       = google_compute_network.default.name
  ip_cidr_range = "10.0.0.0/24"
}

resource "google_compute_router" "router" {
  depends_on    = [google_compute_network.default]
  name    = "${var.gke_cluster_name}-router"
  project = var.project_id
  region  = var.region
  network = var.network_name
}

resource "google_compute_router_nat" "nat" {
  depends_on    = [google_compute_router.router]
  name                               = "${var.gke_cluster_name}-gateway"
  project                            = var.project_id
  region                             = var.region
  router                             = google_compute_router.router.name
  source_subnetwork_ip_ranges_to_nat = "ALL_SUBNETWORKS_ALL_IP_RANGES"
  nat_ip_allocate_option             = "AUTO_ONLY"
}

resource "google_compute_address" "default" {
  depends_on    = [google_compute_subnetwork.default]
  name = "${var.gke_cluster_name}-ip"
  project = google_compute_subnetwork.default.project
  region  = google_compute_subnetwork.default.region
  # Required to be STANDARD for use with REGIONAL_MANAGED_PROXY
  network_tier = "STANDARD"
}
