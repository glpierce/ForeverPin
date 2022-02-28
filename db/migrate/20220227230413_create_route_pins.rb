class CreateRoutePins < ActiveRecord::Migration[7.0]
  def change
    create_table :route_pins do |t|
      t.integer :route_id
      t.integer :pin_id
      t.integer :route_position
      t.timestamps
    end
  end
end
