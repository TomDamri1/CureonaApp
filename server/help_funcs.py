import json


def add_business_to_txt_file(business_details):
    f = open("../txt_files/businesses.txt", "a")  # a = append to the end of the file
    f.write(str(business_details))
    f.write('\n,\n')
    f.close()


def get_businesses():

    return


def add_business_to_js_file(json_to_be_file):
    # json_object = json.dumps(json_to_be_file, encoding='utf8')
    # with open("../txt_files/businesses_data.js", "w") as outfile:
    #     outfile.write(json_object)
    with open("../txt_files/businesses_data.js", 'a', encoding='utf8') as json_file:
        json.dump(',', json_file)
        json.dump(json_to_be_file, json_file, ensure_ascii=False,indent = 4)
