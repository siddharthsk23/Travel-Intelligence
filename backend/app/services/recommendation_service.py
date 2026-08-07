from typing import List

DESTINATIONS = {
    "beach": [
        "Goa",
        "Gokarna",
        "Pondicherry",
        "Andaman"
    ],
    "mountains": [
        "Manali",
        "Leh",
        "Munnar",
        "Coorg"
    ],
    "history": [
        "Hampi",
        "Mysore",
        "Jaipur",
        "Delhi"
    ],
    "wildlife": [
        "Bandipur",
        "Kabini",
        "Jim Corbett",
        "Kaziranga"
    ],
    "adventure": [
        "Rishikesh",
        "Spiti",
        "Bir Billing",
        "Leh"
    ]
}


def recommend_places(interests: List[str]):
    recommendations = []

    for interest in interests:
        key = interest.lower()

        if key in DESTINATIONS:
            recommendations.extend(DESTINATIONS[key])

    return list(dict.fromkeys(recommendations))