"use client";

/**
 * UI Components Examples
 *
 * This file demonstrates all available UI components.
 * Copy and paste examples into your components as needed.
 *
 * To view this page, create a route: app/ui-examples/page.tsx
 * and import this component.
 */

import { useState } from "react";
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
  CardFooter,
  Badge,
  Modal,
  ModalBody,
  ModalFooter,
  Spinner,
} from "./index";

export function UIExamples() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Container maxWidth="xl" padding="lg">
      <Box display="flex" direction="column" gap="xl">
        {/* Typography */}
        <section>
          <Heading as="h1">Typography</Heading>
          <Box display="flex" direction="column" gap="md" margin="md">
            <Heading as="h1">Heading 1</Heading>
            <Heading as="h2">Heading 2</Heading>
            <Heading as="h3">Heading 3</Heading>
            <Heading as="h4">Heading 4</Heading>
            <Text size="xl">Extra Large Text</Text>
            <Text size="lg">Large Text</Text>
            <Text size="base">Base Text</Text>
            <Text size="sm">Small Text</Text>
            <Text size="xs">Extra Small Text</Text>
          </Box>
        </section>

        {/* Buttons */}
        <section>
          <Heading as="h2">Buttons</Heading>
          <Box display="flex" gap="sm" margin="md">
            <Button variant="primary" size="sm">Primary Small</Button>
            <Button variant="secondary" size="md">Secondary Medium</Button>
            <Button variant="outline" size="lg">Outline Large</Button>
            <Button variant="ghost">Ghost</Button>
            <Button isLoading>Loading</Button>
            <Button disabled>Disabled</Button>
          </Box>
        </section>

        {/* Inputs */}
        <section>
          <Heading as="h2">Inputs</Heading>
          <Box display="flex" direction="column" gap="md" margin="md">
            <Input
              label="Email"
              type="email"
              placeholder="Enter your email"
              helperText="We'll never share your email"
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter password"
              error="Password is required"
            />
            <Input
              label="Disabled"
              value="Cannot edit"
              disabled
            />
          </Box>
        </section>

        {/* Cards */}
        <section>
          <Heading as="h2">Cards</Heading>
          <Box display="grid" gap="md" margin="md" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
            <Card variant="elevated">
              <CardHeader title="Elevated Card" subtitle="With shadow" />
              <CardBody>
                <Text>This card has an elevated shadow effect.</Text>
              </CardBody>
              <CardFooter>
                <Button size="sm">Action</Button>
              </CardFooter>
            </Card>

            <Card variant="outlined">
              <CardHeader title="Outlined Card" subtitle="With border" />
              <CardBody>
                <Text>This card has a border outline.</Text>
              </CardBody>
            </Card>

            <Card variant="filled">
              <CardHeader title="Filled Card" subtitle="With background" />
              <CardBody>
                <Text>This card has a filled background.</Text>
              </CardBody>
            </Card>
          </Box>
        </section>

        {/* Badges */}
        <section>
          <Heading as="h2">Badges</Heading>
          <Box display="flex" gap="sm" margin="md">
            <Badge variant="default">Default</Badge>
            <Badge variant="primary">Primary</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="error">Error</Badge>
          </Box>
          <Box display="flex" gap="sm" margin="md">
            <Badge size="sm">Small</Badge>
            <Badge size="md">Medium</Badge>
            <Badge size="lg">Large</Badge>
          </Box>
        </section>

        {/* Spinners */}
        <section>
          <Heading as="h2">Spinners</Heading>
          <Box display="flex" gap="lg" align="center" margin="md">
            <Spinner size="sm" />
            <Spinner size="md" />
            <Spinner size="lg" />
            <Spinner size="xl" label="Loading..." />
          </Box>
        </section>

        {/* Modal */}
        <section>
          <Heading as="h2">Modal</Heading>
          <Box margin="md">
            <Button onClick={() => setIsModalOpen(true)}>
              Open Modal
            </Button>

            <Modal
              isOpen={isModalOpen}
              onClose={() => setIsModalOpen(false)}
              title="Example Modal"
              size="md"
            >
              <ModalBody>
                <Box display="flex" direction="column" gap="md">
                  <Text>
                    This is an example modal dialog. It includes a title, body, and footer.
                  </Text>
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
                </Box>
              </ModalBody>
              <ModalFooter>
                <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={() => setIsModalOpen(false)}>
                  Save
                </Button>
              </ModalFooter>
            </Modal>
          </Box>
        </section>

        {/* Layout Components */}
        <section>
          <Heading as="h2">Layout Components</Heading>
          <Box margin="md">
            <Card variant="outlined">
              <CardBody>
                <Box display="flex" direction="column" gap="md">
                  <Text weight="semibold">Flexbox Example:</Text>
                  <Box display="flex" gap="sm" align="center">
                    <Badge>Item 1</Badge>
                    <Badge>Item 2</Badge>
                    <Badge>Item 3</Badge>
                  </Box>

                  <Text weight="semibold">Column Layout:</Text>
                  <Box display="flex" direction="column" gap="sm">
                    <Text>First item</Text>
                    <Text>Second item</Text>
                    <Text>Third item</Text>
                  </Box>

                  <Text weight="semibold">Centered Content:</Text>
                  <Box display="flex" justify="center" align="center" padding="lg">
                    <Badge variant="primary">Centered Badge</Badge>
                  </Box>
                </Box>
              </CardBody>
            </Card>
          </Box>
        </section>

        {/* Complete Form Example */}
        <section>
          <Heading as="h2">Complete Form Example</Heading>
          <Box margin="md">
            <Card variant="elevated">
              <CardHeader
                title="Contact Form"
                subtitle="Get in touch with us"
              />
              <CardBody>
                <Box display="flex" direction="column" gap="md">
                  <Input
                    label="Full Name"
                    placeholder="John Doe"
                    fullWidth
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    placeholder="john@example.com"
                    fullWidth
                  />
                  <Input
                    label="Phone Number"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    helperText="Optional"
                    fullWidth
                  />
                  <Box display="flex" gap="sm" align="center">
                    <Badge variant="success">Available</Badge>
                    <Text size="sm" color="secondary">
                      We typically respond within 24 hours
                    </Text>
                  </Box>
                </Box>
              </CardBody>
              <CardFooter>
                <Button variant="ghost">Cancel</Button>
                <Button variant="primary">Submit</Button>
              </CardFooter>
            </Card>
          </Box>
        </section>
      </Box>
    </Container>
  );
}
