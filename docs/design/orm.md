# ORM Discussion

## Why an ORM?

Designing scalable software as an enterprise solution requires multiple teams over a period of time. As engineers and stakeholders come and go, maintainers of the software product need an institutional guideline to follow that allows code to be cleaner and ultimately more readable.

By design, an ORM is actually counter intuitive, providing an obscure interface where underlying queries could be less effective than specifically tuning the query for what it needs to perform. As such, an ORM serves one purpose, trading off performance for an increase of developer productivity.

For Chronicle, we prefer to increase developer productivity than fine tune queries manually for lets say a 10% performance boost. Additionally, our queries will not be defined upon launching the software product, but rather the hope is that our customers are able to perform their own user friendly data analytics (eg: give me the customer that spends the most) without the technical overhead. An ORM will help eachieve this as it already has the groundwork for query building blocks.

## Choices Considered

- [TypeORM](https://github.com/typeorm/typeorm) (27k stars)(1.4k issues)
- [Mongoose](https://github.com/Automattic/mongoose) (24k stars)(300 issues)
- [Prisma](https://github.com/prisma/prisma) (20k stars)(1.8k issues)
