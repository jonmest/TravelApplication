import psycopg2
import json
import time
import csv


def create_tables(cur):

    plan_query = "CREATE TABLE  IF NOT EXISTS plan (id SERIAL NOT NULL PRIMARY KEY UNIQUE, country VARCHAR(3) NOT NULL references country(country_code), start_date DATE NOT NULL, end_date DATE NOT NULL, title VARCHAR(200) NOT NULL, description VARCHAR(9999) NOT NULL, location VARCHAR(200) NOT NULL);"
    experience_query = "CREATE TABLE IF NOT EXISTS experience (id SERIAL NOT NULL PRIMARY KEY, start_datetime timestamp NOT NULL, end_datetime timestamp NOT NULL, title VARCHAR(200) NOT NULL, description VARCHAR(9999) NOT NULL, plan INTEGER NOT NULL REFERENCES plan(id) ON DELETE CASCADE);"
    country_query = "CREATE TABLE IF NOT EXISTS country (country_code VARCHAR(10) NOT NULL PRIMARY KEY, name VARCHAR(100) NOT NULL UNIQUE);"
    bigmac_query = "CREATE TABLE IF NOT EXISTS bigmac (country_code VARCHAR(10) NOT NULL PRIMARY KEY UNIQUE, exc_rate FLOAT NOT NULL, dollar_price FLOAT NOT NULL, currency VARCHAR(10) NOT NULL);"
    view_query = "CREATE VIEW detailed_plan AS SELECT id, country, start_date, end_date, title, description, location, country.country_code, dollar_price, currency, name FROM (plan AS z FULL OUTER JOIN bigmac ON (z.country = bigmac.country_code)) AS x INNER JOIN country ON (x.country = country.country_code);"

    cur.execute(country_query)

    cur.execute(plan_query)
    cur.execute(experience_query)
    cur.execute(bigmac_query)
    cur.execute(view_query)
    conn.commit()


def save_to_db(cur, data):
    country = [
        data['alpha3'], data['name']
    ]

    cur.execute(
        "INSERT INTO country (country_code, name) VALUES (UPPER(%s), %s) ON CONFLICT DO NOTHING", country
    )


def save_to_big_mac(cur, data):
    bigmac = [
        data[1], data[5], data[6], data[2]
    ]
    cur.execute(
        "INSERT INTO bigmac (country_code, exc_rate, dollar_price, currency) VALUES (%s, %s, %s, %s)", bigmac

    )


conn = psycopg2.connect(
    host="localhost",
    database="postgres",
    user="postgres",
    password="pw")

cur = conn.cursor()
print("Connected")
create_tables(cur)

with open('data.json') as json_file:
    data = json.load(json_file)
    for i in data:
        save_to_db(cur, i)

conn.commit()


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
