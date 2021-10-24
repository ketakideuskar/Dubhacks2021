import json
import sys

def getIngredients():
    ingToIdFile = open('ingToId.txt', mode ='r')
    ingToId = json.load(ingToIdFile)

    for key in ingToId.keys():
        print(key)


def main():
    getIngredients()

if __name__ == "__main__":
    main()