import os
import sys
import shutil
  
directory = 'export'

sourceFolders = ["data", "fonts", "lib", "script", "style"]
sourceFiles = ["composer.json", "index.html", "index.php"]

def copy():
    os.mkdir(directory)

    src = directory+"/src/"

    for fol in sourceFolders:
        shutil.copytree(fol, src+fol, symlinks=False, ignore=None, copy_function=copy2, ignore_dangling_symlinks=False, dirs_exist_ok=False)


print(f"Name of the script      : {sys.argv[0]}")
print(f"Arguments of the script : {sys.argv[1:]}")

if len(sys.argv[1:]) == 0:
    exit(1) 

if sys.argv[1] == "clean" and os.path.isdir(directory):
    shutil.rmtree(directory)

if sys.argv[1] == "create":
    if not os.path.isdir(directory):
        copy()
    else:
        shutil.rmtree(directory)
        copy()
