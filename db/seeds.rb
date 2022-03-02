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
