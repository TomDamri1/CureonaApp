def add_business_to_txt_file(name,address):
    f = open("businesses.txt", "a") #a = append to the end of the file
    f.write(name+", "+address)
    f.close()


