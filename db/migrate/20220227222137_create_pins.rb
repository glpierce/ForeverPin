class CreatePins < ActiveRecord::Migration[7.0]
  def change
    create_table :pins do |t|
      t.integer :user_id
      t.integer :pin_group_id
      t.string :latitude
      t.string :longitude
      t.string :title
      t.string :description
      t.string :address
      t.datetime :visit_date
      t.timestamps
    end
  end
end
