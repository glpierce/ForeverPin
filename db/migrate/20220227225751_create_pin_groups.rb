class CreatePinGroups < ActiveRecord::Migration[7.0]
  def change
    create_table :pin_groups do |t|
      t.integer :user_id
      t.string :title
      t.string :description
      t.integer :marker_color
      t.timestamps
    end
  end
end
