class PinSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :latitude, :longitude, :title, :description, :address, :visit_date
end
