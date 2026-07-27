# UI Components Usage Guide

This folder contains global, reusable UI components that can be used throughout the application.

## Installation

All components are exported from `@/components` for easy importing:

```tsx
import { Button, Input, Card } from "@/components";
```

## Components

### Layout Components

#### Container
A responsive container component with max-width constraints.

```tsx
import { Container } from "@/components";

<Container maxWidth="lg" padding="md">
  <h1>Content goes here</h1>
</Container>
```

Props:
- `maxWidth`: "sm" | "md" | "lg" | "xl" | "2xl" | "full" (default: "lg")
- `padding`: "none" | "sm" | "md" | "lg" (default: "md")
- `center`: boolean (default: true)

#### Box
A flexible layout component for creating flexbox and grid layouts.

```tsx
import { Box } from "@/components";

<Box display="flex" direction="column" gap="md" padding="lg">
  <div>Item 1</div>
  <div>Item 2</div>
</Box>
```

Props:
- `display`: "block" | "flex" | "inline-flex" | "grid" | "inline-block"
- `direction`: "row" | "column"
- `align`: "start" | "center" | "end" | "stretch"
- `justify`: "start" | "center" | "end" | "between" | "around"
- `gap`: "xs" | "sm" | "md" | "lg" | "xl"
- `padding`: "none" | "xs" | "sm" | "md" | "lg" | "xl"
- `margin`: "none" | "xs" | "sm" | "md" | "lg" | "xl"

---

### Typography

#### Heading
Semantic heading component with customizable levels.

```tsx
import { Heading } from "@/components";

<Heading as="h1" weight="bold" align="center">
  Welcome to our app
</Heading>
```

Props:
- `as`: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" (default: "h2")
- `weight`: "normal" | "medium" | "semibold" | "bold" (default: "semibold")
- `align`: "left" | "center" | "right" (default: "left")

#### Text
Flexible text component for body content.

```tsx
import { Text } from "@/components";

<Text size="lg" color="secondary">
  This is a paragraph of text.
</Text>
```

Props:
- `size`: "xs" | "sm" | "base" | "lg" | "xl" (default: "base")
- `weight`: "normal" | "medium" | "semibold" | "bold" (default: "normal")
- `align`: "left" | "center" | "right" (default: "left")
- `color`: "primary" | "secondary" | "muted" | "error" | "success" (default: "primary")

---

### Form Components

#### Button
Versatile button component with multiple variants.

```tsx
import { Button } from "@/components";

<Button variant="primary" size="md" onClick={handleClick}>
  Click me
</Button>

<Button variant="outline" isLoading>
  Loading...
</Button>
```

Props:
- `variant`: "primary" | "secondary" | "outline" | "ghost" (default: "primary")
- `size`: "sm" | "md" | "lg" (default: "md")
- `fullWidth`: boolean (default: false)
- `isLoading`: boolean (default: false)

#### Input
Form input with label, error, and helper text support.

```tsx
import { Input } from "@/components";

<Input
  label="Email"
  type="email"
  placeholder="Enter your email"
  error="Invalid email address"
  helperText="We'll never share your email"
  fullWidth
/>
```

Props:
- `label`: string
- `error`: string
- `helperText`: string
- `fullWidth`: boolean (default: false)

---

### Data Display

#### Card
Flexible card component for content grouping.

```tsx
import { Card, CardHeader, CardBody, CardFooter } from "@/components";

<Card variant="elevated" padding="lg">
  <CardHeader
    title="Card Title"
    subtitle="Card subtitle"
  />
  <CardBody>
    <p>Card content goes here</p>
  </CardBody>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card>
```

Props:
- `variant`: "elevated" | "outlined" | "filled" (default: "elevated")
- `padding`: "none" | "sm" | "md" | "lg" (default: "md")

#### Badge
Small status or label indicator.

```tsx
import { Badge } from "@/components";

<Badge variant="success" size="md">
  Active
</Badge>
```

Props:
- `variant`: "default" | "primary" | "secondary" | "success" | "warning" | "error" (default: "default")
- `size`: "sm" | "md" | "lg" (default: "md")

---

### Feedback Components

#### Spinner
Loading indicator.

```tsx
import { Spinner } from "@/components";

<Spinner size="lg" color="primary" label="Loading..." />
```

Props:
- `size`: "sm" | "md" | "lg" | "xl" (default: "md")
- `color`: "primary" | "secondary" | "white" (default: "primary")
- `label`: string

#### Modal
Accessible modal dialog.

```tsx
"use client";

import { useState } from "react";
import { Modal, ModalBody, ModalFooter, Button } from "@/components";

function MyComponent() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Modal</Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Modal Title"
        size="md"
      >
        <ModalBody>
          <p>Modal content goes here</p>
        </ModalBody>
        <ModalFooter>
          <Button variant="ghost" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button onClick={() => setIsOpen(false)}>
            Confirm
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}
```

Props:
- `isOpen`: boolean (required)
- `onClose`: () => void (required)
- `title`: string
- `size`: "sm" | "md" | "lg" | "xl" (default: "md")
- `closeOnOverlayClick`: boolean (default: true)

---

## Complete Example

```tsx
"use client";

import {
  Container,
  Box,
  Heading,
  Text,
  Button,
  Input,
  Card,
  CardHeader,
  CardBody,
  Badge,
} from "@/components";

export default function ExamplePage() {
  return (
    <Container maxWidth="lg" padding="lg">
      <Box display="flex" direction="column" gap="lg">
        <Heading as="h1" align="center">
          Welcome to Our App
        </Heading>

        <Card variant="elevated">
          <CardHeader
            title="Get Started"
            subtitle="Fill out the form below"
          />
          <CardBody>
            <Box display="flex" direction="column" gap="md">
              <Input
                label="Name"
                placeholder="Enter your name"
                fullWidth
              />
              <Input
                label="Email"
                type="email"
                placeholder="Enter your email"
                fullWidth
              />
              <Button variant="primary" fullWidth>
                Submit
              </Button>
            </Box>
          </CardBody>
        </Card>

        <Box display="flex" gap="sm">
          <Badge variant="success">Active</Badge>
          <Badge variant="warning">Pending</Badge>
          <Badge variant="error">Inactive</Badge>
        </Box>
      </Box>
    </Container>
  );
}
```

## Best Practices

1. **Consistent Spacing**: Use the built-in spacing props (gap, padding, margin) instead of custom CSS
2. **Type Safety**: Import and use TypeScript types for better IDE support
3. **Accessibility**: All components include proper ARIA attributes and keyboard navigation
4. **Customization**: Use the `className` prop to add custom styles when needed
5. **Composition**: Combine components to build complex UIs

## Customization

Each component accepts a `className` prop for custom styling:

```tsx
<Button className="my-custom-class">
  Custom Styled Button
</Button>
```

Or use CSS modules:

```tsx
import styles from "./MyComponent.module.css";

<Button className={styles.myButton}>
  Custom Styled Button
</Button>
```
