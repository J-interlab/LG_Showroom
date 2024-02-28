import re
import json
import os 
import shutil
import utils
import zip_utils
from constants import model_path, scene_names, out_names, texture_indices

# asset_scenes_json = 45032171

# settings.js
SCRIPTS = [ 75165835, 75165974, 75202323, 86577405, 86577571, 91786010 ]

assets = []
def visit(obj):
    if isinstance(obj, dict):
        for key in obj:
            visit(obj[key])
    elif isinstance(obj, list):
        for child in obj:
            visit(child)
    elif isinstance(obj, int):
        if 10000000 <= obj <= 999999999:
            if not obj in assets:
                assets.append(obj)
                visit(pc_obj['assets'][str(obj)])
    elif isinstance(obj, str):
        # print('str', child)
        pass

total_assets = []

for item_index in range(0, len(scene_names)):
    # if scene_names[item_index] != 'OLED_77C2':
    #     continue
    txt = utils.get_file_contents(model_path + '\\pc.json')
    pc_obj = json.loads(txt)
    
    assets = [] + SCRIPTS
    scenes = []
    for obj in pc_obj['scenes']:
        if obj['name'] == scene_names[item_index]:
            scenes.append(int(obj['url'][:7]))
    print()
    print(out_names[item_index])
    print('scenes:', scenes)


    for scene in scenes:
        with open(f'{model_path}\\{scene}.json', 'r', encoding='utf-8') as f:
            txt = f.read()
        founds = re.findall("\d{8,9}", txt)

        for asset in founds:
            asset = int(asset)
            if not asset in assets:
                assets.append(asset)

    for asset in assets:
        try:
            visit(pc_obj['assets'][str(asset)])
        except:
            pass
    
    # add high and medium assets
    for asset in assets:
        try:
            index = texture_indices.index(int(asset))
            if index % 3 == 2:
                print(str(texture_indices[index - 2]), str(texture_indices[index - 1]), asset)
                assets.append(texture_indices[index - 2])
                assets.append(texture_indices[index - 1])
        except:
            pass
            
    print('assets found:', len(assets))

    # total assets
    for asset in assets:
        if not asset in total_assets:
            total_assets.append(asset)

    # print('total assets:', len(pc_obj['assets']))
    keys = list(pc_obj['assets'].keys())
    for asset in keys:
        if not int(asset) in assets:
            pc_obj['assets'].pop(asset)

    print(len(pc_obj['assets']), 'assets remained')

    # print texture information
    # for obj_key in pc_obj['assets']:
    #     obj = pc_obj['assets'][obj_key]
    #     type = obj['type']
    #     if type == 'texture':
    #         print(obj['id'], obj['name'], sep='\t')
    

    with open(f'{model_path}\\pc_{out_names[item_index]}.json', 'w', encoding='utf-8') as f:
        json.dump(pc_obj, f)
   

    zip_utils.zip_and_delete(f'{model_path}\\pc_{out_names[item_index]}.json')

    

# print(len(total_assets), total_assets)







