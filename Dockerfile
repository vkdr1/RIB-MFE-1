ARG PROJECT_NAME

# Stage 1: Build shared-ui library
FROM node:20-alpine AS shared-ui-builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build:shared-ui

# Stage 2: Build the specified project
FROM node:20-alpine AS app-builder
ARG PROJECT_NAME
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
COPY --from=shared-ui-builder /app/dist/shared-ui ./dist/shared-ui
RUN npm run build:${PROJECT_NAME}

# Stage 3: Serve with Nginx
FROM nginx:alpine
ARG PROJECT_NAME
COPY --from=app-builder /app/dist/${PROJECT_NAME}/browser /usr/share/nginx/html
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

