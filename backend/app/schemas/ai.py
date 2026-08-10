from typing import Any, Dict, List, Optional

from pydantic import BaseModel


class AIChatRequest(BaseModel):
    profile: Dict[str, Any]

    safety_concerns: List[str] = []
    comfort_preferences: List[str] = []
    conversation_history: List[Dict[str, str]] = []

    current_question: str = ""
    current_answer: str = ""