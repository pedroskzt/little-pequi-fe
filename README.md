<!--suppress HtmlDeprecatedAttribute, HtmlDeprecatedAttribute -->mlDeprecatedAttribute -->mlDeprecatedAttribute -->mlDeprecatedAttribute -->
<div align="center">

# 🚀 React TypeScript Project

A modern web application built with cutting-edge technologies

[![React](https://img.shields.io/badge/React-19.0.0-61DAFB?style=flat&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Material-UI](https://img.shields.io/badge/MUI-7.0.2-0081CB?style=flat&logo=mui)](https://mui.com/)
[![Storybook](https://img.shields.io/badge/Storybook-8.6.12-FF4785?style=flat&logo=storybook)](https://storybook.js.org/)
[![Vite](https://img.shields.io/badge/Vite-6.3.1-646CFF?style=flat&logo=vite)](https://vitejs.dev/)

[![Backend](https://img.shields.io/badge/Littl%20Pequi%20Backendend-v1-F9D259)](https://github.com/pedroskzt/little-pequi-be)

</div>

## Project Overview

The Little Pequi restaurant project is a comprehensive restaurant management solution developed to showcase my
full-stack web application development skills.
The project is structured using a modern microservices architecture, with clear separation between the frontend and
backend services.

The **frontend** application offers a modern, user-friendly interface built with **React** and **TypeScript**. It
seamlessly integrates with the backend to provide real-time data and functionality for both customers and restaurant
administrators.

## ✨ Features

- 🎨 Modern UI with Material-UI components
- 📱 Responsive design out of the box
- 🔥 Fast development and building with Vite
- 📚 Component documentation with Storybook
- ✅ Comprehensive testing suite
- 🛣️ Client-side routing
- 🎭 Theme customization
- 🔐 JWT authentication with automatic token refresh
- 👥 User session management and account pages
- 🛡️ Admin panel with role-based access control

## 🛠️ Tech Stack

<table>
    <tr>
        <td align="center">Core</td>
        <td align="center">Development</td>
        <td align="center">Styling</td>
        <td align="center">Documentation</td>
    </tr>
    <tr>
        <td>
            • React 19.0.0<br/>
            • TypeScript 5.7.2<br/>
            • React Router 7.5.1
        </td>
        <td> 
            • Vite 6.3.1<br/>
            • ESLint 9.22.0
        </td>
        <td>
            • MUI Icons 7.0.2<br/>
            • Material-UI 7.0.2
        </td>
        <td>
            • Storybook 8.6.12
        </td>
    </tr>
</table>

## 📁 Project Structure

```
src/
src/
├── components/     # Reusable components
├── pages/          # Application pages
│ ├── admin/        # Admin panel pages
│ ├── auth/         # Authentication pages
│ ├── menu/         # Restaurant menu
│ └── user/         # User account pages
├── routes/         # Routing configuration
├── assets/         # Static assets
├── interfaces/     # TypeScript interfaces
├── theme/          # MUI theme customization
├── contexts/       # React contexts (Auth, etc.)
├── services/       # API client and services
├── validations/    # Zod validation schemas
└── tests/          # Test files
```

## 🚀 Getting Start
### Prerequisites

- Node.js (v18 or higher recommended)
- npm package manager
- Access to the Little Pequi Backend API

### Installation

1. **Clone the repository**

```bash
git clone <repository-url>
````

2.  **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

Create a `.env` file in the root directory with:
```
VITE_API_URL=<your-backend-api-url>
```

4. **Start development server**

```bash
npm run dev
```

### Start Storybook (Optional)

1. **Start the storybook server**
```bash
npm run storybook
```
---

## Related Projects

- Backend Repository: [Little Pequi Restaurant Backend](https://github.com/pedroskzt/little-pequi-be)

## 🚧 Development Status and Contributions

The project is currently under development, contributions are welcome!

If you have suggestions for improving the project, feel free to fork the repository and create a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
