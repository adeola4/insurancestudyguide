import re, json, os

path = "/home/ubuntu/.hermes/cache/web/www.tests.com-e953ec8488.md"
with open(path) as f:
    content = f.read()

lines = content.split("\n")
questions = []
current = None
correct_letter = None
choices = []
explanation_lines = []
in_explanation = False

def flush():
    global current, correct_letter, choices, explanation_lines, in_explanation
    if current and choices:
        ci = "abcd".index(correct_letter) if correct_letter in "abcd" else -1
        questions.append({
            "q": current,
            "choices": choices,
            "correct_index": ci,
            "explanation": " ".join(explanation_lines).strip()
        })
    current = None; correct_letter = None; choices = []; explanation_lines = []; in_explanation = False

i = 0
n = len(lines)
while i < n:
    line = lines[i].strip()
    if re.fullmatch(r"\d{1,3}", line):
        j = i + 1
        while j < n and not lines[j].strip():
            j += 1
        if j < n:
            flush()
            current = lines[j].strip()
            i = j + 1
            continue
    if "![check]" in line:
        k = i + 1
        while k < n:
            m = re.match(r"^([a-e])\.\s*(.*)", lines[k].strip())
            if m:
                correct_letter = m.group(1); choices.append(m.group(2).strip()); i = k + 1; break
            k += 1
        if k >= n: i += 1
        continue
    if "![wrong]" in line:
        k = i + 1
        while k < n:
            m = re.match(r"^([a-e])\.\s*(.*)", lines[k].strip())
            if m:
                choices.append(m.group(2).strip()); i = k + 1; break
            k += 1
        if k >= n: i += 1
        continue
    if current and choices and not in_explanation:
        if line.startswith("Incorrect") or line.startswith("Study Online") or line.startswith("Click to Save") or line.startswith("Copy link") or line.startswith("[!["):
            i += 1; continue
        if line and not re.fullmatch(r"[a-e]\.", line) and "tests.com" not in line:
            in_explanation = True; explanation_lines.append(line); i += 1; continue
    if in_explanation:
        if line.startswith("Study Online") or line.startswith("Click to Save") or line.startswith("Copy link") or line.startswith("[![") or line == "":
            in_explanation = False; i += 1; continue
        explanation_lines.append(line); i += 1; continue
    i += 1

flush()
ok = [q for q in questions if q["correct_index"] >= 0 and len(q["choices"]) >= 2]
print(f"EXTRACTED: {len(questions)} | VALID: {len(ok)}")
os.makedirs("/tmp/insurancestudyguide-push/extract", exist_ok=True)
with open("/tmp/insurancestudyguide-push/extract/tests_com.json", "w") as f:
    json.dump(ok, f)
print("Saved", len(ok))
for q in ok[:2]:
    print("Q:", q["q"][:70], "| correct:", q["correct_index"], "| nchoices:", len(q["choices"]))
