# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

puts "Seeding users..."
u1 = User.create!(first_name: "John", last_name: "Smith", email: "jsmith@gmail.com", user_name: "TravelingSmith", password: "test")
u2 = User.create!(first_name: "Jane", last_name: "Doe", email: "jdoe@gmail.com", user_name: "DoeADeer", password: "test")
u3 = User.create!(first_name: "Michael", last_name: "Corning", email: "mcorning@gmail.com", user_name: "HeavensGate01", password: "test")
u4 = User.create!(first_name: "Emily", last_name: "Jones", email: "ejones@gmail.com", user_name: "worldeater69", password: "test")

puts "Seeding friendships..."
f1 = Friendship.create!(user_id: u1.id, friend_id: u2.id, confirmed: true)
f2 = Friendship.create!(user_id: u1.id, friend_id: u3.id, confirmed: true)
f3 = Friendship.create!(user_id: u1.id, friend_id: u4.id, confirmed: true)
f4 = Friendship.create!(user_id: u2.id, friend_id: u3.id, confirmed: false)
f5 = Friendship.create!(user_id: u4.id, friend_id: u2.id, confirmed: false)

puts "Seeding pins..."
p1 = Pin.create!(user_id: u3.id,
                latitude: "43.57689676237089", 
                longitude: "-110.83135751214964", 
                title: "Lucky P", 
                description: "Lucky P & PNP", 
                address: "7001 Jensen Canyon Road, Teton Village, WY 83025",
                visit_date: DateTime.new(2021, 12, 25, 1, 5, 12))
p2 = Pin.create!(user_id: u3.id,
                latitude: "37.76966531052057", 
                longitude: "-122.43845945368633", 
                title: "141BVE", 
                description: "Grant, Yousef & Miguel's apartment", 
                address: "141 Buena Vista Ave E, San Francisco, CA, 94117",
                visit_date: DateTime.new(2021, 12, 25, 1, 5, 12))
p3 = Pin.create!(user_id: u3.id,
                latitude: "41.08182795632123", 
                longitude: "-73.63555949773426", 
                title: "Home", 
                description: "My childhood home", 
                address: "29 Dairy Road, Greenwich, CT 06830",
                visit_date: DateTime.new(2021, 12, 25, 1, 5, 12),)

p4 = Pin.create!(user_id: u1.id,
                latitude: "32.79978115950542", 
                longitude: "-96.82913128054571", 
                title: "Hilton Anatole", 
                description: "Hotel for work trip to Dallas", 
                address: "2201 N Stemmons Fwy, Dallas, TX 75207",
                visit_date: DateTime.new(2021, 12, 25, 1, 5, 12),)

