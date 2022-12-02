# Changes for tracking visits

During our visit we realized that our client charges customers at the end of each visit and not after each activity is performed, we should update our application to reflect this change.

## Database schema

The majority of the changes will be in the database, here is a summary of the changes we expect:

- A new model called `Visit` to track the visit information
- Remove charge link from `ActivityEntry`

### New model

The new model will include the following attributes,

```
id: string
visitDate: Date
customer: Customer
activityEntries: ActivityEntries[]
charge: Ledger?
archived: Bool
createdBy: Staff
createdDt: DateTime
updatedDt: DateTime
```

## Service

Here is a list of changes to the backend service

- activity entry charge endpoint will be removed from the activity entry controller
- new `visit` module with a controller to manage visits
- analytics system will need a lot of changes since the important link has been moved. We should consider downing the analytics feature and progressively fix the broken analytic views.
- additional business logics must be implemented

### New controller

The controller should be governed by the `ActivityEntry` feature, the controller shall have the following endpoints:

#### **GET** `/visit`

Supported search params:

```
state: 'open' | 'closed' | 'archived'
```

This endpoint returns a list of visits that match the search criteria, the visit should include a list of all activity entries, and a summarized subtotal

#### **POST** `/visit`

Request body:

```
{
  customerId: string
}
```

Create a new visit for the provided customer, the customer id must be provided, otherwise a 400 error will be posted

#### **PUT** `/visit/:id`

Request body:

```
{
  id: string,
  activityEntryIds: string[],
  isArchived: boolean,
}
```

Endpoint to update the visit, only the activity entry, and isArchived fields can be updated. The visit cannot be assigned to another customer.

#### **GET** `/visit/:id/cost`

Calculate the cost summary of the visit, include per item cost, subtotal, tax amount, the total should be grouped by products and services.

#### **POST** `/visit/:id/charge`

Request body:

```
{
  tipAmount: number;
  adjustment: number
}
```

Charge the customer and post to the ledger, the only customizable amount is the tip and a final adjustment to account for deposits and any prior payments.

## Business logic

- Tip will no longer include product value in activity entries
- Add the ability to charge a hard coded 13% tip (ontario) against the subtotal of the bill, tip is added on top of the total charge.
- There can only be 1 open visit per customer per day.
- The visit is locked if it has been charged
- Activity entries are locked once the connected visit is charged

## UI experience

Visits can be created manually but it is automatically created if the staff creates an activity entry for a customer. If the customer already has an open visit on the same day, new activity entries for the customer will be automatically linked to the open visit upon creation. The staff can remove any links if necessary

If an activity entry is linked to a visit, the link should be displayed on the activity entry page.
