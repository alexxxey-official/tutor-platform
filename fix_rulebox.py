import glob

files = glob.glob("/Users/alexxxey_official/Desktop/Tutor-Platform/*.html")
for f in files:
    with open(f, "r", encoding="utf-8") as file:
        content = file.read()
    
    # We replace the exact CSS rule
    if '.rule-box strong {' in content:
        content = content.replace(
            '.rule-box strong { color: #5c3300; display: block; margin-bottom: 4px; font-size: 12px; letter-spacing: 1px; text-transform: uppercase; }',
            '.rule-box > strong:first-child { color: #5c3300; display: block; margin-bottom: 4px; font-size: 12px; letter-spacing: 1px; text-transform: uppercase; }\n  .rule-box strong:not(:first-child) { display: inline; color: inherit; font-weight: 700; text-transform: none; letter-spacing: normal; font-size: inherit; margin-bottom: 0; }'
        )
        content = content.replace(
            '.rule-box strong {',
            '.rule-box > strong:first-child {'
        )
        
        with open(f, "w", encoding="utf-8") as file:
            file.write(content)
        print(f"Fixed {f}")
