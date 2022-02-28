class UsersController < ApplicationController
    skip_before_action :authorize, only: [:create]

    def create
        new_user = User.create!(user_params)
        session[:user_id] = new_user.id
        render json: new_user, status: 201
    end

    private

    def user_params
        params.permit(:first_name, :last_name, :email, :user_name, :password)
    end

end
