# CI/CD Dashboard Project

A web dashboard for authenticating with GitHub, visualizing repositories, and monitoring CI/CD workflow runs.

## 🚀 Features

- **GitHub OAuth Authentication:** Secure login using GitHub accounts.
- **Repository Viewer:** See your GitHub repositories in a dashboard.
- **Workflow Runs Monitor:** View and track GitHub Actions workflow runs for each repository.
- **Status & Conclusion Display:** Check the status and conclusion of CI/CD pipelines.
- **Responsive UI:** Built with EJS templates and styled using TailwindCSS.

## 🛠️ Technology Stack

- **Backend:** Node.js, Express.js
- **Authentication:** Passport.js (GitHub Strategy)
- **Frontend:** EJS (Embedded JavaScript Templates), TailwindCSS
- **API:** GitHub REST API (for repo and workflow data)
- **Session Management:** express-session
- **Environment Management:** dotenv

## 📦 Installation

1. **Clone the repository**
   ```sh
   git clone https://github.com/Saichandu51/CI-CD_Project.git
   cd CI-CD_Project
   ```

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Configure environment variables**
   - Create a `.env` file (see `environment.txt` for format):
     ```
     GITHUB_CLIENT_ID=your_client_id
     GITHUB_CLIENT_SECRET=your_client_secret
     PORT=3000
     ```
   - Make sure `.env` is listed in your `.gitignore`.

4. **Run the application**
   ```sh
   npm start
   ```
   or
   ```sh
   node server.js
   ```

5. **Access the app**
   - Go to [http://localhost:3000](http://localhost:3000)
   - Login with GitHub and view your repo dashboards.

## ⚡ Usage

- Authenticate with GitHub to view your profile and repositories.
- Click on a repository to see workflow runs and CI/CD pipeline statuses.

## 🛡️ Security

- **Never commit secrets or client IDs to GitHub.**
- Store sensitive credentials in `.env` and add it to `.gitignore`.

## 🤝 Contributors :
    - Saichandu Anukonti, Krishnaiya vesuwala, Lakshya S.

## 👤 Author

- [Saichandu51](https://github.com/Saichandu51)
- [krishnaiya-vesuwala](https://github.com/Krishnaiya-vesuwala)
- [lakshya25110](https://github.com/lakshya25110)
---

*For questions or improvements, open an issue or pull request!*
