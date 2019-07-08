# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

chris = User.create(name: "Chris")
aidi = User.create(name: "Aidi")

p1 = Project.create(name: "home", user_id: chris.id)
p2 = Project.create(name: "work", user_id: aidi.id)

t1 = Task.create(name: "shop", status:"closed", project_id: p1.id);
t2 = Task.create(name: "eat", status:"open", project_id: p1.id);
t3 = Task.create(name: "write stuff", status:"closed", project_id: p2.id);
t4 = Task.create(name: "do stuff", status:"open", project_id: p2.id);
