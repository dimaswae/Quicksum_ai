import requests
from app.core.config import API_KEY, BASE_URL

def summarize_text(text: str) -> str:
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json",
    }

    data = {
        "model": "z-ai/glm-4.5-air:free",
        "messages": [
            {
                "role": "user",
                "content": f"Summarize the following text very concisely, no need for long words or opening words, absolute summary, using the same language as the text input and adjusting the language according to the input so that the output is consistent:\n{text}"
            }
        ]
    }

    response = requests.post(BASE_URL, headers=headers, json=data, timeout=60)

    if response.status_code != 200:
        raise Exception(response.text)

    result = response.json()
    return result["choices"][0]["message"]["content"]
