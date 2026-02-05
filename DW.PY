def encrypt(text, s):
    result = ""
    for char in text:
        if char.isupper():
            result += chr((ord(char) + s - 65) % 26 + 65)
        elif char.islower():
            result += chr((ord(char) + s - 97) % 26 + 97)
        else:
            result += char  # Non-alphabetic characters are added unchanged
    return result

text = "chandini"
s = 4
print("Plain text: " + text)
print("Shift value: " + str(s))
print("Encrypted text: " + encrypt(text, s))
