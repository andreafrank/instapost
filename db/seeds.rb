require 'faker'

Post.destroy_all
User.destroy_all

5.times do |i|
  user = User.create(email: Faker::Internet.email, password: 'password')

  Post.create(
    user_id: user.id,
    title: "Post #{i + 1}",
    description: Faker::Hacker.say_something_smart,
    price: rand(1..999900),
    image: Faker::LoremFlickr.image(search_terms: ["cats #{i + 1}"]))
end

andrea = User.create(email: 'andreajfrank23@gmail.com', password: 'password')