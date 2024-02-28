
import os
from constants import model_path

files = os.listdir(model_path)

def process(filename, ext):
    length = len(ext)
    min_filename = filename[:-length] + '.min' + ext
    if filename.endswith(ext) and min_filename in files:
        print(min_filename)
        full_path = os.path.join(model_path, filename)
        os.remove(full_path)
        min_full_path = os.path.join(model_path, min_filename)
        os.rename(min_full_path, full_path)

for filename in files:
    process(filename, '.js')
    process(filename, '.css')
    





