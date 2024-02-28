import os
import re
import shutil
import datetime
import zipfile
from constants import model_path
# constants
downloads = 'C:\\Users\\SKYDEV\\Downloads'
pattern = 'Product-viewer( \(\d+\))?\.zip'
destination = os.path.relpath(os.path.join(model_path, os.pardir))

# find the most recent build
files = os.listdir(downloads)
max_time = -1
for filename in files:
    if re.match(pattern, filename) is not None:
        full_path = os.path.join(downloads, filename)
        status = os.stat(full_path)
        if status.st_ctime > max_time:
            max_time = status.st_ctime
            filename_found = filename
if max_time < 0:
    print('build not found, end script')
    exit(0)

print('The most recent build is', filename_found)

# copy to the destination
src = os.path.join(downloads, filename_found)

products_dir = os.path.join(destination, 'products')
if os.path.isdir(products_dir):
    print('products folder found')
    temp = str(round(datetime.datetime.now().timestamp()))
    temp_dir = os.path.join('temp', temp)
    shutil.move(products_dir, temp_dir)
    print('products folder renamed as temp')

## extract zip file
with zipfile.ZipFile(src, 'r') as zip_ref:
    zip_ref.extractall(products_dir)

print('build extracted')
path = os.path.join(destination, filename_found)