import os
import sys
import shutil
import subprocess
  
directory = 'export'
doc = 'doc'


sourceFolders = ["data", "fonts", "lib", "script", "style"]
sourceFiles = ["composer.json", "index.html", "index.php"]

thesis = ["thesis/src", "thesis/text"]

def copy():
    if os.path.isdir(directory):
        shutil.rmtree(directory)

    if not os.path.isdir(directory):
        os.mkdir(directory)


    impl = directory+"/src/impl/"
    thes = directory+"/src/thesis"
    text = directory+"/text"

    for fol in sourceFolders:
        print("Copying folder", fol, "to", impl+fol)
        shutil.copytree(fol, impl+fol)

    for fil in sourceFiles:
        print("Copying file", fil, "to", impl+fil)
        shutil.copyfile(fil, impl+fil)
    
    if os.path.isdir(doc):
        print("Copying documentation", doc, "to", directory+"/"+doc)
        shutil.copytree(doc, directory+"/"+doc)

    if os.path.isdir(thesis[0]):
        print("Copying folder", thesis[0], "to", thes)
        shutil.copytree(thesis[0], thes)

    if os.path.isdir(thesis[1]):
        print("Copying folder", thesis[1], "to", text)
        shutil.copytree(thesis[1], text)

def documentation():
    os.system("jsdoc -r ./script/ --readme readme.md -d ./"+doc)  

def clean():
    if os.path.isdir(directory):
        shutil.rmtree(directory, ignore_errors=False, onerror=None)
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

if sys.argv[1] == "all":
    clean()
    documentation()
    copy()