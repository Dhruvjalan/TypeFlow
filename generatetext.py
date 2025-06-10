import random
import json

# Define the options from your HTML
levels = ["Beginner", "Intermediate", "Advanced", "Pro"]
keys_options = [
    "Overall_keyboard", "Home_row", "Top_row", "Bottom_row", "Punctuations_numbers"
]
emphasis_options = [
    "Overall_keyboard", "Home_row", "Top_row", "Bottom_row", "Punctuations_numbers"
]
randreal_options = ["RealLife", "Random"]

# Keyboard layouts for each key option
keyboard_rows = {
    "Top_row": list("qwertyuiop"),
    "Home_row": list("asdfghjkl"),
    "Bottom_row": list("zxcvbnm"),
    "Punctuations_numbers": list("1234567890!@#$%^&*()_+-=[]{};:'\",.<>/?\\|"),
    "Overall_keyboard": list("qwertyuiopasdfghjklzxcvbnm1234567890!@#$%^&*()_+-=[]{};:'\",.<>/?\\|")
}

# Lengths for each level
level_lengths = {
    "Beginner": 3,
    "Intermediate": 5,
    "Advanced": 6,
    "Pro": 7
}

# RealLife sentences pool (add more as needed)
reallife_sentences = [
    "The quick brown fox jumps over the lazy dog.",
    "Always proofread your work before submission.",
    "Consistent practice builds muscle memory.",
    "Shortcuts like Ctrl+C and Ctrl+V save time.",
    "Use commas, periods, and question marks correctly.",
    "Numbers like 123 and symbols like @#$ appear often.",
    "Emails and reports need both speed and accuracy.",
    "Quotes like 'Stay hungry, stay foolish' inspire.",
    "Typing fast is a useful skill in modern workspaces.",
    "Real world typing includes unexpected challenges."
]

# Function to generate random string with spaces
def random_string(chars, space, total_len=300):
    s = ""
    for n in range(total_len):
        if n % space == 0 and n != 0:
            s += " "
        else:
            s += random.choice(chars).upper() if random.random() > 0.5 else random.choice(chars)
    return s

# Function to generate a readable string (mixing sentences and a few random chars)
def reallife_string(sentences, chars, total_len=300):
    out = []
    while len(" ".join(out)) < total_len:
        # Pick a sentence and randomly replace a few letters with chars from the row
        sent = random.choice(sentences)
        sent_list = list(sent)
        for _ in range(random.randint(1, 3)):
            idx = random.randint(0, len(sent_list) - 1)
            sent_list[idx] = random.choice(chars)
        out.append("".join(sent_list))
    return " ".join(out)[:total_len]

# Build the nested dictionary
typing_text = {}
for level in levels:
    typing_text[level] = {}
    for keys in keys_options:
        typing_text[level][keys] = {}
        for emphasis in emphasis_options:
            typing_text[level][keys][emphasis] = {}
            for randreal in randreal_options:
                if randreal == "Random":
                    val = random_string(keyboard_rows[keys], level_lengths[level])
                else:
                    val = reallife_string(reallife_sentences, keyboard_rows[keys])
                typing_text[level][keys][emphasis][randreal] = val

# Save to JSON
with open("typing_text.json", "w", encoding="utf-8") as f:
    json.dump(typing_text, f, indent=2, ensure_ascii=False)
