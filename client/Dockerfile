# Usar la imagen de Node.js como base
FROM node:16-alpine as build

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar el package.json y el package-lock.json
COPY package*.json ./

# Instalar las dependencias del proyecto
RUN npm install

# Copiar el resto del código de la aplicación
COPY . .

# Construir la aplicación para producción
RUN npm run build

# Usar una imagen de servidor web para servir el frontend
FROM nginx:alpine

# Copiar los archivos construidos desde la fase de build
COPY --from=build /app/build /usr/share/nginx/html

# Copiar el archivo de configuración de nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Exponer el puerto 80
EXPOSE 80

# Iniciar nginx
CMD ["nginx", "-g", "daemon off;"]
