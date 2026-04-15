import os
import glob

files = glob.glob("/Users/alexxxey_official/Desktop/Tutor-Platform/*.html")
for f in files:
    if "index.html" in f:
        continue
    with open(f, "r", encoding="utf-8") as file:
        content = file.read()
        
    if '\\"' in content or '\\\\' in content:
        # It's an escaped string. Let's fix it.
        # Actually, if it contains literal \n like \\n, we might need to do bytes.decode('unicode_escape')
        # Let's check if there are literal '\n'
        pass

