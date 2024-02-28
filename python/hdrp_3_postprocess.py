
import os
import git
from constants import model_path, out_names

# remove jsons
os.remove(os.path.join(model_path, 'pc.json'))
os.remove(os.path.join(model_path, 'mobile.json'))

# revert files
repo = git.Repo('.')
names = ['pc.js', '__loading__.js'] + [ f'pc_{x}.html' for x in out_names ] + [ f'mobile_{x}.html' for x in out_names ]

names = [os.path.join(model_path, x) for x in names]
print(f'checkout {len(names)} files')

repo.index.checkout(names, force=True)
