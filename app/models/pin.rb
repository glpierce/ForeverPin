class Pin < ApplicationRecord
    belongs_to :user
    belongs_to :pin_group, optional: true

end
