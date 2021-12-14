# MySQLdbのインポート
import MySQLdb
import json
 
# データベースへの接続とカーソルの生成
connection = MySQLdb.connect(
    host='localhost',
    user='root',
    passwd='',
    db='python_db',
# テーブル内部で日本語を扱うために追加
    charset='utf8'
)
cursor = connection.cursor()
 
# テーブルの初期化
cursor.execute("DROP TABLE IF EXISTS shop_list")

json_open1 = open('kodaira_data.js', 'r')
json_load1 = json.load(json_open1)

json_open2 = open('kokubunji_data.js', 'r')
json_load2 = json.load(json_open2)

json_open3 = open('shinjuku_data.js', 'r')
json_load3 = json.load(json_open3)

 
# テーブルの作成
cursor.execute("""CREATE TABLE shop_list(
    id INT(11) AUTO_INCREMENT NOT NULL, 
    area INT(2) NOT NULL,
    name VARCHAR(30) NOT NULL COLLATE utf8mb4_unicode_ci, 
    lat VARCHAR(30) NOT NULL,
    lng VARCHAR(30) NOT NULL,
    price INT(1) NOT NULL,
    shop VARCHAR(20) NOT NULL,
    PRIMARY KEY (id)
    )""")
 
# データの追加
sql =("""INSERT INTO shop_list (area, name, lat, lng, price, shop)
    VALUES (%s, %s, %s, %s, %s, %s)
    """)

data = []
num1 = 0
num2 = 0
num3 = 0

for d in json_load1['results']:
    data_area = 0
    data_name = json_load1['results'][num1]['name']
    data_lat = json_load1['results'][num1]['geometry']['location']['lat']
    data_lng = json_load1['results'][num1]['geometry']['location']['lng']
    if 'price_level' in json_load1['results'][num1].keys():
        data_price = json_load1['results'][num1]['price_level']
    else:
        data_price = 0
    data_shop = json_load1['results'][num1]['shop']
    data.append([data_area, data_name, data_lat, data_lng, data_price, data_shop])
    num1 += 1


for d in json_load2['results']:
    data_area = 1
    data_name = json_load2['results'][num2]['name']
    data_lat = json_load2['results'][num2]['geometry']['location']['lat']
    data_lng = json_load2['results'][num2]['geometry']['location']['lng']

    if 'price_level' in json_load2['results'][num2].keys():
        data_price = json_load2['results'][num2]['price_level']
    else:
        data_price = 0

    data_shop = json_load2['results'][num2]['shop']
    data.append([data_area, data_name, data_lat, data_lng, data_price, data_shop])
    num2 += 1

for d in json_load3['results']:
    data_area = 2
    data_name = json_load3['results'][num3]['name']
    data_lat = json_load3['results'][num3]['geometry']['location']['lat']
    data_lng = json_load3['results'][num3]['geometry']['location']['lng']
    if 'price_level' in json_load3['results'][num3].keys():
        data_price = json_load3['results'][num3]['price_level']
    else:
        data_price = 0 
    data_shop = json_load3['results'][num3]['shop']
    data.append([data_area, data_name, data_lat, data_lng, data_price, data_shop])
    num3 += 1



cursor.executemany(sql, data)
 
# 一覧の表示
cursor.execute("SELECT * FROM shop_list")
 
for row in cursor:
    print(row)
 
 
# 保存を実行
connection.commit()
 
# 接続を閉じる
connection.close()
