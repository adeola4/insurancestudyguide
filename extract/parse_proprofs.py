import re, json, os

path = "/home/ubuntu/.hermes/cache/web/www.proprofs.com-decbfd664e.md"
with open(path) as f:
    content = f.read()
lines = content.split("\n")

questions = []
cur = None
choices = []
expl = []
state = "idle"  # idle | q | choices | expl

for raw in lines:
    line = raw.strip()
    m = re.match(r"^##\s*(\d+)\.\s*(.*)$", line)
    if m:
        # flush previous
        if cur and len(choices) >= 2:
            questions.append({"q": cur, "choices": choices, "correct_index": -1, "explanation": " ".join(expl).strip()})
        cur = m.group(2).strip()
        choices = []; expl = []; state = "choices"
        continue
    if state == "choices":
        if line.startswith("Explanation"):
            rest = line.split("Explanation", 1)[1].strip(": ").strip()
            if rest: expl.append(rest)
            state = "expl"
            continue
        if line == "" or line.startswith("Submit") or line.startswith("Start Quiz") or line.startswith("Advertisement"):
            continue
        choices.append(line)
        continue
    if state == "expl":
        if line.startswith("##") or line.startswith("Submit") or line.startswith("Start Quiz") or line.startswith("Advertisement") or line == "":
            state = "idle"
            continue
        expl.append(line)
        continue

if cur and len(choices) >= 2:
    questions.append({"q": cur, "choices": choices, "correct_index": -1, "explanation": " ".join(expl).strip()})

print(f"PROPROFS: {len(questions)} questions")
for q in questions[:3]:
    print("Q:", q["q"][:65], "| n:", len(q["choices"]), "| ex_len:", len(q["explanation"]))
os.makedirs("/tmp/insurancestudyguide-push/extract", exist_ok=True)
with open("/tmp/insurancestudyguide-push/extract/proprofs_ca.json", "w") as f:
    json.dump(questions, f)
print("Saved", len(questions))
