class Pin < ApplicationRecord
    belongs_to :user
    belongs_to :pin_group, optional: true
    has_many :route_pins, dependent: :destroy
    has_many :routes, through: :route_pins

end
