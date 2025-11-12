# Compounds

This folder contains compound components - components that are composed of multiple atoms working together to form a more complex, reusable UI pattern.

## What belongs here?

Compound components are more complex than atoms but simpler than full molecules. They typically:

- Combine multiple atoms (like buttons, inputs, icons) into a cohesive unit
- Have specific, focused functionality
- Are reusable across different parts of the application
- Don't manage complex state or business logic (that belongs in molecules)

## Current Components

### MethodSelector
A styled dropdown for selecting HTTP methods (GET, POST, PUT, PATCH, DELETE) with:
- Color-coded method display
- Custom dropdown styling
- Icon integration
- Type-safe HTTP method selection

## Examples of what else could go here:

- Form fields with integrated labels and error messages
- Search bars combining input + button + icon
- Toggle switches with labels
- Dropdown menus with custom styling
- Combo boxes (input + dropdown)
- Rich text input with formatting buttons

## Component Structure

Atoms → **Compounds** → Molecules
- **Atoms**: Basic building blocks (Button, Input, Checkbox)
- **Compounds**: Combinations of atoms (MethodSelector, SearchBar)
- **Molecules**: Complex features with business logic (HeadersPanel, BodyEditor)
