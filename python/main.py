import psycopg2
import json
import time
import csv


def create_tables(cur):
    continent_query = "CREATE TABLE IF NOT EXISTS continent (name VARCHAR(150) NOT NULL PRIMARY KEY);"
    plan_query = "CREATE TABLE  IF NOT EXISTS plan (id SERIAL NOT NULL PRIMARY KEY UNIQUE, country VARCHAR(3) NOT NULL references country(country_code), start_date DATE NOT NULL, end_date DATE NOT NULL, title VARCHAR(200) NOT NULL, description VARCHAR(9999) NOT NULL, location VARCHAR(200) NOT NULL);"
    experience_query = "CREATE TABLE IF NOT EXISTS experience (id SERIAL NOT NULL PRIMARY KEY, start_datetime timestamp NOT NULL, end_datetime timestamp NOT NULL, title VARCHAR(200) NOT NULL, description VARCHAR(9999) NOT NULL, plan INTEGER NOT NULL REFERENCES plan(id) ON DELETE CASCADE);"
    country_query = "CREATE TABLE IF NOT EXISTS country (country_code VARCHAR(10) NOT NULL PRIMARY KEY, name VARCHAR(100) NOT NULL UNIQUE);"
    bigmac_query = "CREATE TABLE IF NOT EXISTS bigmac (country_code VARCHAR(10) NOT NULL PRIMARY KEY UNIQUE, exc_rate FLOAT NOT NULL, currency VARCHAR(10) NOT NULL);"
    continent_query = "CREATE TABLE IF NOT EXISTS continents (name VARCHAR(20) NOT NULL PRIMARY KEY)"

    cur.execute(country_query)
    cur.execute(continent_query)
    cur.execute(plan_query)
    cur.execute(experience_query)
    cur.execute(bigmac_query)
    conn.commit()


def pop_continent(cur):
    cur.execute(
        "INSERT INTO continents (name) VALUES ('Europe') ON CONFLICT DO NOTHING;")
    cur.execute(
        "INSERT INTO continents (name) VALUES ('Africa') ON CONFLICT DO NOTHING;")
    cur.execute(
        "INSERT INTO continents (name) VALUES ('South America') ON CONFLICT DO NOTHING;")
    cur.execute(
        "INSERT INTO continents (name) VALUES ('North America') ON CONFLICT DO NOTHING;")
    cur.execute(
        "INSERT INTO continents (name) VALUES ('Antarctica') ON CONFLICT DO NOTHING;")
    cur.execute(
        "INSERT INTO continents (name) VALUES ('Oceania') ON CONFLICT DO NOTHING;")
    cur.execute(
        "INSERT INTO continents (name) VALUES ('Asia') ON CONFLICT DO NOTHING;")


def save_to_db(cur, data):
    country = [
        data['alpha3'], data['name']
    ]

    cur.execute(
        "INSERT INTO country (country_code, name) VALUES (UPPER(%s), %s) ON CONFLICT DO NOTHING", country
    )


def save_to_big_mac(cur, data):
    bigmac = [
        data[1], data[5], data[2]
    ]
    cur.execute(
        "INSERT INTO bigmac (country_code, exc_rate, currency) VALUES (%s, %s, %s)", bigmac

    )


def dummy_queries(cur):

    cur.execute("INSERT INTO plan (location, country, start_date, end_date, title, description) VALUES ('Casa Del UDM', 'SWE', '2016-06-22', '2016-06-22', 'Visit Vetlanda', 'See all the famous sights such as Sapa Arena, Sapa Building Systems main office, Hasses Pizzeria') ON CONFLICT DO NOTHING")
    cur.execute("INSERT INTO plan (location, country, start_date, end_date, title, description) VALUES ('Casa Del UDM', 'DNK', '2016-06-22', '2016-06-22', 'Copenhagen', 'Have some beer, go to istegade, visit Sweden')")
    cur.execute(
        "INSERT INTO plan (location, country, start_date, end_date, title, description) VALUES ('Casa Del UDM', 'NOR', '2016-06-22', '2016-06-22', 'Bodö', 'Club seals')")
    cur.execute("INSERT INTO plan (location, country, start_date, end_date, title, description) VALUES ('Casa Del UDM', 'ISL', '2016-06-22', '2016-06-22', 'Reykjavik', 'Have a look at the swastika by the main square')")
    cur.execute("INSERT INTO plan (location, country, start_date, end_date, title, description) VALUES ('Casa Del UDM', 'SOM', '2016-06-22', '2016-06-22', 'Mogadishu', 'Become a warlord')")


def dummy_queries_experience(cur):
    cur.execute("INSERT INTO experience (start_datetime, end_datetime, title, description, plan) VALUES ('2016-06-22 19:10:25-07', '2016-06-22 19:10:25-07', 'Finally Vetlanda!', 'We will visit this LOVELY place', (SELECT id FROM plan WHERE title = 'Visit Vetlanda')) ON CONFLICT DO NOTHING;")
    cur.execute("INSERT INTO experience (start_datetime, end_datetime, title, description, plan) VALUES ('2016-06-22 19:10:25-07', '2016-06-22 19:10:25-07', 'Swedens retarded baby brother', 'We will have some drinks and do the only smart think wile in Denmark, go to Sweden',  (SELECT id FROM plan WHERE title = 'Copenhagen')) ON CONFLICT DO NOTHING;")
    cur.execute("INSERT INTO experience (start_datetime, end_datetime, title, description, plan) VALUES ('2016-06-22 19:10:25-07', '2016-06-22 19:10:25-07', 'Swedens retarded baby sister', 'We will kill seals and go clubbing',  (SELECT id FROM plan WHERE title = 'Bodö')) ON CONFLICT DO NOTHING;")
    cur.execute("INSERT INTO experience (start_datetime, end_datetime, title, description, plan) VALUES ('2016-06-22 19:10:25-07', '2016-06-22 19:10:25-07', 'Shithole country', 'Doesnt even have McDonalds',  (SELECT id FROM plan WHERE title = 'Visit Vetlanda')) ON CONFLICT DO NOTHING;")
    cur.execute("INSERT INTO experience (start_datetime, end_datetime, title, description, plan) VALUES ('2016-06-22 19:10:25-07', '2016-06-22 19:10:25-07', 'Lovely Somalia', 'Love this place',  (SELECT id FROM plan WHERE title = 'Visit Vetlanda')) ON CONFLICT DO NOTHING;")


conn = psycopg2.connect(
    host="localhost",
    database="postgres",
    user="postgres",
    password="pw")

cur = conn.cursor()
print("Connected")
create_tables(cur)
pop_continent(cur)

with open('data.json') as json_file:
    data = json.load(json_file)
    for i in data:
        save_to_db(cur, i)

conn.commit()
dummy_queries(cur)
dummy_queries_experience(cur)


with open('bigmac.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    line_count = 0
    for row in csv_reader:
        if line_count == 0:
            print(f'Column names are {", ".join(row)}')
            line_count += 1
        else:
            save_to_big_mac(cur, row)
            line_count += 1

conn.commit()
