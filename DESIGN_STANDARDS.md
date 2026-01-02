# Design Standards

## Layout Standards

### Header
- **Height**: Fixed `48px` (`h-12` in Tailwind)
- **Border**: No bottom border
- **Content**: Centered with `max-w-md` (448px) container
- **Padding**: Horizontal padding of `px-6` (24px)
- **Background**: Uses theme `bg-background`

### Page Container
- **Max Width**: `max-w-md` (448px) - optimal for mobile viewing
- **Centering**: `mx-auto` for horizontal centering
- **Padding**: `px-6` (24px) horizontal padding
- **Full Height**: `min-h-screen` for full viewport coverage
- **No Rounded Corners**: Pages should not have rounded corners on the main container

### Main Content Area
- All pages follow this structure:
  ```tsx
  <div className="min-h-screen bg-background flex flex-col">
    <Header />
    <main className="flex-1 w-full max-w-md mx-auto px-6 ...">
      {/* Page content */}
    </main>
    <Footer />
  </main>
  ```

### Fixed Footer Buttons
- For pages with fixed bottom buttons:
  ```tsx
  <div className="fixed bottom-0 left-0 right-0 bg-background border-t border-border z-10">
    <div className="w-full max-w-md mx-auto px-6 py-4 flex gap-3">
      {/* Buttons */}
    </div>
  </div>
  ```

## Spacing
- **Header to Content**: Variable based on page needs
- **Horizontal Padding**: Consistent `px-6` (24px)
- **Vertical Padding**: `py-8` for most pages
- **Button Gaps**: `gap-3` (12px) between buttons

## Mobile-First Approach
- All designs are optimized for mobile devices (max-width: 448px)
- Content is always centered on larger screens
- Touch-friendly button sizes (minimum `h-12` or `h-14`)

## Components Affected
- ✅ Header.tsx
- ✅ Index.tsx
- ✅ PermissionsScreen.tsx
- ✅ ConfirmationScreen.tsx
- ✅ PersonalDetailsScreen.tsx
- ✅ ConsentScreen.tsx
- ℹ️ PolicyDetailsScreen.tsx (custom layout, handles its own constraints)
- ℹ️ LanguageSelection.tsx (legacy, will be phased out as Index now handles language selection)
