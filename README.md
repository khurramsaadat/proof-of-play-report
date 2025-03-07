# Proof of Play Report Form

## Project Overview
A web-based form for creating and managing Proof of Play reports, featuring a responsive design that works both on screen and in print.

## File Structure
- `index.html` - Main HTML structure
- `style.css` - All styling and responsive design rules
- `script.js` - JavaScript functionality
- Assets:
  - `logo.png` - Header logo
  - `shape.png` - Header shape image
  - `footer.png` - Footer image

## Key Features

### 1. Header Section
- Logo (40px height) positioned on the left
- Shape image (160px height) positioned on the right
- Responsive design for mobile views

### 2. Form Fields
- Reference Number (Default PM1046-2025.01)
- Client Information (Default: Philip Morris Management Services Middle East Ltd)
- Contact Person (Default: Noor Sumaiya)
- Position (Default: Commercial Planning Administrator Lead)
- Date (Auto-populated with current date)

### 3. Location Management
- Pre-populated list of locations with increased vertical spacing
- Alternating background colors for better readability
- Numbering format: 01, 02, 03, etc.
- Add/Remove location functionality
- Commit changes feature
- Note section with date for special locations

### 4. Proof of Play Section
- Image upload functionality with modern UI
- Location selection for each image
- Support for multiple images
- Automatic sizing (small/large) based on image dimensions
- Responsive image preview
- Enhanced image management:
  - Red circular delete button in top-right corner
  - Improved image removal UX
  - Clear visual feedback for delete actions

### 5. Service Engineer Section
- Engineer details (Name: Hazem Shbair)
- Signature upload with transformation controls
- Date field

### 6. Action Buttons
- Consistent button sizing (200px width)
- Modern styling with hover effects
- "Print to PDF" button with enhanced visibility
- "Upload Photos" button matching main action button styles

### 7. Print Optimization
- Proper page breaks
- Hidden controls in print view
- Maintained styling for alternating location backgrounds
- Footer positioning
- Optimized image layouts

## Recent Updates

### Button Enhancements
- Standardized button width to 200px
- Increased padding and font size for better visibility
- Added hover effects with shadow and transform
- Matched "Upload Photos" and "Print to PDF" button styles

### Image Management Improvements
- Redesigned image delete button:
  - Positioned in top-right corner
  - Red circular background
  - White cross icon
  - Hover effect with scale animation
  - Improved touch target size (40px)

### Location Section Updates
- Increased vertical spacing between location items
- Enhanced visual separation of items
- Improved overall readability

### UI/UX Improvements
- Consistent button styling across the form
- Better visual hierarchy
- Enhanced interactive elements
- Improved spacing and alignment

### Header Adjustments
- Reduced logo height to 40px
- Increased shape image height to 160px
- Adjusted spacing and alignment

### Location Section Improvements
- Increased font size for "Location:" label to 18px
- Added alternating background colors (#f8f8f8 and #ffffff)
- Improved hover effects with light purple background
- Fixed location dropdown population in image upload section

### Proof of Play Enhancements
- Increased "Proof of Play:" label size to 18px
- Improved spacing and alignment
- Enhanced image preview container styling

### Print View Optimizations
- Ensured alternating backgrounds show in print
- Maintained label sizes and positioning
- Hidden action buttons and controls
- Proper footer placement

## JavaScript Features
- Dynamic location list management
- Image upload and preview
- Location selection for images
- Signature upload with transformation controls
- Print and email functionality
- Form reset capability

## CSS Organization
- Modular styling with clear sections
- Responsive design with mobile breakpoints
- Print-specific styles
- Modern UI elements with hover effects
- Consistent color scheme

## Color Scheme
- Primary Purple: #6a1b9a
- Light Purple: #faf5ff
- Alternate Row: #f8f8f8
- Borders: #e0e0e0
- Text: #333

## Future Maintenance Notes
1. Location changes require updating both the list and dropdown selectors
2. Print styles are critical for proper report generation
3. Image handling includes automatic size detection
4. All interactive elements are hidden in print view
5. Form maintains state until manual reset

## Known Behaviors
1. Location items require commit action to appear in dropdowns
2. Images are categorized as large/small based on dimensions
3. Signature transformation is available until acceptance
4. Print view automatically adjusts layout for optimal page breaks

This documentation will help maintain consistency in future updates and provide quick reference for the project's structure and features. 