class PinGroupSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :title, :description, :marker_color
end
