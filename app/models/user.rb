class User < ApplicationRecord
    has_secure_password

    has_many :pins, dependent: :destroy
    has_many :friendships, dependent: :destroy
    has_many :pending_friendships, -> { where confirmed: false }, class_name: 'Friendship', foreign_key: "friend_id"
    has_many :pin_groups, dependent: :destroy
    has_many :routes, dependent: :destroy

    def friendships
        friends_i_intitiate = Friendship.where(user_id: id, confirmed: true).pluck(:friend_id)
        friends_i_receive = Friendship.where(friend_id: id, confirmed: true).pluck(:user_id)
        ids = friends_i_intitiate + friends_i_receive
        User.where(id: ids)
    end

    def requests
        ids = Friendship.where(friend_id: id, confirmed: false).pluck(:user_id)
        User.where(id: ids)
    end

end
