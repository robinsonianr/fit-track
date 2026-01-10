# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Fit Track is a full-stack fitness tracking application with a Spring Boot backend and React frontend. The project uses a monorepo structure with separate build configurations for each component.

## Repository Structure

- `/fit-track` - Spring Boot 3.0.4 backend (Kotlin/Java)
- `/fit-track-ui/react` - React 18.2.0 frontend with TypeScript
- Root contains Gradle build configuration coordinating the monorepo

## Common Commands

### Backend (Spring Boot)

From project root:

```bash
# Build the backend
./gradlew build

# Run the backend application
./gradlew run

# Run tests
./gradlew test

# Clean build artifacts
./gradlew clean
```

### Frontend (React + Vite)

From `fit-track-ui/react` directory:

```bash
# Install dependencies
npm install

# Start development server (runs on http://localhost:5173)
npm start

# Build for production
npm run build

# Lint JavaScript/TypeScript
npm run lint

# Fix linting issues automatically
npm run lint:fix

# Lint CSS
npm run lint:css

# Lint Markdown files
npm run lint:md
```

### Database Setup

The application requires PostgreSQL running in Docker:

```bash
# Create Docker network
docker network create db

# Run PostgreSQL container
docker run --name my-postgres-container -p 5432:5432 --network=db \
  -v dbdata:/var/lib/postgres/data \
  -e POSTGRES_PASSWORD=root1234 \
  -e POSTGRES_DB=fit-tracker \
  -d postgres

# Check if container is running
docker ps

# Start container if not running
docker start my-postgres-container
```

Database connection: `jdbc:postgresql://localhost:5432/fit-tracker`
Schema name: `fit_tracker` (must be created manually in the database)

## Architecture

### Backend Architecture

**Technology Stack:**
- Spring Boot 3.0.4 with Java 17
- Kotlin 1.8.10 for build configuration
- PostgreSQL with Flyway migrations
- JPA/Hibernate with Envers for audit trails
- Spring Security + JWT (JJWT 0.11.5)
- MapStruct 1.6.3 for DTO mapping
- AWS S3 SDK 2.20.56 for file storage
- Gradle 7.6.1

**Layered Architecture:**
- `api/` - REST Controllers exposing endpoints
- `security/` - Authentication, JWT handling, filters, and security configuration
- `data/entity/` - JPA entities (Customer, Workout, Exercise)
- `data/repository/` - Data access layer using JpaRepository
- `data/service/` - Business logic services
- `mappers/` - MapStruct mappers for Entity ↔ DTO conversion
- `audit/` - Hibernate Envers audit tracking
- `s3/` - AWS S3 integration for profile image storage
- `exception/` - Custom exception classes

**Database Schema:**
- `customer` - User accounts with profile data and S3 image references
- `workout` - Workout entries linked to customers
- `exercises` - Exercise details linked to workouts (One-to-Many)
- `revinfo` + `customer_aud` - Audit tables for tracking changes

**Relationships:**
- Customer 1:N Workout
- Workout 1:N Exercise

**Database Migrations:**
Located in `fit-track/src/main/resources/db/migration/`. Flyway manages versioned migrations (V202403041200 through V202511161625).

### Frontend Architecture

**Technology Stack:**
- React 18.2.0 with TypeScript 5.7.3
- Vite 6.3.4 for build tooling
- Tailwind CSS with PostCSS
- Axios 1.8.2 for HTTP requests
- React Router DOM 6.8.0
- ECharts 5.5.1 for visualizations
- Radix UI components
- next-themes for theme management

**Component Organization:**
- `src/components/ui/` - Reusable UI components
- `src/components/features/` - Feature-specific components (login, signup, logs)
- `src/components/common/` - Shared components (modals, widgets)
- `src/components/layout/` - Layout structure (navbar, sidebar, header)
- `src/context/` - React Context providers (AuthContext, ThemeContext)
- `src/services/` - API client layer with Axios
- `src/types/` - TypeScript interfaces and types
- `src/hooks/` - Custom React hooks
- `src/pages/` - Page-level components
- `src/styles/` - CSS/Tailwind styling

**State Management:**
Uses React Context API (no Redux/Zustand):
- **AuthContext**: Manages authentication state, JWT token, and customer data
- **ThemeContext**: Manages light/dark/system theme preferences

**Data Persistence:**
- `localStorage.access_token` - JWT authentication token
- `localStorage.customerId` - Current user ID
- `localStorage.theme` - Theme preference

### Authentication Flow

**Backend:**
1. `/api/v1/auth/login` endpoint accepts email/password
2. Spring Security's AuthenticationManager validates credentials
3. JWT token generated with 24-hour expiration (HS256 signature)
4. Token includes user email as subject and roles in claims
5. JWTAuthenticationFilter validates tokens on all protected endpoints

**Frontend:**
1. Login form sends credentials to backend
2. JWT token stored in localStorage
3. Axios interceptor adds `Authorization: Bearer {token}` header to all requests
4. ProtectedRoute wrapper prevents unauthenticated access to routes
5. Token decoded on app mount to restore session

**Protected Endpoints:**
All endpoints require authentication except:
- `/api/v1/auth/login`
- `/api/v1/customers` (POST/GET)
- `/ping`
- Profile images
- `/actuator/**`

