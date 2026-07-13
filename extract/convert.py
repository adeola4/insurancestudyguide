import json, os

BASE = "/tmp/insurancestudyguide-push/extract"

with open(f"{BASE}/tests_com.json") as f:
    tests = json.load(f)
with open(f"{BASE}/proprofs_ca.json") as f:
    pro = json.load(f)

# tests.com -> National (general L&H), fully answered
out = []
for i, q in enumerate(tests):
    # topic heuristic from explanation keywords
    topic = "General Life & Health"
    txt = (q["q"] + " " + q["explanation"]).lower()
    if "underwrit" in txt: topic = "Underwriting"
    elif "term life" in txt or "whole life" in txt or "universal" in txt or "variable life" in txt: topic = "Life Policy Types"
    elif "grace" in txt or "incontest" in txt or "reinstate" in txt or "policy" in txt: topic = "Policy Provisions"
    elif "annuit" in txt: topic = "Annuities"
    elif "disabilit" in txt: topic = "Disability"
    elif "health" in txt or "hmo" in txt or "ppo" in txt: topic = "Health Insurance"
    elif "good faith" in txt or "insurable interest" in txt: topic = "Contract Principles"
    elif "benefic" in txt or "owner" in txt or "party" in txt: topic = "Parties to Contract"
    out.append({
        "id": f"src-testscom-{i+1}",
        "state": "National",
        "license_type": "Life & Health",
        "topic": topic,
        "difficulty": "medium",
        "question": q["q"].strip(),
        "choices": q["choices"],
        "correct_index": q["correct_index"],
        "explanation": q["explanation"].strip(),
        "source": "tests.com Life & Health Practice Exam (retrieved 2026-07-12)"
    })

# proprofs CA -> California, needs answer key (correct_index = -1 means pending)
for i, q in enumerate(pro):
    out.append({
        "id": f"src-proprofs-ca-{i+1}",
        "state": "California",
        "license_type": "Life & Health",
        "topic": "California State Specific",
        "difficulty": "medium",
        "question": q["q"].strip(),
        "choices": q["choices"],
        "correct_index": q["correct_index"],  # -1 = pending answer key
        "explanation": q["explanation"].strip(),
        "source": "ProProfs California Life & Health Practice Exam (retrieved 2026-07-12)"
    })

os.makedirs("/tmp/insurancestudyguide-push/src/db/sourced", exist_ok=True)
with open("/tmp/insurancestudyguide-push/src/db/sourced/bank.json", "w") as f:
    json.dump(out, f, indent=2)

answered = [o for o in out if o["correct_index"] >= 0]
pending = [o for o in out if o["correct_index"] < 0]
print(f"TOTAL: {len(out)} | answered: {len(answered)} | pending answer key: {len(pending)}")
print("Answered by source:", {s: sum(1 for o in answered if o['source'].startswith(s)) for s in ['tests.com','ProProfs']})
