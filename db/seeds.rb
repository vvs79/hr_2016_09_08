# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

Resume.create!(name: 'Kolya', age: 22)
Resume.create!(name: 'Dima',  age: 33)
Resume.create!(name: 'Olya',  age: 29)
Resume.create!(name: 'Vitya', age: 35)
Resume.create!(name: 'Sonya', age: 30)

User.create!(first_name: 'Admin', last_name: 'Admin', email: 'admin@admin.com', password: '12345678', admin: true)
User.create!(first_name: 'Ivan', last_name: 'Hr', email: 'hr@hr.com', password: '12345678', admin: false)
