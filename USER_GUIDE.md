# Applied AI Presentation Editor - User Guide

Welcome to the enhanced Applied AI Presentation Editor! This guide will help you use all the new features for editing, rearranging, and exporting your presentation.

## 🚀 Getting Started

1. **Open the Editor**: Navigate to `http://localhost:3000` (or your Railway URL)
2. **Choose Your Mode**: Use the mode buttons in the sidebar to switch between View, Edit, and Arrange modes

## 📋 Three Modes Explained

### 1. **View Mode** (Default)
- **Purpose**: Present and navigate through slides
- **Features**: 
  - Navigate with arrow keys or buttons
  - Full-screen slide preview
  - Export individual or combined PDFs

### 2. **Edit Mode**
- **Purpose**: Modify slide content and styling
- **Features**:
  - Visual editor for content
  - HTML code editor
  - Real-time preview
  - Custom CSS styling

### 3. **Arrange Mode**
- **Purpose**: Reorder slides using drag and drop
- **Features**:
  - Drag slides to reorder
  - Visual feedback during dragging
  - Automatic slide numbering

## ✏️ Editing Slides

### Click-to-Edit Interface
The new editor allows you to click directly on any element in your slides to edit it:

1. **Switch to Edit Mode**: Click the "Edit" button in the sidebar (you'll see "EDIT MODE" indicator)
2. **Click Any Element**: Click on any text, heading, or element in the slide
3. **Edit in Real-time**: Use the rich text editor on the right to modify content
4. **Apply Changes**: Click "Apply Changes" to see your modifications

### Visual Editor Features
The enhanced visual editor provides:

- **Rich Text Editing**: Use the Quill editor for formatting text
- **Formatting Toolbar**: Bold, italic, underline, text color, font size, alignment
- **Element Information**: See details about the element you're editing
- **Custom CSS**: Add custom styles to any element
- **Real-time Preview**: See changes immediately in the slide

### Formatting Options
Use the formatting toolbar to style your text:

- **Bold (B)**: Make text bold
- **Italic (I)**: Make text italic
- **Underline (U)**: Underline text
- **Text Color (🎨)**: Change text color
- **Font Size (📏)**: Adjust font size
- **Alignment**: Left, center, or right align text

### HTML Code Tab
For advanced users who want direct HTML control:

- **HTML Code**: Edit the complete HTML structure of the selected element
- **Apply Changes**: Apply your HTML modifications
- **Syntax Highlighting**: Code is formatted for easy reading

### Tips for Editing
- **Hover over elements** to see "Click to edit" tooltip
- **Click on any element** to start editing it
- **Use the formatting toolbar** for quick styling
- **Apply changes** to see modifications immediately
- **Switch between slides** and the editor remembers your changes

## 🔄 Rearranging Slides

### Using Arrange Mode
1. Click the **Arrange** button in the sidebar
2. Drag slides up or down to reorder them
3. The slide numbers will automatically update
4. Your new order is preserved for PDF export

### Visual Feedback
- **Ghost Effect**: Shows where the slide will be placed
- **Highlighted**: The slide being moved is highlighted
- **Smooth Animation**: Smooth transitions during reordering

## 📄 Exporting PDFs

### Individual Slide Export
1. Navigate to the slide you want to export
2. Click **Export to PDF** in the toolbar
3. The PDF will download automatically

### Combined PDF Export
1. Arrange your slides in the desired order (if needed)
2. Click **Export Combined PDF** in the toolbar
3. All slides will be combined into a single PDF file
4. The PDF maintains your custom slide order

### Export Options
- **Fit Content**: Each slide is sized to fit its content
- **High Quality**: 1280px width with optimal resolution
- **Background Included**: All styling and backgrounds preserved

## 💾 Saving Your Work

### Auto-Save Features
- Slide content is automatically saved in the browser
- Rearrangement changes are preserved
- Editor state is maintained between sessions

### Manual Save
- Click **Save Changes** to persist modifications
- Configuration is saved to `slides-config.json`
- Changes are available when you reload the page

## 🎯 Advanced Features

### Keyboard Shortcuts
- **Arrow Keys**: Navigate between slides
- **Spacebar**: Next slide
- **Escape**: Close editor panel
- **Ctrl+S**: Save changes (in editor)
- **Click**: Select and edit any element (in edit mode)

### Slide Management
- **Duplicate Slides**: Click the 📋 icon to copy a slide
- **Delete Slides**: Click the 🗑️ icon to remove a slide
- **Slide Actions**: Available in the sidebar for each slide

### Responsive Design
- Works on desktop, tablet, and mobile devices
- Sidebar collapses on smaller screens
- Editor panel adapts to screen size

## 🔧 Troubleshooting

### Common Issues

**Editor not opening:**
- Make sure you're in Edit Mode
- Check that the slide file exists
- Refresh the page if needed

**Changes not saving:**
- Click "Save Changes" button
- Check browser console for errors
- Ensure you have write permissions

**PDF export fails:**
- Check that all slide files exist
- Ensure Puppeteer is properly installed
- Try exporting individual slides first

**Drag and drop not working:**
- Make sure you're in Arrange Mode
- Check that Sortable.js is loaded
- Try refreshing the page

### Getting Help
1. Check the browser console for error messages
2. Verify all files are in the correct locations
3. Ensure all dependencies are installed
4. Contact support if issues persist

## 🎨 Customization Tips

### HTML Content Examples
```html
<!-- Simple text -->
<h1>Your Title</h1>
<p>Your content here</p>

<!-- With styling -->
<div style="text-align: center; color: blue;">
  <h2>Centered Blue Title</h2>
</div>

<!-- Lists -->
<ul>
  <li>Item 1</li>
  <li>Item 2</li>
</ul>
```

### CSS Styling Examples
```css
/* Custom fonts */
body {
  font-family: 'Arial', sans-serif;
}

/* Background colors */
.slide-content {
  background: linear-gradient(45deg, #667eea, #764ba2);
}

/* Text effects */
h1 {
  text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
}
```

## 📱 Mobile Usage

### Touch Gestures
- **Tap**: Select slides and buttons
- **Swipe**: Navigate between slides
- **Long Press**: Access slide actions (on mobile)

### Mobile Optimizations
- Responsive layout adapts to screen size
- Touch-friendly buttons and controls
- Optimized for mobile browsers

## 🔄 Collaboration Features

### Sharing Your Work
1. **Export Combined PDF**: Share the final presentation
2. **Save Configuration**: Share the slides-config.json file
3. **Deploy to Railway**: Share the live web interface

### Team Workflow
1. **Edit Locally**: Make changes on your machine
2. **Test Changes**: Preview before saving
3. **Save and Share**: Export or deploy for team access
4. **Iterate**: Make further improvements based on feedback

---

## 🎉 Quick Start Checklist

- [ ] Open the presentation editor
- [ ] Familiarize yourself with the three modes
- [ ] Try editing a slide's content
- [ ] Rearrange slides using drag and drop
- [ ] Export a combined PDF
- [ ] Save your changes
- [ ] Share with your team

**Happy presenting! 🚀** 