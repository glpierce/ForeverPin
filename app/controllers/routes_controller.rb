class RoutesController < ApplicationController

    def my_routes
        render json: @current_user.routes, status: 200
    end

end
