# CleanPro Services Demo Website

This is a demo website for CleanPro Services, a professional cleaning company. The website showcases various cleaning services and allows users to request quotes.

## Features

- Responsive design that works on desktop and mobile devices
- Multiple pages: Home, Services, About, Contact
- Interactive contact form with demo submission
- Hover effects and smooth animations
- Professional styling with clean layout

## How to Run

1. Open the `index.html` file in your web browser to view the website.

For a better experience, you can serve the files using a local web server:

### Using Python (if installed)
```bash
python -m http.server 8000
```
Then open `http://localhost:8000` in your browser.

### Using Node.js (if installed)
```bash
npx http-server
```
Then open the provided URL in your browser.

## File Structure

```
cleaning-company/
├── index.html          # Home page
├── services.html       # Services page
├── about.html          # About page
├── contact.html        # Contact page
├── css/
│   └── style.css       # Main stylesheet
├── js/
│   └── script.js       # JavaScript for interactivity
└── images/             # Placeholder for images
```

## Demo Features

- **Contact Form**: Fill out the form on the contact page to see a demo submission alert
- **Hover Effects**: Hover over service cards to see subtle animations
- **Responsive Design**: Resize your browser or view on mobile to see the responsive layout

## Customization

To customize this website:
1. Edit the HTML files to change content
2. Modify `css/style.css` to change styling
3. Update `js/script.js` to add more interactivity
4. Add real images to the `images/` folder

## Note

This is a demo website with placeholder content and images. In a production environment, you would:
- Replace placeholder images with actual photos
- Implement server-side form processing
- Add real contact information
- Integrate with a CMS or backend system for dynamic content

## Troubleshooting

- If images don't load, ensure you're running a local server and the paths are correct
- If JavaScript doesn't work, check the browser console for errors
- For mobile testing, use browser developer tools to simulate different devices