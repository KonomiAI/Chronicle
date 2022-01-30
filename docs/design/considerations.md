# Initial requirement considerations

*The following information is derived from first requirements meeting*

## Feature needs

### Access (Support)
- some form of RBAC
  - admin, receptionist, provider
  - provider needs even finer rbac
  - admin also holds account management
- access done through employee username
  - track activity (logging)
  - note: explore access options (most employees don't have a company email other than admin, will this change)
    - oauth?
- accessible in certain network
  - (minus admin)
- claim based permission system
- record employee login
- record editing of reports (which account makes edits to documents)

### Custom profile (Core)
- customer core information profile
  - name
  - email
  - telephone number
  - dob
  - gender/sex
- customizable client fields
  - text fields
  - long text fields
  - sections
  - supports required vs optional

### Visit Data Collection for reporting (Core)
- Collect activity entries
  - 1 customer
  - 0?-1 treatment
    - treatment notes
      - number of levels will figure out that label
  - 0-n products
  - date
  - entry notes (for the customer)
    - general notes
    - critical notes

### Data and Statistics Reporting (Core)

- Time based reporting
- Automated time based report generation
- Migrations
  - currently on OneDrive (stats on march?)
  - no migrations necessary yet
- 

### Inventory (Support)
- Admins create editable items 
- Track services/products for reporting purposes
- managed as separate categories
  - treatment
  - product
- Searchable, customizable fields
  - text (sku, barcode, etc.)
  - dropdown list
- Core field
  - product/service name
  - price

### Helpful capabilities (Support)
- Barcode scanning

## User stories

## Push backs

*The following capabilities are pushed back till a future iteration (maybe autumn)*

1. Gift card purchase system
2. Membership/gift card balance

## Questions
- do we have to manage anything related to taxes for items?
- Are there customers that just come in and purchase a product? Does the purchase require a report?