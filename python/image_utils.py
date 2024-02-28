import cv2
import os
from constants import model_path

def resize_and_copy_internal(cv2_img, medium_path, width, height):
    
    resized = cv2.resize(cv2_img, (width, height), interpolation = cv2.INTER_AREA)
    dir_name = os.path.dirname(medium_path)
    try:
        os.makedirs(dir_name)
        cv2.imwrite(medium_path, resized)
    except:
        pass
    return os.stat(medium_path).st_size

def resize_and_copy(path):
    if not path.startswith(model_path + "\\files"):
        return 0, 0
    img = cv2.imread(path, cv2.IMREAD_UNCHANGED)
    w = img.shape[1]
    h = img.shape[0]
    medium_path = model_path + "\\mediumfiles" + path[len(model_path + "\\files"):]
    low_path = model_path + "\\lowfiles" + path[len(model_path + "\\files"):]
    medium_size = resize_and_copy_internal(img, medium_path, w // 2, h // 2)
    low_size = resize_and_copy_internal(img, low_path, w // 4, h // 4)

    return medium_size, low_size
    

path = "public\\mine\\files\\assets\\45032131\\1\\AO.jpg"