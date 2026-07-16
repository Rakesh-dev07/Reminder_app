# AI Reminder Assistant (v2.1.0)

## Overview

The AI Reminder Assistant enables users to create reminders using natural language.

The AI **does not create reminders directly**.

Instead, it extracts structured reminder information from the user's input, validates it, and returns JSON to the frontend.

The frontend automatically fills the manual reminder form, allowing the user to review and edit everything before saving.

This architecture ensures:

- Better user experience
- Safe reminder creation
- Human verification
- Reliable reminder data
- Separation of responsibilities

---

# Architecture

```
User

↓

AI Quick Add

↓

Backend API

↓

LLM (Gemini/OpenAI)

↓

Structured JSON

↓

Validation

↓

Normalization

↓

Mapping

↓

Frontend Preview

↓

Manual Reminder Form

↓

User Reviews

↓

Save Reminder
```

---

# AI Responsibilities

The AI should:

- Understand natural language
- Extract reminder details
- Detect recurrence
- Return structured JSON
- Detect missing information
- Return confidence score

The AI should NEVER:

- Save reminders
- Guess missing values
- Return markdown
- Return explanations
- Return extra fields

---

# Supported Reminder Types

## One-Time

Examples:

- Tomorrow at 7 PM call mom
- Doctor appointment next Friday
- Pay electricity bill on July 20

---

## Daily

Examples:

- Drink water every day
- Take medicine every 2 days

---

## Weekly

Examples:

- Gym every Monday
- Study every Tuesday and Thursday
- Workout every Monday Wednesday Friday

---

## Monthly

Examples:

- Pay rent every month
- Insurance payment every 2 months

---

## Yearly

Examples:

- Birthday every year
- Renew passport every 5 years

---

# Unsupported (v2.1)

The AI will reject:

- Location reminders
- Weather reminders
- Email reminders
- Voice reminders
- Image reminders
- Calendar synchronization
- Conditional reminders

---

# Output Contract

The AI always returns structured JSON.

See:

- schema.js

---

# Prompt Components

The prompt is generated from:

- supportedFormats.js
- schema.js
- examples.js
- prompt.js

---

# Backend Pipeline

```
User Input

↓

Prompt Builder

↓

LLM

↓

JSON

↓

Validator

↓

Normalizer

↓

Mapper

↓

Frontend
```

---

# Folder Structure

```
ai/

README.md

supportedFormats.js

schema.js

examples.js

prompt.js
```

---

# Future Roadmap

## v2.2

- Dynamic example selection
- Better category detection
- Smart date parsing
- AI suggestions

## v3.0

- Voice reminders
- OCR reminders
- Calendar import
- Smart scheduling
- AI productivity assistant