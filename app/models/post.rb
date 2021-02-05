class Post < ApplicationRecord
	validates :title, :description, :price, presence: true
	# validates :image, presence: true

	# has_one_attached :image
	belongs_to :user
	delegate :email, to: :user, prefix: true, allow_nil: true

end
