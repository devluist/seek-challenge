
## How to run the project locally

```bash
cd client
pnpm i
pnpm dev
```

```bash
cd ../backend
pnpm i
sls offline
```

> or npm if you use that instead of pnpm. This was tested with node 22.14.0


## Tech Stack

Common
> pnpm, node v22

Client
> vite, MaterialUI, Typescript, react, zustand

Backend
> serverless, aws-sdk, zod, mongodb


# Tareas:

### FRONTEND:
```
    ✔ completar ui
        ✔ pantalla listado de tareas
            ✔ components
                ✔ listado/tabla de tareas
                ✔ formulario agregar
                ✔ botonera de acciones (crud de tareas)
        ✔ pantalla de sesion
            ✔ pantalla de inicio
                ✔ form de correo y clave
                ✔ validar q solo logueado pueda ver tareas
            ✔ pantalla de registro
                ✔ form de solo correo y clave
                ✔ validar q si esta logueado no pueda ver esto
        ✔ pantalla de dashboard
    ✔ manejar excepciones y devolver mensajes claros
    ✔ validar datos
```

### BACKEND:
```
    ✔ crud de tareas
        ✔ api restringe q puedas pedir tareas SOLO SI estas logueado
    ✔ manejo de usuarios
        ✔ iniciar sesion
        ✔ registrar usuarios
    ✔ validar datos
        ✔ manejar excepciones y devolver mensajes claros
    ✔ conectar con bd mongodb
    ✔ documentar el api con openapi o postman quizas
```

### DEPLOYMENT:
```
    ✔ documentar como correr e instalar, etc
    ☐ deploy en aws api gateweay como lambda/serverless functions
```



## Project Structure
```
/backend
├── src
│   ├── handlers
│   │   ├── tasks.ts        # AWS Lambda functions for task management
│   │   └── auth.ts         # AWS Lambda functions for user authentication
│   ├── models
│   │   ├── task.ts         # Task model definition
│   │   └── user.ts         # User model definition
│   ├── services
│   │   ├── sessionService.ts  # Business logic for session management
│   │   ├── taskService.ts     # Business logic for task management
│   │   └── userService.ts     # Business logic for user management
│   ├── utils
│   │   ├── db.ts           # Database connection utilities
│   │   └── tools.ts        # Common utilities
│   └── docs
│       └── openapi.yaml     # OpenAPI documentation
├── serverless.yml           # Serverless framework configuration
├── .env.dev                 # basic template for the enviroment variables in the project
├── package.json             # npm dependencies and scripts
└── tsconfig.json            # TypeScript configuration
```


```
/client
├── public
│   └── ...                 # the build files will be stored here
├── src
│   ├── api
│   │   ├── tasks.ts        # api enpoints for task management
│   │   └── auth.ts         # api enpoints for user authentication
│   ├── components
│   │   └── TaskComponent.tsx  # Actual Task info is displayed here
│   │   ├── TaskForm.tsx       # Task for with input and button
│   │   └── TaskList.tsx            # Wrapper for all the Tasks
│   ├── hooks
│   │   ├── useAuthStore.ts    # Manage common User/Auth state
│   │   └── useTaskStore.ts    # Manage common Task state
│   ├── pages
│   │   └── DashboardPage.tsx
│   │   ├── Layout.tsx         # Wrapper for the whole site (could be improved further)
│   │   ├── LoginPage.tsx
│   │   ├── RegistrationPage.tsx
│   │   ├── TaskPage.tsx
│   │   └── LoginPage.tsx
│   ├── types
│   │   └── index.ts         # Holds the data types for the app
│   ├── utils
│   │   └── index.ts         # Common utilities
│   ├──  App.css                    # Default css styles
│   ├──  App.tsx             # Containes the router logic
│   ├──  index.css                  # Default css styles
│   ├──  main.tsx            # Entrypoint of the app
│   ├──  vite-env.d.tsx      # Project wide env for vite
│   ├──  package.json        # npm dependencies and scripts
│   └── tsconfig.json
├── .env.dev                # project template for the app
├── .gitignore
├── eslint.config.json
├── index.html
├── package.json
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.js
```
