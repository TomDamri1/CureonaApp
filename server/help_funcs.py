import json
import ast
import shutil


def add_business_to_txt_file(business_details):
    try:
        f = open("../txt_files/businesses.txt", "a")  # a = append to the end of the file
        f.write(str(business_details)+'\n')
    except IOError as e:
        return False
    finally:
        f.close()

    update_version_of_txt_file()
    f.close()
    return True



def update_version_of_txt_file():

    global VERSION_OF_BUSINESSES_TEXT_FILE
    VERSION_OF_BUSINESSES_TEXT_FILE = VERSION_OF_BUSINESSES_TEXT_FILE + 1

    from_file = open("../txt_files/businesses.txt", "r")
    line = from_file.readline()

    param, line = line.split(":", 1)

    param = param + ":" + str(VERSION_OF_BUSINESSES_TEXT_FILE) + '\n'

    to_file = open("../txt_files/businesses.txt", "w")
    to_file.write(param)
    shutil.copyfileobj(from_file, to_file)


def get_businesses_with_json_file(lines):
    lines.pop(0)  # removing from lines the "version : X" line
    jsons = []
    for line in lines:
        dic = ast.literal_eval(line)
        jsons.append(dic)

    return jsons


def set_global_version_of_txt_file():
    global VERSION_OF_BUSINESSES_TEXT_FILE
    f = open("../txt_files/businesses.txt", "r")  # a = append to the end of the file

    version = f.readline()
    param, version = version.split(":", 1)

    print(version)


    VERSION_OF_BUSINESSES_TEXT_FILE = (int(version))


def add_business_to_js_file(json_to_be_file):
    # json_object = json.dumps(json_to_be_file, encoding='utf8')
    # with open("../txt_files/businesses_data.js", "w") as outfile:
    #     outfile.write(json_object)
    with open("../txt_files/businesses_data.js", 'a', encoding='utf8') as json_file:
        json.dump(',', json_file)
        json.dump(json_to_be_file, json_file, ensure_ascii=False, indent=4)
