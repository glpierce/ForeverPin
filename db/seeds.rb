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
u3 = User.create!(first_name: "Michael", last_name: "Corning", email: "mcorning@gmail.com", user_name: "MCorning", password: "test")


puts "Seeding friendships..."
f1 = Friendship.create!(user_id: u1.id, friend_id: u2.id, confirmed: true)
f2 = Friendship.create!(user_id: u1.id, friend_id: u3.id, confirmed: true)
f3 = Friendship.create!(user_id: u2.id, friend_id: u3.id, confirmed: false)


puts "Seeding pin groups..."
pg1 = PinGroup.create(user_id: u3.id, title: "Test Group", description: "Group for testing if groups are working", marker_color: 3)


puts "Seeding pins..."
p1 = Pin.create!(user_id: u3.id,
                latitude: "38.24747440963926", 
                longitude: "-85.67541342769277", 
                title: "Home", 
                description: "My home!", 
                address: "510 Briar Hill Rd, Louisville, KY 40206",
                visit_date: DateTime.new(2015, 6, 25, 8, 5, 12))
p2 = Pin.create!(user_id: u3.id,
                latitude: "38.25118318744765", 
                longitude: "-85.65429221966407", 
                title: "Graeter's Ice Cream", 
                description: "Best ice cream in the world!!! The raspberry chocolate chunk is to die for.", 
                address: "140 Breckenridge Ln, Louisville, KY 40207",
                visit_date: DateTime.new(2015, 7, 12, 8, 5, 12))
p3 = Pin.create!(user_id: u3.id,
                latitude: "36.07322635197054", 
                longitude: "-112.1512488496503", 
                title: "Powell Point - Grand Canyon", 
                description: "Beautiful Grand Canyon views from the south rim. Henry almost fell in!", 
                address: "Grand Canyon Village, AZ 86023",
                visit_date: DateTime.new(2018, 10, 5, 8, 5, 12),
                pin_group_id: pg1.id)
p4 = Pin.create!(user_id: u3.id,
                latitude: "36.982191595620954", 
                longitude: "-110.11184524806298", 
                title: "Monument Valley Visitor Center", 
                description: "Really cool exhibits and beautiful landscape. Feels like you're on Mars.", 
                address: "US 163 Scenic, Oljato-Monument Valley, AZ 84536",
                visit_date: DateTime.new(2018, 10, 7, 8, 8, 12),
                pin_group_id: pg1.id)
p5 = Pin.create!(user_id: u3.id,
                latitude: "38.57329967781957", 
                longitude: "-109.55079184032616", 
                title: "Downtown Moab", 
                description: "Wacky national park town with cool shops and restaurants", 
                address: "1 W Center St, Moab, UT 84532",
                visit_date: DateTime.new(2018, 10, 10, 8, 8, 12),
                pin_group_id: pg1.id)
p6 = Pin.create!(user_id: u3.id,
                latitude: "38.57521734234044", 
                longitude: "-107.74162644447564", 
                title: "Black Canyon of the Gunnison National Park", 
                description: "Spectacular canyon! Definitely an underrated national park. So glad we decided to visit", 
                address: "Montrose County, CO",
                visit_date: DateTime.new(2018, 10, 13, 8, 8, 12),
                pin_group_id: pg1.id)
p7 = Pin.create!(user_id: u3.id,
                latitude: "38.481291734948876", 
                longitude: "-107.87353274614817", 
                title: "Crash Burger", 
                description: "Great retro burger joint. Really friendly staff and good food. Loved the space theme!", 
                address: "646 E Main St, Montrose, CO 81401",
                visit_date: DateTime.new(2018, 10, 13, 8, 8, 12))
p8 = Pin.create!(user_id: u3.id,
                latitude: "40.7485119377725", 
                longitude: "-73.98573642493199", 
                title: "Empire State Building", 
                description: "Great views from the top. Loved seeing this icon of American architecture in person.", 
                address: "20 W 34th St, New York, NY 10001",
                visit_date: DateTime.new(2019, 1, 2, 8, 5, 12))
p9 = Pin.create!(user_id: u3.id,
                latitude: "40.75817858857559", 
                longitude: "-73.9854842007736", 
                title: "Times Square", 
                description: "Times Square for New Years, what an experience... never again though.", 
                address: "1540 Broadway, New York, NY 10036",
                visit_date: DateTime.new(2019, 1, 1, 8, 5, 12))
p10 = Pin.create!(user_id: u3.id,
                latitude: "47.60494313271948", 
                longitude: "-122.3340378386255", 
                title: "Corporate HQ", 
                description: "Presentation to senior leadership went well.", 
                address: "999 3rd Ave, Seattle, WA 98104",
                visit_date: DateTime.new(2019, 4, 12, 8, 5, 12))
p11 = Pin.create!(user_id: u3.id,
                latitude: "51.50078415988129", 
                longitude: "-0.12455118591865375", 
                title: "Big Ben & Parliament", 
                description: "An absolute icon. A must visit!", 
                address: "London SW1A 0AA, United Kingdom",
                visit_date: DateTime.new(2019, 4, 12, 8, 5, 12))
p12 = Pin.create!(user_id: u3.id,
                latitude: "25.726469598411448", 
                longitude: "-80.2507775210849", 
                title: "Mom & Dad's house", 
                description: "My childhood home", 
                address: "3575 William Ave, Miami, FL 33133",
                visit_date: DateTime.new(1994, 5, 10, 8, 5, 12))
p13 = Pin.create!(user_id: u1.id,
                latitude: "32.8326766986214", 
                longitude: "-96.79675198770147", 
                title: "My Home", 
                description: "Was so excited to move in! What a great location.", 
                address: "3800 Beverly Dr, Dallas, TX 75205",
                visit_date: DateTime.new(2010, 5, 27, 8, 5, 12))
p14 = Pin.create!(user_id: u1.id,
                latitude: "21.155824652158536", 
                longitude: "-86.7995998518883", 
                title: "Cancun Hotel", 
                description: "Great vacation to Mexico! This place had an awesome continental breakfast.", 
                address: "Kukulcan Boulevard, Zona Hotelera, 77500 Cancún, Q.R., Mexico",
                visit_date: DateTime.new(2014, 8, 16, 8, 5, 12))
p15 = Pin.create!(user_id: u1.id,
                latitude: "29.95210742484781", 
                longitude: "-90.06826281988995", 
                title: "Business Trip", 
                description: "Business trip to NOLA. Met some awesome colleagues from around the world.", 
                address: "110 Camp St, New Orleans, LA 70130",
                visit_date: DateTime.new(2017, 4, 8, 8, 5, 12))

