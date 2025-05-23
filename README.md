# AI Chatbot with Reports Dashboard

A modern chatbot application built with Next.js 15, featuring an intelligent conversational interface and comprehensive analytics dashboard.

## 🚀 Features

- **Interactive Chatbot**: AI-powered conversational interface
- **Reports Dashboard**: Comprehensive analytics and statistics
- **Modern UI**: Built with Tailwind CSS and responsive design
- **Real-time Analytics**: Track user interactions and performance metrics
- **Dark/Light Mode Support**: Seamless theme switching
- **Mobile Responsive**: Optimized for all device sizes

## 📁 Project Structure

```
chatbot/
├── src/
│   ├── app/
│   │   ├── reports/
│   │   │   └── page.tsx        # Reports dashboard
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Home page
│   ├── components/             # Reusable UI components
│   ├── context/               # React context providers
│   ├── data/                  # Static data and configurations
│   ├── hooks/                 # Custom React hooks
│   ├── styles/                # Global styles and themes
│   ├── types/                 # TypeScript type definitions
│   └── utils/                 # Utility functions
├── public/                    # Static assets
├── .next/                     # Next.js build output
└── README.md
```

## 🛠️ Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Build Tool**: Turbopack
- **Package Manager**: pnpm
- **Icons**: React Icons
- **Animations**: Framer Motion

## 📋 Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm/yarn

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd chatbot
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📊 Reports Dashboard

The reports dashboard (`/reports`) provides comprehensive analytics including:

- **Usage Statistics**: Track user interactions and engagement
- **Performance Metrics**: Monitor response times and system performance  
- **Activity Timeline**: Recent user activities and system events
- **Visual Analytics**: Charts and graphs for data visualization
- **Real-time Updates**: Live data updates and monitoring

### Key Metrics Displayed

- User engagement rates (89%, 78% satisfaction metrics visible in build)
- Activity categorization with color-coded indicators
- Performance statistics and trends
- Historical data analysis

## 🎨 Customization

### Styling
- Modify `tailwind.config.js` for theme customization
- Update global styles in `src/styles/`
- Component-specific styles are co-located with components

### Configuration
- Environment variables can be added to `.env.local`
- API configurations in `src/data/`
- Type definitions in `src/types/`

## 📱 Responsive Design

The application is fully responsive with:
- Mobile-first design approach
- Adaptive layouts for tablets and desktops
- Touch-friendly interactions
- Optimized performance across devices

## 🔧 Development Scripts

```bash
# Development server
pnpm dev

# Production build
pnpm build

# Start production server
pnpm start

# Type checking
pnpm type-check

# Linting
pnpm lint
```

## 📈 Performance

- **Next.js 15** with Turbopack for fast builds
- **Static Site Generation (SSG)** for optimal performance
- **Image Optimization** with Next.js Image component
- **Font Optimization** with `next/font`
- **Bundle Analysis** available for optimization insights

## 🚀 Deployment

### Vercel (Recommended)

The easiest way to deploy is using the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme):

1. Push your code to GitHub/GitLab/Bitbucket
2. Import your repository in Vercel
3. Deploy with zero configuration

### Other Platforms

- **Netlify**: Build command `pnpm build`, publish directory `.next`
- **AWS Amplify**: Configure build settings for Next.js
- **Docker**: Use the included Dockerfile for containerization

## 📖 Learn More

### Next.js Resources

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) - Interactive Next.js tutorial
- [Next.js GitHub Repository](https://github.com/vercel/next.js) - Feedback and contributions welcome!

### Project Resources

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [React Documentation](https://reactjs.org/docs/)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Issues & Support

If you encounter any issues or need support:

1. Check the [Issues](../../issues) page for existing problems
2. Create a new issue with detailed description
3. Include steps to reproduce the problem
4. Provide environment details (OS, Node.js version, etc.)

## 🙏 Acknowledgments

- Built with [Create Next App](https://nextjs.org/docs/app/api-reference/cli/create-next-app)
- UI components inspired by modern design systems
- Icons provided by React Icons library
- Animations powered by Framer Motion

---

**Happy Coding!** 🎉