# Applied AI Presentation System

A web-based presentation viewer with PDF export capabilities for the Applied AI for Startup Founders course.

## Features

- 📊 Interactive presentation viewer
- 📄 PDF export for individual slides
- 📚 PDF export for all slides at once
- 🌐 Web-based interface
- 🔧 API endpoints for automation
- 🚀 Ready for deployment on Railway

## Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd applied-ai-presentation
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

## Usage

### Web Interface

1. **View Presentation**: Open `http://localhost:3000` to view the presentation
2. **Navigate**: Use the navigation buttons to move between slides
3. **Export PDFs**: Click the export button to generate PDFs

### Command Line Export

**Export a single slide:**
```bash
npm run export-slide 5
```

**Export all slides:**
```bash
npm run export-all
```

### API Endpoints

**Get list of slides:**
```bash
curl http://localhost:3000/api/slides
```

**Export a specific slide:**
```bash
curl -X POST http://localhost:3000/api/export-slide \
  -H "Content-Type: application/json" \
  -d '{"slideNumber": 5}'
```

**Export all slides:**
```bash
curl -X POST http://localhost:3000/api/export-all
```

## Project Structure

```
applied-ai-presentation/
├── server.js                 # Main Express server
├── presentation-viewer.html  # Web interface
├── Page 1.html              # Individual slide files
├── Page 2.html
├── ...
├── Page 12.html
├── scripts/
│   ├── export-all.js        # Export all slides script
│   └── export-slide.js      # Export single slide script
├── Exported slides/         # Generated PDFs
├── package.json
└── README.md
```

## Deployment on Railway

### Step 1: Prepare for Railway

1. **Create a Railway account** at [railway.app](https://railway.app)
2. **Connect your GitHub repository**

### Step 2: Deploy

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Initial deployment"
   git push origin main
   ```

2. **Deploy on Railway**
   - Go to Railway dashboard
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository
   - Railway will automatically detect it's a Node.js app

### Step 3: Configure Environment

Railway will automatically:
- Install dependencies from `package.json`
- Use the `start` script to run the server
- Set the `PORT` environment variable

### Step 4: Access Your App

- Railway will provide a public URL (e.g., `https://your-app.railway.app`)
- Share this URL with your team for collaboration

## Collaboration Workflow

### For Team Members

1. **Access the web interface** at your Railway URL
2. **Edit slides** by modifying the HTML files
3. **Preview changes** in the web interface
4. **Export PDFs** as needed

### For Developers

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd applied-ai-presentation
   npm install
   ```

2. **Make changes** to slide files or code

3. **Test locally**
   ```bash
   npm run dev
   ```

4. **Commit and push**
   ```bash
   git add .
   git commit -m "Update slide content"
   git push origin main
   ```

5. **Railway will automatically redeploy**

## Customization

### Adding New Slides

1. Create a new HTML file named `Page X.html` (where X is the slide number)
2. Follow the same structure as existing slides
3. The system will automatically detect and include the new slide

### Modifying Export Settings

Edit the PDF export options in `server.js`:

```javascript
await page.pdf({
    path: outputPath,
    width: '1280px',           // Change width
    height: `${contentHeight}px`, // Auto-height
    printBackground: true,     // Include backgrounds
    margin: { top: 0, right: 0, bottom: 0, left: 0 } // Margins
});
```

### Styling Changes

- Modify `presentation-viewer.html` for the web interface
- Update individual slide HTML files for slide content
- CSS is embedded in the HTML files

## Troubleshooting

### Common Issues

**PDF export fails:**
- Ensure Puppeteer dependencies are installed
- Check that slide HTML files exist
- Verify file permissions

**Server won't start:**
- Check if port 3000 is available
- Ensure all dependencies are installed
- Check Node.js version (requires 18+)

**Slides not loading:**
- Verify HTML file names match the pattern `Page X.html`
- Check file paths and permissions

### Getting Help

1. Check the console output for error messages
2. Verify all files are in the correct locations
3. Ensure Node.js version is 18 or higher

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:
- Create an issue in the GitHub repository
- Contact the development team

---

**Happy presenting! 🎉** 