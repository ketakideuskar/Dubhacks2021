import csv
import json
'''
with open('RAW_recipes.csv', mode='r') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    count = 0;
    test_file = open('test.txt', mode='w')
    for row in csv_reader:
        if (count < 5):
            test_file.write(" ".join(row))
            test_file.write('\n')
            count += 1
        else:
            break
'''

ingToId = {}
idToRecipe = {}

with open('RAW_recipes.csv', mode='r') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    count = 0;
    for row in csv_reader:
        if (count == 0):
            count += 1
            continue
        if (count < 5):
            temp = row[10]
            temp = temp.replace("\'", "\"")
            ings = json.loads(temp)
            for key in ings:
                if key not in ingToId.keys():
                    ingToId[key] = []
                ingToId[key].append(row[1])
            count += 1
        else:
            break;
    with open('test.txt', mode='w') as ingDump:
        ingDump.write(json.dumps(ingToId))
    print(ingToId)
    with open('test.txt', mode='r') as tempIng:
        data = json.load(tempIng)
        print(data['winter squash'])

    

'''
Pre:
    create ingredient dictionary (ingredient --> set of recipe ids)
    for each recipe r
        get r.ingredients --> list
        iterate through list of ing
            if ing doesn't exist in the map, add it to the map and append current recipe
            else
            append recipe to the current value of ing

        
    load the dictionary into a json file
    dictionary: recipe id --> recipe
    load dictionary into json file

Post:
    param: list of ingredients
    for each ingredient k
        get k's set of recipe ids
    for each set of recipe ids
        intersect with the next id
    with result set
        pull from map and return it

    set1, set2, set3, set4
    set1 intersect set2 --> new set1
    net set1 intersect set 3

'''