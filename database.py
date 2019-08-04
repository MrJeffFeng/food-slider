import pymongo

class dataset():
    def __init__():
        self.client = MongoClient('mongodb://localhost:27017/')
        self.db = client.main_db
        self.food_list = db.food_list
        self.food_list.insert_one({"id":"food_list","food_list":["panda's express","McDonalds","Pizza Hut","KFC","Wendys","Papa John's","Starbucks"]})

    def get_food():
        return self.food_list.find_one({"id":"food_list"})

    def get_user():
        pass

    def add_liked():
        pass
