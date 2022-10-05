# Data analytics system design

We want to help our customers better understand the performance of their business and gain insights from the data they collect. To achieve this goal, we designed a powerful analytics system with progressive improvements in mind.

## Setting the goals

The first issue we tackled as a team is to understand the goal of our analytics service and the MVP scope of the service. From there we setup a future outlook on the features we want to see the service deliver.

Through discussion, we decided that the goal of our analytics service is:

- Customizable
- Easy to use
- Comprehensive & Dynamic

### Customizable

We want to build a service where the customer can have maximum control over the reports they generate, they can chose the filtering criteria, select the column and aggregations and more importantly receive the data in the format they prefer.

For our MVP product, we want the user to be able to set the time-based filtering criteria, select the columns to display and data to aggregate. We plan on generating JSON and in-app table as the initial export solution

In the future we plan on implementing the following capabilities.

- Filter data with more fields
- Customizable aggregation techniques (average, min, max over period)
- More data exporting methods (CSV, XLSX, or to other analytics services)

### Easy to use

We want to build an analytics service that does not require a degree in data science to use. For that we need a simple and streamlined customer experience with the ability to build commonly used reports with a click of a button.

For our MVP product we will include handcrafted templates that customers can implement without fiddling with a bunch of filters and form controls.

In the future we plan on making the system more accessible by adding:

- Column suggestions
- Automatically generated reports
- In-app data visualization with charts

### Comprehensive and dynamic

We want to ensure our focus of ease-of-use and accessibility does not hamper the clients' capability to perform more advanced analytical tasks. For that we have.

For the MVP, we want to build predefined aggregation views that cover at least 90% of the client's analytics use cases.

In the future we will add:

- The ability to aggregate any column
- The ability to set aggregation window sizes
- The ability to work with data from user generated custom forms
- Multiple data sources on a single table to see relationship between data sources (a)

## Building the MVP

To summarize, the MVP version of the data analytics will have pre-defined aggregation capabilities and not feature data from customizable forms.

### Understanding the data

The first goal was to understand the data we have collected through the 4 major business focused models of the application

- Customer
- Inventory
- Staff
- Activity Entry

We selected the following aggregations to integrate in the MVP

| Data Source | Aggregations                                                                                                                                                             |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Customer    | <ul><li>Visits in period</li><li>Amount spent in period</li></ul>                                                                                                        |
| Staff       | <ul><li>Entries performed in selected period</li><li>Amount earned in selected period</li><li>Activities performed in period</li><li>Products sold in a period</li></ul> |
| Activity    | <ul><li>County in period</li><li>Revenue in period</li></ul>                                                                                                             |
| Products    | <ul><li>Count in period</li><li>Revenue period</li></ul>                                                                                                                 |

### Aggregating the data

The data will be aggregated and processed on the service and not in the database, this is due to the concern of the limited capabilities of our MongoDB instance. Data will be mapped on the API.

This is also due to the fact that for our service, the API can scale quickly (new instance ready in under 500ms) and the database cannot do so as quickly.

### Saving the reports

Once a report is generated, the report will be sent to the client and also saved in the database alongside the configuration template. The user will be able to come back to the report anytime without needing to perform the aggregation again.

## Summary

Chronicle is not only for collecting personal care practice data, it is also designed to help business owners to gain insights in their business from the data collected, this will help them make more informed decisions.
