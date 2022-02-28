class CreateRoutes < ActiveRecord::Migration[7.0]
  def change
    create_table :routes do |t|
      t.integer :user_id
      t.string :title
      t.string :description
      t.timestamps
    end
  end
end
