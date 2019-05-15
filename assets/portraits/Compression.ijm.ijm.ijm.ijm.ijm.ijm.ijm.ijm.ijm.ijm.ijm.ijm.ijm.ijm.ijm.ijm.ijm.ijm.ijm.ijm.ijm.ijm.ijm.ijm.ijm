function Overview(input, output, filename) {
	// This macro processes 20x magnified images: it creates several overlays, adds a 100um scale bar and saves the created files
	// Only need to change input and output path at the bottom of this macro to the desired destinations
	
	setBatchMode(true); //suppresses the display of the image

	open(input + filename);
	run("Size...", "width=1000 constrain average interpolation=Bilinear");
	run("Input/Output...", "jpeg=30 gif=-1 file=.csv use_file copy_row save_column save_row");
	saveAs("Jpeg", output + filename);
	close();
	}
		

// Change paths here!
// Paths should look like this: "E:\\Imaging\\IF-005-20170908\\"

input = "C:\\Users\\Henni\\Dropbox\\CDV\\Portrangs\\";
output = "C:\\Users\\Henni\\Dropbox\\CDV\\compressed_portraits\\";

list = getFileList(input);

for (i = 0; i < list.length; i++)
	Overview(input, output, list[i]);
