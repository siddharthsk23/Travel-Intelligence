from fastapi import APIRouter

from app.ai.ai_service import generate_ai_response
from app.schemas.ai import AIChatRequest

router = APIRouter(
    prefix="/ai",
    tags=["AI"]
)


@router.post("/chat")
def ai_chat(request: AIChatRequest):

    message = generate_ai_response(
        profile=request.profile,
        safety_concerns=request.safety_concerns,
        comfort_preferences=request.comfort_preferences,
        conversation_history=request.conversation_history,
        current_question=request.current_question,
        current_answer=request.current_answer,
    )

    return {
        "success": True,
        "message": message
    }