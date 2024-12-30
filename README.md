# pnpm Web Manager

A simple web tool built with Vue 3, Bulma (using Buefy components), and Hono to manage pnpm packages locally.

## Features

* List installed packages with their versions, dependencies, and devDependencies.
* Audit packages for security vulnerabilities.
* Check why a specific package is installed.
* Uninstall packages.
* User-friendly interface with Bulma styling and Buefy components.

## Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/bitsnaps/pnpm-web-manager.git  # Replace with your repo URL
   cd pnpm-web-manager
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   ```

3. **Start the development server:**

   ```bash
   pnpm dev
   ```

   This will start the Hono server and serve the frontend application.

## Usage

1. Open your web browser and navigate to `http://localhost:3000`.
2. Use the buttons and input field to interact with the pnpm manager:
   - **List Packages:** Displays a table of installed packages.
   - **Audit Packages:** Checks for security vulnerabilities.
   - **Why:** Enter a package name and click "Why" to see why it's installed.
   - **Uninstall:** Enter a package name and click "Uninstall" to remove it.

## Backend (Hono)

The backend is built with Hono and provides API endpoints for the frontend to interact with:

* `/api/list`: Lists installed packages (returns JSON).
* `/api/audit`: Audits packages (returns text).
* `/api/why/:packageName`: Shows why a package is installed (returns text).
* `/api/uninstall`: Uninstalls a package (accepts POST request with JSON payload).

## Frontend (Vue 3, Bulma/Buefy)

The frontend is built with Vue 3 and uses Bulma CSS framework with Buefy components.  It communicates with the Hono backend using the `fetch` API.

## Project Structure
```
pnpm-web-manager/
├── static/            // Frontend files (index.html, etc.)
├── src/               // Backend code (index.js)
├── pnpm-lock.yaml
└── package.json

```


## Contributing

Contributions are welcome!  Please open an issue or submit a pull request.

## License

License: MIT
