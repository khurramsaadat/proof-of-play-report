# Proof of Play Report Form

## Project Overview
A web-based form application for creating and managing Proof of Play reports. The application features a responsive design that works seamlessly both on screen and in print, with modern UI elements and intuitive user interactions.

## Deployment
- **GitHub Repository**: Public repository for version control and code sharing
- **Netlify Deployment**: Automated deployment through GitHub integration
  - Auto-deploys on every push to the master branch
  - Continuous Integration/Continuous Deployment (CI/CD) enabled

## Technology Stack
- HTML5
- CSS3 (Modern CSS features)
- Vanilla JavaScript (ES6+)
- External Libraries:
  - html2pdf.js for PDF generation
  - Font Awesome for icons

## File Structure
```
proof-of-play-report/
├── index.html          # Main HTML structure
├── style.css          # Styling and responsive design
├── script.js          # Core functionality
└── assets/
    ├── logo.png       # Header logo
    ├── shape.png      # Header shape
    └── footer.png     # Footer image
```

## Key Features

### 1. Form Header
- Professional layout with logo and shape image
- Responsive design adapting to different screen sizes
- Optimized image sizing (logo: 40px, shape: 160px)

### 2. Form Fields
- Auto-populated default values:
  - Reference Number: PM1046-2025.01
  - Client: Philip Morris Management Services Middle East Ltd
  - Contact: Noor Sumaiya
  - Position: Commercial Planning Administrator Lead
  - Date: Automatically set to current date

### 3. Location Management
- Dynamic location list with:
  - Pre-populated locations
  - Add/Remove functionality
  - Commit changes feature
  - Automatic numbering (01, 02, etc.)
  - Enhanced spacing for readability
  - Alternating background colors
  - Interactive hover effects

### 4. Image Management
- Modern upload interface
- Multiple image support
- Location association for each image
- Automatic image sizing
- Enhanced delete functionality:
  - Red circular delete button
  - Positioned top-right
  - Hover effects
  - Touch-friendly (40px target)

### 5. Service Engineer Section
- Pre-filled engineer details
- Digital signature support:
  - Drag & drop functionality
  - Image transformation tools
  - Position/rotation controls
- Date stamp functionality

### 6. Action Buttons
- Consistent styling (200px width)
- Modern design with hover effects
- Primary actions:
  - Print to PDF
  - Upload Photos
  - Save Report
  - Reset Form

### 7. Print Optimization
- Clean print layout
- Proper page breaks
- Hidden UI controls in print
- Maintained styling for key elements
- Optimized image placement

## User Interface Features
- Responsive design
- Modern button styling
- Interactive hover effects
- Clear visual hierarchy
- Consistent spacing
- Touch-friendly interface
- Error handling and feedback

## Color Scheme
- Primary Purple: #6a1b9a
- Light Purple: #faf5ff
- Background Alt: #f8f8f8
- Borders: #e0e0e0
- Text: #333333
- Accent Red: #dc3545 (delete buttons)

## Development Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/[username]/proof-of-play-report.git
   ```
2. Open `index.html` in a modern web browser
3. No build process required - pure HTML/CSS/JS

## Deployment Process
1. Push changes to GitHub:
   ```bash
   git add .
   git commit -m "your commit message"
   git push origin master
   ```
2. Netlify automatically deploys updates
3. Check deployment status on Netlify dashboard

## Browser Support
- Chrome (recommended)
- Firefox
- Safari
- Edge
- Modern mobile browsers

## Maintenance Notes
1. Location changes require committing to update dropdowns
2. Image uploads are processed client-side
3. Print layout automatically adjusts
4. Form state persists until manual reset
5. All UI controls are hidden in print view

## Future Enhancements
- [ ] Offline support
- [ ] Local storage backup
- [ ] Multi-language support
- [ ] Dark mode theme
- [ ] Enhanced mobile optimization

## Contributing
1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Support
For support, please open an issue in the GitHub repository or contact the maintainer.

---
Last Updated: 2024 