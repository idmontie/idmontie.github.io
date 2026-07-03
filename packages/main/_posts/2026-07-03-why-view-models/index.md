---
title: "Why view models?"
tags: [technology, programming]
---

When writing React code, we often need to pull data from an API and manipulate that data to better match how we want to present it. Now that React hooks are ubiquitous, I have seen a lot of that data manipulation move into hooks that get re-used in multiple components.

For example, imagine we want to display the account status of a user. The data comes back as

```tsx
type UserStatus = 'active' | 'suspended' | 'pending';

interface User {
  id: string;
  // other fields
  status: UserStatus;
}
```

We add a hook to get the right badge rendering:

```jsx
function useStatusBadge(status: UserStatus): {
  text: string;
  variant: 'success' | 'warning' | 'danger';
} {
  switch (status) {
    case 'active':
      return { text: 'Active', variant: 'success' };
    case 'suspended':
      return { text: 'Suspended', variant: 'danger' };
    case 'pending':
      return { text: 'Pending', variant: 'warning' };
   }
 }
```

The example is simple, but as the application gets more complicated, the mapping need to include localization, icon choices, or badge variants. That presentation logic can be encapsulated in the single hook.

Rather than call this hook in every usage, we could instead transform the data from the API using the View Model pattern. Rather than pass around the User object type, we could instead pass around a modified type:

```tsx
interface UserViewModel {
  id: string;
  // other fields
  status: UserStatus;
  statusText: string;
  statusVariant: 'success' | 'warning' | 'danger';
}
```

We basically take the raw API response and transform it into a more presentation-ready form.

For those who have worked on API services before, view models parallel DTOs. A Data Transfer Object maps data between transfer boundaries, while a view model helps represent data in the way we plan to present it.

### Why don’t we see them used more often?

There are a few reasons we don’t see View Models explicitly called out in React code. For one, any prop interface that describes display values for a React component already acts as a type of View Model:

```tsx
interface BadgeProps {
  text: string;
  variant: 'success' | 'warning' | 'danger';
}

function Badge(props: BadgeProps): JSX.Element { /* implementation */ }
```

And going further, we may even wrap this component to provide a reusable version for users:

```tsx
interface UserBadgeProps {
  status: UserStatus;
}

function UserBadge(props: UserBadgeProps): JSX.Element {
  const badgeProps = useStatusBadge(props.status);
  
  return <Badge {...badgeProps} />;
}

```

With that in mind, this helps explains why we don’t see explicit View Models during typical React development.

Once you start thinking about the prop interface as a view model is passing too much data into your component:

```tsx
interface BadUserBadgeProps {
  user: User;
}

function UserBadge(props: UserBadgeProps): JSX.Element {
  const badgeProps = useStatusBadge(props.user.status);
  
  return <Badge {...badgeProps} />;
}

```

In this example, we pass through the entire User interface into the component. While in the short term this may seem fine, longer term this can create a brittle interface. This starts to matter more when you are server-side rendering, since the props from an Async Server Component to a client component should be as minimal as possible to avoid sending too much data from the server render to the client.

### Sneaky View Models

There are a few cases where we actually do write View Models without really thinking about it, other than prop interfaces. Whenever we write selectors for accessing data stores that derive data, reshape it, or prepare state for rendering, we are writing some form of View Models. Context selectors are often used to minimize the number of re-renders when the context data changes.

In Fate, views select on subsets of fields from API data to reduce the impact of data changes causing re-renders.

All three strategies aim to minimize the impact of data causing re-renders, and in trying to reduce that churn, we end up writing some form of View Model.

### Conclusion

Once we know the software engineering pattern, we can start to see how it manifests in different areas. We see that while we are not explicitly saying that something is a View Model in React code, we write component interfaces and transform data in ways that prepare it for presentation.