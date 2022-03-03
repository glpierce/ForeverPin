class FriendshipsController < ApplicationController

    def requests
        render json: @current_user.requests, status: 200
    end

    def friends
        render json: @current_user.friends, status: 200
    end

    def destroy
        if (Friendship.find_by(user_id: @current_user.id, friend_id: params[:id]))
            friendship = Friendship.find_by(user_id: @current_user.id, friend_id: params[:id])
            friendship.destroy
            head :no_content
        elsif (Friendship.find_by(user_id: params[:id], friend_id: @current_user.id))
            friendship = Friendship.find_by(user_id: params[:id], friend_id: @current_user.id)
            friendship.destroy
            head :no_content
        end
    end

    def update
        if (Friendship.find_by(user_id: @current_user.id, friend_id: params[:id]))
            friendship = Friendship.find_by(user_id: @current_user.id, friend_id: params[:id])
            friendship.update!(:confirmed => true)
            render json: friendship, status: 200
        elsif (Friendship.find_by(user_id: params[:id], friend_id: @current_user.id))
            friendship = Friendship.find_by(user_id: params[:id], friend_id: @current_user.id)
            friendship.update!(:confirmed => true)
            render json: friendship, status: 200
        end
    end

    def create
        friendship = Friendship.create!(user_id: @current_user.id, friend_id: params[:friend_id], confirmed: false)
        render json: friendship, status: 201
    end

end
