# Google Image Downloader

# Download Images
A Node.js command line app for downloading full sized images from Google Image Search for usage in Machine Learning Object Detection

the getimages script is used like this on the command line:

**> node getimages telsa model 3**

This script will piece together the text after the getimages string and use the text in a google image search like this "tesla+model+3".  Its will then scrape the google image response page for the full sized images that are linked to and download just the full sized images.  A folder is created based on the search term ("teslamodel3" in this case) and the downloaded images are placed in the folder. 


# Move
the moveimages script is used like this on the command line:

**> node moveimages telsamodel3**

This script will move the contents of a particular folder into the "done" folder. I wanted to visually check the contents of the files pulled down from the getimages script before moving them to a common folder (so that the garbage could be cleaned uout if needed).

# Resize
**> python resizer.py **

There is also a Python script in this folder that I am using to resize and crop each of the images in the folder where it is run.  Each image will be resized and cropped to 800x800 pixels (for uniformity)
