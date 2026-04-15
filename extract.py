import base64
import re
import os

filepath = "/Users/alexxxey_official/.openclaw/media/inbound/ai_studio_code---2c54e1ac-9f6f-45f1-8877-e0c365db36a8"
with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

b64_chunks = re.findall(r'base64\.b64decode\(\s*\"\"\"(.*?)\"\"\"\s*\)', content, re.DOTALL)
text_chunks = re.findall(r'```html(.*?)```', content, re.DOTALL)

htmls = []
for chunk in b64_chunks:
    try:
        decoded = base64.b64decode(chunk).decode('utf-8')
        if '<!DOCTYPE html>' in decoded:
            htmls.append(decoded)
    except:
        pass

for chunk in text_chunks:
    if '<!DOCTYPE html>' in chunk:
        htmls.append(chunk.strip())

expected_files = {
    'algebraic_fractions.html',
    'quadratic_equations.html',
    'factorised_equations.html',
    'nonlinear_systems.html',
    'inequalities.html',
    'ege_task10_motion.html'
}

found_files = set()
out_dir = "/Users/alexxxey_official/Desktop/Tutor-Platform"

for i, html in enumerate(htmls):
    title_match = re.search(r'<title>(.*?)</title>', html, re.IGNORECASE)
    h1_match = re.search(r'<h1>(.*?)</h1>', html, re.IGNORECASE | re.DOTALL)
    
    title = title_match.group(1).lower() if title_match else ""
    h1 = h1_match.group(1).lower() if h1_match else ""
    
    combined = title + " " + h1
    
    if 'algebraic' in combined:
        filename = 'algebraic_fractions.html'
    elif 'quadratic' in combined:
        filename = 'quadratic_equations.html'
    elif 'factorised' in combined:
        filename = 'factorised_equations.html'
    elif 'non-linear' in combined or 'nonlinear' in combined:
        filename = 'nonlinear_systems.html'
    elif 'inequal' in combined:
        filename = 'inequalities.html'
    elif 'motion' in combined or 'движение' in combined:
        filename = 'ege_task10_motion.html'
    else:
        filename = f"unknown_lesson_{i}.html"
        
    found_files.add(filename)
    with open(os.path.join(out_dir, filename), "w", encoding="utf-8") as f:
        f.write(html)
    print(f"Written: {filename}")

for ef in expected_files:
    if ef not in found_files:
        path = os.path.join(out_dir, ef)
        if os.path.exists(path):
            os.remove(path)
            print(f"Removed: {ef}")
