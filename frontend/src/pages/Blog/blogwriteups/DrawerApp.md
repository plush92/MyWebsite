Drawer | App Blog Post

Handling Layout with a Persistent Drawer and AppBar in Material UI
When building a dashboard or blog admin interface, it’s common to want a persistent sidebar (Drawer) that pushes the main content and a top navigation bar (AppBar) that remains visible at all times. However, getting these two components to interact smoothly—so that the Drawer pushes both the content and the AppBar—can be tricky if you don’t structure your layout correctly.

The Problem
At first, I tried rendering my AppBar at the top level of my app (in App.tsx), and then rendering a Drawer inside specific pages (like my blog page). This seemed logical, since I wanted the AppBar to be global and the Drawer to be page-specific.

However, this approach led to a problem:
The Drawer and AppBar couldn’t “see” each other.

The Drawer would overlay the AppBar, or vice versa.
The AppBar wouldn’t shrink or shift when the Drawer opened.
I had to use awkward CSS hacks (like hardcoding top offsets) to avoid overlap.
Why This Happens
Material UI’s Drawer and AppBar are designed to work together when they are siblings in the same component tree. If you render them in different parts of your app, they can’t coordinate their layout or state.
This means you lose out on the “push” effect, where opening the Drawer shifts the AppBar and main content to the right.

The Solution
Move both the AppBar and Drawer into the same layout component.
This way, they can share state (like whether the Drawer is open) and coordinate their layout using flexbox and styled components.

Here’s the pattern I used (based on the MUI docs):
export default function PersistentDrawerLeft() {
  const [open, setOpen] = React.useState(false);

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        {/*...AppBar content... */}
      </AppBar>
      <Drawer
        variant="persistent"
        anchor="left"
        open={open}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        {/* ...Drawer content... */}
      </Drawer>
      <Main open={open}>
        {/* ...Main content...*/}
      </Main>
    </Box>
  );
}

The open state is shared between the AppBar and Drawer.
The AppBar and Drawer are siblings, so the AppBar can shrink and shift when the Drawer opens.
The main content area (Main) also shifts to accommodate the Drawer.
Takeaways
Keep interacting layout components as siblings in the same component tree.
Share state at the layout level to coordinate open/close actions.
Avoid hardcoding offsets—let your layout handle positioning with flexbox and styled components.
This approach leads to a much cleaner, more maintainable layout, and takes full advantage of Material UI’s design patterns.
