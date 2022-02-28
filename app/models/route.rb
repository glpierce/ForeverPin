class Route < ApplicationRecord
    belongs_to :user
    has_many :route_pins, dependent: :destroy
    has_many :pins, through: :route_pins
end
