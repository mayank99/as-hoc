# polymorphic

Demo of a utility function that reduces the boilerplate required to work with type-safe polymorphic components and handle CSS-modules-like scoped classes at the same time.

Usage:

```tsx
const Box = polymorphic.div('whatever');

// renders <div class='__whatever-123abc'>
<Box>...</Box>

// renders <a> and supports intellisense for href, etc
<Box as='a' href='#'>...</Box> 
```

```tsx
const MyButton = polymorphic.button('my-button', { type: 'button' });

// renders <button type='button' class='__my-button-123abc'>
<MyButton>...</MyButton>

// renders <a> and supports intellisense for href, etc
<MyButton as='a' href='#'>...</MyButton>
```
