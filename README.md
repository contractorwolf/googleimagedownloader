# googleimagedownloader
A Node.js command line app for downloading full sized images from Google Image Search for usage in Machine Learning Object Detection


used like this on the command line:
> node getimages telsa model 3

it will piece together the text after the getimages string and use the text in a google image search like this "tesla+model+3".  Its will then scrape the google image response page for the 
full sized images that are linked to and download the full sized images
