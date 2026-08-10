import os

from groq import Groq


client = Groq(
    api_key=os.getenv("GROQ_API_KEY")
)


def generate_groq_response(
    prompt: str,
) -> str:

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {
                "role": "user",
                "content": prompt
            }
        ],
        temperature=0.7,
        max_tokens=120
    )

    return response.choices[0].message.content.strip()