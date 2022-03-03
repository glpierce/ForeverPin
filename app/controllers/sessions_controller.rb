class SessionsController < ApplicationController
    skip_before_action :authorize, only: [:create, :accountCheck]

    def create
        if (User.find_by(email: params[:account]))
            user = User.find_by(email: params[:account])
            if user&.authenticate(params[:password])
                session[:user_id] = user.id
                render json: user, status: :created
            else
                render json: {errors: "Invalid login credentials"}, status: 401
            end
        elsif (User.find_by(user_name: params[:account]))
            user = User.find_by(user_name: params[:account])
            if user&.authenticate(params[:password])
                session[:user_id] = user.id
                render json: user, status: :created
            else
                render json: {errors: "Invalid login credentials"}, status: 401
            end
        else
            render json: {errors: "Invalid login credentials"}, status: 401
        end
    end
    
    def show
        render json: @current_user, include: ['friendships', 'pending_friendships', 'pins', 'pin_groups', 'routes'], status: 200
    end

    def accountCheck
        response = []
        if (User.find_by(email: params[:email]))
            response.append("email already exists")
        end
        if (User.find_by(user_name: params[:username]))
            response.append("username already exists")
        end
        if (response.length() > 0)
            render json: response, status: 401
        else 
            head :no_content
        end
    end

    def destroy
        session.delete (:user_id)
        head :no_content
    end

end