Lessons Learned: Building a Flexible Page Layout in React
The Problem: Layout Scope and Component Relationships
While building my portfolio site in React, I wanted a consistent layout across all pages: a top navigation bar (NavBar), an optional sidebar (Drawer), and a main content area. My initial approach was to render the NavBar at the top level of my app (in App.tsx) and then conditionally render the Drawer inside individual pages or layouts.

However, I quickly ran into issues:

The NavBar and Drawer weren’t “aware” of each other. When I opened the Drawer, the NavBar didn’t shift or resize, leading to awkward overlays and broken transitions.
The Drawer often rendered as a portal overlay, floating above the content instead of pushing it aside as a true sidebar.
Layout logic was duplicated across pages, making it hard to maintain and reason about.
What Was Happening?
React and Material UI’s Drawer component, by default, uses a portal. This means it renders outside the normal DOM flow—at the end of the <body>—so it overlays everything, regardless of where you put it in your JSX. Meanwhile, my NavBar was in a separate container, so it couldn’t respond to the Drawer’s state or position.

The Solution: Centralizing Layout with PageLayout
I learned that the best way to handle this is to centralize all layout logic in a single PageLayout component. Here’s what I changed:
Moved the NavBar and Drawer into the same parent container (PageLayout), making them siblings in the DOM and part of the same flexbox layout.
Passed all layout-related props (like showDrawer, drawerItems, and theme toggling) to PageLayout, so each page could control its own layout without duplicating logic.
Used the correct Drawer variant and portal settings (variant="permanent" for a classic sidebar, or variant="persistent" with ModalProps={{ disablePortal: true }} for a collapsible sidebar that pushes content).
What I Learned
Component scope matters: For interactive layouts, related components (like NavBar and Drawer) must be siblings in the same layout container to interact properly.
Understand third-party defaults: Material UI’s Drawer uses portals by default, which can break expected layout behavior if you’re not careful.
Centralize layout logic: A single layout component (PageLayout) makes it easy to manage and update the structure of your app, and keeps your code DRY.
Prop drilling for global state: Passing theme and layout props from the top-level App.tsx down to PageLayout and its children keeps state management simple and explicit.
Takeaway
By restructuring my layout and understanding how portals and component scope work in React, I created a flexible, maintainable, and visually consistent app. This experience taught me the importance of thinking through component relationships and reading third-party library docs carefully—a lesson I’ll carry into future projects!
