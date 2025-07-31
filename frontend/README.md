# E-Commerce Frontend Application

A modern React-based frontend application for displaying and managing products from the REST API.

## Features

### ✅ Required Features (Milestone 3)
- **Products List View**: Displays all products in a responsive grid format
- **Product Detail View**: Shows detailed information when a product is clicked
- **API Integration**: Connects to the Spring Boot REST API
- **Basic Styling**: Modern UI using Bootstrap 5
- **Navigation**: Seamless navigation between list and detail views

### 🚀 Additional Features
- **Search Functionality**: Search products by name
- **Pagination**: Navigate through large product lists
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Loading States**: Graceful loading indicators
- **Error Handling**: User-friendly error messages
- **Profit Analysis**: Shows profit calculations for products

## Technology Stack

- **React 19**: Latest React with hooks
- **Vite**: Fast build tool and development server
- **React Router**: Client-side routing
- **Bootstrap 5**: CSS framework for styling
- **React Bootstrap**: Bootstrap components for React
- **Vanilla JavaScript**: No TypeScript, pure JS

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Backend API running on `http://localhost:8080`

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start the development server:**
   ```bash
   npm run dev
   ```

3. **Open your browser:**
   Navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Navigation component
│   │   ├── ProductList.jsx      # Products grid view
│   │   ├── ProductDetail.jsx    # Individual product view
│   │   ├── LoadingSpinner.jsx   # Loading indicator
│   │   └── ErrorBoundary.jsx    # Error handling
│   ├── services/
│   │   └── api.js              # API service layer
│   ├── App.jsx                 # Main application component
│   ├── main.jsx                # Application entry point
│   ├── App.css                 # Custom styles
│   └── index.css               # Global styles
├── public/                     # Static assets
├── package.json                # Dependencies and scripts
└── vite.config.js             # Vite configuration
```

## API Integration

The frontend connects to the Spring Boot API with the following endpoints:

- `GET /api/products` - Get all products with pagination
- `GET /api/products/{id}` - Get specific product by ID
- `GET /api/products/search?name={term}` - Search products by name
- `GET /api/products/category/{category}` - Get products by category
- `GET /api/products/brand/{brand}` - Get products by brand

## Features in Detail

### Product List View
- **Grid Layout**: Responsive card-based layout
- **Search**: Real-time search functionality
- **Pagination**: Navigate through product pages
- **Product Cards**: Show key information (name, brand, price)
- **Loading States**: Spinner during data fetching
- **Error Handling**: User-friendly error messages

### Product Detail View
- **Complete Information**: All product details displayed
- **Price Formatting**: Proper currency formatting
- **Profit Analysis**: Calculate profit and margin
- **Breadcrumb Navigation**: Easy navigation back to list
- **Responsive Layout**: Works on all screen sizes

### Navigation
- **React Router**: Client-side routing
- **Breadcrumbs**: Clear navigation path
- **Back Buttons**: Easy return to previous page
- **Mobile-Friendly**: Responsive navigation

## Styling

- **Bootstrap 5**: Modern CSS framework
- **Custom CSS**: Additional styling for better UX
- **Responsive Design**: Mobile-first approach
- **Hover Effects**: Interactive card animations
- **Color Scheme**: Professional blue theme

## Error Handling

- **Network Errors**: Handle API connection issues
- **404 Errors**: Product not found scenarios
- **Loading Timeouts**: Request timeout handling
- **User Feedback**: Clear error messages
- **Retry Functionality**: Allow users to retry failed requests

## Testing the Application

### Manual Testing Steps

1. **Start both applications:**
   ```bash
   # Backend (in backend/thinnk41/)
   mvn spring-boot:run
   
   # Frontend (in frontend/)
   npm run dev
   ```

2. **Test Product List:**
   - Visit `http://localhost:5173`
   - Verify products load correctly
   - Test search functionality
   - Test pagination

3. **Test Product Details:**
   - Click on any product card
   - Verify detailed information displays
   - Test navigation back to list

4. **Test Error Scenarios:**
   - Disconnect backend to test error handling
   - Try invalid product IDs
   - Test network timeouts

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Performance Features

- **Lazy Loading**: Components load as needed
- **Optimized Images**: Placeholder system for images
- **Efficient API Calls**: Timeout and error handling
- **Responsive Images**: Scale appropriately
- **Minimal Bundle**: Optimized for production

## Future Enhancements

- **Shopping Cart**: Add to cart functionality
- **User Authentication**: Login/logout system
- **Product Filtering**: Advanced filter options
- **Image Upload**: Product image management
- **Admin Panel**: Product management interface
- **Real-time Updates**: WebSocket integration

## Troubleshooting

### Common Issues

1. **API Connection Error:**
   - Ensure backend is running on port 8080
   - Check CORS configuration in backend
   - Verify API endpoints are accessible

2. **Build Errors:**
   - Clear node_modules and reinstall
   - Check Node.js version compatibility
   - Verify all dependencies are installed

3. **Styling Issues:**
   - Ensure Bootstrap CSS is imported
   - Check for CSS conflicts
   - Verify responsive breakpoints

## Contributing

1. Follow the existing code structure
2. Use functional components with hooks
3. Maintain responsive design principles
4. Add proper error handling
5. Test on multiple devices

## License

This project is part of the Think41 interview process.
