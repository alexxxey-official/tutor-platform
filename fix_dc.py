import re

with open("/Users/alexxxey_official/Desktop/Tutor-Platform/physics_dc.html", "r", encoding="utf-8") as f:
    text = f.read()

# Don't break the script block
parts = text.split('</script>', 2)
if len(parts) >= 2:
    body = parts[-1]
    
    body = body.replace(r'\\[', r'\[')
    body = body.replace(r'\\]', r'\]')
    body = body.replace(r'\\(', r'\(')
    body = body.replace(r'\\)', r'\)')
    
    parts[-1] = body
    text = '</script>'.join(parts)

with open("/Users/alexxxey_official/Desktop/Tutor-Platform/physics_dc.html", "w", encoding="utf-8") as f:
    f.write(text)