### Key API Endpoints

```
POST   /api/v1/auth/login                      # Authenticate user
POST   /api/v1/customers                       # Register new customer
GET    /api/v1/customers/{id}                  # Get customer details
GET    /api/v1/customers/{id}/profile-image    # Get profile image
PUT    /api/v1/customers/{id}/profile-image    # Upload profile image (10MB max)
PUT    /api/v1/customers/update/{id}           # Update customer
GET    /api/v1/workouts/log/{customerId}       # Get customer workouts
POST   /api/v1/workouts                        # Create workout
GET    /api/v1/workouts/{id}                   # Get workout details
GET    /api/v1/audit/{entityId}                # Get weight audit history
```

### File Upload Strategy

- Profile images stored in AWS S3: `profile-images/{customerId}/{uuid}`
- Image reference (UUID) stored in database as `profileImageId`
- Maximum file size: 10MB
- FormData used for file uploads from frontend
- Transactional consistency via `@Transactional` annotation

### Audit Trail System

- Hibernate Envers tracks all CustomerEntity changes automatically
- AuditHistoryService queries revision history
- Weight change history exposed via `/api/v1/audit/{entityId}`
- Revisions stored in `revinfo` and `customer_aud` tables

## Subagent Orchestration
When a task requires deep domain expertise or multi-step execution, delegate to the specialized agents located in `.claude/agents/lst97/`.

### Dispatch Protocol
1. **Identify**: Determine the best specialist for the task (e.g., use `java-architect` for Gradle issues).
2. **Context**: Provide the subagent with relevant file paths and the specific goal.
3. **Execute**: Call the agent using the `/agents` command or by referencing their role.
4. **Rules**: All subagents must follow the core coordination rules defined in `@.claude/agents/lst97/CLAUDE.md`.

## Environment Configuration

**Backend Environment Variables:**
Configuration via `application.yml` and optional `.env` file:
- Database: `jdbc:postgresql://localhost:5432/fit-tracker`
- Database credentials: username `postgres`, password `root1234`
- Server port: 8080
- S3 bucket: `fitness-tracker-customers` (region: us-east-1)
- Max file upload: 10MB

**Frontend Environment Variables:**
Located in `fit-track-ui/react/.env`:
- `VITE_API_BASE_URL` - Backend API base URL (default: http://localhost:8080)

## Development Workflow

1. **Start Database**: Ensure PostgreSQL container is running
2. **Start Backend**: Run `./gradlew run` from project root (runs on port 8080)
3. **Start Frontend**: Run `npm start` from `fit-track-ui/react` (runs on port 5173)
4. **Access Application**: Navigate to http://localhost:5173

Test account available:
- Email: test123@gmail.com
- Password: Test123

## Important Patterns and Conventions

### Backend Patterns

**Entity Design:**
- `AbstractEntity`: Base class with `id` and `version`
- `AbstractModifiedDateEntity`: Adds `createdDate` and `lastModifiedDate` timestamps
- `AbstractAuditEntity`: Extends modified date entity with Hibernate Envers auditing
- Use `@OneToMany` with `FetchType.LAZY` and `CascadeType.ALL` for relationships
- Use `@ManyToOne` with `FetchType.LAZY` for reverse relationships

**Service Layer:**
- Services contain business logic and orchestrate repository calls
- Use `@Transactional` for operations requiring consistency
- Inject repositories and other services via constructor injection

**Repository Pattern:**
- Extend `JpaRepository<Entity, ID>` for standard CRUD
- Use `@Query` annotations for custom queries
- Separate interfaces for complex update operations (e.g., `CustomerUpdateRepository`)

**DTO Mapping:**
- MapStruct handles Entity ↔ DTO conversions
- Mappers configured in `FitTrackMapperConfig` with Spring injection
- Use `@Mapping` annotations for non-standard field mappings

**Error Handling:**
- Custom exceptions: `ResourceNotFoundException`, `DuplicateResourceException`
- Global exception handlers process and format error responses

### Frontend Patterns

**Component Structure:**
- Use functional components with hooks
- Separate UI components from feature components
- Keep business logic in services, not components
- Use TypeScript interfaces for all props and data structures

**API Calls:**
- All API calls go through `services/client.ts`
- Axios instance automatically adds auth headers
- Handle loading and error states in components

**Routing:**
- Use `ProtectedRoute` wrapper for authenticated routes
- Page components in `src/pages/`
- Route definitions centralized in main routing configuration

**Type Safety:**
- Define interfaces for all data models in `src/types/`
- Avoid `any` types in public APIs
- Use strong typing for API responses

## Known Considerations

- JWT secret key is currently hardcoded (should use environment variable)
- CORS allows all origins (`*`) in development
- Database credentials are in `application.yml` (should use `.env` for local dev)
- Backend runs on port 8080, frontend on port 5173 during development

## Testing

**Backend:**
- JUnit and Mockito for unit tests
- H2 in-memory database for tests
- Run tests with `./gradlew test`

**Frontend:**
- Testing setup available but specific test commands not configured in package.json
- Uses `@testing-library/react` and `@testing-library/jest-dom`
