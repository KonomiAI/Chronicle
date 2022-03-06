# Chronicle Development guidelines

This folder includes guidelines and information for anyone working on the Chronicle web client.

## Directory structures & module management

### Components - `components`

This folder contains all atomic reusable components used in the application. If you built a react component that is used in more than one pages, add it to this folder.

The guidelines are not a set of rules but only best practices to improve the maintainability of our codebase.

#### 😻 Do

- Each file should only include one exported component.
- Component should be exported using Default.
- Component should be barreled in the `index.ts` file. This includes the default component and any other types/data/functions.
- Variations of a single component should be place in the same directory
- Folders and none component files should be named in `kebab-case`, the component files should be in `PascalCase`.

#### 😿 Don't

- Don't include jsx in `.ts` files.
- Don't have an `index.ts(x)` file in your component folder.
- Don't include actual code in the index file.
- Don't use class components

### Pages - `pages`

This folder contains all user interacted pages in the application. Pages are distinct, self containing and atomic.

#### 😻 Do

- Each file should only include one exported component.
- Page component should be exported using Default.
- Folders and none component files should be named in `kebab-case`, the component files should be in `PascalCase`.

#### 😿 Don't

- Don't include jsx in `.ts` files.
- Don't have an `index.ts(x)` file in your component folder.
- Don't include actual code in the index file.
- Don't import a page in another page.
- Don't use case components

### Data - `data`

This folder contains all data access helpers used by react query to make requests to our services.

#### 😻 Do

- Export each function independently.
- Export an object including all functions as default export.
- Use atomic functions for each data function
- Only have one parameter for mutation functions