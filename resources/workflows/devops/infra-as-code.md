# Infrastructure as Code

Generate production-grade Terraform or Pulumi infrastructure.

**Cloud provider**: {{AWS | GCP | Azure}}
**IaC tool**: {{Terraform | Pulumi}}
**What to provision**: {{INFRASTRUCTURE_DESCRIPTION}}
**Environment**: {{dev | staging | production}}

---

## Design Principles

### 1. Modular Structure
```
infra/
  modules/
    vpc/          reusable VPC module
    eks/          Kubernetes cluster
    rds/          database
    s3/           object storage
  environments/
    dev/          dev-specific values
    staging/
    production/
  main.tf
  variables.tf
  outputs.tf
```

### 2. State Management
- Remote state in S3 + DynamoDB lock (Terraform) or Pulumi Cloud
- Separate state per environment
- Never commit `.tfstate` to git

### 3. Variable Hierarchy
```hcl
# Base defaults in variables.tf
variable "instance_type" {
  default = "t3.medium"
}

# Per-environment overrides in environments/prod/terraform.tfvars
instance_type = "m5.xlarge"
```

## Terraform Patterns

### Naming Convention
```hcl
locals {
  prefix = "${var.project}-${var.environment}"
  tags = {
    Project     = var.project
    Environment = var.environment
    ManagedBy   = "terraform"
  }
}
```

### Remote State
```hcl
terraform {
  backend "s3" {
    bucket         = "my-terraform-state"
    key            = "prod/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "terraform-locks"
    encrypt        = true
  }
}
```

### Module Call
```hcl
module "vpc" {
  source = "./modules/vpc"
  cidr   = var.vpc_cidr
  tags   = local.tags
}
```

## Security Best Practices
- Least privilege IAM roles — no `*` actions in production
- Private subnets for compute; public only for load balancers
- Enable encryption at rest for all data stores
- VPC flow logs + CloudTrail enabled
- No hardcoded secrets — use SSM Parameter Store or Secrets Manager

## Drift Detection
```bash
terraform plan -out=plan.out    # what would change?
terraform show plan.out         # inspect before applying
terraform apply plan.out        # apply with confirmation
```

Schedule `terraform plan` in CI to detect drift from expected state.

## Output
Provide: full Terraform/Pulumi code for the requested infrastructure, variable definitions, outputs, and a README with apply instructions.
