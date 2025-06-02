import random
import string
import json

# Define categories
levels = ["Beginner", "Intermediate", "Advanced", "Pro"]
key_areas = ["Home_row", "Top_row", "Bottom_row", "Punctuations_numbers", "Overall_keyboard"]
emphasis = ["Home_row", "Top_row", "Bottom_row", "Punctuations_numbers", "Overall_keyboard"]
types = ["Random", "RealLife"]

# Character pools for key areas
key_pools = {
    "Home_row": "asdfghjkl",
    "Top_row": "qwertyuiop",
    "Bottom_row": "zxcvbnm",
    "Punctuations_numbers": string.punctuation + string.digits,
    "Overall_keyboard": string.ascii_letters + string.punctuation + string.digits + " "
}

# RealLife sample sentences
real_life_sentences = [
    "The quick brown fox jumps over the lazy dog.",
    "Typing fast is a useful skill in modern workspaces.",
    "Numbers like 123 and symbols like @#$ appear often.",
    "Emails and reports need both speed and accuracy.",
    "Always proofread your work before submission.",
    "Shortcuts like Ctrl+C and Ctrl+V save time.",
    "Use commas, periods, and question marks correctly.",
    "Real world typing includes unexpected challenges.",
    "Quotes like 'Stay hungry, stay foolish' inspire.",
    "Consistent practice builds muscle memory."
]

# Function to generate a long text
def generate_text(area, text_type):
    if text_type == "Random":
        chars = key_pools[area]
        length = 4000  # approx for > 180s at high speeds
        return ''.join(random.choices(chars, k=length))
    else:
        return ' '.join(random.choices(real_life_sentences, k=200))

# Build the nested object
typing_tests = {}

for level in levels:
    typing_tests[level] = {}
    for area in key_areas:
        typing_tests[level][area] = {}
        for focus in emphasis:
            typing_tests[level][area][focus] = {}
            for t in types:
                typing_tests[level][area][focus][t] = generate_text(area if focus == area else "Overall_keyboard", t)

# Output a sample to check

# Save to JSON file (if needed)
with open('typing_test.json', 'w') as f:
    json.dump(typing_tests, f)


