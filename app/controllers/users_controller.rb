class UsersController < ApplicationController
    skip_before_action :authorize, only: [:create]

    def create
        new_user = User.create!(user_params)
        session[:user_id] = new_user.id
        render json: new_user, status: 201
    end

    def search
        friends_i_intitiate = Friendship.where(user_id: @current_user.id).pluck(:friend_id)
        friends_i_receive = Friendship.where(friend_id: @current_user.id).pluck(:user_id)
        friend_ids = friends_i_intitiate + friends_i_receive
        friend_ids.append(@current_user.id)
        email_users = User.where("email LIKE ? AND id NOT IN (?)", "%#{params[:query]}%", friend_ids).pluck(:id)
        user_name_users = User.where("user_name LIKE ? AND id NOT IN (?)", "%#{params[:query]}%", friend_ids).pluck(:id)
        result_ids = (email_users + user_name_users).uniq
        render json: User.where(id: result_ids), status: 200
    end

    def update
        @current_user.update!(user_params)
        render json: @current_user, status: 200
    end

    def updateCheck
        response = []
        if (User.find_by(email: params[:email]) && @current_user.email != params[:email])
            response.append("email already exists")
        end
        if (User.find_by(user_name: params[:username]) && @current_user.user_name != params[:username])
            response.append("username already exists")
        end
        if (response.length() > 0)
            render json: response, status: 401
        else 
            head :no_content
        end
    end

    private

    def user_params
        params.permit(:first_name, :last_name, :email, :user_name, :password)
    end

end
