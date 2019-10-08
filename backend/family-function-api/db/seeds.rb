# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Chore.delete_all
HouseHold.delete_all

smith = HouseHold.create(name: 'Smith', members: 'John Jane Jack Julia')

jones = HouseHold.create(name: 'Jones', members: "Jerry, Aaron, January, Tommy Lee")

laundry = Chore.create(name: 'Laundry', status:'Incomplete', house_hold:smith)

garbage = Chore.create(name: 'Garbage', status:'Incomplete', house_hold:smith)

dishes = Chore.create(name: 'Dishes', status:'Incomplete', house_hold:smith)