import os
import sys
import shutil
import subprocess
  
directory = 'export'
doc = 'doc'


sourceFolders = ["data", "fonts", "lib", "script", "style"]
sourceFiles = ["composer.json", "index.html", "index.php"]

def copy():
    if os.path.isdir(directory):
        shutil.rmtree(directory)

    if not os.path.isdir(directory):
        os.mkdir(directory)


    src = directory+"/src/"

    for fol in sourceFolders:
        print("Copying folder", fol, "to", src+fol)
        shutil.copytree(fol, src+fol)

    for fol in sourceFiles:
        print("Copying file", fol, "to", src+fol)
        shutil.copyfile(fol, src+fol)
    
    if os.path.isdir(doc):
        print("Copying documentation", doc, "to", directory+"/"+doc)
        shutil.copytree(doc, directory+"/"+doc)

def documentation():
    os.system("jsdoc -r ./script/ -d ./"+doc)  

def clean():
    if os.path.isdir(directory):
        shutil.rmtree(directory)
    if os.path.isdir(doc):
        shutil.rmtree(doc)


if len(sys.argv[1:]) == 0:
    exit(1) 

if sys.argv[1] == "clean":
    clean()

if sys.argv[1] == "create":
    copy()

if sys.argv[1] == "doc":
    documentation()