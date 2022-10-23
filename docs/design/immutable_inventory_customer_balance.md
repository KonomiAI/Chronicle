# Item versioning & customer balance system

## Inventory versioning proposal

Inventory data is currently mutable, this could lead to issues with analytics and in the future the balance system we want to implement. This proposal details a way to make our inventory system immutable to allow us to scale our application capabilities in the future.

### New record on update

The solution to the mutation problem is to create a new copy of the inventory item whenever the user updates the item's attributes. What this looks like with our current data:

- For **activities**, whenever the user updates a field, a new record is created and the previous one is marked legacy and hidden from user, the only way to access it again is through activity entries.
- For **Product variants**, the process is a bit more complex. When the user updates a variant, the variant is recreated as a new record and the previous record is archived, the link between the variant and the product will remain but loading the product data will not show any archived variants. When a product is updated, we have two viable solutions:
  - the product is not recreated as a new record and remains mutable, instead the user will get the warning that updating the product name will cause their analytics data to be impacted.
  - the product is recreated as a new record; all variants will be linked to both records. This can cause problems as we need to modify the existing relation between product/variant from 1-to-many to many-to-many, which increases the complexity of the application so it is not preferred unless we must.

### Annotating legacy records to users

If a particular record is archived due to updates, we shall display a banner on the inventory details page informing users this item is archived and can no longer be used, if a product has archived variants, we can note that the product has archived variants.

On the activity entries page, archived activities and product variants will have distinct labels to inform the user that the product has been updated. There will also be a warning that if a user removes the archived activity/product they will not be able to add it back.

### Determining if a record has been updated

This is an area that is out of the scope of the initial discussion, but should be considered as we progress, and can be added on later.

## Customer balance

One thing we noticed from looking at the client's files is that the use of balance is quite important to the business. I believe we should consider implementing such system as part of our MVP, it would be a banger feature that can really help improve the efficiency of the client's business.

The following is a discussion on the few necessary components and changes to support such a feature.

### A new ledger

To keep track of customer balance, we should use a dynamically calculated model in the form of a ledger. The ledger will resemble the following model:

```prisma
model Ledger {
  id String   @id @default(auto()) @map("_id") @db.ObjectId
  amount Int
  description String @optional
  customer Customer
  activityEntry ActivityEntry @optional
  createdBy Staff
  createdDt DateTime @default(now())
}
```

Here is an explanation of the model described above:

- The model will track the transaction amount in cents like the rest of the application, the value is positive for a charge against the customer (e.g. spent $80 will be 8000)
- The model will allow the staff to also include a description in the charge, this will be displayed on the user's transaction history page
- Records in the table must not be updated and deleted, staff can create correctional transactions if they need
- A transaction can be linked 1-to-1 with an activity entry, this can help identify sources of charge.
- An activity entry may only have 1 charge on the ledger, any amendments must be done via adjustment.

### Charges and negative balance

We propose allowing negative balances to simplify the system, but in the future we should allow the admin to set negative balance tolerance. They should be able to choose negative balance allowance for all customers or for a single customer. They can also disable the possibility all together which will prevent a negative balance from occuring.

### Improved activity entries

Activity entries shall also be improved to better handle the new transaction system. Here is a list of proposed changes:

- New lock feature, when the staff creates a charge with the activity entry, it will also lock the activity entry preventing any changes to the customer, activity, or products fields. Activity entries will also be undeletable, but staff can change the custom field responses, and add or remove responses
- New UI for creating a charge, should be place after the information fields and before the custom form fields.

### Improved customer UI

The customer page will also receive a UI upgrade to allow the following features

- Balance view on customer details page
- Transaction history on customer details page

### Possible UI for managing the ledger

## Conclusion

I believe we can bring our client great value if we implemented a customer balance management system, this is also in-line with the vision of the product and many other personal care agencies can use it as well.
