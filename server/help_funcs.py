def add_business_to_txt_file(jsonfile):
    f = open("../txt_files/businesses.txt", "a") #a = append to the end of the file
    f.write(str(jsonfile))
    f.write('\n,\n')
    f.close()


