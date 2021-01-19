class CreatePosts < ActiveRecord::Migration[6.0]
  def change
    create_table :posts do |t|
      t.string :title
      t.string :description
      t.string :image
      t.integer :price
      t.float :rating
      t.string :review

      t.timestamps
    end
  end
end
