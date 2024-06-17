# Usar la imagen de Node.js como base
FROM node:16-alpine

# Establecer el directorio de trabajo en el contenedor
WORKDIR /app

# Copiar el package.json y el package-lock.json
COPY package*.json ./

# Instalar las dependencias del proyecto
RUN npm install

# Copiar el resto del código de la aplicación
COPY . .

# Exponer el puerto en el que la aplicación se ejecuta
EXPOSE 5000

# Iniciar la aplicación
CMD ["npm", "start"]
