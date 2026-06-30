import requests
from app.core.config import API_KEY, BASE_URL


def summarize_text(text: str, length: str) -> str:
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json",
    }

    length_instruction = {
        "pendek": "very short and concise",
        "sedang": "medium length and balanced",
        "panjang": "detailed and fairly comprehensive",
    }.get((length or "").strip().lower(), "medium length and balanced")

    prompt = (
        f"Summarize the following text in {length_instruction}. "
        "Use the same language as the text input, keep the summary faithful to the source, "
        "and avoid opening phrases or unnecessary words."
    )

    data = {
        "model": "z-ai/glm-4.5-air:free",
        "messages": [
            {
                "role": "user",
                "content": f"{prompt}\n\n{text}"
            }
        ]
    }

    response = requests.post(BASE_URL, headers=headers, json=data, timeout=60)

    if response.status_code != 200:
        raise Exception(response.text)

    result = response.json()
    return result["choices"][0]["message"]["content"]
