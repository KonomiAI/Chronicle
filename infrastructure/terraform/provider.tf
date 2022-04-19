terraform {
  required_providers {
    google = {
      source  = "hashicorp/google-beta"
      version = "4.5.0"
    }
  }

  backend "gcs" {
  }

  required_version = ">= 1.0"
}

