require 'faker'

Post.destroy_all
User.destroy_all

10.times do |i|
  post = Post.create!(
    title: "Post #{i + 1}",
    description: Faker::Hacker.say_something_smart,
    price: rand(1..999900),
    image: Faker::LoremFlickr.image(search_terms: ["cats #{i + 1}"])
  )
  # post.image.attach(
  # 	io: File.open('app/assets/images/default_image.png'), 
  # 	filename: 'default_image', 
  # 	content_type: 'image/png')

  10.times do 
    User.create!(email: Faker::Internet.email, password: 'password')
  end

  User.create(email: 'andreajfrank23@gmail.com', password: 'password')
end


