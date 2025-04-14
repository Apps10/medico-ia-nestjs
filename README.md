# 🩺 Doctor AI NEST API

Este proyecto es una API REST construida con **NestJS** y arquitectura **Hexagonal** que permite la **creación y consulta de pacientes**, así como la **generación de diagnósticos médicos automáticos** utilizando **modelos de lenguaje como OpenAI (GPT-4)** o **Gemini (Google AI)**.

## 🧠 Objetivo

Brindar una solución escalable y extensible para almacenar información de pacientes y utilizar inteligencia artificial para sugerir diagnósticos médicos basados en síntomas proporcionados.

## 📁 Estructura del Proyecto (Hexagonal)

```
src/
├── app/
│   ├── patient/
│   │   ├── domain/             # Interfaces y entidades del dominio
│   │   ├── application/        # Casos de uso (servicios de aplicación)
│   │   ├── infrastructure/     # Adaptadores de base de datos
│   │   └── presentation/       # Adaptadores HTTP (controllers, dtos)
│   └── ai/
│       ├── domain/             # DoctorIa Service y excepciones
│       ├── application/        # Lógica para generar diagnóstico
│       └── infrastructure/     # Adaptadores IA (OpenAI, Gemini, deepseek, Mock)
```

## 🚀 Instalación

```bash
npm install
```

### Entorno

Crea un archivo `.env`:

```env
PORT=3000

# IA Keys
OPENAI_API_KEY=tu_clave_openai
GEMINI_API_KEY=tu_clave_gemini
```

## ▶️ Ejecución

```bash
npm run start:dev
```

Accede a la documentación Swagger en:

```
http://localhost:3000/docs
```


## 🐳 Ejecución con docker

```bash
docker compose up -d
```

Accede a la documentación Swagger en:

```
http://localhost:3000/docs
```

## 📌 Endpoints disponibles

### 1. Crear paciente

**POST** `/patient`

**Body**:

```json
{
  "name": "Pedro",
  "lastname": "Pica Piedra",
  "birthdate": "1996-01-15",
  "medicalHistory": ["mareo", "dolor de cabeza"]
}
```

**Respuesta**:

```json
{
  "id": 1,
  "name": "pepito",
  "lastname": "perez",
  "birthdate": "2000-01-15",
  "medicalHistory": ["mareo", "dolor de cabeza"]
}
```

### 2. Obtener paciente por ID

**GET** `/patient/:id`

**parametro**: 1

**Respuesta**:

```json
{
  "id": 1,
  "name": "pepito",
  "lastname": "perez",
  "birthdate": "2000-01-15",
  "medicalHistory": ["mareo", "dolor de cabeza"]
}
```


### 3. Generar diagnóstico AI

**POST** `/patient/:id/diagnostico-ai`

**Response**:

```json
{
  "diagnostic": "Podría tratarse de migraña tensional. Se recomienda descanso, buena hidratación y control del estrés."
}
```

## 🛠️ Funcionalidades destacadas

- Validación con `class-validator`
- Documentación con Swagger
- Integración con múltiples proveedores IA (OpenAI, Gemini, DeepSeek)
- Fallback automático si falla una IA
- Errores Http Personalizados
- Errores traducidos al español
- Arquitectura limpia (Hexagonal)

## 📦 Dependencias principales

- `@nestjs/swagger`
- `class-validator`
- `class-transformer`
- `openai`
- `Joi`
- `prisma`

## 🧪 Pruebas

> En desarrollo. Se recomienda usar `Postman` o `Swagger UI` para validar funcionalidad.


## 🧠 Ejemplo de integración IA con fallback

La clase `GetDiagnosticIAByMedicalHistoryUseCase` implementa  `DoctorIAService` y prueba primero OpenAI. Si lanza error, intenta con Gemini automáticamente. si tambien falla intenta con el mock de IA.