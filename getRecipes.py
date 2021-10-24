import json
import sys
'''
Post:
    param: list of ingredients
    [ing1, ing2, ing3]
    ing1 --> set of ids
    ing2 --> set of ids

    resultSet = get first ingredient from map and get it's set
    for each remaining ingredient k
        get k's set of recipe ids -- set2
        resultSet = resultSet intersect set2


    with result set
        pull from map and return it

    set1, set2, set3, set4
    set1 intersect set2 --> new set1
    net set1 intersect set 3

'''

def getRecipes(ings):
    ingToIdFile = open('ingToId.txt', mode ='r')
    idToRecipeFile = open('idToRecipe.txt', mode = 'r')
    ingToId = json.load(ingToIdFile)
    idToRecipe = json.load(idToRecipeFile)
    
    resultSet = ingToId[ings[0]]
    for ing in ings[1:]:
        newSet = ingToId[ing]
        resultSet = set(resultSet).intersection(newSet)
    
    recipes = []
    #print("result set: ", len(resultSet))
    for id in resultSet:
        recipe = idToRecipe[id]
        recipes.append(recipe)

        print(json.dumps(recipe))
    
    return recipes


def main():
    getRecipes(sys.argv[1:])

if __name__ == "__main__":
    main()