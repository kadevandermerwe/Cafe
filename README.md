# Restaurant Website

A modern, mobile-friendly restaurant website designed to provide an engaging digital dining experience. The platform offers comprehensive restaurant information with interactive features and responsive design, tailored for a British culinary audience.

## Features

- **Mobile-Responsive Design**: Fully functional across all device sizes
- **Modern UI**: Beautiful interface with subtle animations and smooth interactions 
- **Interactive Booking System**: Complete reservation management interface
- **Menu Showcase**: Visually appealing food and drink presentation
- **Business Information**: Hours, location, and contact details
- **British English Localization**: Content tailored for UK audience

## Technologies Used

- **Frontend**: React with TypeScript
- **Styling**: Tailwind CSS with customized theme
- **Animation**: Framer Motion and GSAP
- **Form Handling**: React Hook Form with Zod validation
- **State Management**: React Query
- **Routing**: Wouter for lightweight routing

## Deployment Options

This restaurant website offers flexible deployment options:

### Database-Free Deployment (Default)

The website includes a sophisticated in-memory storage system that simulates database functionality without requiring an actual database connection. This makes it ideal for portfolio demonstrations or quick deployments.

To deploy without a database:
```bash
# Use the provided deployment script
./deploy-no-database.sh
```

See [DEPLOY.md](DEPLOY.md) for detailed deployment instructions, including specific steps for platforms like Render.com.

### With Database (Optional)

The website can also connect to a PostgreSQL database for persistent data storage. This is optional and requires:
- A PostgreSQL database instance
- DATABASE_URL environment variable properly configured

## Development

To run the project locally:

```bash
# Install dependencies
npm install

# Start the development server 
npm run dev
```

For development with in-memory storage:
```bash
# Set environment variable for in-memory mode
export FORCE_IN_MEMORY=true
npm run dev
```

## Project Structure

- `/client`: Frontend React application
- `/server`: Express server and API endpoints
- `/shared`: Shared TypeScript types and schemas
- `/public`: Static assets

## License

This project is available for personal and commercial use.

## Acknowledgments

- All imagery used is either original or properly licensed
- Tailwind CSS and Shadcn UI for component styling
- British culinary tradition for menu inspiration