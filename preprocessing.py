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

        ings = row[10][2: (len(row[10]) - 2)].split("\', \'")
        #temp = temp.replace("\'", "\"")
        #ings = json.loads(temp)
        
        steps = row[8][2: (len(row[8]) - 2)].split("\', \'")
        idToRecipe[row[1]] = {'Name': row[0], 'Minutes': row[2], 'Steps': steps, 'Description': row[9], 'Ingredients': ings}
        
        for key in ings:
            if key not in ingToId.keys():
                ingToId[key] = []
            ingToId[key].append(row[1])

    with open('ingToId.txt', mode='w') as ingDump:
        ingDump.write(json.dumps(ingToId))
    with open('idToRecipe.txt', mode='w') as idDump:
        idDump.write(json.dumps(idToRecipe))
    print("done")
    
    count2 = 0
    with open('ingToId.txt', mode='r') as ingDump2:
        data = json.load(ingDump2)
        for key in data:
            if (count2 < 5):
                print(key)
                count2 += 1
            else:
                break
    count2 = 0             
    with open('idToRecipe.txt', mode='r') as idDump2:
        data2 = json.load(idDump2)
        for key in data2:
            if (count2 < 5):
                print(key)
                count2 += 1
            else:
                break

    

'''
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