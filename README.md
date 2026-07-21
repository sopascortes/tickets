# Support Ticket Board Workspace

A decoupled full-stack incident management dashboard using a React Single Page Application frontend, optimized with Tailwind CSS utility workflows, and powered by an automated Node.js Express service built with native SQLite persistence tracking.

# 1. Technologies used
## Backend (API & Persistence)
- Runtime: Node.js (v22 / ES Modules)
- Framework: Express.js (TypeScript)
- Database: Sqlite

## Security & Middleware:
- helmet (HTTP security headers)
- cors (Cross-Origin Resource Sharing controls)
- express-rate-limit (DDoS mitigation & API throttling)
- dotenv (Environment variable management)

## Runtime Execution: 
- tsx (TypeScript watcher for dev) 
- tsc (Production build compiler)

## Frontend (UI & Dashboard)
- Library: React 18 / 19
- Build System: Vite (Fast HMR & Rollup bundling)
- Styling Framework: Tailwind CSS (Utility-first styling with custom UI badges & layouts)
- Server Interactivity: Native Fetch API with React hooks state management

## Testing & Quality Assurance
- Test Runner: Jest (with ts-jest for native ESM/TypeScript support)
- HTTP Assertions: Supertest (Integration testing against Express endpoints)
- Utility Tools: cross-env (Cross-platform environment flag support)

## DevOps & Production Containerization
- Container Engine: Docker & Docker Compose
- Web Server & Reverse Proxy: Nginx (Serving the React SPA and proxying /api traffic)
- Multi-Stage Builds: Alpine-based lightweight image compilers (node:22-alpine, nginx:1.27-alpine)

## Operational Capabilities
- Kanban Pipeline: Track operations seamlessly across Open, In Progress, and Resolved columns using native browser HTML5 drag-and-drop mechanics.
- Dynamic Prioritization Filters: Instantly sift through columns by isolating specific priority and status conditions.
- Real-Time Validation Lifecycle: Form validation rules protect inputs at both frontend client boundaries and backend server middleware contexts.

# 2. Installation instructions
## 🛠️   Dev setup
Run all commands from the repository root path.

### Installation
```bash
npm run install:all
```
# 3. How to run the frontend and backend
Run all commands from the repository root path.
### 🛠️   Backend server
```bash
npm run dev:server
```

### 🛠️   Frontend server [From a different shell than the one the backend server is running]
```bash
npm run dev:client
```
### Access the app on http://localhost:5173

# 4. How to set up the database or seed sample data
There is no neede to setup the database or add sample data, that is done during the installation

# 5. How to run the automated tests
### 🛠️   Run test scripts
```bash
npm run test:server
```

# 6. Assumptions and technical trade-offs
- Low-to-Medium Write Concurrency: It is assumed that ticket creation and status updates happen at a manageable volume (dozens to hundreds per minute rather than thousands per second).

- Stateless API Tier: The backend assumes horizontal scalability—session state is not stored in Node.js memory. All persistent state lives in SQLite.

- Network & Gateway Topology: The setup assumes a single domain edge (like Nginx, AWS ALB, or Cloudflare) handles path-based routing (/api/* to backend, / to React SPA). This allows relaxed cross-origin cookie policies and avoids complex CORS handling in production.

- Monolithic Relational Boundary: Data naturally fits a relational schema (tickets with rigid status enum values: open, in_progress, resolved).

- Containerized Deployment: The production target is expected to run Docker containers (e.g., via ECS, Kubernetes, Docker Swarm, or Render) with persistent volume support for the SQLite database.

- Single Tenant or Global Queue: The system assumes a single operational queue where all tickets live in a flat, globally visible workspace rather than isolated multi-tenant agency spaces.

- The backend is not accesible outside the docker network where the containers run.

# 7. What you would improve with more time
I would add all the optional requirements, specially the "Authentication or role-based access" , the live updates and advanced search.

# 8. Docker Compose setup
## 🛠️   Docker setup
Run all commands from the repository root path.

```bash
1. Build infrastructure images across all layers natively from the source configurations
docker compose build

2. Spin up the cluster in a detached background daemon routine
docker compose up -d

3. Check the internal cluster status metrics live
docker compose ps

4. Access the app on http://localhost
```


# 9. Deployment to a cloud platform
I installed the app on a Digital Ocean droplet.

### https://tickets.corteshernandez.com



