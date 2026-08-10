from typing import Any, Dict, List

from app.ai.prompts import SYSTEM_PROMPT
from app.ai.providers.groq_provider import generate_groq_response


def build_ai_context(
    profile: Dict[str, Any],
    safety_concerns: List[str],
    comfort_preferences: List[str],
    conversation_history: List[Dict[str, str]],
    current_question: str,
    current_answer: str,
) -> Dict[str, Any]:

    return {
        "system_prompt": SYSTEM_PROMPT,
        "profile": profile,
        "safety_concerns": safety_concerns,
        "comfort_preferences": comfort_preferences,
        "conversation_history": conversation_history,
        "current_question": current_question,
        "current_answer": current_answer,
    }


def generate_ai_response(
    profile: Dict[str, Any],
    safety_concerns: List[str],
    comfort_preferences: List[str],
    conversation_history: List[Dict[str, str]],
    current_question: str,
    current_answer: str,
) -> str:

    context = build_ai_context(
        profile=profile,
        safety_concerns=safety_concerns,
        comfort_preferences=comfort_preferences,
        conversation_history=conversation_history,
        current_question=current_question,
        current_answer=current_answer,
    )

    prompt = f"""
{context["system_prompt"]}

USER TRAVEL PROFILE:
{context["profile"]}

SAFETY CONCERNS:
{context["safety_concerns"]}

COMFORT PREFERENCES:
{context["comfort_preferences"]}

CONVERSATION HISTORY:
{context["conversation_history"]}

CURRENT QUESTION:
{context["current_question"]}

USER'S LATEST ANSWER:
{context["current_answer"]}

Respond naturally to the user's latest answer.

IMPORTANT:
- Keep the response to 1-3 short sentences.
- Maximum approximately 45 words.
- Acknowledge the user's answer.
- Add only one useful observation.
- Do not write an essay.
- Do not use headings or bullet points.
- Do not repeat information already known.
- Do not ask multiple questions.
- Do not invent allergies, phobias, preferences or personal information.
- If the user mentions an allergy, acknowledge it and remember it.
- If the user mentions a phobia or discomfort, acknowledge it and suggest safe alternatives.
- Do not recommend another destination when the user has explicitly chosen a destination.
"""

    return generate_groq_response(prompt)