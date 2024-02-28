import os
import shutil
import re

from zip_utils import zip_and_delete
from image_utils import resize_and_copy
from constants import model_path

# zip files
sum = 0
zip_sum = 0
counter = 0
json_files = []

for (dirpath, dirnames, filenames) in os.walk(model_path):
    if len(filenames) == 1:
        filename = filenames[0]
        path = os.path.join(dirpath, filename)
        # print(path)

        if filename.endswith(".json"):
            size = os.stat(path).st_size
            if size > 100000:
                json_files.append(path)


for path in json_files:
    size = os.stat(path).st_size
    print("json:", counter, path, size)
    counter += 1
    zip_size = zip_and_delete(path)
    sum += size
    zip_sum += zip_size

print("json", sum, zip_sum)



# json
with open(model_path + '\\config.json', 'r', encoding='utf-8') as f:
    txt = f.read()

txt_pc = txt
for path in json_files:
    x = path[len(model_path) + 1:].replace("\\", "/")
    y = x + ".bin"
    txt_pc = txt_pc.replace(x, y)

## create pc.json, mediumfiles.json
with open(model_path + '\\pc.json', 'w', encoding='utf-8') as f:
    f.write(txt_pc)


## remove needless files
try:
    os.remove(model_path + '\\__start__.js')
    os.remove(model_path + '\\logo.png')
    os.remove(model_path + '\\playcanvas-stable.min.js')
    os.remove(model_path + '\\index.html')
    os.remove(model_path + '\\config.json')
except:
    pass

## settings js
with open(model_path + '\\__settings__.js', 'r', encoding='utf-8') as f:
    txt = f.read()
x = txt.replace('config.json', 'pc.json.bin')
with open(model_path + '\\__settings__.js', 'w', encoding='utf-8') as f:
    f.write(x)

# shutil.copyfile('python\\app.js', 'public\\mine\\app.js')
# shutil.copyfile('python\\pc.html', 'public\\mine\\pc.html')
# shutil.copyfile('python\\mobile.html', 'public\\mine\\mobile.html')

# files/assets/45412903/1/body.json