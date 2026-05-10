from prompts.characters import CHARACTER_PROMPTS


def get_prompt(character: str) -> str:
    # TODO(human): handle unknown character
    return CHARACTER_PROMPTS.get(character.lower(), CHARACTER_PROMPTS["alex"])
