# Travel Intelligence Project Rules

## Tech Stack

Backend
- FastAPI
- SQLAlchemy 2.x
- PostgreSQL
- Pydantic v2
- Alembic

Frontend
- React
- TypeScript
- Vite

## Coding Style

- Use type hints everywhere.
- Use SQLAlchemy 2.x syntax.
- Never use deprecated APIs.
- Use dependency injection.
- Use async FastAPI routes where appropriate.
- Keep functions under 40 lines when possible.
- Add docstrings to public functions.
- Use repository pattern.
- Keep business logic out of routes.

## Folder Structure

app/
    api/
    core/
    db/
    models/
    repositories/
    schemas/
    services/
    utils/

## Database

Use PostgreSQL only.

Never use SQLite.

## Responses

Always use Pydantic schemas.

Never return ORM objects directly.

## Security

Passwords must be hashed using bcrypt.

Never store plain passwords.

JWT authentication only.

## Output Rules

Generate only the requested file.

Do not modify unrelated files.

Return complete code.

No placeholders.

No TODO comments.

Code must run without syntax errors.